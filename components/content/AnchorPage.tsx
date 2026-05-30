"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Icon } from "../icons";
import { SITE_URL, SITE_NAME } from "@/lib/seo/site";

type Section = { id: string; h2: string; body: string[] };
type Faq = { q: string; a: string };

const ANCHOR_PATH = "/ai-product-engineering-for-mid-market-companies";

export function AnchorPage() {
  const t = useTranslations("Anchor");
  const locale = useLocale();

  const intro = t.raw("intro") as string[];
  const sections = t.raw("sections") as Section[];
  const faq = t.raw("faq") as Faq[];

  const canonical = `${SITE_URL}/${locale}${ANCHOR_PATH}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("h1"),
    description: t("metaDescription"),
    inLanguage: locale,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png` },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Related links point only to live destinations (homepage sections).
  const related = [
    { href: "/#methodology", label: "Methodology" },
    { href: "/#selected-work", label: "Selected work" },
    { href: "/#pricing", label: "Pricing" },
  ];

  return (
    <main className="relative px-page-x pt-[140px] pb-[120px] max-w-[820px] mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Link
        href="/"
        className="inline-block text-muted text-[13px] hover:text-white transition-colors mb-10"
      >
        {t("backToHome")}
      </Link>

      <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-4">
        {t("badge")}
      </div>

      <h1 className="font-sans font-extrabold text-[clamp(32px,4.4vw,52px)] leading-[1.05] tracking-[-0.03em] text-white mb-8">
        {t("h1")}
      </h1>

      {/* TL;DR — plain, crawlable summary */}
      <div
        role="note"
        aria-label="Summary"
        className="bg-card border border-line-soft rounded-[20px] p-6 md:p-7 mb-12"
      >
        <p className="text-soft text-[15px] md:text-[17px] leading-[1.7]">
          {t("tldr")}
        </p>
      </div>

      <div className="flex flex-col gap-5 mb-14">
        {intro.map((p, i) => (
          <p key={i} className="text-soft text-[16px] leading-[1.75]">
            {p}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-12">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-[110px]">
            <h2 className="font-sans font-bold text-white text-[clamp(22px,2.8vw,30px)] tracking-[-0.02em] leading-[1.15] mb-4">
              {s.h2}
            </h2>
            <div className="flex flex-col gap-4">
              {s.body.map((p, i) => (
                <p key={i} className="text-soft text-[16px] leading-[1.75]">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Related — live homepage destinations */}
      <div className="mt-14 flex flex-wrap gap-3">
        {related.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line-soft text-soft text-[13px] hover:text-white hover:border-soft transition-colors"
          >
            {r.label} <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-20">
        <h2 className="font-sans font-extrabold text-white text-[clamp(24px,3vw,34px)] tracking-[-0.02em] mb-8">
          {t("faqTitle")}
        </h2>
        <div className="flex flex-col gap-3">
          {faq.map((f, i) => (
            <details
              key={i}
              className="group bg-card border border-line-soft rounded-2xl px-6 py-5 transition-colors duration-fast hover:border-soft open:border-accent/40"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-sans font-semibold text-white text-[15px] md:text-[17px] leading-snug">
                {f.q}
                <Icon
                  name="chevron-down"
                  size={18}
                  className="shrink-0 text-muted transition-transform duration-fast group-open:rotate-180 group-open:text-accent"
                />
              </summary>
              <p className="text-soft text-[14px] md:text-[15px] leading-[1.7] mt-4">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 bg-card border border-accent/30 rounded-[24px] p-8 md:p-10 text-center bg-[radial-gradient(circle_at_50%_0%,rgba(88,101,242,0.1)_0%,transparent_70%)]">
        <h2 className="font-sans font-extrabold text-white text-[clamp(22px,2.8vw,30px)] tracking-[-0.02em] mb-3">
          {t("ctaTitle")}
        </h2>
        <p className="text-soft text-[15px] leading-[1.7] max-w-[48ch] mx-auto mb-7">
          {t("ctaBody")}
        </p>
        <Link
          href="/#engage"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-sans font-semibold text-[14px] hover:bg-accent/90 transition-colors"
        >
          {t("ctaButton")} <span className="text-[12px] opacity-80">→</span>
        </Link>
      </div>
    </main>
  );
}
