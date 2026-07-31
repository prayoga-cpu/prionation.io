"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { CHART } from "@/lib/finance/chartTokens";
import { formatMonth } from "@/lib/finance/format";
import { ChartTooltip } from "./ChartTooltip";

type ByProject = { project: string; amountEur: number }[];
type ByCategory = { category: string; amountEur: number }[];
type ByMonth = { month: string; amountEur: number }[];

const truncateTick = (value: string) => (value.length > 12 ? `${value.slice(0, 12)}…` : value);

function BarPanel({ label, data, xKey }: { label: string; data: { amountEur: number }[]; xKey: string }) {
  return (
    <div className="bg-card border border-line rounded-xl p-4 sm:p-5">
      <p className="font-pixel text-[7px] sm:text-[8px] tracking-[0.1em] text-muted uppercase mb-3 sm:mb-4">
        {label}
      </p>
      {data.length === 0 ? (
        <p className="font-sans text-[13px] text-muted">No income recorded yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(160, data.length * 34)}>
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 16 }}>
            <CartesianGrid stroke={CHART.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey={xKey}
              width={92}
              tickFormatter={truncateTick}
              tick={{ fill: CHART.text, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="amountEur" fill={CHART.accent} radius={[0, 4, 4, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export function IncomeByProject({
  byProject,
  byCategory,
  byMonth,
}: {
  byProject: ByProject;
  byCategory: ByCategory;
  byMonth: ByMonth;
}) {
  const monthData = byMonth.map((m) => ({ ...m, label: formatMonth(m.month) }));

  return (
    <div className="space-y-4">
      <BarPanel label="By project" data={byProject} xKey="project" />
      <BarPanel label="By category" data={byCategory} xKey="category" />
      <div className="bg-card border border-line rounded-xl p-4 sm:p-5">
        <p className="font-pixel text-[7px] sm:text-[8px] tracking-[0.1em] text-muted uppercase mb-3 sm:mb-4">
          By month
        </p>
        {monthData.length === 0 ? (
          <p className="font-sans text-[13px] text-muted">No dated income recorded yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthData} margin={{ left: 8, right: 16, top: 8 }}>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: CHART.text, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: CHART.grid }} />
              <Line
                type="monotone"
                dataKey="amountEur"
                stroke={CHART.accent}
                strokeWidth={2}
                dot={{ r: 3, fill: CHART.accent }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
