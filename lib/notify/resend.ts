import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY!);

// Raw email addresses
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL!;
export const FROM_NOTIFY_EMAIL = process.env.RESEND_NOTIFY_FROM_EMAIL ?? FROM_EMAIL;

// Formatted senders with display names (reduces spam score)
// Submitter confirmations — branded sender visible to clients
export const FROM = `PRIONATION.io <${FROM_EMAIL}>`;

// Team notifications — use same domain as FROM so SPF/DKIM always aligns
// If you want a separate notify@ sender, verify that address in Resend first
export const FROM_NOTIFY = `PRIONATION Notify <${FROM_NOTIFY_EMAIL}>`;

// Reply-to for all emails — always routes back to main contact inbox
export const REPLY_TO = FROM_EMAIL;

// All team members notified on every submission
export const TO: string[] = (process.env.RESEND_NOTIFY_EMAILS ?? process.env.RESEND_FOUNDER_EMAIL ?? '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean);
