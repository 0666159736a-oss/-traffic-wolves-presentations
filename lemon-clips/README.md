# Lemon Clips — website

Marketing site for **Lemon Clips**: music promotion through creator-made short-form video
(TikTok, Instagram Reels, YouTube Shorts). Built with React 18, Vite and Tailwind CSS v4,
on the Traffic Wolves visual system (dark, gold/lemon accent, heavy display type).

Two pages:

| URL            | Page                                                        |
| -------------- | ----------------------------------------------------------- |
| `/`            | Clients: artists, labels, managers, agencies                |
| `/#clippers`   | Clippers, creators and clipping teams                       |

Section links are hash tokens too (`/#results`, `/#how`, `/#services`, `/#faq`, `/#apply`,
`/#clippers-campaigns`, `/#clippers-join`), so any section can be shared as a link.

## Run locally

```bash
cd lemon-clips
npm install
npm run dev          # http://localhost:5173
```

## Build & publish

```bash
npm run build         # multi-file build in dist/  → Vercel, Netlify, Cloudflare Pages, S3…
npm run build:single  # one self-contained HTML file → ../lemon-clips.html (GitHub Pages hub)
```

* **Vercel / Netlify**: import the repo, set the root directory to `lemon-clips`,
  build command `npm run build`, output directory `dist`. No rewrites are needed
  (routing is hash-based).
* **GitHub Pages**: `npm run build:single` writes `lemon-clips.html` to the repo root,
  which the existing presentations hub (`index.html`) links to. Enable Pages on the branch
  and open `https://<user>.github.io/<repo>/lemon-clips.html`.
* **Custom domain**: point the domain at whichever host you use above.

## Page structure

Home: Hero (3 actions) → short lead form → Results* → Services → How it works + advantages →
Client feedback* → FAQ → final block (3 actions) → short lead form.
`*` renders only when `cases.js` / `testimonials.js` contain real entries. No placeholders are shown.

## Editing content

| File                           | What it holds                                                    |
| ------------------------------ | ---------------------------------------------------------------- |
| `src/content/site.js`          | Contacts, integrations, hero, hero video grid, services, steps, FAQ |
| `src/content/cases.js`         | Real case studies (format documented in the file)                |
| `src/content/testimonials.js`  | Real client feedback (format documented in the file)             |
| `src/content/clippers.js`      | For Clippers page copy                                           |

Put videos and images in `public/media/` and reference them as `media/<file>`.
Use short (5–15 s), muted-friendly MP4 (H.264) loops under ~4 MB plus a JPG poster for fast mobile loading.
Cases from the Traffic Wolves team use `attribution: 'team'` and are labelled "Traffic Wolves team experience".

## Integrations

All network calls go through `src/lib/integrations.js`. With no endpoint configured, forms validate
but tell the visitor plainly that nothing was sent. The site never fakes a successful submission.

| Setting (`site.js`)   | Effect |
| --------------------- | ------ |
| `leadWebhookUrl`      | Both lead forms (`type: 'lead'`) and presentation requests (`type: 'presentation'`) are POSTed here as JSON. Point it at your CRM / Make / Zapier / n8n. |
| `presentationPdfUrl`  | Sent along with presentation requests so your email automation (Mailchimp, Resend, HubSpot workflow…) can email the PDF. |
| `whatsapp`, `telegram`, `email` | Channels shown in **Contact a Manager**. Empty channels are hidden. |
| `calendarUrl`         | Calendly or Cal.com link. **Book a Personal Strategy Session** embeds the real scheduler; a new-tab link is the fallback. |
| `clipperWebhookUrl`   | Clipper applications (falls back to `leadWebhookUrl`). |
| `privacyUrl`          | Linked from the consent checkbox. |
| `platformUrl`, `clipperAppUrl` | Self-service platform and clipper app links. |
