import { useEffect, useState } from 'react'
import { config, formOptions } from '../content/site.js'
import { submitLead } from '../lib/integrations.js'
import { useNav } from '../lib/nav.jsx'
import { Choice, EMAIL_RE, Field, PHONE_RE } from './Form.jsx'
import { ArrowRight, Calendar, Chat, Check } from './Icons.jsx'

const EMPTY = { name: '', email: '', phone: '', role: '', interest: '', consent: false }

export function Consent({ id, checked, onChange, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-snug text-muted">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={!!error}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[#f6d23c]" />
        <span>
          I agree to the processing of my personal data and to be contacted about my request
          {config.privacyUrl ? <> as described in the <a href={config.privacyUrl} target="_blank" rel="noopener noreferrer" className="text-cream underline underline-offset-2">Privacy Policy</a></> : null}.
        </span>
      </label>
      {error && <p id={`${id}-err`} className="text-[13px] text-bad" role="alert">{error}</p>}
    </div>
  )
}

/** Shown when no endpoint is configured: honest, and still offers the next step. */
export function NotConnected({ onBack, what = 'request' }) {
  const { open } = useNav()
  return (
    <div className="flex flex-col items-start gap-4 animate-rise">
      <span className="rounded-md border border-warn/50 bg-warn/10 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-warn">Not sent</span>
      <h3 className="display text-[clamp(24px,3.4vw,34px)]">This form isn’t connected yet.</h3>
      <p className="max-w-lg text-[15.5px] leading-relaxed text-muted">Your details are valid, but this preview has no lead inbox configured, so your {what} was not delivered. Reach a manager directly instead.</p>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn btn-primary" onClick={() => open('manager')}><Chat /> Contact a manager</button>
        <button type="button" className="btn btn-ghost" onClick={onBack}>Back to form</button>
      </div>
    </div>
  )
}

export default function LeadForm({ idPrefix, compact = false }) {
  const { preset, open } = useNav()
  const [v, setV] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | sent | not-connected
  const id = (k) => `${idPrefix}-${k}`

  useEffect(() => { if (preset) setV((x) => ({ ...x, interest: preset.value })) }, [preset])

  const set = (k) => (val) => {
    setV((x) => ({ ...x, [k]: val?.target ? val.target.value : val }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }
  const inv = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${id(k)}-err` : undefined })

  const submit = async (ev) => {
    ev.preventDefault()
    const e = {}
    if (v.name.trim().length < 2) e.name = 'Enter your name.'
    if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email, like you@label.com.'
    if (!PHONE_RE.test(v.phone.trim())) e.phone = 'Enter a number with country code, like +1 310 555 0100.'
    if (!v.role) e.role = 'Choose one.'
    if (!v.interest) e.interest = 'Choose one. “Not Sure” is fine.'
    if (!v.consent) e.consent = 'Please confirm so we can contact you.'
    setErrors(e)
    if (Object.keys(e).length) { requestAnimationFrame(() => document.getElementById(id(Object.keys(e)[0]))?.focus()); return }
    setState('sending')
    const r = await submitLead({ name: v.name, email: v.email, phone: v.phone, role: v.role, interest: v.interest, consent: true, form: idPrefix })
    if (r.status === 'error') { setErrors({ form: r.error }); setState('idle'); return }
    setState(r.status)
  }

  if (state === 'not-connected') return <NotConnected onBack={() => setState('idle')} />

  if (state === 'sent') {
    return (
      <div className="flex flex-col items-start gap-4 animate-rise">
        <span className="grid size-12 place-items-center rounded-full bg-lemon text-[#14120a]"><Check className="size-6" /></span>
        <h3 className="display text-[clamp(26px,4vw,40px)]">Thanks, {v.name.split(' ')[0]}. <span className="text-lemon">We got it.</span></h3>
        <p className="max-w-lg text-muted">A manager will reach out at {v.email}. Want to skip the wait? Pick a time for a strategy session.</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={() => open('session')}><Calendar /> Book a strategy session</button>
          <button type="button" className="btn btn-ghost" onClick={() => { setV(EMPTY); setState('idle') }}>Send another</button>
        </div>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-5">
      <div className={`grid gap-4 ${compact ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
        <Field id={id('name')} label="Name" error={errors.name}>
          <input id={id('name')} className="field" autoComplete="name" value={v.name} onChange={set('name')} placeholder="Your name" {...inv('name')} />
        </Field>
        <Field id={id('email')} label="Email" error={errors.email}>
          <input id={id('email')} type="email" inputMode="email" className="field" autoComplete="email" value={v.email} onChange={set('email')} placeholder="you@label.com" {...inv('email')} />
        </Field>
        <Field id={id('phone')} label="WhatsApp / Phone" error={errors.phone}>
          <input id={id('phone')} type="tel" inputMode="tel" className="field" autoComplete="tel" value={v.phone} onChange={set('phone')} placeholder="+1 310 555 0100" {...inv('phone')} />
        </Field>
      </div>
      <div className="grid gap-4 lg:grid-cols-[auto_1fr] lg:gap-8">
        <Field id={id('role')} label="I am" error={errors.role}>
          <Choice id={id('role')} options={formOptions.roles} value={v.role} onChange={set('role')} error={errors.role} />
        </Field>
        <Field id={id('interest')} label="What are you looking for?" error={errors.interest}>
          <Choice id={id('interest')} options={formOptions.interests} value={v.interest} onChange={set('interest')} error={errors.interest} />
        </Field>
      </div>
      {errors.form && <p className="text-[14px] text-bad" role="alert">{errors.form}</p>}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Consent id={id('consent')} checked={v.consent} onChange={set('consent')} error={errors.consent} />
        <button type="submit" className="btn btn-primary !min-h-[54px] shrink-0 lg:min-w-[220px]" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : <>Get my plan <ArrowRight /></>}
        </button>
      </div>
    </form>
  )
}
