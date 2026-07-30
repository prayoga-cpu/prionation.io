import "server-only";
import { cookies } from "next/headers";
import {
  FINANCE_SESSION_COOKIE,
  verifyFinanceSession,
  type FinanceSessionClaims,
} from "./session";

// For Route Handlers and Server Components only — not middleware (which reads
// the cookie off NextRequest directly, see proxy.ts).
export async function getFinanceSession(): Promise<FinanceSessionClaims | null> {
  const store = await cookies();
  const token = store.get(FINANCE_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyFinanceSession(token);
}
