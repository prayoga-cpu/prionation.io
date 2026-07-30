"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";
import { CHART } from "@/lib/finance/chartTokens";
import { formatEur, formatEurSigned } from "@/lib/finance/format";
import { ChartTooltip } from "./ChartTooltip";
import type { computeBudgetVsActual } from "@/lib/finance/notion/aggregate";

type BudgetLines = ReturnType<typeof computeBudgetVsActual>;

export function BudgetVsActual({ lines }: { lines: BudgetLines }) {
  const chartData = lines
    .filter((l) => l.variance !== null)
    .map((l) => ({ name: l.name, variance: l.variance as number }));

  return (
    <div>
      {chartData.length > 0 && (
        <div className="bg-card border border-line rounded-xl p-5 mb-4">
          <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase mb-4">
            Variance (actual − budgeted)
          </p>
          <ResponsiveContainer width="100%" height={Math.max(160, chartData.length * 34)}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
              <CartesianGrid stroke={CHART.grid} horizontal={false} />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={140}
                tick={{ fill: CHART.text, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <ReferenceLine x={0} stroke={CHART.axis} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="variance" radius={4} maxBarSize={18}>
                {chartData.map((d, i) => (
                  <Cell key={i} fill={d.variance >= 0 ? CHART.positive : CHART.negative} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line">
              {["Name", "Category", "Budgeted", "Actual", "Variance"].map((h) => (
                <th
                  key={h}
                  className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase pb-3 pr-4"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={`${l.name}-${i}`} className="border-b border-line/50">
                <td className="font-sans text-[13px] text-white py-3 pr-4">{l.name || "—"}</td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4">{l.category ?? "—"}</td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4">
                  {formatEur(l.budgeted)}
                </td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4">{formatEur(l.actual)}</td>
                <td
                  className={`font-sans text-[13px] py-3 pr-4 ${
                    l.variance === null
                      ? "text-muted"
                      : l.variance >= 0
                        ? "text-green-400"
                        : "text-red-400"
                  }`}
                >
                  {formatEurSigned(l.variance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
