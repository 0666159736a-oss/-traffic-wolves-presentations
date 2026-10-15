import { useCountUp, useInView } from '../lib/hooks.js'
import { Lemon, LemonSlice } from './Lemon.jsx'

/** Animated 1,000,000 counter with brand lemons. */
export function MillionCounter({ className = '', size = 'text-[clamp(44px,7vw,96px)]' }) {
  const [ref, seen] = useInView({ threshold: 0.4 })
  const v = useCountUp(1000000, seen)
  return (
    <span ref={ref} className={`relative inline-flex items-center ${className}`}>
      <span className={`display tnum text-lemon ${size}`} style={{ textShadow: '0 0 40px rgb(246 210 60 / .35)' }}>{v.toLocaleString('en-US')}</span>
    </span>
  )
}

/** Compact hero badge. */
export function GuaranteeBadge() {
  return (
    <div className="relative flex w-full max-w-[36rem] items-center gap-4 overflow-hidden rounded-[22px] border border-lemon/50 px-4 py-3.5 sm:px-5"
      style={{ background: 'linear-gradient(100deg, rgb(246 210 60 / .16), rgb(246 210 60 / .03) 60%), var(--color-panel)' }}>
      <Lemon className="size-12 shrink-0 sm:size-14" anim="sway" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <MillionCounter size="text-[clamp(30px,4.2vw,44px)]" />
          <span className="text-[13px] font-black uppercase tracking-[.12em] text-cream">Guaranteed views</span>
        </div>
        <p className="text-[13.5px] text-muted">Available with select promotion packages.</p>
      </div>
      <LemonSlice className="pointer-events-none absolute -right-6 -top-6 size-20 opacity-15" />
    </div>
  )
}
