import { NextRequest, NextResponse } from "next/server";
import { verifyOtpSchema } from "@/lib/finance/auth/schemas";
import { verifyOtp } from "@/lib/finance/auth/otp";
import { emailForRole } from "@/lib/finance/auth/roles";
import { logSuccessfulLogin } from "@/lib/finance/auth/audit";
import {
  FINANCE_SESSION_COOKIE,
  FINANCE_SESSION_TTL_SECONDS,
  signFinanceSession,
} from "@/lib/finance/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = verifyOtpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    }

    const { role, code } = parsed.data;
    const result = await verifyOtp(role, code);

    if (result === "locked_out") {
      return NextResponse.json({ error: "locked_out" }, { status: 429 });
    }
    if (result !== "ok") {
      // "no_active_code" and "mismatch" get the same generic response —
      // never reveal which one it was.
      return NextResponse.json({ error: "invalid_code" }, { status: 401 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    logSuccessfulLogin(role, ip);

    const token = await signFinanceSession({ role, email: emailForRole(role) });
    const res = NextResponse.json({ success: true });
    res.cookies.set(FINANCE_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      // Plan calls for Path=/finance, but /api/finance/* routes (refresh,
      // acknowledge) need this cookie too and don't share that prefix — a
      // single cookie can't scope to both, so this uses "/" instead.
      path: "/",
      maxAge: FINANCE_SESSION_TTL_SECONDS,
    });
    return res;
  } catch (error) {
    console.error("[finance/auth/verify-otp] Route error", error);
    return NextResponse.json({ error: "generic" }, { status: 500 });
  }
}
