import { SectionHead } from "../ui/Atoms";
import { Icon } from "../icons";

type PersonCardProps = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  pixel: string;
};

function PersonCard({
  name,
  role,
  bio,
  image,
  linkedin,
  pixel,
}: PersonCardProps) {
  return (
    <div className="bg-card border border-line rounded-[28px] overflow-hidden flex flex-col transition-all duration-fast hover:border-line-soft group">
      <div className="aspect-[4/5] relative overflow-hidden bg-card-soft">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 z-10">
          <span className="font-pixel text-[8px] tracking-[0.16em] text-white/50 uppercase bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
            {pixel}
          </span>
        </div>
      </div>
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-sans font-extrabold text-[24px] tracking-[-0.018em] text-white mb-0.5 leading-tight">
              {name}
            </h3>
            <div className="font-pixel text-[9px] tracking-[0.16em] text-accent uppercase">
              {role}
            </div>
          </div>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 transition-all hover:bg-white/10 hover:text-white"
            aria-label={`${name}'s LinkedIn`}
          >
            <Icon name="linkedin" size={18} />
          </a>
        </div>
        <p className="mb-8 text-soft text-[14px] leading-[1.6]">{bio}</p>
        <div className="mt-auto flex items-center gap-2 text-[10px] text-muted font-sans font-medium uppercase tracking-wider opacity-60">
          <Icon name="linkedin" size={12} className="text-muted" />
          Powered by LinkedIn
        </div>
      </div>
    </div>
  );
}

export function Foundation() {
  return (
    <section
      id="foundation"
      className="relative px-page-x py-[110px] max-w-max-w mx-auto"
    >
      <SectionHead
        n="05"
        label="THE FOUNDATION"
        title="GLOBAL TALENT, INDONESIAN ROOTS."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PersonCard
          pixel="ROLE · FOUNDER / CEO"
          name="Darwin Prayoga"
          role="Founder & CEO"
          image="/images/team/darwin.jpeg"
          linkedin="https://www.linkedin.com/in/darwinprayoga/"
          bio="Indonesian technologist and product architect. Former lead at several high-growth startups across SEA. Orchestrates the PRIONATION transformation, owning vision and product strategy."
        />
        <PersonCard
          pixel="ROLE · CRO"
          name="Evan Cao"
          role="Chief Revenue Officer"
          image="/images/team/evan.jpeg"
          linkedin="https://www.linkedin.com/in/evan-cao-52282bb6/"
          bio="Paris-based operator and founder of Epidom. Expert in European mid-market expansion and strategic partnerships. Bridging the gap between Asian delivery and European demand."
        />
        <div className="bg-card border border-line rounded-[28px] p-7 flex flex-col justify-center border-dashed bg-transparent">
          <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
            <Icon name="users" size={24} />
          </div>
          <h3 className="font-sans font-extrabold text-[22px] tracking-[-0.018em] text-white mb-2 leading-tight">
            The Delivery Pod
          </h3>
          <div className="font-pixel text-[9px] tracking-[0.16em] text-muted uppercase mb-4">
            AI PRODUCT ENGINEERING
          </div>
          <p className="text-muted text-[14px] leading-[1.6] mb-0">
            A flexible unit of 2–3 AI Product Engineers. Domain experts
            converted into AI-native operators, shipping production-ready
            infrastructure end-to-end.
          </p>
        </div>
      </div>
    </section>
  );
}
