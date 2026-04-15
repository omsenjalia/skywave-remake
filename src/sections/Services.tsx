import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Globe, Palette, Search, Blocks, Link, type LucideIcon, ArrowUpRight } from 'lucide-react';
import { servicesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = { Smartphone, Globe, Palette, Search, Blocks, Link };

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  if (!servicesConfig.titleLine1 && servicesConfig.services.length === 0) return null;

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

      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(cards, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 });
          },
          once: true,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative w-full py-24 md:py-32" style={{ background: 'var(--bg-primary)' }}>
      <div className="glow-orb w-[500px] h-[500px] top-[20%] left-[-10%]" style={{ background: 'rgba(10, 132, 255, 0.04)' }} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20 opacity-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-blue)' }}>
            {servicesConfig.subtitle}
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6" style={{ color: 'var(--text-primary)' }}>
            {servicesConfig.titleLine1}{' '}
            <span className="gradient-text">{servicesConfig.titleLine2Italic}</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {servicesConfig.description}
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesConfig.services.map((service, index) => {
            const Icon = iconMap[service.iconName] || Globe;
            const color = (service as any).color || 'var(--accent-blue)';
            return (
              <div
                key={index}
                className="service-card group relative glass-panel rounded-2xl p-7 md:p-8 opacity-0 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{ '--card-color': color } as React.CSSProperties}
              >
                {/* Hover glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 0%, ${color}10 0%, transparent 60%)` }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                  >
                    <Icon className="w-5 h-5 transition-colors duration-300" style={{ color }} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-bold mb-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                    {service.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    {service.description}
                  </p>

                  {/* Learn more */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <span className="text-[12px] font-semibold" style={{ color }}>Learn more</span>
                    <ArrowUpRight className="w-3.5 h-3.5" style={{ color }} />
                  </div>
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
