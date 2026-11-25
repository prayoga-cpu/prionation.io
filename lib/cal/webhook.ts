import { createHmac, timingSafeEqual } from "node:crypto";

// Cal.com signs every webhook delivery with HMAC-SHA256 of the raw request body
// (header `X-Cal-Signature-256`, keyed by the secret set on the webhook).
// https://cal.com/help/webhooks — the docs don't say whether the digest is hex
// or base64, so both encodings are accepted; either way the comparison is
// constant-time and needs the real secret.

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function verifyCalSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header || !secret) return false;
  const hex = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const b64 = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");
  const given = header.trim().replace(/^sha256=/i, "");
  return safeEqual(given, hex) || safeEqual(given, b64);
}

// ─── payload ────────────────────────────────────────────────────────────────

export type CalWebhookBooking = {
  uid?: string;
  rescheduleUid?: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  metadata?: Record<string, unknown> | null;
  attendees?: { name?: string; email?: string; timeZone?: string; phoneNumber?: string | null }[];
  responses?: Record<string, { value?: unknown } | undefined>;
  videoCallData?: { url?: string } | null;
  location?: string | null;
};

export type CalWebhookEvent = {
  triggerEvent: string;
  payload: CalWebhookBooking;
};

/** BOOKING_* events wrap the booking in `payload`; MEETING_* events are flat. */
export function parseCalWebhook(raw: string): CalWebhookEvent | null {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!json || typeof json !== "object") return null;
  const obj = json as { triggerEvent?: unknown; payload?: unknown };
  if (typeof obj.triggerEvent !== "string") return null;
  const payload = (obj.payload && typeof obj.payload === "object" ? obj.payload : obj) as CalWebhookBooking;
  return { triggerEvent: obj.triggerEvent, payload };
}
