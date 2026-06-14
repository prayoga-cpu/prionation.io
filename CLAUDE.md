# CLAUDE.md

This project keeps one canonical instruction file for all AI tools: `AGENTS.md`.
The import below pulls it into Claude Code's context (Claude Code reads
`CLAUDE.md`, not `AGENTS.md`). Add any Claude-specific notes under the heading.

@AGENTS.md

## Claude Code

- **Explore with graphify first.** Before reaching for `grep`/`Read`/`Glob` to
  understand this codebase, run `graphify query "<question>"` (or `graphify
  explain "<node>"` / `graphify path "<A>" "<B>"` / `graphify affected "<node>"`)
  against `graphify-out/graph.json` to orient. Drop to `grep`/`Read` only to edit
  or debug specific lines. The graph auto-rebuilds on commit (watcher hook).
