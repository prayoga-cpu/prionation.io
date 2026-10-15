import { NextRequest, NextResponse } from 'next/server';
import { callbackSchema } from '@/lib/forms/schemas';
import { callbackToNotionProperties } from '@/lib/notion/mappers';
import { notion } from '@/lib/notion/client';
import { DB } from '@/lib/notion/databases';
import { rateLimit } from '@/lib/security/rate-limit';
import { verifyTurnstile } from '@/lib/security/turnstile';
import { sendCallbackNotification } from '@/lib/notify/templates';
import { sendCallbackToDiscord } from '@/lib/notify/discord';
import { parisDay, recordHit } from '@/lib/analytics/counter';

// "Être rappelé(e)" on /start: same pipeline as the booking form (rate limit,
// honeypot, Turnstile, Notion PN_Bookings, team email, Discord), minus the
// confirmation email — the visitor gives a phone number, not an address.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// The call-back button was removed from /start in v3.10.2 (team decision
// 2026-10-14), so the endpoint is closed too; flip to bring both back.
const CALLBACK_ENABLED = false;

export async function POST(req: NextRequest) {
  if (!CALLBACK_ENABLED) {
    return NextResponse.json({ error: 'Call-back requests are closed.' }, { status: 410 });
  }
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    const rl = await rateLimit('callback', ip);
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many submissions. Try again in an hour.' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = callbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission', issues: parsed.error.issues }, { status: 400 });
    }

    if (parsed.data.honeypot) {
      return NextResponse.json({ success: true });
    }

    const turnstileOk = await verifyTurnstile(parsed.data.turnstileToken, ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
    }

    await notion.pages.create({
      parent: { database_id: DB.BOOKINGS },
      properties: callbackToNotionProperties(parsed.data, parisDay()),
    });

    sendCallbackNotification(parsed.data).catch((e) => console.error('[callback] Notification failed', e));
    sendCallbackToDiscord(parsed.data).catch((e) => console.error('[callback] Discord notification failed', e));
    // Anonymous funnel total (no personal data): one more submitted call-back.
    recordHit({ metric: 'tap', channel: 'cb', placement: parsed.data.placement, locale: parsed.data.locale }).catch((e) =>
      console.error('[callback] Counter failed', e),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[callback] Route error', error);
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 });
  }
}
