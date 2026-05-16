import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/forms/schemas";
import { waitlistToNotionProperties } from "@/lib/notion/mappers";
import { notion } from "@/lib/notion/client";
import { DB } from "@/lib/notion/databases";
import { rateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";
import {
  sendWaitlistNotification,
  sendWaitlistConfirmation,
} from "@/lib/notify/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const rl = await rateLimit("waitlist", ip);
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many submissions. Try again in an hour." },
        { status: 429 },
      );
    }

    // 2. Parse and validate
    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    // 3. Honeypot
    if (parsed.data.honeypot) {
      return NextResponse.json({ success: true });
    }

    // 4. Verify Turnstile
    const turnstileOk = await verifyTurnstile(parsed.data.turnstileToken, ip);
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Verification failed" },
        { status: 403 },
      );
    }

    // 5. Write to PN_Waitlist (rate limit above handles repeat abuse)
    await notion.pages.create({
      parent: { database_id: DB.WAITLIST },
      properties: waitlistToNotionProperties(parsed.data),
    });

    // 7. Notify team + confirm to submitter
    sendWaitlistNotification(parsed.data).catch((e) =>
      console.error("[waitlist] Notification failed", e),
    );
    sendWaitlistConfirmation(parsed.data).catch((e) =>
      console.error("[waitlist] Confirmation failed", e),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[waitlist] Route error", error);
    return NextResponse.json(
      { error: "Submission failed. Please try again." },
      { status: 500 },
    );
  }
}
