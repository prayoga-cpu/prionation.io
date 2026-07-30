import { describe, it, expect, beforeAll } from 'vitest';
import { signFinanceSession, verifyFinanceSession } from '@/lib/finance/auth/session';

beforeAll(() => {
  process.env.FINANCE_JWT_SECRET = 'a'.repeat(64); // test-only, not a real secret
});

describe('finance session sign/verify', () => {
  it('round-trips valid claims', async () => {
    const token = await signFinanceSession({ role: 'ceo', email: 'founder@prionation.io' });
    const claims = await verifyFinanceSession(token);
    expect(claims).toEqual({ role: 'ceo', email: 'founder@prionation.io' });
  });

  it('rejects a garbage token', async () => {
    expect(await verifyFinanceSession('not-a-jwt')).toBeNull();
  });

  it('rejects a token signed with a different secret', async () => {
    const token = await signFinanceSession({ role: 'cro', email: 'cro@prionation.io' });
    process.env.FINANCE_JWT_SECRET = 'b'.repeat(64);
    expect(await verifyFinanceSession(token)).toBeNull();
    process.env.FINANCE_JWT_SECRET = 'a'.repeat(64);
  });

  it('rejects a tampered token', async () => {
    const token = await signFinanceSession({ role: 'ceo', email: 'founder@prionation.io' });
    const tampered = token.slice(0, -4) + 'xxxx';
    expect(await verifyFinanceSession(tampered)).toBeNull();
  });
});
