# ACTIVE TASK: Week 1.2 - Vite Build System Configuration

**Assigned To**: fullstack-coder  
**Started**: February 9, 2026  
**Status**: 🔄 IN PROGRESS  
**Branch**: feature/week1-vite-build

---

## Objective

Configure Vite to build the Vue 3 library (`@plantquest/model-vue`) with multiple output formats (ESM, UMD, CJS) optimized for both modern bundlers and legacy browsers.

## Context

Task 1.1 (Monorepo) is complete. We now have:
- ✅ `packages/model-vue/` directory structure
- ✅ `packages/model-vue/package.json` ready
- ✅ `packages/model-vue/src/index.js` placeholder

Now we need to configure the build system so components can be developed and tested.

## Tasks

### 1. Install Vite Dependencies

Install required packages in the Vue 3 package:

```bash
cd packages/model-vue
pnpm add -D vite @vitejs/plugin-vue
pnpm add -D vue@^3.3.0
```

### 2. Create vite.config.js

Create `packages/model-vue/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

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
      external: ['vue', 'vuetify', 'vue-router', 'vuex'],
      output: {
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
          'vue-router': 'VueRouter',
          vuex: 'Vuex'
        },
        exports: 'named',
        assetFileNames: 'vxg.css'
      }
    },
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
```

### 3. Update package.json Scripts

Update `packages/model-vue/package.json` to add build scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 4. Test Build

Run the build to verify it works:

```bash
cd packages/model-vue
pnpm build
```

Expected output in `dist/`:
- `vxg.es.js` (ESM format)
- `vxg.umd.js` (UMD format)
- `vxg.cjs.js` (CommonJS format)

### 5. Verify External Dependencies

Check that Vue, Vuetify, etc. are NOT bundled:

```bash
ls -lh packages/model-vue/dist/
# Files should be small (<50KB total without external deps)
```

### 6. Update Root Scripts

Update root `package.json` to include build commands:

```json
{
  "scripts": {
    "build:all": "pnpm -r build",
    "build:v3": "pnpm --filter @plantquest/model-vue build",
    "dev:v3": "pnpm --filter @plantquest/model-vue dev"
  }
}
```

## Acceptance Criteria

- [ ] Vite installed in packages/model-vue
- [ ] vite.config.js created with library mode
- [ ] Build produces 3 formats: ESM, UMD, CJS
- [ ] External dependencies (vue, vuetify) NOT bundled
- [ ] Build outputs are valid JavaScript
- [ ] `pnpm build` command works from package directory
- [ ] `pnpm build:v3` works from root
- [ ] Bundle size reasonable (<50KB without deps)

## Deliverables

- `packages/model-vue/vite.config.js`
- Updated `packages/model-vue/package.json`
- `packages/model-vue/dist/` directory with builds
- Updated root `package.json`

## Testing

After completion:
1. Run `pnpm build:v3` from root
2. Check `packages/model-vue/dist/` exists
3. Verify 3 output files present
4. Check file sizes are reasonable

## Notes

- This is a library build, not an app build
- Tree-shaking will be verified in Week 4
- Actual components will be added in Week 2-3
- For now, we're just building the placeholder index.js

## Next Steps

After this task:
- Task 1.3: TypeScript configuration
- Task 1.4: Vitest testing infrastructure

---

**Reference**: WEEK-1-TASK-ASSIGNMENTS.md, DEC-000018, SPEC-000002
