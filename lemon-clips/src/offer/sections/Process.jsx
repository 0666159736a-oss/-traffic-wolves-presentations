import { useEffect, useState } from 'react'
import { process } from '../content.js'
import { Bolt, Chart, Check, Reveal, Search, SectionTitle, useInView } from '../ui.jsx'

const ICONS = [Search, Bolt, Chart, Check]

/** Interactive 4-step scheme: autoplays until the visitor picks a step. */
export default function Process() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const [ref, seen] = useInView(0.3)
  const steps = process.steps

  useEffect(() => {
    if (!auto || !seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 3200)
    return () => clearInterval(id)
  }, [auto, seen])

  const pick = (i) => { setAuto(false); setActive(i) }
  const Icon = ICONS[active]

  return (
    <section id="process" data-pdf className="gutter py-[clamp(40px,6vw,80px)]">
      <div ref={ref} className="wrap flex flex-col gap-8">
        <Reveal><SectionTitle kicker="Як це працює?">{process.title}</SectionTitle></Reveal>

        {/* Progress rail */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-[27px] hidden h-1 rounded-full bg-white/10 md:block" aria-hidden="true">
            <div className="h-full rounded-full bg-lemon transition-[width] duration-700 ease-out" style={{ width: `${(active / (steps.length - 1)) * 100}%` }} />
          </div>
          <ol className="relative grid gap-2 md:grid-cols-4 md:gap-4" role="tablist" aria-label="Етапи">
            {steps.map((s, i) => {
              const on = i === active, done = i < active
              return (
                <li key={s.title}>
                  <button type="button" role="tab" aria-selected={on} onClick={() => pick(i)}
                    className={`flex w-full items-center gap-3 rounded-[22px] p-2 text-left transition-colors md:flex-col md:items-start md:bg-transparent md:p-0 ${on ? 'bg-white/[.06]' : ''}`}>
                    <span className={`grid size-14 shrink-0 place-items-center rounded-full font-[family-name:var(--font-display)] text-[17px] font-extrabold transition-all duration-500 ${on ? 'scale-110 bg-lemon text-ink shadow-[0_0_0_8px_rgb(255_214_10/.18)]' : done ? 'bg-lemon/80 text-ink' : 'border-2 border-white/20 bg-ink text-white'}`}>
                      0{i + 1}
                    </span>
                    <span className={`text-[17px] font-extrabold uppercase tracking-wide transition-colors md:mt-2 ${on ? 'text-lemon' : 'text-white/80'}`}>{s.title}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Detail panel */}
        <div data-pdf-hide className="relative overflow-hidden rounded-[32px] bg-lemon p-6 text-ink sm:p-10" aria-live="polite">
          <div key={active} className="reveal in grid items-center gap-6 sm:grid-cols-[auto_1fr]">
            <span className="grid size-20 place-items-center rounded-[24px] bg-ink text-lemon sm:size-24"><Icon className="size-10" /></span>
            <div className="flex flex-col gap-2">
              <span className="label text-ink/60">Етап 0{active + 1} з 0{steps.length}</span>
              <h3 className="h-display text-[clamp(26px,3.6vw,44px)]">{steps[active].title.toUpperCase()}</h3>
              <p className="max-w-2xl text-[clamp(16px,1.6vw,19px)] font-semibold leading-relaxed text-ink/80">{steps[active].text}</p>
            </div>
          </div>
          <span className="pointer-events-none absolute -bottom-10 -right-4 select-none font-[family-name:var(--font-display)] text-[180px] font-black leading-none text-ink/[.07] sm:text-[240px]" aria-hidden="true">0{active + 1}</span>
        </div>

        {/* All four stages at once — shown only in the PDF export */}
        <ol data-pdf-show className="hidden grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-2 rounded-[24px] bg-lemon p-5 text-ink">
              <span className="h-display text-[28px]">0{i + 1}</span>
              <span className="text-[16px] font-extrabold uppercase">{s.title}</span>
              <span className="text-[14px] font-semibold leading-snug text-ink/80">{s.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
