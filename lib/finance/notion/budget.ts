import "server-only";
import { unstable_cache } from "next/cache";
import { FINANCE_DATA_SOURCE } from "./ids";
import { queryAllPages } from "./query";
import * as parse from "./parse";
import type { BudgetLine } from "./types";

const P = {
  NAME: "Name",
  CATEGORY: "Category",
  PERIOD: "Period",
  BUDGETED: "Budgeted Amount",
  ACTUAL: "Actual Amount",
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
    };
  });
}

export const fetchBudgetLines = unstable_cache(
  fetchBudgetLinesUncached,
  ["finance-budget"],
  { revalidate: 300, tags: ["finance-budget"] },
);
