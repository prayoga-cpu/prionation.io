"use client";

type Props = {
  label: string;
  sublabel: string;
  disabled?: boolean;
  onClick: () => void;
};

export function RoleCard({ label, sublabel, disabled, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group w-full text-left bg-card border border-line rounded-2xl px-6 py-8 transition-colors hover:border-accent-30 hover:bg-accent-10 disabled:opacity-50 disabled:pointer-events-none"
    >
      <p className="font-pixel text-[9px] tracking-[0.15em] text-muted uppercase mb-3 group-hover:text-accent transition-colors">
        {sublabel}
      </p>
      <p className="font-sans text-xl font-semibold text-white">{label}</p>
    </button>
  );
}
