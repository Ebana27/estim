import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    tailwindcss(),

    // 🔥 COPIE AUTOMATIQUE VERS dist
    viteStaticCopy({
      targets: [
        {
          src: 'pages/**/*',
          dest: 'pages'
        }
      ]
    })
  ],

  publicDir: 'public', // ✔️ UN SEUL dossier

  build: {
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      output: {
        manualChunks: {
          'ionic-core': ['@ionic/core'],
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name?.split('.').at(1)
          if (/png|jpe?g|svg|gif|ico/i.test(extType || '')) {
            extType = 'img'
          } else if (/woff|woff2|ttf|eot/i.test(extType || '')) {
            extType = 'fonts'
          }
          return `${extType}/[name]-[hash][extname]`
        }
      }
    }
  },

  server: {
    open: true,
    host: true,
    port: 55500
  }
})
