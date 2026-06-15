"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { m, AnimatePresence } from "framer-motion";
import { Icon } from "../icons";
import { SectionHead, Btn } from "../ui/Atoms";
import { MeetUsTab } from "./engage/MeetUsTab";
import { CareersTab } from "./engage/CareersTab";
import { DiagnosticTab } from "./engage/DiagnosticForm";
import { slideUp, backdrop, fadeUp, fadeIn } from "@/lib/motion";

type Tab = "Meet Us" | "Diagnostic" | "Careers";



function TabPanel({ tabKey, children }: { tabKey: string; children: React.ReactNode }) {
  return (
    <m.div key={tabKey} variants={fadeIn} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.25 }}>
      {children}
    </m.div>
  );
}

// ─── Main Engage component ────────────────────────────────────────────────────

export function Engage() {
  const t = useTranslations("Engage");

  const [activeTab, setActiveTab] = useState<Tab>("Diagnostic");
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Client-only flag gating the portal render below; document.body is unavailable during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount flag, the extra render is intentional
    setMounted(true);
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes("tab=meet"))           setActiveTab("Meet Us");
      else if (hash.includes("tab=careers"))   setActiveTab("Careers");
      else if (hash.includes("tab=diagnostic")) setActiveTab("Diagnostic");
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  const ts = useTranslations("Engage.success");

  if (submitted) {
    return (
      <section id="engage" className="relative px-page-x pt-[110px] pb-[140px] max-w-max-w mx-auto">
        <m.div variants={fadeUp} initial="hidden" animate="visible"
          className="max-w-[720px] mx-auto bg-card rounded-[28px] p-[64px_48px] text-center bg-[radial-gradient(hsla(0,0%,100%,0.04)_1.2px,transparent_0)] bg-[size:22px_22px] pn-ring-wrap"
        >
          <m.span
            initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
            className="inline-flex items-center justify-center w-[56px] h-[56px] rounded-full bg-accent text-white mb-6 shadow-[0_0_0_6px_var(--c-accent-10)] relative z-20"
          >
            <Icon name="check-circle" size={20} />
          </m.span>
          <h2 className="font-sans font-extrabold text-[clamp(28px,3.4vw,40px)] tracking-[-0.024em] leading-[1.08] text-white m-0 relative z-20">
            {ts("title")}
          </h2>
          <p className="m-[18px_auto_32px] max-w-[52ch] text-soft text-[15px] leading-[1.6] relative z-20">
            {ts("desc")}
          </p>
          <div className="flex justify-center gap-6 flex-wrap font-pixel text-[10px] tracking-[0.15em] text-muted relative z-20">
            <span>{ts("stat1_label")} · <b className="text-white font-normal">{ts("stat1_value")}</b></span>
            <span>{ts("stat2_label")} · <b className="text-white font-normal">{ts("stat2_value")}</b></span>
            <span>{ts("stat3_label")} · <b className="text-white font-normal">{ts("stat3_value")}</b></span>
          </div>
          <button
            className="mt-8 bg-transparent border-0 p-0 cursor-pointer text-soft font-sans font-semibold text-[13px] inline-flex items-center gap-2 hover:text-white relative z-20"
            onClick={() => setSubmitted(false)}
          >
            {ts("reset")} <span aria-hidden="true" className="text-[12px] opacity-80">→</span>
          </button>
        </m.div>
      </section>
    );
  }

  const tabLabel = (tab: Tab) => {
    if (tab === "Meet Us") return t("tab_meet");
    if (tab === "Diagnostic") return t("tab_diagnostic");
    return t("tab_careers");
  };

  const mobileTitle = activeTab === "Careers" ? t("mobile_titles.careers") : activeTab === "Meet Us" ? t("mobile_titles.meet") : t("mobile_titles.diagnostic");
  const mobileDesc  = activeTab === "Careers" ? t("mobile_descs.careers")  : activeTab === "Meet Us" ? t("mobile_descs.meet")  : t("mobile_descs.diagnostic");
  const mobileCta   = activeTab === "Careers" ? t("mobile_ctas.careers")   : activeTab === "Meet Us" ? t("mobile_ctas.meet")   : t("mobile_ctas.diagnostic");

  return (
    <section id="engage" className="relative px-page-x pt-[110px] pb-[140px] max-w-max-w mx-auto">
      <SectionHead n="06" label={t("label")} title={t("title")} />

      <div className="bg-card rounded-[28px] p-[56px_clamp(24px,4vw,56px)] overflow-hidden bg-[radial-gradient(hsla(0,0%,100%,0.04)_1.2px,transparent_0)] bg-[size:22px_22px] bg-[-11px_-11px] pn-ring-wrap">

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-4 mb-10 relative z-20">
          <div className="flex bg-card-soft border border-line-soft rounded-full p-1">
            {(["Meet Us", "Diagnostic"] as Tab[]).map((tab) => (
              <m.button key={tab} type="button"
                onClick={() => { setActiveTab(tab); window.location.hash = `engage?tab=${tab === "Meet Us" ? "meet" : tab.toLowerCase()}`; }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className={`px-6 py-2 font-sans font-semibold text-[13px] rounded-full transition-all duration-fast ${activeTab === tab ? "bg-accent text-white shadow-sm" : "text-soft hover:text-white"}`}
              >
                {tabLabel(tab)}
              </m.button>
            ))}
          </div>

          <m.button type="button"
            onClick={() => { setActiveTab("Careers"); window.location.hash = "engage?tab=careers"; }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className={`px-6 py-2 font-sans font-semibold text-[13px] rounded-full border transition-all duration-fast ${activeTab === "Careers" ? "bg-white text-card border-white shadow-sm" : "bg-transparent border-line-soft text-soft hover:text-white hover:border-soft"}`}
          >
            {t("tab_careers")}
          </m.button>
        </div>

        {/* Desktop tab content */}
        <div className="hidden lg:block relative z-20">
          <AnimatePresence mode="wait">
            {activeTab === "Meet Us"    && <TabPanel key="meet"       tabKey="meet"><MeetUsTab /></TabPanel>}
            {activeTab === "Diagnostic" && <TabPanel key="diagnostic" tabKey="diagnostic"><DiagnosticTab setSubmitted={setSubmitted} /></TabPanel>}
            {activeTab === "Careers"    && <TabPanel key="careers"    tabKey="careers"><CareersTab /></TabPanel>}
          </AnimatePresence>
        </div>

        {/* Mobile CTA */}
        <div className="block lg:hidden relative z-20">
          <div className="bg-card-soft border border-line-soft rounded-2xl p-8 text-center">
            <h3 className="font-sans font-bold text-white text-[20px] mb-3">{mobileTitle}</h3>
            <p className="text-soft text-[14px] leading-[1.6] mb-8 max-w-[32ch] mx-auto">{mobileDesc}</p>
            <Btn variant="primary" className="w-full justify-center" onClick={() => setIsModalOpen(true)}>
              {mobileCta} <span className="text-[12px] opacity-80">→</span>
            </Btn>
          </div>
        </div>
      </div>

      {/* Mobile modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <>
              <m.div key="engage-backdrop" variants={backdrop} initial="hidden" animate="visible" exit="exit"
                className="fixed inset-0 z-[190] bg-black/60" onClick={() => setIsModalOpen(false)} />
              <m.div key="engage-sheet" variants={slideUp} initial="hidden" animate="visible" exit="exit"
                className="fixed inset-x-0 bottom-0 top-0 z-[200] bg-bg flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-line sticky top-0 bg-bg z-20">
                  <span className="font-pixel text-[10px] tracking-[0.2em] text-accent uppercase">
                    {tabLabel(activeTab)} {t("modal_form")}
                  </span>
                  <m.button onClick={() => setIsModalOpen(false)}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="text-white bg-white/5 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                  >
                    <Icon name="x" size={20} />
                  </m.button>
                </div>
                <div className="flex-1 overflow-y-auto py-6 px-4 pb-20">
                  <AnimatePresence mode="wait">
                    {activeTab === "Meet Us"    && <TabPanel key="modal-meet"       tabKey="modal-meet"><MeetUsTab /></TabPanel>}
                    {activeTab === "Diagnostic" && <TabPanel key="modal-diagnostic" tabKey="modal-diagnostic"><DiagnosticTab setSubmitted={setSubmitted} /></TabPanel>}
                    {activeTab === "Careers"    && <TabPanel key="modal-careers"    tabKey="modal-careers"><CareersTab /></TabPanel>}
                  </AnimatePresence>
                </div>
              </m.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}


