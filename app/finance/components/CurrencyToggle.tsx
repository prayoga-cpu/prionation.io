"use client";

import type { Currency } from "@/lib/finance/currency";
import { useCurrency } from "./CurrencyContext";

const OPTIONS: Currency[] = ["EUR", "USD", "IDR"];

export function CurrencyToggle() {
  const { currency, setCurrency, rates } = useCurrency();

  return (
    <div className="inline-flex bg-card border border-line rounded-full p-1 gap-1">
      {OPTIONS.map((code) => {
        const unavailable = code !== "EUR" && rates[code] === null;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setCurrency(code)}
            disabled={unavailable}
            title={unavailable ? "Live rate unavailable" : undefined}
            className={`px-3 py-1.5 rounded-full font-pixel text-[9px] tracking-[0.1em] transition-colors disabled:opacity-30 disabled:pointer-events-none ${
              currency === code ? "bg-accent text-white" : "text-muted hover:text-white"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
