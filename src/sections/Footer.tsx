import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Linkedin, Mail, Facebook, Youtube, type LucideIcon } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = { Instagram, Twitter, Linkedin, Mail, Facebook, Youtube };

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!footerConfig.logoText && !footerConfig.email && footerConfig.navLinks.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(contentRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
        },
        once: true,
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full pt-20 md:pt-28 pb-8 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>          
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={contentRef} className="opacity-0">
          
          {/* Logo + Tagline */}
          <div className="mb-16 md:mb-20">
            <div className="flex items-center gap-4 mb-4">
              <img src="/logo.svg" alt={footerConfig.logoText} className="h-10 w-auto" />
            </div>
            {footerConfig.tagline && (
              <p className="text-base md:text-lg max-w-sm" style={{ color: 'var(--text-secondary)' }}>
                {footerConfig.tagline}
              </p>
            )}
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-6 mb-16">
            {/* Contact */}
            <div className="col-span-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--accent-blue)' }}>
                {footerConfig.contactLabel}
              </p>
              {footerConfig.email && (
                <a href={`mailto:${footerConfig.email}`}
                  className="text-base md:text-lg font-bold block mb-2 hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--text-primary)' }}>{footerConfig.email}</a>
              )}
              {footerConfig.phone && (
                <a href={`tel:${footerConfig.phone.replace(/\D/g, '')}`}
                  className="text-sm font-medium block mb-1 hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--text-secondary)' }}>{footerConfig.phone}</a>
              )}
              {footerConfig.locationText && (
                <p className="text-sm mt-3" style={{ color: 'var(--text-tertiary)' }}>{footerConfig.locationText}</p>
              )}

              {/* Social */}
              {footerConfig.socialLinks.length > 0 && (
                <div className="flex items-center gap-2 mt-6">
                  {footerConfig.socialLinks.map((social) => {
                    const Icon = iconMap[social.iconName] || Mail;
                    return (
                      <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                        style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-tertiary)' }}>
                        <Icon className="w-4 h-4" strokeWidth={1.5} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Services */}
            {footerConfig.servicesLinks.length > 0 && (
              <FooterLinkColumn label={footerConfig.servicesLabel} links={footerConfig.servicesLinks} />
            )}

            {/* Solutions */}
            {footerConfig.solutionsLinks.length > 0 && (
              <FooterLinkColumn label={footerConfig.solutionsLabel} links={footerConfig.solutionsLinks} />
            )}

            {/* Hire Resources */}
            {footerConfig.hireLinks.length > 0 && (
              <FooterLinkColumn label={footerConfig.hireLabel} links={footerConfig.hireLinks} />
            )}

            {/* Know Us */}
            {footerConfig.navLinks.length > 0 && (
              <FooterLinkColumn label={footerConfig.navigationLabel} links={footerConfig.navLinks} />
            )}
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <p className="text-[12px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
              {footerConfig.copyright || `© ${new Date().getFullYear()} All rights reserved.`}
            </p>
            {footerConfig.bottomLinks.length > 0 && (
              <div className="flex items-center gap-6">
                {footerConfig.bottomLinks.map((link) => (
                  <a key={link.label} href={link.href}
                    className="text-[12px] font-medium hover:text-white transition-colors"
                    style={{ color: 'var(--text-tertiary)' }}>{link.label}</a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ label, links }: { label: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--accent-blue)' }}>{label}</p>
      <nav className="space-y-2.5">
        {links.map((link) => (
          <a key={link.label} href={link.href}
            className="block text-[13px] font-medium hover:text-white transition-colors duration-200"
            style={{ color: 'var(--text-tertiary)' }}>{link.label}</a>
        ))}
      </nav>
    </div>
  );
}
