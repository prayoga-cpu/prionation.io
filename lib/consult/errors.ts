// Shared Anthropic error → machine error-code mapping for the consult routes.
// Most-specific-first; never leaks upstream error detail to the browser.

import Anthropic from "@anthropic-ai/sdk";

export function mapUpstreamError(err: unknown): string {
  if (err instanceof Anthropic.RateLimitError) return "upstream_rate_limited";
  if (
    err instanceof Anthropic.APIConnectionError ||
    err instanceof Anthropic.InternalServerError
  ) {
    return "upstream_busy";
  }
  if (err instanceof Anthropic.APIError) {
    console.error("[consult] Anthropic API error", err.status, err.message);
    return "generic";
  }
  console.error("[consult] Stream error", err);
  return "generic";
}
