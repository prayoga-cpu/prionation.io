import { describe, it, expect } from "vitest";
import { createHmac } from "node:crypto";
import { formatSlot, isValidTimeZone } from "@/lib/cal/format";
import { parseCalWebhook, verifyCalSignature } from "@/lib/cal/webhook";

describe("formatSlot", () => {
  it("renders the same instant in the visitor's zone", () => {
    // 03:00Z → Jakarta is UTC+7 (10:00), Paris in winter is UTC+1 (04:00)
    expect(formatSlot("2026-11-27T03:00:00.000Z", "Asia/Jakarta")).toEqual({ date: "2026-11-27", time: "10:00 AM" });
    expect(formatSlot("2026-11-27T03:00:00.000Z", "Europe/Paris")).toEqual({ date: "2026-11-27", time: "04:00 AM" });
  });

  it("rolls the calendar day over with the zone", () => {
    // 20:00Z on the 26th is already the 27th in Jakarta (+7)
    expect(formatSlot("2026-11-26T20:00:00.000Z", "Asia/Jakarta").date).toBe("2026-11-27");
    expect(formatSlot("2026-11-26T20:00:00.000Z", "America/New_York").date).toBe("2026-11-26");
  });

  it("accepts offset-bearing slot strings as returned by Cal.com", () => {
    expect(formatSlot("2026-11-27T04:00:00.000+01:00", "Europe/Paris")).toEqual({ date: "2026-11-27", time: "04:00 AM" });
  });
});

describe("isValidTimeZone", () => {
  it("accepts IANA names and rejects junk", () => {
    expect(isValidTimeZone("Europe/Paris")).toBe(true);
    expect(isValidTimeZone("Asia/Makassar")).toBe(true);
    expect(isValidTimeZone("Mars/Olympus")).toBe(false);
    expect(isValidTimeZone("")).toBe(false);
  });
});

describe("verifyCalSignature", () => {
  const secret = "s3cret";
  const body = JSON.stringify({ triggerEvent: "BOOKING_CREATED", payload: { uid: "abc" } });
  const hex = createHmac("sha256", secret).update(body).digest("hex");
  const b64 = createHmac("sha256", secret).update(body).digest("base64");

  it("accepts a correct hex or base64 HMAC-SHA256 of the raw body", () => {
    expect(verifyCalSignature(body, hex, secret)).toBe(true);
    expect(verifyCalSignature(body, b64, secret)).toBe(true);
    expect(verifyCalSignature(body, `sha256=${hex}`, secret)).toBe(true);
  });

  it("rejects a wrong secret, a tampered body, and a missing header", () => {
    expect(verifyCalSignature(body, hex, "other")).toBe(false);
    expect(verifyCalSignature(body + " ", hex, secret)).toBe(false);
    expect(verifyCalSignature(body, null, secret)).toBe(false);
    expect(verifyCalSignature(body, "", secret)).toBe(false);
    expect(verifyCalSignature(body, hex, "")).toBe(false);
  });

  it("rejects a signature of the wrong length without throwing", () => {
    expect(verifyCalSignature(body, "abcd", secret)).toBe(false);
  });
});

describe("parseCalWebhook", () => {
  it("unwraps BOOKING_* payloads", () => {
    const evt = parseCalWebhook(JSON.stringify({ triggerEvent: "BOOKING_CANCELLED", payload: { uid: "u1" } }));
    expect(evt).toEqual({ triggerEvent: "BOOKING_CANCELLED", payload: { uid: "u1" } });
  });

  it("treats flat MEETING_* payloads as the booking itself", () => {
    const evt = parseCalWebhook(JSON.stringify({ triggerEvent: "MEETING_ENDED", uid: "u2" }));
    expect(evt?.triggerEvent).toBe("MEETING_ENDED");
    expect(evt?.payload.uid).toBe("u2");
  });

  it("returns null for junk", () => {
    expect(parseCalWebhook("not json")).toBeNull();
    expect(parseCalWebhook("[]")).toBeNull();
    expect(parseCalWebhook(JSON.stringify({ payload: {} }))).toBeNull();
  });
});
