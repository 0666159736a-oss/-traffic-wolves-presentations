import { Comment, Eye, Heart, Music, Play, Share } from './Icons.jsx'
import { fmtCompact, useTicker } from '../lib/hooks.js'

/** Abstract stand-in for a short-form video frame (used until real video/poster files are added). */
export function VideoArt({ hue = 48, variant = 'figure', label }) {
  const bg = `radial-gradient(120% 70% at 30% 15%, hsl(${hue} 85% 58% / .85), transparent 60%),
              radial-gradient(90% 60% at 90% 90%, hsl(${(hue + 40) % 360} 70% 40% / .9), transparent 70%),
              linear-gradient(180deg, hsl(${hue} 35% 16%), hsl(${hue} 30% 6%))`
  return (
    <div className="absolute inset-0 grain" style={{ background: bg }} aria-hidden="true">
      {variant === 'figure' && (
        <svg viewBox="0 0 100 200" className="absolute inset-x-0 bottom-0 w-full h-[78%]" preserveAspectRatio="xMidYMax meet">
          <g className="origin-bottom animate-float" style={{ animationDuration: '3.2s' }}>
            <circle cx="50" cy="62" r="14" fill="rgb(0 0 0 / .55)" />
            <path d="M24 200c0-50 6-92 26-108 20 16 26 58 26 108z" fill="rgb(0 0 0 / .55)" />
            <path d="M30 104 8 70M70 104l24-30" stroke="rgb(0 0 0 / .55)" strokeWidth="9" strokeLinecap="round" />
          </g>
        </svg>
      )}
      {variant === 'lyrics' && (
        <div className="absolute inset-x-[10%] top-[34%] flex flex-col gap-2">
          {['when the beat', 'drops at', '0:14'].map((w, i) => (
            <span key={i} className="display text-white/90 text-[clamp(14px,2.2vw,22px)] leading-none" style={{ opacity: 1 - i * 0.18 }}>{w}</span>
          ))}
        </div>
      )}
      {variant === 'eq' && (
        <div className="absolute inset-x-[14%] bottom-[30%] h-[28%] flex items-end gap-[6%]">
          {[0.6, 1, 0.75, 0.9, 0.5, 0.8, 0.65].map((h, i) => (
            <span key={i} className="flex-1 rounded-full bg-white/75 origin-bottom animate-eq" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
      )}
      {label && <span className="absolute left-3 top-3 text-[10px] font-mono uppercase tracking-wider text-white/70">{label}</span>}
    </div>
  )
}

/** Phone with a vertical-video UI. `views` = static number; `tick` = [start, perSecond] for a live-feel counter. */
export default function PhoneCard({ hue, variant, handle = '@creator', sound = 'Your Track · Artist', platform = 'TikTok', views, tick, videoUrl, poster, className = '', style }) {
  const live = useTicker(tick?.[0] ?? 0, tick?.[1] ?? 0)
  const shown = tick ? live : views
  return (
    <div className={`phone ${className}`} style={style}>
      <div className="phone-screen">
        {videoUrl ? (
          <video className="absolute inset-0 size-full object-cover" src={videoUrl} poster={poster} muted loop playsInline autoPlay />
        ) : (
          <VideoArt hue={hue} variant={variant} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
        <div className="absolute left-2.5 right-2.5 top-2.5 flex items-center justify-between text-white">
          <span className="rounded-full bg-black/45 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide backdrop-blur">{platform}</span>
          {shown != null && (
            <span className="tnum inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-bold backdrop-blur">
              <Eye className="size-3" /> {fmtCompact(shown)}
            </span>
          )}
        </div>
        <div className="absolute right-2 bottom-[18%] flex flex-col items-center gap-3 text-white/95">
          <Heart className="size-4" /><Comment className="size-4" /><Share className="size-4" />
        </div>
        <div className="absolute left-2.5 right-9 bottom-3 text-white">
          <div className="text-[11px] font-bold truncate">{handle}</div>
          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/85 overflow-hidden">
            <Music className="size-3 shrink-0" />
            <span className="truncate">{sound}</span>
          </div>
        </div>
        <span className="absolute right-2 bottom-2.5 grid size-6 place-items-center rounded-full bg-[conic-gradient(#222,#555,#222,#555,#222)] animate-spin-slow ring-2 ring-white/20" aria-hidden="true">
          <span className="size-2 rounded-full bg-lemon" />
        </span>
        {!videoUrl && (
          <span className="absolute inset-0 grid place-items-center opacity-0 hover:opacity-100 transition-opacity" aria-hidden="true">
            <span className="grid size-11 place-items-center rounded-full bg-black/40 text-white backdrop-blur"><Play className="size-4" /></span>
          </span>
        )}
      </div>
    </div>
  )
}
