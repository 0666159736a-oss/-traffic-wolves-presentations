import { useEffect, useState } from 'react'
import { nav as allNav } from '../content/site.js'
import { cases } from '../content/cases.js'

const nav = allNav.filter((n) => n.needs !== 'cases' || cases.length)
import { useNav } from '../lib/nav.jsx'
import { Logo, Menu, X, ArrowRight } from './Icons.jsx'

const SPY = ['get-started', 'results', 'how', 'why', 'services', 'feedback', 'faq', 'apply']

export default function Nav() {
  const { page, go } = useNav()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (page !== 'home' || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    SPY.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    const onTop = () => { if (window.scrollY < 300) setActive('top') }
    window.addEventListener('scroll', onTop, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onTop) }
  }, [page])

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  const current = page === 'clippers' ? 'clippers' : active === 'why' ? 'how' : active
  const click = (to) => { setOpen(false); go(to) }

  return (
    <header className={`sticky z-50 transition-colors duration-300 ${scrolled || open ? 'bg-ink/85 backdrop-blur-xl border-b border-hair' : 'border-b border-transparent'}`} style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <div className="gutter">
        <div className="wrap flex h-[72px] items-center justify-between gap-4">
          <button type="button" onClick={() => click('top')} aria-label="Lemon Clips home" className="rounded-lg"><Logo /></button>
          <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <button key={n.to} type="button" onClick={() => click(n.to)}
                className={`relative rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${current === n.to ? 'text-lemon' : 'text-cream/75 hover:text-cream'} ${n.to === 'clippers' ? 'border border-hair' : ''}`}
                aria-current={current === n.to ? 'page' : undefined}>
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => click('get-started')} className="btn btn-primary hidden sm:inline-flex !min-h-[42px] !px-5 !text-[12.5px]">Get Started</button>
            <button type="button" onClick={() => setOpen((o) => !o)} className="lg:hidden grid size-11 place-items-center rounded-full border border-hair" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="lg:hidden fixed inset-x-0 bottom-0 top-[calc(72px+env(safe-area-inset-top,0px))] bg-ink/97 backdrop-blur-xl gutter overflow-y-auto" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom, 0px))' }}>
          <nav aria-label="Mobile" className="wrap flex flex-col pt-4">
            {nav.map((n, i) => (
              <button key={n.to} type="button" onClick={() => click(n.to)}
                className={`flex items-center justify-between border-b border-hair py-4 text-left display text-[30px] animate-rise ${current === n.to ? 'text-lemon' : ''}`}
                style={{ animationDelay: `${i * 40}ms` }}>
                {n.label}<ArrowRight className="size-5 text-muted" />
              </button>
            ))}
            <button type="button" onClick={() => click('get-started')} className="btn btn-primary mt-8 w-full">Get Started</button>
          </nav>
        </div>
      )}
    </header>
  )
}
