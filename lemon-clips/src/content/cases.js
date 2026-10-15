import { media } from './media.js'

// ─────────────────────────────────────────────────────────────
// Case studies — transferred from the Traffic Wolves site (traffic-wolves-design-preview).
// All of them are Traffic Wolves team results (attribution: 'team'); the UI labels them so.
// Figures and labels are copied as published. Images: public/media/cases.
//
// { id, category, attribution: 'team' | 'lemonclips', headline: { value, label }, period,
//   metrics: [{ label, value }], clips: [{ src, views }], videoUrl?, links? }
// ─────────────────────────────────────────────────────────────

export const cases = [
  {
    id: 'music',
    category: 'Music',
    attribution: 'team',
    headline: { value: 'Top 3', label: 'music charts' },
    period: 'Results in 1 month',
    metrics: [
      { label: 'Total reach', value: '12.5M' },
      { label: 'Engagements', value: '1.8M+' },
      { label: 'In music charts', value: 'Top 3' },
      { label: 'New followers', value: '250K+' },
    ],
    clips: [{ src: media['music-1'], views: '1.2M' }, { src: media['music-2'], views: '2.7M' }, { src: media['music-3'], views: '3.6M' }],
  },
  {
    id: 'podcast',
    category: 'Podcast',
    attribution: 'team',
    headline: { value: '1.2M', label: 'engagements' },
    period: 'Results in 1 month',
    metrics: [
      { label: 'Total reach', value: '12.5M' },
      { label: 'Engagements', value: '1.2M+' },
      { label: 'Podcast charts by streams', value: 'Top 1' },
      { label: 'Stream growth', value: 'Massive' },
    ],
    clips: [{ src: media['podcast-1'], views: '732K' }, { src: media['podcast-2'], views: '1.8M' }, { src: media['podcast-3'], views: '2.4M' }],
  },
  {
    id: 'sports',
    category: 'Sports',
    attribution: 'team',
    headline: { value: '1B+', label: 'views' },
    period: 'Key metrics · 1 month',
    metrics: [
      { label: 'Views', value: '~50M' },
      { label: 'Followers', value: '~220K' },
      { label: 'Chart position', value: '–' },
      { label: 'Traffic', value: 'Moderate' },
    ],
    clips: [{ src: media['sports-1'], views: '718.8K' }, { src: media['sports-2'], views: '3.8M' }, { src: media['sports-3'], views: '9.5M' }],
  },
  {
    id: 'doctor',
    category: 'Doctor',
    attribution: 'team',
    headline: { value: '12.5M', label: 'reach' },
    period: 'Results in 1 month',
    metrics: [
      { label: 'Total reach', value: '12.5M' },
      { label: 'Engagements', value: '1.9M+' },
      { label: 'Medical category on TikTok', value: 'Top 1' },
      { label: 'New followers', value: '320K+' },
    ],
    clips: [{ src: media['doctor-1'], views: '1.3M' }, { src: media['doctor-2'], views: '2.6M' }, { src: media['doctor-3'], views: '3.8M' }],
  },
  {
    id: 'education',
    category: 'Education',
    attribution: 'team',
    headline: { value: '7.3M', label: 'single video' },
    period: 'Key metrics · 1 month',
    metrics: [
      { label: 'Views', value: '7.3M' },
      { label: 'Engagements', value: '7M+' },
      { label: 'Chart position', value: 'Top 1' },
      { label: 'Stream growth', value: '15.8K+' },
    ],
    clips: [{ src: media['edu-1'], views: '1.2M' }, { src: media['edu-2'], views: '3.6M' }, { src: media['edu-3'], views: '2.8M' }],
  },
]

// Team-wide figures published on the Traffic Wolves site.
export const teamStats = [
  { value: '5B+', label: 'views generated' },
  { value: '80K+', label: 'clips produced' },
]
