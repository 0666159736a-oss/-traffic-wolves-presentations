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
    const onScroll = () => setI(Math.round(el.scrollLeft / el.clientWidth))
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  if (!n) return null
  const to = (k) => { const el = track.current; const j = (k + n) % n; el.scrollTo({ left: j * el.clientWidth, behavior: 'smooth' }) }
  const team = testimonials.some((t) => t.attribution === 'team')

  return (
    <section id="feedback" className="gutter py-[clamp(48px,7vw,96px)] border-t border-hair">
      <div className="wrap flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="eyebrow">Client feedback</div>
            <h2 className="display text-[clamp(36px,5.6vw,76px)]">{team ? <>WHAT OUR <span className="text-lemon">CLIENTS SAY.</span></> : <>CLIENT <span className="text-lemon">FEEDBACK.</span></>}</h2>
          </div>
          {n > 1 && (
            <div className="flex gap-2">
              <button type="button" onClick={() => to(i - 1)} className="grid size-12 place-items-center rounded-full border border-line hover:border-lemon hover:text-lemon" aria-label="Previous review"><ChevronLeft /></button>
              <button type="button" onClick={() => to(i + 1)} className="grid size-12 place-items-center rounded-full border border-line hover:border-lemon hover:text-lemon" aria-label="Next review"><ChevronRight /></button>
            </div>
          )}
        </div>
        <div ref={track} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]" aria-roledescription="carousel">
          {testimonials.map((t, k) => (
            <figure key={k} className="flex w-full shrink-0 snap-start flex-col gap-6 rounded-[26px] border border-line bg-panel p-6 sm:p-10" aria-label={`Review ${k + 1} of ${n}`}>
              <Quote className="size-9 text-lemon" />
              <blockquote className="max-w-3xl text-[clamp(19px,2.3vw,27px)] leading-snug">{t.quote}</blockquote>
              <figcaption className="flex items-center gap-3">
                {t.photo && <img src={t.photo} alt="" loading="lazy" className="size-12 rounded-full object-cover" />}
                <div><div className="font-bold">{t.name}</div>{t.role && <div className="text-[14px] text-muted">{t.role}</div>}</div>
              </figcaption>
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
