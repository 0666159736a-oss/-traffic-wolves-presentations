import LeadForm from '../components/LeadForm.jsx'

/** Short lead form. Rendered twice on the homepage (after the hero and at the end) with the same fields and endpoint. */
export default function QuickForm({ id, idPrefix, title = ['GET YOUR PERSONAL', 'PROMOTION PLAN.'], text = 'Five quick answers. We reply with a proposal for your music.' }) {
  return (
    <section id={id} className="gutter py-[clamp(28px,5vw,56px)]">
      <div className="wrap rounded-[28px] border border-line p-5 sm:p-8 lg:p-10" style={{ background: 'radial-gradient(60% 120% at 100% 0%, rgb(246 210 60 / .12), transparent 60%), var(--color-panel)' }}>
        <div className="mb-6 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display text-[clamp(28px,4vw,48px)]">{title[0]} <span className="text-lemon">{title[1]}</span></h2>
          <p className="text-muted max-w-sm">{text}</p>
        </div>
        <LeadForm idPrefix={idPrefix} />
      </div>
    </section>
  )
}
