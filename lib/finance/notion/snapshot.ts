import "server-only";
import { unstable_cache } from "next/cache";
import { fetchTransactions } from "./transactions";
import { fetchBudgetLines } from "./budget";
import { fetchStockShares } from "./shares";
import { fetchPipeline } from "./pipeline";
import { aggregateFinance } from "./aggregate";

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
    ...aggregateFinance({ transactions, budget, shares, pipeline }),
    transactions,
    fetchedAt: new Date().toISOString(),
  };
}

// Wraps the four already-cached fetchers so "data as of" reflects the last
// real fetch, not just page-render time (§2.5 — 300s revalidate).
export const getFinanceSnapshot = unstable_cache(
  getFinanceSnapshotUncached,
  ["finance-snapshot"],
  { revalidate: 300, tags: [...FINANCE_CACHE_TAGS] },
);
