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

> **Audit finding (2026-07-13, Claude):** confirmed clean, no code changes needed. Every route already sets `alternates.canonical` (self-referencing, own locale) and `alternates.languages` (en/fr/id + x-default) via either `buildContentMetadata()` or its own `generateMetadata`. Verified against a running build, not just source: home, `/frameworks`, `/guides`, `/intelligence`, `/showcases` in en, plus `/frameworks` in fr and id — every canonical pointed at that exact page+locale (not `/en`), every page emitted all 4 hreflang links (`en`, `fr`, `id`, `x-default`) with correct targets.

**Steps:**
- [x] Confirm every page renders `<link rel="canonical">` pointing to its own locale URL (not to `/en`) — verified against a live build
- [x] Confirm `hreflang` alternates present for en, fr, id on every page — verified
- [x] Confirm `x-default` is set (add to `languages` map if missing, pointing to `/en`) — verified, already correct everywhere
- [ ] Spot-check in browser DevTools → Elements → `<head>` on 5 random pages — did the programmatic equivalent (see above); a manual browser pass is still worth doing but shouldn't surface anything new

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

**Why:** The 3M IDR credit can't optimize toward leads without an imported conversion. GA4 already fires events (`lib/analytics/events.ts`); this connects them to Ads.

**Steps (mostly console, some code):**
- [ ] Confirm `trackEvent('intake_submit', …)` fires on intake success in `DiagnosticForm`
- [ ] Also fire `intake_qualified` / `intake_disqualified` using the `evaluateDisqualification` result (quality, not just volume)
- [ ] In GA4 → Admin → Events, mark `intake_submit` as a key event (conversion)
- [ ] Link GA4 property to the Google Ads account (GA4 Admin → Product links → Google Ads)
- [ ] Import `intake_submit` as a conversion in Google Ads
- [ ] Only then switch the campaign bid strategy from Maximize Clicks to Conversions

**Acceptance:**
- [ ] `intake_submit` shows as a conversion action in Google Ads
- [ ] Test lead registers a conversion within 24–48h
- [ ] Bid strategy switch is gated on 15–30 recorded conversions

---

## D5 · IndexNow (clears Bing's High flag, instant re-crawl)

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
Add `INDEXNOW_KEY` as a repo secret. Expand `urlList` with the pages you changed each deploy (submit deltas, not the whole site).

**Acceptance:**
- [ ] `curl https://www.prionation.io/<key>.txt` returns the key, 200
- [ ] Action runs green on a deploy
- [ ] Bing "IndexNow" High-severity flag clears

---

## D6 · GSC validate fix + resubmit (after D1 ships)

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

**Why:** On a low-authority domain, pages with few internal links get deprioritized for crawl. Every page must be reachable from the anchor page and the footer.

**Files:** `components/sections/site-footer/*`, anchor page body, nav.

**Steps:**
- [ ] Every cluster page links back to the anchor page
- [ ] Anchor page links out to all live cluster pages (methodology, showcases, guides, glossary)
- [ ] Footer nav exposes the main sections in all locales
- [ ] No orphan pages: every route reachable within 2 clicks of home

**Acceptance:**
- [ ] Screaming Frog (or `next build` route graph) shows zero orphans
- [ ] Anchor page outbound internal links ≥ number of live cluster pages

---

# P2 — Quality + hygiene

## D8 · Thin-content check

**Why:** "Crawled, currently not indexed" often means Google judged a page too thin. Sub-pages like manifesto and glossary entries are the usual suspects.

**Steps:**
- [ ] List every page under ~300 words of unique body copy
- [ ] Merge, expand, or `noindex` anything that can't stand alone
- [ ] Ensure each page carries at least one first-party, PRIONATION-specific fact (not generic AI filler)

**Acceptance:**
- [ ] No indexable page under 300 words
- [ ] Each page has a unique H1 and a TL;DR / summary block

---

## D9 · Refresh `llms.txt`

**Why:** AI crawlers should be pointed only at live, indexed URLs, and at the corrected titles.

**Files:** `public/llms.txt`

**Steps:**
- [ ] Remove any dead or draft URLs
- [ ] List only live, indexed pages with their new unique titles
- [ ] Confirm pricing block lists all 4 SKUs in EUR

**Acceptance:**
- [ ] `curl https://www.prionation.io/llms.txt` returns 200, accurate content
- [ ] No links to unindexed or 404 routes

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
