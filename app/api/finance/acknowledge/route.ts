import { NextResponse } from "next/server";
import { getFinanceSession } from "@/lib/finance/auth/requireSession";
import { createAcknowledgment } from "@/lib/finance/notion/acknowledgments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getFinanceSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    // Role/email come from the verified session, never the client body —
    // you can only acknowledge as yourself.
    await createAcknowledgment(session.role, session.email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[finance/acknowledge] Route error", error);
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
}
