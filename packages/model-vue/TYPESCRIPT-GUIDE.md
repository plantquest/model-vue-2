# TypeScript Guide for @plantquest/model-vue

This guide explains how to use TypeScript with the `@plantquest/model-vue` library.

## Overview

The library is written in JavaScript but provides **full TypeScript type definitions** for:
- ✅ Component props
- ✅ Composable return types
- ✅ Plugin configuration
- ✅ State management (Vuex/Pinia)
- ✅ Vue global properties

## Installation

TypeScript types are included automatically when you install the package:

```bash
npm install @plantquest/model-vue
```

No additional `@types` package is needed!

## Usage

### 1. Import Types

```typescript
import type {
  VxgConfig,
  BasicHeadProps,
  UseVxgStoreReturn
} from '@plantquest/model-vue'
```

### 2. Plugin Installation (TypeScript)

```typescript
import { createApp } from 'vue'
import type { App } from 'vue'
import Vxg from '@plantquest/model-vue'
import type { VxgConfig } from '@plantquest/model-vue'

const app: App = createApp(AppComponent)

const config: VxgConfig = {
  allow: {
    match: [],
    modify: (x) => x
  }
}

app.use(Vxg, config)
```

### 3. Component Props (TypeScript)

```vue
<script setup lang="ts">
import { BasicHead } from '@plantquest/model-vue'
import type { BasicHeadProps } from '@plantquest/model-vue'

// Props are automatically typed
const props = defineProps<BasicHeadProps>()
</script>

<template>
  <BasicHead :logo="props.logo" :title="props.title" />
</template>
```

### 4. Using Composables (TypeScript)

```typescript
import { useVxgStore, useVxgPermissions } from '@plantquest/model-vue'
import type { UseVxgStoreReturn, UseVxgPermissionsReturn } from '@plantquest/model-vue'

export default {
  setup() {
    // Return types are automatically inferred
    const store: UseVxgStoreReturn = useVxgStore()
    const permissions: UseVxgPermissionsReturn = useVxgPermissions()
    
    // TypeScript knows about these methods
    const sideState = store.componentState('BasicSide')
    const canEdit = permissions.allow('edit')
    
    return {
      sideState,
      canEdit
    }
  }
}
```

### 5. Options API (TypeScript)

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyComponent',
  
  mounted() {
    // this.$vxg is typed thanks to vue-augmentation.d.ts
    console.log(this.$vxg.version)
  }
})
</script>
```

## Available Types

### Plugin Types

- `VxgConfig` - Plugin configuration options
- `VxgState` - State structure
- `VxgComponentState` - Component state
- `VxgPlugin` - Plugin interface
- `ComponentFlags` - Flags for state updates

### Component Prop Types

- `BasicHeadProps`
- `BasicSideProps`
- `BasicNavStagesProps`
- `BasicAuthProps`
- `BasicAdminProps`
- `BasicMainProps`
- `BasicFieldPickProps`
- `BasicFootProps`
- `BasicLedProps`

### Composable Return Types

- `UseVxgStoreReturn`
- `UseVxgPermissionsReturn`
- `UseHeadSearchReturn`
- `UseHeadActionsReturn`
- `UseNavStagesReturn`
- `UseStageRoutingReturn`

### State Management Types

- `StateAdapter` - Abstract adapter interface
- `VuexAdapterOptions` - Vuex configuration
- `PiniaAdapterOptions` - Pinia configuration
- `VxgVuexModule` - Vuex module definition

### Utility Types

- `Action` - Action definition for BasicHead

## Auto-completion

Thanks to Vue type augmentation, you get auto-completion for:

### Global Components

```vue
<template>
  <!-- TypeScript knows about all Vxg components -->
  <VxgBasicHead />
  <VxgBasicSide />
  <VxgBasicMain />
</template>
```

### Global Properties

```typescript
// In Options API
export default {
  mounted() {
    // this.$vxg is fully typed
    this.$vxg.version // string
  }
}
```

## tsconfig.json

If you're using this library in a TypeScript project, make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node"
    "types": ["vue", "@plantquest/model-vue"],
    "strict": true,
    "jsx": "preserve"
  }
}
```

## Type-Only Imports

For better tree-shaking, use `import type` for types:

```typescript
// Good: Type-only import (removed at runtime)
import type { VxgConfig } from '@plantquest/model-vue'

// Also good: Runtime import
import Vxg from '@plantquest/model-vue'

// Avoid: Mixed import (unless you need both)
import Vxg, { type VxgConfig } from '@plantquest/model-vue'
```

## Strict Mode

All types in this library are compatible with TypeScript strict mode:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true
  }
}
```

## Building with TypeScript

When building the library, type definitions are automatically generated:

```bash
pnpm build
```

This produces:
- `dist/vxg.es.js` - JavaScript
- `dist/types/` - TypeScript definitions

## IDE Support

### VS Code

Install the **Volar** extension for Vue 3 + TypeScript support:

```bash
code --install-extension Vue.volar
```

### WebStorm

WebStorm 2021.2+ has built-in support for Vue 3 + TypeScript.

## Troubleshooting

### "Cannot find module '@plantquest/model-vue' or its corresponding type declarations"

Make sure the package is installed:
```bash
npm install @plantquest/model-vue
```

### Types not showing up

1. Restart your IDE/TypeScript server
2. Check that `dist/types/` exists (run `pnpm build`)
3. Verify your tsconfig.json includes the package

### "Property '$vxg' does not exist on type 'ComponentPublicInstance'"

Make sure `vue-augmentation.d.ts` is included. Add to your `tsconfig.json`:

```json
{
  "include": [
    "src/**/*",
    "node_modules/@plantquest/model-vue/dist/types/**/*.d.ts"
  ]
}
```

## Examples

### Full Component Example

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVxgStore, useVxgPermissions } from '@plantquest/model-vue'
import type { 
  UseVxgStoreReturn,
  VxgComponentState 
} from '@plantquest/model-vue'

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'My App'
})

const store: UseVxgStoreReturn = useVxgStore()
const permissions = useVxgPermissions()

const sideState: ComputedRef<VxgComponentState | undefined> = 
  store.componentState('BasicSide')

const canEdit = permissions.allow('edit')

const openSidebar = () => {
  store.setComponentFlags('BasicSide', { show: true })
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="openSidebar" v-if="canEdit">
      Open Sidebar
    </button>
  </div>
</template>
```

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vue 3 + TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)
- [Volar Extension](https://github.com/johnsoncodehk/volar)

## Next Steps

After Week 1.3 (TypeScript) completes:
- **Week 1.4**: Vitest testing infrastructure
- **Week 2-3**: Component migration (types will be used!)
- **Week 4-5**: Additional type definitions as needed

---

**Status**: ✅ TypeScript configured, types complete  
**Reference**: WEEK-1-TASK-ASSIGNMENTS.md, DEC-000018, SPEC-000002
