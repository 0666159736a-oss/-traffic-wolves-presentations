import { useEffect, useRef, useState } from 'react'

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const I = (d) => ({ className = 'size-5', ...p }) => <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} {...p}>{d}</svg>
export const ArrowRight = I(<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>)
export const ArrowUpRight = I(<><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>)
export const Download = I(<><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></>)
export const LinkIcon = I(<><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>)
export const Check = I(<path d="m5 12 5 5L20 7" />)
export const Menu = I(<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>)
export const X = I(<><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>)
export const Eye = I(<><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>)
export const Network = I(<><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M12 7.5v4M12 11.5 6.5 16M12 11.5l5.5 4.5" /></>)
export const Scale = I(<><path d="M4 20 20 4" /><path d="M10 4h10v10" /><path d="M4 14v6h6" /></>)
export const Search = I(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>)
export const Film = I(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" /></>)
export const Share = I(<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></>)
export const Chart = I(<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>)
export const Bolt = I(<path d="M13 2 4 14h7l-1 8 9-12h-7z" />)
export const Minus = I(<path d="M5 12h14" />)
export const Plus = I(<><path d="M12 5v14" /><path d="M5 12h14" /></>)
export const Photo = I(<><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-8 8" /></>)

/** Lemon Clips mark: lemon body with a play triangle, as on the platform. */
export function LogoMark({ className = 'size-8 sm:size-9' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <ellipse cx="20" cy="20" rx="17" ry="13" transform="rotate(-35 20 20)" fill="#f6d23c" />
      <ellipse cx="20" cy="20" rx="11" ry="7.5" transform="rotate(-35 20 20)" fill="none" stroke="#0a0a0a" strokeWidth="2.2" />
      <path d="M17 15.5v9l7.5-4.5z" fill="#0a0a0a" />
      <circle cx="34" cy="6.5" r="3" fill="#f6d23c" />
    </svg>
  )
}

/** Wordmark as on lemonclips.com: LEMON + CLIPS in yellow. On white surfaces CLIPS uses the deeper yellow for contrast. */
export function Logo({ dark = true }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className="text-[17px] font-black leading-none tracking-[-.02em] sm:text-[19px]" style={{ fontFamily: 'var(--font-wordmark)', fontStretch: '112%' }}>
        <span className={dark ? 'text-ink' : 'text-white'}>LEMON</span><span className={dark ? 'text-lemon-deep' : 'text-lemon'}>CLIPS</span>
      </span>
    </span>
  )
}

/** Fades nothing out: content is visible at rest and slides up when it enters the viewport. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [inView, setIn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIn(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} style={{ animationDelay: `${delay}ms` }} {...rest}>{children}</Tag>
}

export function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

export function SectionTitle({ kicker, children, light = false }) {
  return (
    <div className="flex flex-col gap-3">
      {kicker && <span className={`eyebrow ${light ? '!text-ink-dim' : ''}`}>{kicker}</span>}
      <h2 className={`h-display text-[clamp(34px,6vw,76px)] ${light ? 'text-ink' : ''}`}>{children}</h2>
    </div>
  )
}
