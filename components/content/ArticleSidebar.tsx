"use client";

import { Link } from "@/i18n/routing";
import { getPublishedPages, type PageSection } from "@/lib/content/pages";

const SECTION_LABEL: Record<PageSection, string> = {
  methodology:  "Methodology",
  showcases:    "Showcases",
  frameworks:   "Frameworks",
  guides:       "Guides",
  intelligence: "Intelligence",
};

const SECTIONS: PageSection[] = ["methodology", "showcases", "frameworks", "guides", "intelligence"];

export function ArticleSidebar({
  section,
  currentSlug,
}: {
  section: PageSection;
  currentSlug: string;
}) {
  const sectionPages = getPublishedPages(section)
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  const LINK_CLS =
    "group flex gap-3 items-start py-3 border-b border-line-soft last:border-0 hover:opacity-90 transition-opacity";

  return (
    <aside className="hidden xl:flex flex-col gap-8 sticky top-[140px] self-start w-[260px] shrink-0">
      {/* Recent in this section */}
      {sectionPages.length > 0 && (
        <div>
          <h3 className="font-pixel text-[9px] tracking-[0.15em] text-muted uppercase mb-4 flex items-center gap-2">
            <span className="w-3 h-[1px] bg-accent inline-block" />
            More {SECTION_LABEL[section]}
          </h3>
          <div className="flex flex-col">
            {sectionPages.map((p) => (
              <Link key={p.slug} href={`/${section}/${p.slug}`} className={LINK_CLS}>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-pixel text-[7px] tracking-[0.12em] text-accent uppercase">
                    {section}
                  </span>
                  <span className="font-sans text-[13px] text-soft group-hover:text-white transition-colors leading-snug line-clamp-2">
                    {p.seoTitle.split("·")[0].trim()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All categories */}
      <div>
        <h3 className="font-pixel text-[9px] tracking-[0.15em] text-muted uppercase mb-4 flex items-center gap-2">
          <span className="w-3 h-[1px] bg-accent inline-block" />
          Categories
        </h3>
        <div className="flex flex-col gap-1.5">
          {SECTIONS.map((s) => {
            const count = getPublishedPages(s).length;
            const active = s === section;
            return (
              <Link
                key={s}
                href={`/${s}`}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-[13px] transition-all duration-fast ${
                  active
                    ? "bg-accent/10 text-accent border border-accent/30"
                    : "text-muted hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <span className="font-sans">{SECTION_LABEL[s]}</span>
                <span className="font-pixel text-[8px] tracking-[0.1em] opacity-60">{count}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-card border border-accent/20 rounded-2xl p-5 text-center">
        <p className="text-soft text-[12px] leading-[1.6] mb-4">
          Ready to map your bottleneck?
        </p>
        <Link
          href="/#engage"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-white font-sans font-semibold text-[12px] hover:bg-accent/90 transition-colors"
        >
          Start a Diagnostic <span className="opacity-80">→</span>
        </Link>
      </div>
    </aside>
  );
}
