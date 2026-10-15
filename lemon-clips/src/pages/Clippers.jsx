import { useState } from 'react'
import { config } from '../content/site.js'
import { campaignFields, clipperFormOptions, clipperHero, earnSteps, joinSteps, payoutPoints, teamPoints, uploadRules } from '../content/clippers.js'
import { submitClipperApplication } from '../lib/integrations.js'
import { scrollToId, useNav } from '../lib/nav.jsx'
import { Choice, EMAIL_RE, Field } from '../components/Form.jsx'
import { Consent, NotConnected } from '../components/LeadForm.jsx'
import { ArrowRight, ArrowUpRight, Check, Music, Users, Wallet } from '../components/Icons.jsx'

const Section = ({ id, n, eyebrow, title, children }) => (
  <section id={id} className="gutter py-[clamp(44px,6vw,88px)] border-t border-hair">
    <div className="wrap flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="eyebrow flex items-center gap-3"><span className="font-mono text-muted">{n}</span>{eyebrow}</div>
        <h2 className="display text-[clamp(32px,5vw,64px)]">{title}</h2>
      </div>
      {children}
    </div>
  </section>
)

function Estimator() {
  const [rate, setRate] = useState('')
  const [views, setViews] = useState(100000)
  const r = parseFloat(rate)
  const est = Number.isFinite(r) && r >= 0 ? (views / 1000) * r : null
  return (
    <div className="flex flex-col gap-5 rounded-[26px] border border-line p-6 sm:p-7" style={{ background: 'radial-gradient(circle at 90% 0%, rgb(246 210 60 / .14), transparent 55%), var(--color-panel)' }}>
      <div>
        <div className="eyebrow">Earnings calculator</div>
        <p className="mt-2 text-[15px] text-muted">Enter a campaign’s rate to see what your eligible views would pay.</p>
      </div>
      <Field id="est-rate" label="Rate (USD per 1,000 eligible views)">
        <input id="est-rate" className="field tnum" inputMode="decimal" placeholder="Rate shown on the campaign" value={rate} onChange={(e) => setRate(e.target.value.replace(/[^\d.]/g, ''))} />
      </Field>
      <div className="flex flex-col gap-2">
        <label htmlFor="est-views" className="flex justify-between text-[13.5px] font-semibold"><span>Eligible views</span><span className="tnum text-lemon">{views.toLocaleString('en-US')}</span></label>
        <input id="est-views" type="range" min="10000" max="2000000" step="10000" value={views} onChange={(e) => setViews(+e.target.value)} className="w-full accent-[#f6d23c]" />
      </div>
      <div className="flex items-end justify-between gap-4 border-t border-hair pt-4">
        <span className="font-mono text-[12px] uppercase tracking-wider text-muted">Estimated</span>
        <span className="display tnum text-[clamp(40px,5vw,56px)] text-lemon">{est == null ? '$—' : '$' + est.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
      </div>
      <p className="text-[12.5px] text-muted">Estimate only. Payouts depend on review, eligibility rules and the campaign budget.</p>
    </div>
  )
}

const EMPTY = { name: '', email: '', platforms: [], accounts: '', volume: '', consent: false }

function JoinForm({ type, setType }) {
  const [v, setV] = useState(EMPTY)
  const [err, setErr] = useState({})
  const [state, setState] = useState('idle')
  const set = (k) => (val) => { setV((x) => ({ ...x, [k]: val?.target ? val.target.value : val })); setErr((e) => ({ ...e, [k]: undefined })) }

  const submit = async (e) => {
    e.preventDefault()
    const x = {}
    if (v.name.trim().length < 2) x.cname = 'Enter your name or team name.'
    if (!EMAIL_RE.test(v.email.trim())) x.cemail = 'Enter a valid email.'
    if (!type) x.ctype = 'Choose how you clip.'
    if (!v.platforms.length) x.cplatforms = 'Choose at least one platform.'
    if (v.accounts.trim().length < 4) x.caccounts = 'Add at least one account link or @handle.'
    if (!v.volume) x.cvolume = 'Choose your typical weekly volume.'
    if (!v.consent) x.cconsent = 'Please confirm so we can review your application.'
    setErr(x)
    if (Object.keys(x).length) { document.getElementById(Object.keys(x)[0])?.focus(); return }
    setState('sending')
    const r = await submitClipperApplication({ name: v.name, email: v.email, type, platforms: v.platforms, accounts: v.accounts, volume: v.volume, consent: true })
    if (r.status === 'error') { setErr({ form: r.error }); setState('idle'); return }
    setState(r.status)
  }

  if (state === 'not-connected') return <div className="p-6 sm:p-10"><NotConnected what="application" onBack={() => setState('idle')} /></div>
  if (state === 'sent') {
    return (
      <div className="flex flex-col items-start gap-4 p-6 sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-lemon text-[#14120a]"><Check className="size-6" /></span>
        <h3 className="display text-[clamp(26px,4vw,40px)]">Application received.</h3>
        <p className="max-w-md text-muted">We’ll review your accounts and email you at {v.email} with access to live campaigns.</p>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={submit} className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
      <Field id="cname" label="Name or team name" error={err.cname}><input id="cname" className="field" value={v.name} onChange={set('name')} autoComplete="name" aria-invalid={!!err.cname} /></Field>
      <Field id="cemail" label="Email" error={err.cemail}><input id="cemail" type="email" className="field" value={v.email} onChange={set('email')} autoComplete="email" aria-invalid={!!err.cemail} /></Field>
      <div className="sm:col-span-2"><Field id="ctype" label="I am a…" error={err.ctype}><Choice id="ctype" options={clipperFormOptions.types} value={type} onChange={(t) => { setType(t); setErr((e) => ({ ...e, ctype: undefined })) }} error={err.ctype} /></Field></div>
      <div className="sm:col-span-2"><Field id="cplatforms" label="Platforms you post on" error={err.cplatforms}><Choice id="cplatforms" options={clipperFormOptions.platforms} value={v.platforms} onChange={set('platforms')} error={err.cplatforms} /></Field></div>
      <div className="sm:col-span-2"><Field id="caccounts" label="Account links or @handles" error={err.caccounts} hint="One per line. Teams can list their main pages."><textarea id="caccounts" className="field !min-h-[90px]" value={v.accounts} onChange={set('accounts')} placeholder={'@yourpage\nhttps://www.tiktok.com/@yourpage'} aria-invalid={!!err.caccounts} /></Field></div>
      <div className="sm:col-span-2"><Field id="cvolume" label="Typical weekly volume" error={err.cvolume}>
        <select id="cvolume" className="field" value={v.volume} onChange={set('volume')} aria-invalid={!!err.cvolume}>
          <option value="">Select</option>
          {clipperFormOptions.volumes.map((o) => <option key={o}>{o}</option>)}
        </select>
      </Field></div>
      <div className="sm:col-span-2"><Consent id="cconsent" checked={v.consent} onChange={set('consent')} error={err.cconsent} /></div>
      {err.form && <p className="text-bad text-[14px] sm:col-span-2" role="alert">{err.form}</p>}
      <button type="submit" className="btn btn-primary sm:col-span-2" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : <>Apply to join <ArrowRight /></>}</button>
    </form>
  )
}

export default function Clippers() {
  const { go } = useNav()
  const [type, setType] = useState('')
  const join = (t) => { if (t) setType(t); scrollToId('clippers-join') }

  return (
    <>
      <section className="gutter overflow-hidden">
        <div className="wrap grid items-center gap-8 pt-6 pb-12 lg:grid-cols-[1.3fr_1fr] lg:pt-12 lg:pb-16">
          <div className="flex min-w-0 flex-col gap-6">
            <div className="eyebrow flex items-center gap-2.5"><span className="h-px w-8 bg-lemon" />{clipperHero.eyebrow}</div>
            <h1 className="display text-[clamp(48px,6.4vw,94px)]">
              {clipperHero.title.map((l, i) => <span key={i} className={`block animate-rise ${i === 1 ? 'text-lemon' : ''}`} style={{ animationDelay: `${i * 90}ms` }}>{l}</span>)}
            </h1>
            <p className="max-w-[34rem] text-[clamp(18px,2vw,22px)] leading-[1.45] text-cream/85">{clipperHero.subtitle}</p>
            <div className="grid gap-3 sm:flex">
              <button type="button" className="btn btn-primary !min-h-[56px] !px-7" onClick={() => join()}>Join as a clipper <ArrowRight /></button>
              <button type="button" className="btn btn-ghost !min-h-[56px] !px-7" onClick={() => scrollToId('clippers-campaigns')}>Explore music campaigns</button>
            </div>
          </div>
          <Estimator />
        </div>
      </section>

      <Section id="clippers-earn" n="01" eyebrow="How earning works" title={<>CREATE. POST. <span className="text-lemon">GET PAID ON VIEWS.</span></>}>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {earnSteps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-[20px] border border-line bg-panel p-5 lg:flex-col lg:gap-3">
              <span className="display text-[34px] !leading-none text-lemon">{i + 1}</span>
              <div><h3 className="text-[18px] font-bold">{s.title}</h3><p className="mt-1 text-[15px] leading-relaxed text-muted">{s.text}</p></div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="clippers-campaigns" n="02" eyebrow="Music campaigns" title={<>PICK A TRACK. <span className="text-lemon">MAKE IT MOVE.</span></>}>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="flex flex-col gap-5">
            <p className="text-[17px] leading-relaxed text-cream/85">Open music campaigns are listed in the clipper app once your account is approved.</p>
            {config.clipperAppUrl
              ? <a href={config.clipperAppUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-fit">Open the clipper app <ArrowUpRight /></a>
              : <button type="button" className="btn btn-primary w-fit" onClick={() => join()}>Join to see live campaigns <ArrowRight /></button>}
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {campaignFields.map((f, i) => {
              const Icon = [Music, Wallet, Wallet, Check][i]
              return (
                <li key={f.title} className="flex gap-3 rounded-[18px] border border-hair p-4">
                  <Icon className="mt-0.5 size-5 shrink-0 text-lemon" />
                  <div><div className="font-semibold">{f.title}</div><div className="text-[14px] text-muted">{f.text}</div></div>
                </li>
              )
            })}
          </ul>
        </div>
      </Section>

      <Section n="03" eyebrow="Joining & uploading" title={<>GET APPROVED. <span className="text-lemon">POST IT RIGHT.</span></>}>
        <div className="grid gap-8 lg:grid-cols-2">
          <ol className="flex flex-col gap-3">
            {joinSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line font-mono text-[14px] text-lemon">{i + 1}</span>
                <div><h3 className="text-[17px] font-bold">{s.title}</h3><p className="text-[15px] text-muted">{s.text}</p></div>
              </li>
            ))}
          </ol>
          <ul className="flex flex-col gap-2.5 rounded-[22px] border border-line bg-panel p-5 sm:p-6">
            <li className="eyebrow mb-1">Upload rules</li>
            {uploadRules.map((r) => <li key={r} className="flex gap-3 text-[15px] leading-relaxed"><Check className="mt-1 size-[18px] shrink-0 text-lemon" />{r}</li>)}
          </ul>
        </div>
      </Section>

      <Section n="04" eyebrow="Tracking & payouts" title={<>EVERY VIEW TRACKED. <span className="text-lemon">CLEAR PAYOUTS.</span></>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {payoutPoints.map((p) => (
            <div key={p.title} className="flex flex-col gap-1.5 border-t-2 border-lemon pt-4">
              <h3 className="text-[17px] font-bold">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n="05" eyebrow="For clipping teams" title={<>RUN A TEAM? <span className="text-lemon">SCALE WITH US.</span></>}>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {teamPoints.map((p) => (
            <div key={p.title} className="flex flex-col gap-2 rounded-[20px] border border-line bg-panel p-5">
              <Users className="size-6 text-lemon" />
              <h3 className="text-[16px] font-bold sm:text-[17px]">{p.title}</h3>
              <p className="text-[14px] leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-ghost w-fit" onClick={() => join('Clipping team / agency')}>Apply as a team <ArrowRight /></button>
      </Section>

      <section id="clippers-join" className="gutter py-[clamp(44px,6vw,88px)] border-t border-hair">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
            <div className="eyebrow">Clipper application</div>
            <h2 className="display text-[clamp(36px,5.6vw,68px)]">JOIN AS A <span className="text-lemon">CLIPPER.</span></h2>
            <p className="max-w-md text-[17px] text-muted">Solo creators and full teams welcome. Every account is reviewed before campaign access.</p>
            <p className="text-[14px] text-muted">Artist, label or agency? <button type="button" className="text-lemon underline underline-offset-4" onClick={() => go('get-started')}>Get a promotion plan instead</button></p>
          </div>
          <div className="min-w-0 rounded-[28px] border border-line bg-panel"><JoinForm type={type} setType={setType} /></div>
        </div>
      </section>
    </>
  )
}
