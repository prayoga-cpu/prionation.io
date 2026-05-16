import { describe, it, expect } from 'vitest';
import { bookingSchema } from '@/lib/forms/schemas';

const VALID_BASE = {
  type: 'booking' as const,
  fullName: 'Marco Bianchi',
  email: 'marco@bianchi.it',
  countryCode: '+39',
  whatsapp: '812345678',
  selectedDate: '2026-06-02',
  selectedTime: '14:00',
  timezone: 'Europe/Rome',
  turnstileToken: 'mock-token',
};

describe('bookingSchema', () => {
  it('accepts a valid payload', () => {
    expect(bookingSchema.safeParse(VALID_BASE).success).toBe(true);
  });

  it('rejects missing fullName', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, fullName: '' }).success).toBe(false);
  });

  it('rejects invalid email', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, email: 'bad' }).success).toBe(false);
  });

  it('rejects country code without + prefix', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, countryCode: '39' }).success).toBe(false);
  });

  it('rejects country code with letters', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, countryCode: '+XX' }).success).toBe(false);
  });

  it('accepts multi-digit country codes', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, countryCode: '+1234' }).success).toBe(true);
  });

  it('rejects whatsapp number with non-digits', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, whatsapp: '08123-456' }).success).toBe(false);
  });

  it('rejects whatsapp number under 6 digits', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, whatsapp: '12345' }).success).toBe(false);
  });

  it('rejects date not in ISO format', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, selectedDate: '02/06/2026' }).success).toBe(false);
  });

  it('rejects missing timezone', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, timezone: '' }).success).toBe(false);
  });

  it('rejects honeypot with content', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, honeypot: 'bot' }).success).toBe(false);
  });
});
