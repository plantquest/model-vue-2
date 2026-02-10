# Vue 3 Plugin Usage Guide

Complete guide for using the @plantquest/model-vue Vue 3 plugin system.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Configuration Options](#configuration-options)
- [Store Integration](#store-integration)
- [Component Registration](#component-registration)
- [Permission System](#permission-system)
- [API Reference](#api-reference)
- [TypeScript Support](#typescript-support)
- [Examples](#examples)

---

## Installation

### Basic Installation

```bash
npm install @plantquest/model-vue
# or
pnpm add @plantquest/model-vue
# or
yarn add @plantquest/model-vue
```

### With Peer Dependencies

```bash
npm install vue@^3.3.0 @plantquest/model-vue
```

---

## Basic Usage

### Minimal Setup

```javascript
// main.js
import { createApp } from 'vue'
import VxgPlugin from '@plantquest/model-vue'
import App from './App.vue'

const app = createApp(App)
app.use(VxgPlugin)
app.mount('#app')
```

### With Configuration

```javascript
import { createApp } from 'vue'
import VxgPlugin from '@plantquest/model-vue'
import App from './App.vue'

const app = createApp(App)

app.use(VxgPlugin, {
  // Register components globally
  components: true,
  
  // Component name prefix
  prefix: 'Vxg',
  
  // Permission configuration
  allow: {
    match: [
      { role: 'admin', modify: ['*'] },
      { role: 'editor', modify: ['posts'] }
    ]
  },
  
  // Initial state
  initialState: {
    cmp: {
      'basic-head': { show: true }
    }
  }
})

app.mount('#app')
```

---

## Configuration Options

### Plugin Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `components` | `boolean` | `true` | Register components globally |
| `prefix` | `string` | `'Vxg'` | Component name prefix |
| `store` | `Store` | `null` | Vuex or Pinia store instance |
| `allow` | `Object` | `{}` | Permission configuration |
| `initialState` | `Object` | `{}` | Initial Vxg state |

### Allow Configuration

```javascript
{
  allow: {
    // Array of permission match patterns
    match: [
      { role: 'admin', modify: ['*'] },
      { role: 'editor', modify: ['posts', 'pages'] },
      { role: 'user', modify: ['profile'] }
    ],
    
    // Function to modify match patterns before checking
    modify: (pattern) => {
      return { ...pattern, tenant: currentTenant }
    }
  }
}
```

---

## Store Integration

### Vuex 4 Integration

#### Setup Vuex Module

```javascript
// store/index.js
import { createStore } from 'vuex'
import { createVxgVuexModule } from '@plantquest/model-vue'

export const store = createStore({
  modules: {
    vxg: createVxgVuexModule({
      // Optional initial state
      cmp: {
        'basic-head': { show: true }
      }
    })
  },
  
  // Other store modules
  modules: {
    user: userModule,
    posts: postsModule
  }
})
```

#### Install Plugin with Vuex

```javascript
// main.js
import { createApp } from 'vue'
import VxgPlugin from '@plantquest/model-vue'
import { store } from './store'

const app = createApp(App)
app.use(store)
app.use(VxgPlugin, { store })
app.mount('#app')
```

#### Using Vuex Methods

```javascript
// In component (Options API)
export default {
  methods: {
    updateComponent() {
      // Via Vxg
      this.$vxg.commit('SET_COMPONENT_FLAGS', {
        name: 'basic-head',
        flags: { show: false }
      })
      
      // Or via Vuex directly
      this.$store.commit('vxg/SET_COMPONENT_FLAGS', {
        name: 'basic-head',
        flags: { show: false }
      })
    }
  }
}
```

### Pinia Integration

#### Setup Pinia Store

```javascript
// stores/vxg.js
import { defineStore } from 'pinia'
import { createVxgPiniaStore } from '@plantquest/model-vue'

export const useVxgStore = createVxgPiniaStore(defineStore, {
  // Optional initial state
  cmp: {
    'basic-head': { show: true }
  }
})
```

#### Install Plugin with Pinia

```javascript
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VxgPlugin from '@plantquest/model-vue'
import { useVxgStore } from './stores/vxg'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Initialize store
const vxgStore = useVxgStore()

app.use(VxgPlugin, { store: pinia })
app.mount('#app')
```

#### Using Pinia Store

```vue
<script setup>
import { useVxgStore } from '@/stores/vxg'

const vxgStore = useVxgStore()

// Update component flags
vxgStore.setComponentFlags('basic-head', { show: false })

// Get component state
const headState = vxgStore.componentState('basic-head')
</script>
```

---

## Component Registration

### Global Registration (Default)

```javascript
// Components are automatically registered globally
app.use(VxgPlugin)
```

```vue
<template>
  <!-- Use components without importing -->
  <VxgBasicHead title="Dashboard" />
  <VxgBasicSide :open="true" />
  <VxgBasicNavStages :stages="stages" />
</template>
```

### Disable Global Registration

```javascript
// Disable automatic registration
app.use(VxgPlugin, { components: false })
```

```javascript
// Import and register manually
import { BasicHead, BasicSide } from '@plantquest/model-vue'

export default {
  components: {
    BasicHead,
    BasicSide
  }
}
```

### Custom Prefix

```javascript
// Use custom component prefix
app.use(VxgPlugin, { prefix: 'Pqs' })
```

```vue
<template>
  <!-- Components use custom prefix -->
  <PqsBasicHead title="Dashboard" />
  <PqsBasicSide :open="true" />
</template>
```

---

## Permission System

### Basic Permission Checks

```javascript
// Check if user has permission
const vxg = app.config.globalProperties.$vxg

if (vxg.allow({ role: 'admin' })) {
  console.log('User is admin')
}

if (vxg.allow({ role: 'editor', modify: ['posts'] })) {
  console.log('User can edit posts')
}
```

### In Components (Options API)

```vue
<script>
export default {
  computed: {
    canEdit() {
      return this.$vxg.allow({ role: 'editor' })
    },
    
    canDelete() {
      return this.$vxg.allow({ role: 'admin' })
    }
  },
  
  methods: {
    handleEdit() {
      if (this.canEdit) {
        // Edit logic
      }
    }
  }
}
</script>

<template>
  <div>
    <button v-if="canEdit" @click="handleEdit">Edit</button>
    <button v-if="canDelete" @click="handleDelete">Delete</button>
  </div>
</template>
```

### In Components (Composition API)

```vue
<script setup>
import { inject, computed } from 'vue'

const vxg = inject('vxg')

const canEdit = computed(() => {
  return vxg.allow({ role: 'editor' })
})

const canDelete = computed(() => {
  return vxg.allow({ role: 'admin' })
})

function handleEdit() {
  if (canEdit.value) {
    // Edit logic
  }
}
</script>

<template>
  <div>
    <button v-if="canEdit" @click="handleEdit">Edit</button>
    <button v-if="canDelete" @click="handleDelete">Delete</button>
  </div>
</template>
```

### Multiple Patterns

```javascript
// Check multiple patterns (OR logic)
const canModify = vxg.allow([
  { role: 'admin' },
  { role: 'editor', resource: 'posts' },
  { role: 'owner', id: postId }
])
```

### Custom Pattern Modifier

```javascript
app.use(VxgPlugin, {
  allow: {
    match: [
      { role: 'admin' }
    ],
    
    // Modify patterns before checking
    modify: (pattern) => {
      return {
        ...pattern,
        tenant: getCurrentTenant(),
        timestamp: Date.now()
      }
    }
  }
})
```

---

## API Reference

### Vxg Instance

Access via `this.$vxg` (Options API) or `inject('vxg')` (Composition API).

#### Methods

##### `allow(match)`

Check if a permission pattern matches.

```javascript
vxg.allow({ role: 'admin' })
vxg.allow([{ role: 'admin' }, { role: 'editor' }])
```

##### `getComponentState(name)`

Get component state by name.

```javascript
const state = vxg.getComponentState('basic-head')
// { show: true, allow: { edit: true } }
```

##### `setComponentFlags(name, flags)`

Set component flags.

```javascript
vxg.setComponentFlags('basic-head', { show: false })
vxg.setComponentFlags('basic-side', { 
  show: true, 
  allow: { edit: true } 
})
```

##### `get(path)`

Get nested state by dot-separated path.

```javascript
vxg.get('cmp.basic-head.show') // true
vxg.get('ent.meta.name') // 'My Entity'
```

##### `set(path, value)`

Set nested state by path.

```javascript
vxg.set('cmp.basic-head.show', false)
vxg.set('ent.meta.name', 'New Name')
```

##### `clearCache()`

Clear permission memoization cache.

```javascript
vxg.clearCache()
```

#### Properties

##### `state`

Current Vxg state.

```javascript
vxg.state
// {
//   cmp: { 'basic-head': { show: true } },
//   ent: { meta: { name: 'Entity' } }
// }
```

##### `config`

Plugin configuration.

```javascript
vxg.config
// { allow: { match: [...], modify: fn } }
```

##### `cmp`

Registered components.

```javascript
vxg.cmp
// { 'BasicHead': 'VxgBasicHead', ... }
```

---

## TypeScript Support

### Type Definitions

```typescript
import type { 
  VxgInstance,
  VxgPluginOptions,
  VxgState,
  VxgComponentState,
  ComponentFlags
} from '@plantquest/model-vue'
```

### Usage in TypeScript

```typescript
// main.ts
import { createApp } from 'vue'
import VxgPlugin, { type VxgPluginOptions } from '@plantquest/model-vue'

const options: VxgPluginOptions = {
  components: true,
  allow: {
    match: [{ role: 'admin' }]
  }
}

const app = createApp(App)
app.use(VxgPlugin, options)
```

### Component TypeScript Support

```vue
<script setup lang="ts">
import { inject } from 'vue'
import type { VxgInstance } from '@plantquest/model-vue'

const vxg = inject<VxgInstance>('vxg')

if (vxg) {
  const canEdit = vxg.allow({ role: 'editor' })
}
</script>
```

### Augmented Types

```typescript
// Vue instance augmentation is automatic
// this.$vxg is typed correctly in Options API

export default {
  mounted() {
    // TypeScript knows about $vxg
    this.$vxg.allow({ role: 'admin' })
  }
}
```

---

## Examples

### Complete Application Setup

```javascript
// main.js
import { createApp } from 'vue'
import { createStore } from 'vuex'
import VxgPlugin, { createVxgVuexModule } from '@plantquest/model-vue'
import App from './App.vue'

// Create Vuex store with Vxg module
const store = createStore({
  modules: {
    vxg: createVxgVuexModule({
      cmp: {
        'basic-head': { show: true },
        'basic-side': { show: false }
      }
    })
  }
})

// Create Vue app
const app = createApp(App)

// Install store
app.use(store)

// Install Vxg plugin
app.use(VxgPlugin, {
  store,
  allow: {
    match: [
      { role: 'admin', modify: ['*'] },
      { role: 'editor', modify: ['posts', 'pages'] },
      { role: 'user', modify: ['profile'] }
    ]
  }
})

// Mount app
app.mount('#app')
```

### Component with Permissions

```vue
<script>
export default {
  name: 'PostEditor',
  
  data() {
    return {
      post: null
    }
  },
  
  computed: {
    canEdit() {
      return this.$vxg.allow([
        { role: 'admin' },
        { role: 'editor' },
        { role: 'author', id: this.post?.authorId }
      ])
    },
    
    canDelete() {
      return this.$vxg.allow({ role: 'admin' })
    },
    
    canPublish() {
      return this.$vxg.allow([
        { role: 'admin' },
        { role: 'editor' }
      ])
    }
  },
  
  methods: {
    handleSave() {
      if (!this.canEdit) {
        this.$toast.error('No permission to edit')
        return
      }
      
      // Save logic
    },
    
    handleDelete() {
      if (!this.canDelete) {
        this.$toast.error('No permission to delete')
        return
      }
      
      // Delete logic
    }
  }
}
</script>

<template>
  <div class="post-editor">
    <VxgBasicHead title="Edit Post" />
    
    <div class="actions">
      <button v-if="canEdit" @click="handleSave">Save</button>
      <button v-if="canPublish" @click="handlePublish">Publish</button>
      <button v-if="canDelete" @click="handleDelete">Delete</button>
    </div>
    
    <div v-if="canEdit" class="editor">
      <!-- Editor content -->
    </div>
    <div v-else class="no-permission">
      You don't have permission to edit this post.
    </div>
  </div>
</template>
```

### Composition API Example

```vue
<script setup>
import { ref, computed, inject } from 'vue'

const vxg = inject('vxg')

const post = ref(null)

const permissions = computed(() => ({
  canEdit: vxg.allow([
    { role: 'admin' },
    { role: 'editor' },
    { role: 'author', id: post.value?.authorId }
  ]),
  canDelete: vxg.allow({ role: 'admin' }),
  canPublish: vxg.allow([
    { role: 'admin' },
    { role: 'editor' }
  ])
}))

function handleSave() {
  if (!permissions.value.canEdit) {
    console.error('No permission to edit')
    return
  }
  
  // Save logic
}
</script>

<template>
  <div class="post-editor">
    <VxgBasicHead title="Edit Post" />
    
    <div class="actions">
      <button v-if="permissions.canEdit" @click="handleSave">
        Save
      </button>
      <button v-if="permissions.canPublish" @click="handlePublish">
        Publish
      </button>
      <button v-if="permissions.canDelete" @click="handleDelete">
        Delete
      </button>
    </div>
  </div>
</template>
```

---

## Migration from Vue 2

### Before (Vue 2)

```javascript
import Vue from 'vue'
import Vxg from '@plantquest/model-vue-v2'

Vue.use(Vxg, options)
```

### After (Vue 3)

```javascript
import { createApp } from 'vue'
import VxgPlugin from '@plantquest/model-vue'

const app = createApp(App)
app.use(VxgPlugin, options)
```

### Component Usage

No changes needed! Components work the same way:

```vue
<template>
  <VxgBasicHead title="Dashboard" />
</template>
```

---

## Troubleshooting

### Components Not Registered

**Issue**: Components not available globally

**Solution**: Ensure `components` option is not set to `false`

```javascript
app.use(VxgPlugin, { components: true })
```

### $vxg Undefined

**Issue**: `this.$vxg` is undefined in component

**Solution**: Ensure plugin is installed before mounting

```javascript
app.use(VxgPlugin)
app.mount('#app') // After use()
```

### Store Integration Not Working

**Issue**: Store not syncing with Vxg

**Solution**: Pass store to plugin options

```javascript
app.use(store)
app.use(VxgPlugin, { store })
```

### TypeScript Errors

**Issue**: TypeScript doesn't recognize `$vxg`

**Solution**: Import type definitions

```typescript
import '@plantquest/model-vue'
```

---

## Best Practices

1. **Install plugin after store**: Always install the store before the Vxg plugin
2. **Use inject in Composition API**: Prefer `inject('vxg')` over global properties
3. **Memoize permission checks**: Use computed properties for permission checks
4. **Clear cache when needed**: Clear permission cache when user roles change
5. **Use TypeScript**: Enable TypeScript for better type safety

---

## Support

- **Documentation**: https://github.com/plantquest/model-vue-2
- **Issues**: https://github.com/plantquest/model-vue-2/issues
- **Email**: support@plantquest.com

---

**Last Updated**: February 10, 2026  
**Plugin Version**: 1.0.0-alpha.1  
**Vue Version**: 3.3+
