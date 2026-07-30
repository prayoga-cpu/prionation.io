import "server-only";
import type { PageObjectResponse } from "@notionhq/client";
import { financeAckNotion } from "./client";
import { FINANCE_DB_ACKNOWLEDGMENTS, FINANCE_DB_ACKNOWLEDGMENTS_DS } from "./ids";
import * as parse from "./parse";
import type { FinanceRole } from "@/lib/finance/auth/otp";

export const TERMS_VERSION = "1.0";

export type Acknowledgment = {
  role: FinanceRole;
  email: string;
  acknowledgedAt: string;
  termsVersion: string;
};

export async function createAcknowledgment(role: FinanceRole, email: string): Promise<void> {
  if (!financeAckNotion || !FINANCE_DB_ACKNOWLEDGMENTS) {
    throw new Error(
      "Acknowledgment tracking isn't configured yet (NOTION_ACK_TOKEN / FINANCE_DB_ACKNOWLEDGMENTS).",
    );
  }
  await financeAckNotion.pages.create({
    parent: { database_id: FINANCE_DB_ACKNOWLEDGMENTS },
    properties: {
      Name: {
        title: [{ text: { content: `${role.toUpperCase()} acknowledged v${TERMS_VERSION}` } }],
      },
      Role: { select: { name: role.toUpperCase() } },
      Email: { email },
      "Terms Version": { rich_text: [{ text: { content: TERMS_VERSION } }] },
    },
  });
}

// Most recent acknowledgment per role. Returns {} (never throws) if the
// tracking database or its data source ID isn't configured yet.
export async function fetchLatestAcknowledgments(): Promise<
  Partial<Record<FinanceRole, Acknowledgment>>
> {
  if (!financeAckNotion || !FINANCE_DB_ACKNOWLEDGMENTS_DS) return {};

  try {
    const res = await financeAckNotion.dataSources.query({
      data_source_id: FINANCE_DB_ACKNOWLEDGMENTS_DS,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
      page_size: 20,
    });

    const latest: Partial<Record<FinanceRole, Acknowledgment>> = {};
    for (const result of res.results) {
      if (!("properties" in result)) continue;
      const page = result as PageObjectResponse;

      const role = parse.selectName(page.properties, "Role")?.toLowerCase();
      if (role !== "ceo" && role !== "cro") continue;
      if (latest[role]) continue; // already captured the newest for this role

      const emailProp = page.properties["Email"];
      latest[role] = {
        role,
        email: emailProp?.type === "email" ? (emailProp.email ?? "") : "",
        acknowledgedAt: page.created_time,
        termsVersion: parse.richText(page.properties, "Terms Version"),
      };
    }
    return latest;
  } catch (e) {
    console.error("[finance/terms] fetchLatestAcknowledgments failed", e);
    return {};
  }
}
