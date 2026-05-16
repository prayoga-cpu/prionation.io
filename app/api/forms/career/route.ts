import { NextRequest, NextResponse } from 'next/server';
import { careerSchema } from '@/lib/forms/schemas';
import { careerToNotionProperties } from '@/lib/notion/mappers';
import { notion } from '@/lib/notion/client';
import { DB } from '@/lib/notion/databases';
import { rateLimit } from '@/lib/security/rate-limit';
import { verifyTurnstile } from '@/lib/security/turnstile';
import { sendCareerNotification, sendCareerConfirmation } from '@/lib/notify/templates';
import { CV_MAX_BYTES } from '@/lib/storage/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    const rl = await rateLimit('career', ip);
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many submissions. Try again in an hour.' },
        { status: 429 }
      );
    }

    // 2. Parse and validate
    const body = await req.json();
    const parsed = careerSchema.safeParse(body);
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

    // 5. Validate CV URL belongs to our Supabase bucket (reject arbitrary URLs)
    const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    if (!parsed.data.cvUrl.startsWith(supabaseHost)) {
      return NextResponse.json(
        { error: 'CV must be uploaded to PRIONATION storage.' },
        { status: 400 }
      );
    }

    // 6. Enforce 5 MB CV size limit via HEAD check
    const head = await fetch(parsed.data.cvUrl, { method: 'HEAD' });
    const contentLength = Number(head.headers.get('content-length') ?? 0);
    if (contentLength > CV_MAX_BYTES) {
      return NextResponse.json(
        { error: 'CV exceeds 5 MB. Please compress it at ilovepdf.com before uploading.' },
        { status: 400 }
      );
    }

    // 7. Write to PN_Careers
    await notion.pages.create({
      parent: { database_id: DB.CAREERS },
      properties: careerToNotionProperties(parsed.data),
    });

    // 8. Notify team + confirm to submitter
    sendCareerNotification(parsed.data).catch((e) =>
      console.error('[career] Notification failed', e)
    );
    sendCareerConfirmation(parsed.data).catch((e) =>
      console.error('[career] Confirmation failed', e)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[career] Route error', error);
    return NextResponse.json(
      { error: 'Submission failed. Please try again.' },
      { status: 500 }
    );
  }
}
