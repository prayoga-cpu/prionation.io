"use client";

import Link from "next/link";
import type { computeProfitSplit } from "@/lib/finance/notion/aggregate";
import { useCurrency } from "./CurrencyContext";

type ProfitSplit = ReturnType<typeof computeProfitSplit>;

export function ProfitSplitPanel({ split }: { split: ProfitSplit }) {
  const { format } = useCurrency();

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="bg-card border border-line rounded-xl p-5">
          <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase mb-2">
            Darwin (80%)
          </p>
          <p className="font-sans text-2xl font-bold text-white">{format(split.darwinTotal)}</p>
        </div>
        <div className="bg-card border border-line rounded-xl p-5">
          <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase mb-2">
            Evan (20%)
          </p>
          <p className="font-sans text-2xl font-bold text-white">{format(split.evanTotal)}</p>
        </div>
      </div>

      {split.ownDeals.length > 0 && (
        <p className="font-sans text-[12px] text-muted mb-6">
          Excluded from split ({split.ownDeals.length}):{" "}
          {split.ownDeals.map((d) => `${d.project}, ${format(d.amountEur)}`).join(" · ")} — 100%
          Darwin.{" "}
          <Link href="/finance/terms" className="text-accent hover:text-white transition-colors">
            See terms
          </Link>
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line">
              {["Name", "Project", "Amount", "Darwin cut", "Evan cut", "Own deal"].map((h) => (
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
            {split.breakdown.map((t) => (
              <tr key={t.id} className="border-b border-line/50">
                <td className="font-sans text-[13px] text-white py-3 pr-4">{t.name || "—"}</td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4">{t.project}</td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4">{format(t.amountEur)}</td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4">
                  {format(t.darwinCutEur)}
                </td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4">
                  {format(t.evanCutEur)}
                </td>
                <td className="font-sans text-[13px] py-3 pr-4">
                  {t.ownProfitShareDeal ? (
                    <span className="text-accent">Yes</span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
