import "server-only";
import { unstable_cache } from "next/cache";
import { FINANCE_DATA_SOURCE } from "./ids";
import { queryAllPages } from "./query";
import * as parse from "./parse";
import type { StockShare } from "./types";

// Property names verified 2026-07-31 against the real live Stock Shares data
// source schema (GET /v1/data_sources/{id}).
const P = {
  NAME: "Stakeholder",
  PERCENT: "Share %",
  ROLE: "Role",
  COVERS: "Covers",
  SPLIT_EXCEPTIONS: "Split Exceptions",
  LINKED_INCOME: "Linked Income",
} as const;

async function fetchStockSharesUncached(): Promise<StockShare[]> {
  const pages = await queryAllPages(FINANCE_DATA_SOURCE.SHARES);
  return pages.map((page) => {
    const props = page.properties;
    return {
      id: page.id,
      name: parse.title(props, P.NAME),
      percent: parse.num(props, P.PERCENT),
      role: parse.selectName(props, P.ROLE),
      covers: parse.richText(props, P.COVERS),
      splitExceptions: parse.richText(props, P.SPLIT_EXCEPTIONS),
      linkedTransactionIds: parse.relationIds(props, P.LINKED_INCOME),
    };
  });
}

export const fetchStockShares = unstable_cache(
  fetchStockSharesUncached,
  ["finance-shares"],
  { revalidate: 300, tags: ["finance-shares"] },
);
