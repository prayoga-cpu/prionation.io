import { track } from "@vercel/analytics";

type EventParams = Record<string, string | number | boolean>;

// Single funnel-event entry point. Fires to GA4 (gtag) AND Vercel Analytics.
// GA4 is the primary, queryable backbone (no Vercel Pro on this account, and
// Vercel has no clean read API); Vercel is kept as a free, cookieless bonus.
// SSR-safe and never throws — analytics must never block a user flow.
export function trackEvent(name: string, params: EventParams = {}): void {
  try {
    if (typeof window !== "undefined") {
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.("event", name, params);
    }
    track(name, params);
  } catch {
    /* best-effort: a tracking failure must never surface to the user */
  }
}
