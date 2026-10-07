"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

// Header for standalone content pages (cluster/anchor). Unlike the homepage
// Header, nav targets are real routes/anchors (not in-page scroll), so links
// work from any page. Wordmark -> home, CTA -> homepage Diagnostic.
export function ContentHeader() {
  const t = useTranslations("Header");

  return (
    <header className="fixed top-0 w-full z-50 flex items-center justify-between px-page-x py-[14px] backdrop-blur-[8px] bg-[linear-gradient(180deg,rgba(8,9,13,0.9),rgba(8,9,13,0.6)_40%,transparent)] shadow-md">
      <Link
        href="/"
        aria-label="PRIONATION.io"
        className="inline-flex items-center transition-transform duration-fast hover:scale-[1.03]"
      >
        <span className="flex items-center border-2 border-white rounded-full pl-[14px] pr-1 py-0.5 gap-1.5 text-white font-sans font-extrabold leading-none tracking-[-0.025em] text-[19px]">
          PRIONATION
          <span className="bg-white text-black rounded-full pt-[3px] px-[7px] pb-[1px] font-bold tracking-[-0.02em] leading-none text-[12px]">
            .io
          </span>
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <LocaleSwitcher />
        </div>
        <Link
          href="/#engage"
          className="inline-flex items-center gap-2 px-4 py-[9px] rounded-full bg-white text-[#08090d] font-semibold text-[13px] transition-all duration-fast hover:bg-[#e6e6f0]"
        >
          {t("cta")} <span className="text-[12px] opacity-80">→</span>
        </Link>
      </div>
    </header>
  );
}
