// Cookie-consent state shared by GA4 (Consent Mode), Meta Pixel, and the banner.
// Persisted in localStorage; null = no choice yet (banner shows). setConsent
// updates GA4 Consent Mode live and notifies listeners (Meta Pixel) via a
// CustomEvent. SSR-safe; never throws.
import { useSyncExternalStore } from "react";

export type Consent = "granted" | "denied";

const KEY = "pn_consent";
export const CONSENT_EVENT = "pn-consent-change";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: Consent): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* storage blocked — still update runtime consent + notify below */
  }
  const granted = v === "granted";
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// React hook: subscribe to consent (live + cross-tab) without set-state-in-effect.
// Server snapshot is null, so the banner renders by default and hides on the
// client for visitors who already chose.
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, getConsent, () => null);
}

// Geo gate: proxy.ts (middleware) stamps the pn_eu cookie ("1" = consent-required
// region, "0" = not). Absent (local dev / non-Vercel) → required (privacy-safe).
export function isConsentRequired(): boolean {
  if (typeof document === "undefined") return true;
  const v = ("; " + document.cookie).split("; pn_eu=")[1];
  return v ? v[0] !== "0" : true;
}

// Show the banner only in consent-required regions, only until a choice is made.
// Server snapshot is false → no SSR flash / hydration mismatch (client decides).
export function useShowConsentBanner(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isConsentRequired() && getConsent() === null,
    () => false,
  );
}

// Meta Pixel may load when consent is NOT required (non-EU) OR has been granted.
export function usePixelAllowed(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => !isConsentRequired() || getConsent() === "granted",
    () => false,
  );
}
