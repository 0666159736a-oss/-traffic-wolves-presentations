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

/** Counts from 0 to `target` once `run` turns true. Final value immediately with reduced motion. */
export function useCountUp(target, run, ms = 1800) {
  const [v, setV] = useState(target)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(target); return }
    let raf, start
    const tick = (t) => {
      start ??= t
      const p = Math.min(1, (t - start) / ms)
      setV(Math.round(target * (1 - Math.pow(1 - p, 4))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    setV(0)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target])
  return v
}
