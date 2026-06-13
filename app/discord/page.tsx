"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Btn, Eyebrow } from "@/components/ui/Atoms";
import { staggerFast, fadeUp } from "@/lib/motion";

// The real Discord invite link.
const DISCORD_INVITE = "https://discord.gg/FYB5HmYtg9";

function LabIllustration() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center select-none pointer-events-none">
      {/* Outer spinning atomic orbit */}
      <motion.svg
        className="absolute w-full h-full text-[#5865f2]/25"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 8"
          fill="none"
        />
      </motion.svg>

      {/* Inner reverse-spinning atomic orbit */}
      <motion.svg
        className="absolute w-full h-full text-[#eb459f]/20"
        viewBox="0 0 100 100"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="37"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="1 5"
          fill="none"
        />
      </motion.svg>

      {/* Floating Beaker / Flask */}
      <motion.div
        className="relative z-10 w-16 h-16 flex items-center justify-center"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="liquid-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eb459f" />
              <stop offset="100%" stopColor="#5865f2" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Liquid inside the beaker with waving path morph */}
          <motion.path
            d="M6.5 18.5C8 20 16 20 17.5 18.5C18.5 17.5 17 13 16 11H8C7 13 5.5 17.5 6.5 18.5Z"
            fill="url(#liquid-grad)"
            opacity="0.8"
            animate={{
              d: [
                "M6.5 18.5C8 20.5 16 19.5 17.5 18.5C18.5 17.5 17 13 16 11H8C7 13 5.5 17.5 6.5 18.5Z",
                "M6.5 18.5C8 19.2 16 20.2 17.5 18.5C18.5 17.5 17 13 16 11H8C7 13 5.5 17.5 6.5 18.5Z",
                "M6.5 18.5C8 20.5 16 19.5 17.5 18.5C18.5 17.5 17 13 16 11H8C7 13 5.5 17.5 6.5 18.5Z",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Flask Outer Border */}
          <path
            d="M9 3H15M12 3V7M12 7L7.5 16C6 19 8 21 12 21C16 21 18 19 16.5 16L12 7"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glowing core inside beaker */}
          <circle cx="12" cy="15" r="1.5" fill="#ffffff" filter="url(#glow)" />
        </svg>

        {/* Rising bubbles from beaker */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#eb459f]"
              style={{
                left: `${35 + i * 8}%`,
                bottom: "28%",
              }}
              animate={{
                y: [0, -35],
                x: [0, (i % 2 === 0 ? 1 : -1) * 6],
                opacity: [0, 1, 0],
                scale: [0.4, 0.8, 0.1],
              }}
              transition={{
                duration: 2.2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

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
    <main className="relative overflow-hidden px-page-x pt-[100px] pb-[100px] min-h-screen flex flex-col justify-center bg-[#08090d] text-white font-sans">
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
        className="relative z-20 max-w-[1200px] mx-auto w-full flex flex-col items-center text-center"
        variants={staggerFast}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp}>
          <Eyebrow glow>COMMUNITY LAUNCH</Eyebrow>
        </motion.div>

        {/* Animated Lab Beaker Illustration */}
        <motion.div variants={fadeUp} className="mt-6 mb-2">
          <LabIllustration />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-normal text-[clamp(36px,5vw,68px)] leading-[1.1] md:leading-none tracking-normal text-white mb-6 uppercase max-w-[20ch]"
        >
          JOIN THE <span className="text-accent">PRIONATION</span>{" "}
          <span className="inline-block bg-[linear-gradient(90deg,#5865f2_0%,#eb459f_50%,#e2b714_100%)] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(235,69,159,0.2)]">
            LAB
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="max-w-[55ch] text-soft text-[16px] md:text-[18px] leading-[1.6] mb-10 mx-0 text-balance"
        >
          Connect with AI product engineers, QA testers, and content creators. Take part in launch events, graphics challenges, and secure your place in our core talent pool.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex gap-4 flex-wrap justify-center mb-20"
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

        {/* Feature/Posters Grid */}
        <motion.div
          variants={staggerFast}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-[1200px] mx-auto text-left items-stretch"
        >
          {/* Card 1: Mid-Year Bug Hunt */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col bg-[#0c0d12]/60 border border-line-soft rounded-[24px] p-8 hover:bg-[#11131a]/80 hover:border-[#39e17b] hover:shadow-[0_16px_40px_rgba(57,225,123,0.1)] transition-all duration-fast"
          >
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="text-muted font-pixel text-[9px] tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#39e17b] shadow-[0_0_10px_#39e17b]" />
                MID-YEAR BUG HUNT // 2026
              </div>
              <span className="font-pixel text-[9px] text-[#73767d] tracking-wider">
                BUG-01
              </span>
            </div>

            <h3 className="font-sans font-extrabold text-white text-2xl md:text-[26px] leading-tight mb-4 tracking-tight">
              Find a bug. <br />
              <span className="text-[#39e17b]">Win Claude Max.</span>
            </h3>

            <p className="text-soft text-[13px] leading-relaxed mb-6 flex-grow">
              Contribute to our builds — or break them. AI engineers &amp; QA testers who ship get rewarded, and pulled straight into our core talent pool.
            </p>

            {/* Prize block */}
            <div className="flex items-stretch rounded-xl border border-line-soft overflow-hidden mb-6 bg-[#11131a] max-w-xs">
              <div className="bg-[#39e17b] text-[#08090d] font-pixel text-[9px] tracking-wider font-extrabold px-4 flex items-center justify-center uppercase select-none">
                Prize
              </div>
              <div className="p-3 pl-4 flex flex-col justify-center">
                <div className="font-bold text-sm text-white">Claude Max</div>
                <div className="text-[10px] text-muted">up to 6 months</div>
              </div>
            </div>

            {/* Role Badges */}
            <div className="flex gap-2 flex-wrap mb-8">
              <span className="px-3 py-1 rounded-full border border-line-soft text-[#73767d] text-[10px] font-pixel uppercase tracking-wide">
                AI Engineer
              </span>
              <span className="px-3 py-1 rounded-full border border-line-soft text-[#73767d] text-[10px] font-pixel uppercase tracking-wide">
                QA Tester
              </span>
            </div>

            <Btn
              variant="primary"
              className="w-full justify-center !bg-white/5 !text-white border border-white/10 hover:!bg-[#39e17b] hover:!text-[#08090d] hover:!border-none transition-all py-3 rounded-xl mt-auto text-xs font-pixel uppercase tracking-wider"
              onClick={handleJoinDiscord}
            >
              Join our Discord
            </Btn>
          </motion.div>

          {/* Card 2: Motion Graphics Competition */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col bg-[#0c0d12]/60 border border-line-soft rounded-[24px] p-8 hover:bg-[#11131a]/80 hover:border-[#eb459f] hover:shadow-[0_16px_40px_rgba(235,69,159,0.1)] transition-all duration-fast"
          >
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="text-muted font-pixel text-[9px] tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#eb459f] shadow-[0_0_10px_#eb459f]" />
                MOTION GRAPHICS COMPETITION
              </div>
              <span className="font-pixel text-[9px] text-[#73767d] tracking-wider">
                MOTION-02
              </span>
            </div>

            <h3 className="font-sans font-extrabold text-white text-2xl md:text-[26px] leading-tight mb-4 tracking-tight">
              Animate AI engineering. <br />
              <span className="text-[#eb459f]">Win 1 year of Higgsfield.</span>
            </h3>

            <p className="text-soft text-[13px] leading-relaxed mb-6 flex-grow">
              Make a motion-graphics piece that markets AI product engineering. Sharpest edit takes the grand prize in Higgsfield tokens.
            </p>

            {/* Prize block */}
            <div className="flex items-stretch rounded-xl border border-line-soft overflow-hidden mb-6 bg-[#11131a] max-w-xs">
              <div className="bg-[#eb459f] text-white font-pixel text-[8px] tracking-wider font-extrabold px-3 flex items-center justify-center uppercase select-none text-center leading-none">
                Grand Prize
              </div>
              <div className="p-3 pl-4 flex flex-col justify-center">
                <div className="font-bold text-sm text-white">Higgsfield</div>
                <div className="text-[10px] text-muted">1 year of tokens</div>
              </div>
            </div>

            {/* Role Badges */}
            <div className="flex gap-2 flex-wrap mb-8">
              <span className="px-3 py-1 rounded-full border border-line-soft text-[#73767d] text-[10px] font-pixel uppercase tracking-wide">
                Video
              </span>
              <span className="px-3 py-1 rounded-full border border-line-soft text-[#73767d] text-[10px] font-pixel uppercase tracking-wide">
                AI Marketing
              </span>
            </div>

            <Btn
              variant="primary"
              className="w-full justify-center !bg-white/5 !text-white border border-white/10 hover:!bg-[#eb459f] hover:!text-white hover:!border-none transition-all py-3 rounded-xl mt-auto text-xs font-pixel uppercase tracking-wider"
              onClick={handleJoinDiscord}
            >
              Brief &amp; rules on Discord
            </Btn>
          </motion.div>

          {/* Card 3: AI Talent Pool */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col bg-[#0c0d12]/60 border border-line-soft rounded-[24px] p-8 hover:bg-[#11131a]/80 hover:border-[#e2b714] hover:shadow-[0_16px_40px_rgba(226,183,20,0.1)] transition-all duration-fast"
          >
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="text-muted font-pixel text-[9px] tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e2b714] shadow-[0_0_10px_#e2b714]" />
                AI TALENT POOL // 2026
              </div>
              <span className="font-pixel text-[9px] text-[#73767d] tracking-wider">
                POOL-03
              </span>
            </div>

            <h3 className="font-sans font-extrabold text-white text-2xl md:text-[26px] leading-tight mb-4 tracking-tight">
              Join our <br />
              <span className="text-[#e2b714]">AI talent pool.</span>
            </h3>

            <p className="text-soft text-[13px] leading-relaxed mb-6">
              Bring your craft — we&apos;ll hand you its AI-native upgrade. Tap in across engineering, product &amp; marketing.
            </p>

            {/* Custom mapping roles table */}
            <div className="border border-line-soft rounded-xl overflow-hidden mb-6 bg-[#11131a] text-[11px] leading-relaxed flex-grow">
              <div className="grid grid-cols-2 bg-[#0c0d12] px-4 py-2 border-b border-line-soft font-pixel text-[7px] text-[#73767d] uppercase tracking-wider">
                <div>Traditional</div>
                <div>AI Role</div>
              </div>
              <div className="divide-y divide-[#1c1d22]/50 max-h-[160px] overflow-y-auto">
                {[
                  { trad: "Fullstack Engineer", ai: "AI Product Engineer" },
                  { trad: "UI/UX Designer", ai: "AI Experience Designer" },
                  { trad: "Project Manager", ai: "AI Delivery Lead" },
                  { trad: "Digital Marketing", ai: "AI Growth Operator" },
                  { trad: "Video Editor", ai: "AI Content Distributor" },
                  { trad: "Copywriter", ai: "Prompt Strategist" },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-2 px-4 py-2 hover:bg-white/5 transition-colors items-center"
                  >
                    <div className="text-[#73767d] line-through decoration-[#73767d]/40 truncate">
                      {row.trad}
                    </div>
                    <div className="text-[#e2b714] font-medium flex items-center justify-between gap-1 pl-1 truncate">
                      <span className="truncate">{row.ai}</span>
                      <span className="font-pixel text-[5px] px-1 py-0.5 rounded bg-[#e2b714]/10 border border-[#e2b714]/20 text-[#e2b714] uppercase shrink-0">
                        AI
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Btn
              variant="primary"
              className="w-full justify-center !bg-white/5 !text-white border border-white/10 hover:!bg-[#e2b714] hover:!text-[#08090d] hover:!border-none transition-all py-3 rounded-xl mt-auto text-xs font-pixel uppercase tracking-wider"
              onClick={handleJoinDiscord}
            >
              Join the talent pool
            </Btn>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
