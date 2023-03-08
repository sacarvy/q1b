import { defineConfig } from 'astro/config'

import solid from '@astrojs/solid-js'
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://peadevp.com',
  integrations: [
    AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Astro PWA',
        short_name: 'Astro PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicons/icons/favicon-72x72.png',
            type: 'image/png',
            sizes: '72x72',
            purpose: 'any maskable',
          },
          {
            src: '/favicons/icons/favicon-96x96.png',
            type: 'image/png',
            sizes: '96x96',
            purpose: 'any maskable',
          },
          {
            src: '/favicons/icons/favicon-128x128.png',
            type: 'image/png',
            sizes: '128x128',
            purpose: 'any maskable',
          },
          {
            src: '/favicons/icons/favicon-144x144.png',
            type: 'image/png',
            sizes: '144x144',
            purpose: 'any maskable',
          },
          {
            src: '/favicons/icons/favicon-152x152.png',
            type: 'image/png',
            sizes: '152x152',
            purpose: 'any maskable',
          },
          {
            src: '/favicons/icons/favicon-192x192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any maskable',
          },
          {
            src: '/favicons/icons/favicon-384x384.png',
            type: 'image/png',
            sizes: '384x384',
            purpose: 'any maskable',
          },
          {
            src: '/favicons/icons/favicon-512x512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/404',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/404$/],
      },
    }),
    solid(),
  ],
})
