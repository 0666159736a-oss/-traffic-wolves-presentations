import { cases } from '../content.js'
import { ArrowUpRight, LogoMark, Photo, Reveal, SectionTitle } from '../ui.jsx'

const Pending = ({ children = 'буде додано' }) => <span className="font-semibold text-white/35">{children}</span>

function CaseCard({ c, i }) {
  const facts = [
    { label: 'Тип просування', value: c.type },
    { label: 'Перегляди', value: c.views },
  ]
  return (
    <Reveal as="article" className="group grid overflow-hidden rounded-[36px] border border-hair bg-panel lg:grid-cols-[1.05fr_1fr]">
      {/* Large photo */}
      <div className="relative min-h-[380px] overflow-hidden sm:min-h-[460px] lg:min-h-[620px]">
        {c.photo
          ? <img src={c.photo} alt={c.name} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          : (
            <div className="absolute inset-0 grid place-items-center" style={{ background: 'radial-gradient(70% 60% at 70% 20%, rgb(255 214 10 / .35), transparent 70%), #1a1a1a' }}>
              <div data-pdf-hide className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-white/30 px-5 py-4 text-center text-[13px] text-white/70">
                <Photo className="size-6" /> Фото артиста буде додано
              </div>
            </div>
          )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-extrabold text-ink">
          <LogoMark className="size-5" /> Кейс 0{i + 1}
        </div>
        <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
          <h3 className="h-display text-[clamp(44px,7vw,96px)] text-white">{c.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-7 p-6 sm:p-10">
        <div className="flex flex-col gap-2">
          <span className="label text-dim">Головний результат</span>
          <div className="h-display text-[clamp(38px,5vw,68px)] text-lemon">{c.headline || <Pending />}</div>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.label} className="rounded-[20px] bg-white/[.04] p-4">
              <dt className="label !text-[11px] text-dim">{f.label}</dt>
              <dd className="mt-1 text-[18px] font-extrabold">{f.value || <Pending />}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-2">
          <span className="label text-dim">Про кампанію</span>
          {c.description ? <p className="text-[16px] leading-relaxed text-white/85">{c.description}</p> : <p className="text-[15px]"><Pending>Опис кампанії буде додано</Pending></p>}
        </div>

        {c.results.length > 0 && (
          <ul className="flex flex-col gap-2">
            {c.results.map((r) => <li key={r} className="flex gap-3 text-[16px] font-semibold"><span className="mt-2 size-2 shrink-0 rounded-full bg-lemon" />{r}</li>)}
          </ul>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {c.metrics.length > 0
            ? c.metrics.map((m) => (
              <div key={m.label} className="rounded-[20px] border border-lemon/30 p-4">
                <div className="h-display tnum text-[clamp(24px,2.6vw,34px)] text-lemon">{m.value}</div>
                <div className="mt-1 text-[13px] font-semibold text-dim">{m.label}</div>
              </div>
            ))
            : ['Перегляди', 'Охоплення', 'Інше'].map((l) => (
              <div key={l} className="rounded-[20px] border border-dashed border-white/15 p-4">
                <div className="h-display text-[24px] text-white/25">—</div>
                <div className="mt-1 text-[13px] font-semibold text-white/35">{l}</div>
              </div>
            ))}
        </div>

        {c.details?.url && (
          <a data-pdf-hide href={c.details.url} target="_blank" rel="noopener noreferrer" className="btn btn-lemon mt-auto w-fit">
            {c.details.label || 'Детальніше'} <span className="arrow"><ArrowUpRight className="size-4" /></span>
          </a>
        )}
      </div>
    </Reveal>
  )
}

export default function Cases() {
  return (
    <section id="cases" data-pdf className="gutter py-[clamp(40px,6vw,80px)]">
      <div className="wrap flex flex-col gap-8">
        <Reveal><SectionTitle kicker="Результати">НАШІ <span className="text-lemon">КЕЙСИ</span></SectionTitle></Reveal>
        <div className="flex flex-col gap-6">
          {cases.map((c, i) => <CaseCard key={c.id} c={c} i={i} />)}
        </div>
      </div>
    </section>
  )
}
