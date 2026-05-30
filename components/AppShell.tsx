"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./Header";
import { NotifyModal } from "./NotifyModal";
import { Hero } from "./sections/Hero";
import { HowWeWork } from "./sections/HowWeWork";
import { Methodology } from "./sections/Methodology";
import { SelectedWork } from "./sections/SelectedWork";
import { Pricing } from "./sections/Pricing";
import { Foundation } from "./sections/Foundation";
import { Engage } from "./sections/Engage";
import { Faq } from "./sections/Faq";
import { SiteFooter } from "./sections/SiteFooter";
import { ScrollProgress } from "./ui/ScrollProgress";
import { fadeUp } from "@/lib/motion";

/** Wraps each section with whileInView reveal */
function FadeSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Desktop-only cursor glow that follows the mouse */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pn-cursor-glow hidden lg:block"
      style={{ opacity: 0.18 }}
      aria-hidden="true"
    />
  );
}

export default function AppShell() {
  const [notifyOpen, setNotifyOpen] = useState(false);

  return (
    <div>
      <ScrollProgress />
      <CursorGlow />
      <Header />
      <main>
        {/* Hero has its own internal stagger, no FadeSection wrapper */}
        <Hero />
        <FadeSection>
          <HowWeWork />
        </FadeSection>
        <FadeSection>
          <Methodology onNotify={() => setNotifyOpen(true)} />
        </FadeSection>
        <FadeSection>
          <SelectedWork />
        </FadeSection>
        <FadeSection>
          <Pricing />
        </FadeSection>
        <FadeSection>
          <Foundation />
        </FadeSection>
        <FadeSection>
          <Engage />
        </FadeSection>
        <FadeSection>
          <Faq />
        </FadeSection>
      </main>
      <SiteFooter />

      {/* NotifyModal with AnimatePresence spring pop */}
      <AnimatePresence>
        {notifyOpen && <NotifyModal onClose={() => setNotifyOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
