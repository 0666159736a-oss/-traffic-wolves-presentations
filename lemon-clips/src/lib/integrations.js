// ─────────────────────────────────────────────────────────────
// Integration layer. Components only call the functions below.
// Configure endpoints in content/site.js, or replace the bodies with an SDK
// (HubSpot, Salesforce, Resend, Mailchimp…). Every function resolves to:
//   { status: 'sent' }            the endpoint accepted the request
//   { status: 'prototype' }       no endpoint configured — the UI shows the intended flow, nothing is sent
//   { status: 'error', error }    the endpoint failed
// ─────────────────────────────────────────────────────────────
import { config } from '../content/site.js'

async function post(url, payload) {
  if (!url) return new Promise((r) => setTimeout(() => r({ status: 'prototype' }), 600))
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

/** Calendly / Cal.com embed URL for the inline scheduler. */
export function calendarEmbedUrl() {
  const u = config.calendarUrl
  if (!u) return ''
  try {
    const url = new URL(u)
    if (url.hostname.includes('calendly.com')) { url.searchParams.set('hide_gdpr_banner', '1'); url.searchParams.set('background_color', '100f0b'); url.searchParams.set('text_color', 'f6f3ea'); url.searchParams.set('primary_color', 'f6d23c') }
    if (url.hostname.includes('cal.com')) { url.searchParams.set('embed', 'true'); url.searchParams.set('theme', 'dark') }
    return url.toString()
  } catch { return '' }
}
