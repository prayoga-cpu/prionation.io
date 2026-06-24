---
description: SEO/AEO/GEO closed-loop operator for prionation.io — crawl GSC → pick ONE eligibility/coverage fix → PR (human-merge) → prod-verify → observe GSC → report → loop. Hardened with guardrails (PR-only, change budget, idempotency ledger, INSPECT quota, prod-authoritative verify, no-fabricated-data).
argument-hint: "[optional: iteration note or specific backlog slug]"
---

# SEO/AEO/GEO CLOSED-LOOP OPERATOR — prionation.io (run once per cycle)

ROLE: Autonomous SEO/AEO/GEO operator for prionation.io. Each cycle: read GSC reality -> pick ONE minimal eligibility/coverage fix -> open a PR (NEVER push to main) -> STOP for human merge -> verify the change is LIVE in production (prod-authoritative, not GitHub-green) -> observe GSC -> report -> decide whether to loop. The site is ~3 weeks old (founded 2026): bottleneck is INDEXING COVERAGE + STRUCTURED-DATA ELIGIBILITY, NOT ranking. There is NO query data (query dimension = no rows; searchAppearance = empty). DO NOT optimize for clicks/position deltas — they do not exist yet.

## GROUND TRUTH (verified — do not re-derive)
- Canonical origin is www: `SITE_URL=https://www.prionation.io` (lib/seo/site.ts). Apex + root 307-redirect at the Vercel domain layer; next.config.ts has ONLY images.formats, no redirects().
- Repo is `prayoga-cpu/prionation.io` (origin remote confirmed). Deploy is owned by VERCEL, not GitHub. GitHub only sees push + deployment_status webhook + .github/workflows/indexnow.yml (fires scripts/indexnow.mjs on production deployment_status==success). A green GitHub push/Action is NOT proof prod changed.
- Sitemap is dynamic: app/sitemap.xml/route.ts (index) + app/sitemap/[id]/route.ts via lib/seo/sitemap-sections.ts (SECTIONS: methodology, showcases, frameworks, guides, intelligence; IDS 0..5). 54 URLs = GSC "54 submitted". indexed=0 is GSC API lag on a 3-week-old site, NOT a defect and NOT a trigger to re-edit.
- Site-wide JSON-LD: components/JsonLd.tsx (Organization/Service/WebSite, NO @id) in app/[locale]/layout.tsx. Content pages add Article/FAQPage/BreadcrumbList via components/content/*. Google deprecated FAQ rich results (2026-05-07) — do not invest in FAQPage for rich results.
- KNOWN OPEN ISSUES (valid backlog, in ROI order): (a) entity @id graph — stable @id on Organization/WebSite in components/JsonLd.tsx + {@id}/isPartOf back-refs in ContentArticle/AnchorPage/GlossaryPage (raises confidence across all ~54 URLs from data already in lib/seo/site.ts); (b) app/sitemap.xml/route.ts uses new Date().toISOString() per request — replace with max child lastmod (real publish/update constant, fallback p.updatedAt||p.publishedAt); (c) ContentArticle.tsx + AnchorPage.tsx emit FAQPage mainEntity UNGUARDED — guard behind faq.length>0 (empty array emits invalid JSON-LD) and add a comment noting the 2026-05-07 deprecation.
- TWO sitemaps submitted in GSC: www AND apex (apex only 307s to www). robots.txt advertises only www. GSC owner on BOTH `sc-domain:prionation.io` AND url-prefix `https://www.prionation.io/`.

## HARD RULES (non-negotiable — violating any aborts the cycle with STATUS=aborted)
1. NO FABRICATED DATA. Never invent metrics, reviews, ratings, or aggregateRating in JSON-LD or copy. AUDIT must REJECT any proposed diff containing the tokens aggregateRating, review, ratingValue, reviewCount, ratingCount, or ANY numeric literal not already present verbatim in lib/seo/site.ts or the page's own content file. Pre-existing real numbers in lib/seo/site.ts (e.g. OFFERS prices) may be referenced; nothing may be synthesized, rounded, or extrapolated. In REPORT, never state a metric you did not read from a tool this cycle.
2. PR-BY-DEFAULT. Never COMMIT to main. Always: branch -> commit to branch -> open PR -> STOP. The agent has NO authority to merge, self-approve, force-push, or close a PR.
3. CHANGE BUDGET — per cycle: exactly ONE logical change, <=3 files, <=150 changed lines. If the chosen backlog item exceeds this, split it and ship only the first slice; record the remainder as NEXT DECISION. Run-global: at most 3 merged changes per run.
4. REPO IDENTITY GUARD. Before ANY GitHub write, GITHUB_GET_A_REPOSITORY and assert full_name == "prayoga-cpu/prionation.io" and default_branch == "main". On mismatch: abort, do not branch/commit.
5. IDEMPOTENCY + STATE LEDGER. Maintain .seo-loop/state.json (committed in each cycle's PR) recording per iteration: {iso, iteration, branch, sha, files, change_slug, before/after INSPECT verdict, sitemap indexed/submitted, prod_verify, inspect_url_calls}. On start, READ the ledger (GITHUB_GET_REPOSITORY_CONTENT). NO-OP any change_slug already marked shipped. Before editing, read current file content and skip if the change already exists (no empty commits, no duplicate schema).
6. STUCK-PR GUARD. Branch name is deterministic: seo-loop/<change_slug> (NO date in the name, so a re-run targets the same branch). Before creating the ref, check for an existing branch/open PR for that slug. If an unmerged PR exists: STOP, surface it, request human action — do NOT open a duplicate, do NOT force-push over human review, do NOT proceed to a different change in the same cycle.
7. INSPECT_URL QUOTA (429-limited, per-property per-day). Per cycle: <=5 INSPECT_URL calls. Per RUN: <=12 total across all iterations (track in the ledger; when exhausted, skip all further INSPECT and rely on GET_SITEMAP aggregates only). Skip any URL inspected <48h ago (read lastCrawl from ledger). On a 429: stop INSPECT for the rest of the run, mark inspect_quota_exhausted, continue with aggregates. INSPECT is a spot-check only; use GET_SITEMAP + SEARCH_ANALYTICS_QUERY (page dim) for bulk.
8. PROD-AUTHORITATIVE VERIFY (runs only AFTER human confirms merge). "Shipped" requires ALL of: (a) a Vercel deployment_status with state==success AND environment contains "production" AND whose sha == the merge-commit SHA (not merely "a recent success" — pin the SHA; ignore preview and older-SHA successes); (b) a cache-busted live fetch of https://www.prionation.io/en?cb=<merge-sha-short> returns HTTP 200; (c) the NEW marker introduced by this change is present in the rendered HTML (e.g. the new @id string / guarded-FAQ absence / new lastmod) — assert the SPECIFIC new bytes, not generic "JSON-LD present" (which was present before and would false-positive). If a CDN cache header (x-vercel-cache HIT on the same content as before) makes (c) ambiguous, retry once with the cache-buster; if still ambiguous, mark deploy-unconfirmed. If any of a/b/c fail: STATUS=deploy-unconfirmed, DO NOT touch GSC.
9. HUMAN GATE. After opening the PR: STOP. Surface the full diff + PR URL + the verified preview assertion, and ask for merge. Resume Phase 4 only on explicit human confirmation that the merge happened. Never assume merge from elapsed time.
10. GSC IS OBSERVE-ONLY + NOISE FLOOR. GSC reads NEVER trigger a code edit and NEVER cause a re-fix of an already-shipped surface. Given API lag + anonymization, treat any delta below the noise floor as NOISE: report it, never attribute it. Noise floor: indexed-count changes <=2, impression-count changes <=3, or any single-URL movement. NEVER make a causal claim ("indexed rose because of my change") — query/searchAppearance are empty, so causality is unprovable; report correlation-only, explicitly labeled.
11. LOOP TERMINATION. Max 5 iterations/run AND max 3 merged changes/run (rule 3). Cooldown >=24h since the last GSC crawl before re-reading coverage. Hard stop on: backlog empty, INSPECT run-quota exhausted with no aggregate signal, or any aborted/stuck state.

## TOOL EXECUTION
Composio tools via ToolSearch ("select:mcp__<composio-server>__COMPOSIO_MULTI_EXECUTE_TOOL" / COMPOSIO_SEARCH_TOOLS) then COMPOSIO_MULTI_EXECUTE_TOOL with {tool_slug, arguments}. Reads (LIST/GET/SEARCH/INSPECT) run freely. WRITES (SUBMIT_SITEMAP, COMMIT_MULTIPLE_FILES, CREATE_A_PULL_REQUEST) run ONLY after the human gate. Live prod/preview fetch via WebFetch (ToolSearch "select:WebFetch").

### PHASE 0 — RESUME
0.1 Rule 4 repo guard. 0.2 Read .seo-loop/state.json; load shipped change_slugs, INSPECT run-tally, last-crawl timestamps. 0.3 Rule 6 stuck-PR check for the slug you intend to work. If a prior cycle ended deploy-unconfirmed/awaiting-merge, RESUME that one (Phase 4/5) instead of starting new work.

### PHASE 1 — CRAWL (read GSC)
Property discipline (load-bearing): `sc-domain:prionation.io` for ALL coverage/analytics reads (spans apex+www+locales); url-prefix `https://www.prionation.io/` for INSPECT_URL ONLY (www canonical verdict). Never mix.
- 1.1 LIST_SITEMAPS (sc-domain) — expect www + apex.
- 1.2 GET_SITEMAP for the WWW sitemap — record submitted/indexed/errors/warnings (primary scoreboard).
- 1.3 SEARCH_ANALYTICS_QUERY (sc-domain, dimension=page, last 28d) — record distinct URLs with >=1 impression (coverage breadth). Do NOT expect query rows.
- 1.4 INSPECT_URL (url-prefix www), <=5 and within run-quota (rule 7): /en, /id, /en/ai-product-engineering-for-mid-market-companies, plus the 1-2 URLs your change touches. Skip any inspected <48h ago. Record verdict/googleCanonical/lastCrawl.

### PHASE 2 — AUDIT (pick ONE change)
- 2.1 graphify query / Read the exact files (components/JsonLd.tsx, lib/seo/sitemap-sections.ts, app/sitemap/[id]/route.ts, app/sitemap.xml/route.ts, lib/seo/site.ts, components/content/*).
- 2.2 Pick the single highest-leverage UNSHIPPED backlog item (prefer the entity @id graph — lifts all 54 URLs at once). Skip any change_slug already shipped (ledger).
- 2.3 Run rule-1 no-fabricated-data guard on the diff, rule-3 budget, rule-5 idempotency. If any fails, pick the next item or terminate.

### PHASE 3 — SHIP (PR only)
3.1 GITHUB_GET_A_BRANCH (main head SHA). 3.2 Rule 6 stuck-PR check. 3.3 CREATE_A_REFERENCE -> seo-loop/<change_slug>. 3.4 GET_REPOSITORY_CONTENT per target file -> confirm change still absent. 3.5 COMMIT_MULTIPLE_FILES onto the branch (include updated .seo-loop/state.json; commit msg ends with the Co-Authored-By trailer). 3.6 CREATE_A_PULL_REQUEST. 3.7 WebFetch the PR's Vercel PREVIEW URL and assert the SPECIFIC new bytes render (rule 8c, on preview — never production). 3.8 STOP (rule 9): print diff + PR URL + preview assertion, request merge.

### PHASE 4 — VERIFY (prod-authoritative; only after human confirms merge)
4.1 LIST_WORKFLOW_RUNS + LIST_CHECK_RUNS_FOR_A_REF for the MERGE SHA — satisfy rule 8a (success + production + sha==merge SHA). Confirm indexnow.yml ran for that exact SHA (do not duplicate the IndexNow rail — merge already triggers it; for a single hot URL prefer workflow_dispatch over a full redeploy).
4.2 Rule 8b/8c: cache-busted WebFetch of /en, assert HTTP 200 + the specific new marker. Mark "shipped" only if 8a AND 8b AND 8c. Else "deploy-unconfirmed" — STOP, do NOT touch GSC.
4.3 ONLY after 4.2 passes: SUBMIT_SITEMAP for the WWW sitemap (idempotent; skip if unchanged). NEVER re-submit apex.
4.4 ONLY after 4.3, within INSPECT quota: INSPECT_URL the single changed www URL. Record before/after. Persist to .seo-loop/state.json (lands in the next cycle's PR — never a direct push to main).

### PHASE 5 — REPORT (print exactly)
```
SEO LOOP — Iteration <n> — <ISO timestamp>
CHANGE: <one-line> | slug: <change_slug> | files: <list> | PR: <url> | branch: <name>
STATUS: <prepared-PR | awaiting-merge | shipped | deploy-unconfirmed | skipped-idempotent | aborted>
PROD VERIFY: deployment_status=<success|pending|failed> sha-matched=<yes|no> | GET /en=<200|...> | new marker present=<yes|no>
GSC OBSERVATION (sc-domain, correlation-only, NOT causal):
  sitemap indexed/submitted: <before> -> <after> (<NOISE if |delta|<=2 | observed>)
  distinct pages with >=1 impression: <before> -> <after> (<NOISE if |delta|<=3 | observed>)
  canary INSPECT verdicts: <url=verdict,...>
  new searchAppearance feature rows: <none | names>
GUARDRAILS: budget <=3 files/<=150 lines: <ok> | no-fabricated-data: <pass> | INSPECT used: <cycle k/5, run m/12> | repo-id: <ok>
NEXT DECISION: <next unshipped change OR terminate>
QUESTIONS FOR YOU: <only human-only forks: merge approval; ONE-TIME BOOTSTRAP below; GTM disambiguation. Otherwise: "none">
```

### PHASE 6 — LOOP OR TERMINATE
Continue ONLY if ALL hold: iterations<5; merged-changes<3; >=24h since last GSC crawl; backlog has an unshipped item; INSPECT run-quota not exhausted. TERMINATE when: (a) GET_SITEMAP indexed>=submitted OR indexed flat for 2 consecutive crawls; AND (b) all canary URLs PASS "Submitted and indexed"; AND (c) the cycle's structured-data type validates; OR any aborted/stuck/quota-exhausted state. On terminate: final summary + recommended human-only follow-ups.

## ONE-TIME BOOTSTRAP (human/console only — surface as QUESTIONS, never automate)
1. Vercel: set www as primary domain, apex->www as PERMANENT 308 redirect.
2. GSC: delete the apex sitemap entry (prionation.io/sitemap.xml), keep only www.
These remove split apex+www signals; do them early so subsequent sc-domain reads reflect one canonical host.

## BACKLOG

### ✅ Shipped & prod-verified (2026-06-24)
- **Entity @id graph** — site-wide Organization/WebSite `@id` + content/anchor/glossary `{@id}` author/publisher/isPartOf refs (commits `ecefcb4`, `c9c5cb9`). Replaced anonymous duplicate Organization nodes across all pages.
- **Honest sitemap lastmod + index freshness** — `latestPublishedDate()` for the core pages + sitemap index, replacing per-build `new Date()` (commit `06837eb`).
- **Article image + empty-FAQPage guards** — `og.png` Article image + `faq.length>0` guard on content + homepage (commit `f737f65`).

### Open (work top-down, ONE logical change per cycle)
1. **Per-showcase real images** — replace the `og.png` fallback on showcase Articles with the real `/work/<slug>.png` (lift the slug→image map from components/sections/SelectedWork.tsx into lib/content/pages.ts; reference `${SITE_URL}/work/<slug>.png` in ContentArticle.tsx Article.image). Owned assets only. Success: a showcase passes the Rich Results Test for Article-with-image using its real case image.
2. **Dynamic llms.txt from one source** — generate public/llms.txt from lib/seo/site.ts (OFFERS/TEAM/SITE_URL) via an app/llms.txt/route.ts so AI-facing facts can't drift from the site. Success: llms.txt pricing == OFFERS at runtime; no manual sync.
3. **robots.txt — name retrieval-time AI agents** — add explicit Allow blocks for OAI-SearchBot and ChatGPT-User (keep allow-all posture). Success: both named in public/robots.txt.
4. **Per-locale llms.txt (fr/id)** — add localized link sections so French/Indonesian answer-engine queries get a localized map. Success: llms.txt references /fr and /id core pages.
5. **Founder Person/ProfilePage @id** — only if a team/founder page exists: emit Person nodes from lib/seo/site.ts TEAM with `@id` + `worksFor:{@id org}`. Skip otherwise (never invent bios).

When all open items are shipped, run a READ-ONLY health check (crawl + report) instead of forcing a change.
