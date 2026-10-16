// Static content manifest — single source of truth for cluster-page metadata.
// Consumed by app/sitemap.ts (and, once the routes ship, by generateMetadata /
// generateStaticParams / the footer). Publishing flow: flip `status` to
// "published" + set publishedAt/updatedAt -> commit -> deploy. A draft page is
// excluded from the sitemap and (when routes exist) from the static build.
//
// Adapted to this codebase: lives in lib/content (no src/), routes are
// /[locale]/<section>/<slug>, locales come from i18n/routing.

export type PageStatus = "draft" | "published";
export type PageSection =
  | "methodology"
  | "showcases"
  | "frameworks"
  | "guides"
  | "intelligence";
export type PageAudience = "cto" | "coo" | "ceo" | "mixed";
export type SchemaType = "TechArticle" | "CaseStudy" | "HowTo" | "Article";

export interface PageMeta {
  slug: string;
  section: PageSection;
  status: PageStatus;
  seoTitle: string;
  metaDescription: string;
  ogTitle: string;
  audience: PageAudience;
  schema: SchemaType;
  publishedAt: string; // ISO date string, empty while draft
  updatedAt: string;
  sitemapPriority: number;
  changeFreq: "weekly" | "monthly";
  tier1Keywords: [string, string, string];
  interlinkTo: string[];
  // Tags pages created by the automated content-loop. Lets the kill-switch
  // (CONTENT_LOOP_KILL=1) bulk-unpublish all loop output in one env toggle,
  // and lets reporting separate loop pages from hand-authored ones.
  loopGenerated?: boolean;
}

export const ANCHOR_PATH = "/ai-product-engineering-for-mid-market-companies";

// Real owned case-study images for showcase Articles (files in public/work/).
// Slug→file is intentionally NOT 1:1 ("the-lead-agent" → lead-agent.png), so the
// mapping is explicit, not derived. Single source of truth shared by the
// homepage tiles (components/sections/SelectedWork.tsx), the /start hero + work
// cards (components/sales/SalesPage.tsx) and the showcase Article JSON-LD image
// (components/content/ContentArticle.tsx) so they can't drift. When swapping an
// image, give the new file a new name: /_next/image caches by URL, so reusing a
// filename keeps serving the old optimized copy until the cache expires.
// More than one image turns the showcase into a slideshow
// (components/ui/ShowcaseSlideshow.tsx), in this order; alt text for every image
// after the first lives in messages/*.json → ShowcaseImages.<slug>.
// Epidom: website → phone ordering → POS → customer display, so the tile reads as
// one all-in-one web app. Its unused raw screenshots (test data / personal
// details) stay out of the repo in the git-ignored private-assets/epidom/.
// Serrurier Paris Express and GLVitr'Clean frames, the first and last
// Expedion × Expeditoo frames and ACTE's last one are captures of public pages
// (2026-10-16). Sections showing figures that can't be verified (Expeditoo's mock
// landing stats, Expedion's star line, a response-time badge) are cropped out
// rather than shown. The app and dashboard frames come from the client builds,
// on test/synthetic data; the Expeditoo admin frame has the client's name blurred.
// Shots not used, and why, are listed in the git-ignored
// private-assets/{acte,expeditoo}/NOTES.md.
export type ShowcaseImages = readonly [string, ...string[]];

export const SHOWCASE_IMAGES: Record<string, ShowcaseImages> = {
  epidom: [
    "/work/epidom-home.png",
    "/work/epidom-mobile-ordering.png",
    "/work/epidom-pos.png",
    "/work/epidom-customer-display.png",
  ],
  expeditoo: [
    "/work/expedion-expeditoo-buyer.png",
    "/work/expedion-app-quote-type.png",
    "/work/expedion-app-my-quotes.png",
    "/work/expeditoo-dashboard-admin.png",
    "/work/expeditoo-dashboard-jobs.png",
    "/work/expeditoo-dashboard-shipments.png",
    "/work/expedion-expeditoo-mobile.png",
  ],
  "the-lead-agent": ["/work/lead-agent.png"],
  acte: [
    "/work/acte-dashboard-journal.png",
    "/work/acte-dashboard-cases.png",
    "/work/acte-dashboard-statistics.png",
    "/work/acte-home.png",
  ],
  "serrurier-paris-express": [
    "/work/serrurier-home.png",
    "/work/serrurier-tarifs.png",
    "/work/serrurier-mobile.png",
  ],
  "glvitr-clean": [
    "/work/glvitrclean-home.png",
    "/work/glvitrclean-before-after.png",
    "/work/glvitrclean-mobile.png",
  ],
};

export const pages: PageMeta[] = [
  // ── METHODOLOGY ───────────────────────────────────────────────────────────
  {
    slug: "evals-before-features",
    section: "methodology",
    status: "published",
    seoTitle: "Evals before features · PRIONATION.io",
    metaDescription:
      "Why writing the test suite before the prompt is non-negotiable in production AI. The principle that makes fixed-price engagements honest.",
    ogTitle: "Evals before features · PRIONATION.io",
    audience: "cto",
    schema: "TechArticle",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-03",
    sitemapPriority: 0.85,
    changeFreq: "monthly",
    tier1Keywords: [
      "AI eval framework production",
      "LLM evaluation suite before deployment",
      "test-driven development for AI products",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/methodology/telemetry-from-day-one",
      "/methodology/lean-pods-fixed-clocks",
      "/frameworks/8-week-build-readiness-checklist",
    ],
  },
  {
    slug: "telemetry-from-day-one",
    section: "methodology",
    status: "published",
    seoTitle: "Telemetry from day one · PRIONATION.io",
    metaDescription:
      'The instrumentation pattern that prevents "the model is wrong" debates. How PRIONATION monitors production AI from the first deployment.',
    ogTitle: "Telemetry from day one · PRIONATION.io",
    audience: "cto",
    schema: "TechArticle",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-03",
    sitemapPriority: 0.85,
    changeFreq: "monthly",
    tier1Keywords: [
      "LLM telemetry production monitoring",
      "AI observability mid-market deployment",
      "how to instrument AI products in production",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/methodology/evals-before-features",
      "/methodology/owned-infrastructure",
    ],
  },
  {
    slug: "owned-infrastructure",
    section: "methodology",
    status: "published",
    seoTitle: "Owned infrastructure · PRIONATION.io",
    metaDescription:
      "Why clients hold the code, hosting, data, and models at the end of every PRIONATION engagement. The case against AI vendor lock-in.",
    ogTitle: "Owned infrastructure · PRIONATION.io",
    audience: "cto",
    schema: "TechArticle",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-03",
    sitemapPriority: 0.85,
    changeFreq: "monthly",
    tier1Keywords: [
      "AI consulting client owns the code",
      "vendor lock-in AI development",
      "owned AI infrastructure mid-market",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/methodology/telemetry-from-day-one",
      "/guides/fixed-price-vs-hourly-ai-consulting",
    ],
  },
  {
    slug: "lean-pods-fixed-clocks",
    section: "methodology",
    status: "published",
    seoTitle: "Lean pods, fixed clocks · PRIONATION.io",
    metaDescription:
      "How 2–3 engineers and an 8-week clock make fixed-price AI delivery possible. The commercial-engineering link explained.",
    ogTitle: "Lean pods, fixed clocks · PRIONATION.io",
    audience: "ceo",
    schema: "TechArticle",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-03",
    sitemapPriority: 0.85,
    changeFreq: "monthly",
    tier1Keywords: [
      "fixed scope AI development timeline",
      "AI consulting pod structure",
      "8-week AI build engagement",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/methodology/evals-before-features",
      "/frameworks/pod-vs-hire-cost-model",
      "/guides/fixed-price-vs-hourly-ai-consulting",
    ],
  },

  // ── SHOWCASES ─────────────────────────────────────────────────────────────
  {
    slug: "epidom",
    section: "showcases",
    status: "published",
    seoTitle: "Epidom — F&B operations dashboard, France · PRIONATION",
    metaDescription:
      "How PRIONATION shipped production AI into Epidom's F&B operations — a unified dashboard for menu, POS, and inventory across locations — in 8 weeks. Bottleneck, build, result, and the transferable lesson.",
    ogTitle: "Epidom — F&B operations dashboard · PRIONATION.io",
    audience: "mixed",
    schema: "CaseStudy",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-15",
    sitemapPriority: 0.9,
    changeFreq: "monthly",
    tier1Keywords: [
      "logistics AI implementation France mid-market",
      "operations bottleneck AI case study",
      "logistics workflow automation real ROI",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/intelligence/ai-bottlenecks-mid-market-logistics",
      "/methodology/evals-before-features",
    ],
  },
  {
    slug: "expeditoo",
    section: "showcases",
    status: "published",
    seoTitle: "Expedion × Expeditoo — auction logistics, France · PRIONATION",
    metaDescription:
      "Two connected products for one French logistics group: Expedion reads the auction invoice with a vision model and quotes a fixed delivery price; Expeditoo lets verified carriers bid on the jobs the fleet cannot take.",
    ogTitle: "Expedion × Expeditoo — auction shipping and carrier marketplace · PRIONATION.io",
    audience: "mixed",
    schema: "CaseStudy",
    publishedAt: "2026-05-31",
    updatedAt: "2026-10-16",
    sitemapPriority: 0.9,
    changeFreq: "monthly",
    tier1Keywords: [
      "auction shipping platform France",
      "LLM document extraction logistics",
      "carrier marketplace reverse auction",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/intelligence/ai-bottlenecks-mid-market-logistics",
      "/methodology/evals-before-features",
    ],
  },
  {
    slug: "the-lead-agent",
    section: "showcases",
    status: "published",
    seoTitle: "The Lead Agent — real estate AI, Australia · PRIONATION",
    metaDescription:
      "How PRIONATION built AI lead qualification for The Lead Agent in Australia. Conversion lift, time per qualified lead, and what AI can't fix in sales.",
    ogTitle: "The Lead Agent — real estate lead gen AI · PRIONATION.io",
    audience: "mixed",
    schema: "CaseStudy",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-15",
    sitemapPriority: 0.9,
    changeFreq: "monthly",
    tier1Keywords: [
      "real estate AI lead generation ROI",
      "AI lead qualification mid-market",
      "real estate lead gen AI Australia",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/intelligence/ai-lead-generation-mid-market",
      "/methodology/evals-before-features",
    ],
  },
  {
    slug: "acte",
    section: "showcases",
    status: "published",
    seoTitle: "ACTE — legal time tracking and billing, France · PRIONATION",
    metaDescription:
      "The beta of ACTE, time tracking and billing for French law firms: per-firm encryption, a pseudonymised AI assistant, a correct billing ledger — and an eval set before any AI case matching.",
    ogTitle: "ACTE — time tracking and billing for law firms · PRIONATION.io",
    audience: "cto",
    schema: "CaseStudy",
    publishedAt: "2026-10-16",
    updatedAt: "2026-10-16",
    sitemapPriority: 0.9,
    changeFreq: "monthly",
    tier1Keywords: [
      "legal time tracking software France",
      "privacy-first AI for law firms",
      "pseudonymisation before LLM",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/methodology/evals-before-features",
      "/methodology/owned-infrastructure",
    ],
  },
  {
    slug: "serrurier-paris-express",
    section: "showcases",
    status: "published",
    seoTitle: "Serrurier Paris Express — locksmith lead site, Paris · PRIONATION",
    metaDescription:
      "A bilingual, price-first lead site for an independent Paris locksmith: a public price grid, 68 pages per language for real searches, a hardened quote form and no invented reviews.",
    ogTitle: "Serrurier Paris Express — price-first locksmith site · PRIONATION.io",
    audience: "ceo",
    schema: "CaseStudy",
    publishedAt: "2026-10-16",
    updatedAt: "2026-10-16",
    sitemapPriority: 0.85,
    changeFreq: "monthly",
    tier1Keywords: [
      "local service business website",
      "transparent pricing lead generation",
      "local SEO site structure",
    ],
    interlinkTo: [ANCHOR_PATH, "/showcases/glvitr-clean"],
  },
  {
    slug: "glvitr-clean",
    section: "showcases",
    status: "published",
    seoTitle: "GLVitr'Clean — local cleaning company site, Essonne · PRIONATION",
    metaDescription:
      "GLVitr'Clean's bilingual site: 224 pages for local searches, real before-and-after jobs, a quote form on an edge function, and tax-credit claims that a compliance check keeps honest.",
    ogTitle: "GLVitr'Clean — local cleaning company site · PRIONATION.io",
    audience: "ceo",
    schema: "CaseStudy",
    publishedAt: "2026-10-16",
    updatedAt: "2026-10-16",
    sitemapPriority: 0.85,
    changeFreq: "monthly",
    tier1Keywords: [
      "local SEO service and town pages",
      "static site quote form edge function",
      "tax credit claim compliance website",
    ],
    interlinkTo: [ANCHOR_PATH, "/showcases/serrurier-paris-express"],
  },

  // ── FRAMEWORKS ────────────────────────────────────────────────────────────
  {
    slug: "ai-build-vs-buy-calculator",
    section: "frameworks",
    status: "published",
    seoTitle: "AI build vs buy calculator · PRIONATION.io",
    metaDescription:
      "Input 6 variables about your workflow. Get a recommended path: build custom AI, buy SaaS, or hybrid. Decision framework for mid-market operators.",
    ogTitle: "AI build vs buy calculator · PRIONATION.io",
    audience: "ceo",
    schema: "HowTo",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-15",
    sitemapPriority: 0.8,
    changeFreq: "monthly",
    tier1Keywords: [
      "AI build vs buy decision framework",
      "should we build or buy AI software",
      "custom AI vs SaaS AI mid-market",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/frameworks/pod-vs-hire-cost-model",
      "/guides/ai-consulting-cost-mid-market-companies",
    ],
  },
  {
    slug: "pod-vs-hire-cost-model",
    section: "frameworks",
    status: "published",
    seoTitle: "Pod vs hire — real cost model · PRIONATION.io",
    metaDescription:
      "The full loaded cost of a PRIONATION pod vs an in-house AI engineer hire. Interactive model with salary, benefits, recruitment, and ramp time.",
    ogTitle: "Pod vs hire — real cost model · PRIONATION.io",
    audience: "ceo",
    schema: "HowTo",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-15",
    sitemapPriority: 0.8,
    changeFreq: "monthly",
    tier1Keywords: [
      "AI consultant vs in-house hire cost",
      "AI engineer salary vs agency comparison",
      "cost of building AI team mid-market",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/methodology/lean-pods-fixed-clocks",
      "/guides/ai-consulting-cost-mid-market-companies",
    ],
  },
  {
    slug: "8-week-build-readiness-checklist",
    section: "frameworks",
    status: "published",
    seoTitle: "8-week build readiness checklist · PRIONATION",
    metaDescription:
      "25-item self-assessment across data readiness, stakeholder alignment, success criteria, infrastructure, and commercial commitment. Know if you're ready to build.",
    ogTitle: "8-week AI build readiness checklist · PRIONATION.io",
    audience: "coo",
    schema: "HowTo",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-15",
    sitemapPriority: 0.8,
    changeFreq: "monthly",
    tier1Keywords: [
      "AI project readiness checklist",
      "how to prepare for AI consulting engagement",
      "AI build engagement requirements",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/frameworks/ai-build-vs-buy-calculator",
      "/methodology/evals-before-features",
      "/guides/scoping-ai-build-engagement",
    ],
  },

  // ── GUIDES ────────────────────────────────────────────────────────────────
  {
    slug: "ai-consulting-cost-mid-market-companies",
    section: "guides",
    status: "published",
    seoTitle: "AI consulting cost for mid-market companies",
    metaDescription:
      "What AI engagements cost for €5–50M companies. Diagnostic €5–7K, Build €25–55K, Retainer €4–9K/month. Honest breakdown of all three pricing models.",
    ogTitle: "AI consulting cost for mid-market companies · PRIONATION",
    audience: "ceo",
    schema: "Article",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-15",
    sitemapPriority: 0.85,
    changeFreq: "monthly",
    tier1Keywords: [
      "AI consulting cost mid-market company",
      "how much does AI consulting cost €5M €50M company",
      "AI implementation budget mid-size business",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/frameworks/pod-vs-hire-cost-model",
      "/guides/fixed-price-vs-hourly-ai-consulting",
    ],
  },
  {
    slug: "scoping-ai-build-engagement",
    section: "guides",
    status: "published",
    seoTitle: "How to scope an AI build engagement · PRIONATION",
    metaDescription:
      "The 6 components every AI scope document needs before talking to a vendor. Good and bad examples for each. How to avoid the scoping mistakes that kill projects.",
    ogTitle: "How to scope an AI build engagement · PRIONATION.io",
    audience: "cto",
    schema: "HowTo",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-15",
    sitemapPriority: 0.8,
    changeFreq: "monthly",
    tier1Keywords: [
      "how to scope AI project",
      "AI consulting RFP requirements",
      "AI build engagement scope of work",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/frameworks/8-week-build-readiness-checklist",
      "/methodology/lean-pods-fixed-clocks",
    ],
  },
  {
    slug: "fixed-price-vs-hourly-ai-consulting",
    section: "guides",
    status: "published",
    seoTitle: "Fixed-price vs hourly AI consulting · PRIONATION",
    metaDescription:
      "The 4 AI consulting pricing models and the structural incentive each creates for the vendor. Why PRIONATION's fixed-price model only works because of the methodology.",
    ogTitle: "Fixed-price vs hourly AI consulting · PRIONATION.io",
    audience: "ceo",
    schema: "Article",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-15",
    sitemapPriority: 0.8,
    changeFreq: "monthly",
    tier1Keywords: [
      "fixed price vs hourly AI consulting",
      "time and materials AI development risk",
      "AI consultant pricing models compared",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/methodology/lean-pods-fixed-clocks",
      "/guides/ai-consulting-cost-mid-market-companies",
    ],
  },

  // ── INTELLIGENCE ──────────────────────────────────────────────────────────
  {
    slug: "ai-bottlenecks-mid-market-logistics",
    section: "intelligence",
    status: "published",
    seoTitle: "AI bottlenecks in mid-market logistics · PRIONATION",
    metaDescription:
      "The 4 operational bottlenecks AI consistently breaks in mid-market logistics. First-party observations from the Expeditoo engagement.",
    ogTitle: "AI bottlenecks in mid-market logistics · PRIONATION.io",
    audience: "coo",
    schema: "Article",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-15",
    sitemapPriority: 0.75,
    changeFreq: "monthly",
    tier1Keywords: [
      "AI logistics operations bottleneck",
      "logistics workflow AI automation mid-market",
      "logistics AI use cases real ROI",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/showcases/epidom",
      "/showcases/expeditoo",
    ],
  },
  {
    slug: "ai-lead-generation-mid-market",
    section: "intelligence",
    status: "published",
    seoTitle: "AI for mid-market lead generation · PRIONATION",
    metaDescription:
      "What actually works when AI meets lead generation at the mid-market level. First-party observations from The Lead Agent engagement.",
    ogTitle:
      "AI for mid-market lead generation — what actually works · PRIONATION",
    audience: "coo",
    schema: "Article",
    publishedAt: "2026-05-31",
    updatedAt: "2026-06-15",
    sitemapPriority: 0.75,
    changeFreq: "monthly",
    tier1Keywords: [
      "AI lead generation real results mid-market",
      "AI lead qualification ROI",
      "AI for sales mid-market what works",
    ],
    interlinkTo: [
      ANCHOR_PATH,
      "/showcases/the-lead-agent",
      "/methodology/evals-before-features",
    ],
  },
];

// ── Utilities consumed by sitemap.ts / generateStaticParams / footer ─────────

export function getPublishedPages(section?: PageSection): PageMeta[] {
  // Bulk kill-switch: CONTENT_LOOP_KILL=1 drops EVERY loop-generated page from
  // the sitemap + static build on the next deploy (one env toggle in Vercel).
  // Per-page takedown is just flipping that page's status to "draft".
  const killLoop = process.env.CONTENT_LOOP_KILL === "1";
  return pages.filter(
    (p) =>
      p.status === "published" &&
      !(killLoop && p.loopGenerated) &&
      (section ? p.section === section : true),
  );
}

// Newest real content date across published pages. Used as an honest, stable
// <lastmod> for the sitemap index and the standalone core pages (home/anchor/
// glossary) instead of a build-time now() that would falsely churn every deploy.
// ISO date-only strings sort lexically. Falls back to the launch date.
export function latestPublishedDate(): string {
  const dates = getPublishedPages()
    .map((p) => p.updatedAt || p.publishedAt)
    .filter(Boolean)
    .sort();
  return dates[dates.length - 1] ?? "2026-05-31";
}

export function getPageBySlug(
  section: PageSection,
  slug: string,
): PageMeta | undefined {
  return pages.find((p) => p.section === section && p.slug === slug);
}

export function getAllSlugs(section: PageSection): string[] {
  return getPublishedPages(section).map((p) => p.slug);
}
