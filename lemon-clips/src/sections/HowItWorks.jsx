import { howItWorks as H } from '../content/site.js'
import { media } from '../content/media.js'
import { useInView } from '../lib/hooks.js'
import Clip from '../components/Clip.jsx'
import { Lemon, LemonSlice } from '../components/Lemon.jsx'
import { Play } from '../components/Icons.jsx'

// Real material from the cases (Music case) to show the pipeline.
const ORIGINAL = media['music-2']
const CLIPS = [
  { src: media['music-1'], views: '1.2M' },
  { src: media['music-2'], views: '2.7M' },
  { src: media['music-3'], views: '3.6M' },
]
const NETWORK = ['music-1', 'podcast-2', 'sports-2', 'doctor-1', 'edu-1', 'music-3', 'podcast-1', 'edu-2'].map((n) => media[n])

function V1() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10">
      <img src={ORIGINAL} alt="" loading="lazy" className="absolute inset-0 size-full object-cover object-[50%_35%]" />
      <div className="absolute inset-0 bg-black/30" />
      <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lemon text-[#14120a] shadow-lg"><Play className="size-4" /></span>
      <div className="absolute inset-x-3 bottom-3 h-1 overflow-hidden rounded-full bg-white/25"><span className="block h-full w-2/5 bg-lemon" /></div>
    </div>
  )
}

function V2({ seen }) {
  return (
    <div className="flex h-full items-center justify-center gap-1.5">
      {CLIPS.map((c, i) => (
        <div key={i} className={`w-[30%] transition-transform duration-700 ${seen ? '' : 'translate-y-3'}`} style={{ transitionDelay: `${300 + i * 150}ms`, rotate: `${(i - 1) * 5}deg` }}>
          <Clip {...c} sizes="text-[9px]" className="aspect-[9/16] rounded-xl" />
        </div>
      ))}
    </div>
  )
}

function V3() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      <div className="grid grid-cols-4 gap-1.5">
        {NETWORK.map((src, i) => (
          <span key={i} className="relative aspect-square overflow-hidden rounded-full ring-2 ring-lemon/30">
            <img src={src} alt="" loading="lazy" className="size-full object-cover object-top" />
          </span>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        {['TikTok', 'Reels', 'Shorts'].map((p) => <span key={p} className="rounded-full border border-line px-2 py-0.5 text-[10.5px] font-semibold">{p}</span>)}
      </div>
    </div>
  )
}

function V4({ seen }) {
  const bars = [18, 26, 22, 38, 34, 52, 61, 74, 88, 100]
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-ink/60 p-3">
      <div>
        <div className="display tnum text-[30px] text-lemon">12.5M</div>
        <div className="text-[10.5px] text-muted">Music case · reach in 1 month</div>
      </div>
      <div className="flex h-14 items-end gap-1">
        {bars.map((b, i) => (
          <span key={i} className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-gold/60 to-lemon transition-transform duration-700"
            style={{ height: `${b}%`, transform: seen ? 'none' : 'scaleY(.15)', transitionDelay: `${600 + i * 60}ms` }} />
        ))}
      </div>
    </div>
  )
}

const VISUALS = [V1, V2, V3, V4]

export default function HowItWorks() {
  const [ref, seen] = useInView({ threshold: 0.2 })
  return (
    <section id="how" className="relative gutter py-[clamp(48px,7vw,96px)]">
      <div className="wrap flex flex-col gap-9">
        <div className="relative flex flex-col gap-3">
          <div className="eyebrow">How it works</div>
          <h2 className="display max-w-5xl text-[clamp(34px,5.4vw,72px)]">{H.title[0]} <span className="text-lemon">{H.title[1]}</span></h2>
          <p className="max-w-2xl text-[17px] leading-relaxed text-cream/80">{H.subtitle}</p>
          <Lemon className="absolute -top-2 right-0 hidden size-16 md:block" anim="bob" />
        </div>

        <ol ref={ref} className="grid gap-3 lg:grid-cols-4 lg:gap-4">
          {H.steps.map((s, i) => {
            const V = VISUALS[i]
            return (
              <li key={s.title} className="relative">
                <div className={`grid h-full grid-cols-[112px_1fr] gap-4 rounded-[22px] border border-line bg-panel p-3 transition-colors duration-500 sm:grid-cols-[140px_1fr] lg:flex lg:flex-col lg:p-4 ${seen ? 'border-lemon/40' : ''}`} style={{ transitionDelay: `${i * 250}ms` }}>
                  <div className="h-[136px] lg:h-[150px]"><V seen={seen} /></div>
                  <div className="flex min-w-0 flex-col gap-1.5 py-1 lg:py-0">
                    <div className="flex items-center gap-2">
                      <span className={`grid size-7 place-items-center rounded-full font-mono text-[11px] font-bold transition-colors duration-500 ${seen ? 'bg-lemon text-[#14120a]' : 'border border-line text-lemon'}`} style={{ transitionDelay: `${i * 250}ms` }}>0{i + 1}</span>
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted">{s.tag}</span>
                    </div>
                    <h3 className="text-[17px] font-bold leading-tight sm:text-[19px]">{s.title}</h3>
                    <p className="text-[14px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </div>
                {i < 3 && (
                  <span className="absolute -right-[13px] top-[80px] z-10 hidden size-6 place-items-center rounded-full bg-lemon text-[#14120a] lg:grid" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                )}
              </li>
            )
          })}
        </ol>

        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-lemon/40 px-4 py-3 text-[15px]">
          <LemonSlice className="size-7 shrink-0" />
          <span>{H.fromScratch}</span>
        </div>
      </div>
    </section>
  )
}
