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

## Editing content

Everything a marketer would change lives in `src/content/`:

| File                        | What it holds                                                        |
| --------------------------- | -------------------------------------------------------------------- |
| `src/content/site.js`       | Contact/integration settings, nav, hero, stats, steps, services, FAQ |
| `src/content/cases.js`      | Case studies (all **demo placeholders** until verified data is added) |
| `src/content/clippers.js`   | Clipper page copy, sample campaign cards, dashboard sample data       |

* **Case studies**: fill `views`, `videos`, `duration`, `summary`, `highlights`, optionally
  `videoUrl`/`poster` (put files in `public/media/`), then set `demo: false`. The "Demo" badge
  disappears and the view counter animates to the real number.
* **Prices**: set `price: 'From $X'` on a service in `site.js`. `null` shows "Custom quote".
* **Stats**: set `verified: true` once a figure is confirmed; unverified figures show a
  "Replace with verified figure" tag.

## Integrations

All network calls go through `src/lib/integrations.js`. With nothing configured the site runs
in **demo mode**: forms validate and show the confirmation screen, but nothing is sent, and the
confirmation says so.

| Setting (in `site.js`) | Effect                                                                   |
| ---------------------- | ------------------------------------------------------------------------ |
| `leadWebhookUrl`       | Campaign requests and call requests are POSTed here as JSON (HubSpot, Make, Zapier, n8n, your API). Use it to create the CRM record and send the email notification. |
| `clipperWebhookUrl`    | Clipper applications are POSTed here.                                    |
| `calendarUrl`          | "Book a call" opens this link (Calendly, Cal.com, HubSpot Meetings) instead of the demo slot picker. |
| `phone`                | Shows the "Call us now" button. Hidden while empty.                       |
| `email`                | Shown in the footer.                                                      |
| `platformUrl`          | "Explore Platform" links to the self-service app.                         |

To use an SDK instead of a webhook, replace the body of `submitCampaignLead`,
`submitClipperApplication` or `requestCall`; components only depend on their
`{ mode, ok, error }` return value.
