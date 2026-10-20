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
Cases (5) and client feedback (8) were transferred from the Traffic Wolves site and are labelled as Traffic Wolves team results.
Images were cut from screenshots of that site (`public/media`); replace them with the original files and add `videoUrl` for moving previews.

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

All network calls go through `src/lib/integrations.js`. Every client form (top form, bottom form,
Get a Free Presentation, Contact a Manager, Book a Strategy Session) collects the same fields:
**Name, Email, Phone / WhatsApp (country code + number, required), Instagram / TikTok profile link, I Am**
(Artist / Record Label / Agency / Other) and consent. Each request is POSTed as JSON:

```json
{ "type": "lead | presentation | callback | session", "name": "…", "email": "…",
  "phone": "+44 7700 900123", "social": "https://instagram.com/…", "role": "Record Label",
  "consent": true, "service": "Personal SMM Manager (only if picked on a service card)",
  "source": "lemon-clips-site", "page": "…", "submittedAt": "…" }
```

With no endpoint configured nothing is faked: the visitor sees "Not sent · preview mode" and keeps
everything they typed.

| Setting (`site.js`)   | Effect |
| --------------------- | ------ |
| `leadWebhookUrl`      | Receives every client request above (CRM / Make / Zapier / n8n / your API). |
| `presentationPdfUrl`  | Sent with `type: 'presentation'` so the email automation can send the PDF. |
| `calendarUrl`         | Calendly or Cal.com event link. Step 2 of the booking dialog embeds it with real free slots. |
| `whatsapp`, `telegram`, `email` | Real manager channels shown above the callback form in Contact a Manager. |
| `clipperWebhookUrl`   | Clipper applications (falls back to `leadWebhookUrl`). |
| `privacyUrl`          | Linked from the consent checkbox. |

### Calendar setup (required fields)

The booking dialog first collects the contact fields (and posts them as `type: 'session'`, so phone and
social are never lost), then opens the calendar prefilled:

* **Calendly**: Event type → Invitee questions. Add, in this order: Q1 *Phone / WhatsApp* (phone, required),
  Q2 *Instagram / TikTok Profile* (required), Q3 *I Am* (required). They are prefilled via `a1`, `a2`, `a3`.
* **Cal.com**: Event type → Advanced → Booking questions. Add questions with identifiers `phone`
  (Phone, required), `social` (Short text, required) and `role` (Select: Artist, Record Label, Agency, Other).

## Комерційна пропозиція (UA) — `offer.html`

Окрема сторінка в тому ж проєкті: `npm run dev` → http://localhost:5173/offer.html

| Що редагувати | Де |
| --- | --- |
| Тексти, ціна за 1 000, таблиця, мін. замовлення | `src/offer/content.js` |
| Фото лимонів для першого екрана | `public/offer/hero-lemons.jpg` + `heroPhoto` у `content.js` |
| Кейси (HARFANG та нові) | масив `cases` у `content.js`, фото в `public/offer/cases/` |
| Посилання для кнопки «Копіювати» | `SHARE_URL` у `src/offer/share.js` |

* **Новий кейс**: додайте об’єкт у `cases` (назва, фото, тип просування, перегляди, опис, результати, показники, посилання на матеріали). Порожні поля показуються як «буде додано».
* **PDF**: кнопка збирає PDF у браузері (html2canvas-pro + jsPDF) з кожного розділу `[data-pdf]` у ширині 1280 px — українські літери, фото та ціни виглядають як на сайті.
* **Зображення**: JPEG/WebP до ~300 КБ, ширина 2400 px для фону, 1600 px для фото кейсів.

### Публікація (лише після підтвердження)
* **Vercel**: Import → Root Directory `lemon-clips` → налаштування підхопляться з `vercel.json`. Сторінка: `/offer`.
* **Netlify**: Base directory `lemon-clips` → `netlify.toml`. Сторінка: `/offer`.
* `npm run build:offer` — один самодостатній HTML-файл `../lemon-clips-offer.html`.
