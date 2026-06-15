"use client";

import { LazyMotion, domAnimation } from "framer-motion";

// One framer-motion feature bundle for the whole app. `domAnimation` =
// animations, variants, exit (AnimatePresence), inView (whileInView), and
// hover/tap/focus gestures — everything this site uses, minus drag/layout/pan
// (unused). Components use the lightweight `m.*` API instead of `motion.*`, so
// the full feature set never ships in the initial bundle. `strict` makes any
// leftover `motion.*` throw during render — caught by `next build`'s prerender,
// which guarantees the migration is complete.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
