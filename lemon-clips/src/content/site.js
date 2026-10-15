// ─────────────────────────────────────────────────────────────
// Lemon Clips — editable site content and integration settings.
// Components read from this file. Nothing here is invented: empty values hide the related UI.
// ─────────────────────────────────────────────────────────────

export const config = {
  brand: 'Lemon Clips',

  // ── Contact a Manager ── real company contacts only. Empty = channel hidden.
  whatsapp: '',        // digits with country code, e.g. '13105550100'
  telegram: '',        // username without @, e.g. 'lemonclips_manager'
  email: '',           // e.g. 'hello@lemonclips.com'

  // ── Book a Personal Strategy Session ── Calendly or Cal.com scheduling link.
  // e.g. 'https://calendly.com/lemonclips/strategy' or 'https://cal.com/lemonclips/strategy'
  calendarUrl: '',

  // ── Lead capture ── one endpoint for every form on the site (CRM / Make / Zapier / n8n / your API).
  // Requests are POSTed as JSON with a `type` field: 'lead' | 'presentation' | 'clipper'.
  leadWebhookUrl: '',
  // Optional separate endpoint for clipper applications. Falls back to leadWebhookUrl.
  clipperWebhookUrl: '',

  // ── Free presentation ── the PDF your email service sends after a 'presentation' request.
  // The site never links the PDF directly; your email automation attaches/sends it.
  presentationPdfUrl: '',

  // Privacy policy page linked from the consent checkbox. Empty = text without a link.
  privacyUrl: '',
  // Self-service platform (clients) and clipper app. Empty = buttons lead to the form instead.
  platformUrl: '',
  clipperAppUrl: '',
}

export const hero = {
  eyebrow: 'Music promotion · Creator campaigns · SMM',
  title: ['MAKE YOUR', 'MUSIC GO', 'VIRAL.'],
  subtitle: 'Music promotion, creator-powered campaigns and full-service SMM for artists, labels and agencies.',
}

// Real short-form clips for the hero video grid: { videoUrl, poster, caption }.
// Leave empty until original files are supplied; the hero then shows the brand graphic.
export const heroMedia = []

export const services = [
  {
    id: 'clipping',
    name: 'Clipping Campaigns',
    formValue: 'Clipping',
    tagline: 'Scale your music through creator-made videos across TikTok, Reels and Shorts.',
    points: ['Launch yourself on the platform', 'Start with a test campaign', 'Scale the videos that work'],
    cta: 'Get Started',
  },
  {
    id: 'managed',
    name: 'Managed Promotion',
    formValue: 'Managed Promotion',
    tagline: 'Your campaign, handled by a dedicated manager.',
    points: ['Personal campaign manager', 'Clipper selection & coordination', 'Publishing control', 'Results reporting'],
    cta: 'Get Started',
  },
  {
    id: 'smm',
    name: 'Full-Service SMM',
    formValue: 'Full-Service SMM',
    tagline: 'We manage your content, social media presence and growth strategy.',
    points: ['Content strategy & content plan', 'Short-form video production & editing', 'Posting and social media management', 'Personal manager', 'Extra reach through clipping'],
    cta: 'Get Started',
    featured: true,
  },
]

export const steps = [
  { title: 'Tell Us About Your Project', text: 'Share your music, goals and where you are today.' },
  { title: 'We Build Your Growth Plan', text: 'You get a personal proposal: the right service, channels and timeline.' },
  { title: 'Launch, Track & Scale', text: 'We go live, report results and scale what works.' },
]

export const advantages = [
  { title: 'Creator Network', icon: 'users' },
  { title: 'Dedicated Management', icon: 'manager' },
  { title: 'Real Performance Tracking', icon: 'chart' },
  { title: 'Scalable Campaigns', icon: 'scale' },
]

export const faq = [
  {
    q: 'How does Lemon Clips work?',
    a: 'Tell us about your music and goals. We send a personal plan, then promote your release through creator videos, managed campaigns or full SMM, and report the results.',
  },
  {
    q: 'What services do you offer?',
    a: 'Three options: Clipping Campaigns, Managed Promotion with a dedicated manager, and Full-Service SMM that covers strategy, content, posting and growth.',
  },
  {
    q: 'Can I start with a test campaign?',
    a: 'Yes. You can start with a smaller test to see how your music performs before scaling.',
  },
  {
    q: 'Do I get a dedicated manager?',
    a: 'Managed Promotion and Full-Service SMM include a personal manager. Clipping Campaigns can be run on your own through the platform.',
  },
  {
    q: 'How do I get started?',
    a: 'Fill in the short form, contact a manager, or book a strategy session. We reply with next steps and a proposal.',
  },
]

export const finalCta = {
  title: ['READY TO GROW', 'YOUR MUSIC?'],
  subtitle: 'Let’s build the right promotion strategy for your next release.',
}

export const formOptions = {
  roles: ['Artist', 'Label', 'Agency', 'Other'],
  interests: ['Clipping', 'Managed Promotion', 'Full-Service SMM', 'Not Sure'],
}

export const nav = [
  { label: 'Home', to: 'top' },
  { label: 'Results', to: 'results', needs: 'cases' },
  { label: 'Services', to: 'services' },
  { label: 'How It Works', to: 'how' },
  { label: 'For Clippers', to: 'clippers' },
  { label: 'FAQ', to: 'faq' },
]
