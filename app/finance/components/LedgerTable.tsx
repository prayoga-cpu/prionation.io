"use client";

import { useMemo, useState } from "react";
import { formatDate, formatEur } from "@/lib/finance/format";
import type { Transaction } from "@/lib/finance/notion/types";

type SortKey = "date" | "amountEur" | "name";

export function LedgerTable({ transactions }: { transactions: Transaction[] }) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDesc, setSortDesc] = useState(true);

  const types = useMemo(
    () => ["all", ...new Set(transactions.map((t) => t.type).filter((v): v is string => !!v))],
    [transactions],
  );

  const rows = useMemo(() => {
    let filtered = transactions;
    if (typeFilter !== "all") filtered = filtered.filter((t) => t.type === typeFilter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      filtered = filtered.filter((t) => t.name.toLowerCase().includes(q));
    }
    const sorted = [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "date") cmp = (a.date ?? "").localeCompare(b.date ?? "");
      if (sortKey === "amountEur") cmp = (a.amountEur ?? 0) - (b.amountEur ?? 0);
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      return sortDesc ? -cmp : cmp;
    });
    return sorted;
  }, [transactions, typeFilter, query, sortKey, sortDesc]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) setSortDesc((d) => !d);
    else {
      setSortKey(key);
      setSortDesc(true);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-card border border-line rounded-lg px-3 py-2 text-[13px] font-sans text-white placeholder:text-muted focus:outline-none focus:border-accent-30"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-card border border-line rounded-lg px-3 py-2 text-[13px] font-sans text-white focus:outline-none focus:border-accent-30"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All types" : t}
            </option>
          ))}
        </select>
        <p className="font-sans text-[12px] text-muted self-center">
          {rows.length} of {transactions.length}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line">
              {(
                [
                  ["name", "Name"],
                  ["date", "Date"],
                  ["type", "Type"],
                  ["status", "Status"],
                  ["category", "Category"],
                  ["amountEur", "Amount (EUR)"],
                  ["receipt", "Receipt"],
                ] as const
              ).map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => (key === "date" || key === "amountEur" || key === "name") && toggleSort(key)}
                  className={`font-pixel text-[8px] tracking-[0.1em] text-muted uppercase pb-3 pr-4 whitespace-nowrap ${
                    key === "date" || key === "amountEur" || key === "name"
                      ? "cursor-pointer hover:text-white"
                      : ""
                  }`}
                >
                  {label}
                  {sortKey === key ? (sortDesc ? " ↓" : " ↑") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="border-b border-line/50">
                <td className="font-sans text-[13px] text-white py-3 pr-4">{t.name || "—"}</td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4 whitespace-nowrap">
                  {formatDate(t.date)}
                </td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4">{t.type ?? "—"}</td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4">{t.status ?? "—"}</td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4">{t.category ?? "—"}</td>
                <td className="font-sans text-[13px] text-soft py-3 pr-4 whitespace-nowrap">
                  {formatEur(t.amountEur)}
                </td>
                <td className="font-sans text-[13px] py-3 pr-4">
                  {t.hasReceipt ? (
                    <span className="text-green-400">Yes</span>
                  ) : (
                    <span className="text-red-400">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="font-sans text-[13px] text-muted py-6 text-center">No matching transactions.</p>
        )}
      </div>
    </div>
  );
}
