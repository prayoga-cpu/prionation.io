import "server-only";
import { unstable_cache } from "next/cache";
import { FINANCE_DATA_SOURCE } from "./ids";
import { queryAllPages } from "./query";
import * as parse from "./parse";
import type { Transaction } from "./types";

// Property names as named constants — adjust here if they differ from the
// live Notion schema once NOTION_TOKEN is set (see build-order step 2 in
// finance_dashboard_dev_plan.md: verify against real data before trusting).
const P = {
  NAME: "Name",
  DATE: "Date",
  TYPE: "Type",
  STATUS: "Status",
  CATEGORY: "Category",
  CURRENCY: "Currency",
  AMOUNT: "Amount",
  AMOUNT_EUR: "Amount (EUR Normalized)",
  DARWIN_CUT: "Darwin Cut (80%, EUR)",
  EVAN_CUT: "Evan Cut (20%, EUR)",
  POTENTIAL_INFLOW: "Potential Inflow",
  PERCENT_PAID: "% Paid",
  DAYS_OVERDUE: "Days Overdue",
  OWN_DEAL: "Own Profit Share Deal",
  RECEIPT: "Receipt",
  PROJECT: "Project",
} as const;

async function fetchTransactionsUncached(): Promise<Transaction[]> {
  const pages = await queryAllPages(FINANCE_DATA_SOURCE.TRANSACTIONS);
  return pages.map((page) => {
    const props = page.properties;
    return {
      id: page.id,
      name: parse.title(props, P.NAME),
      date: parse.dateStart(props, P.DATE),
      type: parse.selectName(props, P.TYPE),
      status: parse.selectName(props, P.STATUS),
      category: parse.selectName(props, P.CATEGORY),
      currency: parse.selectName(props, P.CURRENCY),
      amount: parse.num(props, P.AMOUNT),
      amountEur: parse.formulaNumber(props, P.AMOUNT_EUR),
      darwinCutEur: parse.formulaNumber(props, P.DARWIN_CUT),
      evanCutEur: parse.formulaNumber(props, P.EVAN_CUT),
      potentialInflow: parse.formulaNumber(props, P.POTENTIAL_INFLOW),
      percentPaid: parse.formulaNumber(props, P.PERCENT_PAID),
      daysOverdue: parse.formulaNumber(props, P.DAYS_OVERDUE),
      ownProfitShareDeal: parse.checkbox(props, P.OWN_DEAL),
      hasReceipt: parse.filesPresent(props, P.RECEIPT),
      projectIds: parse.relationIds(props, P.PROJECT),
    };
  });
}

export const fetchTransactions = unstable_cache(
  fetchTransactionsUncached,
  ["finance-transactions"],
  { revalidate: 300, tags: ["finance-transactions"] },
);
