import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY!);

// Submitter confirmations — branded sender visible to clients
export const FROM = process.env.RESEND_FROM_EMAIL!;

// Team notifications — separate sender to avoid self-referential FROM=TO spam signal
export const FROM_NOTIFY = process.env.RESEND_NOTIFY_FROM_EMAIL ?? 'notifications@prionation.io';

// All team members notified on every submission
export const TO: string[] = (process.env.RESEND_NOTIFY_EMAILS ?? process.env.RESEND_FOUNDER_EMAIL ?? '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean);
