import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/banh-banh/',
  plugins: [react()],
  build: {
    // Reach older iPhones and browsers that don't support the newest syntax
    target: ['es2020', 'safari14', 'chrome87', 'firefox78', 'edge88'],
  },
})
