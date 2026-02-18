import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json'],
      include: [
        'src/**/*.{js,ts,vue}',
        'src/**/*.{jsx,tsx}'
      ],
      exclude: [
        'src/__tests__/**',
        'src/**/*.spec.ts',
        'src/**/*.test.ts',
        'src/types/**',
        'src/**/*.d.ts',
        'node_modules/**',
        'dist/**'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      },
      checkCoverage: false
    },
    includeSource: ['src/**/*.{js,ts,vue}'],
    include: [
      'src/**/*.{test,spec}.{js,ts}',
      'src/__tests__/**/*.{test,spec}.{js,ts}'
    ],
    testTimeout: 30000,
    hookTimeout: 10000,
    retry: 0,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
