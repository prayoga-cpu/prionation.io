"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Dot } from "../ui/Atoms";
import { getPublishedPages } from "@/lib/content/pages";
import { fadeUp, staggerSlow } from "@/lib/motion";

const SCHEMA_HUE: Record<string, string> = {
  TechArticle: "text-accent bg-accent-10 border-accent-30",
  CaseStudy:   "text-green-400 bg-green-500/10 border-green-500/20",
  HowTo:       "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Article:     "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

// Pick a handful of representative published pages across sections.
function getFeatured() {
  const all = [
    ...getPublishedPages("methodology").slice(0, 1),
    ...getPublishedPages("frameworks").slice(0, 1),
    ...getPublishedPages("guides").slice(0, 1),
    ...getPublishedPages("showcases").slice(0, 1),
    ...getPublishedPages("intelligence").slice(0, 1),
  ];
  return all.slice(0, 3);
}

export function ContentHighlight() {
  const t = useTranslations("Header"); // reuses cta key
  const featured = getFeatured();

  return (
    <section className="relative px-page-x py-[100px] md:py-[120px]">
      <div className="max-w-max-w mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="text-muted font-pixel text-[10px] tracking-[0.15em] mb-4 flex items-center gap-2.5 uppercase">
              <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
              06.5 · AI Product Engineering
            </div>
            <h2 className="font-sans font-extrabold text-[clamp(28px,3.6vw,48px)] leading-[1.06] tracking-[-0.03em] text-white uppercase max-w-[18ch]">
              The knowledge base.
            </h2>
          </div>
          <Link
            href="/ai-product-engineering-for-mid-market-companies"
            className="shrink-0 inline-flex items-center gap-2 text-[13px] text-soft border-b border-line-soft pb-1 hover:text-white hover:border-white transition-colors"
          >
            Explore all articles <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        {featured.length > 0 && (
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
          >
            {featured.map((page) => (
              <motion.div key={page.slug} variants={fadeUp}>
                <Link
                  href={`/${page.section}/${page.slug}`}
                  className="group flex flex-col gap-4 bg-card border border-line-soft rounded-[20px] p-6 h-full hover:bg-card-soft hover:border-soft hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-fast"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-pixel text-[8px] tracking-[0.12em] uppercase px-2 py-1 rounded-full border ${SCHEMA_HUE[page.schema] ?? SCHEMA_HUE.TechArticle}`}>
                      {page.section}
                    </span>
                    <span className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase">
                      {page.audience}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-white text-[16px] md:text-[17px] leading-snug tracking-[-0.01em] group-hover:text-accent transition-colors flex-1">
                    {page.seoTitle.split("·")[0].trim()}
                  </h3>
                  <p className="text-muted text-[12px] md:text-[13px] leading-[1.6] line-clamp-3">
                    {page.metaDescription}
                  </p>
                  <div className="flex items-center gap-1.5 text-accent font-sans font-semibold text-[12px] mt-auto">
                    Read <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Categories strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap gap-3"
        >
          {(["methodology", "showcases", "frameworks", "guides", "intelligence"] as const).map((sec) => {
            const count = getPublishedPages(sec).length;
            return (
              <Link
                key={sec}
                href={`/${sec}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-line-soft text-muted text-[13px] hover:text-white hover:border-soft transition-all group"
              >
                <span className="capitalize font-sans">{sec}</span>
                <span className="font-pixel text-[7px] tracking-[0.1em] opacity-50 group-hover:opacity-80">{count}</span>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
