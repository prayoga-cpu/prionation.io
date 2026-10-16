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

export const CURRENT_VERSION = "3.11.0";

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
    version: "3.11.0",
    bump: "minor",
    date: "2026-10-16",
    title: "Three new case studies; Expeditoo becomes Expedion × Expeditoo",
    items: [
      "New showcase pages in English, French and Indonesian: ACTE (time tracking and billing for law firms, in beta), Serrurier Paris Express (a price-first locksmith site in Paris) and GLVitr'Clean (a local cleaning company in Essonne). Each is written from the project's own repository and documents; no business results are claimed where none have been measured yet.",
      "The Expeditoo case study is rewritten as Expedion × Expeditoo: two connected products for one logistics group (the buyer app that reads auction invoices with a vision model, and the carrier marketplace), at the same URL.",
      "Replaced the old Expeditoo image, which showed \"15,000+ users\" and \"4.9/5\" figures that could not be backed, with new captures of the live sites. Frames that would show unverified figures are cropped instead.",
      "ACTE is shown with screens from its beta dashboard (journal, cases, statistics), which runs on synthetic data; Expedion × Expeditoo with the buyer app (quote type, my quotes) and the operator and carrier dashboards (admin overview with client names blurred, job board, shipments), on test data.",
      "The homepage now shows four projects (Epidom, Expedion × Expeditoo, ACTE, The Lead Agent) with whole 16:10 screenshots; /start shows six, adding the two local-business sites; new client logos in both logo rows.",
    ],
  },
  {
    version: "3.10.3",
    bump: "patch",
    date: "2026-10-15",
    title: "Finish removing the call-back option; homepage fixes on phones",
    items: [
      "Removed the last call-back mentions from /start: the FAQ answer about phoning Evan now gives his number, and the page description used in link previews only mentions WhatsApp.",
      "Closed the call-back request endpoint (it now answers 410) and removed the call-back paragraph from the privacy policy; no call-back request was ever received.",
      "The homepage menu and footer now say \"Offres\" / \"Offers\" / \"Penawaran\" instead of \"Tarification\", matching the pricing section, which no longer lists prices.",
      "Phone layout: the footer links now wrap instead of making every page that uses that footer (the homepage included) wider than the screen, which had pushed the cookie banner's buttons partly off-screen; the offer cards no longer split \"Sur devis\" over two lines.",
    ],
  },
  {
    version: "3.10.2",
    bump: "patch",
    date: "2026-10-14",
    title: "/start: remove the call-back button",
    items: [
      "Removed the \"Être rappelé(e)\" (request a call-back) button from /start, under each main button and in the phone sticky bar. WhatsApp stays the main way in, with the phone number as the alternative.",
    ],
  },
  {
    version: "3.10.1",
    bump: "patch",
    date: "2026-10-14",
    title: "Hide prices on the homepage and /start",
    items: [
      "Removed price figures from /start and the homepage (pricing cards, how-we-work comparison, FAQ, TL;DR, diagnostic form, meta description): offers now show their length and \"fixed price, on quote\", and the price comes up in the first conversation. Paid ads currently target small-business owners.",
      "/start now speaks to small and mid-sized businesses (\"Pour les TPE et PME\") and its price section became a step-by-step \"how it works\".",
      "The Express Site offer is hidden for now from the homepage pricing section and the footer.",
    ],
  },
  {
    version: "3.10.0",
    bump: "minor",
    date: "2026-10-14",
    title: "/start rework: clearer offer, a second way to reach sales, consent-free measurement",
    items: [
      "Rebuilt the /start first screen around what an ad visitor needs to decide: who it is for, the published price ranges (Diagnostic €5,000–7,000, build €25,000–55,000), who replies (Evan, with his photo) and the next step. The headline is shorter, and on phones the WhatsApp button now sits above the consent banner.",
      "Added a second way to reach sales next to every WhatsApp button: a tappable phone number and a call-back form (\"Être rappelé(e)\") that files the request in Notion and alerts the team. Phones also get a contact bar that stays on screen.",
      "Prefilled WhatsApp messages now ask a simple question and end with a short reference (for example \"réf. A1-H\"), so each chat can be traced to an ad and a button.",
      "Added consent-free audience measurement for /start: anonymous daily totals of page views and contact-button taps, with no cookie and no identifier, shown on an internal page.",
      "Removed the unapproved testimonials, the uncited in-house hiring-cost comparison and the technical jargon from /start. Epidom is now labelled as our own product instead of a client.",
      "Cookie consent: in regions that require it, Google Analytics and the Meta Pixel no longer load at all before consent. The banner has equal Refuser and Accepter buttons, accurate purposes and a policy link, a \"Gérer les cookies\" link lets visitors change their choice, and France's overseas departments are now covered.",
      "Added a legal notice page (/mentions-legales) and updated the privacy policy: WhatsApp, call-back requests, the new counters, and the right to complain to the CNIL.",
    ],
  },
  {
    version: "3.9.3",
    bump: "patch",
    date: "2026-10-14",
    title: "Remove unverified claims from the homepage",
    items: [
      "Removed the homepage testimonials section. Its quotes were unapproved drafts or a review written by our own team, and its star ratings were placeholders. Testimonials return only with each client's written sign-off.",
      "Relabelled the homepage diagnostic widget as an illustrative preview. Removed the \"powered by Claude\" credit, the model label, the token counter, the \"scan\" badge, and the projected ROI and hours-lost figures, none of which came from a real analysis.",
      "Removed the \"≥60% of Diagnostics become Builds\" figure from the homepage, FAQ, guides and llms.txt, because no published count backs it.",
      "Removed the Expeditoo live-demo link, whose deployment no longer exists; that project links to its case study only.",
      "Corrected the 3.9.0 note below: Vercel Analytics only records custom events such as whatsapp_click on its Pro plan, so on this site that event reaches GA4 only.",
    ],
  },
  {
    version: "3.9.2",
    bump: "patch",
    date: "2026-10-13",
    title: "Epidom thumbnail slideshow: website, ordering, POS, customer display",
    items: [
      "The Epidom case-study image is now a four-image slideshow, one image per part of the product: its current homepage, ordering on a phone (menu, then checkout), the web-based POS cashier screen, and the customer-facing display. It slides forward through them on a continuous loop, pauses on hover, and stays on the homepage shot for visitors who prefer reduced motion. It's pure CSS, so no extra JavaScript, and it works for any number of images.",
      "The slideshow appears on the homepage's Selected Work tile, the /start hero, and the /start shipped-work cards. All three read Epidom's images from one shared map in public/work/. Each later image has its own alt text in English, French, and Indonesian, and a test fails if one is missing.",
      "The Epidom showcase article's structured data now lists all four images. Both older Epidom screenshots were removed. The new files have new names so cached copies of the old image aren't served in their place.",
    ],
  },
  {
    version: "3.9.1",
    bump: "patch",
    date: "2026-10-08",
    title: "Simpler /start navbar",
    items: [
      "Removed the \"P.\" brand mark from the /start navbar; the PRIONATION.io pill wordmark is now the logo there at every screen width (compact on phones).",
      "On phones, the EN/FR/ID switcher on /start uses tighter spacing so the wordmark, switcher, and WhatsApp button fit on one row down to 360px wide.",
    ],
  },
  {
    version: "3.9.0",
    bump: "minor",
    date: "2026-10-08",
    title: "Sales page at /start",
    items: [
      "Added a long-form sales page at /start, fully translated into English, French, and Indonesian with an EN/FR/ID switcher in its header: problem, founder story, method, a pod-vs-hire comparison, shipped work, guarantees, and FAQ.",
      "The EN/FR/ID switcher is now one shared component used by the homepage, content pages, and /start, and a new test (npm test) catches any locale that is missing a key or carries a malformed translation.",
      "Every call to action opens a WhatsApp chat with sales. Each click fires a whatsapp_click funnel event (GA4; Vercel Analytics records custom events only on its Pro plan, which this site does not use) and, where the Meta Pixel is consented, a standard Contact event.",
      "The page is noindexed and kept out of the sitemap so it doesn't compete with the homepage. Client logos and the technology stack are labelled as separate groups.",
      "The cookie-consent banner now follows the page language (English, French, Indonesian) instead of always showing English.",
    ],
  },
  {
    version: "3.8.2",
    bump: "patch",
    date: "2026-07-29",
    title: "Lengthen thin section-index meta descriptions (Bing audit)",
    items: [
      "Bing Webmaster Tools flagged /methodology's meta description as too short (80 chars, below its 150-160 recommendation); the other 4 section-index pages (frameworks, guides, showcases, intelligence) shared the same thin pattern (49-61 chars) and would have been flagged next.",
      "Rewrote all 5 with real, grounded detail already published on each page (the four methodology principles, the three framework tools, the three guide topics, the three named showcases, the two intelligence articles) — no invented claims or numbers.",
      "Bing's separate \"duplicate meta descriptions\" flag on the same 5 pages was confirmed stale: a live check showed every page already serving a unique description from the earlier D1 fix; Bing's crawl simply hadn't caught up yet.",
    ],
  },
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
