import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    host: 'dev-imperial.kz', // Или '0.0.0.0' для доступа извне
    port: 3001,
    strictPort: true,
    cors: {
      origin: '*', // Или конкретный backend, если нужно
    },
  },
})
