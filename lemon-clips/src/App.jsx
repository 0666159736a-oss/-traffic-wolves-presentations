import { useCallback, useEffect, useMemo, useState } from 'react'
import { NavContext, scrollToId, setHash } from './lib/nav.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import BookCall from './components/BookCall.jsx'
import Home from './pages/Home.jsx'
import Clippers from './pages/Clippers.jsx'

const pageFor = (token) => (token.startsWith('clippers') ? 'clippers' : 'home')
const readHash = () => { try { return decodeURIComponent(location.hash.slice(1)) } catch { return '' } }
const TITLES = { home: 'Lemon Clips — Make Your Music Go Viral', clippers: 'For Clippers — Lemon Clips' }

export default function App() {
  const [page, setPage] = useState(() => pageFor(readHash()))
  const [pending, setPending] = useState(() => ({ id: readHash(), n: 0 }))
  const [booking, setBooking] = useState({ open: false, prefill: null })
  const [preset, setPreset] = useState('')

  // Scroll to a pending target once the right page has rendered.
  useEffect(() => {
    const id = pending.id
    if (!id || id === 'clippers') { if (pending.n) window.scrollTo({ top: 0 }); return }
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    requestAnimationFrame(() => scrollToId(id))
  }, [pending, page])

  useEffect(() => { document.title = TITLES[page] }, [page])

  useEffect(() => {
    const onPop = () => { const t = readHash(); setPage(pageFor(t)); setPending((p) => ({ id: t, n: p.n + 1 })) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const openBooking = useCallback((prefill = null) => setBooking({ open: true, prefill }), [])

  const go = useCallback((to) => {
    if (to === 'book') return openBooking()
    const target = pageFor(to)
    if (target !== page) {
      try { history.pushState(null, '', to === 'top' ? location.pathname + location.search : '#' + to) } catch { /* sandboxed */ }
      setPage(target)
    } else {
      setHash(to === 'top' ? '' : to)
    }
    setPending((p) => ({ id: to, n: p.n + 1 }))
  }, [page, openBooking])

  const ctx = useMemo(() => ({ page, go, openBooking, preset, choosePreset: setPreset }), [page, go, openBooking, preset])

  return (
    <NavContext.Provider value={ctx}>
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-lemon focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        {page === 'clippers' ? <Clippers key="clippers" /> : <Home key="home" />}
      </main>
      <Footer />
      <BookCall open={booking.open} prefill={booking.prefill} onClose={() => setBooking({ open: false, prefill: null })} />
    </NavContext.Provider>
  )
}
