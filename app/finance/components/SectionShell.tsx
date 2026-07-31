export function SectionShell({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-7 sm:py-10 border-b border-line">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <span className="font-pixel text-[9px] sm:text-[10px] text-accent">{number}</span>
        <h2 className="font-pixel text-[9px] sm:text-[10px] tracking-[0.15em] text-white uppercase">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
