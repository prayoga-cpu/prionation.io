"use client";

import { Eyebrow, Btn } from "../ui/Atoms";
import { Typewriter } from "../ui/Typewriter";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const words = [
    "bottlenecks.",
    "manual work.",
    "data silos.",
    "slow processes.",
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden px-page-x pt-[80px] pb-[100px] min-h-screen flex flex-col justify-center"
    >
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(60%_50%_at_12%_18%,var(--c-accent-glow)_0%,transparent_60%),radial-gradient(45%_40%_at_92%_80%,rgba(235,69,159,0.15)_0%,transparent_65%),linear-gradient(180deg,#0c0e1a_0%,#08090d_70%)]" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(70%_70%_at_50%_30%,#000_30%,transparent_80%)]" />
      <div className="relative z-20 max-w-[1100px] mx-auto w-full flex flex-col items-center text-center">
        <Eyebrow>
          AI PRODUCT ENGINEERING{" "}
          <span className="hidden md:block">· v.3.1.0</span>
        </Eyebrow>
        <h1 className="font-display font-normal text-[clamp(44px,5.8vw,80px)] leading-[1.1] md:leading-none tracking-normal text-white my-[26px] text-balance max-w-[20ch] uppercase">
          We build software that{" "}
          <span className="text-accent">break operational</span>
          <br />
          <span className="inline-block bg-[linear-gradient(180deg,#fff_0%,#fff_55%,#babbbe_100%)] bg-clip-text text-transparent">
            <Typewriter words={words} />
          </span>
        </h1>
        <p className="max-w-[58ch] text-soft text-[17px] leading-[1.55] mb-8 mx-0">
          We build production AI infrastructure for European and US-Based
          mid-market companies. Eight weeks, fixed scope, lean pods.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Btn
            variant="primary"
            onClick={() => {
              window.location.hash = "engage?tab=diagnostic";
              scrollTo("engage");
            }}
          >
            Start with a Diagnostic{" "}
            <span className="text-[12px] opacity-80">→</span>
          </Btn>
          <Btn
            variant="ghost"
            onClick={() => {
              window.location.hash = "engage?tab=meet";
              scrollTo("engage");
            }}
          >
            Meet Us
          </Btn>
        </div>
        <div className="mt-[60px] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-[90vw] md:max-w-none">
          {/* Row 1 on mobile: Build Rate */}
          <div className="order-1 md:order-3 flex flex-col items-center gap-1.5 shrink-0 scale-[0.8] md:scale-100 origin-center">
            <div className="flex items-baseline gap-1 md:gap-2">
              <span className="font-pixel text-[24px] md:text-[28px] leading-none text-white">
                <span className="text-[13px] md:text-sm">≥ </span>60%
              </span>
            </div>
            <span className="font-pixel text-[7.5px] md:text-[9px] tracking-[0.1em] md:tracking-[0.15em] text-muted uppercase text-center whitespace-nowrap">
              DIAGNOSTIC → BUILD RATE
            </span>
          </div>

          {/* Row 2 on mobile: Deliverables & Production */}
          <div className="order-2 flex flex-row items-center justify-center gap-8 md:gap-16 w-full md:w-auto">
            <div className="flex flex-col items-center gap-1.5 shrink-0 scale-[0.8] md:scale-100 origin-center">
              <div className="flex items-baseline gap-1 md:gap-2">
                <span className="font-pixel text-[24px] md:text-[28px] leading-none text-white">
                  2
                </span>
                <span className="font-pixel text-[11px] md:text-[13px] text-white/80">
                  weeks
                </span>
              </div>
              <span className="font-pixel text-[7.5px] md:text-[9px] tracking-[0.1em] md:tracking-[0.15em] text-muted uppercase text-center whitespace-nowrap">
                TO FIRST DELIVERABLE
              </span>
            </div>

            <div className="flex flex-col items-center gap-1.5 shrink-0 scale-[0.8] md:scale-100 origin-center">
              <div className="flex items-baseline gap-1 md:gap-2">
                <span className="font-pixel text-[24px] md:text-[28px] leading-none text-white">
                  8
                </span>
                <span className="font-pixel text-[11px] md:text-[13px] text-white/80">
                  weeks
                </span>
              </div>
              <span className="font-pixel text-[7.5px] md:text-[9px] tracking-[0.1em] md:tracking-[0.15em] text-muted uppercase text-center whitespace-nowrap">
                TO PRODUCTION
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
