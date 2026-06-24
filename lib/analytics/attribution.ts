// First-touch marketing attribution, captured client-side and attached to the
// intake lead so organic vs paid vs direct vs referral becomes queryable in the
// Notion sales pipeline. Privacy: marketing params + referrer + landing path
// only (no PII), stored in sessionStorage (cookieless, no consent banner). All
// functions are SSR-safe and fail silent if storage is unavailable.

const KEY = "pn_attribution";

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingPath?: string;
  landingLocale?: string;
  channel?: string;
};

// Best-effort channel classification from utm_medium → utm_source → referrer.
function classifyChannel(a: Attribution): string {
  const medium = (a.utmMedium || "").toLowerCase();
  if (medium) {
    if (/cpc|ppc|paid|ads?/.test(medium)) return "paid";
    if (/social/.test(medium)) return "social";
    if (/email|newsletter/.test(medium)) return "email";
    if (/organic/.test(medium)) return "organic";
    return "campaign";
  }
  if (a.utmSource) return "campaign";
  const ref = a.referrer || "";
  if (!ref) return "direct";
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "");
    if (/(^|\.)prionation\.io$/.test(host)) return "internal";
    if (/google|bing|duckduckgo|yahoo|ecosia|baidu|brave/.test(host)) return "organic";
    if (/linkedin|twitter|x\.com|t\.co|facebook|instagram|reddit|youtube|tiktok/.test(host)) return "social";
    return "referral";
  } catch {
    return "referral";
  }
}

// Capture once per session (first touch). Idempotent — safe to call on every
// route change; only the first non-stored call persists.
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const get = (k: string) => params.get(k) || undefined;
    const a: Attribution = {
      utmSource: get("utm_source"),
      utmMedium: get("utm_medium"),
      utmCampaign: get("utm_campaign"),
      utmTerm: get("utm_term"),
      utmContent: get("utm_content"),
      referrer: document.referrer || undefined,
      landingPath: window.location.pathname || undefined,
      landingLocale: window.location.pathname.split("/")[1] || undefined,
    };
    a.channel = classifyChannel(a);
    sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    /* storage blocked (private mode / disabled) — skip silently */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
