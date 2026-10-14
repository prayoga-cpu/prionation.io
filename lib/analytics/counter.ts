import "server-only";
import { Redis } from "@upstash/redis";

// First-party, consent-free audience measurement for the /start sales page.
// It answers the one question the consent-gated tools can't: how many visitors
// landed, and how many tapped a contact button, whatever they did with the
// cookie banner.
//
// Privacy design (CNIL audience-measurement exemption, cnil.fr, 4 July 2025):
// - purpose limited to measuring our own pages; output is anonymous daily totals
// - nothing is read from or written to the visitor's device (no cookie, no
//   storage); no IP, user agent, fbclid or other identifier is stored — the user
//   agent is only checked in memory to drop bots
// - totals are never joined to leads or phone numbers
// - keys expire after ~25 months
// Disclosed in the privacy policy (lib/content/privacy.ts).

const redis = Redis.fromEnv();

const TTL_SECONDS = 60 * 60 * 24 * 760; // ~25 months
const MAX_FIELDS_PER_DAY = 300; // caps junk utm values; overflow goes to one field

export const LOCALES = ["en", "fr", "id"] as const;
export const PLACEMENTS = ["nav", "hero", "sticky", "story", "prix", "final", "sheet"] as const;
// wa = WhatsApp link, tel = phone link, cb_open = opened the call-back form,
// cb = call-back request submitted (counted server-side), mail = e-mail link.
export const CHANNELS = ["wa", "tel", "cb_open", "cb", "mail"] as const;

export type Metric = "view" | "tap";

function pick<T extends readonly string[]>(list: T, value: string | null | undefined, fallback: T[number]): T[number] {
  return (list as readonly string[]).includes(value ?? "") ? (value as T[number]) : fallback;
}

// Campaign / ad names come from UTM parameters, i.e. from the URL anyone can
// type, so they are reduced to a short safe slug.
function slug(value: string | null | undefined): string {
  if (!value) return "-";
  const s = value.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
  return s || "-";
}

// Calendar day in Paris (the campaigns' market), as YYYY-MM-DD.
export function parisDay(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function keyFor(metric: Metric, day: string, qa: boolean): string {
  return `pn:m${qa ? ":qa" : ""}:${metric}:${day}`;
}

const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|facebot|preview|headless|lighthouse|pagespeed|chrome-lighthouse|curl|wget|python|axios|node-fetch/i;

// Requests we must not count: bots/crawlers (incl. Meta's link-preview fetcher),
// browser prefetches, and HEAD probes.
export function shouldIgnore(req: Request): boolean {
  if (req.method === "HEAD") return true;
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT_UA.test(ua)) return true;
  const purpose = [req.headers.get("purpose"), req.headers.get("sec-purpose"), req.headers.get("x-purpose")]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return purpose.includes("prefetch") || purpose.includes("preview");
}

// The page URL the hit came from: a ping carries it in Ping-From, a beacon or
// image request in Referer. Only same-site pages are trusted for campaign data.
export function sourceUrl(req: Request): URL | null {
  const raw = req.headers.get("ping-from") || req.headers.get("referer");
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return /(^|\.)prionation\.io$|^localhost$/.test(url.hostname) ? url : null;
  } catch {
    return null;
  }
}

export type HitInput = {
  metric: Metric;
  locale?: string | null;
  channel?: string | null;
  placement?: string | null;
  source?: URL | null;
  qa?: boolean;
};

export async function recordHit(input: HitInput): Promise<void> {
  const locale = pick(LOCALES, input.locale, "en");
  const channel = input.metric === "view" ? "-" : pick(CHANNELS, input.channel, "wa");
  const placement = input.metric === "view" ? "-" : pick(PLACEMENTS, input.placement, "hero");
  const campaign = slug(input.source?.searchParams.get("utm_campaign"));
  const content = slug(input.source?.searchParams.get("utm_content"));
  const qa = Boolean(input.qa || input.source?.searchParams.get("qa") === "1");

  const key = keyFor(input.metric, parisDay(), qa);
  let field = [locale, channel, placement, campaign, content].join("|");
  if ((await redis.hlen(key)) >= MAX_FIELDS_PER_DAY) field = "overflow";

  await redis.pipeline().hincrby(key, field, 1).expire(key, TTL_SECONDS).exec();
}

export type FunnelRow = {
  day: string;
  metric: Metric;
  locale: string;
  channel: string;
  placement: string;
  campaign: string;
  content: string;
  count: number;
};

// Read-out for app/finance/funnel: the last `days` Paris days, newest first.
export async function readFunnel(days = 14, qa = false): Promise<FunnelRow[]> {
  const dayList: string[] = [];
  const now = Date.now();
  for (let i = 0; i < days; i++) dayList.push(parisDay(new Date(now - i * 86_400_000)));

  const pipe = redis.pipeline();
  for (const day of dayList) {
    pipe.hgetall(keyFor("view", day, qa));
    pipe.hgetall(keyFor("tap", day, qa));
  }
  const results = (await pipe.exec()) as (Record<string, number | string> | null)[];

  const rows: FunnelRow[] = [];
  dayList.forEach((day, i) => {
    (["view", "tap"] as const).forEach((metric, j) => {
      const hash = results[i * 2 + j] ?? {};
      for (const [field, value] of Object.entries(hash)) {
        const [locale = "-", channel = "-", placement = "-", campaign = "-", content = "-"] = field.split("|");
        rows.push({ day, metric, locale, channel, placement, campaign, content, count: Number(value) || 0 });
      }
    });
  });
  return rows;
}
