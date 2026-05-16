import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY!);
export const FROM = process.env.RESEND_FROM_EMAIL!;

// All team members notified on every submission
export const TO: string[] = (process.env.RESEND_NOTIFY_EMAILS ?? process.env.RESEND_FOUNDER_EMAIL ?? '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean);
