"use client";

import { useScroll, useSpring, motion } from "framer-motion";

/**
 * ScrollProgress, thin accent bar fixed at the top of the viewport.
 * Fills as the user scrolls down the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] bg-accent"
      aria-hidden="true"
    />
  );
}
