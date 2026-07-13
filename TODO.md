# TODO — Technical SEO & Attribution Recovery

**Version:** v.3.1.0
**Date:** 13/07/2026
**Repo:** `prayoga-cpu/prionation.io` · Next.js 16 · next-intl (en/fr/id) · Vercel
**Based on:** GSC (12 indexed / 39 not) + Bing (duplicate titles, duplicate meta descriptions, weak backlinks)

---

## The problem in one line

51 pages ship with near-identical titles and meta descriptions, so Google indexes only 12, so almost nothing can rank. Fix metadata first. Everything else is downstream.

---

## How to work this file

- Build-gated, direct commits to main. One logical change per commit, max 3 files.
- Every task must pass before it ships:
  ```bash
  npm run lint && npm test && npm run build
  ```
- After deploy, verify on production before checking the box.
- Do tasks in order. P0 unblocks indexing, P1 forces the re-crawl and wires measurement, P2 is hygiene.
- No fabricated data. Attribution and reporting read only real values.

---

## Status at a glance (2026-07-13 audit — re-verified, see method note below)

| # | Task | Code status | Who does what's left |
|---|---|---|---|
| D1 | Unique title/description per page | ✅ Fixed (4 pages) | **You:** push, then run the live duplicate-detector + optionally trim 6 over-length titles/descriptions |
| D2 | Canonical + hreflang | ✅ Already correct, no changes | **You:** push, then a quick DevTools spot-check is nice-to-have |
| D3 | UTM attribution → Notion | ✅ Already built (pre-existing) | **You:** say the word for a live test submission, or run one yourself |
| D4 | GA4 → Google Ads conversion | 🟡 Code done, console pending | **You:** 4 GA4/Ads console steps — no code left |
| D5 | IndexNow | ✅ Already shipped, live-verified | **You:** confirm the Bing dashboard flag cleared |
| D6 | GSC/Bing manual resubmit | ⬜ Not started | **You:** 100% console work, do after pushing |
| D7 | Internal linking | ✅ Fixed (1 gap closed) | **You:** push — nothing else needed |
| D8 | Thin-content check | ✅ Audited, nothing was thin | **You:** 2 judgment calls (discord, section-index copy) |
| D9 | llms.txt | ✅ Already accurate, live-verified | Nothing — already correct on production |

**Verification method, so "done" means what it says:** D1/D2/D7 were re-verified today against a **local production build** (`npm run build && npm start`) — real, but not yet the live site, since none of these commits are pushed yet. D3/D5/D9 were verified against **the actual live prionation.io** (they predate this session's work, or in D5's case are independently confirmed via GitHub's Actions API). Full detail and re-verification commands are in each `Dn` section below.

A consolidated, ordered list of everything that needs *you* — pushing, console clicks, and the judgment calls I deliberately didn't make unilaterally — is in **"Your action items"** near the end of this file.

---

## Priority + sequencing

```
P0  D1 metadata ─┐
    D2 canonical ─┼─▶  pages become indexable
    D3 attribution┘
P1  D4 ads link ─┐
    D5 indexnow ─┼─▶  recrawl forced + spend measurable
    D6 validate ─┤
    D7 internal ─┘
P2  D8 thin content
    D9 llms.txt
```

---

# P0 — Unblock indexing

## D1 · Unique title + meta description per page, per locale

> **Audit finding (2026-07-13, Claude):** the actual bug was narrower than assumed. A `lib/content/meta.ts` `buildContentMetadata()` system already existed and already gives every cluster page (`frameworks/guides/intelligence/methodology/showcases`/`[slug]`) and every top-level page (home, anchor, manifesto, glossary, privacy, discord) a unique `seoTitle`/`metaDescription` per locale — confirmed zero duplicate `seoTitle`/`metaDescription` strings across all 15 published cluster-page slugs × 3 locales. The real bug: **4 section-index pages (`/frameworks`, `/guides`, `/intelligence`, `/showcases`) had no `description` field in `generateMetadata()`**, so Next.js silently inherited the root layout's `homeDescription` — identical to home's description and to each other, across all 3 locales. That's the likely source of both the GSC non-indexing and the Bing "duplicate meta descriptions" flag. **Fixed** — see route checklist below. No new `lib/seo/metadata.ts` or `seo` i18n namespace was needed; the existing system just needed those 4 gaps closed.
>
> **Separate finding, not fixed (flagged for follow-up, not blocking indexing):** several existing `seoTitle`/`metaDescription` values exceed the length guideline below — 1 title at 61-72 chars across locales ("The Lead Agent" showcase), and 6 showcase/framework descriptions at 161-220 chars (worst: FR "The Lead Agent" showcase at 220). Google truncates rather than penalizes, so this doesn't block indexing, but it's real and worth trimming. Left untouched since it's marketing copy that deserves a human pass rather than a silent AI edit — exact strings are in `lib/content/text/{en,fr,id}.ts`.

**Why:** This is the fix. Duplicate titles and descriptions are why Google refuses to index 39 pages and why Bing throws two flags. Every page needs a distinct title (<60 chars) and description (<160 chars) in all three locales.

**Files:**
- `lib/seo/metadata.ts` (new — shared builder)
- `messages/en.json`, `messages/fr.json`, `messages/id.json` (add `seo` namespace)
- every `app/[locale]/**/page.tsx` (add `generateMetadata`)

**Step 1 — shared builder:**
```ts
// lib/seo/metadata.ts
import type { Metadata } from 'next'

const BASE = 'https://www.prionation.io'
const LOCALES = ['en', 'fr', 'id'] as const
type Locale = (typeof LOCALES)[number]

export function buildMetadata(opts: {
  locale: Locale
  path: string            // '' for home, '/ai-engineering-glossary', etc.
  title: string           // UNIQUE per page+locale, <60 chars
  description: string     // UNIQUE per page+locale, <160 chars
  type?: 'website' | 'article'
}): Metadata {
  const url = `${BASE}/${opts.locale}${opts.path}`
  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE}/${l}${opts.path}`]),
      ),
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: 'PRIONATION.io',
      locale: opts.locale,
      type: opts.type ?? 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
    },
  }
}
```

**Step 2 — per-page metadata (example):**
```ts
// app/[locale]/ai-engineering-glossary/page.tsx
import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'en' | 'fr' | 'id' }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.glossary' })
  return buildMetadata({
    locale,
    path: '/ai-engineering-glossary',
    title: t('title'),
    description: t('description'),
    type: 'article',
  })
}
```

**Step 3 — add `seo` strings** to each `messages/*.json`, one unique block per page. Example:
```json
"seo": {
  "home": {
    "title": "AI Product Engineering · PRIONATION.io",
    "description": "Production AI for EU and US mid-market companies. Fixed scope, fixed price, 8 weeks to production. Start with a 2-week diagnostic."
  },
  "glossary": {
    "title": "AI Engineering Glossary · PRIONATION.io",
    "description": "Plain definitions of the AI product engineering terms mid-market operators actually need. Evals, telemetry, RAG, owned infrastructure."
  }
}
```

**Route checklist — give each a unique title + description in en/fr/id:**
(Corrected against the real routes — `find app -name 'page.tsx'` — a few paths in the original list didn't match what's actually deployed, e.g. the glossary lives under the anchor path, not at `/ai-engineering-glossary`; `/showcases/epidom` is one of 6 published slugs under the dynamic `/showcases/[slug]`, not its own file.)
- [x] `/` (home) — root layout `generateMetadata`, `Meta.homeTitle`/`homeDescription`
- [x] `/ai-product-engineering-for-mid-market-companies` (anchor) — already unique, pre-existing
- [x] `/ai-product-engineering-for-mid-market-companies/manifesto` — already unique, pre-existing
- [x] `/ai-product-engineering-for-mid-market-companies/glossary` — already unique, pre-existing
- [x] `/privacy` — already unique, pre-existing
- [x] `/discord` — already unique, pre-existing (not in the original list — added)
- [x] `/frameworks` (index) — **fixed today**, was missing `description`
- [x] `/guides` (index) — **fixed today**, was missing `description`
- [x] `/intelligence` (index) — **fixed today**, was missing `description`
- [x] `/showcases` (index) — **fixed today**, was missing `description`
- [x] `/methodology` (index) — already had a unique description, pre-existing
- [x] All 15 published cluster-page slugs (`frameworks/[slug]`, `guides/[slug]`, `intelligence/[slug]`, `methodology/[slug]`, `showcases/[slug]`) — `buildContentMetadata()`, verified zero duplicate `seoTitle`/`metaDescription` across en/fr/id (see length-overage note above for the ones that need trimming)

**Duplicate detector (run after deploy to prove it's fixed):**
```bash
# titles across the live sitemap — every count should be 1
node -e '
const https=require("https");
(async()=>{
  const xml=await new Promise(r=>https.get("https://www.prionation.io/sitemap.xml",s=>{let d="";s.on("data",c=>d+=c);s.on("end",()=>r(d))}));
  const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  const seen={};
  for(const u of urls){
    const h=await new Promise(r=>https.get(u,s=>{let d="";s.on("data",c=>d+=c);s.on("end",()=>r(d))}));
    const t=(h.match(/<title>(.*?)<\/title>/)||[])[1]||"";
    seen[t]=(seen[t]||0)+1;
  }
  Object.entries(seen).filter(([,n])=>n>1).forEach(([t,n])=>console.log(n,t));
})();'
```

**Acceptance:**
- [ ] No two live pages share a title (detector prints nothing) — needs a deploy, then run the detector script below
- [ ] No two live pages share a meta description — same; local content audit (all 3 locale files) already confirms zero duplicates in the *content*, the remaining risk was purely the 4 pages fixed above
- [ ] Every title <60 chars, every description <160 chars — **not yet true**, see length-overage note above; separate follow-up
- [ ] Bing "identical titles" and "identical meta descriptions" flags clear on recheck — needs live re-crawl after deploy
- [x] `npm run lint && npm test && npm run build` passes — verified locally 2026-07-13 (51/51 tests, clean lint, clean build)

---

## D2 · Canonical + hreflang on every page

**Why:** Three locale variants of each page can be read as duplicates of each other without self-referencing canonicals and reciprocal hreflang. `buildMetadata` in D1 already emits both — this task is verification across all routes.

**Files:** none new if D1 shipped correctly; audit only.

> **Audit finding (2026-07-13, Claude):** confirmed clean, no code changes needed. Every route already sets `alternates.canonical` (self-referencing, own locale) and `alternates.languages` (en/fr/id + x-default) via either `buildContentMetadata()` or its own `generateMetadata`. Re-verified twice (initial audit + today's double-check) against a **local production build** (`npm run build && npm start` — not the live site, since nothing's pushed yet): home, `/frameworks`, `/guides`, `/intelligence`, `/showcases` in en, plus `/frameworks` in fr and id — every canonical pointed at that exact page+locale (not `/en`), every page emitted all 4 hreflang links (`en`, `fr`, `id`, `x-default`) with correct targets.

**Steps:**
- [x] Confirm every page renders `<link rel="canonical">` pointing to its own locale URL (not to `/en`) — verified against a local production build
- [x] Confirm `hreflang` alternates present for en, fr, id on every page — verified
- [x] Confirm `x-default` is set (add to `languages` map if missing, pointing to `/en`) — verified, already correct everywhere
- [ ] Spot-check in browser DevTools → Elements → `<head>` on 5 random pages — did the programmatic equivalent twice (see above); a manual browser pass on the *live* site after deploy is still worth doing

**Acceptance:**
- [ ] Google Rich Results / URL inspection shows one self-referencing canonical per page — needs live GSC, post-deploy
- [ ] No "Duplicate, Google chose different canonical" in GSC after re-crawl — needs live GSC, post-deploy

---

## D3 · UTM + referrer attribution → Notion (Phase A1)

> **Audit finding (2026-07-13, Claude): this is already built, pre-existing, not part of today's work.** All 5 steps below already exist in the codebase:
> - Step 1 (capture util): `lib/analytics/attribution.ts` — `captureAttribution()`/`getAttribution()`, first-touch, sessionStorage-based, same fields (utmSource/Medium/Campaign/Term/Content, referrer, landingPath, landingLocale) plus a bonus `channel` classifier (organic/paid/social/email/referral/direct/internal).
> - Step 2 (call on mount): `captureAttribution()` fires unconditionally in `components/MetaPixel.tsx`'s `useEffect` (rendered in the root layout, so every page/locale) — deliberately *before* the consent/pixel-enabled check, since it's cookieless sessionStorage, not a tracking script.
> - Step 3 (schema): `lib/forms/schemas.ts`'s `intakeSchema` already has all 8 fields (utmSource…landingLocale, channel), all optional.
> - Step 4 (inject into POST): `components/sections/engage/DiagnosticForm.tsx` calls `getAttribution()` and spreads it into the `/api/forms/intake` body alongside the human `source` field.
> - Step 5 (map to Notion): `lib/notion/mappers.ts`'s `referralSourceText()` folds channel + all UTM/referrer/landing fields into the existing "Referral Source" rich_text property — a different approach than the TODO's proposed new columns (one column, machine-readable `key=value` format, tagged `[auto]`), but achieves the same goal without a Notion schema migration.
>
> **Not verified: the Acceptance checkboxes below need a live test submission, which writes a real row to the production `PN_Intake` Notion database** — I didn't do this without asking, since it has a real side effect on your actual sales pipeline. Say the word and I'll run one (e.g. `?utm_source=google&utm_medium=cpc` → submit → confirm it landed), or do it yourself.

**Why:** GA4 sees channels, but your conversion database (Notion) can't tell an organic lead from a paid one. Capture the source client-side and write it to Notion so `PN_Sales_Pipeline` becomes queryable by channel.

**Files:**
- `lib/attribution/capture.ts` (new)
- `lib/forms/schemas.ts` (extend intake schema)
- `lib/notion/mappers.ts` (map new fields)
- intake form client component under `components/sections/engage/` (inject hidden fields)

**Step 1 — capture util (first-touch within session):**
```ts
// lib/attribution/capture.ts
export type Attribution = {
  utmSource: string; utmMedium: string; utmCampaign: string
  utmTerm: string; utmContent: string
  referrer: string; landingPath: string; landingLocale: string
}

export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  if (sessionStorage.getItem('pn_attr')) return // keep first touch
  const p = new URLSearchParams(window.location.search)
  const attr: Attribution = {
    utmSource: p.get('utm_source') ?? '',
    utmMedium: p.get('utm_medium') ?? '',
    utmCampaign: p.get('utm_campaign') ?? '',
    utmTerm: p.get('utm_term') ?? '',
    utmContent: p.get('utm_content') ?? '',
    referrer: document.referrer ?? '',
    landingPath: window.location.pathname,
    landingLocale: document.documentElement.lang ?? '',
  }
  sessionStorage.setItem('pn_attr', JSON.stringify(attr))
}

export function readAttribution(): Partial<Attribution> {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(sessionStorage.getItem('pn_attr') ?? '{}') } catch { return {} }
}
```

**Step 2 — call `captureAttribution()`** once on first client mount (a top-level client provider or the existing consent/analytics bootstrap).

**Step 3 — extend the intake Zod schema:**
```ts
// lib/forms/schemas.ts  (add to intakeSchema)
utmSource:     z.string().max(200).optional(),
utmMedium:     z.string().max(200).optional(),
utmCampaign:   z.string().max(200).optional(),
utmTerm:       z.string().max(200).optional(),
utmContent:    z.string().max(200).optional(),
referrer:      z.string().max(500).optional(),
landingPath:   z.string().max(300).optional(),
landingLocale: z.string().max(10).optional(),
```

**Step 4 — inject into the intake POST** via `readAttribution()` (hidden fields, alongside the existing human `source` self-report — keep both).

**Step 5 — map to Notion** in `lib/notion/mappers.ts` (add `rich_text` props, or a `select` for `utmSource`) next to the existing "Referral Source". Add the matching columns in `PN_Sales_Pipeline`.

**Acceptance:**
- [ ] A test submit from `?utm_source=google&utm_medium=cpc` lands those values in Notion — not run (would write a real live-Notion row, needs your go-ahead)
- [ ] `referrer`, `landingPath`, `landingLocale` populate — same
- [ ] Organic / direct / paid is now filterable in the Notion pipeline — same
- [x] Existing 51 schema tests still pass — verified 2026-07-13 (the fields already exist, so there was nothing new to add cases for)

---

# P1 — Force re-crawl + wire measurement

## D4 · Link GA4 to Google Ads, import the lead conversion

> **Audit finding (2026-07-13, Claude):** the 2 code steps are already shipped — `DiagnosticForm.tsx` fires `trackEvent("intake_submit", …)` on success, then `trackEvent(disq.disqualified ? "intake_disqualified" : "intake_qualified", …)` using `evaluateDisqualification()`, exactly as specified. **Everything else in this task is GA4/Google Ads console configuration — I don't have access to your GA4 or Ads accounts, so I can't do any of it.** The 4 unchecked console steps below are the actual remaining work.

**Why:** The 3M IDR credit can't optimize toward leads without an imported conversion. GA4 already fires events (`lib/analytics/events.ts`); this connects them to Ads.

**Steps (mostly console, some code):**
- [x] Confirm `trackEvent('intake_submit', …)` fires on intake success in `DiagnosticForm` — verified in code
- [x] Also fire `intake_qualified` / `intake_disqualified` using the `evaluateDisqualification` result (quality, not just volume) — verified in code
- [ ] In GA4 → Admin → Events, mark `intake_submit` as a key event (conversion) — **you need to do this**
- [ ] Link GA4 property to the Google Ads account (GA4 Admin → Product links → Google Ads) — **you need to do this**
- [ ] Import `intake_submit` as a conversion in Google Ads — **you need to do this**
- [ ] Only then switch the campaign bid strategy from Maximize Clicks to Conversions — **you need to do this**

**Acceptance:**
- [ ] `intake_submit` shows as a conversion action in Google Ads
- [ ] Test lead registers a conversion within 24–48h
- [ ] Bid strategy switch is gated on 15–30 recorded conversions

---

## D5 · IndexNow (clears Bing's High flag, instant re-crawl)

> **Audit finding (2026-07-13, Claude): already fully shipped, and better than this spec.** `.github/workflows/indexnow.yml` and `scripts/indexnow.mjs` were committed on 2026-06-27/07-04 (commits `013596c`, `93eca96`) — the real, Bing-issued key, not a random one; a real GitHub Actions run history (2 successful production runs); and it improves on the TODO's design in three ways: (1) gates on `deployment_status` == success **and** environment contains "production" (skips previews, unlike the plain template above), (2) has a concurrency group so overlapping deploys don't race, (3) `indexnow.mjs` walks the *live sitemap* and submits every URL it finds, instead of a hardcoded 3-URL list that would silently go stale. The key is hardcoded directly in the script rather than a `INDEXNOW_KEY` repo secret — a reasonable simplification, since this "key" is designed to become public at `/<key>.txt` anyway.
>
> **Verified live, right now:** `curl https://www.prionation.io/34f3ca2fd693436391b39a0e6448df86.txt` → 200, correct key. GitHub Actions run history shows 2 successful production submissions (2026-06-27, 2026-07-04) plus one correctly-skipped non-production deploy today. **Both acceptance boxes below are genuinely met.** Nothing left to build here — the only unknown is whether Bing's dashboard has cleared the flag, which needs a manual check in Bing Webmaster Tools.

**Why:** Free instant indexing for Bing and the AI engines it feeds. Also the fastest way to re-surface the D1-fixed pages.

**Files:**
- `public/<key>.txt` (new)
- `.github/workflows/indexnow.yml` (new)

**Step 1 — key file.** Generate `openssl rand -hex 16`, save as `public/<key>.txt` containing only the key.

**Step 2 — deploy-triggered ping:**
```yaml
# .github/workflows/indexnow.yml
name: IndexNow ping
on:
  deployment_status:
jobs:
  ping:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - name: Submit URLs to IndexNow
        run: |
          curl -sS -X POST "https://api.indexnow.org/indexnow" \
            -H "Content-Type: application/json" \
            -d "$(cat <<JSON
          {
            "host": "www.prionation.io",
            "key": "${{ secrets.INDEXNOW_KEY }}",
            "keyLocation": "https://www.prionation.io/${{ secrets.INDEXNOW_KEY }}.txt",
            "urlList": [
              "https://www.prionation.io/en",
              "https://www.prionation.io/fr",
              "https://www.prionation.io/id"
            ]
          }
          JSON
          )"
```
Add `INDEXNOW_KEY` as a repo secret. Expand `urlList` with the pages you changed each deploy (submit deltas, not the whole site). *(Superseded — see audit note above: the shipped version submits the whole live sitemap automatically, no secret or manual urlList maintenance needed.)*

**Acceptance:**
- [x] `curl https://www.prionation.io/<key>.txt` returns the key, 200 — verified live 2026-07-13
- [x] Action runs green on a deploy — verified via GitHub Actions run history (2 successful production runs)
- [ ] Bing "IndexNow" High-severity flag clears — needs a manual check in Bing Webmaster Tools

---

## D6 · GSC validate fix + resubmit (after D1 ships)

> **Note:** entirely GSC/Bing Webmaster console actions — I have no access to either, so none of this can be done or verified from here. Listed as-is for you to work through once D1 is deployed.

**Why:** Tell Google to re-evaluate the 39 pages now that titles and descriptions are unique.

**Steps:**
- [ ] GSC → Pages → open each "not indexed" reason bucket → Validate Fix
- [ ] GSC → Sitemaps → resubmit `sitemap.xml`
- [ ] URL-inspect 5 previously-unindexed pages → Request Indexing
- [ ] Bing Webmaster → resubmit sitemap + submit same URLs via IndexNow

**Acceptance:**
- [ ] GSC validation state moves to "Started" then "Passed" over the following days
- [ ] Indexed count climbs from 12 toward 40+ within 4–6 weeks

---

## D7 · Internal linking pass

> **Audit finding (2026-07-13, Claude):** audited the actual link graph via `lib/content/pages.ts`'s manifest (single source of truth for `interlinkTo`) rather than by eyeballing pages. Findings:
> - All 15 published pages already list `ANCHOR_PATH` first in `interlinkTo` — cluster→anchor backlinks were already 100% complete.
> - `AnchorPage.tsx` already has a "Categories" grid linking to all 5 section indices (with a live count + 2 recent articles each) — anchor→cluster coverage was already complete.
> - `FooterColumns.tsx`'s "AI Product Engineering" column already links to all 5 section indices (`/methodology`, `/showcases`, `/frameworks`, `/guides`, `/intelligence`) via the locale-aware `Link` component, present on every page — so every published article is reachable in ≤2 clicks from home via Home → (footer) Section Index → Article, regardless of the anchor page.
> - Building the reverse-link graph (which pages point *at* which) found exactly **one page with zero inbound topical links**: `guides/scoping-ai-build-engagement` — reachable via the flat `/guides` index, but no other article pointed at it specifically. **Fixed** — added it to `frameworks/8-week-build-readiness-checklist`'s `interlinkTo` (same topic). Re-verified twice against a local production build that the new link actually renders on the page — not yet the live site, since nothing's pushed yet.
>
> Net: this task was ~95% already done by the existing footer/anchor/manifest design; the one real gap is closed.

**Why:** On a low-authority domain, pages with few internal links get deprioritized for crawl. Every page must be reachable from the anchor page and the footer.

**Files:** `components/sections/site-footer/*`, anchor page body, nav.

**Steps:**
- [x] Every cluster page links back to the anchor page — verified via manifest, all 15/15
- [x] Anchor page links out to all live cluster pages (methodology, showcases, guides, glossary) — verified, `AnchorPage.tsx`'s Categories grid
- [x] Footer nav exposes the main sections in all locales — verified, `FooterColumns.tsx`
- [x] No orphan pages: every route reachable within 2 clicks of home — true structurally (footer); the one weak-topical-link page is now fixed too

**Acceptance:**
- [ ] Screaming Frog (or `next build` route graph) shows zero orphans — the manifest-based audit above is the code-level equivalent; a Screaming Frog crawl is still worth running once deployed as an independent check
- [x] Anchor page outbound internal links ≥ number of live cluster pages — anchor links to all 5 section indices (which each list every published page in that section), verified in `AnchorPage.tsx`

---

# P2 — Quality + hygiene

## D8 · Thin-content check

> **Audit finding (2026-07-13, Claude): the suspected pages aren't thin. No content edits made.** Word-counted every indexable page's actual body copy (`tldr` + `intro` + `sections[].body` + `faq[].a`, i.e. real prose, not markup) across all 3 locales:
> - All 15 published cluster articles: 671–2,543 words. Comfortably clear.
> - Manifesto: 554 words. Glossary: 732 words. Anchor: 1,165 words. Privacy: 471–609 words (by locale). All clear — contrary to the "Why" above, manifesto and glossary are **not** the thin ones.
> - Every page checked has a non-empty, unique `h1` and `tldr`/summary block — second acceptance box already true everywhere checked.
>
> Two real exceptions, both judgment calls I didn't act on unilaterally:
> - **`/discord` — 205 words.** But it's a recruitment/community CTA landing page (contest announcements, talent-pool signup), not an article — a different page type than what D8's "Why" is worried about. Padding it with generic prose to hit 300 words would hurt the page's actual job. Options: leave as-is (low risk, single page), or add `noindex` since it's not meant to rank for informational search anyway. Your call.
> - **The 5 section-index pages** (`/frameworks`, `/guides`, etc.) have very little unique prose (just the one-sentence description + card previews, which reuse *other* pages' text) — but they're hub/listing pages, a normal, widely-accepted pattern, not doorway pages. A genuine improvement would be a short, real 2-3 sentence intro per section (grounded in what's actually true, e.g. methodology's four real principles) — but that's 5 sections × 3 locales of new marketing copy, which is a brand-voice decision I didn't want to make unilaterally. Flagging as a possible follow-up, not doing it without your steer.

**Why:** "Crawled, currently not indexed" often means Google judged a page too thin. Sub-pages like manifesto and glossary entries are the usual suspects.

**Steps:**
- [x] List every page under ~300 words of unique body copy — done, see finding above (`/discord` + the 5 index pages)
- [ ] Merge, expand, or `noindex` anything that can't stand alone — judgment call, not acted on (see above)
- [x] Ensure each page carries at least one first-party, PRIONATION-specific fact (not generic AI filler) — true for every cluster article (each ties to real showcase clients, real pricing, real methodology)

**Acceptance:**
- [ ] No indexable page under 300 words — **false**, `/discord` + 5 section indices are under, by design (see finding)
- [x] Each page has a unique H1 and a TL;DR / summary block — verified true everywhere checked

---

## D9 · Refresh `llms.txt`

> **Audit finding (2026-07-13, Claude): already fully accurate, no changes needed.** Fetched the live `https://www.prionation.io/llms.txt` and diffed it byte-for-byte against the local `public/llms.txt` — **identical**. Cross-checked every claim in it against the actual codebase: all 15 published article links match the real manifest exactly (no dead/draft URLs, nothing missing); the pricing block (Diagnostic €5-7K, Build €25-55K, Retainer €4-9K/mo, Express Site €1.5K) matches `lib/seo/site.ts`'s `OFFERS` — the source of truth — figure for figure. Spot-checked 10 of the linked URLs live (across all 3 locales, including the D7-fixed `guides/scoping-ai-build-engagement`): all 200.

**Why:** AI crawlers should be pointed only at live, indexed URLs, and at the corrected titles.

**Files:** `public/llms.txt`

**Steps:**
- [x] Remove any dead or draft URLs — none found
- [x] List only live, indexed pages with their new unique titles — already accurate
- [x] Confirm pricing block lists all 4 SKUs in EUR — verified against `lib/seo/site.ts` OFFERS

**Acceptance:**
- [x] `curl https://www.prionation.io/llms.txt` returns 200, accurate content — verified live 2026-07-13
- [x] No links to unindexed or 404 routes — 10-URL live spot check, all 200

---

## Your action items (everything that needs you, in order)

Everything code-side is done, re-verified fresh today (`npm run lint && npm test && npm run build` — all green; every fix re-confirmed against a local production build; sources re-grepped to confirm nothing regressed). Nothing below needs more code — it's either a click-through console flow or a decision only you can make.

**1 — Unblocks everything else:**
- [ ] `git push` the 7 commits on `main` (D1 fix, D7 fix, 3 audit-doc commits, 2 trailing graph-rebuild commits). Nothing else on this list can be live-verified until Vercel deploys them.

**2 — After the deploy, quick verification (~10 min):**
- [ ] Run D1's duplicate-title detector script against the live sitemap (in D1 above) — should print nothing
- [ ] Bing Webmaster Tools → confirm the "duplicate titles," "duplicate meta descriptions," and "IndexNow" flags are all clear (D1 + D5)
- [ ] Optional: a DevTools spot-check of canonical/hreflang on a couple of live pages (D2) — the code-level check already passed twice, this is just belt-and-suspenders

**3 — Console work with no code surface (I have no access to these):**
- [ ] D4: GA4 → Admin → Events → mark `intake_submit` as a key event
- [ ] D4: GA4 → Admin → Product links → link the Google Ads account
- [ ] D4: Google Ads → import `intake_submit` as a conversion
- [ ] D4: switch bid strategy from Maximize Clicks to Conversions (gate this on 15–30 recorded conversions first)
- [ ] D6: GSC → Pages → Validate Fix on each "not indexed" bucket
- [ ] D6: GSC → Sitemaps → resubmit `sitemap.xml`
- [ ] D6: GSC → URL-inspect 5 previously-unindexed pages → Request Indexing
- [ ] D6: Bing Webmaster → resubmit sitemap

**4 — Judgment calls (your call, not mine to make unilaterally):**
- [ ] D8: decide what happens to `/discord` (205 words) — leave as-is, or add `noindex` since it's a community/contest CTA page, not an article
- [ ] D8: decide whether to commission real intro copy for the 5 section-index pages (15 short paragraphs across 3 locales) — I flagged this but didn't write unrequested marketing copy
- [ ] D1: decide whether to trim the ~6 titles/descriptions that run over the 60/160-char guideline (exact strings named in D1 above) — doesn't block indexing, just worth cleaning up
- [ ] D3 (optional): say the word if you want me to run one live test submission (`?utm_source=google&utm_medium=cpc` → submit → confirm it lands in Notion) — I didn't do this unprompted since it writes a real row to your production sales pipeline

---

## Sprint definition of done

- [ ] Bing: both duplicate flags cleared, IndexNow flag cleared
- [ ] GSC: indexed count trending 12 → 40+
- [ ] Every live page: unique title + description, self-canonical, hreflang complete
- [ ] Notion pipeline: new leads carry UTM + referrer + landing path
- [ ] Google Ads: `intake_submit` imported as a conversion
- [ ] `npm run lint && npm test && npm run build` green on main
- [ ] Production verified after each deploy

---

## Explicitly out of scope (handled elsewhere)

- Backlinks — off-dev: client "Built by PRIONATION" links, directories, digital PR
- Google Ads launch — gated on D3 + D4
- Content publishing cadence — resume only after D1 ships
- Never buy PBN / aged-domain / bulk backlink packages. Penalty risk, brand-fatal.

---

*PRIONATION.io — Dev TODO v.3.1.0 — 13/07/2026 — © 2026 PRIORITY FOUNDATION*
