import { advantages, stats, whyCopy } from '../content/site.js'
import { useCountUp, useInView } from '../lib/hooks.js'
import SectionHead from '../components/SectionHead.jsx'
import { VideoArt } from '../components/PhoneCard.jsx'
import { Bolt, Chart, Layers, Sliders, Target, Users } from '../components/Icons.jsx'

const ICONS = [Users, Layers, Bolt, Chart, Sliders, Target]
const WALL = Array.from({ length: 18 }, (_, i) => ({ hue: [48, 330, 200, 20, 140, 270][i % 6], variant: ['figure', 'lyrics', 'eq'][i % 3] }))

function StatTile({ s, run }) {
  const v = useCountUp(s.value, run, 1400)
  return (
    <div className="flex flex-col gap-2 border-t border-line pt-5 min-w-0">
      <div className="display tnum text-[clamp(56px,7vw,92px)] text-lemon">{Math.round(v)}{s.suffix}</div>
      <div className="text-[16px] font-semibold">{s.label}</div>
      <div className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
        {s.note}
        {!s.verified && <span className="demo-tag">Replace with verified figure</span>}
      </div>
    </div>
  )
}

export default function Why() {
  const [ref, seen] = useInView({ threshold: 0.3 })
  return (
    <section id="why" className="relative gutter overflow-hidden py-[clamp(72px,10vw,130px)] border-t border-hair">
      {/* video wall */}
      <div className="pointer-events-none absolute top-0 h-[52%] right-[-10%] hidden w-[55%] lg:block [mask-image:linear-gradient(90deg,transparent,#000_45%)]" aria-hidden="true">
        <div className="grid h-full grid-cols-6 gap-3 rotate-[-8deg] scale-110 opacity-35">
          {WALL.map((w, i) => (
            <div key={i} className="phone" style={{ translate: `0 ${(i % 2) * 30}px` }}>
              <div className="phone-screen"><VideoArt hue={w.hue} variant={w.variant} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap relative flex flex-col gap-14">
        <div className="max-w-3xl flex flex-col gap-6">
          <SectionHead eyebrow="Why Lemon Clips" title={['YOUR MUSIC.', 'HUNDREDS OF CREATORS.']} align="left" />
          <p className="text-[clamp(19px,2.2vw,24px)] leading-snug text-cream/90 max-w-2xl">{whyCopy.lead}</p>
          <ul className="flex flex-col gap-3 max-w-2xl">
            {whyCopy.points.map((p, i) => (
              <li key={i} className="flex gap-4 text-muted text-[16px] leading-relaxed">
                <span className="font-mono text-lemon text-[13px] pt-1">→</span>{p}
              </li>
            ))}
          </ul>
        </div>

        <div ref={ref} className="grid gap-8 sm:grid-cols-3">
          {stats.map((s) => <StatTile key={s.label} s={s} run={seen} />)}
        </div>

        <div className="grid gap-px overflow-hidden rounded-[26px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => {
            const Icon = ICONS[i]
            return (
              <div key={a.title} className="group flex flex-col gap-4 bg-panel p-6 transition-colors hover:bg-panel-2">
                <span className="grid size-11 place-items-center rounded-xl border border-line text-lemon transition-colors group-hover:bg-lemon group-hover:text-[#14120a]"><Icon /></span>
                <h3 className="text-[19px] font-bold leading-tight">{a.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed">{a.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
