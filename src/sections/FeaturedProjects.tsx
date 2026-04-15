import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjectsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  if (!featuredProjectsConfig.titleRegular && featuredProjectsConfig.projects.length === 0) return null;

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

      const projectCards = projectsRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        projectCards.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 82%',
            onEnter: () => {
              gsap.fromTo(card, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: index * 0.1 });
            },
            once: true,
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="relative w-full py-24 md:py-32" style={{ background: 'var(--bg-secondary)' }}>
      <div className="glow-orb w-[500px] h-[500px] bottom-[10%] left-[-5%]" style={{ background: 'rgba(10, 132, 255, 0.04)' }} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 opacity-0">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-blue)' }}>
              {featuredProjectsConfig.subtitle}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
              {featuredProjectsConfig.titleRegular}{' '}
              <span className="gradient-text">{featuredProjectsConfig.titleItalic}</span>
            </h2>
          </div>
          {featuredProjectsConfig.viewAllText && (
            <a
              href={featuredProjectsConfig.viewAllHref || '#contact'}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[13px] font-semibold transition-all duration-300 group"
              style={{ color: 'var(--text-secondary)' }}
            >
              {featuredProjectsConfig.viewAllText}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjectsConfig.projects.map((project) => (
            <div key={project.id} className="project-card group opacity-0">
              <div 
                className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 group-hover:-translate-y-1"
                style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}
              >
                {/* macOS-style title bar */}
                <div className="h-9 flex items-center px-4 gap-2" style={{ background: 'rgba(30, 30, 42, 0.9)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F56]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#27C93F]" />
                  <span className="ml-3 text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    {project.title}
                  </span>
                </div>

                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Info bar */}
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" 
                      style={{ background: 'rgba(10, 132, 255, 0.1)', color: 'var(--accent-blue)', border: '1px solid rgba(10, 132, 255, 0.2)' }}>
                      {project.category}
                    </span>
                    <span className="text-[11px] font-medium" style={{ color: 'var(--text-tertiary)' }}>{project.year}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-1.5 text-[12px] font-semibold group/link transition-colors"
                    style={{ color: 'var(--accent-blue)' }}>
                    {featuredProjectsConfig.viewProjectText}
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 w-full" />
    </section>
  );
}
