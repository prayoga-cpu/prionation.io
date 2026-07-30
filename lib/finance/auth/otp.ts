import "server-only";
import crypto from "node:crypto";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const TTL_SECONDS = 600; // 10 minutes
const MAX_ATTEMPTS = 5;

export type FinanceRole = "ceo" | "cro";

const otpKey = (role: FinanceRole) => `finance:otp:${role}`;
const attemptsKey = (role: FinanceRole) => `finance:otp:attempts:${role}`;

function hashCode(code: string): string {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export function generateCode(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export async function storeOtp(role: FinanceRole, code: string): Promise<void> {
  await redis.set(otpKey(role), hashCode(code), { ex: TTL_SECONDS });
  await redis.del(attemptsKey(role));
}

export type VerifyResult = "ok" | "no_active_code" | "locked_out" | "mismatch";

export async function verifyOtp(role: FinanceRole, code: string): Promise<VerifyResult> {
  const storedHash = await redis.get<string>(otpKey(role));
  if (!storedHash) return "no_active_code";

  const attempts = (await redis.get<number>(attemptsKey(role))) ?? 0;
  if (attempts >= MAX_ATTEMPTS) {
    await redis.del(otpKey(role));
    await redis.del(attemptsKey(role));
    return "locked_out";
  }

  const inputHash = hashCode(code);
  const a = Buffer.from(inputHash, "hex");
  const b = Buffer.from(storedHash, "hex");
  const match = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (match) {
    await redis.del(otpKey(role));
    await redis.del(attemptsKey(role));
    return "ok";
  }

  await redis.incr(attemptsKey(role));
  await redis.expire(attemptsKey(role), TTL_SECONDS);
  return "mismatch";
}
