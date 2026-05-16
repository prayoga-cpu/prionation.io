export const DB = {
  INTAKE: process.env.NOTION_DB_INTAKE!,
  BOOKINGS: process.env.NOTION_DB_BOOKINGS!,
  CAREERS: process.env.NOTION_DB_CAREERS!,
  WAITLIST: process.env.NOTION_DB_WAITLIST!,
  SALES_PIPELINE: process.env.NOTION_DB_SALES_PIPELINE!,
} as const;
