import { NextRequest, NextResponse } from "next/server";
import { requestOtpSchema } from "@/lib/finance/auth/schemas";
import { generateCode, storeOtp } from "@/lib/finance/auth/otp";
import { emailForRole } from "@/lib/finance/auth/roles";
import { sendFinanceOtpEmail } from "@/lib/finance/notify/otpEmail";
import { rateLimit } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = requestOtpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    }

    const { role } = parsed.data;

    // Keyed by role, not IP — caps total OTP requests for a role regardless
    // of who's asking.
    const rl = await rateLimit("finance-otp-request", role);
    if (!rl.success) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    const code = generateCode();
    await storeOtp(role, code);

    try {
      await sendFinanceOtpEmail(role, emailForRole(role), code);
    } catch (e) {
      console.error("[finance/auth/request-otp] Email send failed", e);
      return NextResponse.json({ error: "email_failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[finance/auth/request-otp] Route error", error);
    return NextResponse.json({ error: "generic" }, { status: 500 });
  }
}
