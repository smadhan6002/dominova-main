import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor libraries into separate cacheable chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) return 'vendor-gsap';
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router')) return 'vendor-router';
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor-react';
        },
      },
    },
    // Suppress source maps in production (reduces deploy size)
    sourcemap: false,
    // Raise chunk size warning threshold (GSAP is legitimately large)
    chunkSizeWarningLimit: 600,
  },
})
