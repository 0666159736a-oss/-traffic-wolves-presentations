import { hero, heroMedia } from '../content/site.js'
import Actions from '../components/Actions.jsx'
import Video from '../components/Video.jsx'

const ORBIT = ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'Creator network', 'SMM', 'Dedicated manager']

/** Brand graphic: your track at the center, the channels it reaches around it. No fake metrics. */
function Orbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgb(246 210 60 / .22), transparent 65%)' }} />
      {[0, 14, 28].map((inset) => (
        <div key={inset} className="absolute rounded-full border border-dashed border-lemon/15" style={{ inset: `${inset}%` }} />
      ))}
      <div className="absolute inset-[31%]">
        <span className="absolute inset-0 rounded-full border-2 border-lemon/60 animate-pulse-ring" />
        <span className="absolute inset-0 rounded-full border-2 border-lemon/40 animate-pulse-ring" style={{ animationDelay: '1.3s' }} />
        <div className="relative size-full rounded-full animate-spin-slow shadow-[0_0_90px_-10px_rgb(246_210_60/.55)]"
          style={{ background: 'repeating-radial-gradient(circle at 50% 50%, #0c0b08 0 2px, #1a1812 2px 4px)' }}>
          <div className="absolute inset-[30%] grid place-items-center rounded-full bg-lemon"><span className="size-[18%] rounded-full bg-ink" /></div>
        </div>
      </div>
      <div className="absolute inset-0 animate-[spin_60s_linear_infinite]">
        {ORBIT.map((label, i) => {
          const a = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2
          const r = i % 2 ? 36 : 47
          return (
            <span key={label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + Math.cos(a) * r}%`, top: `${50 + Math.sin(a) * r}%` }}>
              <span className="block animate-[spin_60s_linear_infinite_reverse] whitespace-nowrap rounded-full border border-line bg-ink/90 px-3 py-1.5 text-[12px] font-semibold text-cream backdrop-blur sm:text-[13px]">
                {label}
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

/** Real clips, when supplied. */
function MediaGrid() {
  const items = heroMedia.slice(0, 5)
  return (
    <div className="grid grid-cols-3 items-center gap-2.5 sm:gap-3">
      {items.map((m, i) => (
        <div key={i} className={`animate-rise ${i % 2 ? 'translate-y-6' : ''}`} style={{ animationDelay: `${i * 120}ms` }}>
          <Video src={m.videoUrl} poster={m.poster} label={m.caption} className="aspect-[9/16] rounded-2xl border border-line" />
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="gutter overflow-hidden">
      <div className="wrap flex flex-col gap-8 pt-6 pb-10 lg:pt-12 lg:pb-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-4">
          <div className="flex min-w-0 flex-col gap-6">
            <div className="eyebrow flex items-center gap-2.5"><span className="h-px w-8 bg-lemon" />{hero.eyebrow}</div>
            <h1 className="display text-[clamp(50px,6.8vw,100px)]">
              {hero.title.map((l, i) => (
                <span key={i} className={`block animate-rise ${i === 2 ? 'text-lemon' : ''}`} style={{ animationDelay: `${i * 90}ms` }}>{l}</span>
              ))}
            </h1>
            <p className="max-w-[36rem] text-[clamp(18px,2vw,22px)] leading-[1.45] text-cream/85">{hero.subtitle}</p>
          </div>
          <div className="mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-none">
            {heroMedia.length ? <MediaGrid /> : <Orbit />}
          </div>
        </div>
        <Actions />
      </div>
    </section>
  )
}
