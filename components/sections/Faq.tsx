"use client";

import { useTranslations } from "next-intl";
import { SectionHead } from "../ui/Atoms";
import { Icon } from "../icons";

type FaqItem = { q: string; a: string };

export function Faq() {
  const t = useTranslations("Faq");
  const tldr = useTranslations("Tldr");
  const items = t.raw("items") as FaqItem[];

  // FAQPage structured data — surfaced as direct answers by AI/search engines.
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section id="faq" className="relative px-page-x py-[140px] max-w-max-w mx-auto">
      {/* Guard empty mainEntity → invalid JSON-LD. NB: Google deprecated FAQ
          rich results 2026-05-07; kept for AI Overviews / answer engines. */}
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {/* TL;DR — plain, crawlable summary of the core facts */}
      <div
        role="note"
        aria-label={tldr("label")}
        className="mb-16 bg-card border border-line-soft rounded-[24px] p-6 md:p-8 max-w-[860px]"
      >
        <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-3">
          {tldr("label")}
        </div>
        <p className="text-soft text-[15px] md:text-[17px] leading-[1.7]">
          {tldr("summary")}
        </p>
      </div>

      <SectionHead n="07" label={t("label")} title={t("title")} />

      <div className="flex flex-col gap-3 max-w-[860px]">
        {items.map((it, i) => (
          <details
            key={i}
            className="group bg-card border border-line-soft rounded-2xl px-6 py-5 transition-colors duration-fast hover:border-soft open:border-accent/40"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-sans font-semibold text-white text-[15px] md:text-[17px] leading-snug">
              {it.q}
              <Icon
                name="chevron-down"
                size={18}
                className="shrink-0 text-muted transition-transform duration-fast group-open:rotate-180 group-open:text-accent"
              />
            </summary>
            <p className="text-soft text-[14px] md:text-[15px] leading-[1.7] mt-4">
              {it.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
