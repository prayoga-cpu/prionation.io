"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

// GA4 is the analytics backbone (no Vercel Pro). Loads gtag.js when
// NEXT_PUBLIC_GA4_ID (a G-XXXXXXXXXX Measurement ID) is set, and sends a
// page_view on client-side route changes. Conversion/funnel events are sent
// via lib/analytics/events.ts (trackEvent). Inert (renders null) until the env
// var is set, so it is safe to ship before the GA4 property exists.
// NB: GA4 sets cookies — for EU/fr traffic, pair with a consent banner /
// Consent Mode before heavy promotion.
const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function GA4() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialised = useRef(false);

  useEffect(() => {
    if (!GA_ID) return;
    // The gtag config below already fires the initial page_view; skip the first
    // render to avoid double-counting, then track subsequent SPA navigations.
    if (!initialised.current) {
      initialised.current = true;
      return;
    }
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    const qs = searchParams?.toString();
    gtag?.("event", "page_view", { page_path: pathname + (qs ? `?${qs}` : "") });
  }, [pathname, searchParams]);

  if (!GA_ID) return null;

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
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: true });
          `,
        }}
      />
    </>
  );
}
