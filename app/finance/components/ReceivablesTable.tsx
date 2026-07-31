"use client";

import { useState } from "react";
import { formatDate, formatPercent } from "@/lib/finance/format";
import { toEur } from "@/lib/finance/fx";
import type { computeReceivables } from "@/lib/finance/notion/aggregate";
import type { Transaction } from "@/lib/finance/notion/types";
import { useCurrency } from "./CurrencyContext";
import { ExpandableText } from "./ExpandableText";
import { DetailModal } from "./DetailModal";

type Receivables = ReturnType<typeof computeReceivables>;

export function ReceivablesTable({
  receivables,
  transactions,
}: {
  receivables: Receivables;
  transactions: Transaction[];
}) {
  const { format, rates } = useCurrency();
  const [showOutstanding, setShowOutstanding] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <button
          type="button"
          onClick={() => setShowOutstanding(true)}
          className="text-left bg-card border border-line rounded-xl p-4 sm:p-5 hover:border-accent-30 transition-colors"
        >
          <p className="font-pixel text-[7px] sm:text-[8px] tracking-[0.1em] text-muted uppercase mb-1.5 sm:mb-2">
            Outstanding (potential inflow)
          </p>
          <p className="font-sans text-lg sm:text-2xl font-bold text-white break-words">
            {format(receivables.totalPotentialInflow)}
          </p>
        </button>
        <div className="bg-card border border-line rounded-xl p-4 sm:p-5">
          <p className="font-pixel text-[7px] sm:text-[8px] tracking-[0.1em] text-muted uppercase mb-1.5 sm:mb-2">
            Avg. % paid
          </p>
          <p className="font-sans text-lg sm:text-2xl font-bold text-white">
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
        <>
          {/* Mobile: stacked cards */}
          <div className="sm:hidden space-y-2">
            {receivables.overdue.map((t) => (
              <div key={t.id} className="bg-card-soft border border-line rounded-xl p-3.5">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <p className="font-sans text-[13px] text-white leading-snug min-w-0">
                    <ExpandableText text={t.name} maxChars={26} />
                  </p>
                  <p className="font-sans text-[13px] text-white shrink-0 whitespace-nowrap">
                    {format(t.potentialInflowEur)}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] font-sans">
                  <span className="text-muted">
                    {formatDate(t.date)} · {formatPercent(t.percentPaid)} paid
                  </span>
                  <span className="text-red-400">{t.daysOverdue} days overdue</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden sm:block overflow-x-auto">
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
                    <td className="font-sans text-[13px] text-white py-3 pr-4 max-w-[220px]">
                      <ExpandableText text={t.name} maxChars={28} />
                    </td>
                    <td className="font-sans text-[13px] text-soft py-3 pr-4">{formatDate(t.date)}</td>
                    <td className="font-sans text-[13px] text-soft py-3 pr-4">
                      {format(t.potentialInflowEur)}
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
        </>
      )}

      {showOutstanding && (
        <DetailModal
          title="Outstanding (potential inflow)"
          subtitle="Every transaction with a potential inflow figure"
          rows={transactions
            .filter((t) => t.potentialInflow !== null)
            .map((t) => ({
              id: t.id,
              name: t.name,
              amount: toEur(t.potentialInflow, t.currency, rates),
              date: t.date,
              note: t.percentPaid !== null ? `${t.percentPaid}% paid` : undefined,
            }))}
          onClose={() => setShowOutstanding(false)}
        />
      )}
    </div>
  );
}
