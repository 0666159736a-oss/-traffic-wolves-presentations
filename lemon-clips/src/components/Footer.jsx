import { config, nav } from '../content/site.js'
import { useNav } from '../lib/nav.jsx'
import { Logo } from './Icons.jsx'

export default function Footer() {
  const { go } = useNav()
  return (
    <footer className="gutter border-t border-hair" style={{ paddingBottom: 'max(40px, env(safe-area-inset-bottom, 0px))' }}>
      <div className="wrap grid gap-10 pt-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4 max-w-sm">
          <Logo />
          <p className="text-muted text-[15px] leading-relaxed">Music promotion at scale through creator-made short-form video on TikTok, Instagram Reels and YouTube Shorts.</p>
          {config.email && <p className="text-[15px] select-all">{config.email}</p>}
          {config.phone && <p className="text-[15px] select-all tnum">{config.phone}</p>}
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow mb-1">Explore</div>
          {nav.map((n) => (
            <button key={n.to} type="button" onClick={() => go(n.to)} className="text-left text-cream/80 hover:text-lemon w-fit">{n.label}</button>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow mb-1">Get started</div>
          <button type="button" onClick={() => go('apply')} className="text-left text-cream/80 hover:text-lemon w-fit">Launch a campaign</button>
          <button type="button" onClick={() => go('book')} className="text-left text-cream/80 hover:text-lemon w-fit">Book a call</button>
          <button type="button" onClick={() => go('clippers-join')} className="text-left text-cream/80 hover:text-lemon w-fit">Join as a clipper</button>
        </div>
      </div>
      <div className="wrap mt-12 flex flex-col gap-2 border-t border-hair pt-6 text-[13px] text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Lemon Clips. All rights reserved.</span>
        <span>Views depend on content, audience and platform. Results vary by campaign.</span>
      </div>
    </footer>
  )
}
