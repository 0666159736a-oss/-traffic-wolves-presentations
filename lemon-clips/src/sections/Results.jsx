import { useMemo, useState } from 'react'
import { cases } from '../content/cases.js'
import { useNav } from '../lib/nav.jsx'
import { fmtCompact, useCountUp, useInView } from '../lib/hooks.js'
import SectionHead from '../components/SectionHead.jsx'
import PhoneCard from '../components/PhoneCard.jsx'
import Modal from '../components/Modal.jsx'
import { ArrowRight, ArrowUpRight } from '../components/Icons.jsx'

const VARIANTS = ['figure', 'lyrics', 'eq', 'figure']

function BigViews({ value, run }) {
  const v = useCountUp(value ?? 0, run && value != null)
  if (value == null) {
    return (
      <span className="display text-[clamp(52px,6vw,80px)] text-transparent [-webkit-text-stroke:1.5px_rgb(246_210_60/.5)]" aria-label="Views not yet verified">00.0M</span>
    )
  }
  return <span className="display tnum text-[clamp(52px,6vw,80px)] text-lemon">{fmtCompact(v)}</span>
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <span className="text-[11px] font-mono uppercase tracking-wider text-muted">{label}</span>
      <span className={`text-[17px] font-semibold tnum ${value == null ? 'text-muted/70' : ''}`}>{value ?? '—'}</span>
    </div>
  )
}

function CaseCard({ c, i, onOpen, run }) {
  return (
    <article style={{ background: 'radial-gradient(circle at 85% 10%, rgb(246 210 60 / .10), transparent 45%), var(--color-panel)' }} className="card-hover group grid grid-cols-[38%_1fr] gap-5 rounded-[26px] border border-line p-4 sm:p-5">
      <button type="button" onClick={onOpen} className="relative rounded-[26px]" aria-label={`Open case study: ${c.artist}, ${c.release}`}>
        <PhoneCard hue={c.hue} variant={VARIANTS[i % 4]} handle={c.demo ? '@creator' : c.topHandle} sound={`${c.release} · ${c.artist}`} platform={c.platforms[0]} videoUrl={c.videoUrl} poster={c.poster} className="w-full transition-transform duration-500 group-hover:-rotate-2" />
      </button>
      <div className="flex min-w-0 flex-col gap-4 py-1">
        <div className="flex flex-wrap items-center gap-2">
          {c.demo && <span className="demo-tag">Demo — Replace with verified case</span>}
          <span className="rounded-full border border-hair px-2.5 py-1 text-[11.5px] text-muted">{c.genre}</span>
        </div>
        <div className="min-w-0">
          <h3 className="display text-[clamp(22px,2.4vw,30px)] truncate">{c.artist}</h3>
          <p className="text-muted truncate">{c.release}</p>
        </div>
        <div className="flex flex-col">
          <BigViews value={c.views} run={run} />
          <span className="text-[12px] font-mono uppercase tracking-wider text-muted">Total views</span>
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-hair pt-4">
          <Stat label="Videos posted" value={c.videos?.toLocaleString('en-US')} />
          <Stat label="Duration" value={c.duration} />
        </div>
        <button type="button" onClick={onOpen} className="mt-auto inline-flex w-fit items-center gap-2 text-[14px] font-bold uppercase tracking-wide text-lemon hover:gap-3 transition-all">
          View case study <ArrowRight className="size-4" />
        </button>
      </div>
    </article>
  )
}

function CaseDetail({ c, i, onLaunch }) {
  return (
    <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[minmax(0,260px)_1fr]">
      <div className="mx-auto w-[62%] max-w-[260px] md:w-full">
        <PhoneCard hue={c.hue} variant={VARIANTS[i % 4]} sound={`${c.release} · ${c.artist}`} platform={c.platforms[0]} videoUrl={c.videoUrl} poster={c.poster} />
      </div>
      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-col gap-2 pr-10">
          {c.demo && <span className="demo-tag w-fit">Demo — Replace with verified case</span>}
          <div className="eyebrow">{c.genre} · Case study</div>
          <h3 className="display text-[clamp(30px,4vw,44px)]">{c.artist}</h3>
          <p className="text-muted text-[17px]">{c.release}</p>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hair bg-hair sm:grid-cols-4">
          {[
            ['Views', c.views != null ? fmtCompact(c.views) : null],
            ['Videos', c.videos?.toLocaleString('en-US')],
            ['Duration', c.duration],
            ['Platforms', c.platforms.join(', ')],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 bg-panel p-4 min-w-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted">{k}</span>
              <span className={`text-[18px] font-bold tnum break-words ${v == null ? 'text-muted/60' : ''}`}>{v ?? '—'}</span>
            </div>
          ))}
        </div>
        <p className="text-[16.5px] leading-relaxed text-cream/85">{c.summary}</p>
        <div className="flex flex-col gap-2">
          <span className="eyebrow">{c.demo ? 'What this case should show' : 'Highlights'}</span>
          <ul className="flex flex-col gap-2">
            {c.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] text-cream/85"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-lemon" />{h}</li>
            ))}
          </ul>
        </div>
        {c.demo && (
          <p className="rounded-xl border border-dashed border-warn/50 bg-warn/5 p-4 text-[13.5px] leading-relaxed text-cream/80">
            Placeholder card. Replace it in <code className="font-mono text-warn">src/content/cases.js</code> with figures from a verified campaign report, a preview video and the artist’s approval, then set <code className="font-mono text-warn">demo: false</code>.
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={onLaunch}>Launch a similar campaign <ArrowRight /></button>
          {c.link && <a className="btn btn-ghost" href={c.link} target="_blank" rel="noopener noreferrer">Listen <ArrowUpRight /></a>}
        </div>
      </div>
    </div>
  )
}

export default function Results() {
  const { go } = useNav()
  const filters = useMemo(() => ['All', ...new Set(cases.map((c) => c.genre))], [])
  const [filter, setFilter] = useState('All')
  const [openId, setOpenId] = useState(null)
  const [ref, seen] = useInView({ threshold: 0.15 })
  const list = cases.filter((c) => filter === 'All' || c.genre === filter)
  const openIdx = cases.findIndex((c) => c.id === openId)

  return (
    <section id="results" className="gutter py-[clamp(72px,10vw,130px)]">
      <div className="wrap flex flex-col gap-10">
        <SectionHead eyebrow="Results & case studies" title={['REAL MUSIC.', 'REAL REACH.', 'REAL RESULTS.']}
          text="Every campaign is measured the same way: how many videos went live, how many people saw them, and how long it took." />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter case studies">
            {filters.map((f) => (
              <button key={f} type="button" role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
                className={`min-h-[40px] rounded-full px-4 text-[14px] font-medium border transition-colors ${filter === f ? 'bg-cream text-ink border-cream' : 'border-hair text-cream/80 hover:border-lemon/60'}`}>{f}</button>
            ))}
          </div>
          {cases.some((c) => c.demo) && (
            <p className="text-[13px] text-muted max-w-sm">Cards marked <span className="text-warn">Demo</span> show the layout. Verified campaign data replaces them before launch.</p>
          )}
        </div>

        <div ref={ref} className="grid gap-5 lg:grid-cols-2">
          {list.map((c) => (
            <CaseCard key={c.id} c={c} i={cases.indexOf(c)} run={seen} onOpen={() => setOpenId(c.id)} />
          ))}
        </div>
      </div>

      <Modal open={openIdx >= 0} onClose={() => setOpenId(null)} label="Case study" wide>
        {openIdx >= 0 && <CaseDetail c={cases[openIdx]} i={openIdx} onLaunch={() => { setOpenId(null); setTimeout(() => go('apply'), 60) }} />}
      </Modal>
    </section>
  )
}
