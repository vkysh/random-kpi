import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'process'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/random/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "/src/styles/_variables.scss";\n
          @import "/src/styles/_mixins.scss";\n
        ` 
      }
    }
  }
})
