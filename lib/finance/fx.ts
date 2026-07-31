// Pure currency conversion — no server-only guard, safe to import from
// client components too (unlike lib/finance/currency.ts, which also holds
// the live-fetching fetchFxRates()).
import type { Currency, FxRates } from "./currency";

// Converts a native-currency amount to EUR using live EUR-based rates.
// "Potential Inflow" (Invoice Total − Amount Paid) is one of the few Notion
// formula fields that is NOT pre-normalized to EUR — unlike "Amount (EUR
// Normalized)" or the Darwin/Evan cut fields, it's expressed in each
// transaction's own native currency. Summing those raw is a real bug (IDR
// millions added to EUR hundreds). Returns null (never guesses) if the
// currency is unrecognized or its live rate is unavailable.
export function toEur(
  amountNative: number | null,
  nativeCurrency: string | null,
  rates: FxRates,
): number | null {
  if (amountNative === null) return null;
  if (!nativeCurrency || nativeCurrency === "EUR") return amountNative;
  const rate = rates[nativeCurrency as Currency];
  if (typeof rate !== "number") return null;
  return amountNative / rate;
}
