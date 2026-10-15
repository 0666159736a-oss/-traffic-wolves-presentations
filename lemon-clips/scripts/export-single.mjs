// Turns dist-single/index.html into:
//   ../lemon-clips.html             full HTML page (served by the repo's GitHub Pages hub)
//   dist-single/artifact-body.html  same page without <html>/<head>/<body> wrappers (Claude Artifact format)
import { readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync('dist-single/index.html', 'utf8')
writeFileSync('../lemon-clips.html', html)

const head = html.match(/<head>([\s\S]*?)<\/head>/)[1]
  .replace(/<meta charset[^>]*>/, '')
  .replace(/<meta name="viewport"[^>]*>/, '')
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1]
// Module scripts in <head> run deferred, so keeping order (head then body) is safe.
writeFileSync('dist-single/artifact-body.html', head.trim() + '\n' + body.trim() + '\n')
console.log('Wrote ../lemon-clips.html and dist-single/artifact-body.html')
