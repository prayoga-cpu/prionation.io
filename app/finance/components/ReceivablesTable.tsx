"use client";

import { formatDate, formatPercent } from "@/lib/finance/format";
import type { computeReceivables } from "@/lib/finance/notion/aggregate";
import { useCurrency } from "./CurrencyContext";

type Receivables = ReturnType<typeof computeReceivables>;

export function ReceivablesTable({ receivables }: { receivables: Receivables }) {
  const { format } = useCurrency();

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-line rounded-xl p-5">
          <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase mb-2">
            Outstanding (potential inflow)
          </p>
          <p className="font-sans text-2xl font-bold text-white">
            {format(receivables.totalPotentialInflow)}
          </p>
        </div>
        <div className="bg-card border border-line rounded-xl p-5">
          <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase mb-2">
            Avg. % paid
          </p>
          <p className="font-sans text-2xl font-bold text-white">
            {formatPercent(receivables.avgPercentPaid)}
          </p>
        </div>
      </div>

      <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase mb-3">
        Overdue ({receivables.overdue.length})
      </p>
      {receivables.overdue.length === 0 ? (
        <p className="font-sans text-[13px] text-muted">Nothing overdue.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line">
                {["Name", "Date", "Potential inflow", "% paid", "Days overdue"].map((h) => (
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
              {receivables.overdue.map((t) => (
                <tr key={t.id} className="border-b border-line/50">
                  <td className="font-sans text-[13px] text-white py-3 pr-4">{t.name || "—"}</td>
                  <td className="font-sans text-[13px] text-soft py-3 pr-4">{formatDate(t.date)}</td>
                  <td className="font-sans text-[13px] text-soft py-3 pr-4">
                    {format(t.potentialInflow)}
                  </td>
                  <td className="font-sans text-[13px] text-soft py-3 pr-4">
                    {formatPercent(t.percentPaid)}
                  </td>
                  <td className="font-sans text-[13px] text-red-400 py-3 pr-4">{t.daysOverdue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
