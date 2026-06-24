"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { SectionHead } from "../ui/Atoms";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { staggerSlow, fadeUp } from "@/lib/motion";
import { SHOWCASE_IMAGES } from "@/lib/content/pages";

type CaseData = {
  name: string;
  geo: string;
  tag: string;
  year: string;
  body: string;
};

const CASE_SLUGS = ["epidom", "expeditoo", "the-lead-agent"];
const CASE_DEMOS = [
  "https://epidom-eight.vercel.app/",
  "https://expeditoo-rho.vercel.app/",
  "https://lead-agent-lac.vercel.app/",
];
// Images come from the shared showcase map (lib/content/pages.ts) so the tiles
// and the showcase Article JSON-LD always reference the same owned assets.
const CASE_IMGS = CASE_SLUGS.map((s) => SHOWCASE_IMAGES[s]);

function CaseTile({
  c, slug, demo, img, viewLabel, demoLabel,
}: {
  c: CaseData; slug: string; demo: string; img: string; viewLabel: string; demoLabel: string;
}) {
  return (
    <m.div
      variants={fadeUp}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 320, damping: 22 } }}
      className="bg-card rounded-[24px] p-5 md:p-6 flex flex-col gap-4 min-h-[380px] h-full relative overflow-hidden isolate border border-line transition-colors duration-300 hover:bg-card-soft hover:border-soft hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)] group lg:col-span-3"
    >
      {/* primary CTA → internal case study, stretched over the whole card (keeps
          ranking signals on our own domain); demo link below opts out via z-index */}
      <Link href={`/showcases/${slug}`} aria-label={`${c.name} — ${viewLabel}`} className="absolute inset-0 z-20 rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent" />

      <div className="flex justify-between items-center">
        <span className="font-pixel text-[8px] md:text-[9px] tracking-[0.15em] text-accent uppercase">{c.tag}</span>
        <span className="text-muted font-pixel text-[8px] md:text-[9px] tracking-[0.15em]">{c.year}</span>
      </div>
      <div className="rounded-xl flex-1 min-h-[160px] relative overflow-hidden bg-card-soft border border-line-soft">
        <Image src={img} alt={c.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="font-sans font-extrabold text-[18px] md:text-[20px] text-white tracking-tight uppercase">{c.name}</div>
        <div className="font-pixel text-[8px] md:text-[9px] tracking-[0.16em] text-muted uppercase">{c.geo}</div>
      </div>
      <p className="text-soft text-[13px] md:text-[14px] leading-[1.5] md:leading-[1.6] line-clamp-3 md:line-clamp-none mb-2 md:mb-0">{c.body}</p>
      <div className="mt-auto pt-2 md:pt-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-[11px] md:text-[12px] font-bold text-accent">
          {viewLabel}{" "}
          <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${c.name} — ${demoLabel}`}
          className="relative z-30 inline-flex items-center gap-1 text-[10px] md:text-[11px] font-semibold text-muted hover:text-white transition-colors"
        >
          {demoLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </m.div>
  );
}

function MobileCarousel({ children }: { children: React.ReactNode[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // One crawlable copy only — a snap-scroll carousel of the real cards. (Was
  // cloning the set 15× = 45 duplicate DOM nodes, which bloated crawl budget.)
  return (
    <div
      ref={scrollRef}
      className="relative w-[100vw] -ml-[var(--page-x)] flex overflow-x-auto snap-x snap-mandatory md:hidden mt-8 py-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      style={{ scrollPaddingLeft: "var(--page-x)" }}
    >
      <div className="flex gap-4 px-[var(--page-x)] w-max">
        {children.map((child, i) => (
          <m.div
            key={i}
            className="snap-start shrink-0 w-[280px] h-[440px] origin-left"
            initial={{ scale: 0.85, opacity: 0.35 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ root: scrollRef, amount: 0.75 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            {child}
          </m.div>
        ))}
        {/* Spacer to allow the final item to snap properly */}
        <div className="w-[var(--page-x)] shrink-0" />
      </div>
    </div>
  );
}

export function SelectedWork() {
  const t = useTranslations("SelectedWork");
  const cases = t.raw("cases") as CaseData[];

  const caseCards = cases.map((c, i) => (
    <CaseTile key={i} c={c} slug={CASE_SLUGS[i]} demo={CASE_DEMOS[i]} img={CASE_IMGS[i]} viewLabel={t("view_project")} demoLabel={t("live_demo")} />
  ));

  return (
    <section id="selected-work" className="relative px-page-x py-[140px] max-w-max-w mx-auto">
      <SectionHead n="03" label={t("label")} title={t("title")} link={t("link")} linkHref="/showcases" />
      
      {/* Desktop Grid */}
      <m.div
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="hidden md:grid grid-cols-1 lg:grid-cols-[repeat(9,1fr)] gap-5 mt-10"
      >
        {caseCards}
      </m.div>

      {/* Mobile Carousel */}
      <MobileCarousel>
        {caseCards}
      </MobileCarousel>
    </section>
  );
}
