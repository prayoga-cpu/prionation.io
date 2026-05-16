"use client";

import { useState, useEffect } from "react";
import { Icon } from "./icons";

const NAV_ITEMS: [string, string][] = [
  ["how-we-work", "How we work"],
  ["methodology", "Methodology"],
  ["selected-work", "Work"],
  ["pricing", "Pricing"],
  ["foundation", "Foundation"],
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Wordmark() {
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        scrollTo("top");
      }}
      className="inline-flex items-center transition-transform duration-fast hover:scale-[1.03]"
      aria-label="PRIONATION.io"
    >
      <div className="lg:hidden h-9">
        <svg
          className="h-full w-auto"
          viewBox="0 0 174 322"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_60_2)">
            <path
              d="M161.594 178.315C161.594 191.264 157.049 202.282 147.958 211.373C139.143 220.189 128.399 224.596 115.727 224.596H58.2888C45.6167 224.596 34.7351 220.189 25.6442 211.373C16.5533 202.282 12.0078 191.264 12.0078 178.315V56.8281C12.0078 48.2883 14.0739 40.5746 18.2062 33.6877C22.6139 26.5251 28.2613 20.8779 35.1483 16.7457C42.0352 12.6135 49.7489 10.5474 58.2888 10.5474H115.727C124.267 10.5474 131.98 12.6135 138.867 16.7457C145.754 20.8779 151.264 26.5251 155.396 33.6877C159.528 40.5746 161.594 48.2883 161.594 56.8281V178.315ZM112.834 170.464V65.5058C112.834 63.8529 112.146 62.4754 110.768 61.3736C109.666 60.2717 108.427 59.7207 107.049 59.7207H66.9664C65.5889 59.7207 64.2117 60.2717 62.8342 61.3736C61.7324 62.4754 61.1813 63.8529 61.1813 65.5058V170.464C61.1813 171.842 61.7324 173.082 62.8342 174.183C64.2117 175.284 65.5889 175.836 66.9664 175.836H107.049C108.427 175.836 109.666 175.284 110.768 174.183C112.146 173.082 112.834 171.842 112.834 170.464Z"
              fill="white"
            />
            <path
              d="M73.9911 277.541C73.9911 286.079 70.8232 293.382 64.487 299.441C58.4265 305.501 51.126 308.532 42.5862 308.532C34.3217 308.532 27.0215 305.501 20.6854 299.441C14.6248 293.382 11.5945 286.079 11.5945 277.541C11.5945 269.002 14.6248 261.699 20.6854 255.64C27.0215 249.58 34.3217 246.549 42.5862 246.549C51.126 246.549 58.4265 249.58 64.487 255.64C70.8232 261.699 73.9911 269.002 73.9911 277.541Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_60_2"
              x="0.000119209"
              y="-0.000104785"
              width="173.189"
              height="321.174"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1.0469" />
              <feGaussianBlur stdDeviation="5.79718" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_60_2"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_60_2"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="hidden lg:flex items-center border-2 border-white rounded-full pl-[14px] pr-1 py-0.5 gap-1.5 text-white font-sans font-extrabold leading-none tracking-[-0.025em] text-[19px]">
        PRIONATION
        <span className="bg-white text-black rounded-full pt-[3px] px-[7px] pb-[1px] font-bold tracking-[-0.02em] leading-none text-[12px]">
          .io
        </span>
      </div>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const go = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => scrollTo(id), 30);
  };

  const navBaseClasses =
    "fixed top-0 w-full z-50 flex items-center justify-between px-page-x py-[14px] backdrop-blur-[8px] transition-colors duration-normal shadow-md";
  const navScrollClasses = scrolled
    ? "bg-[linear-gradient(180deg,rgba(8,9,13,0.85),rgba(8,9,13,0.5)_20%,transparent)] border-transparent"
    : "bg-transparent border-transparent";

  return (
    <>
      <header className={`${navBaseClasses} ${navScrollClasses}`}>
        <Wordmark />
        <nav className="hidden lg:flex gap-7 text-[13px] text-soft">
          {NAV_ITEMS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                go(id);
              }}
              className="transition-colors duration-fast hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#engage?tab=diagnostic"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = "engage?tab=diagnostic";
            go("engage");
          }}
          className="hidden lg:inline-flex items-center gap-2 px-4 py-[9px] rounded-full bg-white text-[#08090d] font-semibold text-[13px] transition-all duration-fast hover:scale-[1.03] hover:bg-[#e6e6f0]"
        >
          Start a Diagnostic <span className="text-[12px] opacity-80">→</span>
        </a>
        <button
          className="lg:hidden inline-flex bg-transparent text-white border-0 p-1.5 cursor-pointer"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <Icon name={mobileOpen ? "x" : "menu"} size={22} />
        </button>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bg px-page-x pt-[80px] pb-[40px] flex flex-col">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(id);
                }}
                className="py-[18px] text-[22px] font-semibold text-white border-b border-line"
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => go("engage")}
              className="mt-7 self-start inline-flex items-center gap-2.5 px-[22px] py-[13px] rounded-full font-sans font-semibold text-sm cursor-pointer transition-all duration-fast whitespace-nowrap hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] bg-white text-[#08090d] hover:bg-[#e6e6f0]"
            >
              Start a Diagnostic{" "}
              <span className="text-[12px] opacity-80">→</span>
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
