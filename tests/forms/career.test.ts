import { describe, it, expect } from 'vitest';
import { careerSchema } from '@/lib/forms/schemas';

const VALID_BASE = {
  type: 'career' as const,
  fullName: 'Rina Kusuma',
  email: 'rina@gmail.com',
  linkedin: 'https://linkedin.com/in/rinakusuma',
  position: 'AI Product Engineer' as const,
  portfolio: 'https://rinakusuma.dev',
  basedIn: 'Jakarta, Indonesia',
  cvUrl: 'https://xusfkhhytwrlolugvbws.supabase.co/storage/v1/object/sign/prionation-careers/cvs/rina.pdf',
  turnstileToken: 'mock-token',
};

describe('careerSchema', () => {
  it('accepts a valid payload', () => {
    expect(careerSchema.safeParse(VALID_BASE).success).toBe(true);
  });

  it('accepts payload without optional portfolio', () => {
    const { portfolio, ...rest } = VALID_BASE;
    expect(careerSchema.safeParse(rest).success).toBe(true);
  });

  it('rejects missing fullName', () => {
    expect(careerSchema.safeParse({ ...VALID_BASE, fullName: '' }).success).toBe(false);
  });

  it('rejects invalid email', () => {
    expect(careerSchema.safeParse({ ...VALID_BASE, email: 'bad' }).success).toBe(false);
  });

  it('rejects non-URL linkedin', () => {
    expect(careerSchema.safeParse({ ...VALID_BASE, linkedin: 'linkedin.com/in/rina' }).success).toBe(false);
  });

  it('rejects non-URL portfolio', () => {
    expect(careerSchema.safeParse({ ...VALID_BASE, portfolio: 'not-a-url' }).success).toBe(false);
  });

  it('rejects non-URL cvUrl', () => {
    expect(careerSchema.safeParse({ ...VALID_BASE, cvUrl: 'not-a-url' }).success).toBe(false);
  });

  it('rejects invalid position enum', () => {
    expect(careerSchema.safeParse({ ...VALID_BASE, position: 'CTO' }).success).toBe(false);
  });

  it('accepts all valid position values', () => {
    const positions = [
      'AI Product Engineer',
      'AI Growth Operator',
      'AI Experience Designer',
      'AI Delivery Lead',
      'Open Application',
    ] as const;
    for (const position of positions) {
      expect(careerSchema.safeParse({ ...VALID_BASE, position }).success).toBe(true);
    }
  });

  it('rejects missing basedIn', () => {
    expect(careerSchema.safeParse({ ...VALID_BASE, basedIn: '' }).success).toBe(false);
  });

  it('rejects honeypot with content', () => {
    expect(careerSchema.safeParse({ ...VALID_BASE, honeypot: 'bot' }).success).toBe(false);
  });
});
