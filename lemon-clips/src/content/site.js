// ─────────────────────────────────────────────────────────────
// Lemon Clips — editable site content.
// Change copy, links and integrations here; components read from this file.
// ─────────────────────────────────────────────────────────────

export const config = {
  brand: 'Lemon Clips',
  // Leave empty to hide the "Call Us Now" button. Use E.164 format, e.g. '+13105550100'.
  phone: '',
  // Public contact email shown in the footer. Leave empty to hide.
  email: '',
  // Booking link (Calendly, Cal.com, HubSpot Meetings…). Empty = built-in demo slot picker.
  calendarUrl: '',
  // Lead/CRM webhook (HubSpot, Make, Zapier, n8n, your API). Empty = demo mode, nothing is sent.
  leadWebhookUrl: '',
  // Separate webhook for clipper applications. Empty = demo mode.
  clipperWebhookUrl: '',
  // Link to the self-service platform / app. Empty = "Explore Platform" scrolls to the form.
  platformUrl: '',
}

export const nav = [
  { label: 'Home', to: 'top' },
  { label: 'Results', to: 'results' },
  { label: 'How It Works', to: 'how' },
  { label: 'Services', to: 'services' },
  { label: 'For Clippers', to: 'clippers' },
  { label: 'FAQ', to: 'faq' },
]

export const hero = {
  eyebrow: 'Music promotion through short-form video',
  title: ['MAKE YOUR', 'MUSIC GO', 'VIRAL.'],
  subtitle:
    'Get your music heard by millions through TikTok, Instagram Reels & YouTube Shorts.',
  audiences: ['Independent Artists', 'Record Labels', 'Music Managers', 'Marketing Agencies'],
}

// Big animated figures in "Why Lemon Clips".
// verified:false shows a "replace with verified figure" tag next to the number.
export const stats = [
  { value: 3, suffix: '', label: 'Short-form platforms per campaign', note: 'TikTok · Reels · Shorts', verified: true },
  { value: 100, suffix: 's', label: 'Creators who can post with your track', note: 'Network size', verified: false },
  { value: 1, suffix: 'M', label: 'View guarantee on eligible packages', note: 'Package condition, not a blanket promise', verified: true },
]

export const steps = [
  { n: '01', title: 'Submit Your Music', text: 'Share your track, goals and campaign details.' },
  { n: '02', title: 'Launch Your Campaign', text: 'Creators produce and distribute short-form videos using your music.' },
  { n: '03', title: 'Track & Scale', text: 'Monitor performance, identify winning content and scale your campaign.' },
]

export const advantages = [
  { title: 'Creator-powered distribution', text: 'Your track is posted by many independent creators at once, so it reaches audiences your own page never could.' },
  { title: 'TikTok, Reels & Shorts', text: 'One campaign covers the three feeds where songs get discovered today.' },
  { title: 'Scalable short-form campaigns', text: 'Start with a focused test, then add creators and budget behind what performs.' },
  { title: 'Performance tracking & reporting', text: 'See every posted video, its views and which hooks are carrying the song.' },
  { title: 'Flexible campaign management', text: 'Run it yourself, hand it to our team, or anything in between.' },
  { title: 'Performance-based options', text: 'Pay-for-performance structures are available for eligible campaigns.' },
]

export const whyCopy = {
  lead: 'A single post is a lottery ticket. Hundreds of creators posting your sound in their own style is a distribution system.',
  points: [
    'Every new video is another chance for the algorithm to pick up the sound.',
    'Different creators reach different audiences: dance, lifestyle, edits, memes, fan pages.',
    'Volume shows which hook works. Then budget moves behind the winners.',
  ],
}

// Services. Set `price` to a string (e.g. 'From $2,500') to display it; null shows "Custom pricing".
export const services = [
  {
    id: 'self',
    name: 'Self-Service',
    tagline: 'Launch and manage your own music clipping campaign.',
    text: 'Use the platform to set your budget and rates, approve creators and follow results in real time.',
    price: null,
    bestFor: 'Artists and teams who want full control',
    cta: { label: 'Explore Platform', action: 'platform' },
    features: { setup: 'You', creators: 'Open campaign marketplace', strategy: false, production: false, reporting: 'Live dashboard', manager: false },
  },
  {
    id: 'managed',
    name: 'Managed Campaign',
    tagline: 'Your music. Our team. Your growth.',
    text: 'Our team runs the release push: briefs creators, coordinates posting and keeps results on track.',
    price: null,
    featured: true,
    bestFor: 'Releases that need momentum without extra work',
    cta: { label: 'Launch a Campaign', action: 'apply' },
    features: { setup: 'Lemon Clips team', creators: 'Selected & coordinated', strategy: 'Campaign brief', production: false, reporting: 'Dashboard + recaps', manager: true },
  },
  {
    id: 'full',
    name: 'Full-Service Music Promotion',
    tagline: 'From strategy to distribution.',
    text: 'Content strategy, video production, posting and scaling, handled end to end for artists and labels.',
    price: null,
    bestFor: 'Labels, priority releases and multi-track rollouts',
    cta: { label: 'Talk to Our Team', action: 'book' },
    features: { setup: 'Lemon Clips team', creators: 'Selected & coordinated', strategy: 'Full content strategy', production: 'Original videos produced', reporting: 'Dashboard + strategy reviews', manager: true },
  },
]

export const serviceRows = [
  { key: 'setup', label: 'Who runs the campaign' },
  { key: 'creators', label: 'Creator network' },
  { key: 'strategy', label: 'Content strategy' },
  { key: 'production', label: 'Video production' },
  { key: 'reporting', label: 'Reporting' },
  { key: 'manager', label: 'Dedicated campaign manager' },
]

export const faq = [
  {
    q: 'How does music clipping work?',
    a: 'You give us a track and a goal. Creators in our network make short videos that use your song as the sound and post them on TikTok, Instagram Reels and YouTube Shorts. Each post puts the song in front of that creator’s audience, and the best-performing formats get scaled.',
  },
  {
    q: 'How much does a campaign cost?',
    a: 'It depends on the service model, the number of creators and how long the campaign runs. Self-service campaigns start from the budget you set. For managed and full-service campaigns we send a quote after a short call.',
  },
  {
    q: 'Do you guarantee views?',
    a: 'Selected packages include a 1,000,000-view guarantee, and the terms are spelled out in the proposal for that package. We do not guarantee streams, chart placements or that a song goes viral. No one honestly can.',
  },
  {
    q: 'How long does a campaign take?',
    a: 'Creators can start posting soon after your brief and budget are approved. Length depends on budget and goals: some campaigns are a short launch push, others run for several weeks and are extended once the winning videos are clear. Your plan will state the timeline.',
  },
  {
    q: 'What content do I need to provide?',
    a: 'At minimum, a link to the released track (or the sound on TikTok) and a short brief about the song and the audience you want. Artwork, lyrics, artist footage and do-not-do notes all help.',
  },
  {
    q: 'Can I track campaign performance?',
    a: 'Yes. You see every posted video, its platform and its view count, plus totals for the campaign. Managed and full-service clients also get regular recaps from their campaign manager.',
  },
  {
    q: 'Do you manage campaigns for artists?',
    a: 'Yes. With a Managed Campaign or Full-Service plan, our team handles creator selection, briefs, posting coordination and optimization.',
  },
  {
    q: 'Can labels launch multiple campaigns?',
    a: 'Yes. Labels and agencies can run several releases at once, each with its own budget and reporting, under one account and one point of contact.',
  },
]

export const finalCta = {
  title: ['YOUR NEXT RELEASE', 'DESERVES MORE', 'ATTENTION.'],
  subtitle: 'Let’s build a campaign that puts your music in front of more people.',
}

export const formOptions = {
  roles: ['Artist', 'Label', 'Agency', 'Manager'],
  budgets: ['Under $1,000', '$1,000 – $2,500', '$2,500 – $5,000', '$5,000 – $10,000', '$10,000+', 'Not sure yet'],
  goals: ['Launch a new release', 'Push an existing song', 'Grow artist awareness', 'Start a TikTok trend', 'Multi-release / label rollout', 'Something else'],
}
