# PRIONATION.io — v.3.1.0

**AI Product Engineering · Fixed scope · 8 weeks to production.**

PRIONATION is a lean AI product engineering pod that builds production AI infrastructure for European and US-based mid-market companies. We specialize in transforming operational bottlenecks into scalable, AI-native software systems.

---

## What's in this repo

The official marketing site and intake engine for PRIONATION.io — built to the same engineering standards we hold for client work.

### Features

- **AI Consultation diagnostic (beta)** — interactive in-hero diagnostic with two paths (guided intake / chat-with-AI), a streaming Claude-terminal processing preview (live token + elapsed counters), proof-stats, and a 3D Saturn-ring accent on the "AI" headline word. A prototype illustrating the flow (launching August 2026); completing a diagnostic auto-opens the AI Consultation waitlist. All ROI/metric figures shown are clearly-labelled projections — no fabricated data.
- **Form integration backend** — 4 fully wired forms (Diagnostic, Booking, Career, Waitlist) with Notion DB writes, Resend email notifications, rate limiting, Turnstile bot protection, and honeypot spam detection
- **Framer Motion animation system** — staggered hero reveals, infinite mobile native-scroll carousels, spring-based modal transitions, number-scramble stat counters, tab crossfade, and mobile drawer animations
- **Full i18n (EN / FR / ID)** — every string in every component is locale-driven via `next-intl` (incl. the AI Consultation diagnostic flow); the Saturn ring tracks the localized AI/IA token
- **Diagnostic intake engine** — 2-step multi-field form with Zod validation, disqualification logic, Sales Pipeline auto-sync, and confirmation emails
- **Dynamic booking system** — Calendar picker with timezone detection, WhatsApp field, and Notion booking record
- **Career portal** — Supabase Storage CV upload (PDF, 5 MB limit) + Notion write + confirmation email
- **Waitlist modal** — AI Consultation email capture, auto-opened after the in-hero diagnostic preview; Notion dedup and instant confirmation
- **Scroll progress bar** — Accent-colored reading progress indicator using Framer Motion `useScroll`
- **Cursor glow** — Desktop-only radial glow that follows the mouse
- **Dark-mode-first design** — Custom design tokens, glassmorphic cards, shimmer border effects

---

## Tech stack

| Layer          | Choice                             |
| -------------- | ---------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack) |
| UI             | React 19                           |
| Animation      | Framer Motion                      |
| Styling        | Vanilla CSS + custom design tokens |
| i18n           | next-intl (EN · FR · ID)           |
| Validation     | Zod v4                             |
| Database       | Notion (`@notionhq/client` v5)     |
| Email          | Resend v6                          |
| File storage   | Supabase Storage (CV uploads)      |
| Rate limiting  | Upstash Redis (sliding window)     |
| Bot protection | Cloudflare Turnstile (invisible)   |
| Testing        | Vitest (51 schema tests)           |
| Deployment     | Vercel                             |

---

## Project structure

```
├── app/
│   ├── [locale]/              # Locale-aware App Router layout
│   └── api/
│       ├── forms/
│       │   ├── intake/        # Diagnostic form → PN_Intake + PN_Sales_Pipeline
│       │   ├── booking/       # Meeting booking → PN_Bookings
│       │   ├── career/        # Job application → PN_Careers
│       │   └── waitlist/      # Feature waitlist → PN_Waitlist
│       └── upload/cv/         # Supabase signed upload URL generator
├── components/
│   ├── sections/              # Hero, HowWeWork, Methodology, SelectedWork,
│   │                          #   Pricing, Foundation, Engage, SiteFooter
│   ├── sections/engage/       # MeetUsTab, CareersTab, DiagnosticForm sub-components
│   ├── sections/site-footer/  # FooterColumns sub-component
│   ├── ui/                    # Button, Typography, SectionHead, Atoms (barrel export),
│   │                          #   ScrollProgress, Typewriter
│   ├── icons/                 # Custom SVG icon set
│   └── NotifyModal.tsx        # Waitlist modal
├── lib/
│   ├── forms/
│   │   ├── schemas.ts         # Zod schemas for all 4 forms
│   │   └── disqualification.ts # Intake disqualification logic
│   ├── notion/
│   │   ├── client.ts          # Notion SDK client
│   │   ├── databases.ts       # DB ID constants from env
│   │   ├── mappers.ts         # Payload → Notion properties
│   │   └── sync.ts            # Intake → Sales Pipeline sync
│   ├── notify/
│   │   ├── resend.ts          # Resend client + recipient config
│   │   └── templates.ts       # 8 email templates (4 team + 4 submitter)
│   ├── security/
│   │   ├── turnstile.ts       # Cloudflare Turnstile server-side verify
│   │   └── rate-limit.ts      # Upstash Redis sliding window
│   ├── storage/
│   │   └── supabase.ts        # Supabase client + CV bucket config
│   └── motion.ts              # Centralized Framer Motion variants
├── tests/forms/               # Vitest schema + validation tests (51 total)
├── messages/
│   ├── en.json                # English (all sections, parity-checked)
│   ├── fr.json                # French (all sections, parity-checked)
│   └── id.json                # Indonesian (all sections, parity-checked)
└── public/
    ├── fonts/                 # Rubik, Press Start 2P (local)
    ├── images/team/           # Team photography
    └── work/                  # Case study screenshots
```

---

## Getting started

```bash
# Clone
git clone git@github.com:prayoga-cpu/prionation.io.git
cd prionation.io

# Install
npm install

# Dev server (Turbopack)
npm run dev
# → http://localhost:3000/en

# Run tests
npm test

# Type check
npx tsc --noEmit

# Production build
npm run build
```

### Environment variables

Copy `.env.local.example` and fill in your values:

```env
# Notion
NOTION_API_KEY=
NOTION_DB_INTAKE=
NOTION_DB_BOOKINGS=
NOTION_DB_CAREERS=
NOTION_DB_WAITLIST=
NOTION_DB_SALES_PIPELINE=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_FOUNDER_EMAIL=
RESEND_NOTIFY_EMAILS=          # comma-separated: a@x.com,b@x.com

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Cloudflare Turnstile
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=

# Supabase Storage (CV uploads)
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET=

# Analytics (client-side; set in Vercel env for production)
NEXT_PUBLIC_GA4_ID=            # GA4 Measurement ID, e.g. G-0D7HXGC7K3 (the "G-" prefix is auto-added if omitted)
NEXT_PUBLIC_META_PIXEL_ID=    # Meta Pixel ID (optional)

# App
PRIONATION_ENV=development     # set to "production" on Vercel

# Security toggle (set both to "false" to disable Turnstile + rate limiting)
SECURITY_ENABLED=true
NEXT_PUBLIC_SECURITY_ENABLED=true
```

### Analytics & consent

Analytics are **geo-gated** for privacy compliance:

- Middleware (`proxy.ts`) stamps a `pn_eu` cookie from the visitor's country
  (`x-vercel-ip-country`): `1` for **EEA / UK / Switzerland**, `0` elsewhere
  (unknown → `1`, privacy-safe). It's a functional cookie, so pages stay
  **statically rendered** — geo is never read during page rendering.
- **EEA / UK / CH visitors:** the consent banner (`components/ConsentBanner.tsx`)
  shows. Google Analytics starts in **cookieless Consent Mode**
  (`analytics_storage` denied) and the Meta Pixel does not load until the visitor
  accepts.
- **Everywhere else:** no banner; GA4 + Meta Pixel run by default.
- The choice persists in `localStorage` (`pn_consent`) and flips consent live via
  `lib/analytics/consent.ts` (`useSyncExternalStore` → no SSR flash). Conversion
  events route through `lib/analytics/events.ts` (`trackEvent` → GA4 + Vercel).
- Privacy policy lives at `/[locale]/privacy` (linked from the footer).

### Notion setup

Each of the 5 databases must be individually connected to the "Prionation Website" integration:

1. Open each database: **PN_Intake**, **PN_Bookings**, **PN_Careers**, **PN_Waitlist**, **PN_Sales_Pipeline**
2. `···` → **Connections** → **Add connection** → select **Prionation Website**

> Connecting at the parent page level does **not** cascade to child databases — each must be connected individually.

---

## Form pipelines

| Form       | Endpoint                   | Notion DB                     | Emails sent                     |
| ---------- | -------------------------- | ----------------------------- | ------------------------------- |
| Diagnostic | `POST /api/forms/intake`   | PN_Intake + PN_Sales_Pipeline | Team notify + submitter confirm |
| Booking    | `POST /api/forms/booking`  | PN_Bookings                   | Team notify + submitter confirm |
| Career     | `POST /api/forms/career`   | PN_Careers                    | Team notify + submitter confirm |
| Waitlist   | `POST /api/forms/waitlist` | PN_Waitlist                   | Team notify + submitter confirm |

CV upload flow (Career form): browser → `POST /api/upload/cv` → Supabase signed URL → browser `PUT` to Supabase → `cvUrl` sent with career form payload.

---

## The Foundation

| Name             | Role                                         |
| ---------------- | -------------------------------------------- |
| Darwin Prayoga   | Founder & CEO — Indonesian tech architect    |
| Evan Cao         | Chief Revenue Officer — Paris-based operator |
| The Delivery Pod | 2–3 AI Product Engineers per engagement      |

---

© 2026 PRIORITY FOUNDATION · Built with precision by PRIONATION.
