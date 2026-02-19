# Test Templates for Vue 3 Component Migration

This guide provides test templates for migrating Vue 2 components to Vue 3 (Week 2-3).

## Test File Structure

```
src/
├── components/
│   ├── BasicHead.vue
│   └── BasicHead.spec.ts  ← Test file next to component
│
└── __tests__/
    ├── setup.ts           ← Global test setup
    └── example.spec.ts    ← Example tests
```

## Template 1: Simple Component Test

For simple components like BasicLed, BasicFoot:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import BasicLed from './BasicLed.vue'
import type { BasicLedProps } from '@/types'

describe('BasicLed', () => {
  let wrapper: VueWrapper
  
  afterEach(() => {
    wrapper?.unmount()
  })
  
  describe('Props', () => {
    it('should render with default props', () => {
      wrapper = mount(BasicLed)
      expect(wrapper.exists()).toBe(true)
    })
    
    it('should accept status prop', () => {
      wrapper = mount(BasicLed, {
        props: {
          status: 'on'
        }
      })
      expect(wrapper.props('status')).toBe('on')
    })
    
    it('should accept color prop', () => {
      wrapper = mount(BasicLed, {
        props: {
          color: 'red'
        }
      })
      expect(wrapper.props('color')).toBe('red')
    })
  })
  
  describe('Rendering', () => {
    it('should display correct status', () => {
      wrapper = mount(BasicLed, {
        props: { status: 'on' }
      })
      // Add specific assertions based on implementation
      expect(wrapper.html()).toContain('on')
    })
  })
  
  describe('Behavior', () => {
    it('should emit events on interaction', async () => {
      wrapper = mount(BasicLed)
      // Simulate interaction
      await wrapper.trigger('click')
      // Check emitted events
      expect(wrapper.emitted()).toHaveProperty('click')
    })
  })
})
```

## Template 2: Component with Store Integration

For components using Vuex/Pinia like BasicSide:

```typescript
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import BasicSide from './BasicSide.vue'

describe('BasicSide', () => {
  const createMockStore = (state = {}) => {
    return createStore({
      state: {
        vxg: {
          cmp: {
            BasicSide: {
              show: true,
              ...state
            }
          }
        }
      },
      actions: {
        set_cmp_flags: vi.fn()
      }
    })
  }
  
  it('should read state from store', () => {
    const store = createMockStore({ show: true })
    const wrapper = mount(BasicSide, {
      global: {
        plugins: [store]
      }
    })
    
    // Component should reflect store state
    expect(wrapper.vm.isOpen).toBe(true)
  })
  
  it('should dispatch actions to store', async () => {
    const store = createMockStore()
    const wrapper = mount(BasicSide, {
      global: {
        plugins: [store]
      }
    })
    
    // Trigger action
    await wrapper.vm.toggle()
    
    // Check action was called
    expect(store._actions.set_cmp_flags).toHaveBeenCalled()
  })
})
```

## Template 3: Composable Test

For testing composables like useVxgStore:

```typescript
import { describe, it, expect } from 'vitest'
import { useVxgStore } from './useVxgStore'
import { createStore } from 'vuex'

describe('useVxgStore', () => {
  it('should provide vxgState', () => {
    const store = createStore({
      state: {
        vxg: {
          cmp: {},
          ent: {}
        }
      }
    })
    
    // Mount a test component that uses the composable
    const { vxgState } = useVxgStore()
    
    expect(vxgState.value).toBeDefined()
    expect(vxgState.value).toHaveProperty('cmp')
  })
  
  it('should get component state', () => {
    const { componentState } = useVxgStore()
    const state = componentState('BasicSide')
    
    expect(state.value).toBeDefined()
  })
  
  it('should set component flags', () => {
    const { setComponentFlags } = useVxgStore()
    
    setComponentFlags('BasicSide', { show: true })
    
    // Verify state was updated
    // Implementation depends on store setup
  })
})
```

## Template 4: Complex Component with Sub-components

For BasicHead, BasicNavStages:

```typescript
import { describe, it, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import BasicHead from './BasicHead.vue'
import HeadToolbar from './HeadToolbar.vue'
import HeadSearch from './HeadSearch.vue'

describe('BasicHead', () => {
  describe('Component Structure', () => {
    it('should render all sub-components', () => {
      const wrapper = mount(BasicHead)
      
      expect(wrapper.findComponent(HeadToolbar).exists()).toBe(true)
      expect(wrapper.findComponent(HeadSearch).exists()).toBe(true)
    })
  })
  
  describe('Search Functionality', () => {
    it('should handle search input', async () => {
      const wrapper = mount(BasicHead)
      const searchInput = wrapper.find('[data-test="search-input"]')
      
      await searchInput.setValue('test query')
      
      expect(wrapper.vm.searchQuery).toBe('test query')
    })
    
    it('should display search results', async () => {
      const wrapper = mount(BasicHead)
      
      // Trigger search
      await wrapper.vm.handleSearch('test')
      
      // Wait for results
      await wrapper.vm.$nextTick()
      
      expect(wrapper.vm.searchResults).toBeDefined()
    })
  })
  
  describe('Actions', () => {
    it('should handle action clicks', async () => {
      const wrapper = mount(BasicHead)
      const action = {
        name: 'save',
        type: 'dispatch' as const,
        event: 'save_data'
      }
      
      await wrapper.vm.handleAction(action)
      
      expect(wrapper.emitted('action')).toBeTruthy()
    })
  })
})
```

## Template 5: Integration Test

For testing component interactions:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import BasicHead from '@/components/BasicHead.vue'
import BasicSide from '@/components/BasicSide.vue'
import BasicMain from '@/components/BasicMain.vue'

describe('Component Integration', () => {
  const createIntegrationStore = () => {
    return createStore({
      state: {
        vxg: {
          cmp: {
            BasicHead: { show: true },
            BasicSide: { show: false },
            BasicMain: { show: true }
          }
        }
      },
      actions: {
        set_cmp_flags: ({ state }, { name, flags }) => {
          state.vxg.cmp[name] = { ...state.vxg.cmp[name], ...flags }
        }
      }
    })
  }
  
  it('should toggle sidebar from header', async () => {
    const store = createIntegrationStore()
    const headerWrapper = mount(BasicHead, {
      global: { plugins: [store] }
    })
    
    // Trigger sidebar toggle action
    await headerWrapper.vm.toggleSidebar()
    
    // Check store state updated
    expect(store.state.vxg.cmp.BasicSide.show).toBe(true)
  })
})
```

## Coverage Requirements

Per SPEC-000002, all components must achieve **>80% coverage**:

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Statements**: 80%

### Check Coverage

```bash
pnpm test:coverage
```

### View Coverage Report

Open `coverage/index.html` in browser after running coverage.

## Testing Best Practices

### 1. Test Behavior, Not Implementation

```typescript
// ❌ Bad: Testing implementation details
it('should have a data property called isOpen', () => {
  expect(wrapper.vm.isOpen).toBeDefined()
})

// ✅ Good: Testing behavior
it('should show sidebar when opened', async () => {
  await wrapper.vm.open()
  expect(wrapper.find('.sidebar').isVisible()).toBe(true)
})
```

### 2. Use data-test Attributes

```vue
<!-- In component -->
<button data-test="submit-button">Submit</button>

<!-- In test -->
const button = wrapper.find('[data-test="submit-button"]')
```

### 3. Test User Interactions

```typescript
it('should submit form on button click', async () => {
  const wrapper = mount(MyForm)
  
  await wrapper.find('[data-test="name-input"]').setValue('John')
  await wrapper.find('[data-test="submit-button"]').trigger('click')
  
  expect(wrapper.emitted('submit')).toBeTruthy()
})
```

### 4. Mock External Dependencies

```typescript
vi.mock('@/services/api', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'mocked' })
}))
```

### 5. Test Edge Cases

```typescript
describe('Edge Cases', () => {
  it('should handle empty props', () => {
    const wrapper = mount(Component, { props: {} })
    expect(wrapper.exists()).toBe(true)
  })
  
  it('should handle null values', () => {
    const wrapper = mount(Component, { props: { value: null } })
    expect(wrapper.html()).toBeTruthy()
  })
  
  it('should handle errors gracefully', async () => {
    const wrapper = mount(Component)
    await wrapper.vm.handleError(new Error('test'))
    expect(wrapper.find('.error').exists()).toBe(true)
  })
})
```

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Run tests once (CI mode)
pnpm test:run

# Run tests with coverage
pnpm test:coverage
```

## Next Steps

1. **Week 2-3**: Use these templates to write tests for all 9 components
2. **Daily**: Run `pnpm test:coverage` to ensure >80% coverage
3. **Before commit**: Always run `pnpm test:run` to verify tests pass

---

**Reference**: vitest.config.ts, WEEK-1-TASK-ASSIGNMENTS.md, SPEC-000002
