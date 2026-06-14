"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import {
  BUILD_VS_BUY_WEIGHTS,
  buildVsBuyVerdict,
  type BuildVsBuyText,
} from "@/lib/content/widgets";

const VERDICT_TONE: Record<string, string> = {
  build: "text-accent",
  hybrid: "text-white",
  buy: "text-soft",
};

export function BuildVsBuyCalculator({ t }: { t: BuildVsBuyText }) {
  // Default every answer to the neutral middle option (index 1) → hybrid.
  const [answers, setAnswers] = useState<number[]>(
    () => t.questions.map(() => 1),
  );

  const score = answers.reduce(
    (sum, opt, i) => sum + (BUILD_VS_BUY_WEIGHTS[i]?.[opt] ?? 0),
    0,
  );
  const verdict = buildVsBuyVerdict(score);
  const v = t.verdicts[verdict];

  return (
    <div className="bg-card border border-line-soft rounded-[20px] p-6 md:p-7">
      <div className="font-pixel text-[8px] tracking-[0.15em] text-accent uppercase mb-2">
        Interactive
      </div>
      <h3 className="font-sans font-bold text-white text-[18px] md:text-[20px] mb-2">
        {t.title}
      </h3>
      <p className="text-soft text-[14px] leading-[1.6] mb-6">{t.intro}</p>

      <div className="flex flex-col gap-5">
        {t.questions.map((q, qi) => (
          <fieldset key={qi} className="border-0 p-0 m-0">
            <legend className="text-soft text-[13px] font-sans mb-2 p-0">
              {q.label}
            </legend>
            <div className="flex gap-2" role="group">
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setAnswers((a) => a.map((x, i) => (i === qi ? oi : x)))
                    }
                    className={`flex-1 px-2.5 py-2 rounded-lg text-[12px] md:text-[13px] font-sans leading-tight transition-colors border ${
                      selected
                        ? "bg-accent border-accent text-white"
                        : "border-line-soft text-soft hover:border-soft hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div
        aria-live="polite"
        className="mt-6 pt-6 border-t border-line-soft"
      >
        <div className="font-pixel text-[8px] tracking-[0.15em] text-muted uppercase mb-1">
          {t.resultLabel}
        </div>
        <div
          className={`font-sans font-extrabold text-[22px] mb-2 ${VERDICT_TONE[verdict] ?? "text-white"}`}
        >
          {v.title}
        </div>
        <p className="text-soft text-[14px] leading-[1.65] mb-3">{v.body}</p>
        <p className="text-muted text-[12px] leading-[1.6] mb-5">
          {t.scoreNote}
        </p>
        <Link
          href="/#engage"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-sans font-semibold text-[13px] hover:bg-accent/90 transition-colors"
        >
          {t.cta} <span className="text-[11px] opacity-80">→</span>
        </Link>
      </div>
    </div>
  );
}
