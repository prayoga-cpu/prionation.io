import { describe, it, expect } from 'vitest';
import { intakeSchema } from '@/lib/forms/schemas';
import { evaluateDisqualification } from '@/lib/forms/disqualification';

const VALID_BASE = {
  type: 'intake' as const,
  company: 'Acme Logistics',
  yourName: 'Sarah Tan',
  email: 'sarah@acme.com',
  basedIn: 'Amsterdam, Netherlands',
  stage: '€5–50M' as const,
  bottleneck: 'A'.repeat(120),
  triedSoFar: 'Tried Zapier',
  whyNow: 'Board approved Q3 expansion budget last week.',
  budget: 'Yes' as const,
  startWindow: 'Within 30 days' as const,
  source: 'LinkedIn',
  turnstileToken: 'mock-token',
};

describe('intakeSchema', () => {
  it('accepts a valid payload', () => {
    expect(intakeSchema.safeParse(VALID_BASE).success).toBe(true);
  });

  it('accepts payload without optional fields', () => {
    const { triedSoFar, source, ...rest } = VALID_BASE;
    expect(intakeSchema.safeParse(rest).success).toBe(true);
  });

  it('rejects missing company', () => {
    const result = intakeSchema.safeParse({ ...VALID_BASE, company: '' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = intakeSchema.safeParse({ ...VALID_BASE, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects bottleneck under 100 chars', () => {
    const result = intakeSchema.safeParse({ ...VALID_BASE, bottleneck: 'Too short' });
    expect(result.success).toBe(false);
  });

  it('rejects bottleneck over 2000 chars', () => {
    const result = intakeSchema.safeParse({ ...VALID_BASE, bottleneck: 'A'.repeat(2001) });
    expect(result.success).toBe(false);
  });

  it('rejects whyNow under 20 chars', () => {
    const result = intakeSchema.safeParse({ ...VALID_BASE, whyNow: 'short' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid stage enum', () => {
    const result = intakeSchema.safeParse({ ...VALID_BASE, stage: '€100M+' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid budget enum', () => {
    const result = intakeSchema.safeParse({ ...VALID_BASE, budget: 'Maybe' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid startWindow enum', () => {
    const result = intakeSchema.safeParse({ ...VALID_BASE, startWindow: 'Next year' });
    expect(result.success).toBe(false);
  });

  it('rejects honeypot with content', () => {
    const result = intakeSchema.safeParse({ ...VALID_BASE, honeypot: 'bot-fill' });
    expect(result.success).toBe(false);
  });

  it('accepts empty honeypot', () => {
    const result = intakeSchema.safeParse({ ...VALID_BASE, honeypot: '' });
    expect(result.success).toBe(true);
  });
});

describe('evaluateDisqualification', () => {
  const base = {
    stage: '€5–50M' as const,
    budget: 'Yes' as const,
    bottleneck: 'A'.repeat(150),
  };

  it('passes a qualified lead', () => {
    const r = evaluateDisqualification({ ...VALID_BASE, ...base } as any);
    expect(r.disqualified).toBe(false);
    expect(r.reason).toBe('');
  });

  it('flags <€1M revenue + Not yet budget', () => {
    const r = evaluateDisqualification({
      ...VALID_BASE,
      stage: '<€1M revenue',
      budget: 'Not yet',
      bottleneck: 'A'.repeat(150),
    } as any);
    expect(r.disqualified).toBe(true);
    expect(r.reason).toContain('Revenue stage and budget');
  });

  it('does NOT flag <€1M revenue when budget is Yes', () => {
    const r = evaluateDisqualification({
      ...VALID_BASE,
      stage: '<€1M revenue',
      budget: 'Yes',
      bottleneck: 'A'.repeat(150),
    } as any);
    expect(r.disqualified).toBe(false);
  });

  it('does NOT flag <€1M revenue when budget is Need to confirm', () => {
    const r = evaluateDisqualification({
      ...VALID_BASE,
      stage: '<€1M revenue',
      budget: 'Need to confirm with team',
      bottleneck: 'A'.repeat(150),
    } as any);
    expect(r.disqualified).toBe(false);
  });

  it('flags thin bottleneck under 100 chars', () => {
    const r = evaluateDisqualification({
      ...VALID_BASE,
      stage: '€5–50M',
      budget: 'Yes',
      bottleneck: 'Short answer',
    } as any);
    expect(r.disqualified).toBe(true);
    expect(r.reason).toContain('100 characters');
  });

  it('applies disqualification rules in priority order (revenue+budget checked first)', () => {
    const r = evaluateDisqualification({
      ...VALID_BASE,
      stage: '<€1M revenue',
      budget: 'Not yet',
      bottleneck: 'Short', // also disqualifiable, but revenue rule fires first
    } as any);
    expect(r.disqualified).toBe(true);
    expect(r.reason).toContain('Revenue stage and budget');
  });
});
