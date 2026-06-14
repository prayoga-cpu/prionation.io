"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { readinessVerdict, type ReadinessText } from "@/lib/content/widgets";

const VERDICT_TONE: Record<string, string> = {
  ready: "text-accent",
  partial: "text-white",
  diagnostic: "text-soft",
};

export function BuildReadinessChecklist({ t }: { t: ReadinessText }) {
  // 0 = No, 1 = Partly, 2 = Yes. Start at No so the score builds up as you rate.
  const [ratings, setRatings] = useState<number[]>(() => t.areas.map(() => 0));

  const score = ratings.reduce((s, x) => s + x, 0);
  const verdict = readinessVerdict(score);
  const v = t.verdicts[verdict];
  const weak = t.areas.filter((_, i) => ratings[i] < 2);

  return (
    <div className="bg-card border border-line-soft rounded-[20px] p-6 md:p-7">
      <div className="font-pixel text-[8px] tracking-[0.15em] text-accent uppercase mb-2">
        Interactive
      </div>
      <h3 className="font-sans font-bold text-white text-[18px] md:text-[20px] mb-2">
        {t.title}
      </h3>
      <p className="text-soft text-[14px] leading-[1.6] mb-6">{t.intro}</p>

      <div className="flex flex-col gap-4">
        {t.areas.map((area, ai) => (
          <fieldset key={ai} className="border-0 p-0 m-0">
            <legend className="text-soft text-[13px] font-sans mb-2 p-0 leading-snug">
              {area}
            </legend>
            <div className="flex gap-2" role="group">
              {t.scale.map((opt, oi) => {
                const selected = ratings[ai] === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setRatings((r) => r.map((x, i) => (i === ai ? oi : x)))
                    }
                    className={`flex-1 px-2.5 py-2 rounded-lg text-[12px] md:text-[13px] font-sans transition-colors border ${
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

      <div aria-live="polite" className="mt-6 pt-6 border-t border-line-soft">
        <div className="flex items-baseline justify-between mb-1">
          <span className="font-pixel text-[8px] tracking-[0.15em] text-muted uppercase">
            {t.resultLabel}
          </span>
          <span className="font-pixel text-[12px] text-soft tabular-nums">
            {score}/10
          </span>
        </div>
        <div
          className={`font-sans font-extrabold text-[22px] mb-2 ${VERDICT_TONE[verdict] ?? "text-white"}`}
        >
          {v.title}
        </div>
        <p className="text-soft text-[14px] leading-[1.65] mb-3">{v.body}</p>

        {weak.length > 0 && (
          <div className="mb-5">
            <div className="text-muted text-[12px] font-sans mb-1.5">
              {t.weakLabel}
            </div>
            <ul className="flex flex-col gap-1">
              {weak.map((area, i) => (
                <li
                  key={i}
                  className="text-soft text-[13px] leading-snug flex gap-2"
                >
                  <span className="text-accent shrink-0" aria-hidden="true">
                    →
                  </span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}

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
