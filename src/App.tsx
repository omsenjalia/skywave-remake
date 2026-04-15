import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { Hero } from './sections/Hero';
import { IntroGrid } from './sections/IntroGrid';
import { Services } from './sections/Services';
import { WhyChooseMe } from './sections/WhyChooseMe';
import { TechStack } from './sections/TechStack';
import { FeaturedProjects } from './sections/FeaturedProjects';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import { siteConfig } from '@/config';
import './App.css';

function App() {
  useLenis();

  useEffect(() => {
    if (siteConfig.siteTitle) {
      document.title = siteConfig.siteTitle;
    }
    if (siteConfig.siteDescription) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', siteConfig.siteDescription);
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
  }, []);

  return (
    <div className="min-h-screen w-full relative" style={{ background: 'var(--bg-primary)' }}>
      {/* Desktop wallpaper gradient */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(10, 132, 255, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(191, 90, 242, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 20% 80%, rgba(100, 210, 255, 0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* macOS Window Container */}
      <div className="relative w-full max-w-[1600px] mx-auto pt-6 md:pt-10 pb-6 md:pb-10 px-3 md:px-8">
        <div className="mac-window relative" style={{ background: 'var(--bg-secondary)' }}>
          
          {/* macOS Title Bar */}
          <div className="mac-titlebar sticky top-0 z-[100]">
            <div className="flex gap-[8px] items-center">
              <div className="mac-dot mac-dot-red" />
              <div className="mac-dot mac-dot-yellow" />
              <div className="mac-dot mac-dot-green" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-[11px] text-white/30 font-medium tracking-wide select-none" style={{ fontFamily: "'Inter', sans-serif" }}>
                skywaveinfosolutions.com
              </span>
            </div>
            <div className="w-[52px]" /> {/* Balance spacer */}
          </div>

          {/* Window Content */}
          <main className="relative w-full overflow-x-hidden noise-bg" style={{ background: 'var(--bg-primary)' }}>
            <Hero />
            <IntroGrid />
            <Services />
            <WhyChooseMe />
            <TechStack />
            <FeaturedProjects />
            <Testimonials />
            <FAQ />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
