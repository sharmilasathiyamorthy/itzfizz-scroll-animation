export default function ContentSection() {
  return (
    <section className="relative w-full bg-ink-900 px-6 py-24 sm:px-10 md:px-14 md:py-32">
      <div className="mx-auto max-w-4xl">
        <p className="font-display text-xs tracking-[0.4em] text-white/40">
          THE EXPERIENCE
        </p>
        <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Engineered for those who refuse ordinary.
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          Every curve, every line, every detail — crafted with an obsession for
          perfection. The ITZFIZZ collection is more than a vehicle. It is a
          statement of intent, a declaration that the journey matters as much
          as the destination.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { title: 'Design', text: 'Sculpted by wind. Refined by hand. Every surface serves a purpose.' },
            { title: 'Performance', text: '0 to 60 in 2.8 seconds. A symphony of engineering and adrenaline.' },
            { title: 'Heritage', text: 'Three decades of racing DNA, distilled into a single moment.' },
          ].map((item, i) => (
            <div key={i} className="border-t border-white/10 pt-6">
              <h3 className="font-display text-sm tracking-[0.2em] text-white">
                {item.title.toUpperCase()}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-4xl border-t border-white/10 pt-12">
        <p className="text-center font-display text-xs tracking-[0.4em] text-white/30">
          ITZFIZZ © 2026 — DRIVE THE EXPERIENCE
        </p>
      </div>
    </section>
  );
}
