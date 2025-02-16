import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ems-frontend/',
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows the server to be accessible from external IPs
    port: 3000
  }
})
