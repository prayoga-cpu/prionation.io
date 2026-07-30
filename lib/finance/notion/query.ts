import "server-only";
import type { PageObjectResponse } from "@notionhq/client";
import { financeNotion } from "./client";

// Notion caps page_size at 100; loop until has_more is false. Filters out
// partial/unsupported responses (e.g. an archived page mid-migration) by
// checking for the "properties" field full responses always carry.
export async function queryAllPages(
  dataSourceId: string,
): Promise<PageObjectResponse[]> {
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const res = await financeNotion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 100,
      start_cursor: cursor,
    });
    for (const page of res.results) {
      if ("properties" in page) pages.push(page as PageObjectResponse);
    }
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return pages;
}
