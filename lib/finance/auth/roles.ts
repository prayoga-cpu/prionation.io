import "server-only";
import type { FinanceRole } from "./otp";

// The client only ever sends a role, never an email — this map is the only
// place a role resolves to an address, so no arbitrary email can reach the
// OTP endpoint. See finance_dashboard_dev_plan.md section 3.2.
export function emailForRole(role: FinanceRole): string {
  const email =
    role === "ceo" ? process.env.FINANCE_EMAIL_CEO : process.env.FINANCE_EMAIL_CRO;
  if (!email) {
    throw new Error(`FINANCE_EMAIL_${role.toUpperCase()} is not set`);
  }
  return email;
}
