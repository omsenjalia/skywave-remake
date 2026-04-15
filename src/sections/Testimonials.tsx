import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Quote } from 'lucide-react';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/free-mode';
import { testimonialsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!testimonialsConfig.titleRegular && testimonialsConfig.testimonials.length === 0) return null;

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
        trigger: carouselRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(carouselRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 });
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="glow-orb w-[600px] h-[600px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" style={{ background: 'rgba(10, 132, 255, 0.03)' }} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20 relative z-10">
        <div ref={headerRef} className="text-center opacity-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-blue)' }}>
            {testimonialsConfig.subtitle}
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
            {testimonialsConfig.titleRegular}{' '}
            <span className="gradient-text">{testimonialsConfig.titleItalic}</span>
          </h2>
        </div>
      </div>

      {/* Carousel */}
      <div ref={carouselRef} className="relative opacity-0">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={16}
          slidesPerView={1.15}
          centeredSlides={true}
          loop={true}
          speed={800}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 2.5, spaceBetween: 28 },
            1280: { slidesPerView: 3, spaceBetween: 32 },
          }}
          className="!px-4"
        >
          {testimonialsConfig.testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="glass-panel glass-panel-hover rounded-2xl p-7 md:p-8 h-full cursor-grab active:cursor-grabbing">
                <Quote className="w-8 h-8 mb-5" style={{ color: 'rgba(10, 132, 255, 0.25)' }} strokeWidth={1} />

                <p className="text-[15px] leading-relaxed mb-7" style={{ color: 'var(--text-secondary)' }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden" style={{ border: '2px solid rgba(10, 132, 255, 0.3)' }}>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {testimonial.name}
                    </p>
                    <p className="text-[12px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 w-16 h-full z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }} />
        <div className="absolute top-0 right-0 w-16 h-full z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }} />
      </div>

      <div className="section-divider mt-16 max-w-7xl mx-auto px-6 md:px-12" />
    </section>
  );
}
