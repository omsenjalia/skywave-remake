import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  if (!heroConfig.backgroundText && !heroConfig.heroImages?.length && heroConfig.navLinks.length === 0) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % (heroConfig.rotatingWords?.length || 1));
      setCurrentImageIndex((prev) => (prev + 1) % (heroConfig.heroImages?.length || 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.fromTo(textRef.current, 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(imageRef.current, 
        { y: 40, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out', delay: 0.5 }
      );
      if (badgesRef.current) {
        const badges = badgesRef.current.querySelectorAll('.hero-badge');
        gsap.fromTo(badges,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.8 }
        );
      }

      // Parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (textRef.current) gsap.set(textRef.current, { yPercent: self.progress * 30 });
          if (imageRef.current) gsap.set(imageRef.current, { yPercent: self.progress * 15 });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0" style={{ background: 'var(--bg-primary)' }} />
      
      {/* Gradient mesh */}
      <div className="glow-orb w-[600px] h-[600px] top-[-10%] left-[-5%]" style={{ background: 'rgba(10, 132, 255, 0.06)' }} />
      <div className="glow-orb w-[500px] h-[500px] bottom-[10%] right-[-5%]" style={{ background: 'rgba(191, 90, 242, 0.05)' }} />
      <div className="glow-orb w-[400px] h-[400px] top-[40%] left-[30%]" style={{ background: 'rgba(100, 210, 255, 0.03)' }} />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[rgba(10,10,15,0.85)] backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Skywave Logo" className="h-8 w-auto" />
          </div>

          {heroConfig.navLinks.length > 0 && (
            <div className="hidden md:flex items-center gap-1">
              {heroConfig.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 text-[13px] text-white/50 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-5 py-2 text-[13px] font-semibold rounded-full transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                color: 'var(--bg-primary)',
              }}
            >
              {heroConfig.ctaPrimary}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button className="md:hidden text-white/60 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ background: 'rgba(10, 10, 15, 0.96)', backdropFilter: 'blur(20px)' }}>
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {heroConfig.navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)}
                className="text-white/80 text-xl font-medium hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-8 py-3 rounded-full font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))', color: 'var(--bg-primary)' }}
            >
              {heroConfig.ctaPrimary}
            </a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left: Text */}
          <div ref={textRef} className="text-center lg:text-left opacity-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-[12px] font-medium"
              style={{ background: 'rgba(10, 132, 255, 0.1)', border: '1px solid rgba(10, 132, 255, 0.2)', color: 'var(--accent-blue)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              AI-Powered Development
            </div>

            {/* Rotating Words */}
            <div className="h-[48px] md:h-[60px] mb-4 overflow-hidden relative">
              {heroConfig.rotatingWords?.map((word, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center lg:justify-start transition-all duration-700 ${
                    index === currentWordIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <span className="text-2xl md:text-4xl font-bold gradient-text">{word}</span>
                </div>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6"
              style={{ color: 'var(--text-primary)' }}>
              {heroConfig.backgroundText}
            </h1>

            {/* Subtext */}
            <p className="text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}>
              {heroConfig.subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href="#contact"
                className="group px-7 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))', color: 'var(--bg-primary)' }}>
                {heroConfig.ctaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href={heroConfig.ctaSecondaryHref} target="_blank" rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white/5"
                style={{ border: '1px solid var(--border-medium)', color: 'var(--text-secondary)' }}>
                {heroConfig.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right: Hero Images */}
          <div ref={imageRef} className="relative opacity-0">
            <div className="relative">
              {/* Image carousel */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {heroConfig.heroImages?.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
                      index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-contain drop-shadow-2xl"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
                
                {/* Glow behind image */}
                <div className="absolute inset-0 -z-10 rounded-full scale-75"
                  style={{ background: 'radial-gradient(circle, rgba(10, 132, 255, 0.15) 0%, transparent 70%)' }} />
              </div>

              {/* Image selector dots */}
              <div ref={badgesRef} className="flex justify-center gap-2 mt-6">
                {heroConfig.heroImages?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => { setCurrentImageIndex(index); setCurrentWordIndex(index % (heroConfig.rotatingWords?.length || 1)); }}
                    className={`hero-badge px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'text-white'
                        : 'text-white/40 hover:text-white/60'
                    }`}
                    style={{
                      background: index === currentImageIndex ? 'rgba(10, 132, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${index === currentImageIndex ? 'rgba(10, 132, 255, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                    }}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: 'var(--text-tertiary)' }}>Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: 'var(--text-tertiary)' }} />
      </div>
    </section>
  );
}
