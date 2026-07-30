import "server-only";
import { Client } from "@notionhq/client";
import { NOTION_VERSION } from "./ids";

// Read-only integration, isolated from the main site's write-capable
// NOTION_API_KEY (lib/notion/client.ts). Never import that client here.
export const financeNotion = new Client({
  auth: process.env.NOTION_TOKEN!,
  notionVersion: NOTION_VERSION,
});

// Write access scoped to only the Finance Acknowledgments database. Token is
// optional — acknowledgment writes no-op until both this and
// FINANCE_DB_ACKNOWLEDGMENTS are set (see lib/finance/notion/ids.ts). The SDK
// already defaults to NOTION_VERSION, so this doesn't repin it.
export const financeAckNotion = process.env.NOTION_ACK_TOKEN
  ? new Client({ auth: process.env.NOTION_ACK_TOKEN })
  : null;
