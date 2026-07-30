import "server-only";
import { SignJWT, jwtVerify } from "jose";
import type { FinanceRole } from "./otp";

export type FinanceSessionClaims = {
  role: FinanceRole;
  email: string;
};

export const FINANCE_SESSION_COOKIE = "pn_fin_session";
export const FINANCE_SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours, no refresh

function secretKey(): Uint8Array {
  const secret = process.env.FINANCE_JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "FINANCE_JWT_SECRET must be set to 32+ chars (`openssl rand -hex 32`)",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signFinanceSession(
  claims: FinanceSessionClaims,
): Promise<string> {
  return new SignJWT({ role: claims.role, email: claims.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${FINANCE_SESSION_TTL_SECONDS}s`)
    .sign(secretKey());
}

// Usable from both Edge middleware and Node route handlers — jose runs in
// both. Never throws: any malformed/expired/tampered token just yields null.
export async function verifyFinanceSession(
  token: string,
): Promise<FinanceSessionClaims | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (payload.role !== "ceo" && payload.role !== "cro") return null;
    if (typeof payload.email !== "string") return null;
    return { role: payload.role, email: payload.email };
  } catch {
    return null;
  }
}
