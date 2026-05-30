import { NextRequest, NextResponse } from "next/server";
import { intakeSchema } from "@/lib/forms/schemas";
import { intakeToNotionProperties } from "@/lib/notion/mappers";
import { notion } from "@/lib/notion/client";
import { DB } from "@/lib/notion/databases";
import { rateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";
import {
  sendIntakeNotification,
  sendIntakeConfirmation,
} from "@/lib/notify/templates";
import { sendIntakeToDiscord } from "@/lib/notify/discord";
import { syncIntakeToSalesPipeline } from "@/lib/notion/sync";
import { evaluateDisqualification } from "@/lib/forms/disqualification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const rl = await rateLimit("intake", ip);
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many submissions. Try again in an hour." },
        { status: 429 },
      );
    }

    // 2. Parse and validate
    const body = await req.json();
    const parsed = intakeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    // 3. Honeypot, silent reject if filled
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

    // 5. Write to PN_Intake (raw inbox, authoritative)
    const page = await notion.pages.create({
      parent: { database_id: DB.INTAKE },
      properties: intakeToNotionProperties(parsed.data),
    });

    // 6. Disqualification check
    const disq = evaluateDisqualification(parsed.data);
    if (disq.disqualified) {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Sync Status": { select: { name: "Disqualified" } },
          "Disqualification Reason": {
            rich_text: [{ text: { content: disq.reason } }],
          },
        },
      });
    } else {
      // 7. Sync to Sales Pipeline
      try {
        const pipelineUrl = await syncIntakeToSalesPipeline(
          parsed.data,
          page.id,
        );
        await notion.pages.update({
          page_id: page.id,
          properties: {
            "Sync Status": { select: { name: "Synced" } },
            "Sales Pipeline Link": { url: pipelineUrl },
          },
        });
      } catch (syncError) {
        console.error("[intake] Sales Pipeline sync failed", syncError);
        await notion.pages.update({
          page_id: page.id,
          properties: { "Sync Status": { select: { name: "Failed" } } },
        });
      }
    }

    // 8. Notify team + confirm to submitter (fire-and-forget)
    sendIntakeNotification(parsed.data).catch((e) =>
      console.error("[intake] Notification failed", e),
    );
    sendIntakeConfirmation(parsed.data).catch((e) =>
      console.error("[intake] Confirmation failed", e),
    );
    sendIntakeToDiscord(parsed.data).catch((e) =>
      console.error("[intake] Discord notification failed", e),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[intake] Route error", error);
    return NextResponse.json(
      { error: "Submission failed. Please try again." },
      { status: 500 },
    );
  }
}
