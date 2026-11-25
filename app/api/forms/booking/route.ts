import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/forms/schemas';
import { bookingToNotionProperties } from '@/lib/notion/mappers';
import { notion } from '@/lib/notion/client';
import { DB } from '@/lib/notion/databases';
import { rateLimit, calendarBookingLimit } from '@/lib/security/rate-limit';
import { verifyTurnstile } from '@/lib/security/turnstile';
import { sendBookingNotification, sendBookingConfirmation } from '@/lib/notify/templates';
import { sendBookingToDiscord } from '@/lib/notify/discord';
import { CalError, bookingManageUrl, calConfigured, createBooking } from '@/lib/cal/client';
import { formatSlot } from '@/lib/cal/format';
import { rememberBookingPage } from '@/lib/cal/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    const rl = await rateLimit('booking', ip);
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many submissions. Try again in an hour.' },
        { status: 429 }
      );
    }

    // 2. Parse and validate
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid submission', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    // 3. Honeypot
    if (parsed.data.honeypot) {
      return NextResponse.json({ success: true });
    }

    // 4. Verify Turnstile
    const turnstileOk = await verifyTurnstile(parsed.data.turnstileToken, ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
    }

    if (!calConfigured()) {
      return NextResponse.json({ error: 'Scheduling is not available right now.' }, { status: 503 });
    }

    // 5. Hard daily cap per IP — a booking lands on the real calendar, so this
    // one stays on even while SECURITY_ENABLED=false (see rate-limit.ts).
    const cap = await calendarBookingLimit(ip);
    if (!cap.success) {
      return NextResponse.json(
        { error: 'Too many booking attempts today. Please write to us instead.' },
        { status: 429 }
      );
    }

    // The slot is the single source of truth: re-derive the displayed date and
    // time from it rather than trusting what the client sent alongside.
    const slot = formatSlot(parsed.data.slotStart, parsed.data.timezone);
    const p = { ...parsed.data, selectedDate: slot.date, selectedTime: slot.time };
    const phone = `${p.countryCode}${p.whatsapp}`;

    // 6. Book it on Cal.com. This is what makes the meeting real: Cal.com checks
    // the calendar, creates the event + video link and emails the invitation.
    let booking;
    try {
      booking = await createBooking({
        start: p.slotStart,
        name: p.fullName,
        email: p.email,
        timeZone: p.timezone,
        notes: `WhatsApp: ${phone}\nSource: prionation.io${p.channel ? ` (${p.channel})` : ''}`,
        metadata: {
          ...(p.channel ? { channel: p.channel } : {}),
          ...(p.utmSource ? { utm_source: p.utmSource.slice(0, 500) } : {}),
          ...(p.utmCampaign ? { utm_campaign: p.utmCampaign.slice(0, 500) } : {}),
        },
      });
    } catch (e) {
      if (e instanceof CalError && e.status === 409) {
        return NextResponse.json(
          { error: 'That time was just taken. Please pick another slot.', code: 'slot_taken' },
          { status: 409 }
        );
      }
      if (e instanceof CalError && (e.status === 400 || e.status === 422)) {
        console.error('[booking] Cal.com rejected the booking', e.status, e.message);
        return NextResponse.json(
          { error: 'That time is no longer bookable. Please pick another slot.', code: 'slot_invalid' },
          { status: 409 }
        );
      }
      throw e;
    }

    const cal = {
      uid: booking.uid,
      meetingUrl: booking.meetingUrl ?? null,
      manageUrl: bookingManageUrl(booking.uid),
    };

    // 7. Record it in PN_Bookings. The meeting already exists on Cal.com, so a
    // Notion failure must not turn the visitor's confirmed booking into an error.
    try {
      const page = await notion.pages.create({
        parent: { database_id: DB.BOOKINGS },
        properties: bookingToNotionProperties(p),
      });
      await rememberBookingPage(cal.uid, page.id);
    } catch (e) {
      console.error('[booking] Notion/Redis write failed (booking exists on Cal.com)', cal.uid, e);
    }

    // 8. Notify team + confirm to submitter
    sendBookingNotification(p, cal).catch((e) =>
      console.error('[booking] Notification failed', e)
    );
    sendBookingConfirmation(p, cal).catch((e) =>
      console.error('[booking] Confirmation failed', e)
    );
    sendBookingToDiscord(p, cal).catch((e) =>
      console.error('[booking] Discord notification failed', e)
    );

    return NextResponse.json({ success: true, meetingUrl: cal.meetingUrl, manageUrl: cal.manageUrl });
  } catch (error) {
    console.error('[booking] Route error', error);
    return NextResponse.json(
      { error: 'Submission failed. Please try again.' },
      { status: 500 }
    );
  }
}
