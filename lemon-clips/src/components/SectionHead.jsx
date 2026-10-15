export default function SectionHead({ eyebrow, title, text, align = 'split', children }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center flex flex-col items-center gap-5' : align === 'left' ? 'flex flex-col gap-5' : 'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'}>
      <div className="flex flex-col gap-4 min-w-0">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="display text-[clamp(40px,6.4vw,84px)]">
          {title.map((line, i) => (
            <span key={i} className={`block ${i === title.length - 1 ? 'text-lemon' : ''}`}>{line}</span>
          ))}
        </h2>
      </div>
      {(text || children) && (
        <div className="min-w-0 text-muted text-[17px] leading-relaxed max-w-md lg:pb-2 lg:shrink-0">
          {text && <p>{text}</p>}
          {children}
        </div>
      )}
    </div>
  )
}
