import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqConfig } from '../config';
import { Phone, Mail, ArrowRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  if (!faqConfig.titleRegular && faqConfig.faqs.length === 0) return null;

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

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 82%',
        onEnter: () => {
          const items = contentRef.current?.querySelectorAll('[data-faq-item]');
          if (items) {
            gsap.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06 });
          }
        },
        once: true,
      });

      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative w-full py-24 md:py-32" style={{ background: 'var(--bg-secondary)' }}>
      <div className="glow-orb w-[500px] h-[500px] bottom-0 right-0" style={{ background: 'rgba(10, 132, 255, 0.05)' }} />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20 opacity-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-blue)' }}>
            {faqConfig.subtitle}
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
            {faqConfig.titleRegular}{' '}
            <span className="gradient-text">{faqConfig.titleItalic}</span>
          </h2>
        </div>

        {/* Two column layout: FAQ + Contact */}
        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          {/* FAQ Column */}
          <div ref={contentRef} className="md:col-span-3">
            <Accordion type="single" collapsible className="space-y-3">
              {faqConfig.faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  data-faq-item
                  className="opacity-0 border-0 glass-panel rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline transition-colors duration-300 group [&[data-state=open]]:border-b [&[data-state=open]]:border-white/5">
                    <span className="text-left font-semibold text-sm md:text-[15px] pr-4 transition-colors group-hover:text-white"
                      style={{ color: 'var(--text-secondary)' }}>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-3">
                    <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Column */}
          <div ref={ctaRef} className="md:col-span-2 opacity-0">
            <div className="glass-panel rounded-2xl p-7 md:p-8 sticky top-24">
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Let's Talk</h3>
              <p className="text-[13px] leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                {faqConfig.ctaText}
              </p>

              <div className="space-y-4 mb-8">
                <a href="tel:+919427722776" className="flex items-center gap-3 group transition-colors duration-300">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" 
                    style={{ background: 'rgba(10, 132, 255, 0.1)', border: '1px solid rgba(10, 132, 255, 0.2)' }}>
                    <Phone className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />
                  </div>
                  <span className="text-[13px] font-medium group-hover:text-white" style={{ color: 'var(--text-secondary)' }}>
                    (+91) 94277-22776
                  </span>
                </a>
                <a href="mailto:info@skywaveinfosolutions.com" className="flex items-center gap-3 group transition-colors duration-300">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(10, 132, 255, 0.1)', border: '1px solid rgba(10, 132, 255, 0.2)' }}>
                    <Mail className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />
                  </div>
                  <span className="text-[13px] font-medium group-hover:text-white" style={{ color: 'var(--text-secondary)' }}>
                    info@skywaveinfosolutions.com
                  </span>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(10, 132, 255, 0.1)', border: '1px solid rgba(10, 132, 255, 0.2)' }}>
                    <MapPin className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />
                  </div>
                  <span className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Ahmedabad, India
                  </span>
                </div>
              </div>

              <a
                href={faqConfig.ctaHref || '#contact'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))', color: 'var(--bg-primary)' }}
              >
                {faqConfig.ctaButtonText}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 w-full" />
    </section>
  );
}
