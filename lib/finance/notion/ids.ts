// Finance database + data source IDs. Notion API 2025-09-03+ queries require
// data source IDs, not just database IDs — both are pinned here.
export const FINANCE_DB = {
  TRANSACTIONS: process.env.FINANCE_DB_TRANSACTIONS!,
  BUDGET: process.env.FINANCE_DB_BUDGET!,
  SHARES: process.env.FINANCE_DB_SHARES!,
  PIPELINE: process.env.FINANCE_DB_PIPELINE!,
} as const;

export const FINANCE_DATA_SOURCE = {
  TRANSACTIONS: process.env.FINANCE_DB_TRANSACTIONS_DS!,
  BUDGET: process.env.FINANCE_DB_BUDGET_DS!,
  SHARES: process.env.FINANCE_DB_SHARES_DS!,
  PIPELINE: process.env.FINANCE_DB_PIPELINE_DS!,
} as const;

// Set only once you've created the "Finance Acknowledgments" database (see
// finance_dashboard_dev_plan.md section 5.2) and shared it with NOTION_ACK_TOKEN's
// integration. Acknowledgment writes are a no-op until FINANCE_DB_ACKNOWLEDGMENTS
// is set; reading acknowledgment history back additionally needs the data
// source ID (find it via the database's "..." menu → Manage data sources).
export const FINANCE_DB_ACKNOWLEDGMENTS = process.env.FINANCE_DB_ACKNOWLEDGMENTS ?? "";
export const FINANCE_DB_ACKNOWLEDGMENTS_DS = process.env.FINANCE_DB_ACKNOWLEDGMENTS_DS ?? "";

export const NOTION_VERSION = "2025-09-03";
