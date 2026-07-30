"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Currency, FxRates } from "@/lib/finance/currency";
import { formatMoney, formatMoneySigned } from "@/lib/finance/format";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: FxRates;
  fetchedAt: string;
  format: (amountEur: number | null) => string;
  formatSigned: (amountEur: number | null) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({
  rates,
  fetchedAt,
  children,
}: {
  rates: FxRates;
  fetchedAt: string;
  children: React.ReactNode;
}) {
  const [currency, setCurrency] = useState<Currency>("EUR");

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      rates,
      fetchedAt,
      format: (amountEur) => formatMoney(amountEur, currency, rates),
      formatSigned: (amountEur) => formatMoneySigned(amountEur, currency, rates),
    }),
    [currency, rates, fetchedAt],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}
