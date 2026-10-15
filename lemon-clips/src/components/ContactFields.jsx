import { formOptions } from '../content/site.js'
import { EMAIL_RE, Field } from './Form.jsx'

// Country codes for the phone field. US first (default), then common markets.
export const COUNTRIES = [
  ['US', '+1'], ['CA', '+1'], ['GB', '+44'], ['AU', '+61'], ['DE', '+49'], ['FR', '+33'], ['ES', '+34'], ['IT', '+39'],
  ['NL', '+31'], ['SE', '+46'], ['BR', '+55'], ['MX', '+52'], ['CO', '+57'], ['AR', '+54'], ['NG', '+234'], ['ZA', '+27'],
  ['AE', '+971'], ['IN', '+91'], ['JP', '+81'], ['KR', '+82'], ['PH', '+63'], ['TR', '+90'], ['UA', '+380'], ['PL', '+48'],
  ['IL', '+972'], ['JM', '+1'], ['PR', '+1'],
]
const flag = (cc) => cc.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))

export const EMPTY_CONTACT = { name: '', email: '', country: 'US', phone: '', social: '', role: '', consent: false }

const SOCIAL_RE = /^(https?:\/\/)?(www\.|m\.|vm\.)?(instagram\.com|tiktok\.com)\/\S+/i

/** Normalizes the social field: accepts full links or links without https. */
export const socialUrl = (s) => (s.trim() && !/^https?:\/\//i.test(s.trim()) ? 'https://' + s.trim() : s.trim())
export const fullPhone = (v) => `${(COUNTRIES.find(([c]) => c === v.country) || COUNTRIES[0])[1]} ${v.phone.trim()}`

/** Validation shared by every client form. Returns { key: message }. */
export function validateContact(v, withConsent = true) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your name.'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email, like you@label.com.'
  const digits = v.phone.replace(/\D/g, '')
  if (digits.length < 6 || digits.length > 14) e.phone = 'Enter your phone or WhatsApp number (without the country code).'
  if (!SOCIAL_RE.test(v.social.trim())) e.social = 'Paste a link to your Instagram or TikTok profile, like instagram.com/yourname.'
  if (!v.role) e.role = 'Choose one.'
  if (withConsent && !v.consent) e.consent = 'Please confirm so we can contact you.'
  return e
}

/** The payload every form sends: phone in international format, normalized social link. */
export const contactPayload = (v) => ({ name: v.name.trim(), email: v.email.trim(), phone: fullPhone(v), social: socialUrl(v.social), role: v.role, consent: !!v.consent })

/** Name · Email · Phone/WhatsApp (country code) · Instagram/TikTok · I Am. */
export default function ContactFields({ prefix, v, set, errors, layout = 'grid' }) {
  const id = (k) => `${prefix}-${k}`
  const inv = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${id(k)}-err` : undefined })
  return (
    <div className={`grid gap-4 ${layout === 'wide' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
      <Field id={id('name')} label="Name" error={errors.name}>
        <input id={id('name')} className="field" autoComplete="name" value={v.name} onChange={set('name')} placeholder="Your name" {...inv('name')} />
      </Field>
      <Field id={id('email')} label="Email" error={errors.email}>
        <input id={id('email')} type="email" inputMode="email" className="field" autoComplete="email" value={v.email} onChange={set('email')} placeholder="you@label.com" {...inv('email')} />
      </Field>
      <Field id={id('phone')} label="Phone / WhatsApp" error={errors.phone}>
        <div className="flex gap-2">
          <label htmlFor={id('country')} className="sr-only">Country code</label>
          <select id={id('country')} className="field !w-[108px] shrink-0 !pr-7" value={v.country} onChange={set('country')} autoComplete="tel-country-code">
            {COUNTRIES.map(([c, code]) => <option key={c} value={c}>{flag(c)} {code}</option>)}
          </select>
          <input id={id('phone')} type="tel" inputMode="tel" className="field min-w-0" autoComplete="tel-national" value={v.phone} onChange={set('phone')} placeholder="310 555 0100" {...inv('phone')} />
        </div>
      </Field>
      <Field id={id('social')} label="Instagram / TikTok Profile" error={errors.social}>
        <input id={id('social')} type="url" inputMode="url" className="field" autoComplete="url" value={v.social} onChange={set('social')} placeholder="instagram.com/yourname" {...inv('social')} />
      </Field>
      <Field id={id('role')} label="I Am" error={errors.role}>
        <select id={id('role')} className="field" value={v.role} onChange={set('role')} {...inv('role')}>
          <option value="">Select</option>
          {formOptions.roles.map((r) => <option key={r}>{r}</option>)}
        </select>
      </Field>
    </div>
  )
}
