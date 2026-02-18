import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Vxg',
      fileName: (format) => `vxg.${format}.js`,
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      external: ['vue', 'vuetify', 'vue-router', 'vuex', 'pinia'],
      output: {
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
          'vue-router': 'VueRouter',
          vuex: 'Vuex',
          pinia: 'Pinia'
        },
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'vxg.css'
          }
          return assetInfo.name
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    target: 'es2020',
    minify: 'esbuild'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: ['vue']
  }
})
