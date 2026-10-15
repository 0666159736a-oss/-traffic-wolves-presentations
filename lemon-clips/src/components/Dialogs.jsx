import { useEffect, useState } from 'react'
import { config } from '../content/site.js'
import { calendarEmbedUrl, managerChannels, requestCallback, requestPresentation, submitSessionContact } from '../lib/integrations.js'
import Modal from './Modal.jsx'
import ContactFields, { contactPayload } from './ContactFields.jsx'
import { Consent, NotSent, useContactForm } from './LeadForm.jsx'
import { ArrowRight, ArrowUpRight, Calendar, Chat, Check, Copy, FileText, Mail, Send } from './Icons.jsx'

const Head = ({ eyebrow, title, text }) => (
  <div className="flex flex-col gap-2 pr-10">
    <div className="eyebrow">{eyebrow}</div>
    <h3 className="display text-[clamp(28px,4vw,36px)]">{title}</h3>
    {text && <p className="leading-relaxed text-muted">{text}</p>}
  </div>
)

const Done = ({ title, text, children }) => (
  <div className="flex flex-col items-start gap-4 animate-rise">
    <span className="grid size-12 place-items-center rounded-full bg-lemon text-[#14120a]"><Check className="size-6" /></span>
    <h3 className="display text-[clamp(28px,4vw,34px)]">{title}</h3>
    <p className="text-muted">{text}</p>
    {children}
  </div>
)

/** The same contact form in every dialog. */
function ContactForm({ prefix, f, extra, button, icon: Icon }) {
  return (
    <form noValidate onSubmit={f.submit(prefix, extra)} className="flex flex-col gap-5">
      <ContactFields prefix={prefix} v={f.v} set={f.set} errors={f.errors} />
      <Consent id={`${prefix}-consent`} checked={f.v.consent} onChange={f.set('consent')} error={f.errors.consent} />
      {f.errors.form && <p className="text-[14px] text-bad" role="alert">{f.errors.form}</p>}
      {f.state === 'not-connected' && <NotSent onBack={() => f.setState('idle')} />}
      <button type="submit" className="btn btn-primary !whitespace-normal" disabled={f.state === 'sending'}>{Icon && <Icon />} {f.state === 'sending' ? 'Sending…' : button}</button>
    </form>
  )
}

/** GET A FREE PRESENTATION */
function PresentationDialog() {
  const f = useContactForm(requestPresentation)
  if (f.state === 'sent') {
    return <Done title="Presentation requested." text={<>We’ll email the Lemon Clips presentation to <span className="text-cream">{f.v.email}</span>. A manager may also follow up by phone or WhatsApp.</>} />
  }
  return (
    <div className="flex flex-col gap-5">
      <Head eyebrow="Free presentation" title="Get the Lemon Clips presentation" text="Services, how campaigns work and real results, sent to your email." />
      <ContactForm prefix="p" f={f} button="Send me the presentation" icon={FileText} />
    </div>
  )
}

/** CONTACT A MANAGER — real company channels (when configured) + callback form. */
const CHANNEL_ICON = { whatsapp: Chat, telegram: Send, email: Mail }

function ManagerDialog() {
  const channels = managerChannels()
  const [copied, setCopied] = useState('')
  const f = useContactForm(requestCallback)
  const copy = async (c) => { try { await navigator.clipboard.writeText(c.value); setCopied(c.id) } catch { /* value is selectable */ } }

  return (
    <div className="flex flex-col gap-5">
      <Head eyebrow="Talk to a person" title="Contact a manager" text="Leave your contacts and a manager will reach out by phone, WhatsApp or email." />
      {channels.length > 0 && (
        <ul className="flex flex-col gap-2">
          {channels.map((c) => {
            const Icon = CHANNEL_ICON[c.id]
            return (
              <li key={c.id} className="flex items-center gap-3 rounded-2xl border border-line bg-ink/50 p-2.5 pl-3.5">
                <Icon className="size-5 shrink-0 text-lemon" />
                <div className="min-w-0 flex-1"><div className="text-[12px] font-mono uppercase tracking-wider text-muted">{c.label}</div><div className="truncate font-semibold select-all">{c.value}</div></div>
                <button type="button" onClick={() => copy(c)} className="grid size-10 place-items-center rounded-full border border-hair hover:border-lemon" aria-label={`Copy ${c.label}`}>{copied === c.id ? <Check className="size-4 text-lemon" /> : <Copy className="size-4" />}</button>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-[40px] !px-4">Open</a>
              </li>
            )
          })}
          <li className="pt-1 text-center font-mono text-[11.5px] uppercase tracking-wider text-muted">or request a call back</li>
        </ul>
      )}
      {f.state === 'sent'
        ? <Done title="Request received." text={<>A manager will contact you at <span className="text-cream">{contactPayload(f.v).phone}</span> or {f.v.email}.</>} />
        : <ContactForm prefix="m" f={f} button="Request a call back" icon={Chat} />}
    </div>
  )
}

/** BOOK A PERSONAL STRATEGY SESSION — contacts first (phone required), then the real Calendly / Cal.com scheduler. */
function SessionDialog() {
  const f = useContactForm(submitSessionContact)
  const [step, setStep] = useState(1)
  // Move to the calendar once the contact step validated (sent, or not-connected in preview).
  useEffect(() => { if (f.state === 'sent' || f.state === 'not-connected') setStep(2) }, [f.state])
  const contact = contactPayload(f.v)
  const embed = calendarEmbedUrl(contact)

  if (step === 1) {
    return (
      <div className="flex flex-col gap-5">
        <Head eyebrow="Step 1 of 2 · Your details" title="Book a strategy session" text="30 minutes with a Lemon Clips strategist. Add your contacts, then pick a free time in the calendar." />
        <form noValidate onSubmit={f.submit('s', { form: 'session' })} className="flex flex-col gap-5">
          <ContactFields prefix="s" v={f.v} set={f.set} errors={f.errors} />
          <Consent id="s-consent" checked={f.v.consent} onChange={f.set('consent')} error={f.errors.consent} />
          {f.errors.form && <p className="text-[14px] text-bad" role="alert">{f.errors.form}</p>}
          <button type="submit" className="btn btn-primary" disabled={f.state === 'sending'}><Calendar /> {f.state === 'sending' ? 'Saving…' : 'Choose a time'} <ArrowRight /></button>
        </form>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4">
      <Head eyebrow="Step 2 of 2 · Pick a time" title="Choose a day and time" />
      {f.state === 'not-connected' && <NotSent onBack={() => { f.setState('idle'); setStep(1) }} />}
      {embed ? (
        <>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink">
            <iframe src={embed} title="Book a strategy session" className="block h-[min(680px,68vh)] w-full" loading="lazy" />
          </div>
          <a href={embed} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Open the calendar in a new tab <ArrowUpRight /></a>
        </>
      ) : (
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-ink/50 p-5">
          <span className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-warn">Calendar not connected</span>
          <p className="text-[15px] leading-relaxed">Live booking with real free slots appears here once the Calendly or Cal.com link is added. No times are shown until then.</p>
        </div>
      )}
      <button type="button" className="text-left text-[14px] text-muted underline underline-offset-4 hover:text-cream" onClick={() => { f.setState('idle'); setStep(1) }}>Edit my details</button>
    </div>
  )
}

const DIALOGS = { presentation: [PresentationDialog, 'Get a free presentation'], manager: [ManagerDialog, 'Contact a manager'], session: [SessionDialog, 'Book a strategy session'] }

export default function Dialogs({ which, onClose }) {
  const entry = DIALOGS[which]
  const [Body, label] = entry || [null, '']
  return (
    <Modal open={!!entry} onClose={onClose} label={label} wide={which === 'session' && !!config.calendarUrl}>
      {Body && <div className="p-6 sm:p-8"><Body key={which} /></div>}
    </Modal>
  )
}
