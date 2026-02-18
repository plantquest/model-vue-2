import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    // Enable global test APIs (describe, it, expect, etc.)
    globals: true,
    
    // Test environment
    environment: 'jsdom',
    
    // Setup files to run before each test file
    setupFiles: ['./src/__tests__/setup.ts'],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json'],
      
      // Files to include in coverage
      include: [
        'src/**/*.{js,ts,vue}',
        'src/**/*.{jsx,tsx}'
      ],
      
      // Files to exclude from coverage
      exclude: [
        'src/__tests__/**',
        'src/**/*.spec.ts',
        'src/**/*.test.ts',
        'src/types/**',
        'src/**/*.d.ts',
        'node_modules/**',
        'dist/**'
      ],
      
      // Coverage thresholds (SPEC-000002 requirement: >80%)
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      },
      
      // Fail build if coverage is below thresholds
      checkCoverage: true
    },
    
    // Include source files for coverage
    includeSource: ['src/**/*.{js,ts,vue}'],
    
    // Test file patterns
    include: [
      'src/**/*.{test,spec}.{js,ts}',
      'src/__tests__/**/*.{test,spec}.{js,ts}'
    ],
    
    // Test timeout (30 seconds)
    testTimeout: 30000,
    
    // Hook timeout (10 seconds)
    hookTimeout: 10000,
    
    // Retry failed tests
    retry: 0,
    
    // Run tests in parallel
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
