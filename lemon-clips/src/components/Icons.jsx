const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const I = (d, vb = '0 0 24 24') => ({ className = 'size-5', ...p }) => (
  <svg viewBox={vb} className={className} aria-hidden="true" {...base} {...p}>{d}</svg>
)
export const ArrowRight = I(<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>)
export const ArrowUpRight = I(<><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>)
export const Play = I(<path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none" />)
export const Heart = I(<path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.5 6.6 4.5c2 0 3.4 1.1 5.4 3 2-1.9 3.4-3 5.4-3 3.6 0 5.4 3.7 3.8 6.9C19 15.6 12 20 12 20z" fill="currentColor" stroke="none" />)
export const Comment = I(<path d="M4 5h16v11H9l-5 4z" fill="currentColor" stroke="none" />)
export const Share = I(<path d="M14 4l7 7-7 7v-4c-5 0-8 1.5-11 5 1-6 4-10 11-11z" fill="currentColor" stroke="none" />)
export const Eye = I(<><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>)
export const Music = I(<><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>)
export const Check = I(<path d="m5 12 5 5L20 7" />)
export const X = I(<><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>)
export const Plus = I(<><path d="M12 5v14" /><path d="M5 12h14" /></>)
export const Menu = I(<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>)
export const Phone = I(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />)
export const Calendar = I(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>)
export const Chart = I(<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>)
export const Users = I(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.8c1.6.8 2.6 2.5 3 5.2" /></>)
export const Upload = I(<><path d="M12 16V4" /><path d="m6 10 6-6 6 6" /><path d="M4 20h16" /></>)
export const Wallet = I(<><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18M16 15h2" /></>)
export const Layers = I(<><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></>)
export const Bolt = I(<path d="M13 2 4 14h7l-1 8 9-12h-7z" />)
export const Target = I(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>)
export const Sliders = I(<><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></>)
export const Copy = I(<><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></>)

export function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0 animate-sway [animation-duration:7s]" aria-hidden="true">
        <ellipse cx="20" cy="20" rx="17" ry="13" transform="rotate(-35 20 20)" fill="#f6d23c" />
        <ellipse cx="20" cy="20" rx="11" ry="7.5" transform="rotate(-35 20 20)" fill="none" stroke="#14120a" strokeWidth="2.2" />
        <path d="M17 15.5v9l7.5-4.5z" fill="#14120a" />
        <circle cx="34" cy="6.5" r="3" fill="#f6d23c" />
      </svg>
      <span className="display text-[19px] leading-none tracking-[-.02em]">LEMON<span className="text-lemon">CLIPS</span></span>
    </span>
  )
}
export const Chat = I(<path d="M4 5h16v11h-9l-5 4v-4H4z" />)
export const FileText = I(<><path d="M14 3H6v18h12V7z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>)
export const Mail = I(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>)
export const Send = I(<path d="M21 3 3 10.5l7 2.5 2.5 7z" />)
export const ChevronLeft = I(<path d="m15 6-6 6 6 6" />)
export const ChevronRight = I(<path d="m9 6 6 6-6 6" />)
export const Quote = I(<path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6" />)
export const Volume = I(<><path d="M4 9v6h4l5 4V5L8 9z" /><path d="M16.5 8.5a5 5 0 0 1 0 7" /></>)
export const Mute = I(<><path d="M4 9v6h4l5 4V5L8 9z" /><path d="m17 9 5 6M22 9l-5 6" /></>)
