import { useEffect, useRef, useState } from 'react'
import { testimonials } from '../content/testimonials.js'
import { ChevronLeft, ChevronRight, Quote } from '../components/Icons.jsx'

export default function Testimonials() {
  const track = useRef(null)
  const [i, setI] = useState(0)
  const n = testimonials.length

  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => { const w = el.firstElementChild?.getBoundingClientRect().width || el.clientWidth; setI(Math.min(n - 1, Math.round(el.scrollLeft / (w + 16)))) }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  if (!n) return null
  const to = (k) => { const el = track.current; const j = (k + n) % n; const w = el.firstElementChild.getBoundingClientRect().width + 16; el.scrollTo({ left: Math.min(j * w, el.scrollWidth - el.clientWidth), behavior: 'smooth' }) }
  const team = testimonials.some((t) => t.attribution === 'team')

  return (
    <section id="feedback" className="gutter py-[clamp(48px,7vw,96px)] border-t border-hair">
      <div className="wrap flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="eyebrow">Client feedback · Traffic Wolves team</div>
            <h2 className="display text-[clamp(36px,5.6vw,76px)]">{team ? <>WHAT OUR <span className="text-lemon">CLIENTS SAY.</span></> : <>CLIENT <span className="text-lemon">FEEDBACK.</span></>}</h2>
          </div>
          {n > 1 && (
            <div className="flex gap-2">
              <button type="button" onClick={() => to(i - 1)} className="grid size-12 place-items-center rounded-full border border-line hover:border-lemon hover:text-lemon" aria-label="Previous review"><ChevronLeft /></button>
              <button type="button" onClick={() => to(i + 1)} className="grid size-12 place-items-center rounded-full border border-line hover:border-lemon hover:text-lemon" aria-label="Next review"><ChevronRight /></button>
            </div>
          )}
        </div>
        <div ref={track} className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none]" aria-roledescription="carousel">
          {testimonials.map((t, k) => (
            <figure key={k} className="flex w-full shrink-0 snap-start flex-col gap-5 lg:w-[calc((100%-16px)/2)] rounded-[26px] border border-line p-5 sm:p-8" aria-label={`Review ${k + 1} of ${n}`}
              style={{ background: 'radial-gradient(circle at 90% 0%, rgb(246 210 60 / .12), transparent 50%), var(--color-panel)' }}>
              <figcaption className="flex items-center gap-4">
                {t.photo && <img src={t.photo} alt={t.name} loading="lazy" className="size-16 shrink-0 rounded-full object-cover ring-2 ring-lemon/40" />}
                <div className="min-w-0">
                  <div className="text-[19px] font-bold">{t.name}</div>
                  <div className="text-[14.5px] text-muted">{t.role}</div>
                  {t.location && <div className="text-[13.5px] text-muted/80">{t.location}</div>}
                </div>
              </figcaption>
              {t.metrics?.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {t.metrics.map((m, j) => (
                    <div key={m.label} className={`min-w-0 rounded-2xl border px-3 py-3 ${j === 0 ? 'border-lemon/70 bg-lemon/10' : 'border-hair bg-white/[.03]'}`}>
                      <div className="tnum truncate text-[clamp(16px,2vw,22px)] font-bold">{m.value}</div>
                      <div className="truncate text-[11.5px] font-semibold text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
              <blockquote className="flex gap-3 text-[clamp(16px,1.9vw,21px)] leading-snug text-cream/90">
                <Quote className="mt-1 size-6 shrink-0 text-lemon" />
                <p>“{t.quote}”</p>
              </blockquote>
            </figure>
          ))}
        </div>
        {n > 1 && (
          <div className="flex justify-center gap-2">
            {testimonials.map((_, k) => <button key={k} type="button" onClick={() => to(k)} aria-label={`Go to review ${k + 1}`} aria-current={i === k} className={`h-2 rounded-full transition-all ${i === k ? 'w-8 bg-lemon' : 'w-2 bg-white/25'}`} />)}
          </div>
        )}
      </div>
    </section>
  )
}
