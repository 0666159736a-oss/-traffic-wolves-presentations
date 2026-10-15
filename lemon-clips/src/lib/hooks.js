import { useEffect, useRef, useState } from 'react'

/** True once the element has entered the viewport (stays true). */
export function useInView(options = { threshold: 0.25 }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (!('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, options)
    io.observe(el)
    return () => io.disconnect()
  }, [seen])
  return [ref, seen]
}

/** Counts from 0 to `target` once `run` turns true. Shows the final value with reduced motion. */
export function useCountUp(target, run, ms = 1600) {
  const [v, setV] = useState(target)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(target); return }
    let raf, start
    const tick = (t) => {
      start ??= t
      const p = Math.min(1, (t - start) / ms)
      setV(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    setV(0)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target])
  return v
}

/** A number that keeps climbing, for decorative "live" counters in illustrations. */
export function useTicker(start, perSecond) {
  const [v, setV] = useState(start)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setV((x) => x + perSecond * (0.4 + Math.random() * 1.2) / 4), 250)
    return () => clearInterval(id)
  }, [])
  return v
}

export const fmtCompact = (n) => {
  if (n == null) return '—'
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(/\.0$/, '') + 'K'
  return Math.round(n).toLocaleString('en-US')
}
