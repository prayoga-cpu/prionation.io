"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Icon } from "../icons";
import { SITE_URL, SITE_NAME } from "@/lib/seo/site";
import { getPublishedPages, type PageSection } from "@/lib/content/pages";

const ANCHOR_PATH = "/ai-product-engineering-for-mid-market-companies";

const SCHEMA_HUE: Record<string, string> = {
  TechArticle: "text-accent bg-accent-10 border-accent-30",
  CaseStudy:   "text-green-400 bg-green-500/10 border-green-500/20",
  HowTo:       "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Article:     "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

const SECTIONS_META: { key: PageSection; label: string; desc: string }[] = [
  { key: "methodology",  label: "Methodology",  desc: "4 engineering principles" },
  { key: "showcases",   label: "Showcases",    desc: "3 case studies" },
  { key: "frameworks",  label: "Frameworks",   desc: "3 decision tools" },
  { key: "guides",      label: "Guides",       desc: "3 buyer guides" },
  { key: "intelligence",label: "Intelligence", desc: "2 briefings" },
];

type AnchorSection = { id: string; h2: string; body: string[] };
type Faq = { q: string; a: string };

// ── SVG Diagrams ────────────────────────────────────────────────────────────

function DiagramGap() {
  return (
    <figure className="my-10 bg-card border border-line-soft rounded-[20px] p-6 md:p-8 overflow-x-auto" aria-label="Mid-market AI gap diagram">
      <svg viewBox="0 0 600 260" className="w-full max-w-[580px] mx-auto block" aria-hidden="true">
        <defs>
          <radialGradient id="glow-accent" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5865f2" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#5865f2" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="glow-gap" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5865f2" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#5865f2" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Axis labels */}
        <text x="10" y="20" fill="#666" fontSize="9" fontFamily="monospace" letterSpacing="1">COMPANY SIZE</text>
        <text x="590" y="140" fill="#666" fontSize="9" fontFamily="monospace" letterSpacing="1" textAnchor="end">AI COMPLEXITY →</text>

        {/* SMB / SaaS zone */}
        <ellipse cx="115" cy="185" rx="90" ry="48" fill="#1a1b24" stroke="#2a2b38" strokeWidth="1.5"/>
        <text x="115" y="180" fill="#888" fontSize="11" textAnchor="middle" fontFamily="sans-serif">SMB</text>
        <text x="115" y="195" fill="#555" fontSize="9" textAnchor="middle" fontFamily="monospace">SaaS covers it</text>

        {/* Enterprise zone */}
        <ellipse cx="490" cy="70" rx="88" ry="48" fill="#1a1b24" stroke="#2a2b38" strokeWidth="1.5"/>
        <text x="490" y="65" fill="#888" fontSize="11" textAnchor="middle" fontFamily="sans-serif">Enterprise</text>
        <text x="490" y="80" fill="#555" fontSize="9" textAnchor="middle" fontFamily="monospace">Big consultancies</text>

        {/* Mid-market gap — highlighted */}
        <ellipse cx="300" cy="128" rx="108" ry="62" fill="url(#glow-gap)" stroke="#5865f2" strokeWidth="1.5" strokeDasharray="5 3"/>
        <ellipse cx="300" cy="128" rx="108" ry="62" fill="url(#glow-accent)" opacity="0.5"/>
        <text x="300" y="118" fill="#fff" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">Mid-market</text>
        <text x="300" y="134" fill="#5865f2" fontSize="9" textAnchor="middle" fontFamily="monospace">€5M – €50M</text>
        <text x="300" y="148" fill="#5865f2" fontSize="9" textAnchor="middle" fontFamily="monospace">THE GAP</text>

        {/* Arrow from gap to PRIONATION label */}
        <line x1="300" y1="66" x2="300" y2="28" stroke="#5865f2" strokeWidth="1" strokeDasharray="3 2"/>
        <polygon points="296,28 300,18 304,28" fill="#5865f2"/>
        <text x="300" y="14" fill="#5865f2" fontSize="9" textAnchor="middle" fontFamily="monospace">PRIONATION</text>
      </svg>
      <figcaption className="text-center text-muted text-[11px] font-pixel tracking-[0.1em] uppercase mt-4">
        Where mid-market sits — too complex for SaaS, too small for enterprise consultancies
      </figcaption>
    </figure>
  );
}

function DiagramPrinciples() {
  const items = [
    { n: "01", title: "Evals before features", desc: "Test suite written before the prompt", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { n: "02", title: "Telemetry from day one", desc: "Production data drives iteration", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { n: "03", title: "Owned infrastructure", desc: "Client holds the keys, always", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" },
    { n: "04", title: "Lean pods, fixed clocks", desc: "2–3 engineers, 8-week delivery", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
    <figure className="my-10" aria-label="Four engineering principles">
      <div className="grid grid-cols-2 gap-3">
        {items.map((p) => (
          <div key={p.n} className="bg-card border border-line-soft rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="font-pixel text-[8px] tracking-[0.12em] text-accent">/{p.n}</span>
              <div className="w-7 h-7 rounded-lg bg-accent-10 border border-accent-30 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={p.icon}/>
                </svg>
              </div>
            </div>
            <div>
              <div className="font-sans font-semibold text-white text-[13px] leading-snug mb-1">{p.title}</div>
              <div className="text-muted text-[11px] leading-[1.5]">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="text-center text-muted text-[11px] font-pixel tracking-[0.1em] uppercase mt-5">
        The four principles that make fixed-price AI delivery honest
      </figcaption>
    </figure>
  );
}

function DiagramTimeline() {
  const steps = [
    { phase: "Diagnostic", duration: "2 weeks", price: "€5–7K", desc: "Map the bottleneck. Define the eval criteria. Price the build.", color: "#5865f2" },
    { phase: "Build", duration: "8 weeks", price: "€25–55K", desc: "Ship production AI into the client's environment.", color: "#eb459f" },
    { phase: "Retainer", duration: "6 mo min", price: "€4–9K/mo", desc: "Ongoing pod access. Iteration driven by telemetry.", color: "#57f287" },
  ];

  return (
    <figure className="my-10 bg-card border border-line-soft rounded-[20px] p-6 md:p-8" aria-label="Engagement timeline">
      <div className="flex flex-col md:flex-row gap-0 md:gap-0 relative">
        {/* Connecting line on desktop */}
        <div className="hidden md:block absolute top-[36px] left-[calc(33%_-_1px)] right-[calc(33%_-_1px)] h-[1px] bg-gradient-to-r from-[#5865f2] via-[#eb459f] to-[#57f287] opacity-40" />

        {steps.map((s, i) => (
          <div key={s.phase} className="flex-1 flex flex-col items-center text-center relative">
            {/* Node */}
            <div className="w-[52px] h-[52px] rounded-full border-2 flex items-center justify-center mb-4 z-10 bg-bg" style={{ borderColor: s.color }}>
              <span className="font-pixel text-[9px]" style={{ color: s.color }}>0{i + 1}</span>
            </div>
            {/* Arrow on mobile */}
            {i < steps.length - 1 && (
              <div className="md:hidden self-center text-muted text-[18px] rotate-90 mb-4">→</div>
            )}
            <div className="font-sans font-bold text-white text-[15px] mb-1">{s.phase}</div>
            <div className="font-pixel text-[8px] tracking-[0.1em] mb-2" style={{ color: s.color }}>
              {s.duration} · {s.price}
            </div>
            <p className="text-muted text-[12px] leading-[1.6] max-w-[18ch]">{s.desc}</p>
          </div>
        ))}
      </div>
      <figcaption className="text-center text-muted text-[11px] font-pixel tracking-[0.1em] uppercase mt-8">
        The commercial path — Diagnostic is the required entry point before a Build is quoted
      </figcaption>
    </figure>
  );
}

function DiagramOwnership() {
  const items = [
    { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", label: "Code repository" },
    { icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", label: "Cloud hosting" },
    { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Model accounts" },
    { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Telemetry data" },
    { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "All credentials" },
    { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "Runbook" },
  ];

  return (
    <figure className="my-10 bg-card border border-line-soft rounded-[20px] p-6 md:p-8" aria-label="What the client owns at handover">
      <div className="font-pixel text-[9px] tracking-[0.15em] text-accent uppercase mb-5 text-center">
        Client owns at handover
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 bg-bg border border-line-soft rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-accent-10 border border-accent-30 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
              </svg>
            </div>
            <span className="font-sans text-soft text-[12px] leading-snug">{item.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="text-center text-muted text-[11px] font-pixel tracking-[0.1em] uppercase mt-5">
        Everything transfers at the end of every engagement — no lock-in by design
      </figcaption>
    </figure>
  );
}

// Diagram appears after specific section IDs
function getDiagram(id: string) {
  if (id === "mid-market-gap")  return <DiagramGap />;
  if (id === "how-we-build")    return <DiagramPrinciples />;
  if (id === "pricing")         return <DiagramTimeline />;
  if (id === "what-you-own")    return <DiagramOwnership />;
  return null;
}

// ── Main component ──────────────────────────────────────────────────────────

export function AnchorPage() {
  const t = useTranslations("Anchor");
  const locale = useLocale();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const allPages = useMemo(() => getPublishedPages(), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allPages.filter(
      (p) =>
        p.seoTitle.toLowerCase().includes(q) ||
        p.metaDescription.toLowerCase().includes(q),
    );
  }, [allPages, query]);

  const intro = t.raw("intro") as string[];
  const sections = t.raw("sections") as AnchorSection[];
  const faq = t.raw("faq") as Faq[];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("h1"),
    description: t("metaDescription"),
    inLanguage: locale,
    datePublished: "2026-05-31",
    dateModified: "2026-05-31",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", '[aria-label="Summary"]'],
    },
    mainEntityOfPage: `${SITE_URL}/${locale}${ANCHOR_PATH}`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="px-page-x pt-[130px] pb-[120px]">
        <div className="max-w-[900px] mx-auto">

          {/* ── Top bar: breadcrumb + search toggle ── */}
          <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
            <nav className="flex items-center gap-1.5 text-[12px] text-muted font-sans flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="opacity-40">/</span>
              <span className="text-soft">AI Product Engineering</span>
            </nav>

            {/* Compact search toggle */}
            <div className="flex items-center gap-2">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-card border border-accent/40 rounded-full pl-4 pr-2 py-2">
                  <svg className="w-3.5 h-3.5 text-muted shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    autoFocus
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search all articles..."
                    className="bg-transparent text-[13px] text-white placeholder:text-muted outline-none w-[200px] sm:w-[260px]"
                  />
                  <button onClick={() => { setSearchOpen(false); setQuery(""); }} className="w-6 h-6 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all" aria-label="Close search">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-line-soft text-muted text-[12px] hover:text-white hover:border-soft transition-all"
                  aria-label="Search articles"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <span className="hidden sm:inline">Search articles</span>
                </button>
              )}
            </div>
          </div>

          {/* ── Search results overlay ── */}
          {searchOpen && query.trim() && (
            <div className="mb-12">
              {filtered.length === 0 ? (
                <p className="text-muted text-[14px] py-4">No articles match &ldquo;{query}&rdquo;.</p>
              ) : (
                <>
                  <div className="font-pixel text-[9px] tracking-[0.18em] text-muted uppercase mb-5">
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/${p.section}/${p.slug}`}
                        onClick={() => { setSearchOpen(false); setQuery(""); }}
                        className="group flex gap-4 bg-card border border-line-soft rounded-2xl p-4 hover:bg-card-soft hover:border-soft transition-all"
                      >
                        <div className="flex flex-col gap-1.5 min-w-0">
                          <span className={`font-pixel text-[7px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border self-start ${SCHEMA_HUE[p.schema] ?? SCHEMA_HUE.TechArticle}`}>
                            {p.section}
                          </span>
                          <h3 className="font-sans font-semibold text-white text-[13px] leading-snug group-hover:text-accent transition-colors truncate">
                            {p.seoTitle.split("·")[0].trim()}
                          </h3>
                          <p className="text-muted text-[11px] leading-[1.5] line-clamp-2">{p.metaDescription}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── Hero ── */}
          <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-5">
            {t("badge")}
          </div>
          <h1 className="font-sans font-extrabold text-[clamp(34px,4.8vw,66px)] leading-[1.02] tracking-[-0.035em] text-white mb-6 max-w-[20ch]">
            {t("h1")}
          </h1>

          {/* TL;DR */}
          <div role="note" aria-label="Summary" className="bg-card border border-line-soft rounded-[20px] p-6 md:p-8 mb-12">
            <div className="font-pixel text-[8px] tracking-[0.15em] text-muted uppercase mb-3">TL;DR</div>
            <p className="text-soft text-[16px] md:text-[17px] leading-[1.75]">{t("tldr")}</p>
          </div>

          {/* Table of contents */}
          <nav className="border border-line-soft rounded-2xl p-5 mb-14 bg-card/40" aria-label="On this page">
            <div className="font-pixel text-[8px] tracking-[0.15em] text-muted uppercase mb-4">On this page</div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-start gap-2 text-[13px] text-soft hover:text-white transition-colors group"
                  >
                    <span className="font-pixel text-[8px] text-muted group-hover:text-accent transition-colors mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-snug">{s.h2}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Intro */}
          <div className="flex flex-col gap-5 mb-14">
            {intro.map((p, i) => (
              <p key={i} className="text-soft text-[16px] leading-[1.8]">{p}</p>
            ))}
          </div>

          {/* ── Article sections with contextual diagrams ── */}
          <div className="flex flex-col gap-14">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-[110px]">
                <h2 className="font-sans font-bold text-white text-[clamp(20px,2.6vw,30px)] tracking-[-0.02em] leading-[1.15] mb-5">
                  {s.h2}
                </h2>
                <div className="flex flex-col gap-4">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-soft text-[16px] leading-[1.8]">{p}</p>
                  ))}
                </div>
                {getDiagram(s.id)}
              </section>
            ))}
          </div>

          {/* ── Manifesto CTA ── */}
          <div className="mt-20 pt-16 border-t border-line-soft">
            <div className="bg-card border border-accent/20 rounded-[24px] p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10">
                <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-4">
                  {t("manifestoLabel")}
                </div>
                <h2 className="font-sans font-extrabold text-white text-[clamp(24px,3vw,36px)] tracking-[-0.02em] mb-4 max-w-[20ch]">
                  {t("manifestoTitle")}
                </h2>
                <p className="text-soft text-[16px] leading-[1.8] max-w-[60ch] mb-8">
                  {t("manifestoBody")}
                </p>
                <Link
                  href="/ai-product-engineering-for-mid-market-companies/manifesto"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-sans font-bold text-[14px] hover:bg-white/90 transition-transform hover:scale-105"
                >
                  {t("manifestoButton")} <span className="text-[12px] opacity-80">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Glossary CTA ── */}
          <div className="mt-6">
            <div className="bg-card border border-line-soft hover:border-accent/30 transition-colors rounded-[24px] p-8 md:p-10 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="font-pixel text-[10px] tracking-[0.15em] text-muted group-hover:text-accent transition-colors uppercase mb-4">
                  {t("glossaryLabel")}
                </div>
                <h2 className="font-sans font-extrabold text-white text-[clamp(20px,2.5vw,28px)] tracking-[-0.02em] mb-3">
                  {t("glossaryTitle")}
                </h2>
                <p className="text-soft text-[15px] leading-[1.7] max-w-[60ch] mb-6">
                  {t("glossaryBody")}
                </p>
                <Link
                  href="/ai-product-engineering-for-mid-market-companies/glossary"
                  className="inline-flex items-center gap-2 text-white font-sans font-semibold text-[14px] group-hover:text-accent transition-colors"
                >
                  {t("glossaryButton")} <span className="text-[12px] opacity-80 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ── FAQ ── */}
          <div className="mt-20 pt-16 border-t border-line-soft">
            <h2 className="font-sans font-extrabold text-white text-[clamp(24px,3vw,36px)] tracking-[-0.02em] mb-10">
              {t("faqTitle")}
            </h2>
            <div className="flex flex-col gap-3">
              {faq.map((f, i) => (
                <details key={i} className="group bg-card border border-line-soft rounded-2xl px-6 py-5 transition-colors duration-fast hover:border-soft open:border-accent/40">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-sans font-semibold text-white text-[15px] md:text-[16px] leading-snug">
                    {f.q}
                    <Icon name="chevron-down" size={18} className="shrink-0 text-muted transition-transform duration-fast group-open:rotate-180 group-open:text-accent" />
                  </summary>
                  <p className="text-soft text-[14px] leading-[1.7] mt-4">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* ── Categories ── */}
          <div className="mt-20 pt-16 border-t border-line-soft">
            <div className="font-pixel text-[9px] tracking-[0.18em] text-muted uppercase mb-6">
              Explore by category
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {SECTIONS_META.map(({ key, label, desc }) => {
                const count = getPublishedPages(key).length;
                const recent = getPublishedPages(key).slice(0, 2);
                return (
                  <Link
                    key={key}
                    href={`/${key}`}
                    className="group bg-card border border-line-soft rounded-[20px] p-6 flex flex-col gap-4 hover:bg-card-soft hover:border-soft hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans font-bold text-white text-[17px] group-hover:text-accent transition-colors">
                        {label}
                      </h3>
                      <span className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase">
                        {count} article{count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="text-soft text-[13px] leading-[1.6]">{desc}</p>
                    {recent.length > 0 && (
                      <div className="flex flex-col gap-1 border-t border-line-soft pt-3">
                        {recent.map((p) => (
                          <span key={p.slug} className="text-muted text-[11px] leading-snug truncate">
                            — {p.seoTitle.split("·")[0].trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-accent font-sans font-semibold text-[13px] mt-auto">
                      View all <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="bg-card border border-accent/30 rounded-[24px] p-8 md:p-10 text-center bg-[radial-gradient(circle_at_50%_0%,rgba(88,101,242,0.1)_0%,transparent_70%)]">
            <h2 className="font-sans font-extrabold text-white text-[clamp(20px,2.6vw,30px)] tracking-[-0.02em] mb-3">
              {t("ctaTitle")}
            </h2>
            <p className="text-soft text-[14px] leading-[1.7] max-w-[48ch] mx-auto mb-7">
              {t("ctaBody")}
            </p>
            <Link
              href="/#engage"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-sans font-semibold text-[14px] hover:bg-accent/90 transition-colors"
            >
              {t("ctaButton")} <span className="text-[12px] opacity-80">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
