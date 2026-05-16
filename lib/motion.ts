/**
 * PRIONATION.io, Framer Motion shared variants & spring configs
 * Use these across the site for consistent, Webflow-grade animations.
 */

import type { Variants, Transition } from "framer-motion";

// ─── Spring configs ───────────────────────────────────────────────────────────

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 22,
};

export const easeFast: Transition = {
  duration: 0.22,
  ease: [0.16, 1, 0.3, 1],
};

export const easeCinematic: Transition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1],
};

// ─── Base variants ────────────────────────────────────────────────────────────

/** Fade + slide up: the bread-and-butter reveal */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Fade in only (no movement) */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Slide down from top (header, dropdowns) */
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSnappy,
  },
};

/** Scale-in spring (modals, popovers) */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springBouncy,
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 4,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

/** Slide from bottom (mobile modal) */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSmooth,
  },
  exit: {
    opacity: 0,
    y: "100%",
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

/** Slide from right (mobile nav drawer) */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: springSmooth,
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

/** Backdrop overlay */
export const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Stagger containers ───────────────────────────────────────────────────────

/** Parent that staggers its children */
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/** Fast stagger (hero, nav items) */
export const staggerFast = staggerContainer(0.07, 0.1);

/** Normal stagger (section children) */
export const staggerNormal = staggerContainer(0.12, 0.05);

/** Slow stagger (cards grid) */
export const staggerSlow = staggerContainer(0.15, 0.0);

// ─── Slide in from left (table rows) ──────────────────────────────────────────

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Page transitions ─────────────────────────────────────────────────────────

export const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};
