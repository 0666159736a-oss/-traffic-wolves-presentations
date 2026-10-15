// ─────────────────────────────────────────────────────────────
// For Clippers page content.
// Live campaigns are listed inside the clipper app (config.clipperAppUrl), never hard-coded here.
// ─────────────────────────────────────────────────────────────

export const clipperHero = {
  eyebrow: 'For clippers, creators & clipping teams',
  title: ['TURN CONTENT', 'INTO EARNINGS.'],
  subtitle: 'Join music clipping campaigns, create short-form videos and earn based on eligible performance.',
}

export const earnSteps = [
  { title: 'Pick a campaign', text: 'Browse music campaigns and read the brief: the song, the vibe, the rules.' },
  { title: 'Make the video', text: 'Create a short-form video that uses the track as the sound.' },
  { title: 'Post & submit', text: 'Post on TikTok, Reels or Shorts and submit the link.' },
  { title: 'Get paid on views', text: 'Approved videos earn at the campaign rate for eligible views.' },
]

// What every live campaign card in the clipper app shows.
export const campaignFields = [
  { title: 'Artist & track', text: 'The song you will use as the sound.' },
  { title: 'Rate per 1K views', text: 'Set by the campaign, shown before you join.' },
  { title: 'Available budget', text: 'Live budget left for payouts.' },
  { title: 'Brief & platforms', text: 'Vibe, rules and where to post.' },
]

export const joinSteps = [
  { title: 'Apply', text: 'Tell us who you are, which platforms you post on and links to your accounts.' },
  { title: 'Get approved', text: 'We review your accounts for real audiences and content quality.' },
  { title: 'Join campaigns', text: 'Approved clippers see open campaigns and can start posting right away.' },
]

export const uploadRules = [
  'Use the official campaign sound. Original audio replacements are not counted.',
  'Post from an account you have connected and verified.',
  'Submit the public video link within the campaign window.',
  'Keep the video live. Deleted or private videos stop counting.',
  'Follow the brief: no misleading captions, no reposted content, no bots.',
]

export const payoutPoints = [
  { title: 'Rate per views', text: 'Each campaign sets its own rate for eligible views. You see it before you join.' },
  { title: 'Eligible performance', text: 'Only organic views on approved, compliant videos count. Paid or botted views are removed.' },
  { title: 'Budget caps', text: 'Payouts come from the campaign budget. When it runs out, the campaign closes.' },
  { title: 'Payout schedule', text: 'Earnings are confirmed after review and paid out on the platform schedule.' },
]

export const teamPoints = [
  { title: 'One team account', text: 'Manage multiple editors and pages from one place.' },
  { title: 'Shared submissions', text: 'Every member submits under the team, with per-member stats.' },
  { title: 'Split earnings', text: 'See what each member and page earned on each campaign.' },
  { title: 'Priority access', text: 'Consistent, high-quality teams can be invited to private campaigns.' },
]

export const clipperFormOptions = {
  types: ['Solo clipper', 'Content creator', 'Clipping team / agency'],
  platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
  volumes: ['1–10 videos / week', '10–50 videos / week', '50–200 videos / week', '200+ videos / week'],
}
