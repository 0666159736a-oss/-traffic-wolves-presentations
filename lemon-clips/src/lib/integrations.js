// ─────────────────────────────────────────────────────────────
// Integration layer. Components call these functions only.
// Wire up a CRM, email service or calendar by setting the URLs in content/site.js,
// or replace the bodies below with an SDK call (HubSpot, Salesforce, Resend, Cal.com…).
// Every function resolves to { mode: 'live' | 'demo', ok: boolean, error?: string }.
// ─────────────────────────────────────────────────────────────
import { config } from '../content/site.js'

async function postJSON(url, payload) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, source: 'lemon-clips-site', submittedAt: new Date().toISOString() }),
    })
    if (!res.ok) return { mode: 'live', ok: false, error: `The server answered ${res.status}. Please try again or email us.` }
    return { mode: 'live', ok: true }
  } catch {
    return { mode: 'live', ok: false, error: 'We could not reach the server. Check your connection and try again.' }
  }
}

const demo = () => new Promise((r) => setTimeout(() => r({ mode: 'demo', ok: true }), 700))

/** Artist / label / agency campaign request → CRM + email notification. */
export function submitCampaignLead(lead) {
  return config.leadWebhookUrl ? postJSON(config.leadWebhookUrl, { type: 'campaign', ...lead }) : demo()
}

/** Clipper or clipping-team application. */
export function submitClipperApplication(app) {
  return config.clipperWebhookUrl ? postJSON(config.clipperWebhookUrl, { type: 'clipper', ...app }) : demo()
}

/** Call booking. With calendarUrl set the UI links out; this handles the built-in slot picker. */
export function requestCall(slot) {
  return config.leadWebhookUrl ? postJSON(config.leadWebhookUrl, { type: 'call', ...slot }) : demo()
}

export const isDemo = (kind = 'lead') =>
  kind === 'clipper' ? !config.clipperWebhookUrl : !config.leadWebhookUrl
