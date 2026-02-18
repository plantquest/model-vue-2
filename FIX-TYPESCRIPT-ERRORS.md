# TypeScript Build Errors - Fix Plan

**Total Errors**: 66 errors in 19 files  
**Status**: Fixing systematically

---

## Error Categories

### 1. Vuex useStore Import (13 files)
**Error**: `Module '"vuex"' has no exported member 'useStore'`  
**Fix**: Change `import { useStore } from 'vuex'` to `import { useStore } from 'vuex'` with proper Vuex 4 typing

**Files Affected**:
- All composables (8 files)
- Several components (5 files)

**Solution**: Vuex 4 exports useStore as named export, but TypeScript definitions might be outdated. Use type assertion or update imports.

### 2. Unused Variables (30+ warnings)
**Error**: `TS6133: 'variable' is declared but its value is never read`

**Solution**: Remove unused variables or prefix with underscore

### 3. Missing vxg.ts Type File
**Error**: `src/types/vxg.ts:79:36 - error TS2312`

**Solution**: Create the missing type file

### 4. Function Signature Mismatches
**Error**: Type mismatch in event handlers

**Solution**: Update function signatures or wrappers

---

## Fix Priority

1. **Critical**: Create missing types/vxg.ts (blocks build)
2. **High**: Fix Vuex useStore imports (13 files)
3. **Medium**: Fix unused variables (code cleanup)
4. **Low**: Fix minor type issues

---

## Detailed Fixes

See individual file fixes below...
