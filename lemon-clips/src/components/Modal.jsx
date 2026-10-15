import { useEffect, useRef } from 'react'
import { X } from './Icons.jsx'

export default function Modal({ open, onClose, label, children, wide = false }) {
  const panel = useRef(null)
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panel.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus?.()
    }
  }, [open])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center gutter" style={{ paddingTop: 'max(16px, env(safe-area-inset-top, 0px))', paddingBottom: 'max(16px, env(safe-area-inset-bottom, 0px))' }} role="dialog" aria-modal="true" aria-label={label}>
      <button type="button" className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-default" aria-label="Close" onClick={onClose} />
      <div ref={panel} tabIndex={-1} className={`relative w-full ${wide ? 'max-w-4xl' : 'max-w-lg'} max-h-full overflow-y-auto rounded-[28px] border border-line bg-panel shadow-[0_40px_120px_-30px_#000] animate-rise outline-none`}>
        <button type="button" onClick={onClose} className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-black/50 text-cream hover:text-lemon border border-hair" aria-label="Close dialog">
          <X />
        </button>
        {children}
      </div>
    </div>
  )
}
