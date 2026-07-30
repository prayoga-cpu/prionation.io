import "server-only";

export type Currency = "EUR" | "USD" | "IDR";

// null means the live rate couldn't be fetched — never fall back to a
// hardcoded guess, since a stale rate presented as current would be
// misleading (no-fabricated-data). The toggle disables that currency
// instead.
export type FxRates = Record<Currency, number | null>;

export type FxSnapshot = {
  rates: FxRates;
  fetchedAt: string;
};

// Cached via the fetch()'s own `next.revalidate` below — Next's fetch cache
// handles this natively, no unstable_cache wrapper needed.
export async function fetchFxRates(): Promise<FxSnapshot> {
  try {
    // Frankfurter: free, no API key, ECB reference rates, EUR-native base —
    // matches the fact every figure in this dashboard is already stored as
    // an EUR-normalized amount.
    const res = await fetch("https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD,IDR", {
      next: { revalidate: 3600, tags: ["finance-fx-rates"] },
    });
    if (!res.ok) throw new Error(`Frankfurter API responded ${res.status}`);
    const data: { date: string; rates: Record<string, number> } = await res.json();
    return {
      rates: {
        EUR: 1,
        USD: typeof data.rates.USD === "number" ? data.rates.USD : null,
        IDR: typeof data.rates.IDR === "number" ? data.rates.IDR : null,
      },
      fetchedAt: data.date,
    };
  } catch (e) {
    console.error("[finance] fetchFxRates failed — USD/IDR will be disabled", e);
    return { rates: { EUR: 1, USD: null, IDR: null }, fetchedAt: new Date().toISOString() };
  }
}
