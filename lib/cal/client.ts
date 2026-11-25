import "server-only";

// Server-side Cal.com API v2 client: the site's own routes (/api/cal/slots,
// /api/forms/booking) call Cal.com on the visitor's behalf, so the browser never
// talks to Cal.com and its own rate limit applies per server, not per visitor.
// Docs: https://cal.com/docs/api-reference/v2/introduction
//
// `cal-api-version` is required per endpoint family (a wrong or missing value
// silently falls back to an older schema), hence one constant per family.

const BASE = "https://api.cal.com/v2";
const V_SLOTS = "2024-09-04";
const V_BOOKINGS = "2026-02-25";

// Marker written to booking metadata so the webhook can tell bookings made on
// this site (already handled by /api/forms/booking) from ones made straight on
// the public cal.com link.
export const CAL_BOOKING_SOURCE = "prionation.io";

export class CalError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "CalError";
  }
}

// Slots and booking creation are public Cal.com endpoints (the same calls the
// cal.com booking page makes), so they are sent WITHOUT the API key on purpose:
// Cal.com validates an Authorization header whenever one is present, so a
// revoked or rotated key would otherwise turn every visitor booking into a 401.
// CAL_API_KEY is only for account management (e.g. registering the webhook).
export function calConfigured(): boolean {
  return Boolean(process.env.CAL_EVENT_TYPE_ID);
}

function eventTypeId(): number {
  const id = Number(process.env.CAL_EVENT_TYPE_ID);
  if (!Number.isInteger(id) || id <= 0) throw new CalError("CAL_EVENT_TYPE_ID is not set", 500);
  return id;
}

async function calFetch<T>(path: string, version: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "cal-api-version": version,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  const body = (await res.json().catch(() => null)) as
    | { status?: string; data?: T; error?: { message?: string } }
    | null;

  if (!res.ok || !body || body.status === "error") {
    throw new CalError(body?.error?.message ?? `Cal.com request failed (${res.status})`, res.status);
  }
  return body.data as T;
}

// ─── slots ──────────────────────────────────────────────────────────────────

/** Available start times grouped by day: `{ "2026-11-27": ["2026-11-27T09:00:00.000+01:00", …] }`,
 * expressed in the requested time zone. */
export type SlotsByDay = Record<string, string[]>;

export async function getSlots(args: {
  /** YYYY-MM-DD */
  start: string;
  /** YYYY-MM-DD */
  end: string;
  timeZone: string;
}): Promise<SlotsByDay> {
  const qs = new URLSearchParams({
    eventTypeId: String(eventTypeId()),
    start: args.start,
    end: args.end,
    timeZone: args.timeZone,
  });
  const data = await calFetch<Record<string, { start: string }[]>>(`/slots?${qs}`, V_SLOTS);

  const out: SlotsByDay = {};
  for (const [day, slots] of Object.entries(data ?? {})) {
    const starts = slots.map((s) => s.start).filter(Boolean);
    if (starts.length) out[day] = starts;
  }
  return out;
}

// ─── bookings ───────────────────────────────────────────────────────────────

export type CalBooking = {
  uid: string;
  status: string;
  start: string;
  end: string;
  meetingUrl?: string | null;
};

export async function createBooking(args: {
  /** ISO 8601 start (any offset; Cal.com normalises to UTC). */
  start: string;
  name: string;
  email: string;
  timeZone: string;
  /** E.164, e.g. +33612345678 */
  phoneNumber?: string;
  notes?: string;
  /** Max 50 keys, 40-char keys, 500-char string values. */
  metadata?: Record<string, string>;
}): Promise<CalBooking> {
  const data = await calFetch<CalBooking>("/bookings", V_BOOKINGS, {
    method: "POST",
    body: JSON.stringify({
      start: args.start,
      eventTypeId: eventTypeId(),
      attendee: {
        name: args.name,
        email: args.email,
        timeZone: args.timeZone,
        ...(args.phoneNumber ? { phoneNumber: args.phoneNumber } : {}),
      },
      ...(args.notes ? { bookingFieldsResponses: { notes: args.notes } } : {}),
      metadata: { source: CAL_BOOKING_SOURCE, ...args.metadata },
    }),
  });
  return data;
}

/** Public booking page where the attendee can reschedule or cancel. */
export function bookingManageUrl(uid: string): string {
  return `https://cal.com/booking/${encodeURIComponent(uid)}`;
}
