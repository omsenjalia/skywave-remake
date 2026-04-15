import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { introGridConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

function Counter({ end, suffix = '', shouldAnimate }: { end: number; suffix?: string; shouldAnimate: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;
    const duration = 2000;
    const start = Date.now();
    const update = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(update);
      else setCount(end);
    };
    requestAnimationFrame(update);
  }, [end, shouldAnimate]);

  return <span>{count}{suffix}</span>;
}

export function IntroGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [animateStats, setAnimateStats] = useState(false);

  if (!introGridConfig.titleLine1 && introGridConfig.portfolioImages.length === 0) return null;

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

      const gridItems = gridRef.current?.querySelectorAll('.grid-item');
      if (gridItems) {
        gridItems.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 88%',
            onEnter: () => {
              gsap.fromTo(item, 
                { y: 40, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.1 }
              );
            },
            once: true,
          });
        });
      }

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => setAnimateStats(true),
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full py-24 md:py-32" style={{ background: 'var(--bg-secondary)' }}>
      {/* Accent glow */}
      <div className="glow-orb w-[400px] h-[400px] top-0 right-0" style={{ background: 'rgba(10, 132, 255, 0.04)' }} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16 md:mb-24 opacity-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-blue)' }}>About Us</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6" style={{ color: 'var(--text-primary)' }}>
            {introGridConfig.titleLine1}
            <br />
            <span className="gradient-text">{introGridConfig.titleLine2}</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {introGridConfig.description}
          </p>
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 md:mb-24">
          {introGridConfig.stats?.map((stat, index) => (
            <div
              key={index}
              className="glass-panel glass-panel-hover rounded-2xl p-6 md:p-8 text-center"
            >
              <p className="text-3xl md:text-4xl font-black tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
                <Counter end={stat.value} suffix={stat.suffix} shouldAnimate={animateStats} />
              </p>
              <p className="text-[13px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[280px]">
          {introGridConfig.portfolioImages.map((image, index) => (
            <div
              key={index}
              className={`grid-item relative overflow-hidden rounded-xl group cursor-pointer opacity-0 ${
                index === 0 ? 'md:col-span-1 md:row-span-2' : ''
              } ${index === 3 ? 'row-span-2' : ''}`}
              style={{ border: '1px solid var(--border-subtle)' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <p className="text-white text-sm font-semibold">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {introGridConfig.accentText && (
          <div className="mt-12 flex justify-end">
            <p className="text-[12px] font-medium uppercase tracking-[0.15em]" style={{ color: 'var(--text-tertiary)' }}>
              {introGridConfig.accentText}
            </p>
          </div>
        )}
      </div>
      
      <div className="section-divider absolute bottom-0 left-0 w-full" />
    </section>
  );
}
