import { hero, heroPhoto, price } from '../content.js'
import { ArrowRight, Photo } from '../ui.jsx'

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section id="top" data-pdf className="relative isolate overflow-hidden">
      {/* Real lemon photography, darkened for legibility */}
      <div className="absolute inset-0 -z-10">
        {heroPhoto
          ? <img src={heroPhoto} alt="" fetchpriority="high" className="size-full object-cover animate-[kenburns_14s_ease-out_both]" />
          : <div className="size-full" style={{ background: 'radial-gradient(60% 70% at 78% 30%, rgb(255 214 10 / .55), transparent 60%), radial-gradient(40% 50% at 95% 90%, rgb(242 183 5 / .4), transparent 70%), radial-gradient(50% 60% at 10% 100%, rgb(255 214 10 / .18), transparent 70%), #0a0a0a' }} />}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      {!heroPhoto && (
        <div data-pdf-hide className="absolute bottom-6 right-4 hidden items-center gap-2 rounded-full border border-dashed border-white/40 bg-black/50 px-3 py-1.5 text-[12px] text-white/80 backdrop-blur sm:flex">
          <Photo className="size-4" /> Тут буде фото лимонів з lemonclips.com
        </div>
      )}

      <div className="gutter">
        <div className="wrap flex min-h-[min(860px,100svh)] flex-col justify-center gap-7 pb-16 pt-32 sm:pt-36">
          <h1 className="h-display max-w-5xl text-[clamp(40px,7.6vw,104px)] text-white">
            <span className="block">{hero.title[0]}</span>
            <span className="block text-lemon">{hero.title[1]}</span>
          </h1>
          <p className="max-w-xl text-[clamp(17px,1.8vw,21px)] font-medium leading-relaxed text-white/85">{hero.subtitle}</p>

          <div className="flex w-fit max-w-full flex-col gap-1 rounded-[28px] bg-lemon px-6 py-5 text-ink shadow-[0_30px_80px_-30px_rgb(255_214_10/.7)] sm:px-8">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="h-display tnum text-[clamp(52px,8vw,96px)] !leading-none">${price.perThousand.toFixed(2)}</span>
              <span className="text-[clamp(16px,1.8vw,22px)] font-extrabold">за 1 000 переглядів</span>
            </div>
            <span className="text-[14.5px] font-semibold text-ink/75">{hero.min}</span>
          </div>

          <div data-pdf-hide className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => go('pricing')} className="btn btn-white">Розрахувати вартість <span className="arrow"><ArrowRight className="size-4" /></span></button>
            <button type="button" onClick={() => go('cases')} className="btn btn-line">Наші кейси</button>
          </div>
        </div>
      </div>
    </section>
  )
}
