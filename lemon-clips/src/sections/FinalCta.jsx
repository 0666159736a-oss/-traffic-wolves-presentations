import { finalCta } from '../content/site.js'
import Actions from '../components/Actions.jsx'

export default function FinalCta() {
  return (
    <section className="gutter pt-[clamp(32px,6vw,72px)]">
      <div className="wrap relative overflow-hidden rounded-[32px] border border-lemon/40 px-5 py-12 text-center sm:px-10 sm:py-20"
        style={{ background: 'radial-gradient(70% 100% at 50% 0%, rgb(246 210 60 / .26), transparent 70%), var(--color-panel)' }}>
        <div className="pointer-events-none absolute -bottom-[45%] left-1/2 aspect-square w-[min(720px,140%)] -translate-x-1/2 rounded-full animate-spin-slow opacity-30" aria-hidden="true"
          style={{ background: 'repeating-radial-gradient(circle at 50% 50%, transparent 0 3px, rgb(246 210 60 / .25) 3px 4px)', maskImage: 'linear-gradient(transparent, #000 70%)' }} />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6">
          <span className="eyebrow">Let’s talk</span>
          <h2 className="display text-[clamp(40px,7vw,96px)]">
            {finalCta.title.map((l, i) => <span key={i} className={`block ${i === 1 ? 'text-lemon' : ''}`}>{l}</span>)}
          </h2>
          <p className="max-w-xl text-[clamp(17px,2vw,21px)] text-cream/85">{finalCta.subtitle}</p>
          <Actions className="w-full max-w-4xl" />
        </div>
      </div>
    </section>
  )
}
