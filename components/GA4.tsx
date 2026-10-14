"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useTrackingAllowed } from "@/lib/analytics/consent";

// GA4 is the analytics backbone (no Vercel Pro). Loads gtag.js when
// NEXT_PUBLIC_GA4_ID (a G-XXXXXXXXXX Measurement ID) is set, and sends a
// page_view on client-side route changes. Conversion/funnel events are sent
// via lib/analytics/events.ts (trackEvent). Inert (renders null) until the env
// var is set, so it is safe to ship before the GA4 property exists.
// Consent: in consent-required regions (EEA/UK/CH + French overseas, see
// proxy.ts) gtag.js is not loaded at all until the visitor taps "Accepter"
// ("basic" consent mode) — no cookieless pings before consent or after a
// refusal. Elsewhere it loads by default. The inline consent defaults below
// therefore always resolve to granted when the script is present.
// Tolerate the env value being set with OR without the "G-" prefix — GA4
// requires the G- form, and Vercel sometimes holds just the suffix.
const RAW_GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
const GA_ID = RAW_GA_ID
  ? RAW_GA_ID.startsWith("G-")
    ? RAW_GA_ID
    : `G-${RAW_GA_ID}`
  : undefined;

export default function GA4() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialised = useRef(false);
  const allowed = useTrackingAllowed();

  useEffect(() => {
    if (!GA_ID || !allowed) return;
    // The gtag config below already fires the initial page_view; skip the first
    // render to avoid double-counting, then track subsequent SPA navigations.
    if (!initialised.current) {
      initialised.current = true;
      return;
    }
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    const qs = searchParams?.toString();
    gtag?.("event", "page_view", { page_path: pathname + (qs ? `?${qs}` : "") });
  }, [pathname, searchParams, allowed]);

  if (!GA_ID || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            var pnReq; try { var pnV = ('; ' + document.cookie).split('; pn_eu=')[1]; pnReq = pnV ? pnV[0] !== '0' : true; } catch (e) { pnReq = true; }
            var pnC; try { pnC = localStorage.getItem('pn_consent'); } catch (e) { pnC = null; }
            var pnG = !pnReq || pnC === 'granted';
            gtag('consent', 'default', {
              ad_storage: pnG ? 'granted' : 'denied',
              analytics_storage: pnG ? 'granted' : 'denied',
              ad_user_data: pnG ? 'granted' : 'denied',
              ad_personalization: pnG ? 'granted' : 'denied',
              wait_for_update: 500
            });
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
        }}
      />
    </>
  );
}
