// Guided Intake → real AI diagnostic. Single-shot (not a chat): given a
// website (optional), industry, company stage, and a bottleneck description,
// asks claude-opus-4-8 for a structured diagnostic (output_config.format),
// optionally grounded in the visitor's actual site, then renders it into a
// downloadable PDF (lib/consult/pdf.ts). Replaces the templated/fabricated
// preview the Hero intake tab used to show.
//
// Two Claude calls, deliberately (see lib/consult/prompt.ts for why):
// combining web_fetch tool use with output_config.format structured JSON in
// one request produced corrupted/truncated fields in testing.

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { diagnosticRequestSchema } from "@/lib/consult/diagnosticSchema";
import {
  RESEARCH_SYSTEM_PROMPT,
  DIAGNOSTIC_SYSTEM_PROMPTS,
  DIAGNOSTIC_OUTPUT_SCHEMA,
  type DiagnosticResult,
} from "@/lib/consult/prompt";
import { buildDiagnosticPdf } from "@/lib/consult/pdf";
import { mapUpstreamError } from "@/lib/consult/errors";
import { rateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Up to 3 model calls in the worst case (research + generate + one retry on
// a garbled result). Generous ceiling — confirm the Vercel plan allows it
// (Hobby caps lower unless Fluid Compute is enabled; reduce if it can't).
export const maxDuration = 120;

const client = new Anthropic();

const jsonError = (code: string, status: number, extra?: object) =>
  NextResponse.json({ error: { code, ...extra } }, { status });

// Best-effort normalization so "epidom.fr" and "https://epidom.fr" both reach
// web_fetch as a well-formed URL; if it still doesn't parse, treat as absent
// rather than send a broken link into the prompt.
function normalizeWebsite(input: string | undefined): string | undefined {
  if (!input) return undefined;
  const withScheme = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  try {
    return new URL(withScheme).toString();
  } catch {
    return undefined;
  }
}

// Rare decoding artifact observed in practice: a substring immediately
// repeating itself (e.g. "warwarwareh", "e-commommce"). Narrow, not a
// grammar/quality checker — just enough to catch the most visibly-broken
// failure mode in a downloadable report and trigger one retry rather than
// shipping it. Not exhaustive (some subtler corruption can still slip
// through), but zero false positives observed against clean prose.
const STUTTER_PATTERN = /(\w{3,})\1/i;
function looksGarbled(diagnostic: DiagnosticResult): boolean {
  return [
    diagnostic.bottleneckSummary,
    diagnostic.pathSummary,
    diagnostic.roiEstimateLabel,
    ...diagnostic.roadmapSteps.flatMap((s) => [s.title, s.description]),
  ].some((s) => typeof s === "string" && STUTTER_PATTERN.test(s));
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const rl = await rateLimit("diagnostic", ip);
    if (!rl.success) return jsonError("rate_limited", 429);

    const body = await req.json().catch(() => null);
    const parsed = diagnosticRequestSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("invalid", 400, { issues: parsed.error.issues });
    }
    const { website, industry, stage, bottleneck, locale, turnstileToken, honeypot } = parsed.data;

    if (honeypot) return NextResponse.json({ success: true });

    const turnstileOk = await verifyTurnstile(turnstileToken, ip);
    if (!turnstileOk) return jsonError("verification", 403);

    const site = normalizeWebsite(website);

    // Step 1 — plain-text research (only if a site was given). No structured
    // output here, so a tool-use round trip can't destabilize JSON decoding.
    let siteNote: string | null = null;
    if (site) {
      const research = await client.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 512,
        system: RESEARCH_SYSTEM_PROMPT,
        messages: [{ role: "user", content: `Company website: ${site}` }],
        tools: [
          { type: "web_fetch_20260209" as const, name: "web_fetch" as const, max_uses: 2, max_content_tokens: 4000 },
        ],
        output_config: { effort: "medium" },
      });
      const textBlocks = research.content.filter(
        (b): b is Anthropic.TextBlock => b.type === "text",
      );
      siteNote = textBlocks[textBlocks.length - 1]?.text?.trim() || null;
    }

    // Step 2 — structured diagnostic, no tools, fed step 1's research note.
    const userContent = [
      siteNote ? `Website research note: ${siteNote}` : "No website provided.",
      `Industry: ${industry}`,
      `Company stage: ${stage}`,
      `Main bottleneck described by the visitor: ${bottleneck}`,
      "",
      "Produce the diagnostic now.",
    ].join("\n");

    const requestDiagnostic = async (): Promise<{ diagnostic: DiagnosticResult } | { errorCode: string; status: number }> => {
      const response = await client.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 2048,
        system: DIAGNOSTIC_SYSTEM_PROMPTS[locale],
        messages: [{ role: "user", content: userContent }],
        // "high" (not "medium"): this is a one-shot generate with its own
        // loading state already in the UI, not a latency-sensitive chat turn
        // — report quality matters more here than a few extra seconds.
        output_config: { format: { type: "json_schema", schema: DIAGNOSTIC_OUTPUT_SCHEMA }, effort: "high" },
      });

      if (response.stop_reason === "refusal") return { errorCode: "refusal", status: 422 };

      const textBlock = response.content.find(
        (b): b is Anthropic.TextBlock => b.type === "text",
      );
      if (!textBlock) return { errorCode: "generic", status: 502 };

      try {
        const parsed = JSON.parse(textBlock.text) as DiagnosticResult;
        // The JSON Schema used for output_config.format has no minItems/
        // maxItems (Anthropic structured outputs don't support array-length
        // constraints), so "exactly 3 steps" is prompt-only — the model
        // sometimes appends a trailing empty step despite the instruction.
        // Drop anything without a real title rather than ship it.
        parsed.roadmapSteps = parsed.roadmapSteps.filter((s) => s?.title?.trim());
        return { diagnostic: parsed };
      } catch {
        return { errorCode: "generic", status: 502 };
      }
    };

    let result = await requestDiagnostic();
    if ("diagnostic" in result && looksGarbled(result.diagnostic)) {
      result = await requestDiagnostic(); // one retry on a rare decoding artifact
    }
    if (!("diagnostic" in result)) return jsonError(result.errorCode, result.status);
    const { diagnostic } = result;

    const pdfBuffer = await buildDiagnosticPdf(diagnostic, locale);

    return NextResponse.json({
      diagnostic,
      pdfBase64: pdfBuffer.toString("base64"),
    });
  } catch (error) {
    const code = mapUpstreamError(error);
    return jsonError(code, code === "generic" ? 500 : 502);
  }
}
