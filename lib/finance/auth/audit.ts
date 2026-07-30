import "server-only";
import crypto from "node:crypto";
import type { FinanceRole } from "./otp";

// Logs successful logins only — role, timestamp, and a hashed IP (never the
// raw address). Never log OTP codes, session tokens, or transaction amounts.
export function logSuccessfulLogin(role: FinanceRole, ip: string): void {
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
  console.log(
    JSON.stringify({
      event: "finance_login",
      role,
      ipHash,
      at: new Date().toISOString(),
    }),
  );
}
