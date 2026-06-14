"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { POD_VS_HIRE_DEFAULTS, type PodVsHireText } from "@/lib/content/widgets";

function NumField({
  id,
  label,
  value,
  min,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="text-soft text-[13px] font-sans">{label}</span>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
        className="bg-transparent text-white font-sans text-[15px] py-2 px-3 border border-line-soft rounded-lg outline-none focus:border-accent transition-colors"
      />
    </label>
  );
}

export function PodVsHireCalculator({
  t,
  locale,
}: {
  t: PodVsHireText;
  locale: string;
}) {
  const [hireCost, setHireCost] = useState<number>(
    POD_VS_HIRE_DEFAULTS.hireCost,
  );
  const [podCost, setPodCost] = useState<number>(POD_VS_HIRE_DEFAULTS.podCost);
  const [years, setYears] = useState<number>(POD_VS_HIRE_DEFAULTS.years);
  const [buildsPerYear, setBuildsPerYear] = useState<number>(
    POD_VS_HIRE_DEFAULTS.buildsPerYear,
  );

  const eur = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const hireTotal = hireCost * years;
  const podTotal = podCost * buildsPerYear * years;
  const diff = Math.abs(hireTotal - podTotal);

  let verdictLine: string;
  if (Math.round(diff) === 0) verdictLine = t.evenLabel;
  else if (podTotal < hireTotal)
    verdictLine = t.podWins.replace("{amount}", eur.format(diff));
  else verdictLine = t.hireWins.replace("{amount}", eur.format(diff));

  const winnerIsPod = podTotal < hireTotal;

  return (
    <div className="bg-card border border-line-soft rounded-[20px] p-6 md:p-7">
      <div className="font-pixel text-[8px] tracking-[0.15em] text-accent uppercase mb-2">
        Interactive
      </div>
      <h3 className="font-sans font-bold text-white text-[18px] md:text-[20px] mb-2">
        {t.title}
      </h3>
      <p className="text-soft text-[14px] leading-[1.6] mb-6">{t.intro}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumField
          id="pvh-hire"
          label={t.fields.hireCost}
          value={hireCost}
          min={0}
          step={5000}
          onChange={setHireCost}
        />
        <NumField
          id="pvh-pod"
          label={t.fields.podCost}
          value={podCost}
          min={0}
          step={5000}
          onChange={setPodCost}
        />
        <NumField
          id="pvh-years"
          label={t.fields.years}
          value={years}
          min={1}
          step={1}
          onChange={setYears}
        />
        <NumField
          id="pvh-builds"
          label={t.fields.buildsPerYear}
          value={buildsPerYear}
          min={1}
          step={1}
          onChange={setBuildsPerYear}
        />
      </div>

      <div
        aria-live="polite"
        className="mt-6 pt-6 border-t border-line-soft"
      >
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div
            className={`rounded-xl border p-4 ${winnerIsPod ? "border-line-soft" : "border-accent/50 bg-accent/5"}`}
          >
            <div className="text-muted text-[12px] font-sans mb-1">
              {t.hireTotalLabel}
            </div>
            <div className="text-white font-sans font-bold text-[20px] tabular-nums">
              {eur.format(hireTotal)}
            </div>
          </div>
          <div
            className={`rounded-xl border p-4 ${winnerIsPod ? "border-accent/50 bg-accent/5" : "border-line-soft"}`}
          >
            <div className="text-muted text-[12px] font-sans mb-1">
              {t.podTotalLabel}
            </div>
            <div className="text-white font-sans font-bold text-[20px] tabular-nums">
              {eur.format(podTotal)}
            </div>
          </div>
        </div>
        <p className="text-soft text-[14px] leading-[1.65] mb-3">
          {verdictLine}
        </p>
        <p className="text-soft text-[13px] leading-[1.6] mb-3">{t.note}</p>
        <p className="text-muted text-[11px] leading-[1.55] mb-5 italic">
          {t.disclaimer}
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
