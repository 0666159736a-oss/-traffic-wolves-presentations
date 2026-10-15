export function Field({ id, label, error, optional, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[13.5px] font-semibold text-cream/90">
        <span>{label}</span>
        {optional && <span className="text-[12px] font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="text-[13px] text-bad" role="alert">{error}</p>
      ) : hint ? (
        <p className="text-[12.5px] text-muted">{hint}</p>
      ) : null}
    </div>
  )
}

/** Pill group that behaves like radio buttons. */
export function Choice({ id, options, value, onChange, error }) {
  return (
    <div id={id} role="radiogroup" aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = Array.isArray(value) ? value.includes(o) : value === o
        return (
          <button key={o} type="button" role={Array.isArray(value) ? 'checkbox' : 'radio'} aria-checked={on}
            onClick={() => onChange(Array.isArray(value) ? (on ? value.filter((v) => v !== o) : [...value, o]) : o)}
            className={`min-h-[42px] rounded-full border px-4 text-[14px] font-medium transition-colors ${on ? 'border-lemon bg-lemon text-[#14120a]' : 'border-hair bg-white/[.03] text-cream/85 hover:border-lemon/60'}`}>
            {o}
          </button>
        )
      })}
    </div>
  )
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE_RE = /^\+?[\d\s().-]{7,20}$/
export const isUrl = (s) => { try { const u = new URL(s.trim()); return /^https?:$/.test(u.protocol) && u.hostname.includes('.') } catch { return false } }
