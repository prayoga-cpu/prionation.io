"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// The real Discord invite. Swap this anytime without touching your ads.
const DISCORD_INVITE = "https://discord.gg/FYB5HmYtg9";

export default function DiscordRedirect() {
  useEffect(() => {
    // 1. Fire the Pixel so this click becomes a retargetable event.
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Discord Join",
        content_category: "community_launch",
      });
    }

    // 2. Redirect after a short beat so the Pixel beacon has time to send.
    const t = setTimeout(() => {
      window.location.replace(DISCORD_INVITE);
    }, 600);

    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#08090d] text-white font-sans overflow-hidden">
      {/* Ambient background glow matching the design system's cursor glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--c-accent-glow)_0%,transparent_65%)] opacity-25 pointer-events-none" />

      <div className="z-10 w-full max-w-md mx-4 p-8 md:p-10 rounded-2xl bg-[#0c0d12] border border-[#1c1d22] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] flex flex-col text-center">
        {/* Logo Brand Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#5865f2] shadow-[0_0_10px_#5865f2]" />
          <span className="text-[12px] font-bold tracking-[0.15em] text-[#73767d] uppercase">
            PRIONATION.io
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
          Taking you to Discord…
        </h1>
        <p className="text-[13px] text-[#73767d]">
          Redirecting you to our community launch server.
        </p>

        {/* Custom Animated Progress Bar using Framer Motion */}
        <div className="w-full bg-[#11131a] border border-[#1c1d22] h-1.5 rounded-full overflow-hidden my-6">
          <motion.div
            className="h-full bg-[#5865f2] shadow-[0_0_8px_rgba(88,101,242,0.55)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mt-2">
          <a
            href={DISCORD_INVITE}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5865f2] hover:bg-[#4752c4] text-white font-medium text-sm transition-all shadow-lg shadow-[#5865f2]/10 hover:shadow-[#5865f2]/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Continue</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#1c1d22] hover:border-[#36383d] bg-[#11131a] hover:bg-[#1c1d22] text-[#babbbe] hover:text-white font-medium text-sm transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Go to Home Page</span>
          </Link>
        </div>

        {/* Backup link message */}
        <div className="mt-8 text-xs text-[#73767d]">
          Did it freeze?{" "}
          <a
            href={DISCORD_INVITE}
            className="text-[#5865f2] hover:underline"
          >
            Click here to redirect manually
          </a>
        </div>
      </div>
    </main>
  );
}
