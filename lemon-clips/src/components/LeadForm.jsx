import { useEffect, useState } from 'react'
import { config } from '../content/site.js'
import { submitLead } from '../lib/integrations.js'
import { useNav } from '../lib/nav.jsx'
import ContactFields, { EMPTY_CONTACT, contactPayload, validateContact } from './ContactFields.jsx'
import { ArrowRight, Calendar, Check, Chat } from './Icons.jsx'

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

/** Shown when no lead handler is configured: nothing is faked, the entered details stay in the form. */
export function NotSent({ onBack }) {
  const { open } = useNav()
  return (
    <div role="alert" className="flex flex-col items-start gap-3 rounded-2xl border border-warn/50 bg-warn/[.07] p-4 animate-rise">
      <span className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-warn">Not sent · preview mode</span>
      <p className="text-[15px] leading-relaxed">The lead inbox isn’t connected in this preview, so your request was not delivered. Your details are still in the form.</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-ghost !min-h-[42px]" onClick={onBack}>Back to form</button>
        <button type="button" className="btn btn-ghost !min-h-[42px]" onClick={() => open('manager')}><Chat /> Contact a manager</button>
      </div>
    </div>
  )
}

/** Hook shared by all client forms: contact state, validation, submit. */
export function useContactForm(send) {
  const [v, setV] = useState(EMPTY_CONTACT)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | sent | not-connected
  const set = (k) => (val) => {
    setV((x) => ({ ...x, [k]: val?.target ? (val.target.type === 'checkbox' ? val.target.checked : val.target.value) : val }))
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e))
  }
  const submit = (prefix, extra = {}) => async (ev) => {
    ev?.preventDefault()
    const e = validateContact(v)
    setErrors(e)
    if (Object.keys(e).length) { requestAnimationFrame(() => document.getElementById(`${prefix}-${Object.keys(e)[0]}`)?.focus()); return }
    setState('sending')
    const r = await send({ ...contactPayload(v), ...extra })
    if (r.status === 'error') { setErrors({ form: r.error }); setState('idle'); return }
    setState(r.status)
  }
  return { v, setV, set, errors, state, setState, submit }
}

export default function LeadForm({ idPrefix }) {
  const { preset, open } = useNav()
  const [service, setService] = useState('')
  const f = useContactForm(submitLead)
  useEffect(() => { if (preset) setService(preset.value) }, [preset])

  if (f.state === 'sent') {
    return (
      <div className="flex flex-col items-start gap-4 animate-rise">
        <span className="grid size-12 place-items-center rounded-full bg-lemon text-[#14120a]"><Check className="size-6" /></span>
        <h3 className="display text-[clamp(26px,4vw,40px)]">Thanks, {f.v.name.split(' ')[0]}. <span className="text-lemon">We got it.</span></h3>
        <p className="max-w-lg text-muted">A manager will reach out by phone, WhatsApp or email. Want to skip the wait? Book a strategy session.</p>
        <button type="button" className="btn btn-primary" onClick={() => open('session')}><Calendar /> Book a strategy session</button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={f.submit(idPrefix, { form: idPrefix, service: service || undefined })} className="flex flex-col gap-5">
      {service && (
        <div className="flex flex-wrap items-center gap-2 text-[14px] text-muted">
          You picked: <span className="rounded-full border border-line px-3 py-1 text-lemon">{service}</span>
          <button type="button" className="underline underline-offset-4 hover:text-cream" onClick={() => setService('')}>Clear</button>
        </div>
      )}
      <ContactFields prefix={idPrefix} v={f.v} set={f.set} errors={f.errors} layout="wide" />
      {f.errors.form && <p className="text-[14px] text-bad" role="alert">{f.errors.form}</p>}
      {f.state === 'not-connected' && <NotSent onBack={() => f.setState('idle')} />}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Consent id={`${idPrefix}-consent`} checked={f.v.consent} onChange={f.set('consent')} error={f.errors.consent} />
        <button type="submit" className="btn btn-primary !min-h-[54px] shrink-0 lg:min-w-[220px]" disabled={f.state === 'sending'}>
          {f.state === 'sending' ? 'Sending…' : <>Get my plan <ArrowRight /></>}
        </button>
      </div>
    </form>
  )
}
