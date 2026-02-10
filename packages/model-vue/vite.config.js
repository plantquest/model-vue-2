import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ 
      autoImport: true,
      styles: { configFile: 'src/styles/settings.scss' }
    }),
    visualizer({
      open: false,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    })
  ],
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
        'pinia',
        /^vuetify\//
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
        // Use named exports for better tree-shaking
        exports: 'named',
        // CSS file name
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'vxg.css'
          }
          return assetInfo.name
        },
        // Manual chunks for better code splitting
        manualChunks: undefined
      },
      // Tree-shaking optimization
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
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
