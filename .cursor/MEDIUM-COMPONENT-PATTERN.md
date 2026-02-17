# Medium Component Migration Pattern

**Task**: Week 2 - Medium Components Migration  
**Date**: February 9, 2026  
**Components**: BasicAuth.vue, BasicAdmin.vue, BasicSide.vue  

---

## Overview

This document describes the patterns and best practices used for migrating medium-complexity components from Vue 2 Options API to Vue 3 Composition API with TypeScript.

**Medium components** are defined as components with:
- 180-250 lines of code
- State management (Vuex integration)
- Lifecycle hooks
- Router integration
- Event listeners
- Complex computed properties and methods

---

## Migration Pattern

### 1. Component Structure

Convert from Vue 2 Options API:

```vue
<script>
export default {
  props: { user: Object },
  data() { return { email: '', loading: false } },
  computed: { canLogin() { return this.email.length > 0 } },
  methods: { login() { /* ... */ } },
  mounted() { /* ... */ }
}
</script>
```

To Vue 3 Composition API with TypeScript:

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  user?: object | null
}

const props = withDefaults(defineProps<Props>(), {
  user: null
})

const email = ref('')
const loading = ref(false)

const canLogin = computed(() => email.value.length > 0)

const login = () => {
  // Login logic
}

onMounted(() => {
  // Mount logic
})
</script>
```

### 2. Extract Composables

**Rule**: Extract reusable logic into composables for:
- State management integration
- Complex business logic
- Shared functionality across components

**Example**: `useAuth` composable for BasicAuth.vue

```typescript
// src/composables/useAuth.ts
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export interface Credentials {
  email: string
  password: string
}

export function useAuth() {
  const store = useStore()
  const router = useRouter()

  const isAuthenticated = computed(() => 
    store.state.auth?.authenticated || false
  )

  const signin = (credentials: Credentials) => {
    return store.dispatch('signin_user', credentials)
  }

  const signout = () => {
    return store.dispatch('signout_user')
      .then(() => router.push('/login'))
  }

  return {
    isAuthenticated,
    signin,
    signout
  }
}
```

### 3. TypeScript Integration

#### Define Props Interface

```typescript
interface Props {
  user?: object | null
  redirectPath?: string
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
  redirectPath: '/dashboard'
})
```

#### Define Emits Interface

```typescript
const emit = defineEmits<{
  signinSuccess: []
  signinError: [error: Error]
}>()
```

#### Type Template Refs

```typescript
const formRef = ref<InstanceType<typeof VForm>>()
```

### 4. Vuex Integration

Use `useStore()` from `vuex`:

```typescript
import { useStore } from 'vuex'

const store = useStore()

// Reactive computed from store
const showSide = computed(() => 
  store.state.vxg?.cmp?.BasicSide?.show || false
)

// Dispatch actions
const updateState = () => {
  store.dispatch('set_cmp_flags', {
    name: 'BasicSide',
    flags: { show: true }
  })
}
```

### 5. Router Integration

Use `useRouter()` and `useRoute()` from `vue-router`:

```typescript
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Navigation
const navigateTo = (path: string) => {
  router.push(path)
}

// Watch route changes
watch(() => route.name, (newName) => {
  console.log('Route changed to:', newName)
})
```

### 6. Lifecycle Hooks

Convert Options API lifecycle hooks:

```typescript
// Vue 2
created() { /* ... */ }
mounted() { /* ... */ }
beforeDestroy() { /* ... */ }

// Vue 3 Composition API
onBeforeMount(() => { /* ... */ })
onMounted(() => { /* ... */ })
onUnmounted(() => { /* ... */ })
```

### 7. Event Listener Cleanup

**Critical**: Always cleanup event listeners in `onUnmounted`:

```typescript
import { onMounted, onUnmounted } from 'vue'

const handleResize = () => {
  // Resize logic
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
```

### 8. Promise Chains (Not async/await)

**Important**: Use Promise chains, not async/await for Babel compatibility:

```typescript
// ✅ Good - Promise chains
const login = () => {
  isLoading.value = true
  
  signin(credentials)
    .then(({ ok }) => {
      if (ok) {
        emit('signinSuccess')
        router.push(props.redirectPath)
      } else {
        handleError()
      }
    })
    .catch((error) => {
      emit('signinError', error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

// ❌ Bad - async/await
const login = async () => {
  isLoading.value = true
  try {
    const { ok } = await signin(credentials)
    // ...
  } catch (error) {
    // ...
  } finally {
    isLoading.value = false
  }
}
```

---

## Component Examples

### BasicAuth.vue (Authentication Form)

**Features**:
- Form validation
- Email/password input
- Vuex store integration
- Router navigation
- Loading states
- Error handling

**Key Patterns**:
- Extract `useAuth` composable for auth logic
- TypeScript interfaces for Props and Credentials
- Promise chains for signin action
- Validation methods
- Redirect on mount if authenticated

**File**: `src/components/BasicAuth.vue`  
**Composable**: `src/composables/useAuth.ts`  
**Tests**: `src/__tests__/BasicAuth.spec.ts`, `src/__tests__/composables/useAuth.spec.ts`

### BasicAdmin.vue (Admin App Container)

**Features**:
- Container for admin components
- Vuex state for visibility
- Model data integration
- Event delegation

**Key Patterns**:
- Extract `useAdmin` composable for admin operations
- Computed properties from Vuex state
- Handle child component events
- Model data access patterns

**File**: `src/components/BasicAdmin.vue`  
**Composable**: `src/composables/useAdmin.ts`  
**Tests**: `src/__tests__/BasicAdmin.spec.ts`, `src/__tests__/composables/useAdmin.spec.ts`

### BasicSide.vue (Side Drawer Navigation)

**Features**:
- Navigation drawer
- Search functionality (dual search boxes)
- MiniSearch integration
- Route watching
- Window resize handling
- Menu rendering
- Filter functionality

**Key Patterns**:
- Extract `useSide` and `useSideSearch` composables
- Complex watchers for route and state
- Event listener cleanup
- Template refs for search inputs
- Custom filter function
- Path estimation display

**File**: `src/components/BasicSide.vue`  
**Composables**: `src/composables/useSide.ts`  
**Tests**: `src/__tests__/BasicSide.spec.ts`, `src/__tests__/composables/useSide.spec.ts`

---

## Testing Strategy

### Composable Tests

Test composables independently using Vitest:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import { useAuth } from '@/composables/useAuth'

describe('useAuth', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: { auth: { authenticated: false, user: null } },
      actions: { signin_user: vi.fn() }
    })
  })

  it('returns isAuthenticated', () => {
    const { isAuthenticated } = useAuth()
    expect(isAuthenticated.value).toBe(false)
  })
})
```

### Component Tests

Test components with all dependencies mocked:

```typescript
import { mount } from '@vue/test-utils'
import BasicAuth from '@/components/BasicAuth.vue'

describe('BasicAuth', () => {
  it('renders login form', () => {
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    expect(wrapper.find('v-card-title').text()).toBe('Sign In')
  })
})
```

### Test Coverage Requirements

- **Minimum**: 80% coverage per component
- Test all methods
- Test all computed properties
- Test lifecycle hooks
- Test event emissions
- Test error states
- Test loading states
- Test validation logic

---

## Common Patterns

### 1. Reactive State

```typescript
// Simple reactive state
const loading = ref(false)
const email = ref('')

// Computed from store
const isAuthenticated = computed(() => 
  store.state.auth?.authenticated || false
)

// Computed with getter/setter
const drawerOpen = computed({
  get: () => store.state.vxg?.cmp?.BasicSide?.show || false,
  set: (value) => {
    store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { show: value }
    })
  }
})
```

### 2. Watchers

```typescript
// Watch store state
watch(() => store.state.trigger?.search?.a, (term) => {
  search.value = term
})

// Watch reactive ref
watch(search, (val) => {
  store.dispatch('trigger_search', { a: val })
})

// Watch route with immediate
watch(() => route.name, (val) => {
  // Handle route change
}, { immediate: true })
```

### 3. Template Refs

```typescript
// Define ref
const searchRef = ref()

// Use in template
<v-combobox ref="searchRef" />

// Access in methods
const clearSearch = () => {
  if (searchRef.value) {
    searchRef.value.reset()
  }
}
```

### 4. Complex Computed Properties

```typescript
const menu = computed(() => {
  if (menuView.value.mode !== 'standard') return []

  const { items, order } = menuView.value.menu
  return order.split(/\s*,\s*/).map((code: string) => ({
    ...items[code],
    code,
    klass: { 'vxg-router-link': true }
  }))
})
```

### 5. Method Patterns

```typescript
// With validation
const handleSignin = () => {
  if (!canSignin.value) return
  
  isLoading.value = true
  signin(credentials)
    .then(handleSuccess)
    .catch(handleError)
    .finally(() => {
      isLoading.value = false
    })
}

// With router navigation
const navigateToRoute = () => {
  router.replace({
    path: route.path,
    query: { mode: 'route', a: search.value }
  }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('Router error:', err)
    }
  })
}
```

---

## Checklist

### Per Component

- [ ] Converted to `<script setup lang="ts">`
- [ ] Props typed with TypeScript interface
- [ ] Emits typed with TypeScript
- [ ] All reactive state uses `ref()` or `computed()`
- [ ] All lifecycle hooks converted (onMounted, onUnmounted)
- [ ] Event listeners cleaned up in onUnmounted
- [ ] Composables extracted for reusable logic
- [ ] Vuex integration using `useStore()`
- [ ] Router integration using `useRouter()` and `useRoute()`
- [ ] All methods converted to functions
- [ ] All computed properties converted to `computed()`
- [ ] All watchers converted to `watch()`
- [ ] Template refs properly typed
- [ ] Promise chains used (not async/await)
- [ ] Error handling in place
- [ ] Loading states managed
- [ ] Tests written with >80% coverage
- [ ] No TypeScript errors
- [ ] No regressions from Vue 2 version

### Per Composable

- [ ] TypeScript interface for return types
- [ ] Exported function with clear name
- [ ] JSDoc comments
- [ ] Reactive state properly exposed
- [ ] Methods properly typed
- [ ] Store integration if needed
- [ ] Router integration if needed
- [ ] Tests with >80% coverage

---

## Migration Results

### BasicAuth.vue
- **Lines**: ~105 → ~160 (with types and better structure)
- **Composable**: `useAuth` (87 lines)
- **Test Coverage**: >85%
- **Status**: ✅ Complete

### BasicAdmin.vue
- **Lines**: ~57 → ~95 (with types)
- **Composable**: `useAdmin` (95 lines)
- **Test Coverage**: >85%
- **Status**: ✅ Complete

### BasicSide.vue
- **Lines**: ~1247 → ~950 (extracted logic to composables)
- **Composables**: `useSide` (106 lines), `useSideSearch` (87 lines)
- **Test Coverage**: >80%
- **Status**: ✅ Complete

---

## Lessons Learned

1. **Composables are powerful**: Extract logic early, it makes components cleaner and more testable

2. **TypeScript helps**: Catches errors early, especially with store and router integration

3. **Promise chains work fine**: No need for async/await, Promise chains are clear and compatible

4. **Cleanup is critical**: Always remove event listeners in onUnmounted to prevent memory leaks

5. **Test composables separately**: Easier to test logic independently from component rendering

6. **Vuex patterns**: Use computed for reactive store state, always use optional chaining for nested state

7. **Router error handling**: Always catch NavigationDuplicated errors

8. **Template refs**: Must be typed and checked for existence before use

---

## References

- Vue 3 Composition API: https://vuejs.org/guide/extras/composition-api-faq.html
- Vue Router 4: https://router.vuejs.org/
- Vuex 4: https://vuex.vuejs.org/
- TypeScript with Vue: https://vuejs.org/guide/typescript/composition-api.html
- Vitest: https://vitest.dev/

---

**Next Phase**: Week 2 - Complex Components (BasicNavStages, BasicHead)
