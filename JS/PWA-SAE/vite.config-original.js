import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [
    react(),    
  ],
  server:{
    port:5174,
    open: '/index.html'
  }
})
