import Video from './Video.jsx'
import { Play } from './Icons.jsx'

/** A real campaign clip: poster image (or video) with its published view count. */
export default function Clip({ src, videoUrl, views, className = '', sizes = 'text-[11px]' }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-panel-2 ${className}`}>
      {videoUrl
        ? <Video src={videoUrl} poster={src} className="absolute inset-0" />
        : <img src={src} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />}
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/60 to-transparent" />
      {views && (
        <span className={`tnum absolute left-2 top-2 inline-flex items-center gap-1 font-bold text-white ${sizes}`}>
          <Play className="size-[1.1em]" />{views}
        </span>
      )}
    </div>
  )
}
