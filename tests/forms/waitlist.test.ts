import { describe, it, expect } from 'vitest';
import { waitlistSchema } from '@/lib/forms/schemas';

const VALID_BASE = {
  type: 'waitlist' as const,
  email: 'hello@techfounder.io',
  sourceFeature: 'Engineer Path' as const,
  turnstileToken: 'mock-token',
};

describe('waitlistSchema', () => {
  it('accepts a valid payload', () => {
    expect(waitlistSchema.safeParse(VALID_BASE).success).toBe(true);
  });

  it('rejects invalid email', () => {
    expect(waitlistSchema.safeParse({ ...VALID_BASE, email: 'not-an-email' }).success).toBe(false);
  });

  it('rejects empty email', () => {
    expect(waitlistSchema.safeParse({ ...VALID_BASE, email: '' }).success).toBe(false);
  });

  it('rejects invalid sourceFeature enum', () => {
    expect(waitlistSchema.safeParse({ ...VALID_BASE, sourceFeature: 'Random Feature' }).success).toBe(false);
  });

  it('accepts all valid sourceFeature values', () => {
    const features = [
      'AI Consultation',
      'Express Site',
      'Foundation Stats',
      'Intelligence Briefings',
      'Engineer Path',
      'Other',
    ] as const;
    for (const sourceFeature of features) {
      expect(waitlistSchema.safeParse({ ...VALID_BASE, sourceFeature }).success).toBe(true);
    }
  });

  it('rejects missing turnstileToken', () => {
    expect(waitlistSchema.safeParse({ ...VALID_BASE, turnstileToken: '' }).success).toBe(false);
  });

  it('rejects honeypot with content', () => {
    expect(waitlistSchema.safeParse({ ...VALID_BASE, honeypot: 'bot' }).success).toBe(false);
  });

  it('accepts empty honeypot', () => {
    expect(waitlistSchema.safeParse({ ...VALID_BASE, honeypot: '' }).success).toBe(true);
  });
});
