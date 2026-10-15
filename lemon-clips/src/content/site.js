import { media } from './media.js'

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

// Real campaign clips shown in the hero (from the cases). Add videoUrl for a moving preview.
export const heroMedia = [
  { src: media['music-1'], views: '1.2M', caption: 'Music' },
  { src: media['music-3'], views: '3.6M', caption: 'Music' },
  { src: media['podcast-2'], views: '1.8M', caption: 'Podcast' },
]

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
    guarantee: true,
    points: ['Personal campaign manager', 'Clipper selection & coordination', 'Publishing control', 'Results reporting'],
    cta: 'Get Started',
  },
  {
    id: 'smm',
    name: 'Full-Service SMM & Music Promotion',
    formValue: 'Full-Service SMM',
    tagline: 'We manage your content, social media presence and growth strategy.',
    guarantee: true,
    points: ['Content strategy & content plan', 'Short-form video production & editing', 'Posting and social media management', 'Personal manager', 'Extra reach through clipping'],
    cta: 'Get Started',
    featured: true,
  },
]

export const howItWorks = {
  title: ['ONE VIDEO. HUNDREDS OF CLIPS.', 'MILLIONS OF VIEWS.'],
  subtitle: 'We turn your existing content into short-form videos and distribute them through a network of creators.',
  steps: [
    { tag: 'Original video', title: 'We Take Your Content', text: 'Music videos, interviews, performances, podcasts, behind-the-scenes footage or other existing content.' },
    { tag: 'Short clips', title: 'We Cut It Into Short Clips', text: 'Our team and creators find the strongest moments, edit them into engaging short-form videos and adapt them for each platform.' },
    { tag: 'Creator network', title: 'Creators Distribute at Scale', text: 'Multiple creators publish across TikTok, Instagram Reels and YouTube Shorts, putting your music in front of new audiences.' },
    { tag: 'Views & results', title: 'We Track & Scale', text: 'We monitor views and performance, find the formats that work and scale distribution.' },
  ],
  fromScratch: 'No footage yet? With Full-Service SMM we create content from scratch.',
}

export const why = {
  title: ['GREAT MUSIC DESERVES', 'TO BE DISCOVERED.'],
  subtitle: 'Your next fans may never find your profile. But they can discover your music through the content they already watch.',
  benefits: [
    { title: 'More Exposure', text: 'Get your music in front of new audiences across short-form platforms.', icon: 'eye' },
    { title: 'More Discovery', text: 'Give people more chances to find your songs and your artist identity.', icon: 'music' },
    { title: 'More Content', text: 'Turn existing footage into many engaging videos without filming something new every day.', icon: 'layers' },
    { title: 'More Opportunities to Grow', text: 'Test formats, see what resonates and build momentum around each release.', icon: 'chart' },
  ],
  line: ['One artist account has one audience.', 'A network of creators opens the door to many.'],
  note: 'Views don’t guarantee fans. They create more moments where someone hears your song, saves the sound or taps through to your profile.',
}

export const faq = [
  {
    q: 'How does Lemon Clips work?',
    a: 'Tell us about your music and goals. We send a personal plan, then promote your release through creator videos, managed campaigns or full SMM, and report the results.',
  },
  {
    q: 'What services do you offer?',
    a: 'Clipping Campaigns for mass short-form distribution, Managed Promotion with a dedicated manager, and Full-Service SMM & Music Promotion: strategy, content plan, video production, social media management and extra reach through clipping.',
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

export const formOptions = {
  roles: ['Artist', 'Label', 'Agency', 'Other'],
  interests: ['Clipping', 'Managed Promotion', 'Full-Service SMM', 'Not Sure'],
}

export const nav = [
  { label: 'Home', to: 'top' },
  { label: 'Results', to: 'results' },
  { label: 'Services', to: 'services' },
  { label: 'How It Works', to: 'how' },
  { label: 'For Clippers', to: 'clippers' },
  { label: 'FAQ', to: 'faq' },
]
