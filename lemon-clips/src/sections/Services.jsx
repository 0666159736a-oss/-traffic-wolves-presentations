import { useState } from 'react'
import { config, serviceRows, services } from '../content/site.js'
import { useNav } from '../lib/nav.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { ArrowRight, ArrowUpRight, Check, X } from '../components/Icons.jsx'

function Cell({ v }) {
  if (v === true) return <Check className="size-5 text-lemon" aria-label="Included" />
  if (v === false) return <X className="size-4 text-muted/50" aria-label="Not included" />
  return <span>{v}</span>
}

export default function Services() {
  const { go, choosePreset, openBooking } = useNav()
  const [selected, setSelected] = useState('managed')

  const act = (s) => {
    if (s.cta.action === 'book') return openBooking()
    choosePreset(s.name)
    go('apply')
  }

  return (
    <section id="services" className="gutter py-[clamp(72px,10vw,130px)] border-t border-hair">
      <div className="wrap flex flex-col gap-12">
        <SectionHead eyebrow="Our services" title={['CHOOSE HOW', 'YOU WANT TO GROW.']}
          text="Three ways to work with us. The difference is how much of the campaign you want to run yourself." />

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((s, i) => {
            const on = selected === s.id
            return (
              <article key={s.id} style={on ? { background: 'radial-gradient(circle at 80% 0%, rgb(246 210 60 / .16), transparent 55%), var(--color-panel)' } : undefined} onMouseEnter={() => setSelected(s.id)} onFocus={() => setSelected(s.id)}
                className={`relative flex flex-col gap-6 rounded-[28px] border p-7 transition-all duration-300 ${on ? 'border-lemon bg-panel shadow-[0_30px_80px_-30px_rgb(246_210_60/.35)] lg:-translate-y-2' : 'border-line bg-panel'}`}>
                {s.featured && <span className="absolute right-5 top-5 rounded-full bg-lemon px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#14120a]">Recommended</span>}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[12px] text-muted">Model {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="display text-[clamp(28px,3vw,36px)] pr-24 lg:pr-0">{s.name}</h3>
                  <p className="text-lemon font-semibold text-[17px]">{s.tagline}</p>
                  <p className="text-muted leading-relaxed">{s.text}</p>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-y border-hair py-4">
                  <span className="text-[13px] text-muted">Pricing</span>
                  <span className="text-[18px] font-bold">{s.price ?? 'Custom quote'}</span>
                </div>
                <ul className="flex flex-col gap-3 text-[15px]">
                  {serviceRows.filter((r) => s.features[r.key]).map((r) => (
                    <li key={r.key} className="flex gap-3"><Check className="size-5 shrink-0 text-lemon" /><span><span className="text-muted">{r.label}:</span> {s.features[r.key] === true ? 'Included' : s.features[r.key]}</span></li>
                  ))}
                </ul>
                <p className="text-[13.5px] text-muted">Best for: <span className="text-cream">{s.bestFor}</span></p>
                {s.cta.action === 'platform' && config.platformUrl ? (
                  <a href={config.platformUrl} target="_blank" rel="noopener noreferrer" className={`btn mt-auto w-full ${on ? 'btn-primary' : 'btn-ghost'}`}>{s.cta.label} <ArrowUpRight /></a>
                ) : (
                  <button type="button" onClick={() => act(s)} className={`btn mt-auto w-full ${on ? 'btn-primary' : 'btn-ghost'}`}>{s.cta.label} <ArrowRight /></button>
                )}
              </article>
            )
          })}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="display text-[26px]">Compare models</h3>
          <div className="overflow-x-auto rounded-[22px] border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14.5px]">
              <thead>
                <tr className="bg-panel-2">
                  <th scope="col" className="p-4 font-mono text-[11.5px] uppercase tracking-wider text-muted font-medium w-[28%]">Feature</th>
                  {services.map((s) => (
                    <th key={s.id} scope="col" className={`p-4 font-bold ${selected === s.id ? 'text-lemon' : ''}`}>{s.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {serviceRows.map((r) => (
                  <tr key={r.key} className="border-t border-hair">
                    <th scope="row" className="p-4 font-medium text-muted">{r.label}</th>
                    {services.map((s) => (
                      <td key={s.id} className={`p-4 align-middle transition-colors ${selected === s.id ? 'bg-lemon/[.05]' : ''}`}><Cell v={s.features[r.key]} /></td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-hair">
                  <th scope="row" className="p-4 font-medium text-muted">View guarantee</th>
                  <td className="p-4 text-muted" colSpan={3}>1,000,000-view guarantee available on eligible packages. Terms are set in each proposal.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
