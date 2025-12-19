import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Necesario para Docker
    port: 80,
    watch: {
      usePolling: true // Necesario si editas desde Windows/Mac y corre en Linux
    }
  }
})