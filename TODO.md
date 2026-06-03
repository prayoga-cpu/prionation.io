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
- Performance: AVIF/WebP · SSG (TTFB) · font-display swap · vercel cache · favicons · OG image
- Removed fabricated `Review` schema (Google guideline + project integrity risk)

**🔄 / ⬜ Open — autonomous**
- 🔄 **Content depth toward 2–3.5k words** (topical authority) — Methodology ×4 ✅;
  Frameworks / Guides / Intelligence / Showcases ⬜ (see checklist at bottom)
- ⬜ **XML sitemap index** — *intentionally deferred.* A sitemap index is for sites
  over ~50k URLs / 50MB; at ~54 URLs a single `sitemap.xml` is the correct, Google-
  recommended setup. Revisit only if the URL count explodes.
- ⬜ Inline contextual body links (deeper semantic linking) — needs a content-model
  change (bodies are plain `string[]`; would need markdown/JSX parsing). Optional.

**🔒 Blocked — needs you / a live deploy**
- 🔒 Confirm prod origin — `SITE_URL` in `lib/seo/site.ts` (`www` vs apex)
- 🔒 Submit sitemap → Google Search Console **+** Bing Webmaster (Bing feeds ChatGPT)
- 🔒 Validate post-deploy — PageSpeed mobile (LCP<2.5s · TTFB<500ms · FCP<1.8s) ·
  Rich Results (Org · ProfessionalService · FAQPage → 0 err) · robots tester

## AEO — answer engines & voice

**✅ Done — build-verified**
- FAQPage schema on every cluster page + anchor + homepage
- **Speakable schema** (`h1` + TL;DR via `[aria-label="Summary"]`) on all 48 article
  pages + anchor — voice-assistant surfaces
- TL;DR summary blocks + inverted-pyramid, ~40–60-word answers
- FAQ depth: Methodology ×4 expanded (evals +section +2 FAQ; others +2 FAQ each)
- HowTo — intentionally **not** pursued (Google deprecated HowTo rich results in 2023)

**⬜ Open — autonomous**
- ⬜ Extend FAQ depth to Frameworks / Guides / Intelligence / Showcases (with #4 batches)

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
- ⬜ **Interactive framework widgets** (calculator/checklist, inputs→result) — a UX
  feature, not a search lever, and a sizeable build. **Needs your product input**:
  the cost/decision formulas need real assumptions (salary loads, multipliers) that
  must not be invented — so it's parked until those are agreed.
- 🔒 **Transparency page** (`/transparency`) — needs build-in-public stats from you

## #4 content-expansion checklist
Truthful depth only (extra sections, decision criteria, common mistakes, more FAQ).
**Never invent metrics/results.** Bump the page's `updatedAt` when its content changes.

- ✅ **Methodology ×4** — evals-before-features (+section "Where teams get this wrong",
  +2 FAQ) · telemetry-from-day-one / owned-infrastructure / lean-pods-fixed-clocks
  (+2 FAQ each) · all 3 locales · `updatedAt` → 2026-06-03
- ⬜ Frameworks ×3 · ⬜ Guides ×3 · ⬜ Intelligence ×2
- ⬜ Showcases ×3 — expand *context / transferable lesson* only; results stay deferred

## Pre-push — verification gate
- ✅ `tsc --noEmit` clean · `eslint .` clean · `vitest` 51/51 · `next build` 72/72 SSG
- ✅ Runtime smoke test (`next start`): homepage + glossary + cluster pages → 200 with
  correct localized titles (en/fr/id); `DefinedTermSet`/`FAQPage`/`Speakable` served live
- ⬜ **Push** (→ Vercel prod deploy):
  `GIT_SSH_COMMAND="ssh -i ~/.ssh/prayoga -o IdentitiesOnly=yes" git push origin main`
- ℹ️ `components/sections/engage/CareersTab.tsx` (careers grouped by department) is your
  separate WIP — **left uncommitted**; `git add` it before pushing if it should ship now.
