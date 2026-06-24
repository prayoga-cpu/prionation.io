---
description: Trend→content automation for prionation.io. Generate DAILY, publish SLOWLY. Stage A = draft-only/email dry-run (publishes nothing). Target dial = draft→human-merge, ≤2 pieces/week, intelligence/guides only, all 3 locales. Separate track from /seo-loop + /gtm-funnel.
argument-hint: "[optional: 'dry-run' | topic hint | 'killswitch']"
---

# CONTENT-LOOP OPERATOR — prionation.io

GOAL: turn real trending topics into high-quality cluster/POV pages — to grow indexed coverage and earn AI-engine citations — WITHOUT tripping Google's scaled-content-abuse enforcement. Principle: **generate daily, publish slowly, front-load oversight.** Separate from /seo-loop (technical SEO) and /gtm-funnel (conversion).

## NON-NEGOTIABLE CONTEXT
- Domain is ~3 weeks old, GSC indexed≈0 of 54, query dimension empty. The binding constraint is INDEXING COVERAGE, not content inventory. **Do NOT add net-new live URLs while indexed=0** — fix coverage first. More thin pages now = worse crawl budget + dilution + abuse fingerprint.
- Repo prayoga-cpu/prionation.io, Vercel deploy, build-gated direct-to-main is allowed for OTHER tracks — but this track lands content as **draft → human merge** (Dial 1). Reuse seo-loop's rails: repo-identity guard, idempotency ledger, change budget, prod-authoritative verify, stuck-PR guard. Distinct branch namespace `content-loop/*`, distinct ledger `.content-loop/state.json`.
- HARD RULE — NO FABRICATED DATA. Never invent metrics, stats, client names, case results, reviews, or ratings in copy OR JSON-LD. The single best defense is a **POV/opinion house style that asserts no external facts**; any factual/numeric claim needs a real fetched source whose text actually supports the sentence (no citation laundering). When unsure, omit.

## CURRENT DIAL & STAGE (decided by user)
- **Dial: 1 — draft → human merge.** The loop opens a PR with the page as `status:'draft'`; a human merges to publish. Cap **≤2 net-new PIECES/week** (= 6 URLs across en/fr/id), `min_hours_between_publishes=48`, enforced in the ledger BEFORE any work.
- **Locales: all 3 (en/fr/id) from day one.** Because fr/id correctness can't be machine-certified, the human merge IS the translation review gate — never auto-merge.
- **Stage A is active first:** generate daily, **email the draft + gate scores, publish NOTHING, open no PR**, for a 14-day dry-run to measure the gate's false-positive rate. Only after 14 clean days flip to Stage B (draft PRs + merge).

## SECTIONS
Generate ONLY into `intelligence` or `guides` (schema `Article` | `TechArticle`). NEVER `showcases` (they require a real owned `/work/<slug>.png` + real case results = fabrication risk). Prefer original POV/framework pieces on `/intelligence` (citation-worthy, no facts to fabricate) over yet another explainer.

## THE 6-GATE PRE-PUBLISH BAR (ALL must pass, else the piece stays a draft / is dropped)
- **B1 Audience relevance** — maps to a mid-market (€5–50M) CTO/COO/CEO buyer decision. Reject generic "what is an LLM" filler.
- **B2 Real demand signal** — a NAMED source URL + real query from COMPOSIO_SEARCH_TRENDS/_WEB (short `now 7-d` + long `today 12-m` windows). Never invent volumes. (NB: demand ≠ engagement; this gates topic interest, not that the page will engage.)
- **B3 Originality / dedup** — similarity (token-overlap/embedding) on slug + tier1Keywords + h1 + h2s vs the FULL published set INCLUDING prior `loopGenerated:true` pieces AND the anchor page; reject >0.6 and reject tier-1-keyword cannibalization.
- **B4 No-fabricated-data scan** — reject any `aggregateRating|review|ratingValue|reviewCount|ratingCount`, any numeric/stat/client-name not verbatim in lib/seo/site.ts, AND any unsourced qualitative claim ("most CTOs…"). Numeric regex is not enough — scan for unsourced assertions.
- **B5 Depth** — ≥5 sections × ≥2 paragraphs + ≥5 real FAQ. (Length ≠ quality; this is a floor, not a quality cert.)
- **B6 Locale completeness** — en/fr/id all present and human-grade. Presence ≠ correctness → the human merge reviews fr/id.

"Passed 6 gates" means structurally valid + safe, NEVER "is engaging." Engagement is unmeasurable pre-publish.

## PIPELINE (one run = at most ONE piece advanced)
- **P0 Resume/cap** — read `.content-loop/state.json` (shipped slugs, weekly counter, last-run, CONTENT_LOOP_ENABLED). Enforce the weekly cap + 48h spacing HERE. Cap reached → email "cap reached", stop.
- **P1 Trend scrape** — COMPOSIO_SEARCH_WEB (discover 8–15 angles, brand-anchored seeds like "build-vs-buy AI CTO", "fixed-scope 8-week AI build") + COMPOSIO_SEARCH_TRENDS (validate) + COMPOSIO_SEARCH_FETCH_URL_CONTENT (pull real source text for citations). No source → discard. (Discover slugs via COMPOSIO_SEARCH_TOOLS; run via COMPOSIO_MULTI_EXECUTE_TOOL.)
- **P2 Vet** — score candidates against B1–B6; keep at most ONE that clears all six. None → email "no publishable topic today", stop.
- **P3 Generate** — en/fr/id copy objects (lib/content/text/{en,fr,id}.ts) + a PageMeta in lib/content/pages.ts with `status:'draft'` + `loopGenerated:true` + `interlinkTo` (≥2 outbound to existing pages, ≥1 inbound phrase added — no orphans).
- **P4 Build-gate** — `npm run lint && npm test && npm run build` + the B4 scan on the diff. Any failure → abort, no PR.
- **P5 Ship (Stage-dependent)** — Stage A: email the full draft + gate scores + would-publish verdict, NO commit. Stage B: branch `content-loop/<slug>`, COMMIT_MULTIPLE_FILES (status stays `draft`), open PR, assert new bytes render on the Vercel PREVIEW URL, STOP for human merge. NEVER auto-merge.
- **P6 Index+validate (only after a human merge makes it live)** — confirm Vercel `deployment_status=success` on the merge SHA + cache-busted prod fetch of `/en/<section>/<slug>` = 200 with the new h1/JSON-LD bytes; then ONE GSC SUBMIT_SITEMAP (www only, never apex) + ONE INSPECT_URL baseline on the /en canonical. Day-0 "Crawled/Discovered – not indexed" is NORMAL — never report as failure or as "indexed". Only a later re-inspection verdict FLIP = an honest "indexed" claim.
- **P7 Report + email** darwin.prayoga13@gmail.com (Composio Gmail): topic, source URL, B1–B6 scores, draft/PR link, prod-verify (if live), GSC baseline. Correlation-only, lag-honest. Two sections: "submitted/validated baseline" vs "indexation confirmations" (only verdict flips).

## TAKEDOWN / KILL-SWITCH (built; use if anything looks wrong)
- **Per page:** flip that page's `status` to `'draft'` in lib/content/pages.ts → drops from sitemap + static build on next deploy.
- **Bulk:** set `CONTENT_LOOP_KILL=1` in Vercel env → `getPublishedPages()` drops EVERY `loopGenerated:true` page on next deploy. (Implemented in lib/content/pages.ts.)
- **Master:** `CONTENT_LOOP_ENABLED=false` in the ledger halts generation. Detection is on you (manual watch) — which is why publishing stays slow + gated.

## STAGE GRADUATION
A (draft-only/email, 14d) → B (draft PR + human merge, ≤2/wk) → C (mechanical auto-publish to dated /intelligence, ≤1/wk) ONLY after: ≥10 clean human-approved pieces AND domain age ≥90d AND GSC indexed≥submitted. Do not skip stages. Earn auto-publish; don't assume it.

## DISTRIBUTION (higher ROI than more pages)
Once a piece is live, repurpose to LinkedIn (connected) + Discord (connected) with per-channel UTMs, so attribution can prove channel ROI. One sharp POV/week across channels beats 5 unseen pages/week.
