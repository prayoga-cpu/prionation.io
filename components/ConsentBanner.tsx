"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useShowConsentBanner, setConsent, type Consent } from "@/lib/analytics/consent";

// GDPR/CNIL cookie-consent banner. Shows ONLY in consent-required regions
// (EEA/UK/CH + French overseas, via the pn_eu geo cookie) and only until the
// visitor chooses (persisted in localStorage; "Gérer les cookies" in the footer
// brings it back via resetConsent). Non-EU visitors never see it and analytics
// run by default. Refuser keeps GA4 and the Meta Pixel unloaded; Accepter loads
// both. Mounted in the root layout, inside NextIntlClientProvider so the copy
// follows the page locale.
//
// Layout: on phones a compact bar (text left, the two buttons stacked right,
// ~100 px tall) so it never covers a page's primary call to action; on desktop a
// bottom-right card. Refuser and Accepter share one style and size — the CNIL
// requires refusing to be as easy and as visible as accepting.
export default function ConsentBanner() {
  const t = useTranslations("Consent");
  if (!useShowConsentBanner()) return null;

  const choose = (v: Consent) => {
    // A refusal after an earlier acceptance (via "Gérer les cookies") can't
    // unload scripts already running in this page view, so reload without them.
    const w = window as unknown as { fbq?: unknown; gtag?: unknown };
    const loaded = Boolean(w.fbq || w.gtag);
    setConsent(v);
    if (v === "denied" && loaded) window.location.reload();
  };

  const button =
    "min-w-[88px] px-4 py-2 rounded-full border border-line-soft bg-white/5 text-white text-[13px] font-sans font-semibold hover:bg-white/10 hover:border-soft transition-colors";

  return (
    <div
      role="dialog"
      aria-label={t("label")}
      data-consent-banner=""
      className="fixed left-2 right-2 bottom-[calc(8px+env(safe-area-inset-bottom,0px))] md:left-auto md:right-4 md:bottom-4 md:max-w-[400px] z-[300] bg-card border border-line-soft rounded-2xl px-3.5 py-3 md:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] flex items-center md:flex-col md:items-stretch gap-3"
    >
      <p className="flex-1 min-w-0 m-0 text-soft text-[12.5px] md:text-[13px] leading-[1.4] md:leading-[1.6] font-sans">
        {t("body")}{" "}
        <Link href="/privacy" className="text-white underline underline-offset-2">
          {t("more")}
        </Link>
      </p>
      <div className="flex flex-col md:flex-row gap-2 md:justify-end shrink-0">
        <button type="button" onClick={() => choose("denied")} className={button}>
          {t("decline")}
        </button>
        <button type="button" onClick={() => choose("granted")} className={button}>
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
