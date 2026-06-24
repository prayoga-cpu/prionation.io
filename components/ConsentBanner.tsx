"use client";

import { useShowConsentBanner, setConsent, type Consent } from "@/lib/analytics/consent";

// Minimal GDPR/CNIL cookie-consent banner. Shows ONLY in consent-required
// regions (EEA/UK/CH, via the pn_eu geo cookie) and only until the visitor
// chooses (persisted in localStorage). Non-EU visitors never see it and
// analytics run by default. Decline keeps GA4 cookieless and never loads Meta
// Pixel; Accept grants both. Mounted in the root layout.
export default function ConsentBanner() {
  if (!useShowConsentBanner()) return null;

  const choose = (v: Consent) => setConsent(v);

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-[400px] z-[300] bg-card border border-line-soft rounded-2xl p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
    >
      <p className="text-soft text-[13px] leading-[1.6] mb-4 font-sans">
        We use analytics cookies (Google Analytics &amp; Meta) to understand site
        traffic. Decline keeps analytics cookieless.
      </p>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="px-4 py-2 rounded-full border border-line-soft text-muted text-[13px] font-sans hover:text-white hover:border-soft transition-colors"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="px-5 py-2 rounded-full bg-accent text-white text-[13px] font-sans font-semibold hover:bg-accent/90 transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
