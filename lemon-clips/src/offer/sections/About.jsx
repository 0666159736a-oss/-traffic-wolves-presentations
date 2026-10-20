import { about } from '../content.js'
import { Eye, Network, Reveal, Scale, SectionTitle } from '../ui.jsx'

const ICONS = { scale: Scale, network: Network, eye: Eye }

export default function About() {
  return (
    <section id="about" data-pdf className="gutter py-[clamp(40px,6vw,80px)]">
      <Reveal className="wrap overflow-hidden rounded-[36px] bg-white p-6 text-ink sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <SectionTitle kicker="Про нас" light>{about.title}</SectionTitle>
          <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ink/80">
            <p className="text-[clamp(19px,2vw,23px)] font-bold leading-snug text-ink">{about.paragraphs[0]}</p>
            {about.paragraphs.slice(1).map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {about.advantages.map((a, i) => {
            const Icon = ICONS[a.icon]
            return (
              <Reveal key={a.title} delay={i * 120} className="group flex items-center gap-4 rounded-[24px] bg-ink p-5 text-white transition-transform hover:-translate-y-1">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-lemon text-ink transition-transform group-hover:rotate-6"><Icon className="size-7" /></span>
                <span className="text-[18px] font-extrabold leading-tight">{a.title}</span>
              </Reveal>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
