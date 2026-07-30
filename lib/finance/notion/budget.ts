import "server-only";
import { unstable_cache } from "next/cache";
import { FINANCE_DATA_SOURCE } from "./ids";
import { queryAllPages } from "./query";
import * as parse from "./parse";
import type { BudgetLine } from "./types";

// Property names verified 2026-07-31 against the real live Budget Plan data
// source schema (GET /v1/data_sources/{id}).
const P = {
  NAME: "Budget Line",
  CATEGORY: "Category",
  PERIOD: "Period Type",
  BUDGETED: "Budgeted Amount",
  ACTUAL: "Actual Amount",
  VARIANCE: "Variance",
} as const;

async function fetchBudgetLinesUncached(): Promise<BudgetLine[]> {
  const pages = await queryAllPages(FINANCE_DATA_SOURCE.BUDGET);
  return pages.map((page) => {
    const props = page.properties;
    return {
      id: page.id,
      name: parse.title(props, P.NAME),
      category: parse.selectName(props, P.CATEGORY),
      period: parse.selectName(props, P.PERIOD),
      budgetedAmount: parse.num(props, P.BUDGETED),
      actualAmount: parse.rollupNumber(props, P.ACTUAL),
      // Notion computes this directly — use it as authoritative rather than
      // recomputing actual-minus-budgeted, so it can never drift from the
      // ledger's own definition (e.g. rounding, sign convention).
      variance: parse.formulaNumber(props, P.VARIANCE),
    };
  });
}

export const fetchBudgetLines = unstable_cache(
  fetchBudgetLinesUncached,
  ["finance-budget"],
  { revalidate: 300, tags: ["finance-budget"] },
);
