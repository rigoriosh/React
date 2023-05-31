import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [
    react(),
    VitePWA({
       registerType: 'prompt',
      //  injectRegister: 'script',
      /* devOptions: {
        enabled: true,
        type: 'module',
      }, */
      workbox: {
        globPatterns: ['**/*'],
        sourcemap: true
      },
      includeAssets: ["**/*"],
      manifest: {
        name: 'SAE-APP',
        short_name: 'sae-app',
        description: 'SAE-APP description',
        theme_color: "#171717",
        background_color: "#e8ebf2",
        display:"standalone",
        scope:"/",
        start_url:"/",
        orientation:"portrait",
        icons: [
          {
            src: '/Favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: '/Apple-Icon-57x57.png',
            sizes: '57x57',
            type: 'image/png'
          },
          {
            src: '/Iphone6-7-8plus.png',
            sizes: '2588x4600',
            type: 'image/png'
          },
          {
            src: '/Linea.png',
            sizes: '97x97',
            type: 'image/png'
          },
          {
            src: '/Poligono.png',
            sizes: '97x97',
            type: 'image/png'
          },
          {
            src: '/Punto.png',
            sizes: '97x97',
            type: 'image/png'
          }
        ],
        
      },

    })
  ],
  server:{
    port:5174,
    open: '/index.html'
  }
})
