import "server-only";
import { unstable_cache } from "next/cache";
import { FINANCE_DATA_SOURCE } from "./ids";
import { queryAllPages } from "./query";
import * as parse from "./parse";
import type { PipelineItem } from "./types";

// Ground-truth property names — this is the same PN_Sales_Pipeline database
// the public intake form writes to (lib/notion/sync.ts), so these match the
// real live schema exactly, unlike the other three finance fetchers.
const P = {
  COMPANY: "Company",
  STAGE: "Stage",
  GEOGRAPHY: "Geography",
  SOURCE: "Source",
} as const;

async function fetchPipelineUncached(): Promise<PipelineItem[]> {
  const pages = await queryAllPages(FINANCE_DATA_SOURCE.PIPELINE);
  return pages.map((page) => {
    const props = page.properties;
    return {
      id: page.id,
      company: parse.title(props, P.COMPANY),
      stage: parse.selectName(props, P.STAGE),
      geography: parse.selectName(props, P.GEOGRAPHY),
      source: parse.selectName(props, P.SOURCE),
    };
  });
}

export const fetchPipeline = unstable_cache(
  fetchPipelineUncached,
  ["finance-pipeline"],
  { revalidate: 300, tags: ["finance-pipeline"] },
);
