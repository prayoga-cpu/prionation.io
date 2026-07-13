import { describe, it, expect } from 'vitest';
import {
  consultRequestSchema,
  CONSULT_MAX_USER_TURNS,
  CONSULT_MAX_MSG_CHARS,
} from '@/lib/consult/schema';

const user = (content: string) => ({ role: 'user' as const, content });
const assistant = (content: string) => ({ role: 'assistant' as const, content });

const VALID_BASE = {
  messages: [user('We drown in manual invoice entry.')],
  locale: 'en' as const,
  turnstileToken: 'dev-bypass',
};

describe('consultRequestSchema', () => {
  it('accepts a valid single-turn payload', () => {
    expect(consultRequestSchema.safeParse(VALID_BASE).success).toBe(true);
  });

  it('accepts a valid multi-turn alternating history ending on a user turn', () => {
    const messages = [user('q1'), assistant('a1'), user('q2')];
    expect(consultRequestSchema.safeParse({ ...VALID_BASE, messages }).success).toBe(true);
  });

  it('defaults locale to en and rejects unknown locales', () => {
    const { turnstileToken, messages } = VALID_BASE;
    const parsed = consultRequestSchema.safeParse({ messages, turnstileToken });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.locale).toBe('en');
    expect(
      consultRequestSchema.safeParse({ ...VALID_BASE, locale: 'de' }).success,
    ).toBe(false);
  });

  it('rejects an empty messages array', () => {
    expect(consultRequestSchema.safeParse({ ...VALID_BASE, messages: [] }).success).toBe(false);
  });

  it('rejects a first message from the assistant', () => {
    const messages = [assistant('hi'), user('q1')];
    expect(consultRequestSchema.safeParse({ ...VALID_BASE, messages }).success).toBe(false);
  });

  it('rejects a history ending on an assistant turn', () => {
    const messages = [user('q1'), assistant('a1')];
    expect(consultRequestSchema.safeParse({ ...VALID_BASE, messages }).success).toBe(false);
  });

  it('rejects non-alternating roles', () => {
    const messages = [user('q1'), user('q2')];
    expect(consultRequestSchema.safeParse({ ...VALID_BASE, messages }).success).toBe(false);
  });

  it(`rejects a message over ${CONSULT_MAX_MSG_CHARS} chars`, () => {
    const messages = [user('a'.repeat(CONSULT_MAX_MSG_CHARS + 1))];
    expect(consultRequestSchema.safeParse({ ...VALID_BASE, messages }).success).toBe(false);
  });

  it(`rejects more than ${CONSULT_MAX_USER_TURNS} user turns`, () => {
    const messages = [];
    for (let i = 0; i < CONSULT_MAX_USER_TURNS + 1; i++) {
      if (i > 0) messages.push(assistant(`a${i}`));
      messages.push(user(`q${i}`));
    }
    expect(consultRequestSchema.safeParse({ ...VALID_BASE, messages }).success).toBe(false);
  });

  it('rejects extra fields on message objects (strict)', () => {
    const messages = [{ role: 'user', content: 'hi', injected: 'x' }];
    expect(consultRequestSchema.safeParse({ ...VALID_BASE, messages }).success).toBe(false);
  });

  it('rejects non-string message content', () => {
    const messages = [{ role: 'user', content: [{ type: 'text', text: 'hi' }] }];
    expect(consultRequestSchema.safeParse({ ...VALID_BASE, messages }).success).toBe(false);
  });

  it('rejects a filled honeypot at the schema level', () => {
    expect(
      consultRequestSchema.safeParse({ ...VALID_BASE, honeypot: 'bot' }).success,
    ).toBe(false);
  });

  it('rejects a missing turnstileToken (required on every turn)', () => {
    const { messages, locale } = VALID_BASE;
    expect(consultRequestSchema.safeParse({ messages, locale }).success).toBe(false);
  });
});
