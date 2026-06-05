import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    historyApiFallback: true,
  },
  build: {
    // Raise the chunk size warning threshold
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting: separate heavy vendors into their own cached files
        manualChunks(id) {
          // framer-motion → its own chunk (large animation library)
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer-motion'
          }
          // three.js → its own chunk (600KB, only used in WebGL component)
          if (id.includes('node_modules/three')) {
            return 'vendor-three'
          }
          // react-icons → separate chunk (icon sets are large)
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons'
          }
          // Supabase → separate chunk
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase'
          }
          // All remaining node_modules → shared vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        // Ensure hashed filenames for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
