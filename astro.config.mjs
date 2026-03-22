import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  // 'static' = sitio 100% estático, sin Workers, $0/mes en Cloudflare Pages
  // Cambiar a 'server' solo si se agrega panel admin con SSR en el futuro
  output: 'static',
  adapter: cloudflare(),
  integrations: [tailwind()],
})
