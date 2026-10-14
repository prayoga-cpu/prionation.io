import { describe, it, expect } from 'vitest';
import { callbackSchema } from '@/lib/forms/schemas';

const VALID_BASE = {
  type: 'callback' as const,
  firstName: 'Claire',
  phone: '06 12 34 56 78',
  company: 'Atelier Martin',
  slot: 'tomorrow_morning' as const,
  locale: 'fr' as const,
  placement: 'hero',
  ref: 'A1',
  turnstileToken: 'mock-token',
};

describe('callbackSchema', () => {
  it('accepts a valid payload', () => {
    expect(callbackSchema.safeParse(VALID_BASE).success).toBe(true);
  });

  it('accepts international format and no company', () => {
    expect(callbackSchema.safeParse({ ...VALID_BASE, phone: '+33 6 12 34 56 78', company: undefined }).success).toBe(true);
  });

  it('rejects an empty first name', () => {
    expect(callbackSchema.safeParse({ ...VALID_BASE, firstName: '  ' }).success).toBe(false);
  });

  it('rejects letters in the phone number', () => {
    expect(callbackSchema.safeParse({ ...VALID_BASE, phone: '06 12 AB 56 78' }).success).toBe(false);
  });

  it('rejects a phone number with too few digits', () => {
    expect(callbackSchema.safeParse({ ...VALID_BASE, phone: '12-34-5' }).success).toBe(false);
  });

  it('rejects an unknown slot', () => {
    expect(callbackSchema.safeParse({ ...VALID_BASE, slot: 'tonight' }).success).toBe(false);
  });

  it('rejects a malformed ad ref', () => {
    expect(callbackSchema.safeParse({ ...VALID_BASE, ref: 'a1;drop' }).success).toBe(false);
  });

  it('rejects honeypot with content', () => {
    expect(callbackSchema.safeParse({ ...VALID_BASE, honeypot: 'bot' }).success).toBe(false);
  });
});
