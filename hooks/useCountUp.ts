"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useCountUp, number scramble hook
 *
 * Runs 1→99 scramble pass, then eases into the real target value.
 * Returns the display string to render directly.
 *
 * @param target        The real numeric value to land on
 * @param duration      Total animation duration in ms (default 1800)
 * @param start         Whether to begin counting (use with IntersectionObserver / whileInView)
 * @param prefix        Optional string prepended (e.g. "≥ ")
 * @param suffix        Optional string appended (e.g. "%")
 */
export function useCountUp(
  target: number,
  {
    duration = 1800,
    start = true,
    prefix = "",
    suffix = "",
    scrambleDuration = 700,
  }: {
    duration?: number;
    start?: boolean;
    prefix?: string;
    suffix?: string;
    scrambleDuration?: number;
  } = {},
): string {
  const [display, setDisplay] = useState(`${prefix}${target}${suffix}`);
  const rafRef = useRef<number | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const totalDuration = duration;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);

      if (elapsed < scrambleDuration) {
        // Scramble phase, random numbers from 1→99
        const scramble = Math.floor(Math.random() * 99) + 1;
        setDisplay(`${prefix}${scramble}${suffix}`);
      } else {
        // Ease-out phase, interpolate toward target
        const easedProgress =
          1 -
          Math.pow(
            1 -
              (progress * totalDuration - scrambleDuration) /
                (totalDuration - scrambleDuration),
            3,
          );
        const current = Math.round(easedProgress * target);
        setDisplay(`${prefix}${current}${suffix}`);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(`${prefix}${target}${suffix}`);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, duration, prefix, suffix, scrambleDuration]);

  return display;
}
