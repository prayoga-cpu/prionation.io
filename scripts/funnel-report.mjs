// GTM Phase B — Go-To-Market funnel report.
// Reads the Notion conversion DBs (PN_Intake + Sales Pipeline) via the project's
// own NOTION_API_KEY (plan-independent — no Notion Business/AI requirement, unlike
// the MCP query tool) and prints a funnel report to stdout. The weekly scheduled
// task runs this and emails the output. Top-of-funnel events (pricing_cta_click,
// intake_step2, intake_submit) live in Vercel Analytics → Events (no public API),
// so this report covers the CONVERSION half; pair it with the Vercel dashboard.
//
// Run: node --env-file=.env.local scripts/funnel-report.mjs
// No fabricated data — every number below is read live from Notion.

const TOKEN = process.env.NOTION_API_KEY;
const DB_INTAKE = process.env.NOTION_DB_INTAKE;
const DB_PIPELINE = process.env.NOTION_DB_SALES_PIPELINE;

// Data-source IDs (Notion 2025+ API) as a fallback if the token is new-API-only.
const DS_INTAKE = "de897468-19a8-44a2-8121-36afeebd73a4";
const DS_PIPELINE = "e5ac4672-836d-4bd0-bb85-5ed342547d7b";

if (!TOKEN || !DB_INTAKE || !DB_PIPELINE) {
  console.error("Missing NOTION_API_KEY / NOTION_DB_INTAKE / NOTION_DB_SALES_PIPELINE in env.");
  process.exit(1);
}

async function queryAll(dbId, dsId) {
  // Try the classic database endpoint first (2022-06-28), then fall back to the
  // data-source endpoint (2025-09-03) for new-API integrations.
  const attempts = [
    { url: `https://api.notion.com/v1/databases/${dbId}/query`, version: "2022-06-28" },
    { url: `https://api.notion.com/v1/data_sources/${dsId}/query`, version: "2025-09-03" },
  ];
  let lastErr = "";
  for (const a of attempts) {
    const rows = [];
    let cursor;
    let ok = true;
    do {
      const res = await fetch(a.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Notion-Version": a.version,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cursor ? { start_cursor: cursor, page_size: 100 } : { page_size: 100 }),
      });
      if (!res.ok) {
        lastErr = `${a.url.split("/v1/")[1]} → ${res.status} ${(await res.text()).slice(0, 160)}`;
        ok = false;
        break;
      }
      const json = await res.json();
      rows.push(...(json.results ?? []));
      cursor = json.has_more ? json.next_cursor : undefined;
    } while (cursor);
    if (ok) return rows;
  }
  throw new Error(`Notion query failed: ${lastErr}`);
}

const sel = (p) => p?.select?.name ?? null;
const num = (p) => (typeof p?.number === "number" ? p.number : 0);
const txt = (p) => (p?.rich_text ?? []).map((r) => r.plain_text).join("");

function tally(rows, fn) {
  const m = {};
  for (const r of rows) {
    const k = fn(r) ?? "—";
    m[k] = (m[k] ?? 0) + 1;
  }
  return m;
}
const fmt = (m) =>
  Object.entries(m)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${k}=${v}`)
    .join(", ") || "none";
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

const intake = await queryAll(DB_INTAKE, DS_INTAKE);
const pipeline = await queryAll(DB_PIPELINE, DS_PIPELINE);

const byStatus = tally(intake, (r) => sel(r.properties["Sync Status"]));
const synced = byStatus["Synced"] ?? 0;
const disq = byStatus["Disqualified"] ?? 0;

// Attribution: machine attribution is appended as "[auto] channel=…" in Referral Source.
const withAttr = intake.filter((r) => txt(r.properties["Referral Source"]).includes("[auto]"));
const channelOf = (r) => {
  const m = txt(r.properties["Referral Source"]).match(/channel=([^;]+)/);
  return m ? m[1].trim() : "unattributed";
};
const byChannel = tally(intake, channelOf);

const byStage = tally(pipeline, (r) => sel(r.properties["Stage"]));
const pipelineValue = pipeline.reduce((s, r) => s + num(r.properties["Est Value EUR"]), 0);

const today = new Date().toISOString().slice(0, 10);
const lines = [
  `PRIONATION — GTM GO-TO-MARKET FUNNEL REPORT — ${today}`,
  ``,
  `TOP OF FUNNEL (Vercel Analytics → Events; no public API — check dashboard):`,
  `  events live since 2026-06-24: pricing_cta_click → intake_step2 → intake_submit → intake_qualified/disqualified`,
  ``,
  `LEADS — PN_Intake: ${intake.length} total`,
  `  by sync status: ${fmt(byStatus)}`,
  `  qualified→pipeline (Synced): ${synced} (${pct(synced, intake.length)}%) · disqualified: ${disq} (${pct(disq, intake.length)}%)`,
  ``,
  `ATTRIBUTION COVERAGE (machine attribution on leads):`,
  `  with [auto] attribution: ${withAttr.length}/${intake.length} (${pct(withAttr.length, intake.length)}%)`,
  `  by channel: ${fmt(byChannel)}`,
  ``,
  `SALES PIPELINE: ${pipeline.length} records · est. value €${pipelineValue.toLocaleString("en-US")}`,
  `  by stage: ${fmt(byStage)}`,
  ``,
  `NOTE: attribution coverage only climbs for intakes submitted AFTER 2026-06-24 (Phase A go-live).`,
  `Pre-existing leads show as "unattributed". Correlation only — do not infer causality from low volume.`,
];
const report = lines.join("\n");
console.log(report);
