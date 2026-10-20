import { useState } from 'react'
import Header from './Header.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Services from './sections/Services.jsx'
import Process from './sections/Process.jsx'
import Cases from './sections/Cases.jsx'
import Pricing from './sections/Pricing.jsx'
import { copyLink, downloadPdf } from './share.js'
import { Check, Download, LinkIcon, Logo } from './ui.jsx'

export default function OfferApp() {
  const [toast, setToast] = useState(null)
  const [busy, setBusy] = useState(false)
  const say = (msg, extra) => { setToast({ msg, extra }); setTimeout(() => setToast(null), extra ? 6000 : 2600) }

  const onCopy = async () => {
    const r = await copyLink()
    r.ok ? say('Посилання скопійовано') : say('Скопіюйте посилання вручну:', r.url)
  }
  const onPdf = async () => {
    if (busy) return
    setBusy(true)
    const r = await downloadPdf()
    setBusy(false)
    say(r.ok ? 'PDF завантажено' : 'Не вдалося створити PDF. Спробуйте ще раз.')
  }

  return (
    <>
      <Header onCopy={onCopy} onPdf={onPdf} pdfBusy={busy} />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Cases />
        <Pricing />
      </main>
      <footer data-pdf-hide className="gutter pb-10 pt-6" style={{ paddingBottom: 'max(40px, env(safe-area-inset-bottom, 0px))' }}>
        <div className="wrap flex flex-col items-start justify-between gap-6 rounded-[32px] bg-white p-6 text-ink sm:flex-row sm:items-center sm:p-8">
          <Logo />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onCopy} className="btn !min-h-[48px] border border-black/15 hover:bg-black/5"><LinkIcon className="size-[18px]" /> Копіювати посилання</button>
            <button type="button" onClick={onPdf} disabled={busy} className="btn btn-lemon !min-h-[48px]"><Download className="size-[18px]" /> {busy ? 'Готуємо PDF…' : 'Завантажити PDF'}</button>
          </div>
        </div>
        <p className="wrap mt-5 text-[13px] text-dim">© {new Date().getFullYear()} Lemon Clips. Комерційна пропозиція.</p>
      </footer>
      {toast && (
        <div role="status" className="fixed left-1/2 z-[60] -translate-x-1/2 rounded-2xl bg-white px-4 py-3 text-[14px] font-bold text-ink shadow-2xl" style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)', maxWidth: 'calc(100vw - 32px)' }}>
          <span className="flex items-center gap-2"><Check className="size-4 text-lemon-deep" />{toast.msg}</span>
          {toast.extra && <span className="mt-1 block break-all font-medium select-all">{toast.extra}</span>}
        </div>
      )}
    </>
  )
}
