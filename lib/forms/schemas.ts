import { z } from 'zod';

const turnstileToken = z.string().min(1, 'Turnstile token required');
const honeypot = z.string().max(0, 'Bot detected').optional();

export const intakeSchema = z.object({
  type: z.literal('intake'),
  company: z.string().min(1).max(200),
  yourName: z.string().min(1).max(120),
  email: z.string().email(),
  basedIn: z.string().min(1).max(200),
  stage: z.enum(['<€1M revenue', '€1–5M', '€5–50M', '€50M+', 'Not disclosed']),
  bottleneck: z.string().min(100, 'Please describe in at least 100 characters').max(2000),
  triedSoFar: z.string().max(2000).optional().default(''),
  whyNow: z.string().min(20).max(2000),
  budget: z.enum(['Yes', 'Need to confirm with team', 'Not yet']),
  startWindow: z.enum(['Within 30 days', '30–90 days', 'Exploring']),
  source: z.string().max(200).optional().default(''),
  // Machine attribution — auto-captured client-side (lib/analytics/attribution).
  // All optional, no PII; folded into the "Referral Source" Notion field.
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  utmContent: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
  landingPath: z.string().max(300).optional(),
  landingLocale: z.string().max(20).optional(),
  channel: z.string().max(40).optional(),
  turnstileToken,
  honeypot,
});

export const bookingSchema = z.object({
  type: z.literal('booking'),
  fullName: z.string().min(1).max(120),
  email: z.string().email(),
  countryCode: z.string().regex(/^\+\d{1,4}$/, 'Country code must be +XX format'),
  whatsapp: z.string().regex(/^\d{6,15}$/, 'WhatsApp number digits only'),
  selectedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'ISO date format'),
  selectedTime: z.string().min(1).max(40),
  timezone: z.string().min(1).max(60),
  turnstileToken,
  honeypot,
});

export const careerSchema = z.object({
  type: z.literal('career'),
  fullName: z.string().min(1).max(120),
  email: z.string().email(),
  linkedin: z.string().url(),
  position: z.enum([
    'AI Product Engineer',
    'AI Growth Operator',
    'AI Experience Designer',
    'AI Delivery Lead',
    'Open Application',
  ]),
  portfolio: z.string().url().optional(),
  basedIn: z.string().min(1).max(200),
  cvUrl: z.string().url(),
  turnstileToken,
  honeypot,
});

export const waitlistSchema = z.object({
  type: z.literal('waitlist'),
  email: z.string().email(),
  sourceFeature: z.enum([
    'AI Consultation',
    'Express Site',
    'Foundation Stats',
    'Intelligence Briefings',
    'Engineer Path',
    'Other',
  ]),
  turnstileToken,
  honeypot,
});

export type IntakePayload = z.infer<typeof intakeSchema>;
export type BookingPayload = z.infer<typeof bookingSchema>;
export type CareerPayload = z.infer<typeof careerSchema>;
export type WaitlistPayload = z.infer<typeof waitlistSchema>;
