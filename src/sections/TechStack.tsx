import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { techStackConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const categoryColors: Record<string, string> = {
  Frontend: '#0A84FF',
  Backend: '#30D158',
  Mobile: '#FF9F0A',
  Database: '#BF5AF2',
  Cloud: '#64D2FF',
  DevOps: '#FF453A',
};

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  if (!techStackConfig.titleRegular && techStackConfig.categories.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(headerRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
        },
        once: true,
      });

      const cards = gridRef.current?.querySelectorAll('.tech-category');
      if (cards) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(cards, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 });
          },
          once: true,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="solutions" className="relative w-full py-24 md:py-32" style={{ background: 'var(--bg-primary)' }}>
      <div className="glow-orb w-[500px] h-[500px] top-[20%] left-0" style={{ background: 'rgba(100, 210, 255, 0.03)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20 opacity-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-blue)' }}>
            {techStackConfig.subtitle}
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
            {techStackConfig.titleRegular}{' '}
            <span className="gradient-text">{techStackConfig.titleItalic}</span>
          </h2>
        </div>

        {/* Category Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStackConfig.categories.map((category, index) => {
            const color = categoryColors[category.name] || 'var(--accent-blue)';
            return (
              <div
                key={index}
                className="tech-category glass-panel rounded-2xl p-6 md:p-7 opacity-0 group transition-all duration-500 hover:-translate-y-1"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color }}>
                    {category.name}
                  </h3>
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-300 cursor-default hover:scale-105"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 w-full" />
    </section>
  );
}
