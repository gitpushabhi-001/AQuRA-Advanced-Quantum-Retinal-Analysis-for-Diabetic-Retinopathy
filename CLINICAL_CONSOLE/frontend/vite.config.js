import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    cors: true,
    proxy: {
      '/predict': {
        target: 'https://aquara-advance-retinal-kit.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/history': {
        target: 'https://aquara-advance-retinal-kit.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/health': {
        target: 'https://aquara-advance-retinal-kit.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/api': {
        target: 'https://aquara-advance-retinal-kit.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
