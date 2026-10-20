import Header from './Header.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Services from './sections/Services.jsx'
import Process from './sections/Process.jsx'
import Cases from './sections/Cases.jsx'
import Pricing from './sections/Pricing.jsx'

export default function OfferApp() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Cases />
        <Pricing />
      </main>
      <footer className="gutter pb-10 pt-4" style={{ paddingBottom: 'max(40px, env(safe-area-inset-bottom, 0px))' }}>
        <p className="wrap text-[13px] text-dim">© {new Date().getFullYear()} Lemon Clips. Комерційна пропозиція.</p>
      </footer>
    </>
  )
}
