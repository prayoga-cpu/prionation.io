"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { CHART } from "@/lib/finance/chartTokens";
import type { computePipelineByStage } from "@/lib/finance/notion/aggregate";

type Stages = ReturnType<typeof computePipelineByStage>;

function StageTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{ background: CHART.tooltipBg, border: `1px solid ${CHART.tooltipBorder}` }}
      className="rounded-lg px-3 py-2"
    >
      <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase mb-1">{label}</p>
      <p className="font-sans text-[12px] text-white">{payload[0].value}</p>
    </div>
  );
}

export function PipelineByStage({ stages }: { stages: Stages }) {
  if (stages.length === 0) {
    return <p className="font-sans text-[13px] text-muted">No pipeline entries yet.</p>;
  }
  return (
    <div className="bg-card border border-line rounded-xl p-5">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={stages} margin={{ left: 8, right: 16, top: 8 }}>
          <CartesianGrid stroke={CHART.grid} vertical={false} />
          <XAxis
            dataKey="stage"
            tick={{ fill: CHART.text, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide allowDecimals={false} />
          <Tooltip content={<StageTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="count" fill={CHART.accent} radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
