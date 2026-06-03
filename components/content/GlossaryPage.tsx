"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo/site";

type Term = { term: string; def: string };

const ANCHOR_PATH = "/ai-product-engineering-for-mid-market-companies";
const GLOSSARY_PATH = "/ai-engineering-glossary";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Standalone trilingual glossary. Emits DefinedTermSet (machine-readable
// definitions for AEO/GEO) + BreadcrumbList. Content lives in messages under the
// "Glossary" namespace; this mirrors the AnchorPage pattern.
export function GlossaryPage() {
  const t = useTranslations("Glossary");
  const locale = useLocale();

  const intro = t.raw("intro") as string[];
  const terms = t.raw("terms") as Term[];
  const h1 = t("h1");
  const canonical = `${SITE_URL}/${locale}${GLOSSARY_PATH}`;

  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: h1,
    description: t("metaDescription"),
    url: canonical,
    inLanguage: locale,
    hasDefinedTerm: terms.map((x) => ({
      "@type": "DefinedTerm",
      name: x.term,
      description: x.def,
      inDefinedTermSet: canonical,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "AI Product Engineering", item: `${SITE_URL}/${locale}${ANCHOR_PATH}` },
      { "@type": "ListItem", position: 3, name: h1, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="px-page-x pt-[130px] pb-[120px]">
        <div className="max-w-[860px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center flex-wrap gap-1.5 text-[12px] text-muted mb-10 font-sans" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <Link href={ANCHOR_PATH} className="hover:text-white transition-colors">AI Product Engineering</Link>
            <span className="opacity-40">/</span>
            <span className="text-soft truncate max-w-[28ch]">{h1}</span>
          </nav>

          <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-4">
            {t("badge")}
          </div>
          <h1 className="font-sans font-extrabold text-[clamp(28px,3.8vw,46px)] leading-[1.07] tracking-[-0.03em] text-white mb-6">
            {h1}
          </h1>

          {/* Intro */}
          <div className="flex flex-col gap-5 mb-12 max-w-[680px]">
            {intro.map((p, i) => (
              <p key={i} className="text-soft text-[16px] leading-[1.8]">{p}</p>
            ))}
          </div>

          {/* Jump index */}
          <nav className="border border-line-soft rounded-2xl p-5 mb-12 bg-card/40" aria-label="Jump to term">
            <div className="font-pixel text-[8px] tracking-[0.15em] text-muted uppercase mb-3">
              {terms.length} terms
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 list-none p-0 m-0">
              {terms.map((x) => (
                <li key={x.term}>
                  <a href={`#${slugify(x.term)}`} className="text-[13px] text-soft hover:text-white transition-colors">
                    {x.term}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Definitions */}
          <dl className="flex flex-col gap-3 m-0">
            {terms.map((x) => (
              <div
                key={x.term}
                id={slugify(x.term)}
                className="scroll-mt-[110px] bg-card border border-line-soft rounded-2xl px-6 py-5 transition-colors duration-fast hover:border-soft"
              >
                <dt className="font-sans font-semibold text-white text-[16px] md:text-[17px] leading-snug mb-2">
                  {x.term}
                </dt>
                <dd className="text-soft text-[14px] md:text-[15px] leading-[1.7] m-0">
                  {x.def}
                </dd>
              </div>
            ))}
          </dl>

          {/* CTA */}
          <div className="mt-16 bg-card border border-accent/30 rounded-[24px] p-8 md:p-10 text-center bg-[radial-gradient(circle_at_50%_0%,rgba(88,101,242,0.1)_0%,transparent_70%)]">
            <h2 className="font-sans font-extrabold text-white text-[clamp(20px,2.6vw,28px)] tracking-[-0.02em] mb-3">
              {t("ctaTitle")}
            </h2>
            <p className="text-soft text-[14px] leading-[1.7] max-w-[48ch] mx-auto mb-7">
              {t("ctaBody")}
            </p>
            <Link href="/#engage" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-sans font-semibold text-[14px] hover:bg-accent/90 transition-colors">
              {t("ctaButton")} <span className="text-[12px] opacity-80">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
