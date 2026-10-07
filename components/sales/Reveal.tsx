"use client";

import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";

// Below-the-fold scroll reveal: same variant + viewport as the homepage's
// FadeSection (components/AppShell.tsx). Never wrap above-the-fold content:
// the initial opacity:0 would hold back LCP until hydration.
export function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </m.div>
  );
}
