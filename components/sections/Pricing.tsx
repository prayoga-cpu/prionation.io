"use client";

import { Dot, Btn } from "../ui/Atoms";
import { Icon } from "../icons";

const plans = [
  {
    name: "Diagnostic",
    label: "SKU 1",
    price: "5–7K",
    period: "fixed · 2 weeks",
    desc: "Map the bottleneck. Get the build spec. Sign without procurement.",
    cta: "Start the Diagnostic",
    features: [
      "Embed with ops & engineering",
      "Target users + data inventory",
      "System architecture design",
      "Eval criteria + ROI projection",
      "8-week build plan",
      "15–25 page doc + 90-min readout",
    ],
  },
  {
    name: "Build",
    label: "SKU 2",
    price: "25–55K",
    period: "fixed · 8 weeks",
    desc: "Ship production AI. Fixed scope, protected by the Diagnostic contract.",
    cta: "Get started",
    featured: true,
    features: [
      "2–3 AI Product Engineers",
      "Production-deployed software",
      "Eval harness + regression suite",
      "Telemetry & monitoring",
      "Runbook + handoff documentation",
      "4-week post-launch warranty",
    ],
  },
  {
    name: "Retainer",
    label: "SKU 3",
    price: "4–9K",
    period: "/month · min. 6 months",
    desc: "Ongoing pod access. The only SKU that compounds.",
    cta: "Talk about a retainer",
    features: [
      "Eval suite maintenance",
      "Drift detection",
      "Prompt & model upgrades",
      "1 new feature shipped/month",
      "Quarterly business reviews",
      "Continuous ROI tracking",
    ],
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="px-page-x py-[140px] relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_20%_80%,rgba(88,101,242,0.03)_0%,transparent_60%)]" />

      <div className="max-w-max-w mx-auto relative z-20">
        <div className="flex flex-col mb-16">
          <div className="text-muted font-pixel text-[10px] tracking-[0.15em] mb-4 flex items-center gap-2.5 uppercase">
            <Dot className="shadow-[0_0_10px_var(--c-accent)]" />
            04 · PRICING
          </div>
          <h2 className="font-sans font-extrabold text-[clamp(32px,4.2vw,54px)] leading-[1.02] tracking-[-0.03em] m-0 text-white uppercase max-w-[15ch]">
            Fixed scope, zero surprises.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`relative group rounded-[28px] p-8 flex flex-col transition-all duration-300 ${
                p.featured
                  ? "bg-white/[0.04] border border-accent/40 shadow-[0_0_40px_rgba(88,101,242,0.1)]"
                  : "bg-card border border-line-soft hover:border-soft"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white font-pixel text-[8px] tracking-[0.1em] px-3 py-1 rounded-full uppercase shadow-lg z-30">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <span className="font-pixel text-[9px] tracking-[0.12em] text-muted uppercase">
                  {p.label} · {p.name}
                </span>
                <h3 className="font-sans font-bold text-[28px] text-white mt-3 mb-1">
                  {p.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-white font-sans font-extrabold text-[36px]">
                    €{p.price}
                  </span>
                  <span className="text-muted font-sans text-[14px]">
                    {p.period}
                  </span>
                </div>
                <p className="text-soft text-[14px] leading-[1.6] mt-4 min-h-[48px]">
                  {p.desc}
                </p>
              </div>

              <div className="flex-grow">
                <ul className="list-none p-0 m-0 flex flex-col gap-4">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-[14px] text-soft"
                    >
                      <Icon
                        name="check-circle"
                        size={16}
                        className="text-accent shrink-0 mt-0.5"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <Btn
                  variant={p.featured ? "primary" : "ghost"}
                  className="w-full justify-center"
                  onClick={() => {
                    window.location.hash = "engage?tab=diagnostic";
                    scrollTo("engage");
                  }}
                >
                  {p.cta} <span className="text-[12px] opacity-80 ml-1">→</span>
                </Btn>
              </div>
            </div>
          ))}
        </div>

        {/* Express Site Add-on */}
        <div className="mt-20 flex justify-center">
          <div
            className="bg-[#0c0d12] border border-line-soft rounded-[24px] p-6 md:p-8 flex flex-col items-center text-center gap-6 relative overflow-hidden group max-w-[540px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02]"
            style={{
              animation: "pn-float 6s ease-in-out infinite",
            }}
          >
            <style jsx>{`
              @keyframes pn-float {
                0%,
                100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-12px);
                }
              }
            `}</style>
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(88,242,135,0.08)_0%,transparent_70%)]" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 shadow-inner">
                <span
                  className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  style={{ textShadow: "0 0 0 #000, 0 0 2px #000" }}
                >
                  ⚡
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-sans font-bold text-[22px] text-white">
                  Express Site
                </h3>
                <span className="bg-green-500/10 text-green-400 font-pixel text-[8px] tracking-[0.1em] px-2.5 py-1 rounded-full uppercase border border-green-500/20">
                  NEW
                </span>
              </div>
              <p className="text-soft text-[14px] leading-[1.5] max-w-[34ch] mb-6">
                3-page Next.js site, contact form, SEO, Vercel deploy —{" "}
                <b className="text-white font-semibold">5 business days</b>.
              </p>

              <div className="flex flex-col items-center gap-4">
                <div className="font-sans font-extrabold text-[28px] text-green-400">
                  €1,500{" "}
                  <span className="text-[12px] text-muted font-normal uppercase tracking-wider ml-1">
                    base
                  </span>
                </div>
                <Btn
                  variant="ghost"
                  className="px-8 border-green-500/20 hover:border-green-500/50 hover:text-green-400 bg-green-500/[0.02]"
                  onClick={() => {
                    window.location.hash = "engage?tab=diagnostic";
                    scrollTo("engage");
                  }}
                >
                  See Express{" "}
                  <span className="text-[12px] opacity-80 ml-1">→</span>
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
