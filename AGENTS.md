# AGENTS.md

Shared instructions for every AI coding agent working in this repository
(Claude Code, Codex, Cursor, Aider, and others). Claude Code loads this file via
an `@AGENTS.md` import in `CLAUDE.md`; other tools read `AGENTS.md` directly.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Changelog & versioning

Public changelog: `lib/content/changelog.ts` (data, incl. `CURRENT_VERSION`) → `app/[locale]/changelog/page.tsx` (rendered page, linked from the footer's version dropdown as "Full changelog"). English-only by design, same convention as `NotifyModal`.

`CURRENT_VERSION` in `lib/content/changelog.ts` is the **single source of truth** for the version number — `package.json`, the footer pill (`SiteFooter.tsx`), the internal-notification email footer (`lib/notify/templates.ts`), and `README.md`'s H1 all must display the same value. Never hardcode a version string in a new place; import `CURRENT_VERSION` (or, for non-JS files like `README.md`, update it by hand alongside every other reference) so it can't drift again the way `package.json` silently sat on `3.1.0` for two months of real shipped work before this was caught.

This project's major version is **3** (`v3`) and stays v3 for the life of this codebase — a redesign, a big feature, or a refactor is still v3. Only move to v4 if this repo is retired and a genuinely new project starts in its place.

After shipping a meaningful change, in the same commit (or the next one):
1. Decide the bump using real semver discipline, judged by user/product impact, not commit count:
   - **minor** — a new page, a new user-facing feature, or a new capability (e.g. a new route, a new integration, a new automation surface).
   - **patch** — a fix, a performance/accessibility/SEO tweak, tooling, refactors, or copy changes that don't add new capability.
   - Never bump major from a normal change (see above).
2. Compute the new version from `CURRENT_VERSION` and update it everywhere listed above (grep for the old version string across the repo — `package.json`, `package-lock.json` via `npm install --package-lock-only`, `README.md`, `SiteFooter.tsx`, `lib/notify/templates.ts` — to catch every reference; treat any hit as something to fix, not skip).
3. Add one entry to the **top** of `V3_ENTRIES` in `lib/content/changelog.ts`: `{ version, bump, date: "YYYY-MM-DD" (today's real date), title, items: [...] }`. Keep entries factual and grounded in what actually shipped — no invented metrics or claims, matching the site's [no-fabricated-data rule].
4. `ARCHIVED_VERSIONS` (v1, v2) are separate, already-deployed sites outside this repo (`v1.prionation.io`, `v2.prionation.io`) — do not add entries there or invent their history; leave that list alone.
5. Verify the same way as any other change: `npm run lint && npm test && npm run build`, then spot-check `/en/changelog` renders correctly before committing.
