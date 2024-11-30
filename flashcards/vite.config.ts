import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Adatbazisok2_flash_cards/',
  build: {
    // Ensure assets are properly referenced
    assetsDir: 'assets',
    // Generate sourcemaps for better debugging
    sourcemap: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,md}']
      },
      manifest: {
        name: 'Flashcard Study App',
        short_name: 'Flashcards',
        description: 'Study flashcards offline',
        theme_color: '#111827',
        background_color: '#111827',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/Adatbazisok2_flash_cards/',
        icons: [
          {
            src: '/Adatbazisok2_flash_cards/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/Adatbazisok2_flash_cards/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})