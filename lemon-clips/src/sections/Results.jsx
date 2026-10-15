import { useEffect, useMemo, useRef, useState } from 'react'
import { cases, teamStats } from '../content/cases.js'
import { useNav } from '../lib/nav.jsx'
import Modal from '../components/Modal.jsx'
import Clip from '../components/Clip.jsx'
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from '../components/Icons.jsx'

const TEAM_LABEL = 'Traffic Wolves team result'

function Card({ c, onOpen }) {
  return (
    <article className="card-hover group flex h-full flex-col gap-4 rounded-[26px] border border-line p-3.5 sm:p-4"
      style={{ background: 'radial-gradient(circle at 85% 0%, rgb(246 210 60 / .12), transparent 50%), var(--color-panel)' }}>
      <button type="button" onClick={onOpen} className="grid grid-cols-3 gap-1.5 rounded-2xl" aria-label={`Open ${c.category} case`}>
        {c.clips.map((k, i) => <Clip key={i} {...k} className="aspect-[9/14] transition-transform duration-500 group-hover:-translate-y-1" />)}
      </button>
      <div className="px-1">
        <div className="eyebrow !text-[11px]">{c.category}</div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="display tnum text-[clamp(40px,4.4vw,54px)] text-lemon">{c.headline.value}</span>
          <span className="text-[15px] font-semibold text-cream/85">{c.headline.label}</span>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-3 border-t border-hair px-1 pt-4">
        {c.metrics.map((m) => (
          <div key={m.label} className="min-w-0">
            <dt className="truncate text-[11px] font-mono uppercase tracking-wider text-muted">{m.label}</dt>
            <dd className="tnum text-[18px] font-bold">{m.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto flex items-center justify-between gap-3 px-1 pb-1">
        <span className="text-[12px] text-muted">{c.period}</span>
        <button type="button" onClick={onOpen} className="inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wide text-lemon">Open case <ArrowRight className="size-4" /></button>
      </div>
    </article>
  )
}

export default function Results() {
  const { go } = useNav()
  const filters = useMemo(() => ['All', ...cases.map((c) => c.category)], [])
  const [filter, setFilter] = useState('All')
  const [openId, setOpenId] = useState(null)
  const [idx, setIdx] = useState(0)
  const track = useRef(null)
  const list = cases.filter((c) => filter === 'All' || c.category === filter)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const card = el.firstElementChild
      if (card) setIdx(Math.round(el.scrollLeft / (card.getBoundingClientRect().width + 16)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    el.scrollTo({ left: 0 })
    setIdx(0)
    return () => el.removeEventListener('scroll', onScroll)
  }, [filter])

  const step = (d) => {
    const el = track.current
    const card = el?.firstElementChild
    if (!card) return
    const w = card.getBoundingClientRect().width + 16
    const max = el.scrollWidth - el.clientWidth
    let left = el.scrollLeft + d * w
    if (left > max + 4) left = 0
    if (left < -4) left = max
    el.scrollTo({ left, behavior: 'smooth' })
  }

  if (!cases.length) return null
  const c = cases.find((x) => x.id === openId)

  return (
    <section id="results" className="gutter py-[clamp(48px,7vw,96px)]">
      <div className="wrap flex flex-col gap-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <div className="eyebrow">Results from our team</div>
            <h2 className="display text-[clamp(36px,5.6vw,76px)]">REAL MUSIC. <span className="text-lemon">REAL RESULTS.</span></h2>
          </div>
          <div className="flex gap-6">
            {teamStats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="display tnum text-[clamp(34px,4vw,48px)]">{s.value}</span>
                <span className="text-[13px] text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter cases">
            {filters.map((f) => (
              <button key={f} type="button" role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
                className={`min-h-[40px] rounded-full border px-4 text-[14px] font-medium transition-colors ${filter === f ? 'border-lemon bg-lemon text-[#14120a]' : 'border-hair text-cream/80 hover:border-lemon/60'}`}>{f}</button>
            ))}
          </div>
          {list.length > 1 && (
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="tnum mr-1 rounded-full border border-line px-3 py-1.5 font-mono text-[13px] text-lemon">{String(Math.min(idx + 1, list.length)).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span>
              <button type="button" onClick={() => step(-1)} aria-label="Previous case" className="grid size-11 place-items-center rounded-full border border-line hover:border-lemon hover:text-lemon"><ChevronLeft /></button>
              <button type="button" onClick={() => step(1)} aria-label="Next case" className="grid size-11 place-items-center rounded-full bg-lemon text-[#14120a] hover:bg-[#ffe066]"><ChevronRight /></button>
            </div>
          )}
        </div>

        <div ref={track} className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0">
          {list.map((x) => (
            <div key={x.id} className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)]">
              <Card c={x} onOpen={() => setOpenId(x.id)} />
            </div>
          ))}
        </div>
        <p className="text-[13px] text-muted">Cases from the Traffic Wolves team, the people behind Lemon Clips. Figures as reported for each campaign.</p>
      </div>

      <Modal open={!!c} onClose={() => setOpenId(null)} label="Case study" wide>
        {c && (
          <div className="flex flex-col gap-6 p-5 sm:p-8">
            <div className="flex flex-col gap-2 pr-10">
              <span className="eyebrow">{c.category} · {TEAM_LABEL}</span>
              <h3 className="display text-[clamp(34px,5vw,56px)]"><span className="text-lemon">{c.headline.value}</span> {c.headline.label}</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {c.clips.map((k, i) => <Clip key={i} {...k} sizes="text-[12px] sm:text-[14px]" className="aspect-[9/14]" />)}
            </div>
            <div>
              <div className="mb-2 font-mono text-[12px] uppercase tracking-wider text-muted">{c.period}</div>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hair bg-hair sm:grid-cols-4">
                {c.metrics.map((m) => <div key={m.label} className="flex flex-col gap-1 bg-panel p-4"><span className="text-[11px] font-mono uppercase tracking-wider text-muted">{m.label}</span><span className="tnum text-[24px] font-bold text-lemon">{m.value}</span></div>)}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary" onClick={() => { setOpenId(null); setTimeout(() => go('get-started'), 60) }}>Get a similar plan <ArrowRight /></button>
              {c.links?.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{l.label} <ArrowUpRight /></a>)}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
