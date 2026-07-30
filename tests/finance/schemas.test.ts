import { describe, it, expect } from 'vitest';
import { requestOtpSchema, verifyOtpSchema } from '@/lib/finance/auth/schemas';

describe('requestOtpSchema', () => {
  it('accepts ceo', () => {
    expect(requestOtpSchema.safeParse({ role: 'ceo' }).success).toBe(true);
  });

  it('accepts cro', () => {
    expect(requestOtpSchema.safeParse({ role: 'cro' }).success).toBe(true);
  });

  it('rejects an arbitrary role', () => {
    expect(requestOtpSchema.safeParse({ role: 'admin' }).success).toBe(false);
  });

  it('rejects a missing role', () => {
    expect(requestOtpSchema.safeParse({}).success).toBe(false);
  });

  it('never accepts an email in place of a role', () => {
    expect(requestOtpSchema.safeParse({ role: 'founder@prionation.io' }).success).toBe(false);
  });
});

describe('verifyOtpSchema', () => {
  const VALID = { role: 'ceo' as const, code: '123456' };

  it('accepts a valid 6-digit code', () => {
    expect(verifyOtpSchema.safeParse(VALID).success).toBe(true);
  });

  it('rejects a 5-digit code', () => {
    expect(verifyOtpSchema.safeParse({ ...VALID, code: '12345' }).success).toBe(false);
  });

  it('rejects a 7-digit code', () => {
    expect(verifyOtpSchema.safeParse({ ...VALID, code: '1234567' }).success).toBe(false);
  });

  it('rejects a non-numeric code', () => {
    expect(verifyOtpSchema.safeParse({ ...VALID, code: 'abcdef' }).success).toBe(false);
  });

  it('rejects an invalid role', () => {
    expect(verifyOtpSchema.safeParse({ ...VALID, role: 'admin' }).success).toBe(false);
  });
});
