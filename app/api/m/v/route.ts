import { recordHit, shouldIgnore, sourceUrl } from "@/lib/analytics/counter";

// Page-view counter for /start: requested by a 1×1 <img> in the page markup, so
// it works without JavaScript and before any consent choice. Anonymous daily
// totals only — see lib/analytics/counter.ts for the privacy design.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 43-byte transparent GIF.
const GIF = Uint8Array.from(
  atob("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
  (c) => c.charCodeAt(0),
);

const HEADERS = {
  "Content-Type": "image/gif",
  "Cache-Control": "no-store, max-age=0",
  "X-Robots-Tag": "noindex",
  "Referrer-Policy": "no-referrer",
};

export async function GET(req: Request) {
  if (!shouldIgnore(req)) {
    const url = new URL(req.url);
    try {
      await recordHit({
        metric: "view",
        locale: url.searchParams.get("l"),
        source: sourceUrl(req),
        qa: url.searchParams.get("qa") === "1",
      });
    } catch (e) {
      console.error("[m/v] count failed", e);
    }
  }
  return new Response(GIF, { status: 200, headers: HEADERS });
}
