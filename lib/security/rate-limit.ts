import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const limiters: Record<string, Ratelimit> = {
  intake: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, '1 h') }),
  booking: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, '1 h') }),
  career: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, '1 h') }),
  waitlist: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, '1 h') }),
  // AI consultation chat: 20 messages/h/IP ≈ two full 10-turn conversations.
  consult: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, '1 h') }),
  // Guided-intake PDF diagnostic: heavier per-call cost (web fetch + PDF
  // render), so a tighter cap than the chat.
  diagnostic: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(6, '1 h') }),
};

export async function rateLimit(form: keyof typeof limiters, ip: string) {
  if (process.env.SECURITY_ENABLED === 'false') return { success: true };
  return limiters[form].limit(`${form}:${ip}`);
}
