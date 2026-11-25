import "server-only";
import { Redis } from "@upstash/redis";

// Maps a Cal.com booking uid → the Notion page (PN_Bookings row) created for it,
// so a later webhook (cancelled / rescheduled / meeting ended) can update the
// right row without a Notion query or a new Notion column.

const redis = Redis.fromEnv();
const TTL_SECONDS = 60 * 60 * 24 * 400; // bookings are scheduled weeks ahead at most

const key = (uid: string) => `pn:cal:booking:${uid}`;

export async function rememberBookingPage(uid: string, notionPageId: string): Promise<void> {
  await redis.set(key(uid), notionPageId, { ex: TTL_SECONDS });
}

export async function findBookingPage(uid: string): Promise<string | null> {
  return (await redis.get<string>(key(uid))) ?? null;
}
