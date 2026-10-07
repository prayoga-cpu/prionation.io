"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "id", label: "ID" },
];

// EN / FR / ID pill switcher. Swaps the locale segment and keeps the current
// path (e.g. /en/start → /fr/start). Shared by the homepage Header, the
// content-page ContentHeader and the /start sales page. `compact` tightens the
// buttons below `sm` so it fits a 360px-wide header next to a logo and a CTA.
export function LocaleSwitcher({ compact = false }: { compact?: boolean }) {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 w-fit">
      {LOCALES.map((loc) => (
        <button
          key={loc.code}
          onClick={() => onLocaleChange(loc.code)}
          disabled={isPending || locale === loc.code}
          className={`text-[10px] font-pixel py-1.5 rounded-full transition-all ${
            compact ? "px-2 sm:px-3 sm:min-w-[38px]" : "px-3 min-w-[38px]"
          } ${
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
