"use client";

import { beaconTap } from "@/lib/analytics/beacon";
import { PHONE_TEL } from "@/lib/seo/site";

// Small client islands for /start's non-WhatsApp contact options. Each tap is
// counted by the consent-free counter (lib/analytics/beacon.ts).

export const CONTACT_SHEET_EVENT = "pn-contact-sheet";

export function openContactSheet(placement: string) {
  window.dispatchEvent(new CustomEvent(CONTACT_SHEET_EVENT, { detail: { placement } }));
}

export function TelLink({
  placement,
  locale,
  className = "",
  children,
}: {
  placement: string;
  locale: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={`tel:${PHONE_TEL}`} onClick={() => beaconTap("tel", placement, locale)} className={className}>
      {children}
    </a>
  );
}

export function CallbackButton({
  placement,
  locale,
  className = "",
  children,
}: {
  placement: string;
  locale: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        beaconTap("cb_open", placement, locale);
        openContactSheet(placement);
      }}
      className={className}
    >
      {children}
    </button>
  );
}
