"use client";

import { useEffect, useState } from "react";
import { useShowConsentBanner } from "@/lib/analytics/consent";
import { WhatsAppCta } from "./WhatsAppCta";
import { CallbackButton } from "./ContactLinks";

// Phone-only bar that keeps a way to reach Evan on screen once the hero button
// has scrolled away (the long page had no button for ~10 screens). Hidden again
// when the final call to action is visible. While the consent banner is open it
// sits just above it instead of under it.
export function StickyCta({
  message,
  refLabel,
  locale,
  waLabel,
  callbackLabel,
}: {
  message: string;
  refLabel: string;
  locale: string;
  waLabel: string;
  callbackLabel: string;
}) {
  const [heroGone, setHeroGone] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  const [bannerOffset, setBannerOffset] = useState(0);
  const bannerOpen = useShowConsentBanner();

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const final = document.getElementById("final-cta");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0);
        if (e.target === final) setFinalVisible(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (final) io.observe(final);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!bannerOpen) return;
    const banner = document.querySelector<HTMLElement>("[data-consent-banner]");
    if (!banner) return;
    const ro = new ResizeObserver(() => setBannerOffset(banner.getBoundingClientRect().height + 8));
    ro.observe(banner);
    return () => ro.disconnect();
  }, [bannerOpen]);

  const show = heroGone && !finalVisible;
  const offset = bannerOpen ? bannerOffset : 0;

  return (
    <div
      inert={!show}
      className={`md:hidden fixed left-0 right-0 z-[250] px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))] bg-[rgba(8,9,13,0.94)] border-t border-white/10 backdrop-blur transition-transform duration-200 ${show ? "translate-y-0" : "translate-y-[130%] pointer-events-none"}`}
      style={{ bottom: offset }}
    >
      <div className="flex gap-2">
        <WhatsAppCta
          message={message}
          refLabel={refLabel}
          placement="sticky"
          locale={locale}
          className="flex-1 inline-flex items-center justify-center min-h-[48px] rounded-full bg-accent text-white font-bold text-[15px]"
        >
          {waLabel}
        </WhatsAppCta>
        <CallbackButton
          placement="sticky"
          locale={locale}
          className="inline-flex items-center justify-center min-h-[48px] px-4 rounded-full border border-white/15 bg-white/5 text-white font-semibold text-[14px]"
        >
          {callbackLabel}
        </CallbackButton>
      </div>
    </div>
  );
}
