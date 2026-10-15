import { config, services } from '../content/site.js'
import { useNav } from '../lib/nav.jsx'
import { ArrowRight, ArrowUpRight, Check } from '../components/Icons.jsx'
import { Lemon } from '../components/Lemon.jsx'

export default function Services() {
  const { go, choosePreset } = useNav()
  const start = (s) => { choosePreset(s.formValue); go('get-started') }
  return (
    <section id="services" className="gutter py-[clamp(48px,7vw,96px)]">
      <div className="wrap flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="eyebrow">Services</div>
          <h2 className="display text-[clamp(36px,5.6vw,76px)]">THREE WAYS TO <span className="text-lemon">GROW YOUR MUSIC.</span></h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.id} className={`card-hover flex flex-col gap-5 rounded-[26px] border p-6 sm:p-7 ${s.featured ? 'border-lemon/70' : 'border-line'}`}
              style={{ background: s.featured ? 'radial-gradient(circle at 85% 0%, rgb(246 210 60 / .18), transparent 55%), var(--color-panel)' : 'var(--color-panel)' }}>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[12px] text-lemon">0{i + 1}</span>
                {s.featured && <span className="rounded-full bg-lemon px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#14120a]">Most complete</span>}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="display text-[clamp(26px,2.6vw,32px)]">{s.name}</h3>
                <p className="text-[16.5px] leading-snug text-cream/85">{s.tagline}</p>
              </div>
              {s.guarantee && (
                <div className="flex items-start gap-3 rounded-2xl border border-lemon/50 bg-lemon/[.07] p-3">
                  <Lemon className="size-9 shrink-0" anim="sway" />
                  <div>
                    <div className="text-[14.5px] font-black uppercase tracking-wide text-lemon">1M Views Guarantee Available</div>
                    <div className="text-[13px] leading-snug text-muted">Dedicated campaign management, creator distribution and measurable results.</div>
                  </div>
                </div>
              )}
              <ul className="flex flex-col gap-2.5 border-t border-hair pt-5 text-[15px]">
                {s.points.map((p) => <li key={p} className="flex gap-2.5"><Check className="mt-0.5 size-[18px] shrink-0 text-lemon" />{p}</li>)}
              </ul>
              <div className="mt-auto flex flex-col gap-2 pt-1">
                <button type="button" onClick={() => start(s)} className={`btn w-full ${s.featured ? 'btn-primary' : 'btn-ghost'}`}>{s.cta} <ArrowRight /></button>
                {s.id === 'clipping' && config.platformUrl && (
                  <a href={config.platformUrl} target="_blank" rel="noopener noreferrer" className="text-center text-[14px] text-muted hover:text-lemon">Launch it yourself on the platform <ArrowUpRight className="inline size-4" /></a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
