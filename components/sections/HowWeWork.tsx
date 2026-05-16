"use client";

import { Dot } from "../ui/Atoms";

const compareRows = [
  {
    label: "Time to value",
    them: "4–6 months to hire + ramp",
    us: "8 weeks to production",
    highlight: true,
  },
  {
    label: "Cost (first deliverable)",
    them: "€120–180K/year fully loaded",
    us: "€25–55K fixed per project",
  },
  {
    label: "What you get",
    them: "One person",
    us: "A pod — 2–3 AI Product Engineers",
    highlight: true,
  },
  {
    label: "Scope risk",
    them: "Unlimited ongoing changes",
    us: "Tight scope contract from Day 1",
  },
  {
    label: "Retainer cost",
    them: "≈ one engineer/year = €120K+",
    us: "€4–9K/month for the full pod",
    highlight: true,
  },
  {
    label: "Risk",
    them: "Bad hire = 6 months + €50K wasted",
    us: "Walk away after Diagnostic",
  },
];

export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="px-page-x py-[120px] border-y border-line bg-[radial-gradient(circle_at_50%_50%,rgba(88,101,242,0.05)_0%,transparent_70%)]"
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-muted font-pixel text-[10px] tracking-[0.15em] mb-4 flex items-center gap-2.5 uppercase">
            <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
            01 · HOW WE WORK
          </div>
          <h3 className="font-sans font-extrabold text-[clamp(32px,4.2vw,54px)] leading-[1.02] tracking-[-0.03em] m-0 text-white uppercase">
            A pod beats a hire — every time.
          </h3>
        </div>

        <div className="bg-card border border-line-soft rounded-[28px] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-card-soft border-b border-line-soft">
            <div className="p-3 md:p-6 lg:px-8 flex items-center justify-center md:justify-start">
              <span className="md:hidden font-pixel text-[7px] text-muted tracking-widest">METRIC</span>
            </div>
            <div className="p-3 md:p-6 lg:px-8 border-l border-line-soft font-pixel text-[8px] md:text-[10px] tracking-[0.12em] text-muted uppercase text-center md:text-left">
              IN-HOUSE HIRE
            </div>
            <div className="p-3 md:p-6 lg:px-8 border-l border-line-soft font-pixel text-[8px] md:text-[10px] tracking-[0.12em] text-accent uppercase text-center md:text-left">
              PRIONATION POD
            </div>
          </div>

          {/* Rows */}
          {compareRows.map((r, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1.1fr_1fr_1fr] border-b border-line-soft last:border-0 ${
                r.highlight ? "bg-white/[0.02]" : ""
              }`}
            >
              <div className="p-3 md:p-6 lg:px-8 text-[10px] md:text-[14px] font-sans font-medium text-soft flex items-center leading-tight">
                {r.label}
              </div>
              <div className="p-3 md:p-6 lg:px-8 border-l border-line-soft text-[10px] md:text-[14px] text-red-400/80 flex items-center leading-tight">
                {r.them}
              </div>
              <div
                className={`p-3 md:p-6 lg:px-8 border-l border-line-soft text-[10px] md:text-[14px] flex items-center leading-tight ${
                  r.highlight
                    ? "text-accent font-bold"
                    : "text-green-400/90 font-semibold"
                }`}
              >
                {r.us}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
