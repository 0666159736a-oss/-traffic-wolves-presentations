import { faq } from '../content/site.js'
import { useNav } from '../lib/nav.jsx'
import Accordion from '../components/Accordion.jsx'
import { ArrowRight } from '../components/Icons.jsx'

export default function Faq() {
  const { openBooking } = useNav()
  return (
    <section id="faq" className="gutter py-[clamp(72px,10vw,130px)] border-t border-hair">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <div className="eyebrow">FAQ</div>
          <h2 className="display text-[clamp(40px,6vw,76px)]">QUESTIONS,<br /><span className="text-lemon">ANSWERED.</span></h2>
          <p className="text-muted max-w-sm">Still unsure which model fits your release? Talk it through with our team.</p>
          <button type="button" className="btn btn-ghost w-fit" onClick={() => openBooking()}>Book a call <ArrowRight /></button>
        </div>
        <Accordion items={faq} />
      </div>
    </section>
  )
}
