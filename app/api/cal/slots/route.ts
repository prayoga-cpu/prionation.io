import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CalError, calConfigured, getSlots } from '@/lib/cal/client';
import { isValidTimeZone } from '@/lib/cal/format';
import { rateLimit } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_RANGE_DAYS = 62;

const querySchema = z.object({
  start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeZone: z.string().min(1).max(60).refine(isValidTimeZone, 'Unknown time zone'),
});

// Read-only proxy to Cal.com's slots endpoint, so the API key stays server-side.
// Responses are CDN-cached for 30 s: a busy day costs a handful of Cal.com calls
// (120/min limit per key), and a stale slot is caught by the 409 on booking.
export async function GET(req: NextRequest) {
  if (!calConfigured()) {
    return NextResponse.json({ error: 'Scheduling is not available right now.' }, { status: 503 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const rl = await rateLimit('slots', ip);
  if (!rl.success) {
    return NextResponse.json({ error: 'Too many requests. Try again in a few minutes.' }, { status: 429 });
  }

  const parsed = querySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const { start, end, timeZone } = parsed.data;

  const days = (Date.parse(end) - Date.parse(start)) / 86_400_000;
  if (!(days >= 0 && days <= MAX_RANGE_DAYS)) {
    return NextResponse.json({ error: 'Invalid date range' }, { status: 400 });
  }

  try {
    const slots = await getSlots({ start, end, timeZone });
    return NextResponse.json(
      { slots },
      { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } },
    );
  } catch (error) {
    console.error('[cal/slots] Cal.com error', error instanceof CalError ? error.status : error);
    return NextResponse.json({ error: 'Could not load availability. Please try again.' }, { status: 502 });
  }
}
