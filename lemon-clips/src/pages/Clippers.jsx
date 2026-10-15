import { useState } from 'react'
import { clipperFormOptions, clipperHero, dashboardSample, earnSteps, joinSteps, payoutPoints, sampleCampaigns, teamPoints, uploadRules } from '../content/clippers.js'
import { submitClipperApplication } from '../lib/integrations.js'
import { scrollToId, useNav } from '../lib/nav.jsx'
import { fmtCompact } from '../lib/hooks.js'
import PhoneCard, { VideoArt } from '../components/PhoneCard.jsx'
import Modal from '../components/Modal.jsx'
import { Choice, EMAIL_RE, Field } from '../components/Form.jsx'
import { ArrowRight, Chart, Check, Music, Upload, Users, Wallet } from '../components/Icons.jsx'

const Section = ({ id, n, eyebrow, title, children, className = '' }) => (
  <section id={id} className={`gutter py-[clamp(64px,9vw,110px)] border-t border-hair ${className}`}>
    <div className="wrap flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="eyebrow flex items-center gap-3"><span className="font-mono text-muted">{n}</span>{eyebrow}</div>
        <h2 className="display text-[clamp(36px,5.5vw,68px)]">{title}</h2>
      </div>
      {children}
    </div>
  </section>
)

function Hero({ join }) {
  return (
    <section className="gutter overflow-hidden">
      <div className="wrap grid items-center gap-12 pt-8 pb-16 lg:grid-cols-[1.25fr_1fr] lg:pt-14 lg:pb-24">
        <div className="flex flex-col gap-7 min-w-0">
          <div className="eyebrow flex items-center gap-2.5"><span className="h-px w-8 bg-lemon" />{clipperHero.eyebrow}</div>
          <h1 className="display text-[clamp(48px,6.4vw,94px)]">
            {clipperHero.title.map((l, i) => <span key={i} className={`block animate-rise ${i === 1 ? 'text-lemon' : ''}`} style={{ animationDelay: `${i * 90}ms` }}>{l}</span>)}
          </h1>
          <p className="max-w-[34rem] text-[clamp(18px,2vw,22px)] leading-[1.45] text-cream/85">{clipperHero.subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn btn-primary !min-h-[56px] !px-7" onClick={() => join()}>Join as a clipper <ArrowRight /></button>
            <button type="button" className="btn btn-ghost !min-h-[56px] !px-7" onClick={() => scrollToId('clippers-campaigns')}>Explore music campaigns</button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[460px]" aria-label="Illustration of the clipper dashboard with sample figures" role="img">
          <div className="absolute -left-2 top-10 z-0 w-[38%] rotate-[-7deg] animate-float">
            <PhoneCard hue={48} variant="figure" handle="@yourpage" sound="Campaign Track · Artist" tick={[24800, 160]} />
          </div>
          <div className="relative z-10 ml-auto w-[74%] rounded-[26px] border border-line bg-panel p-5 shadow-[0_40px_90px_-30px_#000] flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="eyebrow !text-[11px]">Earnings</span>
              <span className="demo-tag">Sample</span>
            </div>
            <div className="display tnum text-[clamp(38px,6vw,54px)]">$0,000<span className="text-muted text-[0.5em]">.00</span></div>
            <div className="flex h-20 items-end gap-1.5" aria-hidden="true">
              {dashboardSample.performance.map((p, i) => (
                <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-gold/50 to-lemon" style={{ height: `${p}%` }} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[['Videos', 'Approved'], ['Views', 'Eligible'], ['Payout', 'Pending']].map(([a, b]) => (
                <div key={a} className="rounded-xl border border-hair px-2 py-2.5">
                  <div className="text-[13px] font-semibold">{a}</div>
                  <div className="text-[11px] text-muted">{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-20 -mt-6 ml-[18%] w-fit rounded-full border border-line bg-ink/90 px-4 py-2 text-[12.5px] font-medium backdrop-blur flex items-center gap-2">
            <span className="size-2 rounded-full bg-ok" /> Video approved · counting views
          </div>
        </div>
      </div>
    </section>
  )
}

function Estimator() {
  const [rate, setRate] = useState('')
  const [views, setViews] = useState(100000)
  const r = parseFloat(rate)
  const est = Number.isFinite(r) && r >= 0 ? (views / 1000) * r : null
  return (
    <div className="grid gap-6 rounded-[26px] border border-line bg-panel p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="display text-[26px]">Earnings calculator</h3>
          <p className="text-muted text-[15px] mt-1">Each campaign shows its own rate. Enter it here to see what your eligible views would pay.</p>
        </div>
        <Field id="est-rate" label="Campaign rate (USD per 1,000 eligible views)">
          <input id="est-rate" className="field tnum" inputMode="decimal" placeholder="Enter the rate shown on the campaign" value={rate} onChange={(e) => setRate(e.target.value.replace(/[^\d.]/g, ''))} />
        </Field>
        <div className="flex flex-col gap-2">
          <label htmlFor="est-views" className="flex justify-between text-[13.5px] font-semibold"><span>Eligible views</span><span className="tnum text-lemon">{views.toLocaleString('en-US')}</span></label>
          <input id="est-views" type="range" min="10000" max="2000000" step="10000" value={views} onChange={(e) => setViews(+e.target.value)} className="w-full accent-[#f6d23c]" />
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl border border-hair bg-ink/60 p-6">
        <span className="text-[12px] font-mono uppercase tracking-wider text-muted">Estimated earnings</span>
        <span className="display tnum text-[clamp(44px,6vw,64px)] text-lemon">{est == null ? '$—' : '$' + est.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
        <span className="text-[13px] text-muted">Estimate only. Final payouts depend on review, eligibility rules and the campaign budget.</span>
      </div>
    </div>
  )
}

function Campaigns({ join }) {
  const [platform, setPlatform] = useState('All')
  const [open, setOpen] = useState(null)
  const list = sampleCampaigns.filter((c) => platform === 'All' || c.platforms.includes(platform))
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter campaigns by platform">
          {['All', 'TikTok', 'Reels', 'Shorts'].map((p) => (
            <button key={p} type="button" role="tab" aria-selected={platform === p} onClick={() => setPlatform(p)}
              className={`min-h-[40px] rounded-full px-4 text-[14px] font-medium border transition-colors ${platform === p ? 'bg-cream text-ink border-cream' : 'border-hair text-cream/80 hover:border-lemon/60'}`}>{p}</button>
          ))}
        </div>
        <p className="text-[13px] text-muted max-w-md">These are <span className="text-warn">sample layouts</span>, not live offers. Approved clippers see real open campaigns inside the platform.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <article key={c.id} className="card-hover flex flex-col overflow-hidden rounded-[22px] border border-line bg-panel">
            <div className="relative h-36 overflow-hidden">
              <VideoArt hue={c.hue} variant={['eq', 'lyrics', 'figure'][i % 3]} />
              <span className="demo-tag absolute left-3 top-3 !bg-ink/80">Sample — not a live campaign</span>
              <span className="absolute right-3 bottom-3 rounded-full bg-ink/80 px-2.5 py-1 text-[11.5px]">{c.genre}</span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="flex items-center gap-3 min-w-0">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-lemon"><Music /></span>
                <div className="min-w-0">
                  <div className="font-bold truncate">{c.track}</div>
                  <div className="text-[14px] text-muted truncate">{c.artist}</div>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-3 border-y border-hair py-4">
                <div><dt className="text-[11px] font-mono uppercase tracking-wider text-muted">Rate / 1K views</dt><dd className="text-[18px] font-bold tnum">{c.rate ?? '$—'}</dd></div>
                <div><dt className="text-[11px] font-mono uppercase tracking-wider text-muted">Budget left</dt><dd className="text-[18px] font-bold tnum">{c.budget ?? '$—'}</dd></div>
              </dl>
              <div className="flex flex-wrap gap-1.5">
                {c.platforms.map((p) => <span key={p} className="rounded-full border border-hair px-2.5 py-1 text-[12px] text-cream/80">{p}</span>)}
              </div>
              <button type="button" className="btn btn-ghost mt-auto w-full !min-h-[44px]" onClick={() => setOpen(c)}>View brief</button>
            </div>
          </article>
        ))}
      </div>
      <Modal open={!!open} onClose={() => setOpen(null)} label="Campaign brief">
        {open && (
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <span className="demo-tag w-fit">Sample — not a live campaign</span>
            <div className="pr-8">
              <div className="eyebrow">{open.genre} · Campaign brief</div>
              <h3 className="display text-[32px] mt-2">{open.track}</h3>
              <p className="text-muted">{open.artist}</p>
            </div>
            <ul className="flex flex-col gap-3 text-[15px]">
              {[['Sound', 'Official track sound, linked in the campaign'], ['Platforms', open.platforms.join(', ')], ['Rate', 'Set per campaign, per 1,000 eligible views'], ['Budget', 'Shown live; the campaign closes when it is spent'], ['Creative direction', 'Vibe, references and do-not-do list from the artist']].map(([k, v]) => (
                <li key={k} className="flex flex-col gap-0.5 border-b border-hair pb-3"><span className="text-[12px] font-mono uppercase tracking-wider text-muted">{k}</span>{v}</li>
              ))}
            </ul>
            <button type="button" className="btn btn-primary" onClick={() => { setOpen(null); setTimeout(() => join(), 60) }}>Join to access live campaigns <ArrowRight /></button>
          </div>
        )}
      </Modal>
    </>
  )
}

function UploadFlow() {
  const steps = [['Paste link', 'tiktok.com/@yourpage/video/…'], ['Auto-check', 'Sound, account and date verified'], ['Review', 'Team approves compliant videos'], ['Counting', 'Eligible views tracked daily']]
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {steps.map(([t, d], i) => (
        <li key={t} className="flex items-start gap-4 rounded-2xl border border-hair bg-ink/50 p-4">
          <span className={`grid size-9 shrink-0 place-items-center rounded-full font-mono text-[13px] font-bold ${i === 3 ? 'bg-lemon text-[#14120a]' : 'border border-line text-lemon'}`}>{i + 1}</span>
          <div className="min-w-0"><div className="font-semibold">{t}</div><div className="text-[13.5px] text-muted break-words">{d}</div></div>
        </li>
      ))}
    </ol>
  )
}

const STATUS = { Approved: 'text-ok bg-ok/12', 'In review': 'text-warn bg-warn/12', Rejected: 'text-bad bg-bad/12' }

function PlatformPreview() {
  const tabs = [['submissions', 'Submissions', Upload], ['performance', 'Performance', Chart], ['earnings', 'Earnings', Wallet], ['teams', 'Teams', Users]]
  const [tab, setTab] = useState('submissions')
  const s = dashboardSample
  const max = Math.max(...s.performance)
  return (
    <div className="overflow-hidden rounded-[26px] border border-line bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hair p-3 sm:p-4">
        <div className="flex gap-1 overflow-x-auto" role="tablist" aria-label="Platform preview">
          {tabs.map(([id, label, Icon]) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${tab === id ? 'bg-lemon text-[#14120a]' : 'text-cream/75 hover:text-cream'}`}>
              <Icon className="size-4" />{label}
            </button>
          ))}
        </div>
        <span className="demo-tag">Sample data</span>
      </div>
      <div className="p-4 sm:p-6 min-h-[300px]" role="tabpanel">
        {tab === 'submissions' && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-[14.5px]">
              <thead><tr className="text-[11.5px] font-mono uppercase tracking-wider text-muted"><th className="pb-3 font-medium">Video</th><th className="pb-3 font-medium">Platform</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium text-right">Views</th></tr></thead>
              <tbody>
                {s.submissions.map((r) => (
                  <tr key={r.video} className="border-t border-hair">
                    <td className="py-3.5 font-medium">{r.video}</td>
                    <td className="py-3.5 text-muted">{r.platform}</td>
                    <td className="py-3.5"><span className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${STATUS[r.status]}`}>{r.status}</span></td>
                    <td className="py-3.5 text-right tnum">{r.views ? r.views.toLocaleString('en-US') : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === 'performance' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-6">
              <div><div className="text-[12px] font-mono uppercase tracking-wider text-muted">Eligible views, 14 days</div><div className="display text-[40px] tnum">{fmtCompact(92650)}</div></div>
              <div><div className="text-[12px] font-mono uppercase tracking-wider text-muted">Approved videos</div><div className="display text-[40px] tnum">2</div></div>
            </div>
            <div className="flex h-40 items-end gap-1.5 border-b border-hair" aria-label="Daily views bar chart, sample data">
              {s.performance.map((p, i) => (
                <span key={i} className="group relative flex-1 rounded-t bg-lemon/80 hover:bg-lemon transition-colors" style={{ height: `${(p / max) * 100}%` }}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block text-[11px] tnum text-lemon">{p}K</span>
                </span>
              ))}
            </div>
            <div className="flex justify-between text-[11.5px] text-muted font-mono"><span>Day 1</span><span>Day 14</span></div>
          </div>
        )}
        {tab === 'earnings' && (
          <div className="grid gap-4 sm:grid-cols-3">
            {[['Confirmed', 'Approved views × campaign rate'], ['Pending review', 'Views on videos still in review'], ['Paid out', 'Sent on the payout schedule']].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-2 rounded-2xl border border-hair p-5">
                <span className="text-[12px] font-mono uppercase tracking-wider text-muted">{k}</span>
                <span className="display text-[34px] tnum">$—</span>
                <span className="text-[13.5px] text-muted">{v}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 'teams' && (
          <div className="flex flex-col gap-3">
            {s.team.map((m) => (
              <div key={m.name} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-hair p-4">
                <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-panel-2 font-bold text-lemon">{m.name.slice(-1)}</span><span className="font-semibold">{m.name}</span></div>
                <div className="flex gap-6 text-[14px] text-muted tnum"><span><b className="text-cream">{m.pages}</b> pages</span><span><b className="text-cream">{m.videos}</b> videos</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function JoinForm({ type, setType }) {
  const [v, setV] = useState({ name: '', email: '', platforms: [], accounts: '', volume: '' })
  const [err, setErr] = useState({})
  const [state, setState] = useState(null)
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
    setErr(x)
    if (Object.keys(x).length) { document.getElementById(Object.keys(x)[0])?.focus(); return }
    setState('sending')
    const r = await submitClipperApplication({ ...v, type })
    setState(r.ok ? r.mode : null)
    if (!r.ok) setErr({ form: r.error })
  }

  if (state === 'demo' || state === 'live') {
    return (
      <div className="flex flex-col items-start gap-5 p-6 sm:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-lemon text-[#14120a]"><Check className="size-7" /></span>
        <h3 className="display text-[clamp(28px,4vw,42px)]">Application received.<br /><span className="text-lemon">We’ll review your accounts.</span></h3>
        <p className="text-muted max-w-md">When you’re approved, you’ll get access to live music campaigns, submissions and earnings tracking.</p>
        {state === 'demo' && <p className="demo-tag">Demo mode · nothing was sent. Connect clipperWebhookUrl in content/site.js</p>}
        <button type="button" className="btn btn-ghost" onClick={() => { setState(null); setV({ name: '', email: '', platforms: [], accounts: '', volume: '' }) }}>Submit another application</button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={submit} className="grid gap-5 p-6 sm:grid-cols-2 sm:p-10">
      <Field id="cname" label="Name or team name" error={err.cname}><input id="cname" className="field" value={v.name} onChange={set('name')} autoComplete="name" aria-invalid={!!err.cname} /></Field>
      <Field id="cemail" label="Email" error={err.cemail}><input id="cemail" type="email" className="field" value={v.email} onChange={set('email')} autoComplete="email" aria-invalid={!!err.cemail} /></Field>
      <div className="sm:col-span-2"><Field id="ctype" label="I am a…" error={err.ctype}><Choice id="ctype" options={clipperFormOptions.types} value={type} onChange={(t) => { setType(t); setErr((e) => ({ ...e, ctype: undefined })) }} error={err.ctype} /></Field></div>
      <div className="sm:col-span-2"><Field id="cplatforms" label="Platforms you post on" error={err.cplatforms}><Choice id="cplatforms" options={clipperFormOptions.platforms} value={v.platforms} onChange={set('platforms')} error={err.cplatforms} /></Field></div>
      <div className="sm:col-span-2"><Field id="caccounts" label="Account links or @handles" error={err.caccounts} hint="One per line. Teams can list their main pages."><textarea id="caccounts" className="field" value={v.accounts} onChange={set('accounts')} placeholder={'@yourpage\nhttps://www.tiktok.com/@yourpage'} aria-invalid={!!err.caccounts} /></Field></div>
      <Field id="cvolume" label="Typical weekly volume" error={err.cvolume}>
        <select id="cvolume" className="field" value={v.volume} onChange={set('volume')} aria-invalid={!!err.cvolume}>
          <option value="">Select</option>
          {clipperFormOptions.volumes.map((o) => <option key={o}>{o}</option>)}
        </select>
      </Field>
      <div className="flex items-end">
        <button type="submit" className="btn btn-primary w-full" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : <>Apply to join <ArrowRight /></>}</button>
      </div>
      {err.form && <p className="text-bad text-[14px] sm:col-span-2" role="alert">{err.form}</p>}
    </form>
  )
}

export default function Clippers() {
  const { go } = useNav()
  const [type, setType] = useState('')
  const join = (t) => { if (t) setType(t); scrollToId('clippers-join') }

  return (
    <>
      <Hero join={join} />

      <Section id="clippers-earn" n="01" eyebrow="How earning works" title={<>CREATE. POST.<br /><span className="text-lemon">GET PAID ON VIEWS.</span></>}>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {earnSteps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-3 rounded-[22px] border border-line bg-panel p-6">
              <span className="font-mono text-[13px] text-lemon">Step {i + 1}</span>
              <h3 className="text-[20px] font-bold">{s.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
        <Estimator />
      </Section>

      <Section id="clippers-campaigns" n="02" eyebrow="Music campaigns" title={<>PICK A TRACK.<br /><span className="text-lemon">MAKE IT MOVE.</span></>}>
        <Campaigns join={join} />
      </Section>

      <Section n="03" eyebrow="How to join" title={<>THREE STEPS<br /><span className="text-lemon">TO YOUR FIRST CAMPAIGN.</span></>}>
        <ol className="grid gap-4 md:grid-cols-3">
          {joinSteps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-[22px] border border-hair p-6">
              <span className="display text-[44px] text-lemon !leading-none">{i + 1}</span>
              <div><h3 className="text-[19px] font-bold">{s.title}</h3><p className="text-muted text-[15px] mt-1 leading-relaxed">{s.text}</p></div>
            </li>
          ))}
        </ol>
      </Section>

      <Section n="04" eyebrow="Uploading videos" title={<>POST IT RIGHT.<br /><span className="text-lemon">GET IT COUNTED.</span></>}>
        <div className="grid gap-8 lg:grid-cols-2">
          <ul className="flex flex-col gap-3">
            {uploadRules.map((r) => <li key={r} className="flex gap-3 text-[16px] leading-relaxed"><Check className="mt-1 size-5 shrink-0 text-lemon" />{r}</li>)}
          </ul>
          <UploadFlow />
        </div>
      </Section>

      <Section id="clippers-track" n="05" eyebrow="Tracking results" title={<>EVERY VIDEO.<br /><span className="text-lemon">EVERY VIEW.</span></>}>
        <p className="text-muted text-[17px] max-w-2xl -mt-4">Submissions, performance, earnings and team stats live in the clipper dashboard. Here is a preview with sample data.</p>
        <PlatformPreview />
      </Section>

      <Section n="06" eyebrow="Payouts" title={<>CLEAR RULES.<br /><span className="text-lemon">CLEAR PAYOUTS.</span></>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {payoutPoints.map((p) => (
            <div key={p.title} className="flex flex-col gap-2 border-t-2 border-lemon pt-5">
              <h3 className="text-[19px] font-bold">{p.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n="07" eyebrow="For clipping teams" title={<>RUN A TEAM?<br /><span className="text-lemon">SCALE WITH US.</span></>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamPoints.map((p) => (
            <div key={p.title} className="flex flex-col gap-2 rounded-[22px] border border-line bg-panel p-6">
              <Users className="size-6 text-lemon" />
              <h3 className="text-[19px] font-bold mt-2">{p.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-ghost w-fit" onClick={() => join('Clipping team / agency')}>Apply as a team <ArrowRight /></button>
      </Section>

      <section id="clippers-join" className="gutter py-[clamp(64px,9vw,110px)] border-t border-hair">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <div className="eyebrow">Clipper application</div>
            <h2 className="display text-[clamp(40px,6vw,72px)]">JOIN AS A<br /><span className="text-lemon">CLIPPER.</span></h2>
            <p className="text-muted text-[17px] max-w-md">Solo creators and full teams welcome. We review every account before granting campaign access.</p>
            <p className="text-[14px] text-muted">Are you an artist or label? <button type="button" className="text-lemon underline underline-offset-4" onClick={() => go('apply')}>Launch a campaign instead</button></p>
          </div>
          <div className="rounded-[30px] border border-line bg-panel min-w-0"><JoinForm type={type} setType={setType} /></div>
        </div>
      </section>
    </>
  )
}
