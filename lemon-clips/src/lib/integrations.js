// ─────────────────────────────────────────────────────────────
// Integration layer. Components only call the functions below.
// Configure endpoints in content/site.js, or replace the bodies with an SDK
// (HubSpot, Salesforce, Resend, Mailchimp…). Every function resolves to:
//   { status: 'sent' }            the endpoint accepted the request
//   { status: 'not-connected' }   no endpoint configured — nothing was sent, and the UI says so
//   { status: 'error', error }    the endpoint failed
// ─────────────────────────────────────────────────────────────
import { config } from '../content/site.js'

async function post(url, payload) {
  if (!url) return { status: 'not-connected' }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, source: 'lemon-clips-site', page: location.href, submittedAt: new Date().toISOString() }),
    })
    return res.ok ? { status: 'sent' } : { status: 'error', error: `The server answered ${res.status}. Please try again or contact a manager.` }
  } catch {
    return { status: 'error', error: 'We could not reach the server. Check your connection and try again.' }
  }
}

/** Short lead form (top and bottom of the homepage). → CRM + team notification. */
export const submitLead = (lead) => post(config.leadWebhookUrl, { type: 'lead', ...lead })

/**
 * Free presentation request. Your email automation should listen for type 'presentation'
 * and send the PDF at config.presentationPdfUrl to `email`.
 */
export const requestPresentation = (req) =>
  post(config.leadWebhookUrl, { type: 'presentation', pdf: config.presentationPdfUrl || undefined, ...req })

/** Contact-a-manager callback request. */
export const requestCallback = (req) => post(config.leadWebhookUrl, { type: 'callback', ...req })

/** Contact details captured before the booking calendar opens (phone + social are kept even if the calendar doesn't ask). */
export const submitSessionContact = (req) => post(config.leadWebhookUrl, { type: 'session', ...req })

/** Clipper / clipping-team application. */
export const submitClipperApplication = (app) =>
  post(config.clipperWebhookUrl || config.leadWebhookUrl, { type: 'clipper', ...app })

/** Manager channels that are actually configured. */
export function managerChannels() {
  const out = []
  if (config.whatsapp) out.push({ id: 'whatsapp', label: 'WhatsApp', value: '+' + config.whatsapp.replace(/\D/g, ''), href: `https://wa.me/${config.whatsapp.replace(/\D/g, '')}` })
  if (config.telegram) out.push({ id: 'telegram', label: 'Telegram', value: '@' + config.telegram.replace(/^@/, ''), href: `https://t.me/${config.telegram.replace(/^@/, '')}` })
  if (config.email) out.push({ id: 'email', label: 'Email', value: config.email, href: `mailto:${config.email}` })
  return out
}

/**
 * Calendly / Cal.com embed URL, prefilled with the contact details the visitor already entered.
 * Calendly: name, email, and custom questions a1 (phone) / a2 (social) / a3 (I am) — create them in that order.
 * Cal.com: name, email, plus booking questions with identifiers phone, social and role.
 */
export function calendarEmbedUrl(contact) {
  const u = config.calendarUrl
  if (!u) return ''
  try {
    const url = new URL(u)
    const set = (k, v) => v && url.searchParams.set(k, v)
    if (url.hostname.includes('calendly.com')) {
      set('hide_gdpr_banner', '1'); set('background_color', '100f0b'); set('text_color', 'f6f3ea'); set('primary_color', 'f6d23c')
      if (contact) { set('name', contact.name); set('email', contact.email); set('a1', contact.phone); set('a2', contact.social); set('a3', contact.role) }
    }
    if (url.hostname.includes('cal.com')) {
      set('embed', 'true'); set('theme', 'dark')
      if (contact) { set('name', contact.name); set('email', contact.email); set('phone', contact.phone); set('social', contact.social); set('role', contact.role) }
    }
    return url.toString()
  } catch { return '' }
}
