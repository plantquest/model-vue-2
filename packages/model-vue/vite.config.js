import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      // Entry point for the library
      entry: resolve(__dirname, 'src/index.js'),
      // Library name (global variable name for UMD)
      name: 'Vxg',
      // Output file names
      fileName: (format) => `vxg.${format}.js`,
      // Output formats: ESM (modern), UMD (browser), CJS (Node.js)
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: [
        'vue',
        'vuetify',
        'vue-router',
        'vuex',
        'pinia'
      ],
      output: {
        // Global variable names for UMD build
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
          'vue-router': 'VueRouter',
          vuex: 'Vuex',
          pinia: 'Pinia'
        },
        // Use named exports
        exports: 'named',
        // CSS file name
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'vxg.css'
          }
          return assetInfo.name
        }
      }
    },
    // Don't split CSS into separate files
    cssCodeSplit: false,
    // Generate sourcemaps for debugging
    sourcemap: true,
    // Target modern browsers (ES2020)
    target: 'es2020',
    // Minify in production
    minify: 'esbuild'
  },
  resolve: {
    alias: {
      // Allow @ imports in source
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue']
  }
})
