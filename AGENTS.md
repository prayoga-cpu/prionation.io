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

## Changelog

Public changelog: `lib/content/changelog.ts` (data) → `app/[locale]/changelog/page.tsx` (rendered page, linked from the footer's version dropdown as "Full changelog"). English-only by design, same convention as `NotifyModal`.

Rules:
- After shipping a meaningful, user-visible or architecturally significant change (a feature, a real fix, a notable refactor — not every commit, not typo/lint fixes), add one entry to the **top** of `V3_ENTRIES` in `lib/content/changelog.ts`: `{ date: "YYYY-MM-DD" (today's real date), title, items: [...] }`. Keep entries factual and grounded in what actually shipped — no invented metrics or claims, matching the site's [no-fabricated-data rule].
- This project's version is **v3** (`package.json`'s `"version"` field, currently `3.1.0`) and stays v3 for the life of this codebase. Only move to v4 if this repo is retired and a genuinely new project starts in its place — a redesign, a feature, or a refactor within this codebase is still v3. Bumping `package.json`'s patch/minor version alongside a changelog entry is fine; do not touch the major version.
- `ARCHIVED_VERSIONS` (v1, v2) are separate, already-deployed sites outside this repo (`v1.prionation.io`, `v2.prionation.io`) — do not add entries there or invent their history; leave that list alone.
- Verify a changelog edit the same way as any other content change: `npm run lint && npm test && npm run build`, then spot-check `/en/changelog` renders correctly before committing.
