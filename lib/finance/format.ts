// Pure formatting helpers — safe in both server and client components (the
// ledger table's client-side sort/filter needs these too).

export function formatEur(amount: number | null): string {
  if (amount === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatEurSigned(amount: number | null): string {
  if (amount === null) return "—";
  const sign = amount > 0 ? "+" : "";
  return `${sign}${formatEur(amount)}`;
}

export function formatPercent(value: number | null): string {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 0 }).format(
    value > 1 ? value / 100 : value,
  );
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

export function formatMonth(yyyyMm: string): string {
  const [y, m] = yyyyMm.split("-").map(Number);
  if (!y || !m) return yyyyMm;
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(
    new Date(y, m - 1, 1),
  );
}
