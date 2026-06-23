import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

/**
 * Post-process public/ files copied to dist/, replacing %VITE_APP_URL%
 * with the actual env value so sitemap.xml and robots.txt get correct URLs.
 */
function publicEnvPlugin(): Plugin {
  let appUrl = 'http://localhost:5173'

  return {
    name: 'public-env-replace',
    enforce: 'post',
    config(_config, env) {
      // Use Vite's loadEnv to properly resolve .env files in priority order
      const resolved = loadEnv(env.mode, process.cwd(), 'VITE_')
      appUrl = resolved.VITE_APP_URL || 'http://localhost:5173'
      console.log(`  [public-env] mode="${env.mode}", VITE_APP_URL="${appUrl}"`)
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')

      const files = ['sitemap.xml', 'robots.txt']
      for (const file of files) {
        const filePath = path.join(distDir, file)
        if (fs.existsSync(filePath)) {
          let content = fs.readFileSync(filePath, 'utf-8')
          content = content.replace(/%VITE_APP_URL%/g, appUrl)
          fs.writeFileSync(filePath, content, 'utf-8')
          console.log(`  ✔ [public-env] Replaced %VITE_APP_URL% → ${appUrl} in ${file}`)
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), publicEnvPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Production base path — set via VITE_BASE env or default to '/'
  base: process.env.VITE_BASE || '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          charts: ['recharts'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
  preview: {
    port: 4173,
    strictPort: false,
  },
})
