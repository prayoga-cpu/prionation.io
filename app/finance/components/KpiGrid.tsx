"use client";

import { useState } from "react";
import type { computeKpis } from "@/lib/finance/notion/aggregate";
import type { Transaction } from "@/lib/finance/notion/types";
import type { FxRates } from "@/lib/finance/currency";
import { toEur } from "@/lib/finance/fx";
import { useCurrency } from "./CurrencyContext";
import { DetailModal, type DetailRow } from "./DetailModal";

type Kpis = ReturnType<typeof computeKpis>;

type TileKey = "realizedIncome" | "unrealizedCashflow" | "totalExpenses" | "outstandingReceivables" | "overdueCount";

function rowsFor(key: TileKey, transactions: Transaction[], rates: FxRates): DetailRow[] {
  switch (key) {
    case "realizedIncome":
      return transactions
        .filter((t) => t.type === "Income")
        .map((t) => ({ id: t.id, name: t.name, amount: t.amountEur, date: t.date }));
    case "unrealizedCashflow":
      return transactions
        .filter((t) => t.type === "Cashflow")
        .map((t) => ({ id: t.id, name: t.name, amount: t.amountEur, date: t.date }));
    case "totalExpenses":
      return transactions
        .filter((t) => t.type === "Expense")
        .map((t) => ({ id: t.id, name: t.name, amount: t.amountEur, date: t.date }));
    case "outstandingReceivables":
      // potentialInflow is native-currency (Invoice Total − Amount Paid),
      // not EUR-normalized — convert per row before display. Excludes rows
      // that are exactly 0 (fully paid — Invoice Total === Amount Paid):
      // they're real, correct zeros, but a "why is this number non-zero"
      // breakdown shouldn't be cluttered with rows contributing nothing.
      return transactions
        .filter((t) => t.potentialInflow !== null && t.potentialInflow !== 0)
        .map((t) => ({
          id: t.id,
          name: t.name,
          amount: toEur(t.potentialInflow, t.currency, rates),
          date: t.date,
          note: t.percentPaid !== null ? `${t.percentPaid}% paid` : undefined,
        }));
    case "overdueCount":
      return transactions
        .filter((t) => (t.daysOverdue ?? 0) > 0)
        .map((t) => ({
          id: t.id,
          name: t.name,
          amount: toEur(t.potentialInflow, t.currency, rates),
          date: t.date,
          note: `${t.daysOverdue} days overdue`,
        }));
  }
}

export function KpiGrid({ kpis, transactions }: { kpis: Kpis; transactions: Transaction[] }) {
  const { currency, format, rates } = useCurrency();
  const [open, setOpen] = useState<TileKey | null>(null);

  const tiles: { key: TileKey | "netPosition"; label: string; value: string; clickable: boolean }[] = [
    { key: "realizedIncome", label: "Realized income", value: format(kpis.realizedIncome), clickable: true },
    { key: "unrealizedCashflow", label: "Unrealized cashflow", value: format(kpis.unrealizedCashflow), clickable: true },
    { key: "totalExpenses", label: "Total expenses", value: format(kpis.totalExpenses), clickable: true },
    { key: "netPosition", label: "Net position", value: format(kpis.netPosition), clickable: false },
    {
      key: "outstandingReceivables",
      label: "Outstanding receivables",
      value: format(kpis.outstandingReceivables),
      clickable: true,
    },
    { key: "overdueCount", label: "Overdue count", value: String(kpis.overdueCount), clickable: true },
  ];

  const modalTile = tiles.find((t) => t.key === open);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {tiles.map((t) => (
          <button
            key={t.key}
            type="button"
            disabled={!t.clickable}
            onClick={() => t.clickable && setOpen(t.key as TileKey)}
            className={`text-left bg-card border border-line rounded-xl p-4 sm:p-5 transition-colors ${
              t.clickable ? "hover:border-accent-30 cursor-pointer" : "cursor-default"
            }`}
          >
            <p className="font-pixel text-[7px] sm:text-[8px] tracking-[0.1em] text-muted uppercase mb-1.5 sm:mb-2">
              {t.label}
            </p>
            <p className="font-sans text-lg sm:text-2xl font-bold text-white break-words">{t.value}</p>
          </button>
        ))}
      </div>
      <p className="font-sans text-[11px] text-muted italic mt-4">
        {currency === "EUR"
          ? "EUR figures are converted estimates from native-currency ledger entries, not booked FX rates."
          : `Converted from native-currency ledger entries to EUR, then to ${currency} at a live rate — two layers of estimate, not booked FX.`}
      </p>

      {modalTile && (
        <DetailModal
          title={modalTile.label}
          subtitle="Transactions contributing to this figure"
          rows={rowsFor(open as TileKey, transactions, rates)}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
