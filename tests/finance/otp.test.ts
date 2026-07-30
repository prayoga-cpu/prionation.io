import { describe, it, expect } from 'vitest';
import { generateCode } from '@/lib/finance/auth/otp';

// storeOtp/verifyOtp need a live Redis connection (Redis.fromEnv()), so they
// aren't unit tested here — same precedent as lib/security/rate-limit.ts.
describe('generateCode', () => {
  it('always returns a 6-digit numeric string', () => {
    for (let i = 0; i < 200; i++) {
      const code = generateCode();
      expect(code).toMatch(/^\d{6}$/);
    }
  });

  it('pads codes below 100000 with leading zeros', () => {
    // Statistically near-certain within 500 draws (1000/1_000_000 chance each).
    let sawPadded = false;
    for (let i = 0; i < 5000; i++) {
      if (generateCode().startsWith('0')) {
        sawPadded = true;
        break;
      }
    }
    expect(sawPadded).toBe(true);
  });
});
