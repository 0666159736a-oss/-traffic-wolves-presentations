import { useMemo, useState } from 'react'
import { config, formOptions } from '../content/site.js'
import { calendarEmbedUrl, managerChannels, requestPresentation } from '../lib/integrations.js'
import { useNav } from '../lib/nav.jsx'
import Modal from './Modal.jsx'
import { Choice, EMAIL_RE, Field } from './Form.jsx'
import { Consent, PrototypeNote } from './LeadForm.jsx'
import { ArrowRight, ArrowUpRight, Calendar, Chat, Check, Copy, FileText, Mail, Send } from './Icons.jsx'

const Head = ({ eyebrow, title, text }) => (
  <div className="flex flex-col gap-2 pr-10">
    <div className="eyebrow">{eyebrow}</div>
    <h3 className="display text-[clamp(28px,4vw,36px)]">{title}</h3>
    {text && <p className="leading-relaxed text-muted">{text}</p>}
  </div>
)

const Done = ({ title, text, prototype, children }) => (
  <div className="flex flex-col items-start gap-4 animate-rise">
    <span className="grid size-12 place-items-center rounded-full bg-lemon text-[#14120a]"><Check className="size-6" /></span>
    <h3 className="display text-[clamp(28px,4vw,34px)]">{title}</h3>
    <p className="text-muted">{text}</p>
    {children}
    {prototype && <PrototypeNote>{prototype}</PrototypeNote>}
  </div>
)

/** GET A FREE PRESENTATION — short form; the email service sends the PDF. */
function PresentationDialog() {
  const { open } = useNav()
  const [v, setV] = useState({ name: '', email: '', role: '', consent: false })
  const [err, setErr] = useState({})
  const [state, setState] = useState('idle')
  const set = (k) => (val) => { setV((x) => ({ ...x, [k]: val?.target ? val.target.value : val })); setErr((e) => ({ ...e, [`p-${k}`]: undefined })) }

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

  if (state === 'sent' || state === 'prototype') {
    return (
      <Done title="Check your inbox." text={<>The Lemon Clips presentation is on its way to <span className="text-cream">{v.email}</span>.</>}
        prototype={state === 'prototype' && 'Prototype preview: on the live site the PDF is emailed automatically.'}>
        <button type="button" className="btn btn-ghost" onClick={() => open('session')}><Calendar /> Book a strategy session</button>
      </Done>
    )
  }
  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-5">
      <Head eyebrow="Free presentation" title="Get the Lemon Clips presentation" text="Services, how campaigns work and real results. Sent straight to your email." />
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

/** CONTACT A MANAGER — WhatsApp / Telegram / Email, real company contacts from config. */
const CHANNELS = [
  { id: 'whatsapp', label: 'WhatsApp', hint: 'Fastest reply', Icon: Chat },
  { id: 'telegram', label: 'Telegram', hint: 'Chat with a manager', Icon: Send },
  { id: 'email', label: 'Email', hint: 'Detailed requests', Icon: Mail },
]

function ManagerDialog() {
  const configured = Object.fromEntries(managerChannels().map((c) => [c.id, c]))
  const [picked, setPicked] = useState('')
  const [copied, setCopied] = useState('')
  const copy = async (c) => { try { await navigator.clipboard.writeText(c.value); setCopied(c.id) } catch { /* text is selectable */ } }

  return (
    <div className="flex flex-col gap-5">
      <Head eyebrow="Talk to a person" title="Contact a manager" text="Choose how you want to talk. A real manager replies personally." />
      <ul className="flex flex-col gap-3">
        {CHANNELS.map(({ id, label, hint, Icon }) => {
          const c = configured[id]
          return (
            <li key={id} className="rounded-2xl border border-line bg-ink/50 p-3 pl-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-lemon/10 text-lemon"><Icon className="size-5" /></span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{label}</div>
                  <div className="truncate text-[13px] text-muted select-all">{c ? c.value : hint}</div>
                </div>
                {c && (
                  <button type="button" onClick={() => copy(c)} className="grid size-10 place-items-center rounded-full border border-hair hover:border-lemon" aria-label={`Copy ${label}`}>
                    {copied === id ? <Check className="size-4 text-lemon" /> : <Copy className="size-4" />}
                  </button>
                )}
                {c
                  ? <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-[42px] !px-4">Open</a>
                  : <button type="button" onClick={() => setPicked(id)} className={`btn !min-h-[42px] !px-4 ${picked === id ? 'btn-primary' : 'btn-ghost'}`}>Open</button>}
              </div>
              {picked === id && !c && (
                <p className="mt-3 border-t border-hair pt-3 text-[13px] text-muted animate-rise">Prototype preview: on the live site this opens a {label} chat with the Lemon Clips manager.</p>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** BOOK A PERSONAL STRATEGY SESSION — Calendly / Cal.com when configured; otherwise a prototype of the same flow. */
const TIMES = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM']

function SessionPrototype() {
  const days = useMemo(() => {
    const out = []; const d = new Date()
    while (out.length < 6) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) out.push(new Date(d)) }
    return out
  }, [])
  const [day, setDay] = useState(0)
  const [time, setTime] = useState('')
  const [v, setV] = useState({ name: '', email: '' })
  const [err, setErr] = useState({})
  const [done, setDone] = useState(false)
  const fmt = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  const confirm = (e) => {
    e.preventDefault()
    const x = {}
    if (!time) x.time = 'Pick a time.'
    if (v.name.trim().length < 2) x['s-name'] = 'Enter your name.'
    if (!EMAIL_RE.test(v.email.trim())) x['s-email'] = 'Enter a valid email for the invite.'
    setErr(x)
    if (!Object.keys(x).length) setDone(true)
  }

  if (done) {
    return (
      <Done title="You’re booked." text={<>Strategy session on <span className="text-cream">{fmt(days[day])}, {time} ET</span>. The invite goes to {v.email}.</>}
        prototype="Prototype preview: on the live site times and confirmation come from Calendly / Cal.com." />
    )
  }
  return (
    <form noValidate onSubmit={confirm} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-[13.5px] font-semibold">1. Choose a day</span>
        <div className="grid grid-cols-3 gap-2">
          {days.map((d, i) => (
            <button key={i} type="button" onClick={() => setDay(i)} aria-pressed={day === i}
              className={`rounded-xl border px-2 py-2.5 text-[13px] font-medium transition-colors ${day === i ? 'border-lemon bg-lemon/10 text-lemon' : 'border-hair hover:border-lemon/50'}`}>{fmt(d)}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[13.5px] font-semibold">2. Choose a time (Eastern)</span>
        <div className="grid grid-cols-3 gap-2">
          {TIMES.map((t) => (
            <button key={t} type="button" onClick={() => { setTime(t); setErr((e) => ({ ...e, time: undefined })) }} aria-pressed={time === t}
              className={`tnum rounded-xl border px-2 py-2.5 text-[13px] font-medium transition-colors ${time === t ? 'border-lemon bg-lemon text-[#14120a]' : 'border-hair hover:border-lemon/50'}`}>{t}</button>
          ))}
        </div>
        {err.time && <p className="text-[13px] text-bad" role="alert">{err.time}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[13.5px] font-semibold">3. Your details</span>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field id="s-name" label="Name" error={err['s-name']}><input id="s-name" className="field" autoComplete="name" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} aria-invalid={!!err['s-name']} /></Field>
          <Field id="s-email" label="Email" error={err['s-email']}><input id="s-email" type="email" className="field" autoComplete="email" value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} aria-invalid={!!err['s-email']} /></Field>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Confirm booking <ArrowRight /></button>
      <PrototypeNote>Prototype preview: available times are illustrative.</PrototypeNote>
    </form>
  )
}

function SessionDialog() {
  const embed = calendarEmbedUrl()
  return (
    <div className="flex flex-col gap-5">
      <Head eyebrow="Personal strategy session" title="Book a strategy session" text="30 minutes with a Lemon Clips strategist about your music and goals." />
      {embed ? (
        <>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink">
            <iframe src={embed} title="Book a strategy session" className="block h-[min(680px,70vh)] w-full" loading="lazy" />
          </div>
          <a href={config.calendarUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Open the calendar in a new tab <ArrowUpRight /></a>
        </>
      ) : <SessionPrototype />}
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
