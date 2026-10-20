import { services } from '../content.js'
import { Chart, Film, Reveal, Scale, Search, SectionTitle, Share } from '../ui.jsx'

const ICONS = [Search, Film, Share, Scale, Chart]

export default function Services() {
  return (
    <section id="services" data-pdf className="gutter py-[clamp(40px,6vw,80px)]">
      <div className="wrap flex flex-col gap-8">
        <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle kicker="Наші послуги">{services.title}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {services.platforms.map((p) => <span key={p} className="rounded-full border border-lemon/50 px-4 py-2 text-[14px] font-bold text-lemon">{p}</span>)}
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {services.items.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={s.title} delay={i * 90}
                className={`group relative flex flex-col gap-4 overflow-hidden rounded-[28px] border border-hair bg-panel p-6 transition-colors hover:border-lemon/60 ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                <div className="flex items-center justify-between">
                  <span className="h-display tnum text-[44px] text-lemon !leading-none">0{i + 1}</span>
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/5 text-white transition-colors group-hover:bg-lemon group-hover:text-ink"><Icon className="size-6" /></span>
                </div>
                <h3 className="h-display text-[clamp(20px,2vw,26px)]">{s.title.toUpperCase()}</h3>
                <p className="text-[15.5px] leading-relaxed text-dim">{s.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
