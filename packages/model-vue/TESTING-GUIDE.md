# Testing Guide for @plantquest/model-vue

Comprehensive guide to testing the Vue 3 component library using Vitest.

## Quick Start

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## Test Framework

We use **Vitest** for testing:
- ✅ Fast (powered by Vite)
- ✅ Compatible with Jest API
- ✅ Native ESM support
- ✅ Built-in TypeScript support
- ✅ Vue Test Utils v2 integration

## Project Structure

```
src/
├── components/
│   ├── BasicHead.vue
│   └── BasicHead.spec.ts      ← Component tests
│
├── composables/
│   ├── useVxgStore.ts
│   └── useVxgStore.spec.ts    ← Composable tests
│
└── __tests__/
    ├── setup.ts               ← Global test configuration
    └── example.spec.ts        ← Example tests
```

## Writing Tests

### Basic Test Structure

```typescript
import { describe, it, expect } from 'vitest'

describe('Feature Name', () => {
  it('should do something', () => {
    expect(true).toBe(true)
  })
})
```

### Testing Components

```typescript
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
  it('should render correctly', () => {
    const wrapper = mount(MyComponent, {
      props: {
        title: 'Test'
      }
    })
    
    expect(wrapper.text()).toContain('Test')
  })
})
```

### Testing with Vuex

```typescript
import { createStore } from 'vuex'

const store = createStore({
  state: {
    vxg: {
      cmp: {
        MyComponent: { show: true }
      }
    }
  }
})

const wrapper = mount(MyComponent, {
  global: {
    plugins: [store]
  }
})
```

### Testing Composables

```typescript
import { useVxgStore } from './useVxgStore'

it('should provide store access', () => {
  const { vxgState } = useVxgStore()
  expect(vxgState.value).toBeDefined()
})
```

## Available Test Commands

### Development

```bash
# Watch mode (reruns on file changes)
pnpm test

# With UI dashboard
pnpm test:ui
```

### CI/CD

```bash
# Run once and exit
pnpm test:run

# With coverage report
pnpm test:coverage
```

### Coverage Thresholds

Per SPEC-000002, minimum coverage is **80%**:

```typescript
// vitest.config.ts
coverage: {
  thresholds: {
    lines: 80,
    functions: 80,
    branches: 80,
    statements: 80
  }
}
```

If coverage drops below 80%, tests will fail.

## Coverage Reports

After running `pnpm test:coverage`:

```bash
# View text summary in terminal
cat coverage/coverage-summary.json

# Open HTML report in browser
open coverage/index.html
```

Reports are generated in multiple formats:
- **Text**: Console output
- **HTML**: `coverage/index.html` (browsable)
- **LCOV**: `coverage/lcov.info` (for CI tools)
- **JSON**: `coverage/coverage-final.json`

## Test Utilities

### Vue Test Utils

```typescript
import { mount, shallowMount } from '@vue/test-utils'

// mount: Full rendering with child components
const wrapper = mount(Component)

// shallowMount: Stub child components (faster)
const wrapper = shallowMount(Component)
```

### Finding Elements

```typescript
// By CSS selector
wrapper.find('button')
wrapper.find('.my-class')
wrapper.find('#my-id')

// By component
wrapper.findComponent(ChildComponent)

// By data-test attribute (recommended)
wrapper.find('[data-test="submit-button"]')

// All matching elements
wrapper.findAll('li')
```

### Interacting with Components

```typescript
// Trigger events
await wrapper.trigger('click')
await wrapper.trigger('submit')

// Set input values
await wrapper.find('input').setValue('text')

// Check emitted events
expect(wrapper.emitted()).toHaveProperty('click')
expect(wrapper.emitted('click')).toHaveLength(1)

// Access component instance
wrapper.vm.myMethod()
expect(wrapper.vm.myData).toBe('value')
```

### Mocking

```typescript
import { vi } from 'vitest'

// Mock functions
const mockFn = vi.fn()
const mockFn = vi.fn().mockReturnValue('result')
const mockFn = vi.fn().mockResolvedValue('async result')

// Spy on methods
const spy = vi.spyOn(obj, 'method')

// Mock modules
vi.mock('./myModule', () => ({
  myFunction: vi.fn()
}))

// Mock timers
vi.useFakeTimers()
vi.advanceTimersByTime(1000)
vi.useRealTimers()
```

## Global Test Configuration

Located in `src/__tests__/setup.ts`:

- Vue Router mocks (`$router`, `$route`)
- Vxg plugin mock (`$vxg`)
- Vuetify component stubs
- Global mocks (matchMedia, IntersectionObserver, etc.)

This configuration applies to ALL tests automatically.

## Best Practices

### 1. Test Behavior, Not Implementation

```typescript
// ❌ Bad
it('should have a data property', () => {
  expect(wrapper.vm.myData).toBeDefined()
})

// ✅ Good
it('should display user name', () => {
  expect(wrapper.text()).toContain('John Doe')
})
```

### 2. Use Descriptive Test Names

```typescript
// ❌ Bad
it('works', () => {})

// ✅ Good
it('should display error message when validation fails', () => {})
```

### 3. Arrange-Act-Assert Pattern

```typescript
it('should toggle sidebar', async () => {
  // Arrange
  const wrapper = mount(Component)
  
  // Act
  await wrapper.find('[data-test="toggle"]').trigger('click')
  
  // Assert
  expect(wrapper.find('.sidebar').isVisible()).toBe(true)
})
```

### 4. Test Edge Cases

```typescript
describe('Edge Cases', () => {
  it('should handle empty props')
  it('should handle null values')
  it('should handle undefined')
  it('should handle errors')
  it('should handle loading states')
})
```

### 5. Keep Tests Isolated

```typescript
// ✅ Good: Each test is independent
describe('Counter', () => {
  it('should increment', () => {
    const wrapper = mount(Counter)
    wrapper.vm.increment()
    expect(wrapper.vm.count).toBe(1)
  })
  
  it('should decrement', () => {
    const wrapper = mount(Counter)
    wrapper.vm.decrement()
    expect(wrapper.vm.count).toBe(-1)
  })
})
```

### 6. Use beforeEach/afterEach

```typescript
describe('MyComponent', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = mount(MyComponent)
  })
  
  afterEach(() => {
    wrapper.unmount()
  })
  
  it('test 1', () => {
    // wrapper is fresh for each test
  })
})
```

## Common Testing Scenarios

### Testing Props

```typescript
it('should accept and display props', () => {
  const wrapper = mount(Component, {
    props: {
      title: 'Test Title',
      count: 42
    }
  })
  
  expect(wrapper.props('title')).toBe('Test Title')
  expect(wrapper.text()).toContain('Test Title')
})
```

### Testing Events

```typescript
it('should emit event on button click', async () => {
  const wrapper = mount(Component)
  
  await wrapper.find('button').trigger('click')
  
  expect(wrapper.emitted()).toHaveProperty('buttonClick')
  expect(wrapper.emitted('buttonClick')).toHaveLength(1)
  expect(wrapper.emitted('buttonClick')[0]).toEqual(['payload'])
})
```

### Testing Slots

```typescript
it('should render slot content', () => {
  const wrapper = mount(Component, {
    slots: {
      default: '<p>Slot Content</p>'
    }
  })
  
  expect(wrapper.html()).toContain('Slot Content')
})
```

### Testing Async Behavior

```typescript
it('should load data asynchronously', async () => {
  const wrapper = mount(Component)
  
  // Wait for component to finish loading
  await wrapper.vm.$nextTick()
  
  // Or wait for specific condition
  await flushPromises()
  
  expect(wrapper.vm.data).toBeDefined()
})
```

### Testing Error States

```typescript
it('should display error when API fails', async () => {
  // Mock API to fail
  vi.mocked(api.fetchData).mockRejectedValue(new Error('API Error'))
  
  const wrapper = mount(Component)
  
  await wrapper.vm.loadData()
  await wrapper.vm.$nextTick()
  
  expect(wrapper.find('.error').exists()).toBe(true)
  expect(wrapper.find('.error').text()).toContain('API Error')
})
```

## Debugging Tests

### 1. Console Output

```typescript
it('debug test', () => {
  const wrapper = mount(Component)
  console.log(wrapper.html())
  console.log(wrapper.vm.$data)
})
```

### 2. Vitest UI

```bash
pnpm test:ui
```

Opens interactive UI showing:
- Test results
- Component rendering
- Console output
- Error stack traces

### 3. Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["test"],
  "console": "integratedTerminal"
}
```

## Continuous Integration

In CI/CD pipelines:

```yaml
# .github/workflows/test.yml
- name: Run tests
  run: pnpm test:run

- name: Check coverage
  run: pnpm test:coverage
```

The build will fail if:
- Any test fails
- Coverage drops below 80%

## Troubleshooting

### "Cannot find module"

```bash
pnpm install
```

### Tests hanging

Check for:
- Missing `await` on async operations
- Infinite loops
- Unresolved promises

### Coverage not accurate

Make sure test files are named `*.spec.ts` or `*.test.ts`.

### Vuetify components not rendering

They're stubbed by default in `setup.ts`. This is intentional for Week 1.
Full Vuetify integration happens in Week 4.

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Testing Library](https://testing-library.com/)
- [Test Templates](./.cursor/TEST-TEMPLATES.md)

## Next Steps

- **Week 2-3**: Write tests for all 9 components using templates
- **Week 4**: Update tests for Vuetify 3 components
- **Week 5**: Integration tests for Vuex/Pinia adapters

---

**Status**: ✅ Testing infrastructure complete  
**Coverage Target**: >80% (enforced)  
**Reference**: SPEC-000002, WEEK-1-TASK-ASSIGNMENTS.md
