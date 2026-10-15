import { useEffect, useRef, useState } from 'react'
import { Mute, Volume } from './Icons.jsx'

/** Real short-form clip: lazy, muted autoplay only while visible, optional sound toggle. */
export default function Video({ src, poster, className = '', controls = false, label }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduce) el.play().catch(() => {})
      else el.pause()
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [src])
  return (
    <div className={`relative overflow-hidden bg-panel-2 ${className}`}>
      <video ref={ref} src={src} poster={poster} muted={muted} loop playsInline preload="metadata" aria-label={label}
        className="absolute inset-0 size-full object-cover" />
      {controls && (
        <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
          className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:text-lemon">
          {muted ? <Mute className="size-4" /> : <Volume className="size-4" />}
        </button>
      )}
    </div>
  )
}
