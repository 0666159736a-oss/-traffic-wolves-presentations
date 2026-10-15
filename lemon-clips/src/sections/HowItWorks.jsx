import { steps } from '../content/site.js'
import { useInView } from '../lib/hooks.js'
import { useNav } from '../lib/nav.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { VideoArt } from '../components/PhoneCard.jsx'
import { ArrowRight, Music, Upload } from '../components/Icons.jsx'

function Visual1() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 rounded-2xl border border-hair bg-ink/60 p-4">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-lemon text-[#14120a]"><Music /></span>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold truncate">your-new-single.wav</div>
          <div className="text-[12px] text-muted">Track · Goal · Budget</div>
        </div>
        <Upload className="size-5 text-lemon" />
      </div>
      <div className="flex h-10 items-center gap-[3px]" aria-hidden="true">
        {Array.from({ length: 42 }).map((_, i) => (
          <span key={i} className="flex-1 rounded-full bg-lemon/70 origin-center animate-eq" style={{ height: `${25 + Math.abs(Math.sin(i * 0.7)) * 75}%`, animationDelay: `${(i % 7) * 0.1}s`, animationDuration: '1.6s' }} />
        ))}
      </div>
    </div>
  )
}

function Visual2() {
  return (
    <div className="relative flex h-full items-center justify-center" aria-hidden="true">
      {[-16, -6, 5, 15].map((r, i) => (
        <div key={i} className="phone absolute w-[21%] transition-transform duration-700 group-hover:translate-y-[-6px]"
          style={{ rotate: `${r}deg`, translate: `${(i - 1.5) * 52}% ${Math.abs(i - 1.5) * 8}%` }}>
          <div className="phone-screen"><VideoArt hue={[48, 330, 200, 20][i]} variant={['figure', 'lyrics', 'eq', 'figure'][i]} /></div>
        </div>
      ))}
    </div>
  )
}

function Visual3() {
  const pts = [8, 12, 10, 18, 16, 27, 25, 38, 52, 49, 68, 86]
  const max = 90
  const d = pts.map((p, i) => `${(i / (pts.length - 1)) * 100},${100 - (p / max) * 100}`).join(' ')
  return (
    <div className="flex h-full flex-col gap-2 rounded-2xl border border-hair bg-ink/60 p-4" aria-hidden="true">
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-mono uppercase tracking-wider text-muted">Views / day</span>
        <span className="rounded-full bg-ok/15 px-2 py-0.5 text-ok font-semibold">Scaling winners</span>
      </div>
      <svg viewBox="0 -4 100 108" preserveAspectRatio="none" className="w-full flex-1">
        <defs><linearGradient id="hw-a" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#f6d23c" stopOpacity=".35" /><stop offset="1" stopColor="#f6d23c" stopOpacity="0" /></linearGradient></defs>
        {[25, 50, 75].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#fff" strokeOpacity=".06" vectorEffect="non-scaling-stroke" />)}
        <polygon points={`0,100 ${d} 100,100`} fill="url(#hw-a)" />
        <polyline points={d} fill="none" stroke="#f6d23c" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

const VISUALS = [Visual1, Visual2, Visual3]

export default function HowItWorks() {
  const { go } = useNav()
  const [ref, seen] = useInView({ threshold: 0.3 })
  return (
    <section id="how" className="gutter py-[clamp(72px,10vw,130px)] border-t border-hair">
      <div className="wrap flex flex-col gap-14">
        <SectionHead eyebrow="How it works" title={['FROM YOUR TRACK', 'TO MILLIONS OF SCREENS.']} />

        <div ref={ref} className="relative">
          {/* connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-hair lg:block" aria-hidden="true">
            <div className="h-full bg-lemon transition-[width] duration-[1800ms] ease-out" style={{ width: seen ? '100%' : '12%' }} />
          </div>
          <ol className="grid gap-6 lg:grid-cols-3">
            {steps.map((s, i) => {
              const V = VISUALS[i]
              return (
                <li key={s.n} className="group relative flex flex-col gap-5">
                  <span className={`relative z-10 grid size-14 place-items-center rounded-full font-mono text-[15px] font-bold transition-colors duration-500 ${seen ? 'bg-lemon text-[#14120a]' : 'bg-panel-2 text-lemon border border-line'}`} style={{ transitionDelay: `${i * 500}ms` }}>
                    {s.n}
                  </span>
                  <div className="card-hover flex flex-1 flex-col gap-5 rounded-[24px] border border-line bg-panel p-5">
                    <div className="h-[190px]"><V /></div>
                    <div className="flex flex-col gap-2">
                      <h3 className="display text-[28px] !leading-none">{s.title}</h3>
                      <p className="text-muted text-[16px] leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <button type="button" className="btn btn-primary" onClick={() => go('apply')}>Submit your music <ArrowRight /></button>
          <p className="text-muted text-[15px]">Tell us about the release. We come back with a campaign plan.</p>
        </div>
      </div>
    </section>
  )
}
