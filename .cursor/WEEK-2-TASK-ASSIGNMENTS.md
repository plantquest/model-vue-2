# Week 2-3 Task Assignments - Component Migration

**Week**: 2-3 of 11  
**Phase**: Component Migration (PARALLEL EXECUTION)  
**Duration**: Feb 24 - Mar 7, 2026 (2 weeks)  
**Goal**: Migrate all 9 Vue 2 components to Vue 3 Composition API

---

## Overview

Week 2-3 is the CORE of the library migration. We'll convert all 9 components from Vue 2 Options API to Vue 3 Composition API using 4 agents working in parallel.

**Strategy**: Divide components by complexity and run agents simultaneously.

```
┌─────────────────────────────────────────────────────┐
│          PARALLEL COMPONENT MIGRATION                │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Agent 1 (frontend-coder)                           │
│  ├── BasicLed.vue (~50 lines)                       │
│  ├── BasicFoot.vue (~80 lines)                      │
│  └── BasicFieldPick.vue (~120 lines)                │
│      ↓ 5-7 days                                     │
│                                                      │
│  Agent 2 (frontend-coder-2)                         │
│  ├── BasicAuth.vue (~200 lines)                     │
│  ├── BasicAdmin.vue (~250 lines)                    │
│  └── BasicSide.vue (~180 lines)                     │
│      ↓ 7-9 days                                     │
│                                                      │
│  Agent 3 (fullstack-coder)                          │
│  └── BasicNavStages.vue (~392 lines)                │
│      ├── FIRST: Split into sub-components           │
│      ├── THEN: Convert to Composition API           │
│      └── Extract routing composables                │
│      ↓ 7-10 days                                    │
│                                                      │
│  Agent 4 (fullstack-coder)                          │
│  └── BasicHead.vue (~1100+ lines - LARGEST)         │
│      ├── FIRST: Split into sub-components           │
│      ├── THEN: Convert to Composition API           │
│      └── Extract search composables                 │
│      ↓ 10-12 days                                   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Success Criteria**:
- ✅ All 9 components converted to `<script setup lang="ts">`
- ✅ All components achieve >80% test coverage
- ✅ Composables extracted for shared logic
- ✅ TypeScript types used throughout
- ✅ No visual regressions

---

## Task 2.1: Simple Components Migration

**Assigned To**: frontend-coder  
**Duration**: 5-7 days  
**Branch**: `feature/week2-simple-components`  
**Priority**: 🟢 START HERE (lowest complexity)

### Components (3)
1. BasicLed.vue (~50 lines)
2. BasicFoot.vue (~80 lines)
3. BasicFieldPick.vue (~120 lines)

### Component 1: BasicLed.vue

**Current Location**: `packages/model-vue-v2/src/components/BasicLed.vue`  
**Target Location**: `packages/model-vue/src/components/BasicLed.vue`

**Migration Steps**:

1. **Read and analyze Vue 2 component**
2. **Convert to Composition API**:
   ```vue
   <template>
     <v-icon :color="color">{{ icon }}</v-icon>
   </template>

   <script setup lang="ts">
   import { computed } from 'vue'
   import type { BasicLedProps } from '@/types'

   const props = withDefaults(defineProps<BasicLedProps>(), {
     status: 'off',
     color: undefined
   })

   const color = computed(() => {
     if (props.color) return props.color
     return props.status === 'on' ? 'green' : 'grey'
   })

   const icon = computed(() => 'mdi-circle')
   </script>
   ```

3. **Write comprehensive tests**:
   ```typescript
   // src/components/BasicLed.spec.ts
   import { describe, it, expect } from 'vitest'
   import { mount } from '@vue/test-utils'
   import BasicLed from './BasicLed.vue'

   describe('BasicLed', () => {
     it('should render with default props', () => {
       const wrapper = mount(BasicLed)
       expect(wrapper.exists()).toBe(true)
     })

     it('should show green when status is on', () => {
       const wrapper = mount(BasicLed, {
         props: { status: 'on' }
       })
       // Verify color logic
     })

     it('should show grey when status is off', () => {
       const wrapper = mount(BasicLed, {
         props: { status: 'off' }
       })
       // Verify color logic
     })

     it('should use custom color when provided', () => {
       const wrapper = mount(BasicLed, {
         props: { status: 'on', color: 'red' }
       })
       // Should use 'red' not 'green'
     })
   })
   ```

4. **Achieve >80% coverage**
5. **Update exports** in `src/index.js`

### Component 2: BasicFoot.vue

Similar process as BasicLed.

### Component 3: BasicFieldPick.vue

Similar process, may involve:
- Form input handling
- v-model in Vue 3
- Event emission updates

### Deliverables

For each component:
- [ ] Migrated component in `packages/model-vue/src/components/`
- [ ] Test file with >80% coverage
- [ ] Any extracted composables in `src/composables/`
- [ ] Updated type definitions if needed
- [ ] Updated exports in `src/index.js`

### Acceptance Criteria

- [ ] All 3 components use `<script setup lang="ts">`
- [ ] Props properly typed with TypeScript
- [ ] Tests pass with >80% coverage
- [ ] No visual regressions
- [ ] Components exported from index.js
- [ ] Documentation comments added

---

## Task 2.2: Medium Components Migration

**Assigned To**: frontend-coder-2 (or parallel frontend-coder)  
**Duration**: 7-9 days  
**Branch**: `feature/week2-medium-components`  
**Priority**: 🟡 MEDIUM (parallel with Task 2.1)

### Components (3)
1. BasicAuth.vue (~200 lines)
2. BasicAdmin.vue (~250 lines)
3. BasicSide.vue (~180 lines)

### Component 1: BasicSide.vue (Example)

**Migration Pattern**:

```vue
<template>
  <v-navigation-drawer
    v-model="isOpen"
    :width="width"
    app
  >
    <slot></slot>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useVxgStore } from '@/composables/useVxgStore'
import type { BasicSideProps } from '@/types'

const props = withDefaults(defineProps<BasicSideProps>(), {
  title: '',
  width: 280
})

// Use composable for store access
const { componentState, setComponentFlags } = useVxgStore()

const sideState = componentState('BasicSide')

const isOpen = computed({
  get: () => sideState.value?.show ?? false,
  set: (value: boolean) => {
    setComponentFlags('BasicSide', { show: value })
  }
})

const width = computed(() => {
  return sideState.value?.width ?? props.width
})
</script>
```

**Key Changes**:
- Use `useVxgStore` composable (need to create this!)
- Computed with getter/setter for v-model
- TypeScript props
- Proper store integration

### Composable Creation: useVxgStore

**Location**: `packages/model-vue/src/composables/useVxgStore.ts`

```typescript
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { UseVxgStoreReturn, ComponentFlags } from '@/types'

/**
 * Composable for accessing Vxg store state
 * Works with both Vuex and Pinia (via adapters)
 */
export function useVxgStore(): UseVxgStoreReturn {
  const store = useStore()
  
  const vxgState = computed(() => store.state.vxg)
  
  const componentState = (name: string) => {
    return computed(() => store.state.vxg?.cmp?.[name])
  }
  
  const setComponentFlags = (name: string, flags: ComponentFlags) => {
    store.dispatch('set_cmp_flags', { name, flags })
  }
  
  const getState = (path: string) => {
    return computed(() => {
      const parts = path.split('.')
      let value = store.state.vxg
      for (const part of parts) {
        value = value?.[part]
      }
      return value
    })
  }
  
  return {
    vxgState,
    componentState,
    setComponentFlags,
    getState
  }
}
```

### Deliverables

For each component:
- [ ] Migrated component
- [ ] Test file >80% coverage
- [ ] Composables extracted (useVxgStore, etc.)
- [ ] Updated exports

### Acceptance Criteria

- [ ] All 3 components migrated
- [ ] Store integration working
- [ ] Tests pass >80% coverage
- [ ] Composables created and tested
- [ ] No functionality regressions

---

## Migration Pattern Reference

### Vue 2 Options API → Vue 3 Composition API

```vue
<!-- BEFORE: Vue 2 Options API -->
<script>
export default {
  name: 'MyComponent',
  props: {
    title: String
  },
  data() {
    return {
      count: 0
    }
  },
  computed: {
    doubled() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('mounted')
  }
}
</script>

<!-- AFTER: Vue 3 Composition API -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: ''
})

const count = ref(0)

const doubled = computed(() => count.value * 2)

const increment = () => {
  count.value++
}

onMounted(() => {
  console.log('mounted')
})
</script>
```

### Store Access Pattern

```vue
<!-- BEFORE: Vue 2 -->
<script>
export default {
  computed: {
    isOpen() {
      return this.$store.state.vxg.cmp.BasicSide.show
    }
  },
  methods: {
    toggle() {
      this.$store.dispatch('set_cmp_flags', {
        name: 'BasicSide',
        flags: { show: !this.isOpen }
      })
    }
  }
}
</script>

<!-- AFTER: Vue 3 with composable -->
<script setup lang="ts">
import { computed } from 'vue'
import { useVxgStore } from '@/composables/useVxgStore'

const { componentState, setComponentFlags } = useVxgStore()

const sideState = componentState('BasicSide')

const isOpen = computed({
  get: () => sideState.value?.show ?? false,
  set: (value) => setComponentFlags('BasicSide', { show: value })
})

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>
```

---

## Week 2 Daily Schedule

### Monday (Day 1)
- **Morning**: Agent assignments & kickoff
- **Midday**: Agents begin simple/medium components
- **Afternoon**: Create useVxgStore composable
- **Review**: Daily progress check

### Tuesday-Thursday (Days 2-4)
- **Morning**: Review previous day's work
- **Midday**: Continue component migration
- **Afternoon**: Write and run tests
- **Review**: Coverage reports, merge approved work

### Friday (Day 5)
- **Morning**: Integration testing
- **Midday**: Merge all approved components
- **Afternoon**: Week 2 checkpoint review
- **Review**: Plan Week 3 work

---

## Success Metrics

### Code Coverage (Required: >80%)
```bash
# Run after each component
cd packages/model-vue
pnpm test:coverage
```

### Component Checklist (Per Component)
- [ ] Converted to `<script setup lang="ts">`
- [ ] Props use TypeScript interfaces
- [ ] Store access via composables
- [ ] Tests written (>80% coverage)
- [ ] Tests passing
- [ ] No ESLint errors
- [ ] No TypeScript errors
- [ ] Visual regression check passed
- [ ] Exported from index.js
- [ ] Documentation added

---

**Reference**: VUE3-MIGRATION-TASK-SPEC.md, DEC-000018, SPEC-000002
