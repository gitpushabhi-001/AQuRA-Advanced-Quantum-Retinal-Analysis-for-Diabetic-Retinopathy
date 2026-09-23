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
        target: 'https://aqura-backend-b5y9.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/history': {
        target: 'https://aqura-backend-b5y9.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/health': {
        target: 'https://aqura-backend-b5y9.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/api': {
        target: 'https://aqura-backend-b5y9.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
