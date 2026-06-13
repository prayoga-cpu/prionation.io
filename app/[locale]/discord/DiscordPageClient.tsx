"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Btn, Eyebrow } from "@/components/ui/Atoms";
import { staggerFast, fadeUp } from "@/lib/motion";

// The real Discord invite link.
const DISCORD_INVITE = "https://discord.gg/FYB5HmYtg9";

function LabIllustration() {
  return (
    <div className="relative w-36 h-36 flex items-center justify-center select-none pointer-events-none bg-[#0c0d12]/40 border border-[#1c1d22] rounded-2xl overflow-hidden shadow-[inset_0_0_20px_rgba(88,101,242,0.15)]">
      {/* Retro CRT Scanlines & Grid Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,1)_50%,transparent_50%)] bg-[size:100%_4px]" />
      <div className="absolute inset-0 z-0 opacity-15 bg-[linear-gradient(rgba(88,101,242,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(88,101,242,0.1)_1px,transparent_1px)] bg-[size:8px_8px]" />

      {/* Floating Retro Container */}
      <motion.div
        className="relative z-10 w-20 h-20 flex items-center justify-center"
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 32 32"
          className="w-full h-full text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Liquid (Pixelated blocks) */}
          {/* Level 1 (bottom layer) */}
          <rect x="4" y="24" width="24" height="4" fill="#5865f2" opacity="0.85" />
          
          {/* Level 2 (middle layer) */}
          <motion.rect
            x="6"
            y="20"
            width="20"
            height="4"
            fill="#5865f2"
            opacity="0.95"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Level 3 (top wave layer - morphing left/right) */}
          <motion.rect
            y="16"
            height="4"
            fill="#eb459f"
            animate={{ x: [8, 12, 8], width: [16, 12, 16] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Beaker Pixel Outline */}
          {/* Lip */}
          <rect x="12" y="4" width="8" height="2" fill="currentColor" />
          {/* Neck */}
          <rect x="14" y="6" width="4" height="6" fill="none" stroke="currentColor" strokeWidth="2" />
          {/* Body Slopes (represented as stepped pixel blocks) */}
          <rect x="12" y="12" width="2" height="2" fill="currentColor" />
          <rect x="18" y="12" width="2" height="2" fill="currentColor" />
          
          <rect x="10" y="14" width="2" height="2" fill="currentColor" />
          <rect x="20" y="14" width="2" height="2" fill="currentColor" />
          
          <rect x="8" y="16" width="2" height="4" fill="currentColor" />
          <rect x="22" y="16" width="2" height="4" fill="currentColor" />
          
          <rect x="6" y="20" width="2" height="4" fill="currentColor" />
          <rect x="24" y="20" width="2" height="4" fill="currentColor" />
          
          <rect x="4" y="24" width="2" height="4" fill="currentColor" />
          <rect x="26" y="24" width="2" height="4" fill="currentColor" />
          
          {/* Bottom base */}
          <rect x="4" y="26" width="24" height="2" fill="currentColor" />
          
          {/* Glowing central core - pixel power source */}
          <motion.rect
            x="14"
            y="20"
            width="4"
            height="4"
            fill="#ffffff"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </svg>

        {/* Rising square pixel bubbles */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-2 h-2 bg-[#5865f2] border border-[#eb459f]/50"
              style={{
                left: `${35 + i * 7}%`,
                bottom: "35%",
              }}
              animate={{
                y: [0, -45],
                x: [0, (i % 2 === 0 ? 1 : -1) * 8],
                opacity: [0, 1, 0],
                rotate: [0, 90, 180],
              }}
              transition={{
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Retro Sparkle Spark */}
        <motion.div
          className="absolute z-30"
          style={{ top: "15%", right: "20%" }}
          animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
        >
          <svg viewBox="0 0 8 8" className="w-4 h-4 text-[#e2b714]" fill="currentColor">
            <rect x="3" y="0" width="2" height="8" />
            <rect x="0" y="3" width="8" height="2" />
          </svg>
        </motion.div>
      </motion.div>

      {/* 8-bit text label */}
      <div className="absolute bottom-2 text-[8px] font-pixel tracking-widest text-[#73767d] uppercase">
        SYS.ACTIVE
      </div>
    </div>
  );
}

export function DiscordPageClient() {
  const t = useTranslations("Discord");

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
          <Eyebrow glow>{t("eyebrow")}</Eyebrow>
        </motion.div>

        {/* Animated Retro Lab Beaker Illustration */}
        <motion.div variants={fadeUp} className="mt-4 mb-3">
          <LabIllustration />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-normal text-2xl sm:text-3xl md:text-5xl tracking-normal text-white mb-3 uppercase whitespace-nowrap"
        >
          {t("titlePre")} <span className="text-accent">{t("titlePost")}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="max-w-[55ch] text-soft text-[15px] md:text-[16px] leading-[1.5] mb-5 mx-0 text-balance"
        >
          {t("description")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex gap-3 flex-wrap justify-center mb-10"
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
            <span>{t("joinCTA")}</span>
          </Btn>
          <Link href="/">
            <Btn variant="ghost" className="px-8 py-4 text-base">
              {t("backHome")}
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
                {t("bugHunt.tagline")}
              </div>
              <span className="font-pixel text-[9px] text-[#73767d] tracking-wider">
                BUG-01
              </span>
            </div>

            <h3 className="font-sans font-extrabold text-white text-2xl md:text-[26px] leading-tight mb-4 tracking-tight">
              {t("bugHunt.title", { span: "" })}
              <br />
              <span className="text-[#39e17b]">{t("bugHunt.span")}</span>
            </h3>

            <p className="text-soft text-[13px] leading-relaxed mb-6 flex-grow">
              {t("bugHunt.description")}
            </p>

            {/* Prize block */}
            <div className="flex items-stretch rounded-xl border border-line-soft overflow-hidden mb-6 bg-[#11131a] max-w-xs">
              <div className="bg-[#39e17b] text-[#08090d] font-pixel text-[9px] tracking-wider font-extrabold px-4 flex items-center justify-center uppercase select-none">
                {t("bugHunt.prizeLabel")}
              </div>
              <div className="p-3 pl-4 flex flex-col justify-center">
                <div className="font-bold text-sm text-white">{t("bugHunt.prizeVal")}</div>
                <div className="text-[10px] text-muted">{t("bugHunt.prizeSub")}</div>
              </div>
            </div>

            {/* Role Badges */}
            <div className="flex gap-2 flex-wrap mb-8">
              <span className="px-3 py-1 rounded-full border border-line-soft text-[#73767d] text-[10px] font-pixel uppercase tracking-wide">
                {t("bugHunt.role1")}
              </span>
              <span className="px-3 py-1 rounded-full border border-line-soft text-[#73767d] text-[10px] font-pixel uppercase tracking-wide">
                {t("bugHunt.role2")}
              </span>
            </div>

            <Btn
              variant="primary"
              className="w-full justify-center !bg-white/5 !text-white border border-white/10 hover:!bg-[#39e17b] hover:!text-[#08090d] hover:!border-none transition-all py-3 rounded-xl mt-auto text-xs font-pixel uppercase tracking-wider"
              onClick={handleJoinDiscord}
            >
              {t("bugHunt.btn")}
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
                {t("motion.tagline")}
              </div>
              <span className="font-pixel text-[9px] text-[#73767d] tracking-wider">
                MOTION-02
              </span>
            </div>

            <h3 className="font-sans font-extrabold text-white text-2xl md:text-[26px] leading-tight mb-4 tracking-tight">
              {t("motion.title", { span: "" })}
              <br />
              <span className="text-[#eb459f]">{t("motion.span")}</span>
            </h3>

            <p className="text-soft text-[13px] leading-relaxed mb-6 flex-grow">
              {t("motion.description")}
            </p>

            {/* Prize block */}
            <div className="flex items-stretch rounded-xl border border-line-soft overflow-hidden mb-6 bg-[#11131a] max-w-xs">
              <div className="bg-[#eb459f] text-white font-pixel text-[8px] tracking-wider font-extrabold px-3 flex items-center justify-center uppercase select-none text-center leading-none">
                {t("motion.prizeLabel")}
              </div>
              <div className="p-3 pl-4 flex flex-col justify-center">
                <div className="font-bold text-sm text-white">{t("motion.prizeVal")}</div>
                <div className="text-[10px] text-muted">{t("motion.prizeSub")}</div>
              </div>
            </div>

            {/* Role Badges */}
            <div className="flex gap-2 flex-wrap mb-8">
              <span className="px-3 py-1 rounded-full border border-line-soft text-[#73767d] text-[10px] font-pixel uppercase tracking-wide">
                {t("motion.role1")}
              </span>
              <span className="px-3 py-1 rounded-full border border-line-soft text-[#73767d] text-[10px] font-pixel uppercase tracking-wide">
                {t("motion.role2")}
              </span>
            </div>

            <Btn
              variant="primary"
              className="w-full justify-center !bg-white/5 !text-white border border-white/10 hover:!bg-[#eb459f] hover:!text-white hover:!border-none transition-all py-3 rounded-xl mt-auto text-xs font-pixel uppercase tracking-wider"
              onClick={handleJoinDiscord}
            >
              {t("motion.btn")}
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
                {t("pool.tagline")}
              </div>
              <span className="font-pixel text-[9px] text-[#73767d] tracking-wider">
                POOL-03
              </span>
            </div>

            <h3 className="font-sans font-extrabold text-white text-2xl md:text-[26px] leading-tight mb-4 tracking-tight">
              {t("pool.title", { span: "" })}
              <br />
              <span className="text-[#e2b714]">{t("pool.span")}</span>
            </h3>

            <p className="text-soft text-[13px] leading-relaxed mb-6">
              {t("pool.description")}
            </p>

            {/* Custom mapping roles table */}
            <div className="border border-line-soft rounded-xl overflow-hidden mb-6 bg-[#11131a] text-[11px] leading-relaxed flex-grow">
              <div className="grid grid-cols-2 bg-[#0c0d12] px-4 py-2 border-b border-line-soft font-pixel text-[7px] text-[#73767d] uppercase tracking-wider">
                <div>{t("pool.tableCol1")}</div>
                <div>{t("pool.tableCol2")}</div>
              </div>
              <div className="divide-y divide-[#1c1d22]/50 max-h-[160px] overflow-y-auto">
                {[...Array(6)].map((_, idx) => {
                  const num = idx + 1;
                  return (
                    <div
                      key={idx}
                      className="grid grid-cols-2 px-4 py-2 hover:bg-white/5 transition-colors items-center"
                    >
                      <div className="text-[#73767d] line-through decoration-[#73767d]/40 truncate">
                        {t(`pool.trad${num}`)}
                      </div>
                      <div className="text-[#e2b714] font-medium flex items-center justify-between gap-1 pl-1 truncate">
                        <span className="truncate">{t(`pool.ai${num}`)}</span>
                        <span className="font-pixel text-[5px] px-1 py-0.5 rounded bg-[#e2b714]/10 border border-[#e2b714]/20 text-[#e2b714] uppercase shrink-0">
                          AI
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Btn
              variant="primary"
              className="w-full justify-center !bg-white/5 !text-white border border-white/10 hover:!bg-[#e2b714] hover:!text-[#08090d] hover:!border-none transition-all py-3 rounded-xl mt-auto text-xs font-pixel uppercase tracking-wider"
              onClick={handleJoinDiscord}
            >
              {t("pool.btn")}
            </Btn>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
