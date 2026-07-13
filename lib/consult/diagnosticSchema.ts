// Request validation for POST /api/consult/diagnostic (Guided Intake → real
// Claude-generated PDF diagnostic). Single-shot, not a chat history.

import { z } from "zod";

export const diagnosticRequestSchema = z.object({
  // Free text as typed by the visitor — validated as a URL by the route
  // before being embedded in the prompt; optional (fetch is skipped if absent).
  website: z.string().min(1).max(300).optional(),
  industry: z.string().min(1).max(120),
  stage: z.string().min(1).max(60),
  bottleneck: z.string().min(1).max(600),
  locale: z.enum(["en", "fr", "id"]).default("en"),
  turnstileToken: z.string().min(1, "Turnstile token required"),
  honeypot: z.string().max(0).optional(),
});

export type DiagnosticRequest = z.infer<typeof diagnosticRequestSchema>;
