# PRIONATION.io — SEO / AEO / GEO board

Monitoring board, organised by optimisation target.
**Legend:** ✅ done & `next build` clean · 🔄 in progress · ⬜ todo (autonomous) · 🔒 blocked (needs your action / a live deploy).

- **SEO** — rank + index in classic search (Google/Bing crawl, rich results, Core Web Vitals)
- **AEO** — win answer surfaces (featured snippets, voice, "position zero")
- **GEO** — get cited by generative engines (ChatGPT, Claude, Perplexity, Google AIO)

Scale today: **~54 localized URLs** (homepage + anchor + glossary + 15 cluster pages, ×3 locales, all SSG).
Sources: _Dev Implementation Guide_ + _Sitemap Documentation_ (both 31-05-2026).

---

## SEO — search ranking & indexing

**✅ Done — build-verified**

- Trilingual content cluster: 15 pages + anchor + glossary, all SSG (en/fr/id)
- Sitemap: hreflang alternates + honest `<lastmod>` driven by `datePublished`/`dateModified`
- Structured data: Organization · ProfessionalService · WebSite · BreadcrumbList ·
  valid `Article`/`TechArticle` `@type` (dropped invalid `CaseStudy` / stepless `HowTo`)
- Localized `<title>` + description per locale (`Meta` namespace) · canonical · hreflang
- **Internal linking**: glossary hub linked from every cluster page (related-links), plus
  topical related-links per page; 4-level breadcrumb trail
- Performance: AVIF/WebP · SSG (TTFB) · font-display swap · vercel cache · favicons ·
  OG image (`og.png` compressed 2.9 MB → ~515 KB, well under the 1 MB scraper cap)
- Removed fabricated `Review` schema (Google guideline + project integrity risk)

**✅ Content depth — done (build-verified)**

- ✅ **Content depth → 2–3.5k words** (topical authority) — Methodology ×4 ✅ **+
  Frameworks ×3 · Guides ×3 · Intelligence ×2 · Showcases ×3**, all 3 locales.
  ~+14.6k EN words (~+44k across en/fr/id): +43 sections + 44 FAQ **per locale**.
  `updatedAt` → 2026-06-15. FR/ID fidelity-reviewed (native-speaker pass: 0 drift,
  0 untranslated, register normalised to formal "Anda"/« »). See checklist at bottom.

**✅ Inline contextual links — done 2026-06-15**

- ✅ **Inline contextual body links** (deeper semantic linking) — shipped WITHOUT a
  content-model change. A safe render-time linkifier (`lib/content/interlink.ts` +
  `ContentArticle`) wraps the first occurrence of canonical terms (eval suite ·
  telemetry · owned infrastructure · fixed clock · golden dataset) in localized links
  to the relevant methodology/glossary pages — once per article, self-links skipped,
  capped at 5, all 3 locales. Failure-safe (no match → no link). Verified in built
  HTML across en/fr/id (e.g. the telemetry page links out to evals/owned-infra/
  glossary but never to itself).

**✅ Image asset metadata — done 2026-06-15**

- ✅ **Embedded SEO metadata in all 12 content images** — self-describing/attributable
  wherever scraped, shared, or re-hosted. One idempotent embedder
  (`scripts/image-metadata.mjs`, `npm run images:meta`) drives a manifest:
  `og.png` · `work/*.png` ×3 · `images/team/*.jpeg` ×2 · `ads/*.png` ×6.
  PNG → `iTXt` chunks (Title/Description/Author/Copyright/Source/Keywords) + Dublin
  Core **XMP**; JPEG → Dublin Core **XMP** in APP1 (existing EXIF preserved).
  Copy sourced from the repo — `Meta` namespace (og), showcase `seoTitle`/
  `metaDescription` (work), `Foundation.team` name/role/bio (team) — **no fabricated
  text**. Replaced `og.png`'s stale Adobe XMP (falsely claimed 3600×1890).
  Favicons / `icon-512` / `apple-touch-icon` skipped by design (UI chrome browsers
  re-encode). All 12 re-decode clean; readback verified for PNG + JPEG.

**✅ XML sitemap index — done 2026-06-15**

- ✅ **XML sitemap index** — `/sitemap.xml` now serves a `<sitemapindex>` referencing six
  child sitemaps split by section (`/sitemap/0.xml` = core/standalone, `1–5` = one per
  content section), each a `<urlset>` with hreflang alternates + `<lastmod>` from
  `updatedAt` (57 URLs total). Built as custom route handlers
  (`app/sitemap.xml/route.ts` + `app/sitemap/[id]/route.ts`, shared section list in
  `lib/seo/sitemap-sections.ts`) because Next 16's `generateSitemaps` emits the children
  but not the index route. robots.txt already points at `/sitemap.xml`. Runtime-verified
  index + all 6 children. (Not strictly required at ~57 URLs, but the structure now
  scales cleanly as sections grow.)

**✅ Done — live deploy**

- ✅ **Prod origin confirmed** — Vercel serves `https://www.prionation.io/en`, so
  `SITE_URL = "https://www.prionation.io"` (`www`) in `lib/seo/site.ts` is correct.
- ✅ **Sitemap submitted** — Google Search Console **+** Bing Webmaster (2026-06-15).
- ✅ **Core Web Vitals measured** (PSI key wired into `.env.local`) — desktop green,
  mobile LCP/Speed-Index need work → tracked in the **PageSpeed** section below.

**✅ Done — validated live (2026-06-15, Rich Results Test, `/en`)**

- ✅ **Rich Results — 0 errors, 0 warnings.** First pass added truthful fields
  (priceRange/image/email + Bali locality) but `ProfessionalService` is a LocalBusiness
  subtype, so Google kept asking for `telephone`/`streetAddress`/`postalCode` — none of
  which a remote-first firm can supply without inventing. Fix (2026-06-15, 2nd pass):
  changed the "AI Product Engineering" item from `ProfessionalService` → **`Service`**
  (`components/JsonLd.tsx`) — semantically correct for a remote firm, so the local-
  business address/phone fields no longer apply and all 3 non-critical warnings clear.
  Organization + FAQ items remain valid; dropped the unused `BUSINESS_ADDRESS`/
  `PRICE_RANGE` constants. Trade-off accepted: no "Local businesses" listing (needs a
  Google-verifiable physical address the firm doesn't have).

## PageSpeed / Core Web Vitals — live validation

**Wrapper:** `npm run pagespeed` → `scripts/pagespeed.mjs` pulls Lighthouse scores +
Core Web Vitals from the live URL via PSI v5 (mobile + desktop). The key lives in
`.env.local` as `PSI_API_KEY` (the keyless quota is now 0), and the script auto-loads it.

```bash
npm run pagespeed                                       # both strategies, /en
npm run pagespeed -- https://www.prionation.io/en mobile
```

**Last run: 2026-06-15 (live, `/en`, both strategies).** Mobile Performance has recovered
to **90** (meets target). The remaining gaps are **mobile LCP (3.5 s)** and **Accessibility
(93 mobile / 89 desktop)** — both addressed by the code fixes shipped this round, which
only appear on the next `npm run pagespeed` _after deploy_ (PSI reads the live URL; the
table below is the pre-deploy live baseline).

| Metric         | Mobile   | Desktop  | Target   |
| -------------- | -------- | -------- | -------- |
| Performance    | ✅ 90    | ✅ 99    | ≥ 90     |
| Accessibility  | 🟡 93    | 🔴 89    | ≥ 95     |
| Best Practices | ✅ 100   | ✅ 100   | ≥ 95     |
| SEO            | ✅ 100   | ✅ 100   | 100      |
| LCP            | 🔴 3.5 s | ✅ 1.0 s | ≤ 2.5 s  |
| FCP            | ✅ 1.1 s | ✅ 0.3 s | ≤ 1.8 s  |
| TTFB           | ✅ 40 ms | ✅ 40 ms | ≤ 500 ms |
| CLS            | ✅ 0.006 | ✅ 0.007 | ≤ 0.1    |
| TBT            | ✅ 70 ms | ✅ 40 ms | ≤ 200 ms |
| Speed Index    | ✅ 3.0 s | ✅ 0.6 s | ≤ 3.4 s  |

**Read:** TTFB (40 ms) and FCP (1.1 s) are fast, so the origin/SSG is fine — the mobile
LCP element paints ~2.4 s _after_ first paint: the hero `<h1>` was gated behind JS (now
fixed via the `riseIn` variant + the payload strip, pending deploy). PSI still flags
**unused JS ≈ 131 KiB** — the Meta Pixel `lazyOnload` + `Pages` payload strip address the
bulk of it post-deploy. Nothing new surfaced this run.

**✅ Mobile perf — autonomous fixes shipped 2026-06-15 (re-measure post-deploy):**

- ✅ **Mobile LCP element identified = the hero `<h1>`** (no hero image — it is text).
  Root cause: framer-motion `initial="hidden"` (opacity:0) gated the LCP text until
  hydration. Fix: transform-only `riseIn` variant (`lib/motion.ts`) so the hero paints
  on the first server render. Verified in SSR HTML: `<h1>` is now
  `transform:translateY(24px)` with **no** `opacity:0`. Fonts already `font-display:swap`.
- ✅ **Trim unused JS** — Meta Pixel → `strategy="lazyOnload"` (`components/MetaPixel.tsx`):
  the single biggest contributor (~54 KiB of `connect.facebook.net`) is now off the
  critical path. PageView preserved via the fbq queue (init script) + a first-render-
  guarded route-change effect. Remaining ~76 KiB is app chunks (framer-motion) — an
  optional further code-split.
- ✅ **Page payload (biggest LCP lever)** — every page was shipping the whole `Pages`
  namespace (all cluster bodies) as unused client JSON. Stripped the heavy
  `intro`/`sections`/`faq` from the global messages (`i18n/request.ts` → `lightPages`);
  cluster pages now receive bodies as props from their route. **Homepage 83.4 → 39.4 KiB
  gzipped (−53%).** Verified: cluster bodies gone from `/en`; all cluster pages still
  render full content + FAQPage/Article JSON-LD in en/fr/id.
- ✅ **Accessibility** — all three failing audits fixed (mobile 93 / desktop 89 → ≥95
  expected): `meta-viewport` (dropped `maximum-scale`/`user-scalable=false` → pinch-zoom
  restored), `heading-order` (HowWeWork section title `<h3>` → `<h2>`; homepage sequence
  now has no skips), and `select-name` (every `<select>` now has an `aria-label` — form
  fields via their localized placeholder, the timezone picker via "Timezone").

**✅ Mobile perf — round 2 shipped 2026-06-15** (after deploy 1 confirmed live: **A11y
93→100**, **TBT 70→10 ms**; LCP 3.6 s / SI 4.6 s still the gap, plus PSI run-noise):

- ✅ **Font preload trimmed** — homepage was eagerly preloading 8 woff2 (rubik ×5 +
  black-han-sans + press-start-2p + bitter). Set `preload:false` on press-start-2p
  (decorative pixel labels) and bitter (only used on `/start`), so only the LCP font
  (black-han-sans) + body (rubik) preload — frees first-paint bandwidth for the hero LCP
  text. Verified: homepage now preloads only `black_han_sans` + `rubik`.
- ✅ **Legacy JS dropped** — added a modern `browserslist` (chrome/edge/firefox ≥109,
  safari ≥15.4) to `package.json` so SWC stops shipping ES5/legacy polyfills (~26 KiB).
- ⬜ Remaining (optional, higher-risk, left for a focused pass): framer-motion ~76 KiB
  unused JS (LazyMotion/`m` refactor or below-fold `next/dynamic` split); hero
  entrance-animation timing (the grid-overlay fade + stagger inflate Speed Index). Both
  are broad/design-affecting, so not bundled into this round.

## AEO — answer engines & voice

**✅ Done — build-verified**

- FAQPage schema on every cluster page + anchor + homepage
- **Speakable schema** (`h1` + TL;DR via `[aria-label="Summary"]`) on all 48 article
  pages + anchor — voice-assistant surfaces
- TL;DR summary blocks + inverted-pyramid, ~40–60-word answers
- FAQ depth: Methodology ×4 expanded (evals +section +2 FAQ; others +2 FAQ each);
  **Frameworks ×3 / Guides ×3 / Intelligence ×2 / Showcases ×3 each +4 FAQ** (#4
  batches, all 3 locales) — every new Q/A feeds the per-page FAQPage schema
- HowTo — intentionally **not** pursued (Google deprecated HowTo rich results in 2023)

**✅ Open items cleared**

- ✅ FAQ depth extended to Frameworks / Guides / Intelligence / Showcases (#4 batches) —
  +44 FAQ per locale across the 11 cluster pages

## GEO — generative-engine citation

**✅ Done — build-verified**

- `llms.txt` — structured value prop, pricing, tech specs, licensing
- **AI engineering glossary** — `DefinedTermSet` + 16 `DefinedTerm` ×3 locales
  (machine-readable definitions; broad inbound links aid entity grounding)
- `robots.txt` allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Amazonbot, …)
- Machine-readable summary + entity coherence across schema / llms.txt / glossary

**🔒 Blocked — needs you / time**

- 🔒 **Real client metrics** for Showcases + Intelligence (citable specifics — eval
  scores, ROI, throughput); copy currently says "to be published"
- 🔒 **AI citation baseline** — log ChatGPT/Perplexity/AIO/Claude for the 5 guide
  queries; target Day 180: 3+ cited

---

## Out of SEO/AEO/GEO scope (product / content backlog)

- ✅ **Interactive framework widgets** (calculator/checklist, inputs→result) — done
  2026-06-15. Three live tools, one per framework page, rendered after the intro:
  **Build-vs-buy** (6-input scorer → build/hybrid/buy), **Pod-vs-hire** (editable cost
  model → live € comparison), **8-week readiness** (5-area self-assessment → verdict +
  gaps). Logic is locale-independent (`lib/content/widgets.ts`); strings translated
  en/fr/id (`widgets.{en,fr,id}.ts`). **No invented assumptions** — the cost defaults
  (€150K loaded hire, €40K Build, editable) are drawn from figures already published on
  the site, and every result is labelled an estimate, not a quote. Components in
  `components/content/widgets/`; payload-safe (only the active locale's strings ship).
- 🔒 **Transparency page** (`/transparency`) — needs build-in-public stats from you

## #4 content-expansion checklist

Truthful depth only (extra sections, decision criteria, common mistakes, more FAQ).
**Never invent metrics/results.** Bump the page's `updatedAt` when its content changes.

- ✅ **Methodology ×4** — evals-before-features (+section "Where teams get this wrong",
  +2 FAQ) · telemetry-from-day-one / owned-infrastructure / lean-pods-fixed-clocks
  (+2 FAQ each) · all 3 locales · `updatedAt` → 2026-06-03
- ✅ **Frameworks ×3 · Guides ×3 · Intelligence ×2** — +3–4 sections (2–3 paras each)
  & +4 FAQ per page, all 3 locales · `updatedAt` → 2026-06-15
- ✅ **Showcases ×3** — _context / transferable lesson_ expanded (+4 sections, +4 FAQ
  each, all locales); **results stay deferred — zero metrics invented** (numeric scan
  - native-speaker review confirmed: only established figures + hypotheticals used)

## Pre-push — verification gate

- ✅ `tsc --noEmit` clean · `eslint .` clean · `vitest` 51/51 · `next build` **87/87 SSG**
  (re-verified after the sitemap index + framework widgets: en/fr/id all compile + prerender)
- ✅ Runtime smoke test (`next start`): homepage + cluster pages + **framework widget
  pages** + **`/sitemap.xml` index & all 6 children** → 200, correct localized content
  (en/fr/id); widgets interactive, `<sitemapindex>` valid.
- ✅ **Pushed → `main`** (2026-06-15) → Vercel prod deploy. Re-run `npm run pagespeed`
  and the Rich Results Test once the deploy is live to confirm the LCP / a11y / unused-JS
  fixes land. (Graphify tool output `graphify-out/{graph.html,cache/,…}` left out of the
  commit — generated local artifacts; only `graph.json` + `GRAPH_REPORT.md` versioned.)
