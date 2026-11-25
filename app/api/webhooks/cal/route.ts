import { NextRequest, NextResponse } from 'next/server';
import { notion } from '@/lib/notion/client';
import { DB } from '@/lib/notion/databases';
import { CAL_BOOKING_SOURCE } from '@/lib/cal/client';
import { formatSlot } from '@/lib/cal/format';
import { findBookingPage, rememberBookingPage } from '@/lib/cal/store';
import { parseCalWebhook, verifyCalSignature, type CalWebhookBooking } from '@/lib/cal/webhook';
import { sendCalUpdateToDiscord } from '@/lib/notify/discord';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Receives Cal.com webhooks (Settings → Developer → Webhooks), keeps the
// PN_Bookings row in step with the real meeting, and pings Discord. Register it
// with the BOOKING_CREATED / BOOKING_RESCHEDULED / BOOKING_CANCELLED /
// BOOKING_REJECTED / MEETING_ENDED triggers and the secret in CAL_WEBHOOK_SECRET.

type Status = 'Cancelled' | 'Rescheduled' | 'Completed';

async function setStatus(pageId: string, status: Status) {
  await notion.pages.update({
    page_id: pageId,
    properties: { Status: { select: { name: status } } },
  });
}

function summary(b: CalWebhookBooking) {
  const a = b.attendees?.[0];
  const tz = a?.timeZone || 'UTC';
  const slot = b.startTime ? formatSlot(b.startTime, tz) : null;
  return {
    name: a?.name ?? 'Unknown',
    email: a?.email ?? 'Unknown',
    tz,
    when: slot ? `${slot.date} ${slot.time}` : 'Unknown',
  };
}

export async function POST(req: NextRequest) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    // Never accept unsigned deliveries: refuse until the secret is configured.
    console.error('[cal-webhook] CAL_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  const raw = await req.text();
  if (!verifyCalSignature(raw, req.headers.get('x-cal-signature-256'), secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const evt = parseCalWebhook(raw);
  if (!evt) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

  const b = evt.payload;
  const uid = b.uid;

  try {
    switch (evt.triggerEvent) {
      case 'BOOKING_CREATED': {
        // Bookings made on this site are already in Notion (written by
        // /api/forms/booking). Only act on ones made on the public cal.com link.
        if (b.metadata?.source === CAL_BOOKING_SOURCE || !uid) break;
        if (await findBookingPage(uid)) break; // redelivery

        const s = summary(b);
        const a = b.attendees?.[0];
        const page = await notion.pages.create({
          parent: { database_id: DB.BOOKINGS },
          properties: {
            'Full Name': { title: [{ text: { content: s.name } }] },
            'Email': { email: a?.email ?? null },
            'WhatsApp': { phone_number: a?.phoneNumber ?? null },
            'Session Date': { date: b.startTime ? { start: b.startTime } : null },
            'Session Time': { rich_text: [{ text: { content: `${s.when.split(' ').slice(1).join(' ')} · cal.com link` } }] },
            'Timezone': { rich_text: [{ text: { content: s.tz } }] },
            'Status': { select: { name: 'New' } },
          },
        });
        await rememberBookingPage(uid, page.id);
        await sendCalUpdateToDiscord(
          '📅 Meeting booked on the cal.com link',
          [
            { name: 'Name', value: s.name, inline: true },
            { name: 'Email', value: s.email, inline: true },
            { name: 'When', value: `${s.when} (${s.tz})`, inline: true },
          ],
          'Booked directly on the public Cal.com page, not through the site form.',
        ).catch((e) => console.error('[cal-webhook] Discord failed', e));
        break;
      }

      case 'BOOKING_CANCELLED':
      case 'BOOKING_REJECTED': {
        if (!uid) break;
        const pageId = await findBookingPage(uid);
        if (pageId) await setStatus(pageId, 'Cancelled');
        const s = summary(b);
        await sendCalUpdateToDiscord(
          '❌ Meeting cancelled',
          [
            { name: 'Name', value: s.name, inline: true },
            { name: 'Email', value: s.email, inline: true },
            { name: 'Was', value: `${s.when} (${s.tz})`, inline: true },
          ],
          pageId ? undefined : 'No Notion row found for this booking: update it by hand.',
        ).catch((e) => console.error('[cal-webhook] Discord failed', e));
        break;
      }

      case 'BOOKING_RESCHEDULED': {
        // A reschedule gets a new uid; `rescheduleUid` points at the old one.
        const pageId =
          (b.rescheduleUid ? await findBookingPage(b.rescheduleUid) : null) ??
          (uid ? await findBookingPage(uid) : null);
        const s = summary(b);
        if (pageId && b.startTime) {
          const slot = formatSlot(b.startTime, s.tz);
          await notion.pages.update({
            page_id: pageId,
            properties: {
              'Session Date': { date: { start: b.startTime } },
              'Session Time': { rich_text: [{ text: { content: slot.time } }] },
              'Timezone': { rich_text: [{ text: { content: s.tz } }] },
              'Status': { select: { name: 'Rescheduled' } },
            },
          });
          if (uid) await rememberBookingPage(uid, pageId);
        }
        await sendCalUpdateToDiscord(
          '🔁 Meeting rescheduled',
          [
            { name: 'Name', value: s.name, inline: true },
            { name: 'Email', value: s.email, inline: true },
            { name: 'Now', value: `${s.when} (${s.tz})`, inline: true },
          ],
          pageId ? undefined : 'No Notion row found for this booking: update it by hand.',
        ).catch((e) => console.error('[cal-webhook] Discord failed', e));
        break;
      }

      case 'MEETING_ENDED': {
        if (!uid) break;
        const pageId = await findBookingPage(uid);
        if (pageId) await setStatus(pageId, 'Completed');
        break;
      }

      default:
        // PING and every trigger we didn't subscribe to: acknowledge, do nothing.
        break;
    }
  } catch (error) {
    console.error('[cal-webhook] handler failed', evt.triggerEvent, uid, error);
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
