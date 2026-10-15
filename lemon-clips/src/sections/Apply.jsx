import LeadForm from '../components/LeadForm.jsx'
import { Check } from '../components/Icons.jsx'

const NEXT = ['We review your track and goals', 'You get a campaign plan and quote', 'Creators start posting once you approve']

export default function Apply() {
  return (
    <section id="apply" className="gutter pb-[clamp(72px,10vw,130px)] pt-[clamp(24px,4vw,40px)]">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <div className="eyebrow">Campaign request</div>
          <h2 className="display text-[clamp(40px,6vw,76px)]">LET’S GROW<br /><span className="text-lemon">YOUR MUSIC.</span></h2>
          <p className="text-muted text-[17px] leading-relaxed max-w-md">Tell us about you and the release. It takes two short steps.</p>
          <ol className="flex flex-col gap-3">
            {NEXT.map((n, i) => (
              <li key={n} className="flex items-center gap-3 text-[15.5px]">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line font-mono text-[12px] text-lemon">{i + 1}</span>{n}
              </li>
            ))}
          </ol>
          <p className="flex items-center gap-2 text-[13.5px] text-muted"><Check className="size-4 text-lemon" /> Your details are only used to reply about your campaign.</p>
        </div>
        <div className="rounded-[30px] border border-line bg-panel shadow-[0_40px_120px_-50px_rgb(246_210_60/.35)] min-w-0">
          <LeadForm />
        </div>
      </div>
    </section>
  )
}
