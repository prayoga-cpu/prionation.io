---
description: Go-To-Market funnel operator for prionation.io — make organic→lead→revenue measurable. Phase A: instrument attribution + conversion events (build-gated commits to main). Phase B: weekly funnel report from Notion + Vercel Analytics. Separate track from /seo-loop.
argument-hint: "[optional: 'instrument' | 'report' | specific step]"
---

# GO-TO-MARKET FUNNEL OPERATOR — prionation.io

GOAL: Make the funnel **organic search → site → lead → qualified → pipeline → won** measurable and improvable, so the SEO work (/seo-loop) can eventually be tied to revenue. This is a SEPARATE track from the SEO/AEO/GEO loop — different files, different cadence.

## GROUND TRUTH (verified — do not re-derive)
- Stack: Next.js 16 + next-intl (en/fr/id), Vercel deploy, repo `prayoga-cpu/prionation.io`, canonical `https://www.prionation.io`. User authorized DIRECT COMMITS TO MAIN (build-gated).
- Tracking today: `components/MetaPixel.tsx` (Meta Pixel: init + PageView) + `@vercel/analytics` (`<Analytics/>` auto pageviews only). **No GA4 / no Google Tag Manager / no dataLayer.** `track()` from `@vercel/analytics` is NOT called anywhere — zero custom events exist.
- The ONLY conversion event in the codebase: `fbq("track","Lead",{content_name:"Discord Join Link Click"})` in `app/[locale]/discord/DiscordPageClient.tsx`.
- Lead path: `components/sections/engage/DiagnosticForm.tsx` → POST `/api/forms/intake` → `lib/notion/sync.ts` (syncIntakeToSalesPipeline) + `lib/forms/disqualification.ts` (evaluateDisqualification) → writes Notion "Sync Status" + "Sales Pipeline Link". So **Notion IS the conversion database.**
- Attribution today: ONLY the free-text `source` field (`lib/forms/schemas.ts`, mapped to Notion "Referral Source" in `lib/notion/mappers.ts`). **No UTM / referrer / landing-page capture** → organic leads are indistinguishable from any other channel. THIS is the core gap.
- Other forms: `app/api/forms/{waitlist,booking,career}/route.ts`. Pricing CTAs: `components/sections/Pricing.tsx`. 2-step intake advance: `DiagnosticForm.tsx`.

## HARD RULES
1. NO FABRICATED DATA — report only numbers actually read from Notion / Vercel Analytics this run. Never invent conversion rates or lead counts.
2. CONSENT/PERF — stay cookieless where possible: prefer Vercel Analytics `track()` (no consent banner, no CWV cost). Do NOT add GA4 or a GTM container (CNIL/consent exposure via the fr locale + 50–90KB JS for a low-traffic site). Meta Pixel already loads; reuse it.
3. BUILD-GATED, ONE logical change per cycle (≤3 files), `npm run lint && npm test && npm run build` must pass before shipping. NO-FABRICATED-DATA guard on every diff.
4. PRIVACY — UTM/referrer capture stores only marketing params + referrer + landing path/locale (no PII beyond what the form already collects). Persist client-side in sessionStorage; submit as hidden fields.

## PHASE A — INSTRUMENT (one-time, build-gated commits to main; do in this order)
A1. **Attribution capture (highest value).** On first load (client), read `window.location.search` UTM params (utm_source/medium/campaign/term/content) + `document.referrer` + first landing path + locale; persist in sessionStorage. Inject as hidden fields into the intake POST. Extend `intakeSchema` in `lib/forms/schemas.ts` with optional `utmSource/utmMedium/utmCampaign/referrer/landingPath/landingLocale`; map them in `lib/notion/mappers.ts` alongside "Referral Source" (keep the human self-report too). Success: a test submit lands UTM/referrer columns in Notion; organic vs direct vs paid becomes queryable.
A2. **Primary conversion event.** In `DiagnosticForm.tsx` submit success (before `setSubmitted(true)`): fire `(window).fbq?.('track','Lead',{content_name:'Intake Submit',content_category:form.stage})` AND `import {track} from '@vercel/analytics'; track('intake_submit',{stage,budget,window})`. Mirror the existing Discord-click pattern. Also fire `track('intake_qualified'|'intake_disqualified')` using the `evaluateDisqualification` result so analytics reflects LEAD QUALITY, not just volume.
A3. **Funnel micro-events.** `track('pricing_cta_click',{plan})` in Pricing.tsx; `track('intake_step2')` at the step-1→2 advance; a generic submit `track()` in the waitlist/booking/career routes (or their client triggers). These reveal where intake abandons.
A4. **(Optional, later) Meta Conversions API** server-side in `app/api/forms/intake/route.ts` after the Notion write (hash email, send Lead with `event_id` deduped against the client fbq event) — robust to ad-blockers. Lower priority than A1–A3.

## PHASE B — MEASURE & REPORT (recurring, e.g. weekly)
- Read the funnel: Vercel Analytics events (sessions → pricing_cta_click → intake_step2 → intake_submit → qualified) + Notion sales pipeline (synced / disqualified / pipeline-stage / won), segmented by `utmSource`/channel and landing page.
- Identify the single biggest drop-off and the best/worst-converting channel & landing page.
- REPORT (print + optionally email): funnel counts per step, step-to-step conversion %, attribution mix, biggest drop-off, and ONE recommended next experiment. Correlation-only; never claim causality from low volume.
- Success metric for the track: % of new intakes carrying machine attribution (target ≈100% once A1 ships); visible step-by-step funnel conversion.

## DELIVERY / GUARDRAILS
- Same build-gated direct-to-main shipping as /seo-loop. Verify the deploy on prod before reporting "shipped".
- Keep this track's cadence WEEKLY (lead volume is low) — do not run daily.
