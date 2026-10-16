"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { SectionHead } from "../ui/Atoms";
import { Link } from "@/i18n/routing";
import { staggerSlow, fadeUp } from "@/lib/motion";
import { ShowcaseSlideshow } from "../ui/ShowcaseSlideshow";

type CaseData = {
  name: string;
  geo: string;
  tag: string;
  year: string;
  body: string;
};

// Index-aligned with messages/*.json → SelectedWork.cases. On desktop the first
// VISIBLE_CASES (product and platform work) show; the rest (the local-business
// sites) sit behind the "View more" toggle. The phone carousel shows them all.
const CASE_SLUGS = ["epidom", "expeditoo", "acte", "the-lead-agent", "serrurier-paris-express", "glvitr-clean"];
const VISIBLE_CASES = 4;
// null = no public demo. The "expeditoo" slug is the Expedion × Expeditoo case;
// its demo is the buyer app, which links on to the carrier platform.
const CASE_DEMOS: (string | null)[] = [
  "https://epidom-eight.vercel.app/",
  "https://expedion-encheres.vercel.app/",
  "https://acte-web.vercel.app/",
  "https://lead-agent-lac.vercel.app/",
  "https://serrurier-paris-theta.vercel.app/",
  "https://www.glvitr-clean.com/",
];

function CaseTile({
  c, slug, demo, viewLabel, demoLabel,
}: {
  c: CaseData; slug: string; demo: string | null; viewLabel: string; demoLabel: string;
}) {
  return (
    <m.div
      variants={fadeUp}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 320, damping: 22 } }}
      className="bg-card rounded-[24px] p-5 md:p-6 flex flex-col gap-4 min-h-[380px] h-full relative overflow-hidden isolate border border-line transition-colors duration-300 hover:bg-card-soft hover:border-soft hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)] group"
    >
      {/* primary CTA → internal case study, stretched over the whole card (keeps
          ranking signals on our own domain); demo link below opts out via z-index */}
      <Link href={`/showcases/${slug}`} aria-label={`${c.name} — ${viewLabel}`} className="absolute inset-0 z-20 rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent" />

      <div className="flex justify-between items-start gap-3">
        <span className="font-pixel text-[8px] md:text-[9px] tracking-[0.15em] text-accent uppercase">{c.tag}</span>
        <span className="text-muted font-pixel text-[8px] md:text-[9px] tracking-[0.15em]">{c.year}</span>
      </div>
      {/* 16:10, the shape of the public/work frames, so each shows whole */}
      <div className="rounded-xl aspect-[16/10] shrink-0 relative overflow-hidden bg-card-soft border border-line-soft">
        <ShowcaseSlideshow slug={slug} alt={c.name} sizes="(min-width: 1024px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
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
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${c.name} — ${demoLabel}`}
            className="relative z-30 inline-flex items-center gap-1 text-[10px] md:text-[11px] font-semibold text-muted hover:text-white transition-colors"
          >
            {demoLabel} <span aria-hidden="true">↗</span>
          </a>
        )}
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
    <CaseTile key={i} c={c} slug={CASE_SLUGS[i]} demo={CASE_DEMOS[i]} viewLabel={t("view_project")} demoLabel={t("live_demo")} />
  ));

  // `open` drives the reveal; `settled` lifts the clipping once the row has fully
  // opened, so the tiles' hover lift and shadow aren't cut off.
  const [open, setOpen] = useState(false);
  const [settled, setSettled] = useState(false);
  const toggle = () => {
    const next = !open;
    setOpen(next);
    // With reduced motion there is no transition, so no transitionend to wait for.
    setSettled(next && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  };

  return (
    <section id="selected-work" className="relative px-page-x py-[140px] max-w-max-w mx-auto">
      <SectionHead n="03" label={t("label")} title={t("title")} link={t("link")} linkHref="/showcases" />

      {/* Desktop Grid */}
      <m.div
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="hidden md:grid md:grid-cols-2 gap-5 mt-10"
      >
        {caseCards.slice(0, VISIBLE_CASES)}
      </m.div>

      {/* Desktop "View more": the remaining tiles stay in the DOM (crawlable) but
          collapsed and inert until opened; the 0fr→1fr grid row animates the height. */}
      <div
        id="selected-work-more"
        inert={!open}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget && e.propertyName === "grid-template-rows") setSettled(open);
        }}
        className={`hidden md:grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className={`min-h-0 ${settled ? "overflow-visible" : "overflow-hidden"}`}>
          <m.div
            variants={staggerSlow}
            initial="hidden"
            animate={open ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-5 pt-5"
          >
            {caseCards.slice(VISIBLE_CASES)}
          </m.div>
        </div>
      </div>

      <div className="hidden md:flex justify-center mt-8">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="selected-work-more"
          className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${open ? "" : "view-more-pulse"}`}
        >
          {open ? t("view_less") : t("view_more")}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : "view-more-bob"}`}
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Mobile Carousel */}
      <MobileCarousel>
        {caseCards}
      </MobileCarousel>
    </section>
  );
}
