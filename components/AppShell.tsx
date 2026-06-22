"use client";

import { useRef, useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Header } from "./Header";
import { Hero } from "./sections/Hero";
import { LogoMarquee } from "./sections/LogoMarquee";
import { ScrollProgress } from "./ui/ScrollProgress";
import { fadeUp } from "@/lib/motion";

/* Below-the-fold sections are still server-rendered (SSR HTML kept → SEO intact,
   zero layout shift), but their client JS is code-split out of the initial
   bundle so it no longer blocks the hero's hydration on mobile. */
const HowWeWork = dynamic(() => import("./sections/HowWeWork").then((m) => m.HowWeWork));
const Methodology = dynamic(() => import("./sections/Methodology").then((m) => m.Methodology));
const SelectedWork = dynamic(() => import("./sections/SelectedWork").then((m) => m.SelectedWork));
const Pricing = dynamic(() => import("./sections/Pricing").then((m) => m.Pricing));
const Foundation = dynamic(() => import("./sections/Foundation").then((m) => m.Foundation));
const Engage = dynamic(() => import("./sections/Engage").then((m) => m.Engage));
const Testimonials = dynamic(() => import("./sections/Testimonials").then((m) => m.Testimonials));
const Faq = dynamic(() => import("./sections/Faq").then((m) => m.Faq));
const ContentHighlight = dynamic(() => import("./sections/ContentHighlight").then((m) => m.ContentHighlight));
const SiteFooter = dynamic(() => import("./sections/SiteFooter").then((m) => m.SiteFooter));

/* Interaction-only modal (bundles Cloudflare Turnstile) — fully client-side and
   never shown until the diagnostic runs, so keep it out of the initial bundle. */
const NotifyModal = dynamic(() => import("./NotifyModal").then((m) => m.NotifyModal), { ssr: false });

/** Wraps each section with whileInView reveal */
function FadeSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </m.div>
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
        <Hero onNotify={() => setNotifyOpen(true)} />
        <LogoMarquee />
        <FadeSection>
          <HowWeWork />
        </FadeSection>
        <FadeSection>
          <Methodology />
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
          <Testimonials />
        </FadeSection>
        <FadeSection>
          <ContentHighlight />
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
