"use client";

import { Link } from "@/i18n/routing";

export function ManifestoPage() {
  return (
    <div className="px-page-x pt-[130px] pb-[120px]">
      <div className="max-w-[760px] mx-auto">
        <nav className="flex items-center gap-1.5 text-[12px] text-muted font-sans flex-wrap mb-10" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <Link href="/ai-product-engineering-for-mid-market-companies" className="hover:text-white transition-colors">AI Product Engineering</Link>
          <span className="opacity-40">/</span>
          <span className="text-soft">Manifesto</span>
        </nav>

        <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-6">
          THE MANIFESTO
        </div>
        
        <h1 className="font-sans font-extrabold text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.03em] text-white mb-10">
          The firms that sold you "digital transformation" in 2015 are now selling you "AI transformation."
        </h1>

        <div className="prose-like text-soft text-[17px] md:text-[19px] leading-[1.7] space-y-6">
          <p>
            Same playbook. Same methodology decks. Same €500K engagement that ends with a roadmap and a handshake.
          </p>
          <p>
            Different acronym.
          </p>
          <p>
            Most AI projects fail in production. Not because the model was wrong. Not because the data was bad. Because the people who designed the system had never shipped a production AI in their careers. They'd shipped recommendations. They'd shipped decks. They'd shipped pilots.
          </p>
          <p>
            And when the pilot didn't survive contact with real operations, they were already on their next engagement.
          </p>
          <p className="font-medium text-white p-6 border-l-2 border-accent bg-accent/5 my-8 rounded-r-lg">
            That's the dirty secret of AI consulting: the billable model rewards the recommendation, not the result.
          </p>
        </div>

        <div className="my-16 flex justify-center opacity-40">
          <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="4" fill="currentColor"/>
            <rect x="18" width="4" height="4" fill="currentColor"/>
            <rect x="36" width="4" height="4" fill="currentColor"/>
          </svg>
        </div>

        <h2 className="font-sans font-bold text-[clamp(24px,3vw,32px)] text-white tracking-[-0.02em] mb-10">
          Before your next AI engagement, ask three questions:
        </h2>

        <div className="space-y-8">
          <div className="bg-card border border-line-soft rounded-[20px] p-6 md:p-8 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-10 h-10 rounded-full bg-accent-10 border border-accent-30 flex items-center justify-center shrink-0 font-pixel text-[14px] text-accent mt-0.5">1</div>
              <div>
                <h3 className="text-white font-bold text-[20px] mb-3">Do they write evals before features?</h3>
                <p className="text-soft text-[16px] leading-[1.7] mb-5">
                  Every production AI system needs a test suite — cases that define what "correct" looks like for your specific problem. If they can't show you an eval harness before they write a single prompt, they have no way to measure whether what they built is actually working. No regression protection. No accountability.
                </p>
                <div className="text-[12px] font-pixel tracking-[0.05em] text-accent uppercase">Most don't have one. Ask to see it.</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-line-soft rounded-[20px] p-6 md:p-8 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 font-pixel text-[14px] text-blue-400 mt-0.5">2</div>
              <div>
                <h3 className="text-white font-bold text-[20px] mb-3">Do they instrument telemetry from day one?</h3>
                <p className="text-soft text-[16px] leading-[1.7] mb-5">
                  "The model is wrong" is unfalsifiable without logs. Production AI without telemetry means you inherit a black box. When it breaks — and it will — you'll have no way to diagnose it, iterate on it, or hold anyone accountable.
                </p>
                <div className="text-[12px] font-pixel tracking-[0.05em] text-blue-400 uppercase">Most don't instrument. Ask to see their observability setup.</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-line-soft rounded-[20px] p-6 md:p-8 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 font-pixel text-[14px] text-green-400 mt-0.5">3</div>
              <div>
                <h3 className="text-white font-bold text-[20px] mb-3">Do you own the code, the hosting, the data, and the models?</h3>
                <p className="text-soft text-[16px] leading-[1.7] mb-5">
                  Or do you own a SaaS subscription that disappears when they pivot? Owned infrastructure isn't just a security question — it's whether you're building a competitive asset or a dependency.
                </p>
                <div className="text-[12px] font-pixel tracking-[0.05em] text-green-400 uppercase">Most leave you with the dependency. Ask for the ownership clause in the contract.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-16 flex justify-center opacity-40">
          <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="4" fill="currentColor"/>
            <rect x="18" width="4" height="4" fill="currentColor"/>
            <rect x="36" width="4" height="4" fill="currentColor"/>
          </svg>
        </div>

        <div className="prose-like text-soft text-[17px] md:text-[19px] leading-[1.7] space-y-6">
          <p>
            If the answers are no, no, and no — you're not working with an engineering partner. You're working with a vendor who's designed the engagement so you'll always need them for the next one.
          </p>
          <p className="font-bold text-white text-[22px] leading-snug pt-4">
            That's not AI Product Engineering. That's AI consulting.<br/>
            <span className="text-accent">They're not the same thing.</span>
          </p>
        </div>

        <div className="my-16 border-t border-line-soft pt-16">
          <h2 className="font-sans font-extrabold text-[clamp(28px,3.5vw,40px)] text-white tracking-[-0.02em] mb-8">
            This is the gap I built PRIONATION to close.
          </h2>
          <div className="space-y-4 text-soft text-[17px] leading-[1.7] mb-10">
            <p><strong className="text-white">We don't write roadmaps.</strong> We write eval suites.</p>
            <p><strong className="text-white">We don't recommend infrastructure.</strong> We build it and hand you the keys.</p>
            <p><strong className="text-white">We don't run 6-month discovery engagements.</strong> We run an 8-week Diagnostic + Build, fixed scope, fixed price, or we don't take the work.</p>
          </div>

          <div className="p-6 md:p-8 bg-card border border-line-soft rounded-[20px]">
            <div className="font-pixel text-[10px] tracking-[0.15em] text-accent uppercase mb-6">The accountability is structural</div>
            <ul className="space-y-4 font-sans text-soft text-[15px] md:text-[16px]">
              <li className="flex items-start gap-4">
                <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span><strong className="text-white">Evals before features.</strong> Always.</span>
              </li>
              <li className="flex items-start gap-4">
                <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span><strong className="text-white">Telemetry from day one.</strong> Always.</span>
              </li>
              <li className="flex items-start gap-4">
                <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span><strong className="text-white">Owned infrastructure.</strong> Always.</span>
              </li>
              <li className="flex items-start gap-4">
                <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span><strong className="text-white">≥60% of Diagnostics become Builds</strong> — because we only take engagements where the math works.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-16 flex justify-center opacity-40">
          <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="4" fill="currentColor"/>
            <rect x="18" width="4" height="4" fill="currentColor"/>
            <rect x="36" width="4" height="4" fill="currentColor"/>
          </svg>
        </div>

        <div className="prose-like text-soft text-[17px] md:text-[19px] leading-[1.7] space-y-6 text-center">
          <p>There's a generation of mid-market companies that got burned by the first wave of "AI transformation."</p>
          <p>I talk to their operators every week.</p>
          <p>
            They're not skeptical of AI.<br/>
            <span className="text-white font-medium">They're skeptical of the industry that sold it to them.</span>
          </p>
          <p>They're right to be.</p>
          
          <div className="pt-8 pb-4">
            <p className="font-bold text-white text-[20px] md:text-[26px] max-w-[28ch] mx-auto leading-snug">
              If you've been burned before and you have a bottleneck you can name in one sentence — that's the only qualification to work with us.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-line-soft flex justify-center">
          <div className="bg-card border border-accent/30 rounded-[32px] p-8 md:p-12 text-center shadow-[0_0_50px_rgba(88,101,242,0.1)] relative overflow-hidden group w-full max-w-[500px]">
             <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <h3 className="font-sans font-extrabold text-[28px] text-white mb-3">Name your bottleneck.</h3>
              <p className="text-muted text-[15px] mb-8">Take 2 minutes to fill out the intake form. We'll review it and respond within 24 hours.</p>
              <Link
                href="/#engage"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-sans font-bold text-[15px] hover:bg-accent/90 transition-transform hover:scale-105"
              >
                Start Intake <span className="opacity-80">→</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
