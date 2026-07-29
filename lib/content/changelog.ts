// Changelog content. English-only by design (a developer/transparency page,
// not marketing content — same convention as NotifyModal's hardcoded copy).
// Rendered at app/[locale]/changelog/page.tsx (same content for en/fr/id).
//
// v3 entries are curated directly from this repo's real git history
// (`git log`, verified 2026-07-13) — grouped by work session, not fabricated.
// Version numbers are assigned retroactively using standard semver
// discipline against what each session actually shipped:
//   - minor: new user-facing functionality, a new page, or a new capability
//   - patch: fixes, performance/accessibility/SEO tuning, tooling, copy
// package.json's version had been static at "3.1.0" since the first commit
// (no real bumps ever happened) — this is the first time it tracks reality.
// Maintenance: see AGENTS.md "Changelog" section — bump + add an entry here
// whenever a meaningful change ships. CURRENT_VERSION must match the top
// entry's `version` and package.json's `version` field.

export const CURRENT_VERSION = "3.8.1";

export type SemverBump = "minor" | "patch";

export type ChangelogEntry = {
  version: string; // matches package.json convention, no leading "v"
  bump: SemverBump;
  date: string; // ISO date, the real commit date of the session
  title: string;
  items: string[];
};

// Newest first.
export const V3_ENTRIES: ChangelogEntry[] = [
  {
    version: "3.8.1",
    bump: "patch",
    date: "2026-07-29",
    title: "Fix locale-redirect gap causing live 404s",
    items: [
      "Search Console flagged an unprefixed page URL as \"Not found (404)\"; confirmed live that any bare, unprefixed path (e.g. missing the /en, /fr, /id segment) hard-404'd instead of redirecting to its localized URL.",
      "Root cause: the middleware matcher only covered '/' and already-locale-prefixed paths, so next-intl's locale-redirect never ran for anything else. Broadened the matcher to cover every path except API routes, Next internals, and static files, matching next-intl's own recommended pattern.",
      "Verified against a local production build: unprefixed page paths now 307-redirect to the correct locale instead of 404ing; API routes and the sitemap remain unaffected.",
    ],
  },
  {
    version: "3.8.0",
    bump: "minor",
    date: "2026-07-13",
    title: "Real, dated changelog",
    items: [
      "Added this page — a changelog curated directly from git history, not a marketing summary.",
      "Retroactively assigned semver versions to every prior release using standard discipline (new pages/capabilities = minor, fixes/perf/tooling = patch) — package.json's version had been stuck at 3.1.0 since the first commit and never tracked reality until now.",
      "Linked from the footer's version dropdown as \"Full changelog\"; documented the maintenance rule in AGENTS.md.",
    ],
  },
  {
    version: "3.7.2",
    bump: "patch",
    date: "2026-07-13",
    title: "SEO audit: metadata + internal-linking fixes",
    items: [
      "Fixed 4 section-index pages (Frameworks, Guides, Intelligence, Showcases) that were missing a meta description and silently inheriting the homepage's — the likely root cause of Google under-indexing and Bing's duplicate-content flags.",
      "Closed the one real gap in the internal-link graph (added a missing cross-link between the build-readiness checklist and the engagement-scoping guide).",
      "Audited canonical/hreflang, UTM attribution, IndexNow, thin-content risk, and llms.txt against the live site — all confirmed already correct.",
    ],
  },
  {
    version: "3.7.1",
    bump: "patch",
    date: "2026-06-26 to 2026-07-04",
    title: "SEO loop: llms.txt localization + automated health checks",
    items: [
      "Added per-locale link sections to llms.txt for the fr and id editions.",
      "Automated SEO-loop ledger health checks confirming no metadata drift between deploys.",
    ],
  },
  {
    version: "3.7.0",
    bump: "minor",
    date: "2026-06-25",
    title: "Privacy policy + AI-crawler access",
    items: [
      "Shipped a trilingual privacy policy page with a footer link.",
      "Added a geo-gated cookie-consent banner (EEA/UK/Switzerland only; off by default elsewhere).",
      "Named retrieval-time AI agents (OAI-SearchBot, ChatGPT-User) explicitly in robots.txt.",
    ],
  },
  {
    version: "3.6.0",
    bump: "minor",
    date: "2026-06-24",
    title: "Analytics backbone + growth-automation commands",
    items: [
      "Built the GA4 analytics backbone with full-funnel conversion events and Consent Mode v2.",
      "Instrumented the GTM funnel: client-side attribution + conversion events, and a Notion conversion-funnel report.",
      "Automated IndexNow submission (Bing-issued key) on every production deploy.",
      "Linked JSON-LD across the site via a shared Organization/WebSite entity graph.",
      "Added the seo-loop, gtm-funnel, content-loop, and distribute operator workflows, plus a kill-switch for bulk-unpublishing content-loop pages.",
    ],
  },
  {
    version: "3.5.0",
    bump: "minor",
    date: "2026-06-21 to 2026-06-23",
    title: "AI Consultation beta + homepage polish",
    items: [
      "Shipped the first \"AI Consultation\" experience in the Hero section.",
      "Added the rotating-headline marquee and testimonials section.",
    ],
  },
  {
    version: "3.4.1",
    bump: "patch",
    date: "2026-06-15 to 2026-06-19",
    title: "Performance, accessibility, and graphify tooling",
    items: [
      "Content-depth, Core Web Vitals, accessibility, and rich-results pass; sitemap index; interactive framework calculators.",
      "Added graphify — an AST-based knowledge-graph for codebase navigation.",
      "Performance: trimmed font preloads, modernized the browserslist target, moved Framer Motion to LazyMotion to cut Speed Index.",
    ],
  },
  {
    version: "3.4.0",
    bump: "minor",
    date: "2026-06-13",
    title: "Discord community hub",
    items: [
      "Built the /discord community landing page (contest announcements, talent-pool signup) with Meta Pixel Lead tracking, trilingual, in the site's design system.",
    ],
  },
  {
    version: "3.3.0",
    bump: "minor",
    date: "2026-06-03 to 2026-06-07",
    title: "AEO/GEO expansion + manifesto/glossary",
    items: [
      "AEO/GEO layer: AI-engineering glossary, speakable schema, localized meta.",
      "Careers page: open roles grouped by department.",
      "VSL landing page at /start.",
      "Manifesto and glossary routes restructured and localized to fr/id.",
    ],
  },
  {
    version: "3.2.0",
    bump: "minor",
    date: "2026-05-31",
    title: "Full content cluster launch",
    items: [
      "Published all 15 articles across the 5 content sections (Methodology, Frameworks, Guides, Showcases, Intelligence), each trilingual.",
      "Shipped the SEO crawl foundation: JSON-LD, llms.txt, robots.txt, sitemap, canonical URLs, static generation.",
      "Added the GEO layer: trilingual TL;DR and FAQ sections with FAQPage schema.",
      "Built the anchor hub page, section-index listing pages, and the blog-style article layout (search, floating share, sidebar).",
    ],
  },
  {
    version: "3.1.1",
    bump: "patch",
    date: "2026-05-29 to 2026-05-30",
    title: "i18n polish + form notifications",
    items: [
      "Retitled the hero headline.",
      "Migrated to ESLint flat config for Next.js 16.",
      "Added Discord webhook notifications on every form submission.",
    ],
  },
  {
    version: "3.1.0",
    bump: "minor",
    date: "2026-05-17 to 2026-05-18",
    title: "Forms, animation, and i18n foundation",
    items: [
      "Wired all 4 forms (intake, booking, career, waitlist) to their API endpoints.",
      "Added the Framer Motion animation system and full EN/FR/ID internationalization.",
      "Hardened form error handling and email deliverability (display names, reply-to, List-Unsubscribe).",
      "Refactored monolithic components; upgraded Next.js and TypeScript.",
    ],
  },
  {
    version: "3.0.0",
    bump: "minor", // baseline release — treated as the minor-0 starting point, not a fresh major
    date: "2026-05-16",
    title: "Initial release",
    items: [
      "Premium design system, month-view booking calendar, and comprehensive form validation.",
      "Vercel Analytics.",
    ],
  },
];

export type ArchivedVersion = {
  version: string;
  url: string;
  summary: string;
};

// v1/v2 are separate, archived deployments — not part of this repo's git
// history. Descriptions below reflect what's actually live at each URL
// (checked 2026-07-13), not invented feature lists.
export const ARCHIVED_VERSIONS: ArchivedVersion[] = [
  {
    version: "v2.0.0",
    url: "https://v2.prionation.io/",
    summary:
      "A small web-design and social-media services offer page (\"Elevate Your Brand with Web & Social Media\"), branded PRAYOGA.io.",
  },
  {
    version: "v1.0.0",
    url: "https://v1.prionation.io/",
    summary:
      "Darwin Prayoga's personal portfolio and product studio site — React/Deno Fresh/Tailwind/Figma services, plus an experimental \"Pokémon Identity Lab\" side project.",
  },
];
