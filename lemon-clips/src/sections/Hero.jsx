import { useEffect, useState } from 'react'
import { hero } from '../content/site.js'
import { useNav } from '../lib/nav.jsx'
import PhoneCard from '../components/PhoneCard.jsx'
import { ArrowRight, Play } from '../components/Icons.jsx'

// Stage geometry: viewBox units match the container's aspect ratio (500 x 540).
const W = 500, H = 540, C = { x: 250, y: 270 }
const PHONES = [
  { x: 92, y: 132, w: 24, rot: -8, hue: 48, variant: 'figure', handle: '@dance.daily', platform: 'TikTok', tick: [184200, 900], delay: 0 },
  { x: 410, y: 118, w: 22, rot: 7, hue: 330, variant: 'lyrics', handle: '@lyricsdump', platform: 'Reels', tick: [62900, 420], delay: 1.2 },
  { x: 70, y: 400, w: 21, rot: 5, hue: 200, variant: 'eq', handle: '@carvibes', platform: 'Shorts', tick: [31500, 260], delay: 2.1 },
  { x: 420, y: 396, w: 24, rot: -6, hue: 20, variant: 'figure', handle: '@pov.edits', platform: 'TikTok', tick: [418000, 1500], delay: 0.6 },
]
const curve = (p) => `M${C.x} ${C.y} Q ${(C.x + p.x) / 2 + (p.y < C.y ? -30 : 30)} ${(C.y + p.y) / 2} ${p.x} ${p.y}`

const TOASTS = ['New video posted · TikTok', 'Sound added to a Reel', 'New video posted · Shorts', 'Creator joined campaign', 'Video approved']

function Stage() {
  const [toast, setToast] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setToast((t) => (t + 1) % TOASTS.length), 2400)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative mx-auto w-full max-w-[560px]" style={{ aspectRatio: `${W} / ${H}` }} aria-label="Illustration: one track distributed to many creator videos" role="img">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <defs>
          <radialGradient id="glow"><stop offset="0" stopColor="#f6d23c" stopOpacity=".35" /><stop offset="1" stopColor="#f6d23c" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx={C.x} cy={C.y} r="230" fill="url(#glow)" />
        {[120, 175, 230].map((r) => <circle key={r} cx={C.x} cy={C.y} r={r} fill="none" stroke="#f6d23c" strokeOpacity=".09" strokeDasharray="2 6" />)}
        {PHONES.map((p, i) => (
          <g key={i}>
            <path d={curve(p)} fill="none" stroke="#f6d23c" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle r="4" fill="#f6d23c">
              <animateMotion dur={`${2.4 + i * 0.35}s`} repeatCount="indefinite" path={curve(p)} begin={`${p.delay}s`} />
            </circle>
          </g>
        ))}
      </svg>

      {/* Center: the track */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36%]">
        <span className="absolute inset-0 rounded-full border-2 border-lemon/60 animate-pulse-ring" />
        <span className="absolute inset-0 rounded-full border-2 border-lemon/40 animate-pulse-ring" style={{ animationDelay: '1.3s' }} />
        <div className="relative aspect-square rounded-full animate-spin-slow shadow-[0_0_80px_-10px_rgb(246_210_60/.5)]"
          style={{ background: 'repeating-radial-gradient(circle at 50% 50%, #0c0b08 0 2px, #1a1812 2px 4px)' }}>
          <div className="absolute inset-[30%] rounded-full bg-lemon grid place-items-center">
            <span className="size-[18%] rounded-full bg-ink" />
          </div>
        </div>
        <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-ink/80 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-lemon backdrop-blur">
          ♫ Your track
        </div>
      </div>

      {PHONES.map((p, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%`, width: `${p.w}%` }}>
          <div className="animate-float" style={{ animationDelay: `${-i * 1.7}s` }}>
            <PhoneCard {...p} sound="Your Track · Your Name" style={{ rotate: `${p.rot}deg` }} />
          </div>
        </div>
      ))}

      <div className="absolute left-1/2 top-[6%] -translate-x-1/2 w-max max-w-[60%]" aria-live="off">
        <div key={toast} className="animate-rise flex items-center gap-2 rounded-full border border-line bg-panel/90 px-3 py-1.5 text-[11.5px] font-medium backdrop-blur shadow-lg">
          <span className="size-2 rounded-full bg-ok" />{TOASTS[toast]}
        </div>
      </div>
      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10.5px] font-mono uppercase tracking-wider text-muted/80">Illustration · sample figures</p>
    </div>
  )
}

const PLATFORMS = ['TikTok', 'Instagram Reels', 'YouTube Shorts']

export default function Hero() {
  const { go } = useNav()
  return (
    <section id="top" className="relative gutter overflow-hidden">
      <div className="wrap grid items-center gap-10 pt-8 pb-14 lg:grid-cols-[1.2fr_1fr] lg:gap-4 lg:pt-14 lg:pb-20">
        <div className="flex flex-col gap-7 min-w-0">
          <div className="eyebrow flex items-center gap-2.5"><span className="h-px w-8 bg-lemon" />{hero.eyebrow}</div>
          <h1 className="display text-[clamp(50px,6.6vw,96px)]">
            {hero.title.map((l, i) => (
              <span key={i} className={`block animate-rise ${i === 2 ? 'text-lemon' : ''}`} style={{ animationDelay: `${i * 90}ms` }}>{l}</span>
            ))}
          </h1>
          <p className="max-w-[34rem] text-[clamp(18px,2vw,22px)] leading-[1.45] text-cream/85">{hero.subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn btn-primary !min-h-[56px] !px-7" onClick={() => go('apply')}>Launch your campaign <ArrowRight /></button>
            <button type="button" className="btn btn-ghost !min-h-[56px] !px-7" onClick={() => go('how')}><Play className="size-4" /> See how it works</button>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13.5px] text-muted">
            <span className="text-cream/90 font-semibold">Built for</span>
            {hero.audiences.map((a, i) => (
              <span key={a} className="flex items-center gap-4">{i > 0 && <span className="size-1 rounded-full bg-lemon/60" />}{a}</span>
            ))}
          </div>
        </div>
        <Stage />
      </div>

      <div className="border-y border-hair py-5 overflow-hidden mask-fade-x" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            Array.from({ length: 4 }).flatMap((__, j) => PLATFORMS.map((p) => (
              <span key={`${k}-${j}-${p}`} className="display flex items-center gap-10 text-[22px] text-cream/70">
                {p}<span className="text-lemon">✦</span>
              </span>
            )))
          )}
        </div>
      </div>
    </section>
  )
}
