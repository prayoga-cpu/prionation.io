import "server-only";
import { unstable_cache } from "next/cache";
import { fetchTransactions } from "./transactions";
import { fetchBudgetLines } from "./budget";
import { fetchStockShares } from "./shares";
import { fetchPipeline } from "./pipeline";

export const FINANCE_CACHE_TAGS = [
  "finance-transactions",
  "finance-budget",
  "finance-shares",
  "finance-pipeline",
  "finance-snapshot",
] as const;

async function getFinanceSnapshotUncached() {
  const [transactions, budget, shares, pipeline] = await Promise.all([
    fetchTransactions(),
    fetchBudgetLines(),
    fetchStockShares(),
    fetchPipeline(),
  ]);
  return {
    transactions,
    budget,
    shares,
    pipeline,
    fetchedAt: new Date().toISOString(),
  };
}

// Caches only the raw fetched Notion data (the expensive I/O), tagged for
// the manual refresh button. Deliberately does NOT run aggregateFinance()
// here — that needs live FX rates (see lib/finance/currency.ts), and
// unstable_cache's key is derived from call arguments, so threading rates
// through would either go stale for an hour or bust this cache every time
// rates refresh. Aggregation is cheap pure computation, so it re-runs fresh
// on every request in app/finance/page.tsx instead.
export const getFinanceSnapshot = unstable_cache(
  getFinanceSnapshotUncached,
  ["finance-snapshot"],
  { revalidate: 300, tags: [...FINANCE_CACHE_TAGS] },
);
