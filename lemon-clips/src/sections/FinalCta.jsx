import Actions from '../components/Actions.jsx'
import { MillionCounter } from '../components/Guarantee.jsx'
import { Lemon, LemonSlice } from '../components/Lemon.jsx'

export default function FinalCta() {
  return (
    <section className="gutter pt-[clamp(32px,6vw,72px)]">
      <div className="wrap relative overflow-hidden rounded-[32px] border border-lemon/40 px-5 py-12 text-center sm:px-10 sm:py-16"
        style={{ background: 'radial-gradient(70% 100% at 50% 0%, rgb(246 210 60 / .26), transparent 70%), var(--color-panel)' }}>
        <LemonSlice className="pointer-events-none absolute -left-10 -top-10 size-36 opacity-20 sm:size-48" />
        <LemonSlice className="pointer-events-none absolute -bottom-12 -right-10 size-40 opacity-15 sm:size-56" style={{ animationDirection: 'reverse' }} />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-5">
          <Lemon className="size-12 sm:hidden" anim="bob" />
          <span className="eyebrow">Ready to grow your music?</span>
          <h2 className="display text-[clamp(30px,5.2vw,64px)]">YOUR MUSIC. OUR NETWORK.</h2>
          <div className="flex items-center gap-2 sm:gap-4">
            <Lemon className="hidden size-20 sm:block" anim="bob" />
            <MillionCounter size="text-[clamp(52px,11vw,140px)]" />
            <Lemon className="hidden size-20 sm:block" anim="bob" style={{ animationDelay: '-3s', scale: '-1 1' }} />
          </div>
          <h3 className="display -mt-2 text-[clamp(22px,3.4vw,40px)] text-lemon">GUARANTEED VIEWS.</h3>
          <p className="max-w-xl text-[15px] text-muted">Eligible campaigns only. Scope, timeframe and guarantee conditions are agreed before launch.</p>
          <p className="max-w-xl text-[clamp(17px,2vw,20px)] text-cream/85">Let’s build the right promotion strategy for your next release.</p>
          <Actions className="mt-2 w-full max-w-4xl" />
        </div>
      </div>
    </section>
  )
}
