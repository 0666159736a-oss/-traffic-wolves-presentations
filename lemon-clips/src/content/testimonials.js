import { media } from './media.js'

// ─────────────────────────────────────────────────────────────
// Client feedback — transferred from the Traffic Wolves site, original names, photos and wording.
// Feedback on the Traffic Wolves team's work (attribution: 'team').
// ─────────────────────────────────────────────────────────────

export const testimonials = [
  {
    name: 'Jaxon Reed', role: 'Music Producer & Artist', location: 'Los Angeles, USA', photo: media['jaxon-reed'], attribution: 'team',
    metrics: [{ value: '3.2M', label: 'Video Views' }, { value: '+11K', label: 'New Followers' }, { value: '1,200+', label: 'Email Subs' }],
    quote: 'In the first 2 weeks we started seeing traction, and by the end of the first month one of our videos went crazy: 3.2M views.',
  },
  {
    name: 'Liam Parker', role: 'Music Artist', location: 'Independent Music Project', photo: media['liam-parker'], attribution: 'team',
    metrics: [{ value: 'Millions', label: 'Release Views' }, { value: 'Faster', label: 'Audience Growth' }, { value: 'Trend', label: 'Execution' }],
    quote: 'They suggested creative ideas I would never think of, and every video they produced just performed.',
  },
  {
    name: 'Lucas Bennett', role: 'YouTube Creator & Podcaster', location: 'Texas, USA', photo: media['lucas-bennett'], attribution: 'team',
    metrics: [{ value: '9.3M', label: 'Total Views' }, { value: '13,200', label: 'New Followers' }, { value: '+42%', label: 'Downloads' }],
    quote: 'They took our long-form videos and turned them into shorts that actually grab attention. The edits, hooks, and captions are on point.',
  },
  {
    name: 'Daniel Thompson', role: 'E-commerce Entrepreneur', location: 'Home & Living Brand', photo: media['daniel-thompson'], attribution: 'team',
    metrics: [{ value: '12.5M+', label: 'Total Views' }, { value: '+47%', label: 'Sales Lift' }, { value: '15,890', label: 'New Followers' }],
    quote: 'They studied our niche, our audience, and built a strategy that actually works. Every video was on-brand and made people want to buy.',
  },
  {
    name: 'Sara Johnson', role: 'Wellness Coach & Creator', location: 'Seattle, USA', photo: media['sara-johnson'], attribution: 'team',
    metrics: [{ value: '6M+', label: 'Total Views' }, { value: '+11K', label: 'New Followers' }, { value: 'More', label: 'Clients' }],
    quote: 'They got my brand right away and took care of everything: strategy, filming ideas, editing, posting, captions.',
  },
  {
    name: 'Sophia Williams', role: 'Digital Marketing Director', location: 'E-commerce Brand', photo: media['sophia-williams'], attribution: 'team',
    metrics: [{ value: '15,890', label: 'New Followers' }, { value: '30 days', label: 'Growth Window' }, { value: 'Real-time', label: 'Reporting' }],
    quote: 'Strategic planning, strong video production, consistent growth, trend-driven execution, and clear communication.',
  },
  {
    name: 'Olivia Bennett', role: 'Founder of PureSoul Skincare', location: 'Founder', photo: media['olivia-bennett'], attribution: 'team',
    metrics: [{ value: 'Millions', label: 'Reach' }, { value: 'Daily', label: 'Community Growth' }, { value: 'Full', label: 'TikTok System' }],
    quote: 'They built a full strategy for us: content ideas, filming, editing, posting, everything.',
  },
  {
    name: 'Alex Martinez', role: 'Coach & Online Educator', location: 'Melbourne, Australia', photo: media['alex-martinez'], attribution: 'team',
    metrics: [{ value: '1,200+', label: 'Email Subs' }, { value: 'Sold out', label: 'Group Program' }, { value: 'Daily', label: 'DMs' }],
    quote: 'They understood my message and turned it into shorts that speak to a completely new audience.',
  },
]
