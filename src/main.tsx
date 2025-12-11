import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Service worker will be auto-registered by vite-plugin-pwa
// Listen for service worker updates
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.ready.then(() => {
      console.log('✓ Service Worker is ready - App can work offline!')
      // Show toast notification after a short delay
      setTimeout(() => {
        const event = new CustomEvent('pwa-offline-ready')
        window.dispatchEvent(event)
      }, 2000)
    })
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
