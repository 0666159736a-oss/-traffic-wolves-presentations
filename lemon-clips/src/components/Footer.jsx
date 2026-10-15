import { nav as allNav } from '../content/site.js'
import { cases } from '../content/cases.js'
import { managerChannels } from '../lib/integrations.js'
import { useNav } from '../lib/nav.jsx'
import { Logo } from './Icons.jsx'

const nav = allNav.filter((n) => n.needs !== 'cases' || cases.length)

export default function Footer() {
  const { go, open } = useNav()
  const channels = managerChannels()
  const link = 'text-left text-cream/80 hover:text-lemon w-fit'
  return (
    <footer className="gutter mt-[clamp(24px,4vw,48px)] border-t border-hair" style={{ paddingBottom: 'max(32px, env(safe-area-inset-bottom, 0px))' }}>
      <div className="wrap grid gap-8 pt-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex max-w-sm flex-col gap-3 sm:col-span-2 md:col-span-1">
          <Logo />
          <p className="text-[15px] leading-relaxed text-muted">Music promotion, creator-powered campaigns and full-service SMM for artists, labels and agencies.</p>
          {channels.map((c) => <p key={c.id} className="text-[14px]"><span className="text-muted">{c.label}: </span><span className="select-all">{c.value}</span></p>)}
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow mb-1">Explore</div>
          {nav.map((n) => <button key={n.to} type="button" onClick={() => go(n.to)} className={link}>{n.label}</button>)}
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow mb-1">Get started</div>
          <button type="button" onClick={() => open('presentation')} className={link}>Get a free presentation</button>
          <button type="button" onClick={() => open('manager')} className={link}>Contact a manager</button>
          <button type="button" onClick={() => open('session')} className={link}>Book a strategy session</button>
          <button type="button" onClick={() => go('clippers-join')} className={link}>Join as a clipper</button>
        </div>
      </div>
      <div className="wrap mt-10 flex flex-col gap-2 border-t border-hair pt-5 text-[13px] text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Lemon Clips. All rights reserved.</span>
        <span>Results depend on content, audience and platform.</span>
      </div>
    </footer>
  )
}
