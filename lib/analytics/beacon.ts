// Client-side helpers for the consent-free /start counters (server side:
// lib/analytics/counter.ts, app/api/m/*). No cookie, no storage, no identifier:
// the request carries only the channel, the button position and the page
// language; the campaign is read server-side from the page URL (Referer).

export type TapChannel = "wa" | "tel" | "cb_open" | "mail";

function qaSuffix(): string {
  try {
    return new URLSearchParams(window.location.search).get("qa") === "1" ? "&qa=1" : "";
  } catch {
    return "";
  }
}

// URL for an <a ping> or a beacon. The ping attribute fires even before the
// page's JavaScript has loaded, so WhatsApp links use it; qa is added at click
// time by the link's own handler when JavaScript is running.
export function tapUrl(channel: TapChannel, placement: string, locale: string, withQa = false): string {
  return `/api/m/t?ch=${channel}&p=${encodeURIComponent(placement)}&l=${encodeURIComponent(locale)}${withQa ? qaSuffix() : ""}`;
}

// For buttons handled in JavaScript (phone, call-back, e-mail): best-effort,
// never throws, never delays the user's action.
export function beaconTap(channel: TapChannel, placement: string, locale: string): void {
  try {
    const url = tapUrl(channel, placement, locale, true);
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function" && navigator.sendBeacon(url)) return;
    void fetch(url, { method: "POST", keepalive: true }).catch(() => {});
  } catch {
    /* measurement must never block a visitor */
  }
}

// Ad reference passed in the ad's URL (?ref=A1), shown at the end of the
// prefilled WhatsApp message so Evan can tell which ad and button a chat came
// from. Anything else falls back to "O" (organic / unknown).
export function adRef(): string {
  try {
    const ref = new URLSearchParams(window.location.search).get("ref")?.toUpperCase() ?? "";
    return /^[A-Z0-9]{1,4}$/.test(ref) ? ref : "O";
  } catch {
    return "O";
  }
}
