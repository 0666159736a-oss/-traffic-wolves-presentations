import { why as W } from '../content/site.js'
import { useInView } from '../lib/hooks.js'
import { Chart, Eye, Layers, Music } from '../components/Icons.jsx'
import { Lemon } from '../components/Lemon.jsx'

const ICONS = { eye: Eye, music: Music, layers: Layers, chart: Chart }

/** One account vs a creator network, drawn to show reach multiplying. */
function Reach({ seen }) {
  const ring = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2)
  return (
    <svg viewBox="0 0 320 150" className="w-full" aria-hidden="true">
      <g>
        <circle cx="52" cy="75" r="40" fill="none" stroke="#f6d23c" strokeOpacity=".25" strokeDasharray="3 5" />
        <circle cx="52" cy="75" r="14" fill="#f6d23c" />
        <text x="52" y="140" textAnchor="middle" fill="#aaa597" fontSize="11" fontFamily="JetBrains Mono, monospace">1 ACCOUNT</text>
      </g>
      <g>
        {ring.map((a, i) => {
          const x = 230 + Math.cos(a) * 52, y = 70 + Math.sin(a) * 52
          return (
            <g key={i} style={{ transition: 'opacity .5s, transform .6s', transitionDelay: `${200 + i * 70}ms`, opacity: seen ? 1 : 0.25 }}>
              <line x1="230" y1="70" x2={x} y2={y} stroke="#f6d23c" strokeOpacity=".35" />
              <circle cx={x} cy={y} r="17" fill="none" stroke="#f6d23c" strokeOpacity=".22" />
              <circle cx={x} cy={y} r="7" fill="#f6d23c" />
            </g>
          )
        })}
        <circle cx="230" cy="70" r="12" fill="#f6d23c" />
        <text x="230" y="140" textAnchor="middle" fill="#aaa597" fontSize="11" fontFamily="JetBrains Mono, monospace">CREATOR NETWORK</text>
      </g>
    </svg>
  )
}

export default function Why() {
  const [ref, seen] = useInView({ threshold: 0.3 })
  return (
    <section id="why" className="gutter py-[clamp(48px,7vw,96px)] border-t border-hair">
      <div className="wrap flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="eyebrow">Why music clipping works</div>
          <h2 className="display text-[clamp(34px,5.4vw,72px)]">{W.title[0]} <span className="text-lemon">{W.title[1]}</span></h2>
          <p className="max-w-2xl text-[17px] leading-relaxed text-cream/80">{W.subtitle}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <div className="grid grid-cols-2 gap-3">
            {W.benefits.map((b) => {
              const Icon = ICONS[b.icon]
              return (
                <div key={b.title} className="group flex flex-col gap-3 rounded-[22px] border border-line bg-panel p-4 transition-colors hover:border-lemon/60 sm:p-5">
                  <span className="grid size-11 place-items-center rounded-2xl bg-lemon/10 text-lemon transition-colors group-hover:bg-lemon group-hover:text-[#14120a]"><Icon className="size-5" /></span>
                  <h3 className="text-[16px] font-bold leading-tight sm:text-[18px]">{b.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-muted sm:text-[14.5px]">{b.text}</p>
                </div>
              )
            })}
          </div>
          <div ref={ref} className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-[26px] border border-lemon/40 p-5 sm:p-7"
            style={{ background: 'radial-gradient(circle at 80% 0%, rgb(246 210 60 / .18), transparent 60%), var(--color-panel)' }}>
            <Lemon className="absolute right-4 top-4 size-10" anim="sway" />
            <p className="display max-w-[16ch] pr-10 text-[clamp(24px,2.8vw,34px)] !leading-[1.05]">{W.line[0]} <span className="text-lemon">{W.line[1]}</span></p>
            <Reach seen={seen} />
            <p className="text-[13.5px] leading-relaxed text-muted">{W.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
