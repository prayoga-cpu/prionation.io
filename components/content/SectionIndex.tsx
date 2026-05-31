"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { PageMeta, PageSection } from "@/lib/content/pages";

// Shared badge colour by schema type.
const SCHEMA_HUE: Record<string, string> = {
  TechArticle: "text-accent bg-accent-10 border-accent-30",
  CaseStudy:   "text-green-400 bg-green-500/10 border-green-500/20",
  HowTo:       "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Article:     "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

const SECTION_LABEL: Record<PageSection, string> = {
  methodology:  "Methodology",
  showcases:    "Showcases",
  frameworks:   "Frameworks",
  guides:       "Guides",
  intelligence: "Intelligence",
};

function PostCard({ page, section }: { page: PageMeta; section: PageSection }) {
  const badgeCls =
    SCHEMA_HUE[page.schema] ??
    "text-accent bg-accent-10 border-accent-30";

  return (
    <Link
      href={`/${section}/${page.slug}`}
      className="group bg-card border border-line-soft rounded-[20px] p-6 flex flex-col gap-4 transition-colors duration-fast hover:bg-card-soft hover:border-soft hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`font-pixel text-[8px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border ${badgeCls}`}
        >
          {page.schema}
        </span>
        <span className="font-pixel text-[8px] tracking-[0.12em] text-muted uppercase">
          {page.audience.toUpperCase()}
        </span>
      </div>

      <h2 className="font-sans font-bold text-white text-[17px] md:text-[19px] leading-snug tracking-[-0.015em] group-hover:text-accent transition-colors">
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

  return (
    <main className="relative px-page-x pt-[140px] pb-[120px] max-w-max-w mx-auto">
      <Link
        href="/"
        className="inline-block text-muted text-[13px] hover:text-white transition-colors mb-10"
      >
        {common("backToHome")}
      </Link>

      <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-4">
        AI Product Engineering
      </div>

      <h1 className="font-sans font-extrabold text-[clamp(30px,4.2vw,52px)] leading-[1.05] tracking-[-0.03em] text-white mb-4">
        {SECTION_LABEL[section]}
      </h1>

      <p className="text-soft text-[16px] leading-[1.7] max-w-[56ch] mb-14">
        {pages.length} {pages.length === 1 ? "article" : "articles"} published.
      </p>

      {pages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pages.map((p) => (
            <PostCard key={p.slug} page={p} section={section} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-line-soft rounded-[20px] p-10 text-center text-muted text-[14px]">
          No articles published yet. Check back soon.
        </div>
      )}

      <div className="mt-20 bg-card border border-accent/30 rounded-[24px] p-8 md:p-10 text-center bg-[radial-gradient(circle_at_50%_0%,rgba(88,101,242,0.1)_0%,transparent_70%)]">
        <h2 className="font-sans font-extrabold text-white text-[clamp(22px,2.8vw,30px)] tracking-[-0.02em] mb-3">
          {common("ctaTitle")}
        </h2>
        <p className="text-soft text-[15px] leading-[1.7] max-w-[48ch] mx-auto mb-7">
          {common("ctaBody")}
        </p>
        <Link
          href="/#engage"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-sans font-semibold text-[14px] hover:bg-accent/90 transition-colors"
        >
          {common("ctaButton")} <span className="text-[12px] opacity-80">→</span>
        </Link>
      </div>
    </main>
  );
}
