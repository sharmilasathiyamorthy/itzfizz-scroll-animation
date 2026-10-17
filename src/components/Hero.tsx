import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAR_IMAGE =
  'https://images.pexels.com/photos/38570/lamborghini-car-speed-prestige-38570.jpeg?auto=compress&cs=tinysrgb&w=1600';

type Stat = {
  value: string;
  label: string;
  description: string;
};

const stats: Stat[] = [
  { value: '98%', label: 'Precision', description: 'Engineered to exact tolerances for a flawless drive.' },
  { value: '85%', label: 'Aerodynamics', description: 'Wind-tunnel refined for maximum downforce.' },
  { value: '92%', label: 'Efficiency', description: 'Hybrid powertrain that wastes nothing.' },
  { value: '100%', label: 'Passion', description: 'Built by enthusiasts, for enthusiasts.' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const car = carRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const statsContainer = statsRef.current;
    const scrollHint = scrollHintRef.current;
    const fade = fadeRef.current;

    if (!section || !car || !headline || !sub || !statsContainer || !scrollHint || !fade) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const statItems = statsContainer.querySelectorAll('[data-stat]');
    const headlineChars = headline.querySelectorAll('[data-char]');

    // ── Set initial GSAP transforms ──────────────────────────────
    // Use xPercent/yPercent for centering so that GSAP's x/y animations
    // don't clobber Tailwind's -translate-x-1/2 classes. Removed the
    // Tailwind -translate-x-1/2 / -translate-y-1/2 classes from the JSX
    // so GSAP fully owns positioning.
    gsap.set(car, { xPercent: -50, yPercent: -50, x: 0, opacity: 0, scale: 0.92, rotation: 2 });
    gsap.set(headline, { xPercent: -50, x: 0 });
    gsap.set(headlineChars, { y: 60, opacity: 0 });
    gsap.set(sub, { xPercent: -50, x: 0, y: 30, opacity: 0 });
    gsap.set(statItems, { y: 40, opacity: 0 });
    gsap.set(scrollHint, { xPercent: -50, x: 0, opacity: 0 });
    gsap.set(fade, { opacity: 0 });

    // ── Entrance animation (plays once on load) ──────────────────
    const entranceTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    entranceTl
      .to(headlineChars, {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.8,
      })
      .to(car, {
        x: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.4,
        ease: 'power2.out',
      }, '-=0.5')
      .to(sub, {
        y: 0,
        opacity: 1,
        duration: 0.8,
      }, '-=0.8')
      .to(statItems, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
      }, '-=0.4')
      .to(scrollHint, {
        opacity: 1,
        duration: 0.6,
      }, '-=0.2');

    if (prefersReducedMotion) {
      entranceTl.progress(1).kill();
      gsap.set([car, headline, headlineChars, sub, statItems, scrollHint], { clearProps: 'all' });
    }

    // ── Scroll-driven animation ─────────────────────────────────
    // Only set up if reduced motion is not preferred
    let scrollTl: gsap.core.Timeline | null = null;

    if (!prefersReducedMotion) {
      // Wait for entrance to finish before enabling scroll-driven x on car
      // to avoid both timelines fighting over the same property.
      scrollTl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .fromTo(car,
          { x: 0 },
          { x: '25vw', duration: 1 },
          0,
        )
        .fromTo(car,
          { scale: 1, rotation: 0 },
          { scale: 1.12, rotation: -2, ease: 'power1.inOut', duration: 1 },
          0,
        )
        .to(headline, {
          opacity: 0,
          y: -80,
          ease: 'power2.in',
          duration: 0.5,
        }, 0)
        .to(sub, {
          opacity: 0,
          y: -40,
          ease: 'power2.in',
          duration: 0.4,
        }, 0)
        .to(statItems, {
          opacity: 0,
          y: -60,
          stagger: 0.05,
          ease: 'power2.in',
          duration: 0.4,
        }, 0)
        .to(scrollHint, {
          opacity: 0,
          duration: 0.2,
        }, 0)
        .to(fade, {
          opacity: 0.6,
          duration: 1,
        }, 0);

      // Ensure ScrollTrigger recalculates positions after pin is applied
      ScrollTrigger.refresh();
    }

    return () => {
      entranceTl.kill();
      if (scrollTl) {
        scrollTl.scrollTrigger?.kill();
        scrollTl.kill();
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-ink-950"
    >
      {/* Ambient gradient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-[40vh] w-[40vh] translate-x-1/3 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[100px]" />
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-40" />

      {/* Scroll fade overlay */}
      <div ref={fadeRef} className="pointer-events-none absolute inset-0 z-20 bg-black" />

      {/* Top brand bar */}
      <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-10 md:px-14">
        <span className="font-display text-xs tracking-[0.4em] text-white/60 sm:text-sm">
          ITZFIZZ
        </span>
        <span className="font-display text-[0.6rem] tracking-[0.3em] text-white/40 sm:text-xs">
          EST. 2026
        </span>
      </div>

      {/* Headline — widely letter-spaced */}
      <h2
        ref={headlineRef}
        className="pointer-events-none absolute left-1/2 top-[18%] z-10 text-center font-display text-sm font-bold tracking-[0.6em] text-white/70 sm:top-[16%] sm:text-base md:text-lg"
        aria-label="WELCOME"
      >
        {'WELCOME'.split('').map((c, i) => (
          <span key={`w-${i}`} data-char className="inline-block">
            {c}
          </span>
        ))}
      </h2>

      {/* Car image */}
      <div
        ref={carRef}
        className="absolute left-1/2 top-1/2 z-10 w-full max-w-5xl px-4 will-change-transform sm:px-8"
      >
        <img
          src={CAR_IMAGE}
          alt="Luxury sports car — Lamborghini"
          className="h-auto w-full select-none object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
          draggable={false}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.style.display = 'none';
            const fallback = img.nextElementSibling;
            if (fallback) fallback.classList.remove('hidden');
          }}
        />
        <div className="hidden py-20 text-center text-white/30">
          <p className="font-display text-sm tracking-[0.3em]">IMAGE UNAVAILABLE</p>
        </div>
      </div>

      {/* Sub-headline */}
      <p
        ref={subRef}
        className="absolute bottom-[26%] left-1/2 z-10 text-center font-display text-3xl font-bold tracking-[0.3em] text-white text-shadow-glow sm:text-5xl md:text-6xl lg:text-7xl"
      >
        ITZFIZZ
      </p>

      {/* Stats */}
      <div
        ref={statsRef}
        className="absolute bottom-[8%] left-0 right-0 z-10 mx-auto flex max-w-6xl flex-wrap items-start justify-center gap-x-6 gap-y-4 px-6 sm:gap-x-10 md:gap-x-16"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            data-stat
            className="flex flex-col items-center text-center"
          >
            <span className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {stat.value}
            </span>
            <span className="mt-1 font-display text-[0.6rem] tracking-[0.3em] text-white/50 sm:text-xs">
              {stat.label}
            </span>
            <span className="mt-2 max-w-[10rem] text-[0.65rem] leading-relaxed text-white/40 sm:max-w-[12rem] sm:text-xs">
              {stat.description}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-5 left-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="font-display text-[0.55rem] tracking-[0.4em] text-white/40">
          SCROLL
        </span>
        <div className="h-8 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
