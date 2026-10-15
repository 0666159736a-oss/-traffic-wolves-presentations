import { faq } from '../content/site.js'
import { useNav } from '../lib/nav.jsx'
import Accordion from '../components/Accordion.jsx'
import { Chat } from '../components/Icons.jsx'

export default function Faq() {
  const { open } = useNav()
  return (
    <section id="faq" className="gutter py-[clamp(48px,7vw,96px)] border-t border-hair">
      <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <div className="eyebrow">FAQ</div>
          <h2 className="display text-[clamp(36px,5.6vw,72px)]">QUESTIONS,<br /><span className="text-lemon">ANSWERED.</span></h2>
          <button type="button" className="btn btn-ghost w-fit" onClick={() => open('manager')}><Chat /> Ask a manager</button>
        </div>
        <Accordion items={faq} />
      </div>
    </section>
  )
}
