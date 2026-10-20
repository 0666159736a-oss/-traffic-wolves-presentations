import { cases } from '../content.js'
import { ArrowRight, Reveal, SectionTitle } from '../ui.jsx'

/** «value → label» line, value highlighted in brand yellow (LetsCorn pattern, yellow instead of purple). */
function Metric({ value, label, pending }) {
  return (
    <p className="font-[family-name:var(--font-mono)] text-[15px] leading-[1.5] sm:text-[16px]">
      {pending
        ? <><span className="text-ink-dim">{label}</span> <span className="text-black/30">→ буде додано</span></>
        : <><span className="mark font-bold">{value}</span> <span className="text-ink-dim">→</span> {label}</>}
    </p>
  )
}

function CaseCard({ c }) {
  const lines = [
    ...c.metrics,
    c.views ? { value: c.views, label: 'переглядів' } : { label: 'Перегляди', pending: true },
    ...c.extra,
  ]
  const Media = c.details?.url ? 'a' : 'div'
  return (
    <Reveal as="article" className="grid gap-6 rounded-[36px] bg-white p-5 text-ink sm:p-8 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-x-12">
      <div className="flex flex-wrap gap-x-3 gap-y-1 font-[family-name:var(--font-mono)] text-[14px] text-ink-dim sm:text-[15px] lg:col-span-2">
        {c.tags.map((t) => <span key={t}>{'{'} {t} {'}'}</span>)}
      </div>

      <Media {...(c.details?.url ? { href: c.details.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group relative block overflow-hidden rounded-[6px] bg-ink lg:row-span-2">
        {c.photo
          ? <img src={c.photo} alt={c.name} loading="lazy" className="aspect-[4/3] w-full object-cover object-[50%_30%] transition-transform duration-700 group-hover:scale-[1.03] lg:aspect-square" />
          : <div className="grid aspect-[4/3] place-items-center text-[14px] text-white/60 lg:aspect-square">Фото буде додано</div>}
        {c.details?.url && (
          <span data-pdf-hide className="absolute bottom-4 left-4 inline-flex items-center gap-6 rounded-full bg-ink py-2 pl-6 pr-2 font-[family-name:var(--font-mono)] text-[15px] text-white sm:bottom-6 sm:left-6">
            {c.details.label || 'Детальніше'}
            <span className="grid size-11 place-items-center rounded-full bg-white text-ink transition-transform group-hover:translate-x-1"><ArrowRight className="size-5" /></span>
          </span>
        )}
      </Media>

      <div className="flex flex-col gap-2 lg:self-end">
        <h3 className="h-display text-[clamp(34px,5vw,64px)]">{c.name}</h3>
        {c.subtitle
          ? <p className="text-[clamp(17px,1.8vw,21px)] font-medium">{c.subtitle}</p>
          : <p className="text-[16px] text-black/35">Опис кампанії буде додано</p>}
      </div>

      <div className="grid content-start gap-x-10 gap-y-4 border-t border-black/10 pt-6 sm:grid-cols-2">
        {lines.map((m, i) => <Metric key={i} {...m} />)}
      </div>
    </Reveal>
  )
}

export default function Cases() {
  return (
    <section id="cases" data-pdf className="gutter py-[clamp(40px,6vw,80px)]">
      <div className="wrap flex flex-col gap-8">
        <Reveal><SectionTitle kicker="Результати">НАШІ <span className="text-lemon">КЕЙСИ</span></SectionTitle></Reveal>
        <div className="grid gap-5">
          {cases.map((c) => <CaseCard key={c.id} c={c} />)}
        </div>
      </div>
    </section>
  )
}
