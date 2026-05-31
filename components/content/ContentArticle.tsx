"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Icon } from "../icons";
import { SITE_URL, SITE_NAME } from "@/lib/seo/site";
import type { PageSection, SchemaType } from "@/lib/content/pages";
import type { RelatedLink } from "@/lib/content/meta";
import { FloatingShare } from "./FloatingShare";
import { ArticleSidebar } from "./ArticleSidebar";

type Section = { h2: string; body: string[] };
type Faq = { q: string; a: string };

const SECTION_LABEL: Record<PageSection, string> = {
  methodology:  "Methodology",
  showcases:    "Showcases",
  frameworks:   "Frameworks",
  guides:       "Guides",
  intelligence: "Intelligence",
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ContentArticle({
  section,
  slug,
  schemaType,
  related,
}: {
  section: PageSection;
  slug: string;
  schemaType: SchemaType;
  related: RelatedLink[];
}) {
  const t = useTranslations(`Pages.${section}.${slug}`);
  const common = useTranslations("Pages.common");
  const locale = useLocale();

  const intro = t.raw("intro") as string[];
  const sections = t.raw("sections") as Section[];
  const faq = t.raw("faq") as Faq[];
  const h1 = t("h1");

  const canonical = `${SITE_URL}/${locale}/${section}/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: h1,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Outer padded container */}
      <div className="px-page-x pt-[130px] pb-[120px]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-muted mb-10 font-sans" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <Link href={`/${section}`} className="hover:text-white transition-colors capitalize">
            {SECTION_LABEL[section]}
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-soft truncate max-w-[30ch]">{h1.split("·")[0].split(":")[0].trim()}</span>
        </nav>

        {/* 3-column layout: share | content | sidebar */}
        <div className="flex gap-10 xl:gap-14 max-w-[1280px] mx-auto">

          {/* Left: floating share */}
          <FloatingShare title={h1} />

          {/* Center: main article */}
          <article className="flex-1 min-w-0 max-w-[740px]">
            <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-4">
              {t("badge")}
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(28px,3.8vw,46px)] leading-[1.07] tracking-[-0.03em] text-white mb-6">
              {h1}
            </h1>

            {/* Mobile share bar */}
            <FloatingShare title={h1} />

            {/* TL;DR */}
            <div
              role="note"
              aria-label="Summary"
              className="bg-card border border-line-soft rounded-[20px] p-6 md:p-7 mb-12"
            >
              <div className="font-pixel text-[8px] tracking-[0.15em] text-muted uppercase mb-2">TL;DR</div>
              <p className="text-soft text-[15px] md:text-[16px] leading-[1.7]">
                {t("tldr")}
              </p>
            </div>

            {/* Inline anchor nav (table of contents) */}
            {sections.length > 2 && (
              <nav className="border border-line-soft rounded-2xl p-5 mb-12 bg-card/40" aria-label="On this page">
                <div className="font-pixel text-[8px] tracking-[0.15em] text-muted uppercase mb-3">On this page</div>
                <ol className="flex flex-col gap-2">
                  {sections.map((s, i) => (
                    <li key={i}>
                      <a
                        href={`#${slugify(s.h2)}`}
                        className="flex items-center gap-2 text-[13px] text-soft hover:text-white transition-colors group"
                      >
                        <span className="font-pixel text-[8px] text-muted group-hover:text-accent transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.h2}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Intro paragraphs */}
            <div className="flex flex-col gap-5 mb-14">
              {intro.map((p, i) => (
                <p key={i} className="text-soft text-[16px] leading-[1.8]">
                  {p}
                </p>
              ))}
            </div>

            {/* Sections with anchor IDs */}
            <div className="flex flex-col gap-12">
              {sections.map((s, si) => (
                <section key={si} id={slugify(s.h2)} className="scroll-mt-[110px]">
                  <h2 className="font-sans font-bold text-white text-[clamp(20px,2.6vw,28px)] tracking-[-0.02em] leading-[1.15] mb-4">
                    {s.h2}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {s.body.map((p, i) => (
                      <p key={i} className="text-soft text-[16px] leading-[1.8]">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Related links */}
            {related.length > 0 && (
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
            )}

            {/* FAQ */}
            <div className="mt-20">
              <h2 className="font-sans font-extrabold text-white text-[clamp(22px,2.8vw,32px)] tracking-[-0.02em] mb-8">
                {common("faqTitle")}
              </h2>
              <div className="flex flex-col gap-3">
                {faq.map((f, i) => (
                  <details
                    key={i}
                    className="group bg-card border border-line-soft rounded-2xl px-6 py-5 transition-colors duration-fast hover:border-soft open:border-accent/40"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-sans font-semibold text-white text-[15px] md:text-[16px] leading-snug">
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
              <h2 className="font-sans font-extrabold text-white text-[clamp(20px,2.6vw,28px)] tracking-[-0.02em] mb-3">
                {common("ctaTitle")}
              </h2>
              <p className="text-soft text-[14px] leading-[1.7] max-w-[48ch] mx-auto mb-7">
                {common("ctaBody")}
              </p>
              <Link
                href="/#engage"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-sans font-semibold text-[14px] hover:bg-accent/90 transition-colors"
              >
                {common("ctaButton")} <span className="text-[12px] opacity-80">→</span>
              </Link>
            </div>
          </article>

          {/* Right: sidebar */}
          <ArticleSidebar section={section} currentSlug={slug} />
        </div>
      </div>
    </>
  );
}
