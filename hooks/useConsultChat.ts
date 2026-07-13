"use client";

// Shared client brain for the AI Consultation chat. Used by both surfaces:
// the Hero terminal (compact) and the /consult page (full panel). Owns the
// conversation state, the SSE fetch to /api/consult, abort/stop, turn caps,
// and funnel analytics. Message shape matches Hero's local Msg type.

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics/events";
import { getAttribution } from "@/lib/analytics/attribution";

// Mirrors CONSULT_MAX_USER_TURNS in lib/consult/schema.ts (server is
// authoritative; this constant only drives client-side UI gating).
export const CONSULT_TURNS_MAX = 10;

export type ConsultMsg = { role: "ai" | "user"; text: string };
export type ConsultStatus = "idle" | "streaming" | "done" | "error";
export type ConsultSurface = "hero" | "page";

// Maps server/machine error codes to Consult.* i18n keys (shared by both surfaces).
export function consultErrorKey(
  code: string,
):
  | "error_generic"
  | "error_rate_limited"
  | "error_busy"
  | "error_verification"
  | "error_turn_limit" {
  switch (code) {
    case "rate_limited":
      return "error_rate_limited";
    case "upstream_rate_limited":
    case "upstream_busy":
      return "error_busy";
    case "verification":
      return "error_verification";
    case "turn_limit":
      return "error_turn_limit";
    default:
      return "error_generic";
  }
}

type Frame =
  | { type: "delta"; text: string }
  | {
      type: "done";
      stopReason: string | null;
      turnsUsed: number;
      turnsMax: number;
      outputTokens: number;
    }
  | { type: "error"; code: string };

export function useConsultChat({
  locale,
  surface,
}: {
  locale: string;
  surface: ConsultSurface;
}) {
  const [messages, setMessages] = useState<ConsultMsg[]>([]);
  const [status, setStatus] = useState<ConsultStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<"refusal" | "truncated" | null>(null);
  // Set when a failed turn was rolled back — surfaces restore it into the input.
  const [lastFailedText, setLastFailedText] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const startedRef = useRef(false);
  // Mirror of `messages` for building the request history without stale
  // closures (state updates during streaming are functional).
  const messagesRef = useRef<ConsultMsg[]>([]);

  const turnsUsed = messages.filter((m) => m.role === "user").length;
  const limitReached = turnsUsed >= CONSULT_TURNS_MAX;

  useEffect(() => () => abortRef.current?.abort(), []);

  const setAll = (next: ConsultMsg[]) => {
    messagesRef.current = next;
    setMessages(next);
  };

  const appendToLastAi = (text: string) => {
    setMessages((prev) => {
      const next = prev.slice();
      const last = next[next.length - 1];
      if (last && last.role === "ai") {
        next[next.length - 1] = { role: "ai", text: last.text + text };
      }
      messagesRef.current = next;
      return next;
    });
  };

  const send = useCallback(
    async (text: string, turnstileToken?: string) => {
      const trimmed = text.trim();
      // abortRef.current is a ref (always current), unlike `status`, which can
      // be a stale closure value across two invocations fired before a render
      // flushes (e.g. double Enter) — this is the authoritative in-flight guard.
      if (!trimmed || abortRef.current || limitReached) return;

      const turn = messagesRef.current.filter((m) => m.role === "user").length + 1;
      if (!startedRef.current) {
        startedRef.current = true;
        trackEvent("consult_started", {
          surface,
          locale,
          channel: getAttribution().channel ?? "unknown",
        });
      }
      trackEvent("consult_message_sent", { surface, turn });

      const history = [...messagesRef.current, { role: "user" as const, text: trimmed }];
      setAll([...history, { role: "ai", text: "" }]);
      setStatus("streaming");
      setError(null);
      setNotice(null);
      setLastFailedText(null);

      const controller = new AbortController();
      abortRef.current = controller;
      // True unless a newer send()/reset() has since replaced abortRef — guards
      // every state-mutating step below against a stale, superseded completion
      // (e.g. this request finishing/aborting after reset() already cleared
      // the conversation) so it can never clobber newer state.
      const isActive = () => abortRef.current === controller;
      const clearIfActive = () => {
        if (isActive()) abortRef.current = null;
      };

      // Drops a still-empty trailing AI placeholder so the next send rebuilds
      // a valid, zod-acceptable alternating history — an empty assistant
      // message otherwise 400s every retry forever. Shared by the abort,
      // clean-close, and error paths.
      const rollbackEmptyReply = () => {
        const cur = messagesRef.current;
        const last = cur[cur.length - 1];
        if (last?.role === "ai" && last.text === "") {
          const next = cur.slice(0, -1);
          messagesRef.current = next;
          setMessages(next);
        }
      };

      const fail = (code: string) => {
        if (!isActive()) return;
        trackEvent("consult_error", { surface, code });
        rollbackEmptyReply();
        // If the user turn itself never got a reply attempt, drop it too, so
        // a retry doesn't produce [user, user] (non-alternating, rejected).
        if (messagesRef.current[messagesRef.current.length - 1]?.role === "user") {
          const next = messagesRef.current.slice(0, -1);
          messagesRef.current = next;
          setMessages(next);
          setLastFailedText(trimmed);
        }
        setError(code);
        setStatus("error");
        clearIfActive();
      };

      try {
        const res = await fetch("/api/consult", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            messages: history.map((m) => ({
              role: m.role === "ai" ? "assistant" : "user",
              content: m.text,
            })),
            locale,
            ...(turnstileToken ? { turnstileToken } : {}),
          }),
        });
        if (!isActive()) return;

        if (!res.ok || !res.body) {
          const payload = await res.json().catch(() => null);
          if (!isActive()) return;
          fail(payload?.error?.code ?? "generic");
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let finished = false;

        while (!finished) {
          const { done, value } = await reader.read();
          if (!isActive()) return;
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() ?? "";
          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith("data: ")) continue;
            let frame: Frame;
            try {
              frame = JSON.parse(line.slice(6)) as Frame;
            } catch {
              continue;
            }
            if (frame.type === "delta") {
              appendToLastAi(frame.text);
            } else if (frame.type === "done") {
              finished = true;
              setStatus("done");
              if (frame.stopReason === "refusal") setNotice("refusal");
              else if (frame.stopReason === "max_tokens") setNotice("truncated");
              trackEvent("consult_response_completed", {
                surface,
                turn,
                outputTokens: frame.outputTokens,
                stopReason: frame.stopReason ?? "unknown",
              });
              clearIfActive();
              break;
            } else if (frame.type === "error") {
              finished = true;
              fail(frame.code);
              break;
            }
          }
        }
        // Stream closed without a done/error frame (e.g. server crash) — treat
        // as a truncated completion rather than silently leaving an empty
        // reply that would wedge the next send.
        if (!finished && isActive()) {
          rollbackEmptyReply();
          setStatus("done");
          clearIfActive();
        }
      } catch (err) {
        if (!isActive()) return;
        if ((err as Error)?.name === "AbortError") {
          // User pressed stop — keep any partial reply text, but drop it if
          // stop landed before the first token arrived (empty content would
          // otherwise 400 every subsequent send).
          rollbackEmptyReply();
          setStatus("done");
          clearIfActive();
          return;
        }
        fail("generic");
      }
    },
    [locale, surface, limitReached],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    // Detach from any in-flight request first — its eventual completion/abort
    // must not resurrect state after this reset (see isActive() in send()).
    abortRef.current?.abort();
    abortRef.current = null;
    setAll([]);
    setStatus("idle");
    setError(null);
    setNotice(null);
    setLastFailedText(null);
  }, []);

  const transcriptText = useCallback(
    () =>
      messagesRef.current
        .filter((m) => m.text.trim())
        .map((m) => `${m.role === "user" ? "USER" : "AI"}: ${m.text}`)
        .join("\n"),
    [],
  );

  return {
    messages,
    status,
    error,
    notice,
    lastFailedText,
    turnsUsed,
    turnsMax: CONSULT_TURNS_MAX,
    limitReached,
    send,
    stop,
    reset,
    transcriptText,
  };
}
