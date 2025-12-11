import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Adatbazisok2_flash_cards/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['**/*'],
      manifest: {
        name: 'Adatbázisok 2',
        short_name: 'Adatbázisok 2',
        theme_color: '#111827'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,md,png,pdf}'],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024 // 50MB for large PDFs
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        // Ensure asset paths are relative
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})