import type { WidgetText } from "./widgets";

export const en: WidgetText = {
  buildVsBuy: {
    title: "Build vs buy: score your workflow",
    intro:
      "Answer six questions about the workflow you are weighing. The tool turns them into a direction — build, buy, or hybrid — using the same logic a Diagnostic applies. Treat the result as the start of a scoping conversation, not a verdict.",
    questions: [
      {
        label:
          "Annual cost of running this workflow today (fully loaded, including people)",
        options: ["Low", "Moderate", "High"],
      },
      {
        label: "How often it runs",
        options: ["Low volume", "Steady", "High volume"],
      },
      {
        label: "How specific it is to how you compete",
        options: ["Generic — any company has it", "Mixed", "Highly specific to us"],
      },
      {
        label: "Data sensitivity",
        options: [
          "Can leave our environment",
          "Some constraints",
          "Must stay in-house",
        ],
      },
      {
        label: "Existing SaaS that already covers it",
        options: ["A strong product exists", "Partial coverage", "Little or none"],
      },
      {
        label: "How long you will rely on this workflow",
        options: ["Under a year", "One to three years", "Multi-year"],
      },
    ],
    resultLabel: "Recommended direction",
    scoreNote:
      "Where two answers pull in opposite directions, specificity is the tie-breaker — how unique the workflow is to how you compete.",
    verdicts: {
      build: {
        title: "Build",
        body: "The signals point to a custom build: the workflow is specific, costly or high-volume, or constrained by data that cannot leave your environment, and you will rely on it for years. The next step is a two-week Diagnostic to map the bottleneck and price a fixed Build.",
      },
      hybrid: {
        title: "Hybrid",
        body: "The core looks generic but the last mile is yours. Buy the commodity layer and build only the thin differentiating layer on top — where most mid-market AI wins actually live. A Diagnostic can confirm exactly where that line falls.",
      },
      buy: {
        title: "Buy",
        body: "This workflow is generic and well-served by mature SaaS — you should not build commodity infrastructure. Your next step is vendor selection, not an engagement. If that changes as you grow, the build case is easy to revisit.",
      },
    },
    cta: "Map it in a Diagnostic",
  },
  podVsHire: {
    title: "Pod vs hire: estimate the real cost",
    intro:
      "Compare a fixed-price pod to an in-house AI hire over your time horizon. The defaults come from figures published on this site; every input is editable, and the output is an estimate to frame the decision — not a quote.",
    fields: {
      hireCost: "Fully loaded cost of one senior AI hire (€/year)",
      podCost: "Fixed price per Build (€)",
      years: "Time horizon (years)",
      buildsPerYear: "Builds you expect per year",
    },
    hireTotalLabel: "In-house hire",
    podTotalLabel: "PRIONATION pods",
    podWins:
      "Over this horizon, pods come out roughly {amount} cheaper — and you carry no recruitment, ramp, or hire-quality risk.",
    hireWins:
      "Over this horizon, an internal team comes out roughly {amount} cheaper — a sign your AI roadmap may be permanent enough to hire against.",
    evenLabel:
      "Over this horizon the two are roughly even — the deciding factor becomes risk, speed, and how permanent the roadmap is.",
    note: "The common path is sequential: ship the first builds with pods to prove value, then hire against a proven roadmap — inheriting a running system, not a black box. A hire also carries a 3–6 month ramp and recruitment cost this estimate does not add.",
    disclaimer:
      "Estimate only, based on your inputs and public pricing. Not a quote. A hire is one engineer; a pod is a senior team with evals, telemetry, and a four-week warranty.",
    cta: "Get a fixed Build price",
  },
  readiness: {
    title: "Are you ready for an 8-week build?",
    intro:
      "Rate yourself across the five preconditions an eight-week fixed-price build depends on. A gap is not a disqualification — it is a thing to close before the clock starts, which is exactly what a Diagnostic does.",
    areas: [
      "Representative data exists, is accessible, and is good enough to build evals from",
      "One accountable decision-maker owns the outcome — not a committee",
      "You can state what 'working' means in measurable terms",
      "A team can provision in your environment without a months-long approval chain",
      "The budget and the eight-week calendar are genuinely committed",
    ],
    scale: ["No", "Partly", "Yes"],
    resultLabel: "Your readiness",
    verdicts: {
      ready: {
        title: "Build-ready",
        body: "You are strong across the preconditions, so a Build can start with confidence and the fixed price is low-risk. The Diagnostic becomes a short confirmation rather than groundwork.",
      },
      partial: {
        title: "Almost there — close the gaps",
        body: "Most of the foundation is in place. Firm up the areas below first; a Diagnostic can do that work and produce the build plan in the same step.",
      },
      diagnostic: {
        title: "Start with a Diagnostic",
        body: "Enough preconditions are open that starting a Build now would be risky. A two-week Diagnostic exists precisely to resolve these unknowns and turn a 'not yet' into a 'ready'.",
      },
    },
    weakLabel: "Areas to firm up first",
    cta: "Start a Diagnostic",
  },
};
