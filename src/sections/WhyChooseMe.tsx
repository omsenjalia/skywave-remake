import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whyChooseMeConfig } from '../config';

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

export function WhyChooseMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const wideRef = useRef<HTMLDivElement>(null);
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false);

  if (!whyChooseMeConfig.titleRegular && whyChooseMeConfig.stats.length === 0 && whyChooseMeConfig.featureCards.length === 0) return null;

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

      const imageCards = cardsRef.current?.querySelectorAll('.feature-card');
      if (imageCards) {
        imageCards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(card, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.15 });
            },
            once: true,
          });
        });
      }

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => setShouldAnimateStats(true),
        once: true,
      });

      if (wideRef.current) {
        ScrollTrigger.create({
          trigger: wideRef.current,
          start: 'top 82%',
          onEnter: () => {
            gsap.fromTo(wideRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
          },
          once: true,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative w-full py-24 md:py-32" style={{ background: 'var(--bg-secondary)' }}>
      <div className="glow-orb w-[500px] h-[500px] top-[30%] right-[-10%]" style={{ background: 'rgba(191, 90, 242, 0.04)' }} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20 opacity-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-blue)' }}>
            {whyChooseMeConfig.subtitle}
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
            {whyChooseMeConfig.titleRegular}{' '}
            <span className="gradient-text">{whyChooseMeConfig.titleItalic}</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-4 md:gap-5">
          {whyChooseMeConfig.featureCards.map((card, index) => (
            <div key={index} className="feature-card opacity-0 group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{card.title}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{card.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Stats Card */}
          {whyChooseMeConfig.stats.length > 0 && (
            <div ref={statsRef} className="feature-card opacity-0 glass-panel rounded-2xl p-7 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-8" style={{ color: 'var(--accent-blue)' }}>
                  {whyChooseMeConfig.statsLabel}
                </p>
                <div className="space-y-6">
                  {whyChooseMeConfig.stats.map((stat, index) => (
                    <div key={index} className="pb-6" style={{ borderBottom: index < whyChooseMeConfig.stats.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                      <p className="text-3xl md:text-4xl font-black tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
                        <Counter end={stat.value} suffix={stat.suffix} shouldAnimate={shouldAnimateStats} />
                      </p>
                      <p className="text-[13px] font-medium" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wide Image */}
        {whyChooseMeConfig.wideImage && (
          <div ref={wideRef} className="mt-12 md:mt-16 relative rounded-2xl overflow-hidden group opacity-0" style={{ border: '1px solid var(--border-subtle)' }}>
            <div className="aspect-[16/9] md:aspect-[3/1] overflow-hidden">
              <img
                src={whyChooseMeConfig.wideImage}
                alt={whyChooseMeConfig.wideImageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
            {(whyChooseMeConfig.wideTitle || whyChooseMeConfig.wideDescription) && (
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-md">
                {whyChooseMeConfig.wideTitle && (
                  <p className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {whyChooseMeConfig.wideTitle}
                  </p>
                )}
                {whyChooseMeConfig.wideDescription && (
                  <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                    {whyChooseMeConfig.wideDescription}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="section-divider absolute bottom-0 left-0 w-full" />
    </section>
  );
}
