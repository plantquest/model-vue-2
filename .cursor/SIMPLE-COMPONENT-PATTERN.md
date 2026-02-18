# Simple Component Migration Pattern

**Document**: Pattern guide for migrating simple Vue 2 components to Vue 3 Composition API with TypeScript  
**Date**: February 9, 2026  
**Status**: ✅ Complete  
**Components**: BasicLed, BasicFoot, BasicFieldPick

---

## Overview

This document captures the migration pattern used for simple components (< 150 lines) from Vue 2 Options API to Vue 3 Composition API with TypeScript. Use this as a template for migrating similar components.

**Migrated Components**:
- ✅ BasicLed.vue (~90 lines) - Status indicator
- ✅ BasicFoot.vue (~95 lines) - Footer component
- ✅ BasicFieldPick.vue (~180 lines) - Field picker/select

---

## Migration Pattern

### 1. Component Structure

**Vue 2 (Before)**:
```vue
<template>
  <!-- template -->
</template>

<script>
export default {
  props: {
    myProp: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      myData: ''
    }
  },
  computed: {
    myComputed() {
      return this.myData + this.myProp
    }
  },
  methods: {
    myMethod() {
      // logic
    }
  }
}
</script>
```

**Vue 3 (After)**:
```vue
<template>
  <!-- template -->
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/**
 * Component props with TypeScript interface
 */
interface Props {
  /** JSDoc description */
  myProp: string
}

const props = defineProps<Props>()

/**
 * Reactive state
 */
const myData = ref('')

/**
 * Computed property
 */
const myComputed = computed(() => myData.value + props.myProp)

/**
 * Methods
 */
const myMethod = () => {
  // logic
}
</script>
```

---

## Step-by-Step Migration Process

### Step 1: Convert `<script>` to `<script setup lang="ts">`

**Before**:
```vue
<script>
export default {
  // ...
}
</script>
```

**After**:
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
// component logic
</script>
```

**Key Changes**:
- Remove `export default {}`
- Add `lang="ts"` attribute
- Import composition functions from `'vue'`

---

### Step 2: Convert Props with TypeScript Interfaces

**Before (Vue 2)**:
```javascript
export default {
  props: {
    status: {
      type: String,
      default: 'off'
    },
    items: {
      type: Array,
      required: true
    }
  }
}
```

**After (Vue 3)**:
```typescript
/**
 * Component props
 */
interface Props {
  /** Status indicator state */
  status?: 'on' | 'off' | 'warning' | 'error'
  /** Array of items */
  items: Item[]
}

const props = withDefaults(defineProps<Props>(), {
  status: 'off'
})
```

**Key Patterns**:
- Create TypeScript `interface` for props
- Use `defineProps<Props>()` for required props
- Use `withDefaults()` for optional props with defaults
- Add JSDoc comments for documentation
- Use literal types for enums (`'on' | 'off'`)

---

### Step 3: Convert Data Properties to Refs

**Before (Vue 2)**:
```javascript
data() {
  return {
    isLoading: false,
    selectedItem: null,
    items: []
  }
}
```

**After (Vue 3)**:
```typescript
import { ref } from 'vue'

/**
 * Loading state
 */
const isLoading = ref(false)

/**
 * Currently selected item
 */
const selectedItem = ref<Item | null>(null)

/**
 * List of items
 */
const items = ref<Item[]>([])
```

**Key Patterns**:
- Use `ref()` for primitive values
- Use `ref<Type>()` for typed refs
- Access values with `.value` in script
- Template automatically unwraps refs

---

### Step 4: Convert Computed Properties

**Before (Vue 2)**:
```javascript
computed: {
  filteredItems() {
    return this.items.filter(item => item.active)
  },
  itemCount() {
    return this.items.length
  }
}
```

**After (Vue 3)**:
```typescript
import { computed } from 'vue'

/**
 * Filtered list of active items
 */
const filteredItems = computed(() => 
  items.value.filter(item => item.active)
)

/**
 * Total number of items
 */
const itemCount = computed(() => items.value.length)
```

**Key Patterns**:
- Use `computed(() => ...)` function
- Access reactive values with `.value`
- Computed returns are automatically unwrapped in templates

---

### Step 5: Convert Methods

**Before (Vue 2)**:
```javascript
methods: {
  handleClick(item) {
    this.selectedItem = item
    this.$emit('select', item)
  },
  resetSelection() {
    this.selectedItem = null
  }
}
```

**After (Vue 3)**:
```typescript
const emit = defineEmits<{
  select: [item: Item]
}>()

/**
 * Handle item click
 */
const handleClick = (item: Item) => {
  selectedItem.value = item
  emit('select', item)
}

/**
 * Reset selection
 */
const resetSelection = () => {
  selectedItem.value = null
}
```

**Key Patterns**:
- Convert methods to arrow functions or regular functions
- Type parameters with TypeScript
- Use `defineEmits<>()` for events
- Access refs with `.value`

---

### Step 6: Convert Emits

**Before (Vue 2)**:
```javascript
export default {
  emits: ['change', 'select'],
  methods: {
    onChange(value) {
      this.$emit('change', value)
    }
  }
}
```

**After (Vue 3)**:
```typescript
/**
 * Component emits
 */
const emit = defineEmits<{
  /** Emitted when value changes */
  change: [value: string]
  /** Emitted when item is selected */
  select: [item: Item]
}>()

const onChange = (value: string) => {
  emit('change', value)
}
```

**Key Patterns**:
- Use `defineEmits<{}>()` with typed events
- Event names as keys
- Parameter types as tuple `[param1: Type, param2: Type]`
- Add JSDoc for event documentation

---

### Step 7: Update Vue Router Usage

**Before (Vue 2)**:
```javascript
methods: {
  navigate() {
    this.$router.push('/home')
  }
}
```

**After (Vue 3)**:
```typescript
import { useRouter } from 'vue-router'

const router = useRouter()

const navigate = () => {
  router.push('/home')
}
```

**Key Patterns**:
- Import `useRouter` from `'vue-router'`
- Call `useRouter()` to get router instance
- Use returned router object

---

### Step 8: Update Vuex Store Access

**Before (Vue 2)**:
```javascript
computed: {
  user() {
    return this.$store.state.user
  }
},
methods: {
  logout() {
    this.$store.dispatch('auth/logout')
  }
}
```

**After (Vue 3)**:
```typescript
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const user = computed(() => store.state.user)

const logout = () => {
  store.dispatch('auth/logout')
}
```

**Key Patterns**:
- Import `useStore` from `'vuex'`
- Call `useStore()` to get store instance
- Wrap state access in `computed()`

---

### Step 9: Update Vuetify 3 Syntax

**Before (Vuetify 2)**:
```vue
<v-btn text @click="action">Click</v-btn>
<v-text-field v-model="value" outlined />
<v-icon>mdi-home</v-icon>
```

**After (Vuetify 3)**:
```vue
<v-btn :variant="'text'" @click="action">Click</v-btn>
<v-text-field v-model="value" variant="outlined" />
<v-icon :icon="'mdi-home'" />
```

**Key Changes**:
- `text` → `:variant="'text'"`
- `outlined` → `variant="outlined"`
- Icon content → `:icon="'icon-name'"`
- `v-model` → `:model-value` + `@update:model-value` (for custom components)

---

## Testing Pattern

### Test File Structure

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createStore } from 'vuex'
import MyComponent from '../components/MyComponent.vue'

describe('MyComponent', () => {
  let mockRouter: any
  let mockStore: any

  beforeEach(() => {
    mockRouter = createRouter({
      history: createMemoryHistory(),
      routes: [/* routes */]
    })
    
    mockStore = createStore({
      state: { /* state */ },
      actions: { /* actions */ }
    })
  })

  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      props: { /* props */ },
      global: {
        plugins: [mockRouter, mockStore]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('emits event on action', async () => {
    const wrapper = mount(MyComponent, {
      global: { plugins: [mockRouter, mockStore] }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('myEvent')).toBeTruthy()
  })
})
```

### Test Coverage Goals

- ✅ **>80% coverage** per component
- ✅ Test all props with different values
- ✅ Test all emitted events
- ✅ Test computed properties
- ✅ Test user interactions
- ✅ Test error states
- ✅ Test edge cases (null, undefined, empty)

---

## Common Patterns by Component Type

### Status Indicator (BasicLed)

**Features**:
- Simple prop-based state
- Color mapping
- No user interaction
- Optional spec/param pattern

**Pattern**:
```typescript
interface Props {
  status?: 'on' | 'off' | 'warning' | 'error'
  spec?: { status?: string; field?: string }
  param?: { item?: Record<string, any> }
}

const props = withDefaults(defineProps<Props>(), {
  status: 'off'
})

const color = computed(() => {
  switch (resolvedStatus.value) {
    case 'on': return 'green'
    case 'error': return 'red'
    // ...
  }
})
```

---

### Footer Component (BasicFoot)

**Features**:
- Navigation links
- Router integration
- External links
- Event emission

**Pattern**:
```typescript
interface Link {
  id: string
  label: string
  route?: string
  href?: string
}

interface Props {
  links?: Link[]
  copyright?: string
}

const emit = defineEmits<{
  linkClick: [link: Link]
}>()

const router = useRouter()

const handleLinkClick = (link: Link) => {
  if (link.route) {
    router.push(link.route)
  } else if (link.href) {
    window.open(link.href, '_blank')
  }
  emit('linkClick', link)
}
```

---

### Select/Picker Component (BasicFieldPick)

**Features**:
- v-model support
- Vuex integration
- Permission-based filtering
- Legacy param/field pattern

**Pattern**:
```typescript
interface Props {
  modelValue?: string | string[]
  field?: Field
  param?: { item?: Record<string, any> }
  disabled?: boolean
}

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
  change: [value: string | string[]]
}>()

const store = useStore()

const filteredItems = computed(() => {
  let items = /* generate items */
  
  // Permission filtering
  if (store.state.currentUser.role === 'admin') {
    items = items.filter(/* filter logic */)
  }
  
  return items
})

const handleSelection = (value: string | string[]) => {
  emit('update:modelValue', value)
  emit('change', value)
}
```

---

## TypeScript Types Location

Create shared types in `src/types/components.ts`:

```typescript
// src/types/components.ts

/**
 * LED status indicator
 */
export interface BasicLedProps {
  status?: 'on' | 'off' | 'warning' | 'error'
}

/**
 * Footer link
 */
export interface FooterLink {
  id: string
  label: string
  route?: string
  href?: string
}

/**
 * Field definition
 */
export interface FieldDefinition {
  name: string
  title: string
  kind?: Record<string, { title: string; level?: number }>
  readonly?: boolean
}
```

---

## Checklist for Component Migration

### Before Migration
- [ ] Read current Vue 2 component
- [ ] Identify all props, data, computed, methods
- [ ] Document external dependencies (router, store)
- [ ] Note any Vuetify 2 specific syntax

### During Migration
- [ ] Convert to `<script setup lang="ts">`
- [ ] Create TypeScript interfaces for props
- [ ] Convert data to refs
- [ ] Convert computed to computed()
- [ ] Convert methods to functions
- [ ] Update router usage (useRouter)
- [ ] Update store usage (useStore)
- [ ] Update Vuetify syntax
- [ ] Add JSDoc comments
- [ ] Type all parameters and returns

### After Migration
- [ ] Write comprehensive tests (>80% coverage)
- [ ] Test all prop combinations
- [ ] Test all events
- [ ] Test edge cases
- [ ] Run tests: `pnpm test`
- [ ] Check TypeScript: `pnpm type-check` (if available)
- [ ] Check no lint errors
- [ ] Visual testing in browser

---

## Troubleshooting

### Common Issues

**Issue**: `Property 'value' does not exist on type 'Ref'`
**Solution**: Import `ref` from `'vue'` and ensure you're accessing `.value`

**Issue**: `Type '{}' is not assignable to type 'Props'`
**Solution**: Use `withDefaults(defineProps<Props>(), { /* defaults */ })`

**Issue**: `Cannot find module 'vue-router'`
**Solution**: Ensure Vue Router 4 is installed: `pnpm add vue-router@4`

**Issue**: `Store type has no state property`
**Solution**: Use Vuex 4 and `useStore()` from `'vuex'`

**Issue**: Vuetify components not rendering
**Solution**: Ensure Vuetify 3 is installed and components use correct syntax

---

## Best Practices

1. **Always add JSDoc comments** for interfaces and functions
2. **Use TypeScript literal types** for enums: `'on' | 'off' | 'warning'`
3. **Keep components focused** - single responsibility
4. **Extract reusable logic** to composables if used in multiple components
5. **Type everything** - no `any` types
6. **Test extensively** - aim for >80% coverage
7. **Use computed for derived state** - not methods
8. **Keep methods pure** - avoid side effects where possible
9. **Emit events for parent communication** - don't mutate props
10. **Document breaking changes** - note any API changes from Vue 2 version

---

## Resources

- [Vue 3 Composition API Docs](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Vuetify 3 Migration Guide](https://vuetifyjs.com/en/getting-started/upgrade-guide/)
- [TypeScript with Vue 3](https://vuejs.org/guide/typescript/overview.html)
- [Vitest Testing Guide](https://vitest.dev/guide/)

---

**Next Steps**:
- Apply this pattern to medium complexity components
- Extract common patterns to composables
- Update main documentation with patterns learned

**Migrated By**: fullstack-coder (AI Agent)  
**Date**: February 9, 2026
