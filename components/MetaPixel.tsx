"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { captureAttribution } from "@/lib/analytics/attribution";
import { useConsent } from "@/lib/analytics/consent";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialised = useRef(false);
  // Meta Pixel is advertising → only loads once consent is granted.
  const granted = useConsent() === "granted";

  useEffect(() => {
    // First-touch marketing attribution is cookieless (sessionStorage) — always
    // capture, independent of consent and of whether the pixel is enabled.
    captureAttribution();

    if (!pixelId || !granted) return;

    // The init script below fires the first PageView via the fbq queue, so skip
    // the first effect run after consent to avoid double-counting. Track
    // PageView only on subsequent client-side route changes.
    if (!initialised.current) {
      initialised.current = true;
      return;
    }
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    fbq?.("track", "PageView");
  }, [pathname, searchParams, granted]);

  if (!pixelId || !granted) {
    return null;
  }

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
