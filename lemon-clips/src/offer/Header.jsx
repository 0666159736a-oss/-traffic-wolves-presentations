import { useEffect, useState } from 'react'
import { nav } from './content.js'
import { Download, LinkIcon, Logo, Menu, X } from './ui.jsx'

export default function Header({ onCopy, onPdf, pdfBusy }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    nav.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  const go = (id) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <header data-pdf-hide className="gutter fixed inset-x-0 z-50" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}>
      <div className="wrap">
        <div className="flex h-16 items-center justify-between gap-2 rounded-full bg-white pl-3.5 pr-2 shadow-[0_10px_40px_-12px_rgb(0_0_0/.6)] sm:pl-5">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} aria-label="Lemon Clips — на початок" className="shrink-0"><Logo /></a>
          <nav aria-label="Розділи" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <button key={n.id} type="button" onClick={() => go(n.id)}
                className={`rounded-full px-3.5 py-2 text-[14px] font-bold transition-colors ${active === n.id ? 'bg-ink text-lemon' : 'text-ink hover:bg-black/5'}`}>{n.label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={onCopy} className="hidden size-11 place-items-center rounded-full border border-black/10 text-ink hover:bg-black/5 sm:grid" aria-label="Копіювати посилання" title="Копіювати посилання"><LinkIcon /></button>
            <button type="button" onClick={onPdf} disabled={pdfBusy} className="btn btn-lemon !min-h-[48px] !px-4 sm:!px-5" aria-label="Завантажити PDF">
              <Download className="size-[18px]" /><span className="hidden sm:inline">{pdfBusy ? 'Готуємо…' : 'PDF'}</span>
            </button>
            <button type="button" onClick={() => setOpen((o) => !o)} className="grid size-11 place-items-center rounded-full bg-ink text-white lg:hidden" aria-expanded={open} aria-label={open ? 'Закрити меню' : 'Меню'}>{open ? <X /> : <Menu />}</button>
          </div>
        </div>
        {open && (
          <nav aria-label="Мобільне меню" className="mt-2 flex flex-col overflow-hidden rounded-[28px] bg-white p-2 shadow-2xl lg:hidden">
            {nav.map((n) => (
              <button key={n.id} type="button" onClick={() => go(n.id)} className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[17px] font-bold text-ink hover:bg-black/5">
                {n.label}<span className="size-2 rounded-full bg-lemon" />
              </button>
            ))}
            <button type="button" onClick={() => { setOpen(false); onCopy() }} className="mt-1 flex items-center gap-3 rounded-2xl bg-black/[.04] px-4 py-3.5 text-left text-[16px] font-bold text-ink">
              <LinkIcon /> Копіювати посилання
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
