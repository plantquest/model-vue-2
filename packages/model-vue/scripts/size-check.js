#!/usr/bin/env node

/**
 * Bundle Size Check Script
 * 
 * Verifies that bundle sizes are within acceptable limits.
 * Fails CI/CD pipeline if sizes exceed thresholds.
 * 
 * Usage:
 *   node scripts/size-check.js
 *   pnpm run size-check
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { gzipSync, brotliCompressSync, constants } from 'zlib'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
}

// Size thresholds (in bytes)
const MAX_SIZES = {
  'vxg.es.js': {
    raw: 100 * 1024,      // 100 KB
    gzip: 35 * 1024,      // 35 KB
    brotli: 30 * 1024     // 30 KB
  },
  'vxg.umd.js': {
    raw: 150 * 1024,      // 150 KB
    gzip: 50 * 1024,      // 50 KB
    brotli: 40 * 1024     // 40 KB
  },
  'vxg.cjs.js': {
    raw: 150 * 1024,      // 150 KB
    gzip: 50 * 1024,      // 50 KB
    brotli: 40 * 1024     // 40 KB
  },
  'vxg.css': {
    raw: 10 * 1024,       // 10 KB
    gzip: 3 * 1024,       // 3 KB
    brotli: 2.5 * 1024    // 2.5 KB
  }
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Calculate percentage of max size
 */
function calculatePercentage(size, maxSize) {
  return ((size / maxSize) * 100).toFixed(1)
}

/**
 * Get status indicator
 */
function getStatus(size, maxSize) {
  const percentage = (size / maxSize) * 100
  
  if (percentage > 100) {
    return `${colors.red}${colors.bold}❌ FAIL${colors.reset}`
  } else if (percentage > 90) {
    return `${colors.yellow}⚠️  WARN${colors.reset}`
  } else if (percentage > 75) {
    return `${colors.green}✅ PASS${colors.reset}`
  } else {
    return `${colors.green}${colors.bold}✅ EXCELLENT${colors.reset}`
  }
}

/**
 * Check a single file
 */
function checkFile(filePath, fileName) {
  if (!fs.existsSync(filePath)) {
    console.log(`${colors.yellow}⚠️  SKIP${colors.reset} ${fileName} (not found)`)
    return { passed: true, skipped: true }
  }
  
  const content = fs.readFileSync(filePath)
  const rawSize = content.length
  const gzipSize = gzipSync(content, { level: 9 }).length
  const brotliSize = brotliCompressSync(content, {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 11
    }
  }).length
  
  const thresholds = MAX_SIZES[fileName]
  
  if (!thresholds) {
    console.log(`${colors.cyan}ℹ️  INFO${colors.reset} ${fileName}`)
    console.log(`  Raw:    ${formatBytes(rawSize)}`)
    console.log(`  Gzip:   ${formatBytes(gzipSize)}`)
    console.log(`  Brotli: ${formatBytes(brotliSize)}`)
    console.log('')
    return { passed: true }
  }
  
  // Check each compression type
  const rawPass = rawSize <= thresholds.raw
  const gzipPass = gzipSize <= thresholds.gzip
  const brotliPass = brotliSize <= thresholds.brotli
  
  const allPass = rawPass && gzipPass && brotliPass
  
  console.log(`${getStatus(rawSize, thresholds.raw)} ${colors.bold}${fileName}${colors.reset}`)
  console.log(`  ${colors.cyan}Raw:${colors.reset}    ${formatBytes(rawSize).padEnd(10)} / ${formatBytes(thresholds.raw).padEnd(10)} (${calculatePercentage(rawSize, thresholds.raw)}%)`)
  console.log(`  ${colors.cyan}Gzip:${colors.reset}   ${formatBytes(gzipSize).padEnd(10)} / ${formatBytes(thresholds.gzip).padEnd(10)} (${calculatePercentage(gzipSize, thresholds.gzip)}%)`)
  console.log(`  ${colors.cyan}Brotli:${colors.reset} ${formatBytes(brotliSize).padEnd(10)} / ${formatBytes(thresholds.brotli).padEnd(10)} (${calculatePercentage(brotliSize, thresholds.brotli)}%)`)
  
  if (!allPass) {
    if (!rawPass) {
      console.log(`  ${colors.red}❌ Raw size exceeds limit by ${formatBytes(rawSize - thresholds.raw)}${colors.reset}`)
    }
    if (!gzipPass) {
      console.log(`  ${colors.red}❌ Gzip size exceeds limit by ${formatBytes(gzipSize - thresholds.gzip)}${colors.reset}`)
    }
    if (!brotliPass) {
      console.log(`  ${colors.red}❌ Brotli size exceeds limit by ${formatBytes(brotliSize - thresholds.brotli)}${colors.reset}`)
    }
  }
  
  console.log('')
  
  return {
    passed: allPass,
    fileName,
    rawSize,
    gzipSize,
    brotliSize,
    thresholds
  }
}

/**
 * Main function
 */
function main() {
  console.log(`${colors.bold}${colors.blue}`)
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║          Bundle Size Check - @plantquest/model-vue         ║')
  console.log('╚════════════════════════════════════════════════════════════╝')
  console.log(colors.reset)
  console.log('')
  
  const distPath = path.resolve(__dirname, '../dist')
  
  // Check if dist directory exists
  if (!fs.existsSync(distPath)) {
    console.log(`${colors.red}❌ Error: dist directory not found${colors.reset}`)
    console.log('Run "pnpm build" first to generate build output.')
    process.exit(1)
  }
  
  // Files to check
  const filesToCheck = [
    'vxg.es.js',
    'vxg.umd.js',
    'vxg.cjs.js',
    'vxg.css'
  ]
  
  let allPassed = true
  const results = []
  
  // Check each file
  for (const fileName of filesToCheck) {
    const filePath = path.join(distPath, fileName)
    const result = checkFile(filePath, fileName)
    
    if (!result.skipped) {
      results.push(result)
      if (!result.passed) {
        allPassed = false
      }
    }
  }
  
  // Summary
  console.log(`${colors.bold}${colors.cyan}Summary:${colors.reset}`)
  const passedCount = results.filter(r => r.passed).length
  const totalCount = results.length
  
  if (allPassed) {
    console.log(`${colors.green}${colors.bold}✅ All checks passed!${colors.reset} (${passedCount}/${totalCount})`)
    console.log('')
    console.log('Bundle sizes are within acceptable limits.')
    console.log('Safe to publish! 🚀')
  } else {
    console.log(`${colors.red}${colors.bold}❌ Some checks failed!${colors.reset} (${passedCount}/${totalCount} passed)`)
    console.log('')
    console.log('Bundle sizes exceed thresholds.')
    console.log('Please optimize before publishing.')
  }
  
  console.log('')
  
  // Exit with appropriate code
  process.exit(allPassed ? 0 : 1)
}

// Run the script
main()
