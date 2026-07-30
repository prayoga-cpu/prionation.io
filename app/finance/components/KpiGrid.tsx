"use client";

import type { computeKpis } from "@/lib/finance/notion/aggregate";
import { useCurrency } from "./CurrencyContext";

type Kpis = ReturnType<typeof computeKpis>;

export function KpiGrid({ kpis }: { kpis: Kpis }) {
  const { currency, format } = useCurrency();

  const tiles = [
    { label: "Realized income", value: format(kpis.realizedIncome) },
    { label: "Unrealized cashflow", value: format(kpis.unrealizedCashflow) },
    { label: "Total expenses", value: format(kpis.totalExpenses) },
    { label: "Net position", value: format(kpis.netPosition) },
    { label: "Outstanding receivables", value: format(kpis.outstandingReceivables) },
    { label: "Overdue count", value: String(kpis.overdueCount) },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {tiles.map((t) => (
          <div key={t.label} className="bg-card border border-line rounded-xl p-5">
            <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase mb-2">
              {t.label}
            </p>
            <p className="font-sans text-2xl font-bold text-white">{t.value}</p>
          </div>
        ))}
      </div>
      <p className="font-sans text-[11px] text-muted italic mt-4">
        {currency === "EUR"
          ? "EUR figures are converted estimates from native-currency ledger entries, not booked FX rates."
          : `Converted from native-currency ledger entries to EUR, then to ${currency} at a live rate — two layers of estimate, not booked FX.`}
      </p>
    </div>
  );
}
