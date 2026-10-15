import { useEffect, useRef, useState } from 'react'
import { config, formOptions } from '../content/site.js'
import { submitCampaignLead } from '../lib/integrations.js'
import { useNav } from '../lib/nav.jsx'
import { Choice, EMAIL_RE, Field, PHONE_RE, isUrl } from './Form.jsx'
import { ArrowRight, Calendar, Check, Phone } from './Icons.jsx'

const EMPTY = { name: '', email: '', phone: '', role: '', project: '', link: '', budget: '', goal: '', details: '', service: '' }
const DRAFT_KEY = 'lemonclips-lead-draft'

function validate(step, v) {
  const e = {}
  if (step === 1) {
    if (v.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email, like you@label.com.'
    if (!PHONE_RE.test(v.phone.trim())) e.phone = 'Enter a phone or WhatsApp number with country code, like +1 310 555 0100.'
    if (!v.role) e.role = 'Choose the option that describes you best.'
  } else {
    if (v.project.trim().length < 2) e.project = 'Enter the artist or project name.'
    if (!isUrl(v.link)) e.link = 'Paste a full link to the song, starting with https:// (Spotify, Apple Music, YouTube, TikTok sound…).'
    if (!v.budget) e.budget = 'Choose a budget range. “Not sure yet” is fine.'
    if (!v.goal) e.goal = 'Choose the main goal for this campaign.'
  }
  return e
}

export default function LeadForm() {
  const { preset, go, openBooking } = useNav()
  const [step, setStep] = useState(1)
  const [v, setV] = useState(() => {
    try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}') } } catch { return EMPTY }
  })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)
  const top = useRef(null)

  useEffect(() => { if (preset) setV((x) => ({ ...x, service: preset })) }, [preset])
  useEffect(() => { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(v)) } catch { /* storage blocked */ } }, [v])

  const set = (k) => (val) => {
    setV((x) => ({ ...x, [k]: typeof val === 'string' ? val : val.target.value }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }
  const inv = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined })

  const focusFirstError = (e) => {
    const first = Object.keys(e)[0]
    requestAnimationFrame(() => document.getElementById(first)?.focus?.())
  }

  const next = () => {
    const e = validate(1, v)
    setErrors(e)
    if (Object.keys(e).length) return focusFirstError(e)
    setStep(2)
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const submit = async (ev) => {
    ev.preventDefault()
    if (step === 1) return next()
    const e = validate(2, v)
    setErrors(e)
    if (Object.keys(e).length) return focusFirstError(e)
    setSending(true)
    const r = await submitCampaignLead(v)
    setSending(false)
    if (!r.ok) return setErrors({ form: r.error })
    setResult(r)
    try { localStorage.removeItem(DRAFT_KEY) } catch { /* ignore */ }
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const reset = () => { setV(EMPTY); setStep(1); setResult(null); setErrors({}) }

  if (result) {
    return (
      <div ref={top} className="flex flex-col items-start gap-6 p-6 sm:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-lemon text-[#14120a]"><Check className="size-7" /></span>
        <div className="flex flex-col gap-3">
          <h3 className="display text-[clamp(30px,5vw,46px)]">Thanks, {v.name.split(' ')[0]}.<br /><span className="text-lemon">Your request is in.</span></h3>
          <p className="text-muted text-[16.5px] leading-relaxed max-w-lg">
            We’ll review <strong className="text-cream">{v.project}</strong> and reply to <strong className="text-cream">{v.email}</strong> with next steps. The fastest way to start is a 20-minute call.
          </p>
          {result.mode === 'demo' && (
            <p className="demo-tag w-fit">Demo mode · nothing was sent. Connect a CRM in content/site.js</p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={() => openBooking({ name: v.name, email: v.email })}><Calendar /> Book your call</button>
          {config.phone && <a className="btn btn-ghost" href={`tel:${config.phone}`}><Phone /> Call us now</a>}
          <button type="button" className="btn btn-ghost" onClick={reset}>Submit another release</button>
        </div>
        <button type="button" className="text-[14px] text-muted underline underline-offset-4 hover:text-lemon" onClick={() => go('results')}>Meanwhile, see how campaigns are reported</button>
      </div>
    )
  }

  return (
    <form ref={top} noValidate onSubmit={submit} className="flex flex-col gap-7 p-6 sm:p-10">
      <div className="flex items-center gap-3" aria-label={`Step ${step} of 2`}>
        {[1, 2].map((s) => (
          <button key={s} type="button" disabled={s === 2 && step === 1} onClick={() => s === 1 && setStep(1)}
            className={`flex items-center gap-2.5 text-[13px] font-semibold ${step === s ? 'text-cream' : 'text-muted'} disabled:cursor-default`}>
            <span className={`grid size-8 place-items-center rounded-full font-mono text-[12px] ${step >= s ? 'bg-lemon text-[#14120a]' : 'border border-hair'}`}>{step > s ? <Check className="size-4" /> : s}</span>
            {s === 1 ? 'Your details' : 'Your campaign'}
          </button>
        ))}
        <span className="ml-auto h-1 w-20 sm:w-32 overflow-hidden rounded-full bg-white/10">
          <span className="block h-full bg-lemon transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }} />
        </span>
      </div>

      {v.service && (
        <div className="flex flex-wrap items-center gap-2 text-[14px] text-muted">
          Interested in: <span className="rounded-full border border-line px-3 py-1 text-lemon">{v.service}</span>
          <button type="button" className="underline underline-offset-4 hover:text-cream" onClick={() => setV((x) => ({ ...x, service: '' }))}>Clear</button>
        </div>
      )}

      {step === 1 ? (
        <div key="s1" className="grid gap-5 sm:grid-cols-2 animate-rise">
          <Field id="name" label="Name" error={errors.name}>
            <input id="name" className="field" autoComplete="name" value={v.name} onChange={set('name')} placeholder="Jordan Lee" {...inv('name')} />
          </Field>
          <Field id="email" label="Email" error={errors.email}>
            <input id="email" type="email" inputMode="email" className="field" autoComplete="email" value={v.email} onChange={set('email')} placeholder="you@label.com" {...inv('email')} />
          </Field>
          <Field id="phone" label="WhatsApp / Phone" error={errors.phone}>
            <input id="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" value={v.phone} onChange={set('phone')} placeholder="+1 310 555 0100" {...inv('phone')} />
          </Field>
          <Field id="role" label="I am a…" error={errors.role}>
            <Choice id="role" options={formOptions.roles} value={v.role} onChange={set('role')} error={errors.role} />
          </Field>
        </div>
      ) : (
        <div key="s2" className="grid gap-5 sm:grid-cols-2 animate-rise">
          <Field id="project" label="Artist or project name" error={errors.project}>
            <input id="project" className="field" value={v.project} onChange={set('project')} placeholder="Artist, release or label roster" {...inv('project')} />
          </Field>
          <Field id="link" label="Link to music" error={errors.link}>
            <input id="link" type="url" inputMode="url" className="field" value={v.link} onChange={set('link')} placeholder="https://open.spotify.com/track/…" {...inv('link')} />
          </Field>
          <Field id="budget" label="Campaign budget" error={errors.budget}>
            <select id="budget" className="field" value={v.budget} onChange={set('budget')} {...inv('budget')}>
              <option value="">Select a range</option>
              {formOptions.budgets.map((b) => <option key={b}>{b}</option>)}
            </select>
          </Field>
          <Field id="goal" label="Main campaign goal" error={errors.goal}>
            <select id="goal" className="field" value={v.goal} onChange={set('goal')} {...inv('goal')}>
              <option value="">Select a goal</option>
              {formOptions.goals.map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field id="details" label="Additional details" optional>
              <textarea id="details" className="field" value={v.details} onChange={set('details')} placeholder="Release date, target audience, references, anything we should avoid…" maxLength={1200} />
            </Field>
          </div>
        </div>
      )}

      {errors.form && <p className="text-bad text-[14px]" role="alert">{errors.form}</p>}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step === 2 ? (
          <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>Back</button>
        ) : (
          <p className="text-[13px] text-muted max-w-xs">Two short steps. Takes about two minutes.</p>
        )}
        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? 'Sending…' : step === 1 ? <>Continue <ArrowRight /></> : <>Send campaign request <ArrowRight /></>}
        </button>
      </div>
    </form>
  )
}
