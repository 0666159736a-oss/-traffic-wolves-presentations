// Turns dist-single/index.html into:
//   ../lemon-clips.html             full HTML page (served by the repo's GitHub Pages hub)
//   dist-single/artifact-body.html  same page without <html>/<head>/<body> wrappers (Claude Artifact format)
// Images referenced as media/... (from public/media) are inlined as data URIs so the file is self-contained.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

let html = readFileSync('dist-single/index.html', 'utf8')
const MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }
html = html.replace(/media\/[\w/.-]+\.(jpe?g|png|webp)/g, (path, ext) => {
  const file = 'public/' + path
  if (!existsSync(file)) return path
  return `data:${MIME[ext]};base64,${readFileSync(file).toString('base64')}`
})
writeFileSync('../lemon-clips.html', html)

const head = html.match(/<head>([\s\S]*?)<\/head>/)[1]
  .replace(/<meta charset[^>]*>/, '')
  .replace(/<meta name="viewport"[^>]*>/, '')
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1]
writeFileSync('dist-single/artifact-body.html', head.trim() + '\n' + body.trim() + '\n')
console.log(`Wrote ../lemon-clips.html (${Math.round(html.length / 1024)} KB) and dist-single/artifact-body.html`)
