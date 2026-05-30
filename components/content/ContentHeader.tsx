"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";

// Header for standalone content pages (cluster/anchor). Unlike the homepage
// Header, nav targets are real routes/anchors (not in-page scroll), so links
// work from any page. Wordmark -> home, CTA -> homepage Diagnostic.
function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const locales = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "id", label: "ID" },
  ];

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 w-fit">
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() =>
            startTransition(() => router.replace(pathname, { locale: loc.code }))
          }
          disabled={isPending || locale === loc.code}
          className={`text-[10px] font-pixel px-3 py-1.5 min-w-[38px] rounded-full transition-all ${
            locale === loc.code
              ? "bg-accent text-white shadow-[0_0_12px_rgba(235,69,159,0.4)]"
              : "text-muted hover:text-white hover:bg-white/5"
          } disabled:cursor-default`}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}

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
