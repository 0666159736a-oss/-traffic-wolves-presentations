import { finalCta } from '../content/site.js'
import { useNav } from '../lib/nav.jsx'
import { VideoArt } from '../components/PhoneCard.jsx'
import { ArrowRight, Calendar } from '../components/Icons.jsx'

const ROW = [48, 330, 200, 20, 140, 270, 48, 330, 200, 20]

export default function FinalCta() {
  const { go, openBooking } = useNav()
  return (
    <section className="gutter py-[clamp(48px,8vw,100px)]">
      <div style={{ background: 'radial-gradient(70% 90% at 50% 0%, rgb(246 210 60 / .26), transparent 70%), var(--color-panel)' }} className="wrap relative overflow-hidden rounded-[36px] border border-lemon/40 px-5 py-16 sm:px-10 sm:py-24 text-center">
        {/* moving film strip of clips */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] overflow-hidden opacity-40 [mask-image:linear-gradient(transparent,#000_60%)]" aria-hidden="true">
          <div className="flex w-max animate-marquee gap-4" style={{ animationDuration: '50s' }}>
            {[...ROW, ...ROW].map((h, i) => (
              <div key={i} className="phone w-[110px] sm:w-[140px]" style={{ rotate: `${(i % 3 - 1) * 4}deg` }}>
                <div className="phone-screen"><VideoArt hue={h} variant={['figure', 'lyrics', 'eq'][i % 3]} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-7 pb-28 sm:pb-40">
          <span className="eyebrow">Ready when your release is</span>
          <h2 className="display text-[clamp(38px,6.4vw,88px)]">
            {finalCta.title.map((l, i) => <span key={i} className={`block ${i === 2 ? 'text-lemon' : ''}`}>{l}</span>)}
          </h2>
          <p className="max-w-xl text-[clamp(17px,2vw,21px)] text-cream/85">{finalCta.subtitle}</p>
          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <button type="button" className="btn btn-primary !min-h-[58px] !px-8" onClick={() => go('apply')}>Launch your campaign <ArrowRight /></button>
            <button type="button" className="btn btn-ghost !min-h-[58px] !px-8 bg-ink/50 backdrop-blur" onClick={() => openBooking()}><Calendar /> Book a call</button>
          </div>
        </div>
      </div>
    </section>
  )
}
