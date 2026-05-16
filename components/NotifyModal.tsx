"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "./icons";
import { Btn, Eyebrow } from "./ui/Atoms";
import { scaleIn, backdrop } from "@/lib/motion";

export function NotifyModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const validateEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = () => {
    if (!validateEmail(email)) { setError(true); return; }
    setError(false);
    console.log("AI Consultation notify signup:", email);
    setDone(true);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="notify-backdrop"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[100] bg-[rgba(8,9,13,0.75)] backdrop-blur-[6px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
        <motion.div
          key="notify-card"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-[480px] bg-card rounded-[20px] p-[32px_28px] border border-line pn-ring-wrap pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 mb-5 relative z-20">
            <div>
              <Eyebrow>COMING SOON</Eyebrow>
              <h3 className="font-sans font-extrabold text-[22px] tracking-[-0.018em] text-white mt-3 mb-0">
                AI Consultation
              </h3>
            </div>
            <button
              onClick={onClose}
              className="bg-transparent border-0 text-muted p-1.5 cursor-pointer transition-colors duration-fast hover:text-white"
              aria-label="Close"
            >
              <Icon name="x" size={18} />
            </button>
          </div>

          {!done ? (
            <>
              <p className="text-soft text-[14px] leading-[1.6] mb-5 mx-0 mt-0 relative z-20">
                Drop your email and we&apos;ll ping you the day AI Consultation
                goes live. No newsletter, no drip, one signal, one email.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(false); }}
                placeholder="you@company.com"
                className={`w-full bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none transition-colors duration-fast placeholder:text-muted focus:border-accent relative z-20 ${error ? "border-accent" : "border-line-soft"}`}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
              {error && (
                <div className="mt-2 font-pixel text-[9px] tracking-[0.14em] text-accent uppercase relative z-20">
                  Please enter a valid email address.
                </div>
              )}
              <div className="mt-6 flex justify-end gap-3 relative z-20">
                <Btn variant="text" onClick={onClose}>Cancel</Btn>
                <Btn variant="primary" onClick={submit}>
                  Notify me <span className="text-[12px] opacity-80">→</span>
                </Btn>
              </div>
            </>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-soft text-[14px] leading-[1.6] mb-5 mx-0 mt-0 relative z-20"
            >
              Got it. We&apos;ll email{" "}
              <span className="text-accent">{email}</span> the day it ships.
            </motion.p>
          )}
        </motion.div>
      </div>
    </>
  );
}
