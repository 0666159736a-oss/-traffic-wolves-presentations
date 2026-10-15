// Brand lemons drawn in the style of the logo. Decorative only (aria-hidden).

/** Whole lemon: rotated body, two tips, leaf and highlight. */
export function Lemon({ className = '', anim = 'sway', style }) {
  const a = { sway: 'animate-sway', bob: 'animate-bob', spin: 'animate-spin-slow', none: '' }[anim]
  return (
    <svg viewBox="0 0 64 64" className={`${a} ${className}`} style={style} aria-hidden="true">
      <g transform="rotate(-35 32 34)">
        <ellipse cx="32" cy="34" rx="22" ry="16" fill="#f6d23c" />
        <ellipse cx="9.5" cy="34" rx="3.6" ry="3" fill="#f6d23c" />
        <ellipse cx="54.5" cy="34" rx="3.6" ry="3" fill="#e9bf22" />
        <ellipse cx="25" cy="27" rx="9" ry="4" fill="#fff6c2" opacity=".55" />
        <ellipse cx="32" cy="34" rx="22" ry="16" fill="none" stroke="#c99a12" strokeOpacity=".35" strokeWidth="1.5" />
      </g>
      <path d="M44 9c7-3 13-1 15 3-6 3-12 2-15-3z" fill="#7cc46b" />
      <path d="M44 9c-1 3-2 5-4 7" stroke="#5e9e50" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/** Lemon slice: reads like a vinyl from far away — the brand's lemon + music idea. */
export function LemonSlice({ className = '', anim = 'spin', style }) {
  const a = { sway: 'animate-sway', bob: 'animate-bob', spin: 'animate-spin-slow', none: '' }[anim]
  const segs = Array.from({ length: 8 }, (_, i) => i * 45)
  return (
    <svg viewBox="0 0 64 64" className={`${a} ${className}`} style={style} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#f6d23c" />
      <circle cx="32" cy="32" r="26" fill="#fff3b0" />
      <circle cx="32" cy="32" r="24" fill="#f8dc5a" />
      {segs.map((d) => <line key={d} x1="32" y1="32" x2="32" y2="9" stroke="#fff3b0" strokeWidth="2.4" strokeLinecap="round" transform={`rotate(${d} 32 32)`} />)}
      <circle cx="32" cy="32" r="3.5" fill="#fff3b0" />
    </svg>
  )
}

/** Small row of lemons used as a transition between sections. */
export function LemonDivider() {
  return (
    <div className="gutter" aria-hidden="true">
      <div className="wrap flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
        <LemonSlice className="size-6 opacity-80" />
        <Lemon className="size-9" anim="bob" />
        <LemonSlice className="size-6 opacity-80" style={{ animationDirection: 'reverse' }} />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
      </div>
    </div>
  )
}
