// Copy-link and PDF export for the commercial offer.

/** Public URL to share. Set it once the site is deployed (e.g. 'https://offer.lemonclips.com'); otherwise the current address is used. */
export const SHARE_URL = ''

export async function copyLink() {
  const url = SHARE_URL || location.href.split('#')[0]
  try { await navigator.clipboard.writeText(url); return { ok: true, url } } catch { return { ok: false, url } }
}

/**
 * Builds a PDF from every [data-pdf] section, rendered at desktop width.
 * Text is rasterized, so Ukrainian characters, photos and prices appear exactly as on screen.
 */
export async function downloadPdf(onProgress) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas-pro'), import('jspdf')])
  const sections = [...document.querySelectorAll('[data-pdf]')]
  const root = document.documentElement
  root.classList.add('pdf-mode')
  const prevScroll = window.scrollY
  try {
    await document.fonts?.ready
    const W = 1280
    let pdf
    for (let i = 0; i < sections.length; i++) {
      onProgress?.(i + 1, sections.length)
      const canvas = await html2canvas(sections[i], {
        scale: 1.5, backgroundColor: '#0a0a0a', useCORS: true, windowWidth: W, logging: false,
        onclone: (doc) => {
          doc.documentElement.classList.add('pdf-mode')
          doc.querySelectorAll('[data-pdf-hide]').forEach((n) => { n.style.display = 'none' })
          doc.querySelectorAll('[data-pdf-show]').forEach((n) => { n.style.display = 'grid' })
          doc.querySelectorAll('.reveal').forEach((n) => n.classList.add('in'))
        },
      })
      const img = canvas.toDataURL('image/jpeg', 0.86)
      // Page width 210 mm; height follows the section, so nothing is cut.
      const pw = 210, ph = (canvas.height / canvas.width) * pw
      if (!pdf) pdf = new jsPDF({ unit: 'mm', format: [pw, ph], orientation: ph > pw ? 'portrait' : 'landscape', compress: true })
      else pdf.addPage([pw, ph], ph > pw ? 'portrait' : 'landscape')
      pdf.addImage(img, 'JPEG', 0, 0, pw, ph, undefined, 'FAST')
    }
    pdf.setProperties({ title: 'Lemon Clips — Комерційна пропозиція', author: 'Lemon Clips' })
    pdf.save('Lemon-Clips-Komertsiina-propozytsiia.pdf')
    return { ok: true }
  } catch (e) {
    console.error(e)
    return { ok: false }
  } finally {
    root.classList.remove('pdf-mode')
    window.scrollTo(0, prevScroll)
  }
}
