// ─────────────────────────────────────────────────────────────
// Case studies. Every entry below is a DEMO placeholder.
// To publish a real case: fill the fields from a verified campaign report and set `demo: false`.
//
//   artist      'Artist name'
//   release     'Song or release title'
//   genre       'Hip-Hop'
//   views       12400000            (number, total views across posted videos)
//   videos      380                 (number of posted videos, or null if unknown)
//   duration    '21 days'           (or null if unknown)
//   platforms   ['TikTok', 'Reels', 'Shorts']
//   videoUrl    'media/case-1.mp4'  (optional preview video; poster used otherwise)
//   poster      'media/case-1.jpg'  (optional)
//   summary     one or two sentences on what happened
//   highlights  ['…', '…']           short bullet facts
//   link        external link to the song or a top video (optional)
// ─────────────────────────────────────────────────────────────

export const cases = [
  {
    id: 'case-1',
    demo: true,
    artist: 'Artist Name',
    release: 'Release Title',
    genre: 'Hip-Hop',
    views: null,
    videos: null,
    duration: null,
    platforms: ['TikTok', 'Reels', 'Shorts'],
    hue: 48,
    summary: 'Space for a verified hip-hop release campaign: the goal, the creator mix and the result.',
    highlights: ['Total views from the campaign report', 'Number of posted videos', 'Top-performing video or format'],
  },
  {
    id: 'case-2',
    demo: true,
    artist: 'Artist Name',
    release: 'Release Title',
    genre: 'Pop',
    views: null,
    videos: null,
    duration: null,
    platforms: ['TikTok', 'Reels'],
    hue: 18,
    summary: 'Space for a verified pop single campaign, ideally one with a clear before and after.',
    highlights: ['Views and videos', 'Campaign length', 'Streaming or follower lift, if documented'],
  },
  {
    id: 'case-3',
    demo: true,
    artist: 'Label Name',
    release: 'Multi-release rollout',
    genre: 'Label',
    views: null,
    videos: null,
    duration: null,
    platforms: ['TikTok', 'Reels', 'Shorts'],
    hue: 200,
    summary: 'Space for a verified label case running several tracks at once.',
    highlights: ['Number of tracks', 'Combined views', 'Best-performing release'],
  },
  {
    id: 'case-4',
    demo: true,
    artist: 'Artist Name',
    release: 'Catalog Track',
    genre: 'R&B',
    views: null,
    videos: null,
    duration: null,
    platforms: ['TikTok', 'Shorts'],
    hue: 320,
    summary: 'Space for a verified catalog reactivation: an older song brought back through short-form.',
    highlights: ['Views and videos', 'Campaign length', 'Sound usage growth, if documented'],
  },
]
