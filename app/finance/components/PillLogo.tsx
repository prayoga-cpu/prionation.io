// Same pill wordmark as the marketing site's desktop header
// (components/Header.tsx's Wordmark) — static here since /finance has no
// "#top" to scroll to and no next-intl.
export function PillLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`inline-flex items-center border-2 border-white rounded-full text-white font-sans font-extrabold leading-none tracking-[-0.025em] ${
        compact ? "pl-[10px] pr-1 py-0.5 gap-1 text-[14px]" : "pl-[14px] pr-1 py-0.5 gap-1.5 text-[19px]"
      }`}
    >
      PRIONATION
      <span
        className={`bg-white text-black rounded-full font-bold tracking-[-0.02em] leading-none ${
          compact ? "pt-[2px] px-[5px] pb-[1px] text-[9px]" : "pt-[3px] px-[7px] pb-[1px] text-[12px]"
        }`}
      >
        .io
      </span>
    </div>
  );
}
