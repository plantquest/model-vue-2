# Build Instructions for @plantquest/model-vue

## Prerequisites

- Node.js >= 16.0.0
- pnpm >= 8.0.0

## Installation

From the repository root:

```bash
pnpm install
```

This will install dependencies for all packages in the workspace.

## Building

### Build Vue 3 Package

From the repository root:
```bash
pnpm build:v3
```

Or from the package directory:
```bash
cd packages/model-vue
pnpm build
```

### Build Output

The build creates three output formats in `dist/`:

1. **ESM (ES Modules)** - `dist/vxg.es.js`
   - Modern format for bundlers (Vite, Webpack, Rollup)
   - Tree-shakeable
   - Recommended for new projects

2. **UMD (Universal Module Definition)** - `dist/vxg.umd.js`
   - Browser-compatible format
   - Can be used via CDN
   - Includes all exports in global `Vxg` variable

3. **CJS (CommonJS)** - `dist/vxg.cjs.js`
   - Node.js compatible format
   - For server-side rendering or Node.js tools

4. **CSS** - `dist/vxg.css`
   - Component styles (when added in Week 2-3)

5. **Source Maps** - `dist/*.js.map`
   - For debugging

### Expected Build Sizes

With placeholder code (Week 1):
- `vxg.es.js`: ~1-2 KB
- `vxg.umd.js`: ~1-2 KB
- `vxg.cjs.js`: ~1-2 KB

After component migration (Week 2-3):
- Expected: 50-150 KB (without external dependencies)
- External deps (vue, vuetify) are NOT bundled

## Development

### Dev Server

Start development server with HMR:

```bash
pnpm dev:v3
```

This is useful when creating example pages or testing components.

### Preview Build

Preview the production build locally:

```bash
pnpm preview:v3
```

## Verification

### Check Build Output

```bash
ls -lh packages/model-vue/dist/
```

Should show:
- vxg.es.js
- vxg.es.js.map
- vxg.umd.js
- vxg.umd.js.map
- vxg.cjs.js
- vxg.cjs.js.map

### Verify External Dependencies

External dependencies should NOT be included in the bundle.

Check bundle size:
```bash
du -sh packages/model-vue/dist/*.js
```

If Vue/Vuetify are bundled, files will be >500KB. Correct size is <50KB.

### Test Import

Test ESM import:
```javascript
// In a test file
import Vxg from '@plantquest/model-vue'
console.log(Vxg.version) // Should log: 1.0.0-alpha.1
```

Test UMD import (browser):
```html
<script src="./dist/vxg.umd.js"></script>
<script>
  console.log(window.Vxg.version) // Should log: 1.0.0-alpha.1
</script>
```

## Configuration

### Vite Config

See `vite.config.js` for full configuration.

Key settings:
- **Library mode**: Builds as a library, not an app
- **Multiple formats**: ESM, UMD, CJS
- **External dependencies**: Vue, Vuetify, Vue Router, Vuex, Pinia
- **Sourcemaps**: Enabled for debugging
- **CSS**: Bundled as single `vxg.css` file

### Package.json

See `package.json` for:
- **Entry points**: `main` (CJS), `module` (ESM), `exports` (conditional)
- **Files**: What gets published to npm
- **Scripts**: Build, dev, preview commands
- **Dependencies**: Peer dependencies (vue, vuetify)

## Troubleshooting

### "Cannot find module 'vite'"

Run `pnpm install` from the root directory.

### Build fails with "Entry not found"

Ensure `src/index.js` exists.

### External dependencies bundled

Check `vite.config.js` `external` array includes the dependency.

### Large bundle size

Check that peer dependencies are in `peerDependencies` not `dependencies` in package.json.

## Next Steps

After Week 1.2 (Vite) completes:
- **Week 1.3**: TypeScript configuration (types will be generated during build)
- **Week 1.4**: Vitest testing infrastructure
- **Week 2-3**: Component migration (actual code to build!)

---

**Status**: ✅ Configuration complete, ready for Week 2 component migration  
**Reference**: WEEK-1-TASK-ASSIGNMENTS.md, DEC-000018, SPEC-000002
