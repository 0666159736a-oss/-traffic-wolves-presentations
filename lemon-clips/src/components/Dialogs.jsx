import { useState } from 'react'
import { config, formOptions } from '../content/site.js'
import { calendarEmbedUrl, managerChannels, requestPresentation } from '../lib/integrations.js'
import { useNav } from '../lib/nav.jsx'
import Modal from './Modal.jsx'
import { Choice, EMAIL_RE, Field } from './Form.jsx'
import { Consent, NotConnected } from './LeadForm.jsx'
import { ArrowUpRight, Calendar, Chat, Check, Copy, FileText, Mail, Send } from './Icons.jsx'

const Head = ({ eyebrow, title, text }) => (
  <div className="flex flex-col gap-2 pr-10">
    <div className="eyebrow">{eyebrow}</div>
    <h3 className="display text-[clamp(28px,4vw,36px)]">{title}</h3>
    {text && <p className="text-muted leading-relaxed">{text}</p>}
  </div>
)

function PresentationDialog() {
  const [v, setV] = useState({ name: '', email: '', role: '', consent: false })
  const [err, setErr] = useState({})
  const [state, setState] = useState('idle')
  const set = (k) => (val) => { setV((x) => ({ ...x, [k]: val?.target ? val.target.value : val })); setErr((e) => ({ ...e, [k]: undefined })) }

  const submit = async (e) => {
    e.preventDefault()
    const x = {}
    if (v.name.trim().length < 2) x['p-name'] = 'Enter your name.'
    if (!EMAIL_RE.test(v.email.trim())) x['p-email'] = 'Enter the email where we should send the presentation.'
    if (!v.role) x['p-role'] = 'Choose one.'
    if (!v.consent) x['p-consent'] = 'Please confirm so we can email you.'
    setErr(x)
    if (Object.keys(x).length) return document.getElementById(Object.keys(x)[0])?.focus()
    setState('sending')
    const r = await requestPresentation({ name: v.name, email: v.email, role: v.role, consent: true })
    if (r.status === 'error') { setErr({ form: r.error }); setState('idle'); return }
    setState(r.status)
  }

  if (state === 'not-connected') return <NotConnected what="presentation request" onBack={() => setState('idle')} />
  if (state === 'sent') {
    return (
      <div className="flex flex-col items-start gap-4">
        <span className="grid size-12 place-items-center rounded-full bg-lemon text-[#14120a]"><Check className="size-6" /></span>
        <h3 className="display text-[32px]">Request received.</h3>
        <p className="text-muted">We’ll send the Lemon Clips presentation to <span className="text-cream">{v.email}</span>. Check your inbox and spam folder.</p>
      </div>
    )
  }
  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-5">
      <Head eyebrow="Free presentation" title="Get the Lemon Clips presentation" text="Our services, how campaigns work and what to expect. Sent to your email." />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="p-name" label="Name" error={err['p-name']}><input id="p-name" className="field" autoComplete="name" value={v.name} onChange={set('name')} aria-invalid={!!err['p-name']} /></Field>
        <Field id="p-email" label="Email" error={err['p-email']}><input id="p-email" type="email" className="field" autoComplete="email" value={v.email} onChange={set('email')} aria-invalid={!!err['p-email']} /></Field>
      </div>
      <Field id="p-role" label="I am" error={err['p-role']}><Choice id="p-role" options={formOptions.roles} value={v.role} onChange={set('role')} error={err['p-role']} /></Field>
      <Consent id="p-consent" checked={v.consent} onChange={set('consent')} error={err['p-consent']} />
      {err.form && <p className="text-[14px] text-bad" role="alert">{err.form}</p>}
      <button type="submit" className="btn btn-primary" disabled={state === 'sending'}><FileText /> {state === 'sending' ? 'Sending…' : 'Send me the presentation'}</button>
    </form>
  )
}

const CHANNEL_ICON = { whatsapp: Chat, telegram: Send, email: Mail }

function ManagerDialog() {
  const { open } = useNav()
  const channels = managerChannels()
  const [copied, setCopied] = useState('')
  const copy = async (c) => {
    try { await navigator.clipboard.writeText(c.value); setCopied(c.id) } catch {
      const el = document.getElementById(`ch-${c.id}`)
      const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r)
    }
  }
  return (
    <div className="flex flex-col gap-5">
      <Head eyebrow="Talk to a person" title="Contact a manager" text={channels.length ? 'Pick the channel you prefer. A manager replies personally.' : undefined} />
      {channels.length ? (
        <ul className="flex flex-col gap-3">
          {channels.map((c) => {
            const Icon = CHANNEL_ICON[c.id]
            return (
              <li key={c.id} className="flex items-center gap-3 rounded-2xl border border-line bg-ink/50 p-3 pl-4">
                <Icon className="size-5 shrink-0 text-lemon" />
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-mono uppercase tracking-wider text-muted">{c.label}</div>
                  <div id={`ch-${c.id}`} className="truncate font-semibold select-all">{c.value}</div>
                </div>
                <button type="button" onClick={() => copy(c)} className="grid size-10 place-items-center rounded-full border border-hair hover:border-lemon" aria-label={`Copy ${c.label}`}>
                  {copied === c.id ? <Check className="size-4 text-lemon" /> : <Copy className="size-4" />}
                </button>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-[40px] !px-4">Open</a>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-ink/50 p-5">
          <p className="text-[15px] leading-relaxed">Direct manager contacts (WhatsApp, Telegram, email) will appear here once they are published.</p>
          <button type="button" className="btn btn-ghost w-full !whitespace-normal" onClick={() => open('presentation')}><FileText /> Request a presentation instead</button>
        </div>
      )}
    </div>
  )
}

function SessionDialog() {
  const embed = calendarEmbedUrl()
  const { open } = useNav()
  return (
    <div className="flex flex-col gap-5">
      <Head eyebrow="Personal strategy session" title="Book a strategy session" text={embed ? 'Choose a day and a free time, add your name and email, and confirm.' : undefined} />
      {embed ? (
        <>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink">
            <iframe src={embed} title="Book a strategy session" className="block h-[min(680px,70vh)] w-full" loading="lazy" />
          </div>
          <a href={config.calendarUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Calendar not loading? Open it in a new tab <ArrowUpRight /></a>
        </>
      ) : (
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-ink/50 p-5">
          <p className="text-[15px] leading-relaxed">Online booking opens here soon: you’ll pick a free day and time and confirm instantly.</p>
          <button type="button" className="btn btn-ghost w-full !whitespace-normal" onClick={() => open('manager')}><Calendar /> Ask a manager for a time</button>
        </div>
      )}
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
