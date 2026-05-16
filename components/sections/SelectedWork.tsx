import { SectionHead } from '../ui/Atoms';
import Image from 'next/image';

type CaseTileProps = {
  name: string;
  geo: string;
  tag: string;
  year: string;
  body: string;
  img?: string;
  link: string;
  size?: 'big' | 'med';
};

function CaseTile({ name, geo, tag, year, body, img, link, size = 'med' }: CaseTileProps) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`bg-card rounded-[24px] p-6 flex flex-col gap-4 min-h-[380px] relative overflow-hidden isolate border border-line transition-all duration-fast hover:bg-card-soft hover:border-soft hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group ${size === 'big' ? 'lg:col-span-3' : 'lg:col-span-3'}`}
    >
      <div className="flex justify-between items-center">
        <span className="font-pixel text-[9px] tracking-[0.15em] text-accent uppercase">{tag}</span>
        <span className="text-muted font-pixel text-[9px] tracking-[0.15em]">{year}</span>
      </div>
      
      <div className="rounded-xl flex-1 min-h-[160px] relative overflow-hidden bg-card-soft border border-line-soft">
        {img ? (
          <Image 
            src={img} 
            alt={name} 
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-10" />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="font-sans font-extrabold text-[20px] text-white tracking-tight uppercase">{name}</div>
        <div className="font-pixel text-[9px] tracking-[0.16em] text-muted uppercase">{geo}</div>
      </div>
      
      <p className="text-soft text-[14px] leading-[1.6] line-clamp-3">{body}</p>
      
      <div className="mt-auto pt-4 flex items-center gap-2 text-[12px] font-bold text-accent">
        VIEW PROJECT <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </a>
  );
}

export function SelectedWork() {
  return (
    <section id="selected-work" className="relative px-page-x py-[140px] max-w-max-w mx-auto">
      <SectionHead
        n="03"
        label="SELECTED WORK"
        title="PROVEN OPERATIONAL TRANSFORMATIONS."
        link="View archive"
      />
      <div className="grid grid-cols-1 lg:grid-cols-[repeat(9,1fr)] gap-5">
        <CaseTile
          size="big"
          img="/work/epidom.png"
          link="https://epidom-eight.vercel.app/"
          name="EPIDOM"
          geo="🇫🇷 FRANCE · EUROPE"
          tag="F&B · INVENTORY MGMT"
          year="2026"
          body="Developed a cookie bar inventory management system for a European F&B operator. Designed for multi-location tracking, the system replaced manual processes with a centralized digital solution, cutting operational overhead."
        />
        <CaseTile
          size="med"
          img="/work/expeditoo.png"
          link="https://expeditoo-rho.vercel.app/"
          name="EXPEDITOO"
          geo="🇫🇷 FRANCE · EUROPE"
          tag="LOGISTICS · MARKETPLACE"
          year="2025"
          body="Engineered a logistics and auction marketplace combining bidding mechanics and shipment tracking into a single application. Demonstrates full-stack capability across complex business logic."
        />
        <CaseTile
          size="med"
          img="/work/lead-agent.png"
          link="https://lead-agent-lac.vercel.app/"
          name="The Lead Agent"
          geo="🇦🇺 AUSTRALIA"
          tag="REAL ESTATE · LEAD GEN"
          year="2026"
          body="Built a full lead generation and appointment-setting platform for a real estate agency. Delivered a client-facing web system that automates pipeline management for ambitious estate agents operating across AU."
        />
      </div>
    </section>
  );
}

