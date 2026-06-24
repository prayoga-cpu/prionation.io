---
description: Draft-first distribution repurposer for prionation.io. Turns a published page into LinkedIn + Discord post drafts (UTM-tagged), emails them for approval, and posts NOTHING until you flip to Stage B. Separate track from seo-loop / gtm-funnel / content-loop.
argument-hint: "[optional: page slug | 'post' to enable Stage B]"
---

# DISTRIBUTION REPURPOSER — prionation.io

GOAL: get the existing content in front of mid-market AI buyers where they actually are (LinkedIn first, Discord second) — distribution is higher ROI than more pages at this stage. Draft-first: generate the post, email it, post nothing until approved.

## GROUND TRUTH
- Brand: production AI product engineering for EU/US mid-market (€5–50M). Audience: CTO/COO/CEO. Voice: senior engineering judgment, plain, specific, no hype.
- Channels connected via Composio: **linkedin** (CREATE post + read engagement) and **discord/discordbot** (post to the owned community; the repo also has `DISCORD_WEBHOOK_URL`). Gmail connected (sends from prayoga-connected account).
- Content lives in lib/content/text/{en,fr,id}.ts + lib/content/pages.ts (15 published pages across methodology/showcases/frameworks/guides/intelligence) + the anchor pillar + glossary. GA4 + attribution capture are live, so UTM-tagged links are measurable (channel rides into GA4 + the intake form's Notion attribution).
- HARD RULE — NO FABRICATED DATA: posts must NOT invent stats, client names, or results. Repurpose the page's REAL argument/POV. When unsure, omit. Favor opinion/insight framing (asserts no external facts).

## STAGE (current = A)
- **Stage A (now, default):** generate drafts + email them, **post nothing, call no posting API**. Lets you build a voice/quality track record first.
- **Stage B (only when you say "post"):** actually publish via Composio (LinkedIn CREATE post; Discord message/webhook) — one channel at a time, still ≤1 piece per run, with the UTM links. Never auto-enable.

## PIPELINE (one run = ONE page repurposed)
- **P0 Pick a page** — rotate through published pages (track posted slugs in `.distribute/state.json`); prefer /intelligence + /guides + showcases with a strong POV; skip pages posted in the last 30 days. Use the /en canonical.
- **P1 Build UTM links** — `https://www.prionation.io/en/<section>/<slug>?utm_source=linkedin&utm_medium=social&utm_campaign=repurpose` (and `utm_source=discord` for the Discord variant). These feed GA4 channel + intake attribution.
- **P2 Draft** —
  - **LinkedIn:** a native-first post (hook line → 2–4 short insight paragraphs from the page's real argument → 1 takeaway → soft CTA). Put the link in the FIRST COMMENT, not the body (LinkedIn down-ranks external links). Offer TWO voice variants: founder-first-person and company-voice. ≤1300 chars.
  - **Discord:** a shorter, community-tone message + the link, for the owned /discord channel.
  - No fabricated metrics; quote only what the page actually says.
- **P3 Email** the drafts to darwin.prayoga13@gmail.com via Composio Gmail (subject "Distribution draft — <ISO date> — <slug>"): both LinkedIn variants + the Discord draft + both UTM links + the source page URL. Print the same to the session. Post NOTHING in Stage A.
- **P4 (Stage B only)** — after explicit "post" approval: LinkedIn CREATE post (chosen variant) + add the link as the first comment; Discord post. Record in the ledger. Then (optional) read engagement after 48h via LinkedIn GET_POST_CONTENT for the EXP-4 founder-vs-company-voice test.

## CADENCE
2×/week draft emails (Tue/Thu) is plenty to start — pick the best to actually post. One sharp post/week beats daily noise for this audience/ACV.

## MEASUREMENT
Every link is UTM-tagged → GA4 shows sessions/events by `utm_source`, and any resulting intake carries the channel into Notion (Phase A attribution). The Monday gtm-funnel-weekly report already reads GA4, so distribution ROI shows up there.
