"use client";

import { CHART } from "@/lib/finance/chartTokens";
import { formatEur } from "@/lib/finance/format";

type Props = {
  active?: boolean;
  label?: string;
  payload?: { value: number; name?: string }[];
};

export function ChartTooltip({ active, label, payload }: Props) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{ background: CHART.tooltipBg, border: `1px solid ${CHART.tooltipBorder}` }}
      className="rounded-lg px-3 py-2"
    >
      <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase mb-1">
        {label}
      </p>
      {payload.map((p, i) => (
        <p key={i} className="font-sans text-[12px] text-white">
          {formatEur(p.value)}
        </p>
      ))}
    </div>
  );
}
