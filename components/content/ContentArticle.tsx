"use client";

import { type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Icon } from "../icons";
import { SITE_URL, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/seo/site";
import type { PageSection, SchemaType } from "@/lib/content/pages";
import type { RelatedLink } from "@/lib/content/meta";
import { FloatingShareDesktop, FloatingShareMobile } from "./FloatingShare";
import { ArticleSidebar } from "./ArticleSidebar";
import { INTERLINKS } from "@/lib/content/interlink";

type Section = { h2: string; body: string[] };
type Faq = { q: string; a: string };

const SECTION_LABEL: Record<PageSection, string> = {
  methodology:  "Methodology",
  showcases:    "Showcases",
  frameworks:   "Frameworks",
  guides:       "Guides",
  intelligence: "Intelligence",
};

// schema.org has no "CaseStudy" type, and a HowTo without a step[] array is
// invalid markup. Normalise the authoring intent from pages.ts to a valid
// article type so the emitted JSON-LD passes the Rich Results Test.
const VALID_ARTICLE_TYPE: Record<SchemaType, "Article" | "TechArticle"> = {
  TechArticle: "TechArticle",
  Article: "Article",
  CaseStudy: "Article",
  HowTo: "Article",
};

const ANCHOR_PATH = "/ai-product-engineering-for-mid-market-companies";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ── Contextual internal links (see lib/content/interlink.ts) ─────────────────
const INTERLINK_CLS =
  "text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent transition-colors";

function isLetter(ch: string | undefined) {
  return !!ch && /\p{L}/u.test(ch);
}

// Boundary-aware, case-insensitive index of `phrase` in `text` (avoids matching
// inside a longer word). Returns -1 if absent.
function findPhrase(text: string, phrase: string): number {
  const lower = text.toLowerCase();
  const p = phrase.toLowerCase();
  let from = 0;
  for (;;) {
    const idx = lower.indexOf(p, from);
    if (idx === -1) return -1;
    const before = idx > 0 ? text[idx - 1] : undefined;
    const after = idx + p.length < text.length ? text[idx + p.length] : undefined;
    if (!isLetter(before) && !isLetter(after)) return idx;
    from = idx + 1;
  }
}

// Wrap the earliest unused interlink term in a <Link>, then recurse on the rest.
// `used` is shared across the whole article so each target is linked only once.
function renderWithLinks(
  text: string,
  links: { href: string; phrases: string[] }[],
  used: Set<string>,
): ReactNode[] {
  let best: { start: number; end: number; href: string } | null = null;
  for (const l of links) {
    if (used.has(l.href)) continue;
    for (const phrase of l.phrases) {
      const idx = findPhrase(text, phrase);
      if (idx !== -1 && (best === null || idx < best.start)) {
        best = { start: idx, end: idx + phrase.length, href: l.href };
      }
    }
  }
  if (!best) return [text];
  used.add(best.href);
  return [
    text.slice(0, best.start),
    <Link key={best.href} href={best.href} className={INTERLINK_CLS}>
      {text.slice(best.start, best.end)}
    </Link>,
    ...renderWithLinks(text.slice(best.end), links, used),
  ];
}

export function ContentArticle({
  section,
  slug,
  schemaType,
  related,
  datePublished,
  dateModified,
  intro,
  sections,
  faq,
  widget,
}: {
  section: PageSection;
  slug: string;
  schemaType: SchemaType;
  related: RelatedLink[];
  datePublished?: string;
  dateModified?: string;
  // Article bodies are passed as props (not via next-intl) so the large
  // cluster copy is not serialized into every page's client bundle. See
  // i18n/request.ts (lightPages) and the cluster route page.tsx files.
  intro: string[];
  sections: Section[];
  faq: Faq[];
  // Optional interactive tool (framework pages); rendered after the intro.
  widget?: ReactNode;
}) {
  const t = useTranslations(`Pages.${section}.${slug}`);
  const common = useTranslations("Pages.common");
  const locale = useLocale();

  // Active interlinks for this locale, minus any self-link to the current page.
  const interlinks = INTERLINKS.map((l) => ({
    href: l.href,
    phrases: l.phrases[locale] ?? [],
  })).filter((l) => l.phrases.length > 0 && l.href !== `/${section}/${slug}`);
  const linkUsed = new Set<string>();

  const h1 = t("h1");

  const canonical = `${SITE_URL}/${locale}/${section}/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": VALID_ARTICLE_TYPE[schemaType],
    headline: h1,
    description: t("metaDescription"),
    inLanguage: locale,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", '[aria-label="Summary"]'],
    },
    mainEntityOfPage: canonical,
    // Reference the shared Organization/WebSite nodes (emitted site-wide in
    // components/JsonLd.tsx) by @id instead of re-declaring anonymous copies.
    // The publisher logo lives on that single Organization node; engines merge
    // the @id-matched blocks across the page into one entity.
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
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

  const shortTitle = h1.split("·")[0].split(":")[0].trim();

  // 4-level breadcrumb mirroring the visual nav below, with real human-readable
  // names and absolute localized URLs (Home / hub / section / this page).
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "AI Product Engineering", item: `${SITE_URL}/${locale}${ANCHOR_PATH}` },
      { "@type": "ListItem", position: 3, name: SECTION_LABEL[section], item: `${SITE_URL}/${locale}/${section}` },
      { "@type": "ListItem", position: 4, name: shortTitle, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="px-page-x pt-[130px] pb-[120px]">
        {/* 4-level breadcrumb: Home / AI Product Engineering / Section / Title */}
        <nav className="flex items-center flex-wrap gap-1.5 text-[12px] text-muted mb-10 font-sans" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <Link href={ANCHOR_PATH} className="hover:text-white transition-colors">AI Product Engineering</Link>
          <span className="opacity-40">/</span>
          <Link href={`/${section}`} className="hover:text-white transition-colors capitalize">
            {SECTION_LABEL[section]}
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-soft truncate max-w-[28ch]">{shortTitle}</span>
        </nav>

        {/* 3-column: desktop share | article | sidebar */}
        <div className="flex gap-10 xl:gap-14 max-w-[1280px] mx-auto">

          {/* Left: desktop-only sticky share */}
          <FloatingShareDesktop title={h1} />

          {/* Center: article body */}
          <article className="flex-1 min-w-0 max-w-[740px]">
            <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-4">
              {t("badge")}
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(28px,3.8vw,46px)] leading-[1.07] tracking-[-0.03em] text-white mb-6">
              {h1}
            </h1>

            {/* Mobile-only inline share bar */}
            <FloatingShareMobile title={h1} />

            {/* TL;DR */}
            <div role="note" aria-label="Summary" className="bg-card border border-line-soft rounded-[20px] p-6 md:p-7 mb-12">
              <div className="font-pixel text-[8px] tracking-[0.15em] text-muted uppercase mb-2">TL;DR</div>
              <p className="text-soft text-[15px] md:text-[16px] leading-[1.7]">{t("tldr")}</p>
            </div>

            {/* Inline table of contents */}
            {sections.length > 2 && (
              <nav className="border border-line-soft rounded-2xl p-5 mb-12 bg-card/40" aria-label="On this page">
                <div className="font-pixel text-[8px] tracking-[0.15em] text-muted uppercase mb-3">On this page</div>
                <ol className="flex flex-col gap-2">
                  {sections.map((s, i) => (
                    <li key={i}>
                      <a href={`#${slugify(s.h2)}`} className="flex items-center gap-2 text-[13px] text-soft hover:text-white transition-colors group">
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

            {/* Intro */}
            <div className="flex flex-col gap-5 mb-14">
              {intro.map((p, i) => (
                <p key={i} className="text-soft text-[16px] leading-[1.8]">{renderWithLinks(p, interlinks, linkUsed)}</p>
              ))}
            </div>

            {/* Optional interactive widget (framework pages) */}
            {widget && <div className="mb-14">{widget}</div>}

            {/* Sections with anchor IDs */}
            <div className="flex flex-col gap-12">
              {sections.map((s, si) => (
                <section key={si} id={slugify(s.h2)} className="scroll-mt-[110px]">
                  <h2 className="font-sans font-bold text-white text-[clamp(20px,2.6vw,28px)] tracking-[-0.02em] leading-[1.15] mb-4">
                    {s.h2}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {s.body.map((p, i) => (
                      <p key={i} className="text-soft text-[16px] leading-[1.8]">{renderWithLinks(p, interlinks, linkUsed)}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Related links */}
            {related.length > 0 && (
              <div className="mt-14 flex flex-wrap gap-3">
                {related.map((r) => (
                  <Link key={r.href} href={r.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line-soft text-soft text-[13px] hover:text-white hover:border-soft transition-colors">
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
                  <details key={i} className="group bg-card border border-line-soft rounded-2xl px-6 py-5 transition-colors duration-fast hover:border-soft open:border-accent/40">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-sans font-semibold text-white text-[15px] md:text-[16px] leading-snug">
                      {f.q}
                      <Icon name="chevron-down" size={18} className="shrink-0 text-muted transition-transform duration-fast group-open:rotate-180 group-open:text-accent" />
                    </summary>
                    <p className="text-soft text-[14px] md:text-[15px] leading-[1.7] mt-4">{f.a}</p>
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
              <Link href="/#engage" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-sans font-semibold text-[14px] hover:bg-accent/90 transition-colors">
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
