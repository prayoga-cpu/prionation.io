#!/usr/bin/env node
// PageSpeed Insights wrapper — pulls Lighthouse scores + Core Web Vitals for the
// live site so we can act on real numbers instead of guessing.
//
// Usage:
//   PSI_API_KEY=xxx node scripts/pagespeed.mjs [url] [strategy]
//   PSI_API_KEY=xxx npm run pagespeed                       # defaults below, both strategies
//   PSI_API_KEY=xxx npm run pagespeed -- https://www.prionation.io/en mobile
//
// Get a free key (no billing required) at:
//   https://developers.google.com/speed/docs/insights/v5/get-started
// The keyless/anonymous quota is now 0, so a key is mandatory.

const API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const DEFAULT_URL = "https://www.prionation.io/en";

// Core Web Vitals "good" thresholds (mobile, field+lab guidance).
const THRESHOLDS = {
  "first-contentful-paint": { max: 1800, label: "FCP", unit: "ms" },
  "largest-contentful-paint": { max: 2500, label: "LCP", unit: "ms" },
  "total-blocking-time": { max: 200, label: "TBT", unit: "ms" },
  "cumulative-layout-shift": { max: 0.1, label: "CLS", unit: "" },
  "speed-index": { max: 3400, label: "Speed Index", unit: "ms" },
  "server-response-time": { max: 500, label: "TTFB", unit: "ms" },
};

const url = process.argv[2] || DEFAULT_URL;
const strategyArg = process.argv[3];
const strategies = strategyArg ? [strategyArg] : ["mobile", "desktop"];

// Pull PSI_API_KEY from .env.local (Next.js loads it for the app; a plain node
// script does not). An inline `PSI_API_KEY=… npm run pagespeed` still wins.
if (!process.env.PSI_API_KEY) {
  try {
    process.loadEnvFile(new URL("../.env.local", import.meta.url));
  } catch {
    // no .env.local — fall through to the missing-key error below
  }
}

const key = process.env.PSI_API_KEY;
if (!key) {
  console.error(
    "✗ Missing PSI_API_KEY env var.\n" +
      "  Get a free key: https://developers.google.com/speed/docs/insights/v5/get-started\n" +
      "  Then: PSI_API_KEY=xxx npm run pagespeed",
  );
  process.exit(1);
}

const pad = (s, n) => String(s).padEnd(n);
const fmt = (v, unit) => (unit === "ms" ? `${Math.round(v)} ms` : v.toFixed(3));

async function run(strategy) {
  const qs = new URLSearchParams({ url, strategy, key });
  for (const c of ["performance", "accessibility", "best-practices", "seo"]) {
    qs.append("category", c);
  }
  const res = await fetch(`${API}?${qs}`);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PSI ${res.status} (${strategy}): ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  const lr = data.lighthouseResult;
  const cat = lr.categories;
  const audits = lr.audits;

  console.log(`\n━━━ ${strategy.toUpperCase()} — ${lr.finalUrl}`);
  console.log(`    fetched ${lr.fetchTime}\n`);

  // Lighthouse category scores (0–100).
  const scoreLine = (name, key) =>
    `    ${pad(name, 16)} ${Math.round((cat[key]?.score ?? 0) * 100)}`;
  console.log("  Lighthouse scores (/100):");
  console.log(scoreLine("Performance", "performance"));
  console.log(scoreLine("Accessibility", "accessibility"));
  console.log(scoreLine("Best Practices", "best-practices"));
  console.log(scoreLine("SEO", "seo"));

  // Core Web Vitals vs thresholds.
  console.log("\n  Core Web Vitals:");
  for (const [id, t] of Object.entries(THRESHOLDS)) {
    const a = audits[id];
    if (!a) continue;
    const value = a.numericValue ?? 0;
    const pass = value <= t.max ? "✅" : "🔴";
    const target = t.unit === "ms" ? `≤ ${t.max} ms` : `≤ ${t.max}`;
    console.log(
      `    ${pass} ${pad(t.label, 13)} ${pad(a.displayValue, 10)} (target ${target})`,
    );
  }

  // Actionable opportunities (anything scored < 0.9 with savings).
  const opps = Object.entries(audits)
    .filter(
      ([, a]) =>
        a.details?.type === "opportunity" &&
        a.score != null &&
        a.score < 0.9 &&
        a.displayValue,
    )
    .sort(
      (a, b) => (b[1].numericValue ?? 0) - (a[1].numericValue ?? 0),
    );
  if (opps.length) {
    console.log("\n  Top opportunities:");
    for (const [, a] of opps.slice(0, 8)) {
      console.log(`    • ${pad(a.title, 48)} ${a.displayValue}`);
    }
  }
  return { strategy, cat, audits };
}

try {
  for (const s of strategies) await run(s);
  console.log("");
} catch (err) {
  console.error(`\n✗ ${err.message}\n`);
  process.exit(1);
}
