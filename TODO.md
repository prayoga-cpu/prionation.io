# PRIONATION.io — TODO

Deferred follow-ups. The technical SEO **code** is done and build-verified
(commits `c415260` P0+P1, `c75c8b3` GEO). What remains needs brand assets,
external accounts, or is optional polish.

Source: _[PRIONATION] Dev Implementation Guide, 31-05-2026_ and
_[PRIONATION] Sitemap Documentation, 31-05-2026_.

---

## Content cluster system (Sitemap Documentation)

Infrastructure is built: `lib/content/pages.ts` (manifest, source of truth),
sitemap auto-publishing, manifest-wired footer, and a proven page template.

- [x] Manifest + sitemap wiring + robots Amazonbot (`0bab960`)
- [x] **Cluster anchor page** built as the reusable template — trilingual,
  Article + FAQPage schema, sub-page chrome, sitemap (`fc0cf83`). This is the
  pattern to copy for every cluster page.
- [ ] **15 remaining cluster pages** (all `status:"draft"` in the manifest).
  To publish each: add a `<Section>` namespace to `messages/{en,fr,id}.json`,
  create `app/[locale]/<section>/[slug]/page.tsx` (mirror the anchor route),
  flip `status` to `"published"` + set dates in `lib/content/pages.ts`. It then
  auto-joins the sitemap + footer.
  - [ ] Methodology ×4, Frameworks ×3, Guides ×3 — evergreen/definitional;
    can be authored without client data.
  - [ ] **Showcases ×3 + Intelligence ×2 — BLOCKED on your first-party data**
    (real Epidom / Expeditoo / The Lead Agent metrics, eval scores, ROI). Will
    not be fabricated.
- [ ] Transparency page (Phase 3) — needs the build-in-public stats.
- [ ] Per-page content depth: the anchor is ~1,200 words (tight). The doc
  targets 2,500–3,500; expand if desired.

---

## SEO — blocked on brand assets

Drop the files into `/public`, then wire the metadata (notes below).

- [ ] **Favicon PNG set** — only `public/favicon.ico` (48px max) exists today.
  Export per Brand Guidelines v2.0 §2.1 and add:
  - `public/favicon-32x32.png` (32×32)
  - `public/favicon-64x64.png` (64×64)
  - `public/apple-touch-icon.png` (180×180)
  - `public/icon-512.png` (512×512)
  Then expand `icons` in [app/[locale]/layout.tsx](app/[locale]/layout.tsx)
  (`generateMetadata`) to reference the PNGs + apple-touch-icon.
- [ ] **`public/icon-512.png`** — the Organization JSON-LD `logo` in
  [components/JsonLd.tsx](components/JsonLd.tsx) already points to
  `/icon-512.png`. It **404s until this file exists** (Rich Results Test will
  warn about an unreachable logo). Highest priority of the asset items.
- [ ] **OG / social share image** — `public/og.png` (1200×630). OG/Twitter are
  currently text-only. Once added, set `openGraph.images` + `twitter.images` in
  the layout `generateMetadata`.

## SEO — blocked on external accounts / tools

- [ ] **Confirm production origin.** `SITE_URL` in
  [lib/seo/site.ts](lib/seo/site.ts) is `https://www.prionation.io`. If the site
  serves the apex (`prionation.io`), change that one constant — it drives
  canonical, hreflang, sitemap, JSON-LD, OG.
- [ ] **Submit sitemap** after deploy: `https://www.prionation.io/sitemap.xml`
  to Google Search Console **and** Bing Webmaster Tools (Bing feeds ChatGPT
  citations — don't skip).
- [ ] **Validate** post-deploy:
  - PageSpeed Insights (mobile): LCP < 2.5s · TTFB < 500ms · FCP < 1.8s
  - Rich Results Test: Organization · ProfessionalService · FAQPage → 0 errors
  - Schema validator: 0 critical errors
  - robots.txt tester (GSC): pages "Allowed"
- [ ] **AI citation baseline** — day after deploy, log whether PRIONATION is
  cited in ChatGPT / Perplexity / Google AIO / Claude for the 5 queries in the
  guide. Target Day 180: 3+ cited queries.

## SEO — optional polish (later)

- [ ] **Localized meta title/description per locale.** Currently the EN title +
  description are used across en/fr/id (hreflang/canonical are still correct).
  Localize via message keys if desired.
- [ ] **Cluster / showcase pages** — add to [app/sitemap.ts](app/sitemap.ts)
  **only once each route ships and returns 200** (never list 404s). Candidates:
  `/ai-product-engineering-for-mid-market-companies`, `/showcases/*`,
  `/methodology/*`, `/frameworks/*`, `/guides/*`.

---

## Verify before pushing the SEO work

The two SEO commits are local and **not pushed**. Before pushing:

- [ ] `npm run dev` → eyeball the new SERP title and the FAQ/TL;DR section above
  the footer in all three locales.
- [ ] Push: `GIT_SSH_COMMAND="ssh -i ~/.ssh/prayoga -o IdentitiesOnly=yes" git push origin main`

## Done (reference)

- [x] JSON-LD (Organization + ProfessionalService) · llms.txt · robots.txt ·
  sitemap.ts (hreflang) · per-locale canonical/OG/Twitter · title < 60 chars
- [x] AVIF/WebP · SSG homepage (TTFB) · vercel.json regions + cache
- [x] Trilingual TL;DR + FAQ + FAQPage schema
- [x] Already satisfied by existing code: font-display swap · entity coherence ·
  pricing crawlability
