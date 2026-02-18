# Week 4-5 Task Assignments - Vue 3.0 Migration

**Week**: 4-5 of 11  
**Phase**: Ecosystem Integration & Polish  
**Duration**: Mar 10-21, 2026 (10 days)  
**Goal**: Finalize Vue 3 ecosystem integration and optimize production build  

---

## Overview

Week 4-5 focuses on ecosystem integration, build optimization, and documentation. This phase ensures the library is production-ready with proper third-party integrations, optimized bundle size, and comprehensive documentation.

**Success Criteria**:
- ✅ Vuetify 3 fully integrated and styled
- ✅ Day.js replacing Moment.js (smaller bundle)
- ✅ Plugin system working with Vue 3
- ✅ Bundle size optimized (<150KB)
- ✅ Complete migration documentation
- ✅ All 4 agents' work integrated

---

## Task 4.1: Vuetify 3 Fine-tuning & Theme Integration

**Assigned To**: frontend-coder-1  
**Duration**: 4-5 days  
**Branch**: `feature/week4-vuetify-polish`  
**Priority**: 🔴 HIGH (visual quality & UX)

### Description
Review and polish all Vuetify 3 component usage, ensure consistent theming, responsive behavior, and proper styling across all components.

### Dependencies
- 🔗 **Requires**: Week 2-3 component migrations complete
- 🔗 **Requires**: All components using Vuetify 3 syntax

### Tasks

#### 1. Component Styling Audit
Review all migrated components for Vuetify 3 styling:

```javascript
// src/__tests__/vuetify-audit.js
const componentsToAudit = [
  'BasicHead',
  'BasicSide',
  'BasicNavStages',
  'BasicSpinner',
  'BasicFoot',
  'BasicFieldPick',
  // ... all other components
]

// For each component check:
// - v-btn variations (text, outlined, icon)
// - v-icon usage and sizes
// - Spacing (ma-, pa-, mx-, my-)
// - Colors (primary, secondary, error, etc.)
// - Elevation/shadows
```

**Action Items**:
- [ ] Create audit checklist for all components
- [ ] Document inconsistencies in `.cursor/VUETIFY-AUDIT.md`
- [ ] Fix spacing inconsistencies
- [ ] Standardize button styles
- [ ] Verify icon sizes and colors

#### 2. Responsive Behavior Review
Ensure all components work across breakpoints:

```javascript
// Test all components at breakpoints
const breakpoints = {
  xs: '< 600px',
  sm: '600px - 960px',
  md: '960px - 1280px',
  lg: '1280px - 1920px',
  xl: '> 1920px'
}

// Components to test:
// - BasicHead (mobile menu collapse)
// - BasicSide (drawer behavior)
// - BasicNavStages (horizontal scroll on mobile)
// - Map controls (responsive positioning)
```

**Action Items**:
- [ ] Test each component at all breakpoints
- [ ] Fix mobile layout issues
- [ ] Ensure touch-friendly interactions
- [ ] Test tablet landscape/portrait
- [ ] Document responsive patterns in `.cursor/RESPONSIVE-GUIDE.md`

#### 3. Theme Integration
Ensure proper Vuetify 3 theme system integration:

```javascript
// packages/model-vue/src/plugins/vuetify.js
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          // PlantQuest custom colors
          'pqs-green': '#4CAF50',
          'pqs-blue': '#2196F3',
          'pqs-gray': '#757575'
        }
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#616161',
          // ... dark theme colors
        }
      }
    }
  }
})
```

**Action Items**:
- [ ] Setup Vuetify theme configuration
- [ ] Define custom PlantQuest colors
- [ ] Test light/dark theme switching
- [ ] Ensure all components respect theme
- [ ] Add theme toggle component (optional)

#### 4. CSS Cleanup
Remove unused styles and ensure proper scoping:

**Action Items**:
- [ ] Remove Vue 2 specific styles
- [ ] Ensure `<style scoped>` on all components
- [ ] Remove duplicate CSS rules
- [ ] Use Vuetify utilities instead of custom CSS where possible
- [ ] Document custom CSS in `.cursor/CSS-CONVENTIONS.md`

### Acceptance Criteria
- [ ] All components styled consistently with Vuetify 3
- [ ] Responsive behavior verified on all breakpoints
- [ ] Theme system configured and working
- [ ] Light/dark mode support (if applicable)
- [ ] No visual regressions from Vue 2 version
- [ ] CSS cleanup complete
- [ ] Documentation updated

### Deliverables
- `.cursor/VUETIFY-AUDIT.md` (audit results)
- `.cursor/RESPONSIVE-GUIDE.md` (responsive patterns)
- `.cursor/CSS-CONVENTIONS.md` (style guidelines)
- `src/plugins/vuetify.js` (theme config)
- Updated component styles
- Visual regression test suite (optional)

### Risks & Mitigations
- ⚠️ **Risk**: Breaking existing styles
  - **Mitigation**: Visual comparison screenshots before/after
- ⚠️ **Risk**: Theme conflicts with consuming apps
  - **Mitigation**: Namespace custom colors with 'pqs-' prefix

---

## Task 4.2: Day.js Migration & Date Formatting

**Assigned To**: frontend-coder-2  
**Duration**: 3-4 days  
**Branch**: `feature/week4-dayjs-migration`  
**Priority**: 🟡 MEDIUM (bundle size optimization)

### Description
Replace Moment.js with Day.js to reduce bundle size. Day.js is 2KB vs Moment's 67KB, and supports tree-shaking.

### Dependencies
- 🔗 **Requires**: Identify all Moment.js usage in codebase
- 🔗 **Requires**: Week 2-3 component migrations complete

### Tasks

#### 1. Audit Moment.js Usage
Find all Moment.js references:

```bash
# Search for moment imports
rg "import.*moment" packages/model-vue/src/
rg "require.*moment" packages/model-vue/src/
rg "\.format\(" packages/model-vue/src/  # Common moment pattern
rg "\.fromNow\(" packages/model-vue/src/  # Relative time
```

**Action Items**:
- [ ] Create list of all Moment.js usages in `.cursor/MOMENT-USAGE.md`
- [ ] Categorize by type (formatting, parsing, manipulation, relative time)
- [ ] Identify required Day.js plugins
- [ ] Document migration strategy

#### 2. Install Day.js and Plugins
Setup Day.js with necessary plugins:

```bash
cd packages/model-vue
pnpm add dayjs
# Plugins as needed:
# - relativeTime (for .fromNow())
# - customParseFormat (for custom formats)
# - utc (for UTC handling)
# - timezone (if needed)
```

```javascript
// packages/model-vue/src/utils/date.js
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(utc)

export default dayjs

// Migration helpers
export const formatters = {
  standard: 'YYYY-MM-DD',
  display: 'MMM D, YYYY',
  full: 'MMMM D, YYYY h:mm A',
  iso: 'YYYY-MM-DDTHH:mm:ss'
}
```

**Action Items**:
- [ ] Install Day.js and required plugins
- [ ] Create `src/utils/date.js` utility module
- [ ] Define standard date formats
- [ ] Create migration helper functions

#### 3. Replace Moment.js Calls
Migrate all Moment.js usage to Day.js:

**Common Migrations**:

```javascript
// BEFORE (Moment.js)
import moment from 'moment'

const formatted = moment(date).format('YYYY-MM-DD')
const relative = moment(date).fromNow()
const parsed = moment(dateString, 'MM/DD/YYYY')

// AFTER (Day.js)
import dayjs from '@/utils/date'

const formatted = dayjs(date).format('YYYY-MM-DD')
const relative = dayjs(date).fromNow()
const parsed = dayjs(dateString, 'MM/DD/YYYY')
```

**Action Items**:
- [ ] Replace all `moment()` calls with `dayjs()`
- [ ] Update all date formatting
- [ ] Migrate relative time usage
- [ ] Update date parsing
- [ ] Remove Moment.js imports
- [ ] Remove Moment.js from package.json

#### 4. Tree-shaking Setup
Ensure Day.js plugins are tree-shakeable:

```javascript
// vite.config.js - verify tree-shaking
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'dayjs': ['dayjs']
        }
      }
    }
  }
})
```

**Action Items**:
- [ ] Configure Vite for optimal tree-shaking
- [ ] Only import needed Day.js plugins
- [ ] Verify bundle size reduction
- [ ] Document bundle size before/after

#### 5. Testing
Ensure date functionality works correctly:

```typescript
// src/__tests__/utils/date.spec.ts
import { describe, it, expect } from 'vitest'
import dayjs, { formatters } from '@/utils/date'

describe('Date Utilities', () => {
  it('formats dates correctly', () => {
    const date = new Date('2026-03-15')
    expect(dayjs(date).format(formatters.standard)).toBe('2026-03-15')
    expect(dayjs(date).format(formatters.display)).toBe('Mar 15, 2026')
  })

  it('handles relative time', () => {
    const yesterday = dayjs().subtract(1, 'day')
    expect(yesterday.fromNow()).toBe('a day ago')
  })

  it('parses custom formats', () => {
    const parsed = dayjs('03/15/2026', 'MM/DD/YYYY')
    expect(parsed.isValid()).toBe(true)
  })
})
```

**Action Items**:
- [ ] Create comprehensive date utility tests
- [ ] Test all date formatting patterns
- [ ] Verify relative time calculations
- [ ] Test edge cases (invalid dates, timezones)
- [ ] Ensure >80% coverage

### Acceptance Criteria
- [ ] All Moment.js references removed
- [ ] Day.js integrated and working
- [ ] Bundle size reduced by ~65KB
- [ ] All date formatting working correctly
- [ ] Tree-shaking verified
- [ ] Tests passing with >80% coverage
- [ ] Documentation updated

### Deliverables
- `.cursor/MOMENT-USAGE.md` (audit results)
- `src/utils/date.js` (Day.js wrapper)
- `src/__tests__/utils/date.spec.ts` (tests)
- Updated components using new date utility
- Bundle size comparison report

### Risks & Mitigations
- ⚠️ **Risk**: API differences between Moment and Day.js
  - **Mitigation**: Comprehensive testing of all date operations
- ⚠️ **Risk**: Breaking date formatting in consuming apps
  - **Mitigation**: Document format changes in migration guide

---

## Task 4.3: Plugin System & Store Integration

**Assigned To**: frontend-coder-3  
**Duration**: 3-4 days  
**Branch**: `feature/week4-plugin-system`  
**Priority**: 🔴 HIGH (core functionality)

### Description
Implement Vue 3 plugin registration system, integrate with Vuex 4 or Pinia, and setup global properties for Vxg class.

### Dependencies
- 🔗 **Requires**: Week 1 build system complete
- 🔗 **Requires**: Vxg class migrated to Vue 3

### Tasks

#### 1. Vue 3 Plugin Registration
Update plugin installation for Vue 3:

```javascript
// packages/model-vue/src/index.js
import { App, Plugin } from 'vue'
import Vxg from './vxg'

// Import all components
import BasicHead from './components/BasicHead.vue'
import BasicSide from './components/BasicSide.vue'
import BasicNavStages from './components/BasicNavStages.vue'
// ... more components

const VxgPlugin = {
  install(app, options = {}) {
    // Create Vxg instance
    const vxg = new Vxg(options)
    
    // Provide Vxg globally (Vue 3 way)
    app.provide('vxg', vxg)
    
    // Also add to globalProperties for Options API compatibility
    app.config.globalProperties.$vxg = vxg
    
    // Register all components globally (optional)
    if (options.components !== false) {
      app.component('VxgBasicHead', BasicHead)
      app.component('VxgBasicSide', BasicSide)
      app.component('VxgBasicNavStages', BasicNavStages)
      // ... more components
    }
    
    // Initialize store integration if provided
    if (options.store) {
      vxg.connectStore(options.store)
    }
  }
}

export default VxgPlugin
export { Vxg }

// Named exports for tree-shaking
export {
  BasicHead,
  BasicSide,
  BasicNavStages,
  // ... more components
}
```

**Action Items**:
- [ ] Update plugin installation to Vue 3 API
- [ ] Use `app.provide()` for Composition API
- [ ] Use `app.config.globalProperties` for Options API
- [ ] Register components globally (with opt-out)
- [ ] Support tree-shakeable named exports

#### 2. Store Integration (Vuex 4 / Pinia)
Support both Vuex 4 and Pinia:

```javascript
// packages/model-vue/src/vxg/store-connector.js
export class StoreConnector {
  constructor(vxg, store) {
    this.vxg = vxg
    this.store = store
    this.storeType = this.detectStoreType(store)
  }

  detectStoreType(store) {
    if (store.install && store._devtools) {
      return 'vuex4'
    } else if (store._s) {
      return 'pinia'
    }
    return 'unknown'
  }

  // Vuex 4 integration
  connectVuex() {
    const { vxg, store } = this
    
    // Subscribe to store mutations
    store.subscribe((mutation, state) => {
      if (mutation.type.startsWith('vxg/')) {
        vxg.handleStateChange(mutation.payload, state)
      }
    })
    
    // Allow Vxg to commit mutations
    vxg.commit = (type, payload) => {
      store.commit(`vxg/${type}`, payload)
    }
    
    vxg.dispatch = (type, payload) => {
      return store.dispatch(`vxg/${type}`, payload)
    }
  }

  // Pinia integration
  connectPinia() {
    const { vxg, store } = this
    
    // Get or create vxg store
    const vxgStore = store._s.get('vxg') || createVxgStore()
    
    // Subscribe to store changes
    vxgStore.$subscribe((mutation, state) => {
      vxg.handleStateChange(mutation, state)
    })
    
    // Allow Vxg to update store
    vxg.updateStore = (updates) => {
      vxgStore.$patch(updates)
    }
  }

  connect() {
    if (this.storeType === 'vuex4') {
      this.connectVuex()
    } else if (this.storeType === 'pinia') {
      this.connectPinia()
    } else {
      console.warn('[Vxg] Unknown store type, store integration disabled')
    }
  }
}
```

**Action Items**:
- [ ] Create store connector utility
- [ ] Support Vuex 4 integration
- [ ] Support Pinia integration
- [ ] Auto-detect store type
- [ ] Document store integration patterns

#### 3. Global Properties Setup
Ensure Vxg accessible in all components:

```typescript
// src/types/vue-augmentation.ts
import { Vxg } from './vxg'

declare module 'vue' {
  interface ComponentCustomProperties {
    $vxg: Vxg
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vxg: Vxg
  }
}
```

**Usage Examples**:

```vue
<!-- Options API -->
<script>
export default {
  mounted() {
    // Access via this.$vxg
    console.log(this.$vxg.state.cmp)
    this.$vxg.set('user', 'profile', { name: 'John' })
  }
}
</script>

<!-- Composition API -->
<script setup>
import { inject } from 'vue'

const vxg = inject('vxg')

onMounted(() => {
  console.log(vxg.state.cmp)
  vxg.set('user', 'profile', { name: 'John' })
})
</script>
```

**Action Items**:
- [ ] Setup TypeScript augmentation
- [ ] Test Options API access (`this.$vxg`)
- [ ] Test Composition API access (`inject('vxg')`)
- [ ] Document both usage patterns
- [ ] Create usage examples

#### 4. Plugin Configuration Options
Support flexible configuration:

```javascript
// Example usage in consuming app
import { createApp } from 'vue'
import { createStore } from 'vuex'
import VxgPlugin from '@plantquest/model-vue'

const store = createStore({ /* ... */ })

const app = createApp(App)

app.use(VxgPlugin, {
  // Register components globally (default: true)
  components: true,
  
  // Component name prefix (default: 'Vxg')
  prefix: 'Vxg',
  
  // Store integration
  store: store,
  
  // Vxg configuration
  allow: {
    match: [
      { role: 'admin', modify: ['*'] },
      { role: 'user', modify: ['profile'] }
    ]
  },
  
  // Custom state initialization
  initialState: {
    cmp: {
      'basic-head': { show: true }
    }
  }
})
```

**Action Items**:
- [ ] Define plugin options interface
- [ ] Implement configuration handling
- [ ] Support component registration options
- [ ] Document all configuration options
- [ ] Create configuration examples

#### 5. Testing
Test plugin installation and integration:

```typescript
// src/__tests__/plugin.spec.ts
import { describe, it, expect } from 'vitest'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import VxgPlugin, { Vxg } from '../index'

describe('VxgPlugin', () => {
  it('installs plugin correctly', () => {
    const app = createApp({})
    app.use(VxgPlugin)
    
    expect(app.config.globalProperties.$vxg).toBeInstanceOf(Vxg)
  })

  it('integrates with Vuex 4', () => {
    const store = createStore({})
    const app = createApp({})
    
    app.use(VxgPlugin, { store })
    
    const vxg = app.config.globalProperties.$vxg
    expect(vxg.commit).toBeDefined()
    expect(vxg.dispatch).toBeDefined()
  })

  it('registers components globally', () => {
    const app = createApp({})
    app.use(VxgPlugin, { components: true })
    
    expect(app.component('VxgBasicHead')).toBeDefined()
  })
})
```

**Action Items**:
- [ ] Test plugin installation
- [ ] Test Vuex 4 integration
- [ ] Test Pinia integration
- [ ] Test global properties access
- [ ] Test component registration
- [ ] Ensure >80% coverage

### Acceptance Criteria
- [ ] Plugin installs with `app.use(VxgPlugin)`
- [ ] Vxg accessible via `this.$vxg` (Options API)
- [ ] Vxg accessible via `inject('vxg')` (Composition API)
- [ ] Vuex 4 integration working
- [ ] Pinia integration working
- [ ] Components register globally (with opt-out)
- [ ] Configuration options working
- [ ] Tests passing with >80% coverage
- [ ] Documentation updated

### Deliverables
- `src/index.js` (plugin registration)
- `src/vxg/store-connector.js` (store integration)
- `src/types/vue-augmentation.ts` (type definitions)
- `src/__tests__/plugin.spec.ts` (tests)
- `.cursor/PLUGIN-USAGE.md` (usage guide)

### Risks & Mitigations
- ⚠️ **Risk**: Breaking changes for existing integrations
  - **Mitigation**: Document migration path clearly
- ⚠️ **Risk**: Store integration complexity
  - **Mitigation**: Support both Vuex and Pinia patterns

---

## Task 4.4: Build Optimization & Documentation

**Assigned To**: frontend-coder-4  
**Duration**: 4-5 days  
**Branch**: `feature/week4-build-optimization`  
**Priority**: 🔴 HIGH (production readiness)

### Description
Optimize build output, analyze bundle size, setup code splitting, and create comprehensive migration documentation.

### Dependencies
- 🔗 **Requires**: All previous tasks complete
- 🔗 **Requires**: Week 2-3 component migrations complete

### Tasks

#### 1. Bundle Size Analysis
Analyze and document current bundle size:

```bash
cd packages/model-vue

# Install bundle analyzer
pnpm add -D rollup-plugin-visualizer

# Build and analyze
pnpm build
```

```javascript
// vite.config.js - add visualizer
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true
    })
  ]
})
```

**Action Items**:
- [ ] Install bundle analyzer
- [ ] Generate bundle visualization
- [ ] Document bundle sizes (ESM, UMD, CJS)
- [ ] Identify large dependencies
- [ ] Create `.cursor/BUNDLE-ANALYSIS.md` report

**Target Bundle Sizes**:
- ESM: < 100KB (uncompressed)
- ESM (gzip): < 35KB
- UMD: < 150KB (uncompressed)
- UMD (gzip): < 50KB

#### 2. Code Splitting Configuration
Setup optimal code splitting:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Vxg',
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
        // Manual chunking for better tree-shaking
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('src/components/')) {
            return 'components'
          }
          if (id.includes('src/composables/')) {
            return 'composables'
          }
        }
      }
    }
  }
})
```

**Action Items**:
- [ ] Configure manual chunks for better splitting
- [ ] Ensure external dependencies not bundled
- [ ] Test tree-shaking effectiveness
- [ ] Verify dynamic imports work correctly
- [ ] Document code splitting strategy

#### 3. Tree-shaking Verification
Ensure unused code is eliminated:

```javascript
// Test tree-shaking by importing only specific components
import { BasicHead } from '@plantquest/model-vue'

// Should NOT include BasicSide, BasicFoot, etc. in bundle
```

**Verification Steps**:
1. Create test consuming app
2. Import only 1-2 components
3. Build consuming app
4. Verify other components not in bundle
5. Document results

**Action Items**:
- [ ] Create test consuming application
- [ ] Test partial imports
- [ ] Verify tree-shaking working
- [ ] Ensure named exports support tree-shaking
- [ ] Document tree-shaking best practices

#### 4. Migration Guide Documentation
Create comprehensive migration guide:

**File**: `.cursor/MIGRATION-GUIDE-V2-TO-V3.md`

**Sections**:
1. **Overview**
   - Why migrate to Vue 3?
   - What changed in @plantquest/model-vue v1.x?
   - Migration timeline

2. **Breaking Changes**
   - Plugin installation changes
   - Component API changes
   - Removed features
   - Renamed props/events

3. **Step-by-Step Migration**
   - Update dependencies
   - Update plugin registration
   - Update component usage
   - Update store integration
   - Update date handling (Moment → Day.js)

4. **Code Examples**
   - Before/After comparisons
   - Common patterns
   - Troubleshooting

5. **API Differences**
   - Vuetify 2 → Vuetify 3
   - Vue Router 3 → Vue Router 4
   - Vuex 3 → Vuex 4
   - Moment → Day.js

**Action Items**:
- [ ] Create migration guide outline
- [ ] Document all breaking changes
- [ ] Provide before/after examples
- [ ] Include troubleshooting section
- [ ] Add FAQ section

#### 5. Breaking Changes Documentation
Create detailed breaking changes document:

**File**: `.cursor/BREAKING-CHANGES.md`

```markdown
# Breaking Changes - @plantquest/model-vue v1.0

## Plugin Installation

### Before (Vue 2)
javascript
import Vue from 'vue'
import Vxg from '@plantquest/model-vue'

Vue.use(Vxg, options)


### After (Vue 3)
javascript
import { createApp } from 'vue'
import VxgPlugin from '@plantquest/model-vue'

const app = createApp(App)
app.use(VxgPlugin, options)


## Component Changes

### BasicHead
- REMOVED: `dense` prop (use Vuetify 3 `density="compact"`)
- RENAMED: `hide-details` → `hideDetails` (camelCase)
- CHANGED: Event `@input` → `@update:modelValue`

### BasicSide
- CHANGED: `v-model` now uses `modelValue` prop
- REMOVED: `absolute` prop (use CSS positioning)

... (continue for all components)
```

**Action Items**:
- [ ] List all breaking changes
- [ ] Categorize by component/feature
- [ ] Provide migration path for each
- [ ] Include version compatibility matrix
- [ ] Link to migration guide

#### 6. Component API Documentation
Create comprehensive API documentation:

**File**: `.cursor/COMPONENT-API-DOCS.md`

**Format for Each Component**:
```markdown
## BasicHead

### Description
App bar component for top navigation with title, actions, and menu.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `String` | `''` | Main title text |
| `subtitle` | `String` | `''` | Subtitle text |
| `show` | `Boolean` | `true` | Show/hide component |
| `color` | `String` | `'primary'` | Background color |

### Events
| Event | Payload | Description |
|-------|---------|-------------|
| `menu-click` | - | Emitted when menu button clicked |
| `action-click` | `{ action: String }` | Emitted when action button clicked |

### Slots
| Slot | Props | Description |
|------|-------|-------------|
| `default` | - | Main content area |
| `actions` | - | Right-side actions |

### Usage
vue
<template>
  <VxgBasicHead
    title="Dashboard"
    subtitle="Welcome back"
    @menu-click="handleMenu"
  >
    <template #actions>
      <v-btn icon="mdi-cog" @click="settings" />
    </template>
  </VxgBasicHead>
</template>

```

**Action Items**:
- [ ] Document all components
- [ ] Include props, events, slots
- [ ] Provide usage examples
- [ ] Add TypeScript type references
- [ ] Include accessibility notes

#### 7. Build Scripts & CI/CD
Optimize build scripts for production:

```json
// package.json
{
  "scripts": {
    "build": "vite build && vue-tsc --declaration --emitDeclarationOnly",
    "build:analyze": "vite build --mode analyze",
    "build:prod": "NODE_ENV=production vite build",
    "size-check": "node scripts/size-check.js",
    "prepublishOnly": "pnpm build && pnpm test:run"
  }
}
```

**Create Size Check Script**:
```javascript
// scripts/size-check.js
const fs = require('fs')
const path = require('path')
const { gzipSync } = require('zlib')

const distPath = path.resolve(__dirname, '../dist')
const files = fs.readdirSync(distPath)

const MAX_SIZES = {
  'vxg.es.js': 100 * 1024,    // 100KB
  'vxg.umd.js': 150 * 1024,   // 150KB
  'vxg.cjs.js': 150 * 1024    // 150KB
}

files.forEach(file => {
  const filePath = path.join(distPath, file)
  const content = fs.readFileSync(filePath)
  const size = content.length
  const gzipSize = gzipSync(content).length
  
  const maxSize = MAX_SIZES[file]
  const status = maxSize && size > maxSize ? '❌ FAIL' : '✅ PASS'
  
  console.log(`${status} ${file}`)
  console.log(`  Size: ${(size / 1024).toFixed(2)}KB`)
  console.log(`  Gzip: ${(gzipSize / 1024).toFixed(2)}KB`)
  
  if (maxSize) {
    console.log(`  Max: ${(maxSize / 1024).toFixed(2)}KB`)
    if (size > maxSize) {
      process.exit(1)
    }
  }
})
```

**Action Items**:
- [ ] Create size check script
- [ ] Add prepublish hook
- [ ] Configure CI/CD for size checks
- [ ] Document build process
- [ ] Add build badges to README

### Acceptance Criteria
- [ ] Bundle size < 150KB (UMD)
- [ ] ESM build < 100KB
- [ ] Gzip size < 50KB (UMD)
- [ ] Tree-shaking verified and working
- [ ] Code splitting optimized
- [ ] Migration guide complete
- [ ] Breaking changes documented
- [ ] Component API docs complete
- [ ] Build scripts optimized
- [ ] Size check script working

### Deliverables
- `.cursor/BUNDLE-ANALYSIS.md` (bundle report)
- `.cursor/MIGRATION-GUIDE-V2-TO-V3.md` (migration guide)
- `.cursor/BREAKING-CHANGES.md` (breaking changes)
- `.cursor/COMPONENT-API-DOCS.md` (API documentation)
- `scripts/size-check.js` (size verification)
- `vite.config.js` (optimized config)
- Updated `README.md` with v1.0 info

### Risks & Mitigations
- ⚠️ **Risk**: Bundle size exceeds targets
  - **Mitigation**: Aggressive tree-shaking, code splitting
- ⚠️ **Risk**: Incomplete documentation
  - **Mitigation**: Review with CTO before Week 5 ends

---

## Week 4-5 Integration & Review

### Daily Schedule

**Daily Review Cycle** (Junior Developer):
- **9:00-10:00 AM**: Review previous day's commits from all agents
- **12:00-1:00 PM**: Merge approved changes, resolve conflicts
- **3:00-5:00 PM**: Integration testing, build validation

**CTO Review Schedule**:
- **Week 4 Monday**: Review Vuetify integration plan (2 hours)
- **Week 4 Wednesday**: Review Day.js migration & plugin system (3 hours)
- **Week 4 Friday**: Mid-week checkpoint (2 hours)
- **Week 5 Monday**: Review build optimization (2 hours)
- **Week 5 Wednesday**: Review documentation (3 hours)
- **Week 5 Friday**: Final review & approve Week 4-5 completion (3 hours)

### End of Week 4-5 Integration Test

**Test Checklist**:
1. [ ] All components styled consistently with Vuetify 3
2. [ ] Responsive behavior verified on mobile/tablet/desktop
3. [ ] Day.js working, Moment.js removed
4. [ ] Plugin installs correctly in test app
5. [ ] Vuex 4 integration working
6. [ ] Pinia integration working
7. [ ] Bundle size meets targets:
   - [ ] ESM < 100KB
   - [ ] UMD < 150KB
   - [ ] Gzip < 50KB
8. [ ] Tree-shaking verified
9. [ ] Migration guide complete
10. [ ] Breaking changes documented
11. [ ] Component API docs complete
12. [ ] All tests passing with >80% coverage

### Success Criteria (Week 4-5 Complete)
- ✅ All 4 tasks completed
- ✅ Integration test passes
- ✅ Bundle size optimized
- ✅ Documentation comprehensive
- ✅ CTO approval received
- ✅ Ready for Week 6 (Alpha Release)

---

## Next Steps (Week 6+)

Once Week 4-5 completes:
1. Publish `v1.0.0-alpha.1` to npm
2. Begin alpha testing with pqs-frontend
3. Collect feedback and create bug tickets
4. Plan beta release timeline

---

**Prepared By**: Team Lead  
**Date**: February 10, 2026  
**Status**: Ready for Agent Assignment  
**Related**: VUE3-MIGRATION-TASK-SPEC.md, WEEK-1-TASK-ASSIGNMENTS.md
