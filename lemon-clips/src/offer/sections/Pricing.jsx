import { useState } from 'react'
import { costOf, fmtNum, fmtUsd, price, pricing } from '../content.js'
import { Minus, Plus, Reveal, SectionTitle } from '../ui.jsx'

const QUICK = [1, 3, 5, 10, 20]

function Calculator() {
  const [m, setM] = useState(3) // millions
  const min = price.minViews / 1e6, max = price.maxViews / 1e6, step = price.step / 1e6
  const clamp = (x) => Math.min(max, Math.max(min, Math.round(x / step) * step))
  const views = m * 1e6
  const pct = ((m - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-6 rounded-[32px] border border-lemon/40 bg-panel p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="label text-lemon">Калькулятор вартості</span>
        <span className="text-[13px] text-dim">крок 1 000 000</span>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="calc-views" className="text-[15px] font-bold">Кількість переглядів</label>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setM((x) => clamp(x - step))} disabled={m <= min} className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-lemon hover:text-ink disabled:opacity-30" aria-label="Мінус 1 000 000"><Minus /></button>
          <output htmlFor="calc-views" className="h-display tnum flex-1 text-center text-[clamp(28px,4vw,44px)]">{fmtNum(views)}</output>
          <button type="button" onClick={() => setM((x) => clamp(x + step))} disabled={m >= max} className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-lemon hover:text-ink disabled:opacity-30" aria-label="Плюс 1 000 000"><Plus /></button>
        </div>
        <input id="calc-views" type="range" min={min} max={max} step={step} value={m} onChange={(e) => setM(clamp(+e.target.value))}
          aria-valuetext={`${fmtNum(views)} переглядів`}
          className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[#f6d23c]"
          style={{ background: `linear-gradient(90deg, #f6d23c ${pct}%, rgb(255 255 255 / .12) ${pct}%)` }} />
        <div className="flex justify-between text-[12px] font-semibold text-dim"><span>{fmtNum(price.minViews)}</span><span>{fmtNum(price.maxViews)}</span></div>
        <div className="flex flex-wrap gap-2">
          {QUICK.map((q) => (
            <button key={q} type="button" onClick={() => setM(q)} aria-pressed={m === q}
              className={`rounded-full px-3.5 py-2 text-[13px] font-extrabold transition-colors ${m === q ? 'bg-lemon text-ink' : 'bg-white/[.06] text-white hover:bg-white/15'}`}>{q} млн</button>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] bg-lemon p-5 text-ink sm:p-6">
        <span className="label text-ink/60">Вартість кампанії</span>
        <div className="h-display tnum mt-1 text-[clamp(48px,7vw,84px)] !leading-none">{fmtUsd(costOf(views))}</div>
        <div className="mt-2 text-[13.5px] font-semibold text-ink/70 tnum">{fmtNum(views)} / 1 000 × ${price.perThousand.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" data-pdf className="gutter py-[clamp(40px,6vw,80px)]">
      <div className="wrap flex flex-col gap-8">
        <Reveal><SectionTitle kicker="Вартість просування">{pricing.title[0]}<br /><span className="text-lemon">{pricing.title[1]}</span></SectionTitle></Reveal>

        <Reveal className="flex flex-col items-start justify-between gap-4 rounded-[32px] bg-lemon p-6 text-ink sm:flex-row sm:items-center sm:p-10">
          <div className="h-display text-[clamp(36px,6.4vw,84px)] !leading-[.95]">
            <span className="tnum">${price.perThousand.toFixed(2)}</span> ЗА<br />1 000 ПЕРЕГЛЯДІВ
          </div>
          <div className="rounded-full bg-ink px-5 py-3 text-[clamp(13px,1.4vw,16px)] font-extrabold text-lemon">{pricing.min}</div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="overflow-hidden rounded-[32px] bg-white text-ink">
            <table className="w-full text-left">
              <caption className="sr-only">Вартість за кількість переглядів</caption>
              <thead>
                <tr className="border-b border-black/10">
                  <th scope="col" className="label px-6 py-5 text-ink-dim sm:px-8">Перегляди</th>
                  <th scope="col" className="label px-6 py-5 text-right text-ink-dim sm:px-8">Вартість</th>
                </tr>
              </thead>
              <tbody>
                {pricing.rows.map((v) => (
                  <tr key={v} className="border-b border-black/10 last:border-0 transition-colors hover:bg-lemon/30">
                    <td className="tnum px-6 py-5 text-[clamp(18px,2vw,24px)] font-extrabold sm:px-8">{fmtNum(v)}</td>
                    <td className="h-display tnum px-6 py-5 text-right text-[clamp(22px,2.6vw,32px)] sm:px-8">{fmtUsd(costOf(v))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal delay={120}><Calculator /></Reveal>
        </div>

        <p className="text-[15px] text-dim">{pricing.terms}</p>
      </div>
    </section>
  )
}
