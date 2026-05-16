'use client';

import { useState, useEffect } from 'react';
import { Header } from './Header';
import { NotifyModal } from './NotifyModal';
import { Hero } from './sections/Hero';
import { HowWeWork } from './sections/HowWeWork';
import { Methodology } from './sections/Methodology';
import { SelectedWork } from './sections/SelectedWork';
import { Pricing } from './sections/Pricing';
import { Foundation } from './sections/Foundation';
import { Engage } from './sections/Engage';
import { SiteFooter } from './sections/SiteFooter';

function FadeSection({ children }: { children: React.ReactNode }) {
  return <div data-fade>{children}</div>;
}

export default function AppShell() {
  const [notifyOpen, setNotifyOpen] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('[data-fade]').forEach((el) => el.classList.add('pn-fade-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('pn-fade-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-fade]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <FadeSection><HowWeWork /></FadeSection>
        <FadeSection><Methodology onNotify={() => setNotifyOpen(true)} /></FadeSection>
        <FadeSection><SelectedWork /></FadeSection>
        <FadeSection><Pricing /></FadeSection>
        <FadeSection><Foundation /></FadeSection>
        <FadeSection><Engage /></FadeSection>
      </main>
      <SiteFooter />
      <NotifyModal open={notifyOpen} onClose={() => setNotifyOpen(false)} />
    </div>
  );
}
