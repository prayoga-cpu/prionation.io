"use client";

import type { MouseEvent } from "react";
import { trackEvent } from "@/lib/analytics/events";
import { getAttribution } from "@/lib/analytics/attribution";
import { adRef, tapUrl } from "@/lib/analytics/beacon";
import { WHATSAPP_NUMBER } from "@/lib/seo/site";

// One letter per button position, appended to the prefilled message as
// "(réf. A1-H)" so each chat in Evan's inbox can be traced to an ad and button.
const PLACEMENT_LETTER: Record<string, string> = {
  nav: "N",
  hero: "H",
  sticky: "K",
  story: "S",
  prix: "P",
  final: "F",
  sheet: "R",
};

function waHref(message: string, refLabel: string, ref: string, placement: string) {
  const text = `${message} (${refLabel} ${ref}-${PLACEMENT_LETTER[placement] ?? "H"})`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// WhatsApp link for the /start sales page.
// - The href stays a direct wa.me link (WhatsApp's app link), so phones open the
//   app straight away; no redirect of ours sits in front of it.
// - The tap is counted by the browser's <a ping> (consent-free, works before
//   hydration — see lib/analytics/counter.ts). Once hydrated, the click handler
//   also adds the ad ref from the URL and the qa flag, fires the consented GA4
//   event and Meta Contact, and opens a new tab only on desktop. On phones the
//   link opens in the same tab: in-app browsers handle target=_blank unevenly.
export function WhatsAppCta({
  message,
  refLabel,
  placement,
  locale,
  className = "",
  id,
  children,
}: {
  message: string;
  refLabel: string;
  placement: string;
  locale: string;
  className?: string;
  id?: string;
  children: React.ReactNode;
}) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const a = e.currentTarget;
    try {
      a.href = waHref(message, refLabel, adRef(), placement);
      a.setAttribute("ping", tapUrl("wa", placement, locale, true));
      const desktop = window.matchMedia("(pointer: fine)").matches && !("ontouchstart" in window);
      if (desktop) a.target = "_blank";
    } catch {
      /* keep the server-rendered link as is */
    }
    trackEvent("whatsapp_click", {
      placement,
      channel: getAttribution().channel ?? "unknown",
    });
    try {
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      fbq?.("track", "Contact", { content_name: "WhatsApp", content_category: placement });
    } catch {
      /* best-effort: tracking must never block the outbound click */
    }
  };

  return (
    <a
      id={id}
      href={waHref(message, refLabel, "O", placement)}
      ping={tapUrl("wa", placement, locale)}
      rel="noopener noreferrer"
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  );
}
