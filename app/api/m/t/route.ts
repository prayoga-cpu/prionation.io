import { recordHit, shouldIgnore, sourceUrl } from "@/lib/analytics/counter";

// Tap counter for the contact buttons on /start. WhatsApp links send it through
// the browser's <a ping> (works before the page's JavaScript has loaded and
// leaves the wa.me link itself untouched, so WhatsApp's app link still opens
// the app); buttons handled in JavaScript (phone, call-back) use sendBeacon.
// Anonymous daily totals only — see lib/analytics/counter.ts.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

export async function POST(req: Request) {
  if (!shouldIgnore(req)) {
    const url = new URL(req.url);
    try {
      await recordHit({
        metric: "tap",
        locale: url.searchParams.get("l"),
        channel: url.searchParams.get("ch"),
        placement: url.searchParams.get("p"),
        source: sourceUrl(req),
        qa: url.searchParams.get("qa") === "1",
      });
    } catch (e) {
      console.error("[m/t] count failed", e);
    }
  }
  return new Response(null, { status: 204, headers: HEADERS });
}
