import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/forms/schemas';
import { bookingToNotionProperties } from '@/lib/notion/mappers';
import { notion } from '@/lib/notion/client';
import { DB } from '@/lib/notion/databases';
import { rateLimit } from '@/lib/security/rate-limit';
import { verifyTurnstile } from '@/lib/security/turnstile';
import { sendBookingNotification, sendBookingConfirmation } from '@/lib/notify/templates';

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

    // 5. Write to PN_Bookings
    await notion.pages.create({
      parent: { database_id: DB.BOOKINGS },
      properties: bookingToNotionProperties(parsed.data),
    });

    // 6. Notify team + confirm to submitter
    sendBookingNotification(parsed.data).catch((e) =>
      console.error('[booking] Notification failed', e)
    );
    sendBookingConfirmation(parsed.data).catch((e) =>
      console.error('[booking] Confirmation failed', e)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[booking] Route error', error);
    return NextResponse.json(
      { error: 'Submission failed. Please try again.' },
      { status: 500 }
    );
  }
}
