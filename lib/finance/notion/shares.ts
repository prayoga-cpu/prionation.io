import "server-only";
import { unstable_cache } from "next/cache";
import { FINANCE_DATA_SOURCE } from "./ids";
import { queryAllPages } from "./query";
import * as parse from "./parse";
import type { StockShare } from "./types";

const P = {
  NAME: "Name",
  PERCENT: "Percent",
  TRANSACTIONS: "Transactions",
} as const;

async function fetchStockSharesUncached(): Promise<StockShare[]> {
  const pages = await queryAllPages(FINANCE_DATA_SOURCE.SHARES);
  return pages.map((page) => {
    const props = page.properties;
    return {
      id: page.id,
      name: parse.title(props, P.NAME),
      percent: parse.num(props, P.PERCENT),
      linkedTransactionIds: parse.relationIds(props, P.TRANSACTIONS),
    };
  });
}

export const fetchStockShares = unstable_cache(
  fetchStockSharesUncached,
  ["finance-shares"],
  { revalidate: 300, tags: ["finance-shares"] },
);
