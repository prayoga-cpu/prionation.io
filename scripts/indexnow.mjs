#!/usr/bin/env node
// IndexNow submitter — pings IndexNow (Bing, Yandex, and others; Bing feeds
// ChatGPT/Copilot) so new/updated pages get re-crawled in minutes instead of
// weeks. Reads the live sitemap and submits every URL, or just the URLs you pass.
//
// Usage:
//   npm run indexnow                              # submit every URL in the sitemap
//   npm run indexnow -- https://www.prionation.io/en  https://www.prionation.io/en/pricing
//
// Requires the key file to be live at:
//   https://www.prionation.io/71bdc3f1d53ad47df0b1ebbe972f9e21.txt
// (committed at public/71bdc3f1d53ad47df0b1ebbe972f9e21.txt — deploy first.)

const HOST = "www.prionation.io";
const SITE_URL = `https://${HOST}`;
const KEY = "71bdc3f1d53ad47df0b1ebbe972f9e21";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "prionation-indexnow/1.0" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

// Walk the sitemap index → child sitemaps → page URLs.
async function collectFromSitemap() {
  const index = await fetchText(`${SITE_URL}/sitemap.xml`);
  const children = locs(index);
  const isIndex = children.some((u) => /\/sitemap\/\d+\.xml$/.test(u) || u.endsWith("sitemap.xml"));
  if (!isIndex) return [...new Set(children)];
  const pages = [];
  for (const child of children) {
    try {
      pages.push(...locs(await fetchText(child)));
    } catch (e) {
      console.warn(`  ! skipped ${child}: ${e.message}`);
    }
  }
  return [...new Set(pages)];
}

async function main() {
  const argUrls = process.argv.slice(2).filter((a) => a.startsWith("http"));
  const urlList = argUrls.length ? argUrls : await collectFromSitemap();

  if (!urlList.length) {
    console.error("✗ No URLs to submit.");
    process.exit(1);
  }

  console.log(`Submitting ${urlList.length} URL(s) to IndexNow…`);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  // IndexNow returns 200 (accepted) or 202 (accepted, pending). 422 = key/URL
  // mismatch (key file not live yet?). 403 = key not found.
  const body = await res.text();
  if (res.ok || res.status === 202) {
    console.log(`✓ IndexNow accepted (HTTP ${res.status}). ${urlList.length} URL(s) queued.`);
  } else {
    console.error(`✗ IndexNow rejected (HTTP ${res.status}): ${body.slice(0, 300)}`);
    console.error(`  Confirm the key file is live: ${KEY_LOCATION}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`\n✗ ${err.message}\n`);
  process.exit(1);
});
