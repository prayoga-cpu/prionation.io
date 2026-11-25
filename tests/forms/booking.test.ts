import { describe, it, expect } from 'vitest';
import { bookingSchema } from '@/lib/forms/schemas';

const VALID_BASE = {
  type: 'booking' as const,
  fullName: 'Marco Bianchi',
  email: 'marco@bianchi.it',
  countryCode: '+39',
  whatsapp: '812345678',
  slotStart: '2026-06-02T14:00:00.000+02:00',
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

  it('rejects an unknown timezone', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, timezone: 'Mars/Olympus' }).success).toBe(false);
  });

  it('rejects a missing or malformed slotStart', () => {
    const { slotStart: _omit, ...withoutSlot } = VALID_BASE;
    void _omit;
    expect(bookingSchema.safeParse(withoutSlot).success).toBe(false);
    expect(bookingSchema.safeParse({ ...VALID_BASE, slotStart: '2026-06-02 14:00' }).success).toBe(false);
    // no offset: ambiguous instant, must be rejected
    expect(bookingSchema.safeParse({ ...VALID_BASE, slotStart: '2026-06-02T14:00:00' }).success).toBe(false);
  });

  it('accepts optional attribution fields', () => {
    const r = bookingSchema.safeParse({ ...VALID_BASE, channel: 'paid', utmSource: 'meta', utmCampaign: 'paris' });
    expect(r.success).toBe(true);
  });

  it('rejects honeypot with content', () => {
    expect(bookingSchema.safeParse({ ...VALID_BASE, honeypot: 'bot' }).success).toBe(false);
  });
});
