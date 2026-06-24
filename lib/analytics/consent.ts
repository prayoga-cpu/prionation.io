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
