# PRIONATION.io — v3.1

**AI Product Engineering · Fixed scope · 8 weeks to production.**

PRIONATION is a lean AI product engineering pod that builds production AI infrastructure for European and US-based mid-market companies. We specialize in transforming operational bottlenecks into scalable, AI-native software systems.

---

## What's in this repo

The official marketing site and intake engine for PRIONATION.io — built to meet the same engineering standards we hold for client work.

### Features

- **Framer Motion animation system** — staggered hero reveals, scroll-triggered section reveals, spring-based modal transitions, number-scramble stat counters, tab crossfade, and mobile drawer animations
- **Full i18n (EN / FR / ID)** — 130 translation keys across 8 sections via `next-intl`; every string in every component is locale-driven
- **Diagnostic intake engine** — 2-step multi-field form with validation, Resend email delivery, and animated success state
- **Dynamic booking system** — Cal.com embed inside an `AnimatePresence` modal
- **Careers portal** — Dedicated tab for global talent applications
- **Scroll progress bar** — Accent-colored reading progress indicator using Framer Motion `useScroll`
- **Cursor glow** — Desktop-only radial glow that follows the mouse (desktop only)
- **Dark-mode-first design** — Custom design tokens, glassmorphic cards, shimmer border effects

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19 |
| Animation | Framer Motion |
| Styling | Vanilla CSS + custom design tokens |
| i18n | next-intl (EN · FR · ID) |
| Icons | Lucide React |
| Email | Resend |
| Scheduling | Cal.com embed |
| Deployment | Vercel |

---

## Project structure

```
├── app/
│   ├── [locale]/          # Locale-aware App Router layout
│   └── api/forms/         # API routes: intake, booking, career, waitlist
├── components/
│   ├── sections/          # Hero, HowWeWork, Methodology, SelectedWork,
│   │                      #   Pricing, Foundation, Engage, SiteFooter
│   ├── sections/engage/   # MeetUsTab, CareersTab sub-components
│   ├── ui/                # Atoms, ScrollProgress, Typewriter
│   └── icons/             # Custom SVG icon set
├── hooks/
│   └── useCountUp.ts      # Number scramble → target animation hook
├── lib/
│   └── motion.ts          # Centralized Framer Motion variants & spring configs
├── messages/
│   ├── en.json            # English (130 keys)
│   ├── fr.json            # French (130 keys)
│   └── id.json            # Indonesian (130 keys)
└── public/
    ├── fonts/             # Rubik, Press Start 2P (local)
    ├── images/team/       # Team photography
    └── work/              # Case study screenshots
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

# Production build
npm run build
```

### Environment variables

```env
RESEND_API_KEY=
CAL_LINK=
```

---

## The Foundation

| Name | Role |
|---|---|
| Darwin Prayoga | Founder & CEO — Indonesian tech architect |
| Evan Cao | Chief Revenue Officer — Paris-based operator |
| The Delivery Pod | 2–3 AI Product Engineers per engagement |

---

© 2026 PRIORITY FOUNDATION · Built with precision by PRIONATION.
