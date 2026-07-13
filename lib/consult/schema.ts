// Request validation for POST /api/consult. Kept separate from
// lib/forms/schemas.ts — those are Notion form payloads; this is a chat
// history envelope with abuse caps (turns, per-message and total chars).

import { z } from "zod";

export const CONSULT_MAX_USER_TURNS = 10;
export const CONSULT_MAX_MSG_CHARS = 2000;
export const CONSULT_MAX_TOTAL_CHARS = 16000;

// strictObject: rejects extra fields so only {role, content:string} pairs
// ever reach the Anthropic API (no content-block arrays, no injected keys).
const consultMessage = z.strictObject({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(CONSULT_MAX_MSG_CHARS),
});

export const consultRequestSchema = z
  .object({
    messages: z
      .array(consultMessage)
      .min(1)
      .max(CONSULT_MAX_USER_TURNS * 2 - 1),
    locale: z.enum(["en", "fr", "id"]).default("en"),
    // Required on every turn (verified server-side on every request, matching
    // the forms routes) — the client fully controls `messages`, so a history
    // heuristic like "only the first user turn needs a token" is spoofable by
    // simply forging a longer history on the very first real request.
    turnstileToken: z.string().min(1, "Turnstile token required"),
    honeypot: z.string().max(0).optional(),
  })
  .superRefine((data, ctx) => {
    const msgs = data.messages;
    if (msgs[0]?.role !== "user") {
      ctx.addIssue({
        code: "custom",
        message: "First message must be from the user",
        path: ["messages"],
      });
    }
    if (msgs[msgs.length - 1]?.role !== "user") {
      ctx.addIssue({
        code: "custom",
        message: "Last message must be from the user",
        path: ["messages"],
      });
    }
    for (let i = 1; i < msgs.length; i++) {
      if (msgs[i]?.role === msgs[i - 1]?.role) {
        ctx.addIssue({
          code: "custom",
          message: "Roles must alternate between user and assistant",
          path: ["messages", i],
        });
        break;
      }
    }
    const userTurns = msgs.filter((m) => m.role === "user").length;
    if (userTurns > CONSULT_MAX_USER_TURNS) {
      ctx.addIssue({
        code: "custom",
        message: `Conversation exceeds ${CONSULT_MAX_USER_TURNS} user turns`,
        path: ["messages"],
      });
    }
    const totalChars = msgs.reduce((n, m) => n + m.content.length, 0);
    if (totalChars > CONSULT_MAX_TOTAL_CHARS) {
      ctx.addIssue({
        code: "custom",
        message: `Conversation exceeds ${CONSULT_MAX_TOTAL_CHARS} characters`,
        path: ["messages"],
      });
    }
  });

export type ConsultRequest = z.infer<typeof consultRequestSchema>;
