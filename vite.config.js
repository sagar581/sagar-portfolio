import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build` -> normal build for Vercel.
// `npm run build:single` -> one self-contained index.html (handy for sharing a preview).
export default defineConfig({
  plugins: [vue(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
  build: { assetsInlineLimit: process.env.SINGLE ? 100000000 : 4096, chunkSizeWarningLimit: 900 },
})
