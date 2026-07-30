import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getFinanceSession } from "@/lib/finance/auth/requireSession";
import { FINANCE_CACHE_TAGS } from "@/lib/finance/notion/snapshot";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getFinanceSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  for (const tag of FINANCE_CACHE_TAGS) revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ success: true });
}
