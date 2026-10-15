import { hero, heroMedia } from '../content/site.js'
import Actions from '../components/Actions.jsx'
import Clip from '../components/Clip.jsx'
import { GuaranteeBadge } from '../components/Guarantee.jsx'
import { Lemon, LemonSlice } from '../components/Lemon.jsx'

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

/** Real campaign clips, fanned. */
function MediaFan() {
  const items = heroMedia.slice(0, 3)
  const pose = [
    { rot: -9, x: '-58%', y: '8%', z: 1, delay: '-2s' },
    { rot: 0, x: '0%', y: '0%', z: 3, delay: '0s' },
    { rot: 9, x: '58%', y: '8%', z: 2, delay: '-4s' },
  ]
  return (
    <div className="relative mx-auto aspect-[1/1.05] w-full max-w-[460px]" aria-label="Clips from real campaigns by the Traffic Wolves team" role="img">
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgb(246 210 60 / .22), transparent 65%)' }} />
      {items.map((m, i) => (
        <div key={i} className="absolute left-1/2 top-[6%] w-[44%] -translate-x-1/2" style={{ zIndex: pose[i].z }}>
          <div className="animate-float" style={{ animationDelay: pose[i].delay }}>
            <div className="animate-rise" style={{ animationDelay: `${i * 120}ms`, translate: `${pose[i].x} ${pose[i].y}`, rotate: `${pose[i].rot}deg` }}>
              <Clip src={m.src} videoUrl={m.videoUrl} views={m.views} sizes="text-[12px] sm:text-[13px]" className="aspect-[9/15] shadow-[0_30px_60px_-20px_#000] ring-1 ring-lemon/30" />
            </div>
          </div>
        </div>
      ))}
      <Lemon className="absolute -left-1 top-[2%] z-10 size-12 sm:size-16" anim="bob" />
      <LemonSlice className="absolute -right-1 top-[44%] z-10 size-9 sm:size-12" />
      <Lemon className="absolute right-[10%] -top-1 z-0 hidden size-8 opacity-70 sm:block" anim="sway" style={{ animationDelay: '-2s' }} />
      <div className="absolute bottom-[4%] left-1/2 z-10 w-max -translate-x-1/2 rounded-full border border-line bg-ink/90 px-3.5 py-1.5 text-[12px] font-semibold backdrop-blur">
        <span className="text-lemon">Real campaign clips</span> · Traffic Wolves team
      </div>
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
            <GuaranteeBadge />
          </div>
          <div className="mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-none">
            {heroMedia.length ? <MediaFan /> : <Orbit />}
          </div>
        </div>
        <Actions />
      </div>
    </section>
  )
}
