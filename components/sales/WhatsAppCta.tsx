"use client";

import { trackEvent } from "@/lib/analytics/events";
import { getAttribution } from "@/lib/analytics/attribution";
import { WHATSAPP_NUMBER } from "@/lib/seo/site";

// Outbound WhatsApp link for the /start sales page. The click IS this page's
// conversion, so it fires the funnel event (GA4 + Vercel, via trackEvent) and,
// when the Meta Pixel is loaded (consent-gated in MetaPixel.tsx), the standard
// Contact event so ad campaigns can optimise on it.
export function WhatsAppCta({
  message,
  placement,
  className = "",
  children,
}: {
  message: string;
  placement: string;
  className?: string;
  children: React.ReactNode;
}) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const onClick = () => {
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
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
      {children}
    </a>
  );
}
