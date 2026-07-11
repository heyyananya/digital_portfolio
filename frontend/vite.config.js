import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/digital_portfolio_ananya/',
  plugins: [react()],
  server: {
    host: true,
  }
})
