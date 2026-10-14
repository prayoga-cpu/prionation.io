"use client";

import { useTranslations } from "next-intl";
import { resetConsent } from "@/lib/analytics/consent";

// "Gérer les cookies": withdrawing consent must be as easy as giving it (CNIL),
// so every footer offers this. It clears the stored choice and the banner
// reappears (it only renders in consent-required regions; elsewhere nothing is
// gated, so the link is harmless).
export function ConsentSettingsLink({ className = "" }: { className?: string }) {
  const t = useTranslations("Consent");
  return (
    <button type="button" onClick={resetConsent} className={`bg-transparent border-0 p-0 cursor-pointer ${className}`}>
      {t("manage")}
    </button>
  );
}
