"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { m } from "framer-motion";
import { Dot, Btn } from "../ui/Atoms";
import { Icon } from "../icons";
import { Header } from "../Header";
import { SiteFooter } from "../sections/SiteFooter";
import { staggerFast, staggerSlow, fadeUp } from "@/lib/motion";

/* ────────────────────────────────────────────────────────────────────────────
   Structural video data — language-neutral. Display copy (title, hook, tags)
   lives in messages under Start.library.videos, index-matched to this array.
   Drop a `youtubeId` here once a clip is ready and the placeholder becomes a
   live embed automatically.
   ──────────────────────────────────────────────────────────────────────────── */
type TagVariant = "default" | "cto" | "express";

type LibVideo = {
  cats: string[];
  dur: string;
  variant: TagVariant;
  youtubeId?: string;
};

const LIBRARY: LibVideo[] = [
  { cats: ["ceo"], dur: "60s", variant: "default" },
  { cats: ["pricing"], dur: "45s", variant: "default" },
  { cats: ["pricing"], dur: "60s", variant: "default" },
  { cats: ["ceo", "pricing"], dur: "45s", variant: "default" },
  { cats: ["ceo"], dur: "30s", variant: "default" },
  { cats: ["cto"], dur: "45s", variant: "cto" },
  { cats: ["quick"], dur: "30s", variant: "express" },
  { cats: ["pricing", "ceo"], dur: "45s", variant: "default" },
  { cats: ["quick"], dur: "30s", variant: "default" },
];

const TAB_KEYS = ["all", "ceo", "cto", "pricing", "quick"] as const;
type TabKey = (typeof TAB_KEYS)[number];

const TAG_STYLES: Record<TagVariant, string> = {
  default: "bg-accent-10 text-accent border-accent-30",
  cto: "bg-green-500/10 text-green-400 border-green-500/20",
  express: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

/* ─── Shared reveal wrapper ──────────────────────────────────────────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/* ─── Eyebrow (numbered section label) ───────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted font-pixel text-[10px] tracking-[0.15em] mb-4 flex items-center gap-2.5 uppercase">
      <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
      {children}
    </div>
  );
}

/* ─── Video frame: live embed if youtubeId is set, else play placeholder ─── */
function VideoFrame({
  youtubeId,
  title,
  className = "",
}: {
  youtubeId?: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (youtubeId && playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&autoplay=1`}
        title={title}
        allow="accelerated-download; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`absolute inset-0 w-full h-full border-0 ${className}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => youtubeId && setPlaying(true)}
      aria-label={title}
      className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,var(--c-card-soft)_0%,rgba(88,101,242,0.08)_100%)] group/play"
    >
      <span className="w-[42px] h-[42px] rounded-full bg-accent/90 flex items-center justify-center transition-transform duration-fast group-hover/play:scale-110">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </span>
    </button>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
function Hero({ diagHref }: { diagHref: string }) {
  const t = useTranslations("Start.hero");

  return (
    <section
      id="top"
      className="relative overflow-hidden px-page-x pt-[140px] pb-[80px]"
    >
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(55%_45%_at_15%_15%,var(--c-accent-glow)_0%,transparent_60%),linear-gradient(180deg,#0c0e1a_0%,#08090d_75%)] opacity-90" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(70%_70%_at_30%_25%,#000_30%,transparent_85%)]" />

      <m.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-max-w mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center"
      >
        {/* Left: copy */}
        <div>
          <m.div variants={fadeUp} className="flex items-center gap-3 mb-7">
            <span className="font-pixel text-[8px] text-accent bg-accent-10 border border-accent-30 px-2.5 py-1.5 rounded-md">
              v.3.1.0
            </span>
            <span className="font-pixel text-[9px] text-muted tracking-[0.05em]">
              · {t("eyebrow")}
            </span>
          </m.div>

          <m.h1
            variants={fadeUp}
            className="font-sans font-extrabold text-[clamp(34px,5vw,56px)] leading-[1.05] tracking-[-0.03em] text-white text-balance"
          >
            {t("title_lead")}{" "}
            <span className="text-accent">{t("title_accent")}</span>
          </m.h1>

          <m.p
            variants={fadeUp}
            className="text-soft text-[17px] leading-[1.7] mt-5 mb-8 max-w-[48ch]"
          >
            {t("desc")}
          </m.p>

          <m.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <a href={diagHref}>
              <Btn variant="primary" className="px-8 py-[15px] text-[15px]">
                {t("cta_primary")} <span className="text-[12px] opacity-80">→</span>
              </Btn>
            </a>
            <a href="#library">
              <Btn variant="ghost" className="px-8 py-[15px] text-[15px]">
                {t("cta_secondary")} <span className="text-[12px] opacity-80">↓</span>
              </Btn>
            </a>
          </m.div>
        </div>

        {/* Right: featured video */}
        <m.div variants={fadeUp}>
          <div className="relative aspect-video rounded-[20px] overflow-hidden bg-card border border-line-soft group transition-all duration-normal hover:border-accent hover:shadow-[0_0_0_1px_var(--c-accent),0_8px_32px_rgba(88,101,242,0.18)]">
            <span className="absolute top-3 left-3 z-20 bg-accent text-white font-pixel text-[7px] px-2.5 py-1.5 rounded-md">
              {t("featured_badge")}
            </span>
            <VideoFrame title={t("featured_title")} />
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 pt-12 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.85))] pointer-events-none">
              <p className="text-white font-semibold text-[15px] leading-snug">
                {t("featured_title")}
              </p>
              <p className="text-soft text-[13px] leading-snug mt-1">
                {t("featured_hook")}
              </p>
            </div>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}

/* ─── Trust bar ──────────────────────────────────────────────────────────── */
function TrustBar() {
  const t = useTranslations("Start.trust");
  const items = [
    { num: t("build_rate"), label: t("build_rate_label"), accent: true },
    { num: t("first"), label: t("first_label") },
    { num: t("prod"), label: t("prod_label") },
    { num: t("warranty"), label: t("warranty_label") },
  ];
  return (
    <section className="bg-card border-y border-line py-9 px-page-x">
      <Reveal className="max-w-max-w mx-auto flex flex-wrap justify-around gap-8">
        {items.map((it) => (
          <div key={it.label} className="text-center">
            <div className="font-pixel text-[20px] md:text-[26px] leading-none text-white tabular-nums">
              {it.accent ? <span className="text-accent">{it.num}</span> : it.num}
            </div>
            <div className="font-pixel text-[8px] md:text-[9px] tracking-[0.12em] text-muted uppercase mt-3">
              {it.label}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* ─── Evan quote ─────────────────────────────────────────────────────────── */
function EvanQuote() {
  const t = useTranslations("Start.evan");
  return (
    <section className="px-page-x py-[72px]">
      <Reveal className="max-w-max-w mx-auto grid grid-cols-1 md:grid-cols-[80px_1fr] gap-7 items-start">
        <div className="w-[72px] h-[72px] rounded-full bg-[linear-gradient(135deg,var(--c-accent),#3d4fd9)] border-2 border-line-soft flex items-center justify-center text-white font-bold text-[24px] shrink-0">
          EC
        </div>
        <div>
          <p className="font-serif italic text-soft text-[clamp(16px,1.6vw,19px)] leading-[1.7] mb-4">
            &ldquo;{t("quote")}&rdquo;
          </p>
          <div className="font-sans font-semibold text-white text-[14px]">
            {t("name")}
          </div>
          <div className="text-muted text-[12px]">{t("role")}</div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Single video card ──────────────────────────────────────────────────── */
function VideoCard({
  video,
  copy,
  hidden,
}: {
  video: LibVideo;
  copy: { title: string; hook: string; tags: string[] };
  hidden: boolean;
}) {
  return (
    <m.article
      variants={fadeUp}
      className={`bg-card border border-line-soft rounded-[20px] overflow-hidden transition-all duration-fast hover:border-accent hover:-translate-y-0.5 ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="relative aspect-video bg-card-soft">
        <VideoFrame title={copy.title} youtubeId={video.youtubeId} />
        <span className="absolute bottom-2 right-2 z-10 bg-black/80 text-soft font-pixel text-[7px] px-2 py-1 rounded">
          {video.dur}
        </span>
      </div>
      <div className="p-[16px_18px_20px]">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {copy.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold tracking-[0.02em] uppercase border ${TAG_STYLES[video.variant]}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-sans font-semibold text-white text-[14px] leading-snug mb-1.5">
          {copy.title}
        </h3>
        <p className="text-muted text-[12px] leading-[1.5]">{copy.hook}</p>
      </div>
    </m.article>
  );
}

/* ─── Video library with filter tabs ─────────────────────────────────────── */
function VideoLibrary() {
  const t = useTranslations("Start.library");
  const videos = t.raw("videos") as {
    title: string;
    hook: string;
    tags: string[];
  }[];
  const [active, setActive] = useState<TabKey>("all");

  return (
    <section id="library" className="px-page-x py-[100px] max-w-max-w mx-auto">
      <Reveal className="mb-10">
        <SectionLabel>02 · {t("label")}</SectionLabel>
        <h2 className="font-sans font-extrabold text-[clamp(28px,3.6vw,44px)] leading-[1.05] tracking-[-0.025em] text-white">
          {t("title")}
        </h2>
        <p className="text-soft text-[15px] leading-[1.6] mt-3 max-w-[60ch]">
          {t("desc")}
        </p>
      </Reveal>

      {/* Tabs */}
      <Reveal className="flex flex-wrap gap-2 mb-9">
        {TAB_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={`px-4 py-2 rounded-full border text-[13px] font-semibold transition-all duration-fast ${
              active === key
                ? "bg-accent border-accent text-white"
                : "bg-transparent border-line-soft text-muted hover:border-accent hover:text-soft"
            }`}
          >
            {t(`tabs.${key}`)}
            {key === "all" ? ` (${LIBRARY.length})` : ""}
          </button>
        ))}
      </Reveal>

      {/* Grid */}
      <m.div
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {LIBRARY.map((video, i) => (
          <VideoCard
            key={i}
            video={video}
            copy={videos[i]}
            hidden={active !== "all" && !video.cats.includes(active)}
          />
        ))}
      </m.div>
    </section>
  );
}

/* ─── Pricing trio ───────────────────────────────────────────────────────── */
type StartPlan = {
  sku: string;
  price: string;
  period: string;
  desc: string;
};

function PricingTrio({ diagHref }: { diagHref: string }) {
  const t = useTranslations("Start.pricing");
  const plans = t.raw("plans") as StartPlan[];

  return (
    <section
      id="pricing"
      className="px-page-x py-[100px] relative overflow-hidden border-t border-line"
    >
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(88,101,242,0.04)_0%,transparent_55%)]" />
      <div className="max-w-max-w mx-auto relative z-10">
        <Reveal className="text-center mb-12">
          <SectionLabel>
            <span className="mx-auto flex items-center gap-2.5">04 · {t("label")}</span>
          </SectionLabel>
          <h2 className="font-sans font-extrabold text-[clamp(28px,3.6vw,44px)] leading-[1.05] tracking-[-0.025em] text-white">
            {t("title")}
          </h2>
          <p className="text-soft text-[15px] leading-[1.6] mt-3 max-w-[52ch] mx-auto">
            {t("desc")}
          </p>
        </Reveal>

        <m.div
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {plans.map((p, i) => {
            const featured = i === 0;
            return (
              <m.div
                key={p.sku}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 320, damping: 22 } }}
                className={`relative rounded-[24px] p-7 transition-colors duration-300 ${
                  featured
                    ? "bg-white/[0.04] border border-accent/40 shadow-[0_0_40px_rgba(88,101,242,0.1)] pn-shimmer-border"
                    : "bg-card border border-line-soft hover:border-soft"
                }`}
              >
                {featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white font-pixel text-[8px] tracking-[0.1em] px-3 py-1 rounded-full uppercase shadow-lg z-30">
                    {t("start_here")}
                  </div>
                )}
                <div className="font-pixel text-[8px] tracking-[0.12em] text-accent uppercase mb-3">
                  {p.sku}
                </div>
                <div className="font-sans font-extrabold text-[30px] text-white leading-none mb-1">
                  {p.price}
                </div>
                <div className="text-muted text-[13px] mb-5">{p.period}</div>
                <p className="text-soft text-[13px] leading-[1.6]">{p.desc}</p>
              </m.div>
            );
          })}
        </m.div>

        <Reveal className="mt-12 flex flex-wrap justify-center items-center gap-5">
          <a href={diagHref}>
            <Btn variant="primary" className="px-8 py-[15px] text-[15px]">
              {t("cta")} <span className="text-[12px] opacity-80">→</span>
            </Btn>
          </a>
          <span className="text-muted text-[13px]">{t("note")}</span>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Objections FAQ ─────────────────────────────────────────────────────── */
function ObjectionsFaq() {
  const t = useTranslations("Start.faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section className="px-page-x py-[90px] max-w-[760px] mx-auto">
      <Reveal>
        <h2 className="font-sans font-extrabold text-[clamp(26px,3.2vw,40px)] leading-[1.05] tracking-[-0.025em] text-white mb-9">
          {t("title")}
        </h2>
      </Reveal>
      <div className="flex flex-col gap-3">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <details className="group bg-card border border-line-soft rounded-2xl px-6 py-5 transition-colors duration-fast hover:border-soft open:border-accent/40">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-sans font-semibold text-white text-[15px] md:text-[16px] leading-snug">
                {it.q}
                <Icon
                  name="chevron-down"
                  size={18}
                  className="shrink-0 text-muted transition-transform duration-fast group-open:rotate-180 group-open:text-accent"
                />
              </summary>
              <p className="text-soft text-[14px] leading-[1.7] mt-4">{it.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────────────────── */
function FinalCta({ diagHref }: { diagHref: string }) {
  const t = useTranslations("Start.cta");
  return (
    <section className="px-page-x py-[90px] text-center bg-card border-y border-line">
      <Reveal className="max-w-[560px] mx-auto">
        <SectionLabel>
          <span className="mx-auto flex items-center gap-2.5">06 · {t("label")}</span>
        </SectionLabel>
        <h2 className="font-sans font-extrabold text-[clamp(28px,3.6vw,44px)] leading-[1.05] tracking-[-0.025em] text-white">
          {t("title")}
        </h2>
        <p className="text-soft text-[17px] leading-[1.6] mt-4 mb-8">{t("desc")}</p>
        <a href={diagHref}>
          <Btn variant="primary" className="px-9 py-[16px] text-[16px]">
            {t("button")} <span className="text-[12px] opacity-80">→</span>
          </Btn>
        </a>
        <div className="text-muted text-[13px] mt-5">{t("note")}</div>
      </Reveal>
    </section>
  );
}

/* ─── Page composition ───────────────────────────────────────────────────── */
export default function StartPage() {
  const locale = useLocale();
  const diagHref = `/${locale}#engage?tab=diagnostic`;

  return (
    <div>
      <Header />
      <main>
        <Hero diagHref={diagHref} />
        <TrustBar />
        <EvanQuote />
        <VideoLibrary />
        <PricingTrio diagHref={diagHref} />
        <ObjectionsFaq />
        <FinalCta diagHref={diagHref} />
      </main>
      <SiteFooter />
    </div>
  );
}
