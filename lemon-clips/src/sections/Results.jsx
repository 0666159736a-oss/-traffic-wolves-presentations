import { useState } from 'react'
import { cases } from '../content/cases.js'
import { useNav } from '../lib/nav.jsx'
import Modal from '../components/Modal.jsx'
import Video from '../components/Video.jsx'
import { ArrowRight, ArrowUpRight } from '../components/Icons.jsx'

const TEAM_LABEL = 'Traffic Wolves team experience'

function Card({ c, onOpen }) {
  const [hero, ...rest] = c.metrics || []
  return (
    <article className="card-hover group flex flex-col overflow-hidden rounded-[24px] border border-line bg-panel">
      <button type="button" onClick={onOpen} className="relative block text-left" aria-label={`Open case: ${c.artist}`}>
        {c.videoUrl ? <Video src={c.videoUrl} poster={c.poster} label={c.title} className="aspect-[4/5]" />
          : c.poster ? <img src={c.poster} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
          {c.attribution === 'team' && <span className="w-fit rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-cream/90 backdrop-blur">{TEAM_LABEL}</span>}
          {hero && <span className="display tnum text-[clamp(48px,5vw,68px)] text-lemon">{hero.value}</span>}
          {hero && <span className="font-mono text-[12px] uppercase tracking-wider text-cream/80">{hero.label}</span>}
        </div>
      </button>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="min-w-0">
          <h3 className="display text-[24px]">{c.artist}</h3>
          <p className="text-muted">{c.title}</p>
        </div>
        {rest.length > 0 && (
          <dl className="grid grid-cols-2 gap-3 border-t border-hair pt-4">
            {rest.map((m) => <div key={m.label}><dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{m.label}</dt><dd className="tnum text-[18px] font-bold">{m.value}</dd></div>)}
          </dl>
        )}
        <button type="button" onClick={onOpen} className="mt-auto inline-flex w-fit items-center gap-2 text-[14px] font-bold uppercase tracking-wide text-lemon">View case study <ArrowRight className="size-4" /></button>
      </div>
    </article>
  )
}

export default function Results() {
  const { go } = useNav()
  const [open, setOpen] = useState(null)
  if (!cases.length) return null
  const c = cases.find((x) => x.id === open)
  const allTeam = cases.every((x) => x.attribution === 'team')
  return (
    <section id="results" className="gutter py-[clamp(48px,7vw,96px)] border-t border-hair">
      <div className="wrap flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="eyebrow">{allTeam ? 'Results from our team' : 'Results'}</div>
          <h2 className="display text-[clamp(36px,5.6vw,76px)]">REAL MUSIC. <span className="text-lemon">REAL RESULTS.</span></h2>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {cases.map((x) => <div key={x.id} className="w-[82%] shrink-0 snap-start sm:w-auto"><Card c={x} onOpen={() => setOpen(x.id)} /></div>)}
        </div>
      </div>
      <Modal open={!!c} onClose={() => setOpen(null)} label="Case study" wide>
        {c && (
          <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[minmax(0,300px)_1fr]">
            <div className="mx-auto w-[64%] max-w-[300px] md:w-full">
              {c.videoUrl ? <Video src={c.videoUrl} poster={c.poster} controls label={c.title} className="aspect-[9/16] rounded-2xl" />
                : c.poster ? <img src={c.poster} alt="" className="aspect-[9/16] w-full rounded-2xl object-cover" /> : null}
            </div>
            <div className="flex min-w-0 flex-col gap-5">
              <div className="flex flex-col gap-2 pr-10">
                {c.attribution === 'team' && <span className="eyebrow">{TEAM_LABEL}</span>}
                <h3 className="display text-[clamp(30px,4vw,44px)]">{c.artist}</h3>
                <p className="text-[17px] text-muted">{c.title}</p>
              </div>
              {c.metrics?.length > 0 && (
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hair bg-hair sm:grid-cols-3">
                  {c.metrics.map((m) => <div key={m.label} className="flex flex-col gap-1 bg-panel p-4"><span className="font-mono text-[11px] uppercase tracking-wider text-muted">{m.label}</span><span className="tnum text-[22px] font-bold text-lemon">{m.value}</span></div>)}
                </div>
              )}
              {c.description && <p className="text-[16px] leading-relaxed text-cream/85">{c.description}</p>}
              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn btn-primary" onClick={() => { setOpen(null); setTimeout(() => go('get-started'), 60) }}>Get a similar plan <ArrowRight /></button>
                {c.links?.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{l.label} <ArrowUpRight /></a>)}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
