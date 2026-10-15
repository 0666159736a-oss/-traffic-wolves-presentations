import { useState } from 'react'
import { Plus } from './Icons.jsx'

export default function Accordion({ items, idPrefix = 'faq', defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="flex flex-col border-t border-hair">
      {items.map((it, i) => {
        const on = open === i
        return (
          <div key={it.q} className="border-b border-hair">
            <h3>
              <button type="button" id={`${idPrefix}-q${i}`} aria-expanded={on} aria-controls={`${idPrefix}-a${i}`} onClick={() => setOpen(on ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left">
                <span className={`text-[clamp(18px,2vw,22px)] font-semibold leading-snug transition-colors ${on ? 'text-lemon' : 'group-hover:text-lemon'}`}>{it.q}</span>
                <span className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${on ? 'rotate-45 border-lemon bg-lemon text-[#14120a]' : 'border-hair group-hover:border-lemon'}`}><Plus className="size-4" /></span>
              </button>
            </h3>
            <div id={`${idPrefix}-a${i}`} role="region" aria-labelledby={`${idPrefix}-q${i}`}
              className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: on ? '1fr' : '0fr' }}>
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 pr-14 text-[16.5px] leading-relaxed text-muted">{it.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
