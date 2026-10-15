import { useNav } from '../lib/nav.jsx'
import { ArrowRight, Calendar, Chat, FileText } from './Icons.jsx'

/** The three primary actions. Used in the hero and the final block. */
export default function Actions({ className = '' }) {
  const { open } = useNav()
  return (
    <div className={`grid gap-3 sm:grid-cols-3 ${className}`}>
      <button type="button" className="btn btn-primary !min-h-[56px] !whitespace-normal text-center" onClick={() => open('presentation')}>
        <FileText className="size-5 shrink-0" /> Get a free presentation
      </button>
      <button type="button" className="btn btn-ghost !min-h-[56px] !whitespace-normal text-center" onClick={() => open('manager')}>
        <Chat className="size-5 shrink-0" /> Contact a manager
      </button>
      <button type="button" className="btn btn-ghost !min-h-[56px] !whitespace-normal text-center" onClick={() => open('session')}>
        <Calendar className="size-5 shrink-0" /> Book a personal strategy session
      </button>
    </div>
  )
}
