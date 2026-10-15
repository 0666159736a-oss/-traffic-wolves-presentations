import { advantages, steps } from '../content/site.js'
import { useInView } from '../lib/hooks.js'
import { Chart, Layers, Target, Users } from '../components/Icons.jsx'

const ICONS = { users: Users, manager: Target, chart: Chart, scale: Layers }

/** How it works + why Lemon Clips, in one block. */
export default function HowItWorks() {
  const [ref, seen] = useInView({ threshold: 0.3 })
  return (
    <section id="how" className="gutter py-[clamp(48px,7vw,96px)] border-t border-hair">
      <div className="wrap flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <div className="eyebrow">How it works</div>
          <h2 className="display text-[clamp(36px,5.6vw,76px)]">FROM FIRST CALL <span className="text-lemon">TO GROWTH.</span></h2>
        </div>

        <ol ref={ref} className="relative grid gap-3 md:grid-cols-3 md:gap-0">
          <div className="absolute left-[27px] top-[28px] bottom-[28px] w-px bg-hair md:left-0 md:right-0 md:top-[27px] md:bottom-auto md:h-px md:w-auto" aria-hidden="true">
            <div className={`absolute inset-0 origin-top bg-lemon transition-transform duration-[1600ms] ease-out md:origin-left ${seen ? 'scale-100' : 'max-md:scale-y-[.08] md:scale-x-[.08]'}`} />
          </div>
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 md:flex-col md:pr-8">
              <span className={`relative z-10 grid size-14 shrink-0 place-items-center rounded-full font-mono text-[15px] font-bold transition-colors duration-500 ${seen ? 'bg-lemon text-[#14120a]' : 'border border-line bg-panel-2 text-lemon'}`} style={{ transitionDelay: `${i * 450}ms` }}>
                0{i + 1}
              </span>
              <div className="flex flex-col gap-1.5 pt-2 md:pt-0">
                <h3 className="text-[clamp(19px,1.8vw,23px)] font-bold leading-tight">{s.title}</h3>
                <p className="text-[15.5px] text-muted leading-relaxed">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {advantages.map((a) => {
            const Icon = ICONS[a.icon]
            return (
              <div key={a.title} className="group flex flex-col gap-4 rounded-[22px] border border-line bg-panel p-5 transition-colors hover:border-lemon/60">
                <span className="grid size-12 place-items-center rounded-2xl bg-lemon/10 text-lemon transition-colors group-hover:bg-lemon group-hover:text-[#14120a]"><Icon className="size-6" /></span>
                <h3 className="text-[16px] font-bold leading-tight sm:text-[18px]">{a.title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
