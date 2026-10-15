import { useMemo, useState } from 'react'
import { config } from '../content/site.js'
import { requestCall } from '../lib/integrations.js'
import Modal from './Modal.jsx'
import { EMAIL_RE, Field } from './Form.jsx'
import { ArrowUpRight, Calendar, Check, Phone } from './Icons.jsx'

const TIMES = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM']

function nextWeekdays(n) {
  const out = []
  const d = new Date()
  while (out.length < n) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d))
  }
  return out
}

export default function BookCall({ open, onClose, prefill }) {
  const days = useMemo(() => nextWeekdays(6), [open])
  const [day, setDay] = useState(0)
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [err, setErr] = useState({})
  const [state, setState] = useState('pick') // pick | sending | done

  const close = () => { onClose(); setTimeout(() => { setState('pick'); setTime(''); setErr({}) }, 200) }
  const nm = name || prefill?.name || ''
  const em = email || prefill?.email || ''

  const confirm = async (e) => {
    e.preventDefault()
    const x = {}
    if (!time) x.time = 'Pick a time slot.'
    if (nm.trim().length < 2) x.bname = 'Enter your name.'
    if (!EMAIL_RE.test(em.trim())) x.bemail = 'Enter a valid email so we can send the invite.'
    setErr(x)
    if (Object.keys(x).length) return
    setState('sending')
    const r = await requestCall({ name: nm, email: em, date: days[day].toDateString(), time: time + ' ET' })
    if (!r.ok) { setErr({ form: r.error }); setState('pick'); return }
    setState(r.mode === 'demo' ? 'demo' : 'done')
  }

  const fmt = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <Modal open={open} onClose={close} label="Book a call">
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-col gap-2 pr-10">
          <div className="eyebrow">Strategy call · 20 min</div>
          <h3 className="display text-[34px]">Book a call</h3>
          <p className="text-muted">Talk through your release, goals and the right campaign model with our team.</p>
        </div>

        {config.calendarUrl ? (
          <a className="btn btn-primary" href={config.calendarUrl} target="_blank" rel="noopener noreferrer"><Calendar /> Open booking calendar <ArrowUpRight /></a>
        ) : state === 'done' || state === 'demo' ? (
          <div className="flex flex-col gap-4">
            <span className="grid size-12 place-items-center rounded-full bg-lemon text-[#14120a]"><Check className="size-6" /></span>
            <p className="text-[17px]">Requested: <strong>{fmt(days[day])}, {time} ET</strong>.</p>
            {state === 'demo'
              ? <p className="demo-tag w-fit">Demo mode · no invite was sent. Add calendarUrl in content/site.js</p>
              : <p className="text-muted">We’ll confirm by email at {em}.</p>}
            <button type="button" className="btn btn-ghost" onClick={close}>Done</button>
          </div>
        ) : (
          <form noValidate onSubmit={confirm} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-[13.5px] font-semibold">Day</span>
              <div className="grid grid-cols-3 gap-2">
                {days.map((d, i) => (
                  <button key={i} type="button" onClick={() => setDay(i)} aria-pressed={day === i}
                    className={`rounded-xl border px-2 py-2.5 text-[13px] font-medium transition-colors ${day === i ? 'border-lemon bg-lemon/10 text-lemon' : 'border-hair hover:border-lemon/50'}`}>{fmt(d)}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[13.5px] font-semibold">Time (Eastern)</span>
              <div className="grid grid-cols-3 gap-2">
                {TIMES.map((t) => (
                  <button key={t} type="button" onClick={() => { setTime(t); setErr((e) => ({ ...e, time: undefined })) }} aria-pressed={time === t}
                    className={`tnum rounded-xl border px-2 py-2.5 text-[13px] font-medium transition-colors ${time === t ? 'border-lemon bg-lemon text-[#14120a]' : 'border-hair hover:border-lemon/50'}`}>{t}</button>
                ))}
              </div>
              {err.time && <p className="text-[13px] text-bad" role="alert">{err.time}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="bname" label="Name" error={err.bname}>
                <input id="bname" className="field" autoComplete="name" value={nm} onChange={(e) => setName(e.target.value)} aria-invalid={!!err.bname} />
              </Field>
              <Field id="bemail" label="Email" error={err.bemail}>
                <input id="bemail" type="email" className="field" autoComplete="email" value={em} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!err.bemail} />
              </Field>
            </div>
            {err.form && <p className="text-[13px] text-bad" role="alert">{err.form}</p>}
            <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>{state === 'sending' ? 'Requesting…' : 'Request this time'}</button>
          </form>
        )}

        {config.phone && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hair pt-5 text-[14px]">
            <span className="text-muted">Prefer to talk now? <span className="text-cream select-all tnum">{config.phone}</span></span>
            <a className="btn btn-ghost !min-h-[40px]" href={`tel:${config.phone}`}><Phone className="size-4" /> Call us now</a>
          </div>
        )}
      </div>
    </Modal>
  )
}
