// Pure date helpers shared by the booking route and the tests (no server-only
// import, so vitest can load them directly).

/** True if `tz` is an IANA time zone the runtime understands. */
export function isValidTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/** Render a slot start in the visitor's time zone, e.g. { date: "2026-11-27", time: "09:30 AM" }. */
export function formatSlot(slotStart: string, timeZone: string): { date: string; time: string } {
  const d = new Date(slotStart);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(d);
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time };
}
