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
