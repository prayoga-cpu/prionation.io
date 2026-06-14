// Interactive framework widgets — data layer.
//
// Logic (weights, defaults, thresholds) is locale-independent and lives here
// once. Only the display strings are translated (WIDGET_TEXT, en/fr/id). The
// cost-model defaults are drawn from figures ALREADY published on the site
// (loaded hire €120–180K/yr, 4–6 month ramp, pod Build €25–55K) and are fully
// user-editable — nothing is invented, and the result is an estimate, not a quote.

export type WidgetSlug =
  | "ai-build-vs-buy-calculator"
  | "pod-vs-hire-cost-model"
  | "8-week-build-readiness-checklist";

// ── Shared logic config ──────────────────────────────────────────────────────

// Build-vs-buy: 6 questions, each option scored from buy (−1) to build (+1).
export const BUILD_VS_BUY_WEIGHTS: [number, number, number][] = [
  [-1, 0, 1], // annual cost of the workflow
  [-1, 0, 1], // monthly volume
  [-1, 0, 1], // specificity to your business
  [-1, 0, 1], // data sensitivity
  [-1, 0, 1], // existing SaaS coverage (strong product → buy)
  [-1, 0, 1], // time horizon
];
export type BuyBuildVerdict = "build" | "hybrid" | "buy";
export function buildVsBuyVerdict(score: number): BuyBuildVerdict {
  if (score >= 3) return "build";
  if (score <= -3) return "buy";
  return "hybrid";
}

// Pod-vs-hire: editable defaults sourced from published figures.
export const POD_VS_HIRE_DEFAULTS = {
  hireCost: 150000, // €/yr fully loaded (published range €120–180K / €150–250K)
  podCost: 40000, // € per Build (published €25–55K)
  years: 2,
  buildsPerYear: 1,
} as const;

// Readiness: 5 areas, each No(0) / Partial(1) / Yes(2). Max 10.
export type ReadinessVerdict = "ready" | "partial" | "diagnostic";
export function readinessVerdict(score: number): ReadinessVerdict {
  if (score >= 9) return "ready";
  if (score >= 6) return "partial";
  return "diagnostic";
}

// ── Localized text ───────────────────────────────────────────────────────────

export type Verdict = { title: string; body: string };

export type BuildVsBuyText = {
  title: string;
  intro: string;
  questions: { label: string; options: [string, string, string] }[];
  resultLabel: string;
  scoreNote: string;
  verdicts: Record<BuyBuildVerdict, Verdict>;
  cta: string;
};

export type PodVsHireText = {
  title: string;
  intro: string;
  fields: {
    hireCost: string;
    podCost: string;
    years: string;
    buildsPerYear: string;
  };
  hireTotalLabel: string;
  podTotalLabel: string;
  podWins: string; // "{amount}" token replaced in component
  hireWins: string;
  evenLabel: string;
  note: string;
  disclaimer: string;
  cta: string;
};

export type ReadinessText = {
  title: string;
  intro: string;
  areas: string[];
  scale: [string, string, string]; // No / Partial / Yes
  resultLabel: string;
  verdicts: Record<ReadinessVerdict, Verdict>;
  weakLabel: string;
  cta: string;
};

export type WidgetText = {
  buildVsBuy: BuildVsBuyText;
  podVsHire: PodVsHireText;
  readiness: ReadinessText;
};

// Per-locale strings live in widgets.<locale>.ts; en is the fallback.
import { en } from "./widgets.en";
import { fr } from "./widgets.fr";
import { id } from "./widgets.id";

export const WIDGET_TEXT: Record<string, WidgetText> = { en, fr, id };

export function getWidgetText(locale: string): WidgetText {
  return WIDGET_TEXT[locale] ?? WIDGET_TEXT.en;
}
