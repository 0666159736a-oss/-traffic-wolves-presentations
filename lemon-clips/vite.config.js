import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { resolve } from 'node:path'

// `npm run build`         -> multi-page build in dist/: index.html (EN landing) + offer.html (UA commercial offer)
//                            for Vercel, Netlify or any static host
// `npm run build:single`  -> EN landing as one self-contained HTML file
// `npm run build:offer`   -> UA commercial offer as one self-contained HTML file (preview / email)
export default defineConfig(({ mode }) => {
  const single = mode === 'single' || mode === 'offer-single'
  const input = mode === 'offer-single' ? { offer: resolve(__dirname, 'offer.html') }
    : mode === 'single' ? { main: resolve(__dirname, 'index.html') }
    : { main: resolve(__dirname, 'index.html'), offer: resolve(__dirname, 'offer.html') }
  return {
    base: './',
    plugins: [react(), tailwindcss(), ...(single ? [viteSingleFile()] : [])],
    build: {
      outDir: mode === 'offer-single' ? 'dist-offer' : mode === 'single' ? 'dist-single' : 'dist',
      rollupOptions: { input },
    },
  }
})
