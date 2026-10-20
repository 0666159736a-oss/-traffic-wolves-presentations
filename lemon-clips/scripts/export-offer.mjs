// dist-offer/offer.html → ../lemon-clips-offer.html (self-contained) + dist-offer/artifact-body.html (Claude Artifact).
// Images under public/offer are inlined as data URIs.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
let html = readFileSync('dist-offer/offer.html', 'utf8')
const MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }
html = html.replace(/offer\/[\w/.-]+\.(jpe?g|png|webp)/g, (path, ext) => {
  const file = 'public/' + path
  return existsSync(file) ? `data:${MIME[ext]};base64,${readFileSync(file).toString('base64')}` : path
})
writeFileSync('../lemon-clips-offer.html', html)
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1].replace(/<meta charset[^>]*>/, '').replace(/<meta name="viewport"[^>]*>/, '')
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1]
writeFileSync('dist-offer/artifact-body.html', head.trim() + '\n' + body.trim() + '\n')
console.log(`Wrote ../lemon-clips-offer.html (${Math.round(html.length / 1024)} KB)`)
