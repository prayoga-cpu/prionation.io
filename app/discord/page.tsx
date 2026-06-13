"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Btn, Eyebrow } from "@/components/ui/Atoms";
import { staggerFast, fadeUp } from "@/lib/motion";

// The real Discord invite link.
const DISCORD_INVITE = "https://discord.gg/FYB5HmYtg9";

export default function DiscordLandingPage() {
  const handleJoinDiscord = () => {
    // 1. Fire the Pixel so this click becomes a retargetable event.
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Discord Join Link Click",
        content_category: "community_launch",
      });
    }

    // 2. Open the invite link in a new tab.
    window.open(DISCORD_INVITE, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="relative overflow-hidden px-page-x pt-[120px] pb-[100px] min-h-screen flex flex-col justify-center bg-[#08090d] text-white font-sans">
      {/* Background radial gradient layers matching Hero style */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(60%_50%_at_12%_18%,var(--c-accent-glow)_0%,transparent_60%),radial-gradient(45%_40%_at_92%_80%,rgba(235,69,159,0.15)_0%,transparent_65%),linear-gradient(180deg,#0c0e1a_0%,#08090d_70%)]" />

      {/* Grid overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(70%_70%_at_50%_30%,#000_30%,transparent_80%)]"
        initial={{ opacity: 0.35 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Content Container */}
      <motion.div
        className="relative z-20 max-w-[1000px] mx-auto w-full flex flex-col items-center text-center"
        variants={staggerFast}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp}>
          <Eyebrow glow>COMMUNITY LAUNCH</Eyebrow>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-normal text-[clamp(36px,5vw,68px)] leading-[1.1] md:leading-none tracking-normal text-white my-6 uppercase max-w-[20ch]"
        >
          JOIN THE <span className="text-accent">PRIONATION</span> LAB
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="max-w-[55ch] text-soft text-[16px] md:text-[18px] leading-[1.6] mb-10 mx-0 text-balance"
        >
          Connect with AI product engineers, mid-market founders, and engineering leaders building production-ready AI systems. Share telemetry, launch frameworks, and owned infrastructure architectures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex gap-4 flex-wrap justify-center mb-16"
        >
          <Btn
            variant="primary"
            className="!bg-[#5865f2] !text-white hover:!bg-[#4752c4] border-none shadow-[0_0_24px_rgba(88,101,242,0.4)] px-8 py-4 text-base"
            onClick={handleJoinDiscord}
          >
            {/* Discord Icon SVG */}
            <svg
              className="w-5 h-5 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.03c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.03A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
            </svg>
            <span>Join Our Discord</span>
          </Btn>
          <Link href="/">
            <Btn variant="ghost" className="px-8 py-4 text-base">
              Back to Home
            </Btn>
          </Link>
        </motion.div>

        {/* Feature/Channels Grid */}
        <motion.div
          variants={staggerFast}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[960px] mx-auto text-left"
        >
          {/* Feature 1 */}
          <motion.div
            variants={fadeUp}
            className="bg-card border border-line-soft rounded-[20px] p-6 hover:bg-card-soft hover:border-soft hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-fast"
          >
            <div className="text-[#5865f2] font-pixel text-[9px] tracking-widest uppercase mb-3.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5865f2] shadow-[0_0_8px_#5865f2]" />
              CHANNEL 01
            </div>
            <h3 className="font-sans font-bold text-white text-base md:text-lg mb-2">
              AI Engineering & Evals
            </h3>
            <p className="text-muted text-[13px] leading-relaxed">
              Collaborate on custom evaluations, model latency checks, prompt optimization, and system-wide telemetry hooks.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={fadeUp}
            className="bg-card border border-line-soft rounded-[20px] p-6 hover:bg-card-soft hover:border-soft hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-fast"
          >
            <div className="text-[#5865f2] font-pixel text-[9px] tracking-widest uppercase mb-3.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5865f2] shadow-[0_0_8px_#5865f2]" />
              CHANNEL 02
            </div>
            <h3 className="font-sans font-bold text-white text-base md:text-lg mb-2">
              Owned Infrastructure
            </h3>
            <p className="text-muted text-[13px] leading-relaxed">
              Share designs for hosting open-weights models, setting up scalable inference clusters, and controlling cloud GPU spends.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={fadeUp}
            className="bg-card border border-line-soft rounded-[20px] p-6 hover:bg-card-soft hover:border-soft hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-fast"
          >
            <div className="text-[#5865f2] font-pixel text-[9px] tracking-widest uppercase mb-3.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5865f2] shadow-[0_0_8px_#5865f2]" />
              CHANNEL 03
            </div>
            <h3 className="font-sans font-bold text-white text-base md:text-lg mb-2">
              Build Scoping & Evals
            </h3>
            <p className="text-muted text-[13px] leading-relaxed">
              Validate your scoping templates, review build vs. buy models, and consult on 8-week launch readiness checklists.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
