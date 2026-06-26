import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/random/',
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
