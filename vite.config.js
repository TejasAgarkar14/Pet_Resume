// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })




import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Tell Vite not to try to bundle these at build time
      external: ['jspdf', 'html2canvas']
    }
  },
  optimizeDeps: {
    // Ensure they are pre-bundled properly in dev & build
    include: ['jspdf', 'html2canvas']
  }
})
