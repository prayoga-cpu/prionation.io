"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getPublishedPages, type PageMeta, type PageSection } from "@/lib/content/pages";

const SCHEMA_HUE: Record<string, string> = {
  TechArticle: "text-accent bg-accent-10 border-accent-30",
  CaseStudy:   "text-green-400 bg-green-500/10 border-green-500/20",
  HowTo:       "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Article:     "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

const SECTION_META: Record<PageSection, { label: string; desc: string }> = {
  methodology:  { label: "Methodology", desc: "The four engineering principles that make fixed-price AI production possible." },
  showcases:    { label: "Showcases", desc: "First-party case studies from production AI engagements." },
  frameworks:   { label: "Frameworks", desc: "Decision tools and calculators for AI operators." },
  guides:       { label: "Guides", desc: "Honest answers to the questions buyers ask before signing." },
  intelligence: { label: "Intelligence", desc: "First-party observations from real engagements by vertical." },
};

const ALL_SECTIONS: PageSection[] = ["methodology", "showcases", "frameworks", "guides", "intelligence"];
const ANCHOR_PATH = "/ai-product-engineering-for-mid-market-companies";

function FeaturedCard({ page, section }: { page: PageMeta; section: PageSection }) {
  return (
    <Link
      href={`/${section}/${page.slug}`}
      className="group bg-card border border-line-soft rounded-[24px] p-7 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 transition-colors duration-fast hover:bg-card-soft hover:border-soft hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
    >
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className={`font-pixel text-[8px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border ${SCHEMA_HUE[page.schema] ?? SCHEMA_HUE.TechArticle}`}>
            {page.schema}
          </span>
          <span className="font-pixel text-[8px] tracking-[0.12em] text-muted uppercase">
            {page.audience} · featured
          </span>
        </div>
        <h2 className="font-sans font-extrabold text-white text-[clamp(20px,2.6vw,32px)] leading-[1.1] tracking-[-0.02em] group-hover:text-accent transition-colors">
          {page.seoTitle.split("·")[0].trim()}
        </h2>
        <p className="text-soft text-[15px] leading-[1.7] max-w-[55ch]">
          {page.metaDescription}
        </p>
        <div className="flex items-center gap-2 text-accent font-sans font-semibold text-[14px] mt-2">
          Read article <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>

      {/* Tier-1 keywords as decorative chips */}
      <div className="flex flex-col justify-center gap-2 shrink-0 max-w-[200px]">
        {page.tier1Keywords.map((kw, i) => (
          <span key={i} className="font-pixel text-[7px] tracking-[0.1em] text-muted border border-line-soft rounded-lg px-3 py-2 leading-snug">
            {kw}
          </span>
        ))}
      </div>
    </Link>
  );
}

function PostCard({ page, section }: { page: PageMeta; section: PageSection }) {
  const badgeCls = SCHEMA_HUE[page.schema] ?? SCHEMA_HUE.TechArticle;
  return (
    <Link
      href={`/${section}/${page.slug}`}
      className="group bg-card border border-line-soft rounded-[20px] p-6 flex flex-col gap-4 transition-colors duration-fast hover:bg-card-soft hover:border-soft hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`font-pixel text-[8px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border ${badgeCls}`}>
          {page.schema}
        </span>
        <span className="font-pixel text-[8px] tracking-[0.12em] text-muted uppercase">
          {page.audience}
        </span>
      </div>
      <h2 className="font-sans font-bold text-white text-[17px] md:text-[18px] leading-snug tracking-[-0.015em] group-hover:text-accent transition-colors">
        {page.seoTitle.split("·")[0].trim()}
      </h2>
      <p className="text-soft text-[13px] leading-[1.65] flex-1">
        {page.metaDescription}
      </p>
      <div className="flex items-center gap-2 text-accent font-sans font-semibold text-[13px] mt-auto">
        Read <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}

export function SectionIndex({
  section,
  pages,
}: {
  section: PageSection;
  pages: PageMeta[];
}) {
  const common = useTranslations("Pages.common");
  const [featured, ...rest] = pages;
  const meta = SECTION_META[section];
  const otherSections = ALL_SECTIONS.filter((s) => s !== section);

  return (
    <main className="relative px-page-x pt-[130px] pb-[120px]">
      <div className="max-w-max-w mx-auto">

        {/* Breadcrumb: Home / AI Product Engineering / Section */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted mb-10 font-sans flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <Link href={ANCHOR_PATH} className="hover:text-white transition-colors">AI Product Engineering</Link>
          <span className="opacity-40">/</span>
          <span className="text-soft">{meta.label}</span>
        </nav>

        {/* Header */}
        <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-4">
          AI Product Engineering
        </div>
        <h1 className="font-sans font-extrabold text-[clamp(32px,4.5vw,60px)] leading-[1.03] tracking-[-0.03em] text-white mb-4">
          {meta.label}
        </h1>
        <p className="text-soft text-[16px] leading-[1.7] max-w-[52ch] mb-14">
          {meta.desc}
        </p>

        {pages.length === 0 ? (
          <div className="border border-dashed border-line-soft rounded-[20px] p-12 text-center text-muted text-[14px]">
            No articles published yet. Check back soon.
          </div>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <div className="mb-8">
                <div className="font-pixel text-[9px] tracking-[0.18em] text-muted uppercase mb-5">
                  Featured article
                </div>
                <FeaturedCard page={featured} section={section} />
              </div>
            )}

            {/* Remaining grid */}
            {rest.length > 0 && (
              <div className="mb-16">
                <div className="font-pixel text-[9px] tracking-[0.18em] text-muted uppercase mb-5">
                  {rest.length} more {rest.length === 1 ? "article" : "articles"}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((p) => (
                    <PostCard key={p.slug} page={p} section={section} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Other sections */}
        <div className="border-t border-line-soft pt-14">
          <div className="font-pixel text-[9px] tracking-[0.18em] text-muted uppercase mb-6">
            Explore other categories
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {otherSections.map((s) => {
              const count = getPublishedPages(s).length;
              const m = SECTION_META[s];
              return (
                <Link
                  key={s}
                  href={`/${s}`}
                  className="group bg-card border border-line-soft rounded-2xl p-4 flex flex-col gap-2 hover:bg-card-soft hover:border-soft transition-all"
                >
                  <span className="font-sans font-semibold text-white text-[14px] group-hover:text-accent transition-colors">
                    {m.label}
                  </span>
                  <span className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase">
                    {count} article{count !== 1 ? "s" : ""}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-card border border-accent/30 rounded-[24px] p-8 md:p-10 text-center bg-[radial-gradient(circle_at_50%_0%,rgba(88,101,242,0.1)_0%,transparent_70%)]">
          <h2 className="font-sans font-extrabold text-white text-[clamp(20px,2.5vw,28px)] tracking-[-0.02em] mb-3">
            {common("ctaTitle")}
          </h2>
          <p className="text-soft text-[14px] leading-[1.7] max-w-[48ch] mx-auto mb-7">
            {common("ctaBody")}
          </p>
          <Link href="/#engage" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-sans font-semibold text-[14px] hover:bg-accent/90 transition-colors">
            {common("ctaButton")} <span className="text-[12px] opacity-80">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
