// AI Consultation chat endpoint. Mirrors the app/api/forms/* security
// pipeline (rate limit → zod → honeypot → Turnstile), then streams a
// claude-opus-4-8 reply to the browser as Server-Sent Events.
//
// Contract (client: hooks/useConsultChat.ts):
//   POST { messages, locale, turnstileToken, honeypot? }
//   (turnstileToken is required on every turn — see step 5 below)
//   → 200 text/event-stream: data:{type:"delta",text}* then data:{type:"done",...}
//     (upstream failures after the stream opens arrive as data:{type:"error",code})
//   → pre-stream JSON errors: 429 rate_limited, 400 invalid, 403 verification,
//     409 turn_limit, 500 generic. Server emits machine codes only — the
//     client maps them to localized Consult.error_* strings.

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  consultRequestSchema,
  CONSULT_MAX_USER_TURNS,
} from "@/lib/consult/schema";
import { CONSULT_SYSTEM_PROMPTS } from "@/lib/consult/prompt";
import { mapUpstreamError } from "@/lib/consult/errors";
import { rateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // streaming can outlive the default fn timeout

const CONSULT_MODEL = "claude-opus-4-8";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY

const SSE_HEADERS = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-store, no-transform",
  "X-Accel-Buffering": "no",
} as const;

const encoder = new TextEncoder();
const sseFrame = (payload: object) =>
  encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);

const jsonError = (code: string, status: number, extra?: object) =>
  NextResponse.json({ error: { code, ...extra } }, { status });

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit (SECURITY_ENABLED=false bypasses, same as forms)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const rl = await rateLimit("consult", ip);
    if (!rl.success) return jsonError("rate_limited", 429);

    // 2. Parse and validate
    const body = await req.json().catch(() => null);
    const parsed = consultRequestSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("invalid", 400, { issues: parsed.error.issues });
    }
    const { messages, locale, turnstileToken, honeypot } = parsed.data;
    const userTurns = messages.filter((m) => m.role === "user").length;

    // 3. Honeypot: silent accept — stream an empty completed turn
    if (honeypot) {
      return new Response(
        sseFrame({
          type: "done",
          stopReason: "end_turn",
          turnsUsed: userTurns,
          turnsMax: CONSULT_MAX_USER_TURNS,
          outputTokens: 0,
        }),
        { headers: SSE_HEADERS },
      );
    }

    // 4. Turn cap (defense in depth; zod already caps history length)
    if (userTurns > CONSULT_MAX_USER_TURNS) return jsonError("turn_limit", 409);

    // 5. Turnstile — verified on every turn (matching the forms routes).
    // `messages` is fully client-controlled, so gating only on a computed
    // "first turn" heuristic (e.g. userTurns === 1) is spoofable: an attacker
    // can forge a longer history on their very first real request and skip
    // verification for the whole conversation. Tokens are single-use; the
    // client mints a fresh one after every send (see hooks/useConsultChat.ts).
    const turnstileOk = await verifyTurnstile(turnstileToken, ip);
    if (!turnstileOk) return jsonError("verification", 403);

    // 6. Claude → SSE bridge. No temperature/top_p/top_k and no thinking
    // param on claude-opus-4-8 (omitted thinking = off — this is a
    // latency-sensitive public chat). web_fetch lets Claude actually read a
    // URL the visitor shares (bounded: 2 fetches/turn, 4k tokens of page
    // content) instead of admitting it can't browse — effort "medium" (up
    // from "low") because lower efforts under-trigger tool calls, and
    // reliably reading the site when asked matters more here than shaving
    // latency further.
    const stream = client.messages.stream({
      model: CONSULT_MODEL,
      max_tokens: 1024,
      system: CONSULT_SYSTEM_PROMPTS[locale],
      messages,
      tools: [
        { type: "web_fetch_20260209", name: "web_fetch", max_uses: 2, max_content_tokens: 4000 },
      ],
      output_config: { effort: "medium" },
    });

    // Set by cancel() when the client disconnects (e.g. Stop button/navigation)
    // — guards the catch/finally below from enqueuing into or closing a
    // controller the runtime has already canceled, which would otherwise throw
    // (an unhandled rejection) instead of a clean, silent exit.
    let clientGone = false;
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(sseFrame({ type: "delta", text: event.delta.text }));
            }
          }
          const final = await stream.finalMessage();
          controller.enqueue(
            sseFrame({
              type: "done",
              stopReason: final.stop_reason,
              turnsUsed: userTurns,
              turnsMax: CONSULT_MAX_USER_TURNS,
              outputTokens: final.usage.output_tokens,
            }),
          );
        } catch (err) {
          if (!clientGone) controller.enqueue(sseFrame({ type: "error", code: mapUpstreamError(err) }));
        } finally {
          if (!clientGone) controller.close();
        }
      },
      cancel() {
        clientGone = true;
        stream.abort();
      },
    });

    return new Response(readable, { headers: SSE_HEADERS });
  } catch (error) {
    console.error("[consult] Route error", error);
    return jsonError("generic", 500);
  }
}
