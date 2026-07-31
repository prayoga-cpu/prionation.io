import { describe, it, expect } from 'vitest';
import { toEur } from '@/lib/finance/fx';

const RATES = { EUR: 1, USD: 1.1, IDR: 20000 };

describe('toEur', () => {
  it('passes EUR amounts through unchanged', () => {
    expect(toEur(500, 'EUR', RATES)).toBe(500);
  });

  it('treats a null currency as already-EUR (native Amount fields with no Currency set)', () => {
    expect(toEur(500, null, RATES)).toBe(500);
  });

  it('converts a non-EUR native amount using the live rate', () => {
    expect(toEur(4_000_000, 'IDR', RATES)).toBe(200);
    expect(toEur(110, 'USD', RATES)).toBeCloseTo(100, 5);
  });

  it('returns null for an amount that is null', () => {
    expect(toEur(null, 'EUR', RATES)).toBeNull();
  });

  it('returns null (never guesses) for an unsupported currency code', () => {
    expect(toEur(100, 'GBP', RATES)).toBeNull();
  });

  it('returns null when the live rate for a known currency is unavailable', () => {
    expect(toEur(100, 'IDR', { EUR: 1, USD: 1.1, IDR: null })).toBeNull();
  });
});
