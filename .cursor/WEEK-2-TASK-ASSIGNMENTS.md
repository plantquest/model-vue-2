# Week 2-3 Task Assignments - Vue 3.0 Migration

**Weeks**: 2-3 of 11  
**Phase**: Component Migration (Parallel)  
**Duration**: Feb 24 - Mar 7, 2026 (10 days)  
**Goal**: Migrate all 9 components to Vue 3 Composition API  

---

## Overview

Week 2-3 is the core migration phase where all 9 components are converted from Vue 2 Options API to Vue 3 Composition API. All 4 agents work in parallel on non-overlapping components to maximize speed.

**Success Criteria**:
- ✅ All 9 components migrated to Composition API
- ✅ All components have TypeScript types
- ✅ Complex components split into sub-components
- ✅ Composables extracted for reusable logic
- ✅ Test coverage >80% per component
- ✅ Vuetify 3 syntax updated
- ✅ All tests passing

**Prerequisites** (from Week 1):
- ✅ Monorepo structure working
- ✅ Vite build system configured
- ✅ TypeScript compiling
- ✅ Vitest test framework ready

---

## Component Distribution Strategy

### Complexity-Based Distribution

**Agent 1: Simple Components** (3 components, ~250 total lines)
- BasicLed.vue (~50 lines) - Status indicator
- BasicFoot.vue (~80 lines) - Footer component
- BasicFieldPick.vue (~120 lines) - Field picker

**Agent 2: Medium Components** (3 components, ~630 total lines)
- BasicAuth.vue (~200 lines) - Authentication
- BasicAdmin.vue (~250 lines) - Admin panel
- BasicSide.vue (~180 lines) - Side drawer

**Agent 3: Complex Component 1** (1 component, ~392 lines)
- BasicNavStages.vue (~392 lines) - Stage navigation
  - Requires splitting into sub-components
  - Requires routing composables

**Agent 4: Complex Component 2** (1 component, ~1100+ lines)
- BasicHead.vue (~1100+ lines) - Header/toolbar
  - Requires splitting into 4+ sub-components
  - Requires search composables
  - Most complex component in library

**Total**: 9 components, ~2,372 lines

---

## Task 2.1: Simple Components Migration

**Assigned To**: fullstack-coder  
**Duration**: 5-7 days (Feb 24 - Mar 2)  
**Branch**: `feature/week2-simple-components`  
**Priority**: 🟢 MEDIUM (parallel with others)

### Description
Migrate the three simplest components to Vue 3 Composition API with TypeScript. These serve as templates for the migration pattern.

### Component 1: BasicLed.vue (~50 lines)

**Current Structure (Vue 2)**:
- Simple status indicator component
- Props: `status` (string)
- Computed: `color`, `icon`
- No lifecycle hooks
- No methods
- No state management

**Migration Tasks**:

1. **Convert to `<script setup>` with TypeScript**
   ```vue
   <template>
     <v-icon :color="color">{{ icon }}</v-icon>
   </template>

   <script setup lang="ts">
   import { computed } from 'vue'

   interface Props {
     status?: 'on' | 'off' | 'warning' | 'error'
   }

   const props = withDefaults(defineProps<Props>(), {
     status: 'off'
   })

   const color = computed(() => {
     switch (props.status) {
       case 'on': return 'green'
       case 'warning': return 'orange'
       case 'error': return 'red'
       default: return 'grey'
     }
   })

   const icon = computed(() => 'mdi-circle')
   </script>
   ```

2. **Create type definitions**
   ```typescript
   // src/types/components.ts
   export interface BasicLedProps {
     status?: 'on' | 'off' | 'warning' | 'error'
   }
   ```

3. **Write comprehensive tests**
   ```typescript
   // src/__tests__/BasicLed.spec.ts
   import { describe, it, expect } from 'vitest'
   import { mount } from '@vue/test-utils'
   import BasicLed from '@/components/BasicLed.vue'

   describe('BasicLed', () => {
     it('renders with default status', () => {
       const wrapper = mount(BasicLed)
       expect(wrapper.find('v-icon').exists()).toBe(true)
     })

     it('renders green when status is on', () => {
       const wrapper = mount(BasicLed, {
         props: { status: 'on' }
       })
       expect(wrapper.find('v-icon').attributes('color')).toBe('green')
     })

     it('renders orange when status is warning', () => {
       const wrapper = mount(BasicLed, {
         props: { status: 'warning' }
       })
       expect(wrapper.find('v-icon').attributes('color')).toBe('orange')
     })

     it('renders red when status is error', () => {
       const wrapper = mount(BasicLed, {
         props: { status: 'error' }
       })
       expect(wrapper.find('v-icon').attributes('color')).toBe('red')
     })

     it('renders grey when status is off', () => {
       const wrapper = mount(BasicLed, {
         props: { status: 'off' }
       })
       expect(wrapper.find('v-icon').attributes('color')).toBe('grey')
     })

     it('uses correct icon', () => {
       const wrapper = mount(BasicLed)
       expect(wrapper.find('v-icon').text()).toBe('mdi-circle')
     })
   })
   ```

4. **Update Vuetify 3 syntax** (if needed)
5. **Achieve >80% test coverage**

### Component 2: BasicFoot.vue (~80 lines)

**Current Structure (Vue 2)**:
- Footer with links and version info
- Props: `links`, `version`, `copyright`
- Computed: `currentYear`, `formattedVersion`
- Methods: `handleLinkClick`

**Migration Tasks**:

1. **Convert to Composition API**
   ```vue
   <template>
     <v-footer app>
       <v-row>
         <v-col>
           <v-btn
             v-for="link in links"
             :key="link.id"
             text
             @click="handleLinkClick(link)"
           >
             {{ link.label }}
           </v-btn>
         </v-col>
         <v-col class="text-right">
           <span>{{ copyright }} {{ currentYear }}</span>
           <span class="ml-2">v{{ version }}</span>
         </v-col>
       </v-row>
     </v-footer>
   </template>

   <script setup lang="ts">
   import { computed } from 'vue'
   import { useRouter } from 'vue-router'

   interface Link {
     id: string
     label: string
     route?: string
     href?: string
   }

   interface Props {
     links?: Link[]
     version?: string
     copyright?: string
   }

   const props = withDefaults(defineProps<Props>(), {
     links: () => [],
     version: '1.0.0',
     copyright: '© PlantQuest'
   })

   const emit = defineEmits<{
     linkClick: [link: Link]
   }>()

   const router = useRouter()

   const currentYear = computed(() => new Date().getFullYear())

   const handleLinkClick = (link: Link) => {
     if (link.route) {
       router.push(link.route)
     } else if (link.href) {
       window.open(link.href, '_blank')
     }
     emit('linkClick', link)
   }
   </script>
   ```

2. **Add TypeScript types**
3. **Write tests** (>80% coverage)
4. **Update Vuetify 3 syntax**

### Component 3: BasicFieldPick.vue (~120 lines)

**Current Structure (Vue 2)**:
- Field picker with autocomplete
- Props: `fields`, `value`, `label`, `multiple`
- Computed: `filteredFields`, `selectedFields`
- Methods: `handleSelection`, `handleSearch`
- Emits: `input`, `change`

**Migration Tasks**:

1. **Convert to Composition API**
   ```vue
   <template>
     <v-autocomplete
       :model-value="modelValue"
       :items="fields"
       :label="label"
       :multiple="multiple"
       :loading="isLoading"
       item-title="name"
       item-value="id"
       @update:model-value="handleSelection"
       @update:search="handleSearch"
     />
   </template>

   <script setup lang="ts">
   import { ref, computed } from 'vue'

   interface Field {
     id: string
     name: string
     type: string
   }

   interface Props {
     fields?: Field[]
     modelValue?: string | string[]
     label?: string
     multiple?: boolean
   }

   const props = withDefaults(defineProps<Props>(), {
     fields: () => [],
     label: 'Select Field',
     multiple: false
   })

   const emit = defineEmits<{
     'update:modelValue': [value: string | string[]]
     change: [value: string | string[]]
   }>()

   const isLoading = ref(false)

   const handleSelection = (value: string | string[]) => {
     emit('update:modelValue', value)
     emit('change', value)
   }

   const handleSearch = (query: string) => {
     // Search logic if needed
     console.log('Search:', query)
   }
   </script>
   ```

2. **Add TypeScript types**
3. **Write comprehensive tests**
4. **Update Vuetify 3 syntax** (v-model → :model-value)

### Acceptance Criteria (All 3 Components)

**Per Component**:
- [ ] Converted to `<script setup lang="ts">`
- [ ] Props properly typed with TypeScript
- [ ] Emits properly typed
- [ ] All computed properties migrated
- [ ] All methods migrated
- [ ] Vuetify 3 syntax used (`variant`, `icon`, `:model-value`)
- [ ] Tests written with >80% coverage
- [ ] Tests passing
- [ ] No TypeScript errors
- [ ] Component builds successfully
- [ ] Documented with JSDoc comments

**Integration**:
- [ ] All 3 components work together
- [ ] No regressions from Vue 2 version
- [ ] Performance maintained or improved

### Deliverables

1. **Migrated Components**:
   - `packages/model-vue/src/components/BasicLed.vue`
   - `packages/model-vue/src/components/BasicFoot.vue`
   - `packages/model-vue/src/components/BasicFieldPick.vue`

2. **Type Definitions**:
   - `packages/model-vue/src/types/components.ts` (updated)

3. **Test Files**:
   - `packages/model-vue/src/__tests__/BasicLed.spec.ts`
   - `packages/model-vue/src/__tests__/BasicFoot.spec.ts`
   - `packages/model-vue/src/__tests__/BasicFieldPick.spec.ts`

4. **Documentation**:
   - `.cursor/SIMPLE-COMPONENT-PATTERN.md` (migration pattern template)

### Dependencies
- 🔗 **Requires**: Week 1 infrastructure complete

### Risks & Mitigations
- ⚠️ **Risk**: Vuetify 3 prop changes
  - **Mitigation**: Refer to Vuetify 3 migration guide, test visually
- ⚠️ **Risk**: TypeScript type errors
  - **Mitigation**: Start with loose types, tighten gradually

---

## Task 2.2: Medium Components Migration

**Assigned To**: fullstack-coder  
**Duration**: 7-9 days (Feb 24 - Mar 5)  
**Branch**: `feature/week2-medium-components`  
**Priority**: 🟡 HIGH (has state management)

### Description
Migrate three medium-complexity components that involve state management, routing, and more complex logic. Extract reusable composables.

### Component 1: BasicAuth.vue (~200 lines)

**Current Structure (Vue 2)**:
- Authentication form
- Data: `username`, `password`, `loading`, `error`
- Computed: `isAuthenticated`, `canLogin`
- Methods: `login`, `logout`, `validate`
- Vuex integration
- Router integration
- Lifecycle: `mounted` (redirect if authenticated)

**Migration Tasks**:

1. **Convert to Composition API**
   ```vue
   <template>
     <v-card>
       <v-card-title>Login</v-card-title>
       <v-card-text>
         <v-form @submit.prevent="handleLogin">
           <v-text-field
             v-model="username"
             label="Username"
             :error-messages="errors.username"
             @blur="validateUsername"
           />
           <v-text-field
             v-model="password"
             label="Password"
             type="password"
             :error-messages="errors.password"
             @blur="validatePassword"
           />
         </v-form>
       </v-card-text>
       <v-card-actions>
         <v-btn
           :loading="isLoading"
           :disabled="!canLogin"
           @click="handleLogin"
         >
           Login
         </v-btn>
       </v-card-actions>
     </v-card>
   </template>

   <script setup lang="ts">
   import { ref, computed, onMounted } from 'vue'
   import { useRouter } from 'vue-router'
   import { useStore } from 'vuex'
   import { useAuth } from '@/composables/useAuth'

   interface Props {
     redirectPath?: string
   }

   const props = withDefaults(defineProps<Props>(), {
     redirectPath: '/dashboard'
   })

   const emit = defineEmits<{
     loginSuccess: []
     loginError: [error: Error]
   }>()

   const store = useStore()
   const router = useRouter()
   const { login, logout, isAuthenticated } = useAuth()

   const username = ref('')
   const password = ref('')
   const isLoading = ref(false)
   const errors = ref({
     username: '',
     password: ''
   })

   const canLogin = computed(() => 
     username.value.length > 0 && 
     password.value.length > 0 &&
     !isLoading.value
   )

   const validateUsername = () => {
     if (!username.value) {
       errors.value.username = 'Username is required'
       return false
     }
     errors.value.username = ''
     return true
   }

   const validatePassword = () => {
     if (!password.value) {
       errors.value.password = 'Password is required'
       return false
     }
     if (password.value.length < 6) {
       errors.value.password = 'Password must be at least 6 characters'
       return false
     }
     errors.value.password = ''
     return true
   }

   const handleLogin = () => {
     if (!validateUsername() || !validatePassword()) {
       return
     }

     isLoading.value = true

     login({
       username: username.value,
       password: password.value
     })
       .then(() => {
         emit('loginSuccess')
         router.push(props.redirectPath)
       })
       .catch((error) => {
         emit('loginError', error)
         errors.value.password = 'Invalid credentials'
       })
       .finally(() => {
         isLoading.value = false
       })
   }

   onMounted(() => {
     if (isAuthenticated.value) {
       router.push(props.redirectPath)
     }
   })
   </script>
   ```

2. **Extract authentication composable**
   ```typescript
   // src/composables/useAuth.ts
   import { computed } from 'vue'
   import { useStore } from 'vuex'
   import { useRouter } from 'vue-router'

   interface Credentials {
     username: string
     password: string
   }

   export function useAuth() {
     const store = useStore()
     const router = useRouter()

     const isAuthenticated = computed(() => 
       store.state.auth?.authenticated || false
     )

     const currentUser = computed(() => 
       store.state.auth?.user || null
     )

     const login = (credentials: Credentials) => {
       return store.dispatch('auth/login', credentials)
     }

     const logout = () => {
       return store.dispatch('auth/logout')
         .then(() => {
           router.push('/login')
         })
     }

     const checkAuth = () => {
       return store.dispatch('auth/check')
     }

     return {
       isAuthenticated,
       currentUser,
       login,
       logout,
       checkAuth
     }
   }
   ```

3. **Write comprehensive tests**
   ```typescript
   // src/__tests__/BasicAuth.spec.ts
   import { describe, it, expect, vi } from 'vitest'
   import { mount } from '@vue/test-utils'
   import { createStore } from 'vuex'
   import { createRouter, createMemoryHistory } from 'vue-router'
   import BasicAuth from '@/components/BasicAuth.vue'

   describe('BasicAuth', () => {
     const mockStore = createStore({
       state: { auth: { authenticated: false, user: null } },
       actions: {
         'auth/login': vi.fn(),
         'auth/logout': vi.fn()
       }
     })

     const mockRouter = createRouter({
       history: createMemoryHistory(),
       routes: [
         { path: '/login', component: { template: '<div>Login</div>' } },
         { path: '/dashboard', component: { template: '<div>Dashboard</div>' } }
       ]
     })

     it('renders login form', () => {
       const wrapper = mount(BasicAuth, {
         global: {
           plugins: [mockStore, mockRouter]
         }
       })
       expect(wrapper.find('v-text-field[label="Username"]').exists()).toBe(true)
       expect(wrapper.find('v-text-field[label="Password"]').exists()).toBe(true)
     })

     it('validates required fields', async () => {
       const wrapper = mount(BasicAuth, {
         global: {
           plugins: [mockStore, mockRouter]
         }
       })
       
       const usernameField = wrapper.find('v-text-field[label="Username"]')
       await usernameField.trigger('blur')
       
       expect(wrapper.text()).toContain('Username is required')
     })

     it('calls login action on submit', async () => {
       const wrapper = mount(BasicAuth, {
         global: {
           plugins: [mockStore, mockRouter]
         }
       })
       
       await wrapper.find('v-text-field[label="Username"]').setValue('testuser')
       await wrapper.find('v-text-field[label="Password"]').setValue('password123')
       await wrapper.find('v-btn').trigger('click')
       
       expect(mockStore._actions['auth/login']).toHaveBeenCalledWith(
         expect.any(Object),
         { username: 'testuser', password: 'password123' }
       )
     })

     it('redirects if already authenticated', async () => {
       const authenticatedStore = createStore({
         state: { auth: { authenticated: true, user: { id: 1 } } }
       })
       
       const push = vi.spyOn(mockRouter, 'push')
       
       mount(BasicAuth, {
         global: {
           plugins: [authenticatedStore, mockRouter]
         }
       })
       
       expect(push).toHaveBeenCalledWith('/dashboard')
     })
   })
   ```

4. **Update Vuetify 3 syntax**

### Component 2: BasicAdmin.vue (~250 lines)

**Current Structure (Vue 2)**:
- Admin panel with user management
- Data: `users`, `selectedUser`, `showDialog`
- Computed: `filteredUsers`, `isAdmin`
- Methods: `loadUsers`, `editUser`, `deleteUser`, `saveUser`
- Vuex integration
- API calls

**Migration Tasks**:

1. **Convert to Composition API with admin composable**
   ```typescript
   // src/composables/useAdmin.ts
   import { ref, computed } from 'vue'
   import { useStore } from 'vuex'

   export function useAdmin() {
     const store = useStore()
     
     const users = computed(() => store.state.admin?.users || [])
     const isAdmin = computed(() => store.state.auth?.user?.role === 'admin')
     
     const loadUsers = () => {
       return store.dispatch('admin/loadUsers')
     }
     
     const updateUser = (userId: string, data: any) => {
       return store.dispatch('admin/updateUser', { userId, data })
     }
     
     const deleteUser = (userId: string) => {
       return store.dispatch('admin/deleteUser', userId)
     }
     
     return {
       users,
       isAdmin,
       loadUsers,
       updateUser,
       deleteUser
     }
   }
   ```

2. **Write tests** (>80% coverage)
3. **Update Vuetify 3 syntax**

### Component 3: BasicSide.vue (~180 lines)

**Current Structure (Vue 2)**:
- Side drawer with navigation
- Props: `items`, `mini`, `permanent`
- Data: `drawer`, `selectedItem`
- Computed: `isOpen`, `drawerWidth`
- Methods: `toggleDrawer`, `selectItem`, `handleResize`
- Vuex integration (drawer state)
- Window resize listener

**Migration Tasks**:

1. **Convert to Composition API**
   ```vue
   <template>
     <v-navigation-drawer
       v-model="isDrawerOpen"
       :rail="isMini"
       :permanent="permanent"
       :width="drawerWidth"
     >
       <v-list>
         <v-list-item
           v-for="item in items"
           :key="item.id"
           :value="item.id"
           :to="item.route"
           @click="handleItemClick(item)"
         >
           <template #prepend>
             <v-icon :icon="item.icon"></v-icon>
           </template>
           <v-list-item-title>{{ item.label }}</v-list-item-title>
         </v-list-item>
       </v-list>
     </v-navigation-drawer>
   </template>

   <script setup lang="ts">
   import { ref, computed, onMounted, onUnmounted } from 'vue'
   import { useStore } from 'vuex'
   import { useRouter } from 'vue-router'
   import { useSide } from '@/composables/useSide'

   interface NavItem {
     id: string
     label: string
     icon: string
     route?: string
   }

   interface Props {
     items?: NavItem[]
     mini?: boolean
     permanent?: boolean
     width?: number
   }

   const props = withDefaults(defineProps<Props>(), {
     items: () => [],
     mini: false,
     permanent: false,
     width: 280
   })

   const emit = defineEmits<{
     itemClick: [item: NavItem]
     toggle: [isOpen: boolean]
   }>()

   const store = useStore()
   const router = useRouter()
   const { isOpen, toggle, close } = useSide()

   const isDrawerOpen = computed({
     get: () => isOpen.value,
     set: (value) => toggle(value)
   })

   const isMini = computed(() => props.mini)
   const drawerWidth = computed(() => props.width)

   const handleItemClick = (item: NavItem) => {
     emit('itemClick', item)
     if (item.route) {
       router.push(item.route)
     }
   }

   const handleResize = () => {
     const width = window.innerWidth
     if (width < 960) {
       close()
     }
   }

   onMounted(() => {
     window.addEventListener('resize', handleResize)
     handleResize()
   })

   onUnmounted(() => {
     window.removeEventListener('resize', handleResize)
   })
   </script>
   ```

2. **Extract side drawer composable**
   ```typescript
   // src/composables/useSide.ts
   import { computed } from 'vue'
   import { useStore } from 'vuex'

   export function useSide() {
     const store = useStore()

     const isOpen = computed(() => 
       store.state.vxg?.cmp?.BasicSide?.show || false
     )

     const content = computed(() => 
       store.state.vxg?.cmp?.BasicSide?.content || null
     )

     const toggle = (value?: boolean) => {
       const newValue = value !== undefined ? value : !isOpen.value
       store.dispatch('set_cmp_flags', {
         name: 'BasicSide',
         flags: { show: newValue }
       })
     }

     const open = () => toggle(true)
     const close = () => toggle(false)

     const setContent = (newContent: any) => {
       store.dispatch('set_cmp_flags', {
         name: 'BasicSide',
         flags: { content: newContent }
       })
     }

     return {
       isOpen,
       content,
       toggle,
       open,
       close,
       setContent
     }
   }
   ```

3. **Write tests** (>80% coverage)
4. **Update Vuetify 3 syntax**

### Acceptance Criteria (All 3 Components)

**Per Component**:
- [ ] Converted to Composition API
- [ ] Composables extracted (`useAuth`, `useAdmin`, `useSide`)
- [ ] State management working (Vuex 4 compatible)
- [ ] Router integration working
- [ ] Lifecycle hooks converted (onMounted, onUnmounted)
- [ ] Event listeners cleaned up properly
- [ ] Tests achieve >80% coverage
- [ ] TypeScript types complete
- [ ] Vuetify 3 components used correctly
- [ ] No regressions

### Deliverables

1. **Migrated Components**:
   - `packages/model-vue/src/components/BasicAuth.vue`
   - `packages/model-vue/src/components/BasicAdmin.vue`
   - `packages/model-vue/src/components/BasicSide.vue`

2. **Composables**:
   - `packages/model-vue/src/composables/useAuth.ts`
   - `packages/model-vue/src/composables/useAdmin.ts`
   - `packages/model-vue/src/composables/useSide.ts`

3. **Test Files**:
   - `packages/model-vue/src/__tests__/BasicAuth.spec.ts`
   - `packages/model-vue/src/__tests__/BasicAdmin.spec.ts`
   - `packages/model-vue/src/__tests__/BasicSide.spec.ts`
   - `packages/model-vue/src/__tests__/composables/useAuth.spec.ts`
   - `packages/model-vue/src/__tests__/composables/useAdmin.spec.ts`
   - `packages/model-vue/src/__tests__/composables/useSide.spec.ts`

4. **Documentation**:
   - `.cursor/MEDIUM-COMPONENT-PATTERN.md` (state management pattern)

### Dependencies
- 🔗 **Requires**: Week 1 infrastructure complete
- 🔗 **Requires**: Task 2.1 (simple components) for pattern reference

### Risks & Mitigations
- ⚠️ **Risk**: Vuex state management complexity
  - **Mitigation**: Extract composables to isolate state logic
- ⚠️ **Risk**: Router integration issues
  - **Mitigation**: Use Vue Router 4 composables (useRouter, useRoute)
- ⚠️ **Risk**: Event listener memory leaks
  - **Mitigation**: Always clean up in onUnmounted

---

## Task 2.3: Complex Component 1 - BasicNavStages

**Assigned To**: fullstack-coder  
**Duration**: 7-10 days (Feb 24 - Mar 6)  
**Branch**: `feature/week2-navstages-complex`  
**Priority**: 🔴 HIGH (complex routing logic)

### Description
Migrate BasicNavStages (~392 lines), the stage navigation component. This requires splitting into sub-components and extracting routing composables.

### Current Structure (Vue 2)
- Stage-based navigation with expansion panels
- Props: `stages`, `currentStage`, `allowSkip`
- Data: `panel`, `history`, `completedStages`
- Computed: `canProgress`, `nextStage`, `previousStage`, `progress`
- Methods: `goToStage`, `nextStage`, `previousStage`, `canAccessStage`
- Vuex integration (stage state)
- Router integration (route changes)
- Watch: `$route` for stage sync

### Phase 1: Analysis & Planning (Day 1)

**Tasks**:
1. **Analyze current component**
   - Map all props, data, computed, methods
   - Identify sub-component boundaries
   - Document state dependencies
   - Document routing logic

2. **Create splitting strategy**
   ```
   BasicNavStages.vue (main orchestrator)
   ├── NavStagesExpansion.vue (expansion panel wrapper)
   ├── NavStageItem.vue (individual stage)
   ├── NavStageProgress.vue (progress indicator)
   └── composables/
       ├── useNavStages.ts (stage logic)
       └── useStageRouting.ts (routing logic)
   ```

3. **Document breaking changes**
   - List any API changes
   - Plan backwards compatibility
   - Document migration notes

### Phase 2: Component Splitting (Day 2-3)

**Task 1: Extract NavStageItem.vue**

```vue
<template>
  <v-expansion-panel-title>
    <v-row align="center" no-gutters>
      <v-col cols="auto">
        <v-icon :icon="stage.icon" :color="iconColor"></v-icon>
      </v-col>
      <v-col>
        <div class="ml-3">
          <div class="text-subtitle-1">{{ stage.label }}</div>
          <div v-if="stage.description" class="text-caption">
            {{ stage.description }}
          </div>
        </div>
      </v-col>
      <v-col cols="auto">
        <v-chip
          v-if="isCompleted"
          color="success"
          size="small"
        >
          <v-icon icon="mdi-check" size="small"></v-icon>
        </v-chip>
        <v-chip
          v-else-if="isCurrent"
          color="primary"
          size="small"
        >
          Current
        </v-chip>
      </v-col>
    </v-row>
  </v-expansion-panel-title>
  <v-expansion-panel-text>
    <div class="pa-2">
      <slot name="content"></slot>
      <v-row class="mt-4">
        <v-col>
          <v-btn
            v-if="canGoPrevious"
            variant="text"
            @click="emit('previous')"
          >
            Previous
          </v-btn>
        </v-col>
        <v-col class="text-right">
          <v-btn
            v-if="canGoNext"
            color="primary"
            @click="emit('next')"
          >
            Next
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-expansion-panel-text>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Stage {
  id: number
  label: string
  description?: string
  icon: string
  route: string
}

interface Props {
  stage: Stage
  currentStageId: number
  completedStageIds: number[]
  canGoPrevious: boolean
  canGoNext: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  next: []
  previous: []
}>()

const isCurrent = computed(() => props.stage.id === props.currentStageId)
const isCompleted = computed(() => props.completedStageIds.includes(props.stage.id))

const iconColor = computed(() => {
  if (isCompleted.value) return 'success'
  if (isCurrent.value) return 'primary'
  return 'grey'
})
</script>
```

**Task 2: Extract NavStagesExpansion.vue**

```vue
<template>
  <v-expansion-panels v-model="panelModel" mandatory>
    <v-expansion-panel
      v-for="stage in stages"
      :key="stage.id"
      :value="stage.id"
    >
      <NavStageItem
        :stage="stage"
        :current-stage-id="currentStageId"
        :completed-stage-ids="completedStageIds"
        :can-go-previous="canNavigateToStage(stage.id - 1)"
        :can-go-next="canNavigateToStage(stage.id + 1)"
        @next="handleNext(stage)"
        @previous="handlePrevious(stage)"
      >
        <template #content>
          <slot :name="`stage-${stage.id}`" :stage="stage"></slot>
        </template>
      </NavStageItem>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NavStageItem from './NavStageItem.vue'

interface Stage {
  id: number
  label: string
  route: string
}

interface Props {
  stages: Stage[]
  currentStageId: number
  completedStageIds: number[]
  allowSkip: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  navigate: [stageId: number]
}>()

const panelModel = computed({
  get: () => props.currentStageId,
  set: (value) => emit('navigate', value)
})

const canNavigateToStage = (stageId: number) => {
  if (stageId < 0 || stageId >= props.stages.length) return false
  if (props.allowSkip) return true
  return props.completedStageIds.includes(stageId - 1)
}

const handleNext = (stage: Stage) => {
  const nextId = stage.id + 1
  if (canNavigateToStage(nextId)) {
    emit('navigate', nextId)
  }
}

const handlePrevious = (stage: Stage) => {
  const previousId = stage.id - 1
  if (canNavigateToStage(previousId)) {
    emit('navigate', previousId)
  }
}
</script>
```

**Task 3: Create main BasicNavStages.vue**

```vue
<template>
  <div class="basic-nav-stages">
    <NavStagesProgress
      :current="currentStage"
      :total="stages.length"
      :completed="completedStages.length"
    />
    <NavStagesExpansion
      :stages="stages"
      :current-stage-id="currentStage"
      :completed-stage-ids="completedStages"
      :allow-skip="allowSkip"
      @navigate="handleNavigate"
    >
      <template v-for="stage in stages" #[`stage-${stage.id}`]="{ stage: stageData }">
        <slot :name="`stage-content-${stage.id}`" :stage="stageData"></slot>
      </template>
    </NavStagesExpansion>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import NavStagesExpansion from './NavStagesExpansion.vue'
import NavStagesProgress from './NavStagesProgress.vue'
import { useNavStages } from '@/composables/useNavStages'
import { useStageRouting } from '@/composables/useStageRouting'

interface Stage {
  id: number
  label: string
  description?: string
  icon: string
  route: string
}

interface Props {
  stages?: Stage[]
  allowSkip?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  stages: () => [],
  allowSkip: false
})

const route = useRoute()
const { 
  currentStage, 
  completedStages, 
  goToStage, 
  completeStage 
} = useNavStages()

const { navigateToStage, syncRouteToStage } = useStageRouting(props.stages)

const handleNavigate = (stageId: number) => {
  const stage = props.stages.find(s => s.id === stageId)
  if (stage) {
    goToStage(stageId)
    navigateToStage(stage)
  }
}

// Sync route changes to stage
watch(() => route.name, () => {
  const stageId = syncRouteToStage(route)
  if (stageId !== null && stageId !== currentStage.value) {
    goToStage(stageId)
  }
}, { immediate: true })
</script>
```

### Phase 3: Composition API Conversion (Day 4-6)

**Task 1: Create useNavStages composable**

```typescript
// src/composables/useNavStages.ts
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export function useNavStages() {
  const store = useStore()

  const currentStage = computed({
    get: () => store.state.vxg?.cmp?.BasicNavStages?.currentStage || 0,
    set: (value) => {
      store.dispatch('set_cmp_flags', {
        name: 'BasicNavStages',
        flags: { currentStage: value }
      })
    }
  })

  const stages = computed(() => 
    store.state.vxg?.cmp?.BasicNavStages?.stages || []
  )

  const completedStages = computed(() => 
    store.state.vxg?.cmp?.BasicNavStages?.completedStages || []
  )

  const history = computed(() => 
    store.state.vxg?.cmp?.BasicNavStages?.history || []
  )

  const goToStage = (stageId: number) => {
    store.dispatch('set_cmp_flags', {
      name: 'BasicNavStages',
      flags: {
        currentStage: stageId,
        history: [...history.value, currentStage.value]
      }
    })
  }

  const completeStage = (stageId: number) => {
    const completed = [...completedStages.value]
    if (!completed.includes(stageId)) {
      completed.push(stageId)
      store.dispatch('set_cmp_flags', {
        name: 'BasicNavStages',
        flags: { completedStages: completed }
      })
    }
  }

  const canAccessStage = (stageId: number, allowSkip: boolean) => {
    if (allowSkip) return true
    if (stageId === 0) return true
    return completedStages.value.includes(stageId - 1)
  }

  const nextStage = computed(() => currentStage.value + 1)
  const previousStage = computed(() => currentStage.value - 1)

  const progress = computed(() => {
    const total = stages.value.length
    if (total === 0) return 0
    return Math.round((completedStages.value.length / total) * 100)
  })

  return {
    currentStage,
    stages,
    completedStages,
    history,
    goToStage,
    completeStage,
    canAccessStage,
    nextStage,
    previousStage,
    progress
  }
}
```

**Task 2: Create useStageRouting composable**

```typescript
// src/composables/useStageRouting.ts
import { useRouter, useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'

interface Stage {
  id: number
  route: string
}

export function useStageRouting(stages: Stage[]) {
  const router = useRouter()
  const route = useRoute()

  const navigateToStage = (stage: Stage) => {
    if (stage.route && route.name !== stage.route) {
      router.push({ name: stage.route })
    }
  }

  const syncRouteToStage = (currentRoute: RouteLocationNormalizedLoaded): number | null => {
    const stage = stages.find(s => s.route === currentRoute.name)
    return stage ? stage.id : null
  }

  const getStageByRoute = (routeName: string) => {
    return stages.find(s => s.route === routeName)
  }

  return {
    navigateToStage,
    syncRouteToStage,
    getStageByRoute
  }
}
```

### Phase 4: Testing (Day 7-10)

**Task 1: Unit tests for sub-components**

```typescript
// src/__tests__/NavStageItem.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavStageItem from '@/components/NavStageItem.vue'

describe('NavStageItem', () => {
  const mockStage = {
    id: 1,
    label: 'Test Stage',
    description: 'Test description',
    icon: 'mdi-test',
    route: 'test-route'
  }

  it('renders stage information', () => {
    const wrapper = mount(NavStageItem, {
      props: {
        stage: mockStage,
        currentStageId: 1,
        completedStageIds: [],
        canGoPrevious: false,
        canGoNext: true
      }
    })

    expect(wrapper.text()).toContain('Test Stage')
    expect(wrapper.text()).toContain('Test description')
  })

  it('shows current chip when stage is current', () => {
    const wrapper = mount(NavStageItem, {
      props: {
        stage: mockStage,
        currentStageId: 1,
        completedStageIds: [],
        canGoPrevious: false,
        canGoNext: true
      }
    })

    expect(wrapper.find('v-chip').text()).toContain('Current')
  })

  it('shows completed chip when stage is completed', () => {
    const wrapper = mount(NavStageItem, {
      props: {
        stage: mockStage,
        currentStageId: 2,
        completedStageIds: [1],
        canGoPrevious: true,
        canGoNext: true
      }
    })

    expect(wrapper.find('v-icon[icon="mdi-check"]').exists()).toBe(true)
  })

  it('emits next event when next button clicked', async () => {
    const wrapper = mount(NavStageItem, {
      props: {
        stage: mockStage,
        currentStageId: 1,
        completedStageIds: [],
        canGoPrevious: false,
        canGoNext: true
      }
    })

    await wrapper.find('v-btn[color="primary"]').trigger('click')
    expect(wrapper.emitted('next')).toBeTruthy()
  })
})
```

**Task 2: Integration tests**

```typescript
// src/__tests__/BasicNavStages.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import BasicNavStages from '@/components/BasicNavStages.vue'

describe('BasicNavStages', () => {
  const mockStages = [
    { id: 0, label: 'Stage 1', icon: 'mdi-1', route: 'stage-1' },
    { id: 1, label: 'Stage 2', icon: 'mdi-2', route: 'stage-2' },
    { id: 2, label: 'Stage 3', icon: 'mdi-3', route: 'stage-3' }
  ]

  const mockStore = createStore({
    state: {
      vxg: {
        cmp: {
          BasicNavStages: {
            currentStage: 0,
            stages: mockStages,
            completedStages: [],
            history: []
          }
        }
      }
    },
    actions: {
      set_cmp_flags: vi.fn()
    }
  })

  const mockRouter = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/stage-1', name: 'stage-1', component: { template: '<div>Stage 1</div>' } },
      { path: '/stage-2', name: 'stage-2', component: { template: '<div>Stage 2</div>' } },
      { path: '/stage-3', name: 'stage-3', component: { template: '<div>Stage 3</div>' } }
    ]
  })

  it('renders all stages', () => {
    const wrapper = mount(BasicNavStages, {
      props: { stages: mockStages },
      global: {
        plugins: [mockStore, mockRouter]
      }
    })

    expect(wrapper.text()).toContain('Stage 1')
    expect(wrapper.text()).toContain('Stage 2')
    expect(wrapper.text()).toContain('Stage 3')
  })

  it('navigates to stage when clicked', async () => {
    const wrapper = mount(BasicNavStages, {
      props: { stages: mockStages, allowSkip: true },
      global: {
        plugins: [mockStore, mockRouter]
      }
    })

    // Simulate navigation
    await wrapper.vm.handleNavigate(1)

    expect(mockStore._actions.set_cmp_flags).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        name: 'BasicNavStages',
        flags: expect.objectContaining({ currentStage: 1 })
      })
    )
  })

  it('syncs route changes to stage', async () => {
    const wrapper = mount(BasicNavStages, {
      props: { stages: mockStages },
      global: {
        plugins: [mockStore, mockRouter]
      }
    })

    await mockRouter.push('/stage-2')
    await wrapper.vm.$nextTick()

    expect(mockStore._actions.set_cmp_flags).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        name: 'BasicNavStages',
        flags: expect.objectContaining({ currentStage: 1 })
      })
    )
  })
})
```

**Task 3: Composable tests**

```typescript
// src/__tests__/composables/useNavStages.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import { useNavStages } from '@/composables/useNavStages'

describe('useNavStages', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: {
        vxg: {
          cmp: {
            BasicNavStages: {
              currentStage: 0,
              stages: [
                { id: 0, label: 'Stage 1' },
                { id: 1, label: 'Stage 2' },
                { id: 2, label: 'Stage 3' }
              ],
              completedStages: [0],
              history: []
            }
          }
        }
      },
      actions: {
        set_cmp_flags: vi.fn()
      }
    })
  })

  it('returns current stage', () => {
    const { currentStage } = useNavStages()
    expect(currentStage.value).toBe(0)
  })

  it('navigates to stage', () => {
    const { goToStage } = useNavStages()
    goToStage(1)

    expect(store._actions.set_cmp_flags).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        name: 'BasicNavStages',
        flags: expect.objectContaining({ currentStage: 1 })
      })
    )
  })

  it('completes stage', () => {
    const { completeStage } = useNavStages()
    completeStage(1)

    expect(store._actions.set_cmp_flags).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        name: 'BasicNavStages',
        flags: expect.objectContaining({
          completedStages: [0, 1]
        })
      })
    )
  })

  it('calculates progress', () => {
    const { progress } = useNavStages()
    expect(progress.value).toBe(33) // 1 of 3 stages completed
  })

  it('checks stage access with skip allowed', () => {
    const { canAccessStage } = useNavStages()
    expect(canAccessStage(2, true)).toBe(true)
  })

  it('checks stage access without skip', () => {
    const { canAccessStage } = useNavStages()
    expect(canAccessStage(1, false)).toBe(true)  // 0 is completed
    expect(canAccessStage(2, false)).toBe(false) // 1 is not completed
  })
})
```

### Acceptance Criteria

- [ ] Split into logical sub-components (NavStageItem, NavStagesExpansion, NavStagesProgress)
- [ ] All sub-components use Composition API with TypeScript
- [ ] Routing logic extracted to `useStageRouting` composable
- [ ] Stage logic extracted to `useNavStages` composable
- [ ] Route changes sync with stages
- [ ] Stage progression logic working
- [ ] Tests achieve >80% coverage
- [ ] Unit tests for all sub-components
- [ ] Integration tests for full component
- [ ] Composable tests
- [ ] No visual regressions
- [ ] Performance maintained or improved
- [ ] Vuetify 3 syntax used

### Deliverables

1. **Main Component**:
   - `packages/model-vue/src/components/BasicNavStages.vue`

2. **Sub-Components**:
   - `packages/model-vue/src/components/NavStagesExpansion.vue`
   - `packages/model-vue/src/components/NavStageItem.vue`
   - `packages/model-vue/src/components/NavStagesProgress.vue`

3. **Composables**:
   - `packages/model-vue/src/composables/useNavStages.ts`
   - `packages/model-vue/src/composables/useStageRouting.ts`

4. **Tests**:
   - `packages/model-vue/src/__tests__/BasicNavStages.spec.ts`
   - `packages/model-vue/src/__tests__/NavStageItem.spec.ts`
   - `packages/model-vue/src/__tests__/NavStagesExpansion.spec.ts`
   - `packages/model-vue/src/__tests__/composables/useNavStages.spec.ts`
   - `packages/model-vue/src/__tests__/composables/useStageRouting.spec.ts`

5. **Documentation**:
   - `.cursor/COMPLEX-COMPONENT-SPLITTING.md` (splitting strategy guide)
   - Migration notes in component comments

### Dependencies
- 🔗 **Requires**: Week 1 infrastructure complete
- 🔗 **Requires**: Task 2.1, 2.2 for pattern reference

### Risks & Mitigations
- ⚠️ **Risk**: Route sync complexity
  - **Mitigation**: Comprehensive routing tests, clear composable separation
- ⚠️ **Risk**: State management across sub-components
  - **Mitigation**: Use composables for shared state
- ⚠️ **Risk**: Breaking stage progression logic
  - **Mitigation**: Extensive integration testing

---

## Task 2.4: Complex Component 2 - BasicHead

**Assigned To**: fullstack-coder  
**Duration**: 10-12 days (Feb 24 - Mar 10)  
**Branch**: `feature/week2-basichead-complex`  
**Priority**: 🔴 CRITICAL (largest component, most complex)

### Description
Migrate BasicHead (~1100+ lines), the header/toolbar component with search, actions, notifications, and user menu. Requires splitting into 4+ sub-components and extracting search composables.

### Current Structure (Vue 2)
- App header with toolbar, search, actions, user menu
- Props: `title`, `actions`, `searchEnabled`, `user`
- Data: `searchQuery`, `searchResults`, `notifications`, `showUserMenu`
- Computed: `filteredActions`, `allowedActions`, `unreadCount`
- Methods: `handleSearch`, `handleAction`, `handleNotification`, `handleUserAction`
- MiniSearch integration (full-text search)
- Vuex integration (actions, permissions, user state)
- Router integration

**Complexity Factors**:
- 1100+ lines (largest component)
- MiniSearch integration
- Complex action system
- Permission-based rendering
- Notification system
- Search with autocomplete
- User menu with dropdown

### Phase 1: Analysis & Planning (Day 1-2)

**Tasks**:
1. **Analyze 1100+ lines**
   - Map all features
   - Identify sub-components
   - Document MiniSearch usage
   - Document action system
   - Document permission system

2. **Create component architecture**
   ```
   BasicHead.vue (main orchestrator - ~200 lines)
   ├── HeadToolbar.vue (action buttons - ~150 lines)
   ├── HeadSearch.vue (search/combobox - ~250 lines)
   ├── HeadUser.vue (user menu - ~150 lines)
   ├── HeadNotifications.vue (notifications - ~200 lines)
   └── composables/
       ├── useHeadSearch.ts (MiniSearch integration)
       ├── useHeadActions.ts (action handling)
       ├── useHeadPermissions.ts (permission checks)
       └── useHeadNotifications.ts (notification state)
   ```

3. **Plan MiniSearch migration**
   - Keep MiniSearch as-is (works in Vue 3)
   - Extract to composable
   - Add TypeScript types

### Phase 2: Component Splitting (Day 3-5)

**Task 1: Extract HeadSearch.vue**

```vue
<template>
  <v-combobox
    v-model="selectedResult"
    :model-value="searchQuery"
    :items="searchResults"
    :loading="isSearching"
    :placeholder="placeholder"
    item-title="name"
    item-value="id"
    clearable
    hide-details
    density="compact"
    @update:model-value="handleSearchInput"
    @update:search="handleSearchQuery"
  >
    <template #item="{ props: itemProps, item }">
      <v-list-item
        v-bind="itemProps"
        :prepend-icon="item.raw.icon"
      >
        <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.raw.type }}</v-list-item-subtitle>
      </v-list-item>
    </template>
  </v-combobox>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useHeadSearch } from '@/composables/useHeadSearch'

interface SearchResult {
  id: string
  name: string
  type: string
  icon: string
  route?: string
}

interface Props {
  placeholder?: string
  minSearchLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  minSearchLength: 2
})

const emit = defineEmits<{
  select: [result: SearchResult]
  search: [query: string]
}>()

const router = useRouter()
const {
  searchQuery,
  searchResults,
  isSearching,
  handleSearch,
  clearSearch
} = useHeadSearch()

const selectedResult = ref<SearchResult | null>(null)

const handleSearchInput = (value: SearchResult | null) => {
  if (value && typeof value === 'object') {
    selectedResult.value = value
    emit('select', value)
    
    if (value.route) {
      router.push(value.route)
    }
    
    clearSearch()
  }
}

const handleSearchQuery = (query: string) => {
  if (query.length >= props.minSearchLength) {
    handleSearch(query)
    emit('search', query)
  } else {
    clearSearch()
  }
}
</script>
```

**Task 2: Extract HeadToolbar.vue**

```vue
<template>
  <div class="head-toolbar">
    <v-btn
      v-for="action in visibleActions"
      :key="action.name"
      :icon="action.icon"
      :color="action.color"
      :disabled="!canPerformAction(action.name)"
      :loading="isActionLoading(action.name)"
      @click="handleActionClick(action)"
    >
      <v-icon :icon="action.icon"></v-icon>
      <v-tooltip
        activator="parent"
        location="bottom"
      >
        {{ action.label }}
      </v-tooltip>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useHeadActions } from '@/composables/useHeadActions'
import { useHeadPermissions } from '@/composables/useHeadPermissions'

interface Action {
  name: string
  label: string
  icon: string
  color?: string
  type: 'navigate' | 'dispatch' | 'emit'
  route?: string
  event?: string
  payload?: any
}

interface Props {
  actions?: Action[]
}

const props = withDefaults(defineProps<Props>(), {
  actions: () => []
})

const emit = defineEmits<{
  actionClick: [action: Action]
  actionComplete: [action: Action]
  actionError: [action: Action, error: Error]
}>()

const {
  visibleActions,
  handleAction,
  isActionLoading
} = useHeadActions(props.actions)

const { canPerformAction } = useHeadPermissions()

const handleActionClick = (action: Action) => {
  emit('actionClick', action)
  
  handleAction(action)
    .then(() => {
      emit('actionComplete', action)
    })
    .catch((error) => {
      emit('actionError', action, error)
    })
}
</script>
```

**Task 3: Extract HeadUser.vue**

```vue
<template>
  <v-menu>
    <template #activator="{ props: menuProps }">
      <v-btn v-bind="menuProps" icon>
        <v-avatar :size="32">
          <v-img v-if="user?.avatar" :src="user.avatar" />
          <v-icon v-else icon="mdi-account"></v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title>{{ user?.name || 'Guest' }}</v-list-item-title>
        <v-list-item-subtitle>{{ user?.email }}</v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="menuItem in menuItems"
        :key="menuItem.id"
        @click="handleMenuItem(menuItem)"
      >
        <template #prepend>
          <v-icon :icon="menuItem.icon"></v-icon>
        </template>
        <v-list-item-title>{{ menuItem.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface MenuItem {
  id: string
  label: string
  icon: string
  route?: string
  action?: () => void
}

interface Props {
  user?: User | null
  menuItems?: MenuItem[]
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
  menuItems: () => [
    { id: 'profile', label: 'Profile', icon: 'mdi-account', route: '/profile' },
    { id: 'settings', label: 'Settings', icon: 'mdi-cog', route: '/settings' },
    { id: 'logout', label: 'Logout', icon: 'mdi-logout', action: 'logout' }
  ]
})

const emit = defineEmits<{
  menuItemClick: [item: MenuItem]
}>()

const router = useRouter()
const { logout } = useAuth()

const handleMenuItem = (item: MenuItem) => {
  emit('menuItemClick', item)
  
  if (item.route) {
    router.push(item.route)
  } else if (item.action === 'logout') {
    logout()
  }
}
</script>
```

**Task 4: Extract HeadNotifications.vue**

```vue
<template>
  <v-menu :close-on-content-click="false" max-width="400">
    <template #activator="{ props: menuProps }">
      <v-btn v-bind="menuProps" icon>
        <v-badge
          v-if="unreadCount > 0"
          :content="unreadCount"
          color="error"
        >
          <v-icon icon="mdi-bell"></v-icon>
        </v-badge>
        <v-icon v-else icon="mdi-bell"></v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Notifications</span>
        <v-btn
          v-if="unreadCount > 0"
          size="small"
          variant="text"
          @click="markAllAsRead"
        >
          Mark all as read
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-list>
        <template v-if="notifications.length > 0">
          <v-list-item
            v-for="notification in notifications"
            :key="notification.id"
            :class="{ 'bg-grey-lighten-3': !notification.read }"
            @click="handleNotificationClick(notification)"
          >
            <template #prepend>
              <v-icon :icon="notification.icon" :color="notification.color"></v-icon>
            </template>
            <v-list-item-title>{{ notification.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ notification.message }}</v-list-item-subtitle>
            <template #append>
              <v-btn
                icon
                size="small"
                variant="text"
                @click.stop="dismissNotification(notification.id)"
              >
                <v-icon icon="mdi-close"></v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </template>
        <v-list-item v-else>
          <v-list-item-title class="text-center text-grey">
            No notifications
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useHeadNotifications } from '@/composables/useHeadNotifications'

interface Notification {
  id: string
  title: string
  message: string
  icon: string
  color?: string
  read: boolean
  timestamp: Date
  link?: string
}

const emit = defineEmits<{
  notificationClick: [notification: Notification]
  notificationDismiss: [id: string]
}>()

const {
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
  dismiss
} = useHeadNotifications()

const handleNotificationClick = (notification: Notification) => {
  if (!notification.read) {
    markAsRead(notification.id)
  }
  emit('notificationClick', notification)
}

const dismissNotification = (id: string) => {
  dismiss(id)
  emit('notificationDismiss', id)
}
</script>
```

**Task 5: Create main BasicHead.vue**

```vue
<template>
  <v-app-bar app>
    <v-app-bar-title>{{ title }}</v-app-bar-title>

    <template #append>
      <HeadSearch
        v-if="searchEnabled"
        :placeholder="searchPlaceholder"
        @select="handleSearchSelect"
        @search="handleSearchQuery"
      />

      <HeadToolbar
        :actions="actions"
        @action-click="handleActionClick"
        @action-complete="handleActionComplete"
        @action-error="handleActionError"
      />

      <HeadNotifications
        @notification-click="handleNotificationClick"
        @notification-dismiss="handleNotificationDismiss"
      />

      <HeadUser
        :user="user"
        :menu-items="userMenuItems"
        @menu-item-click="handleUserMenuClick"
      />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import HeadSearch from './HeadSearch.vue'
import HeadToolbar from './HeadToolbar.vue'
import HeadNotifications from './HeadNotifications.vue'
import HeadUser from './HeadUser.vue'
import type { Action, SearchResult, Notification, User, MenuItem } from '@/types'

interface Props {
  title?: string
  searchEnabled?: boolean
  searchPlaceholder?: string
  actions?: Action[]
  user?: User | null
  userMenuItems?: MenuItem[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'PlantQuest',
  searchEnabled: true,
  searchPlaceholder: 'Search...',
  actions: () => [],
  user: null,
  userMenuItems: () => []
})

const emit = defineEmits<{
  searchSelect: [result: SearchResult]
  searchQuery: [query: string]
  actionClick: [action: Action]
  actionComplete: [action: Action]
  actionError: [action: Action, error: Error]
  notificationClick: [notification: Notification]
  notificationDismiss: [id: string]
  userMenuClick: [item: MenuItem]
}>()

const handleSearchSelect = (result: SearchResult) => {
  emit('searchSelect', result)
}

const handleSearchQuery = (query: string) => {
  emit('searchQuery', query)
}

const handleActionClick = (action: Action) => {
  emit('actionClick', action)
}

const handleActionComplete = (action: Action) => {
  emit('actionComplete', action)
}

const handleActionError = (action: Action, error: Error) => {
  emit('actionError', action, error)
}

const handleNotificationClick = (notification: Notification) => {
  emit('notificationClick', notification)
}

const handleNotificationDismiss = (id: string) => {
  emit('notificationDismiss', id)
}

const handleUserMenuClick = (item: MenuItem) => {
  emit('userMenuClick', item)
}
</script>
```

### Phase 3: Composables (Day 6-8)

**Task 1: Create useHeadSearch composable with MiniSearch**

```typescript
// src/composables/useHeadSearch.ts
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import MiniSearch from 'minisearch'

interface SearchDocument {
  id: string
  name: string
  type: string
  icon: string
  route?: string
  tags?: string[]
}

export function useHeadSearch() {
  const store = useStore()
  
  const searchQuery = ref('')
  const searchResults = ref<SearchDocument[]>([])
  const isSearching = ref(false)

  // Initialize MiniSearch
  const miniSearch = new MiniSearch<SearchDocument>({
    fields: ['name', 'type', 'tags'],
    storeFields: ['id', 'name', 'type', 'icon', 'route'],
    searchOptions: {
      boost: { name: 2 },
      fuzzy: 0.2,
      prefix: true
    }
  })

  // Get searchable items from store
  const searchableItems = computed(() => 
    store.state.vxg?.cmp?.BasicHead?.searchableItems || []
  )

  // Index items
  const indexItems = (items: SearchDocument[]) => {
    miniSearch.removeAll()
    miniSearch.addAll(items)
  }

  // Perform search
  const handleSearch = (query: string) => {
    searchQuery.value = query

    if (!query || query.length < 2) {
      searchResults.value = []
      return
    }

    isSearching.value = true

    try {
      const results = miniSearch.search(query, {
        boost: { name: 2 },
        fuzzy: 0.2
      })

      searchResults.value = results.map(result => ({
        id: result.id,
        name: result.name,
        type: result.type,
        icon: result.icon,
        route: result.route,
        score: result.score
      }))
    } catch (error) {
      console.error('Search error:', error)
      searchResults.value = []
    } finally {
      isSearching.value = false
    }
  }

  const clearSearch = () => {
    searchQuery.value = ''
    searchResults.value = []
  }

  // Auto-index when items change
  watch(searchableItems, (items) => {
    indexItems(items)
  }, { immediate: true })

  return {
    searchQuery,
    searchResults,
    isSearching,
    handleSearch,
    clearSearch,
    indexItems
  }
}
```

**Task 2: Create useHeadActions composable**

```typescript
// src/composables/useHeadActions.ts
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

interface Action {
  name: string
  label: string
  icon: string
  color?: string
  type: 'navigate' | 'dispatch' | 'emit'
  route?: string
  event?: string
  payload?: any
}

export function useHeadActions(actions: Action[]) {
  const store = useStore()
  const router = useRouter()
  
  const loadingActions = ref<Set<string>>(new Set())

  const visibleActions = computed(() => {
    return actions.filter(action => {
      const allowed = store.state.vxg?.cmp?.BasicHead?.allow?.[action.name]
      return allowed !== false
    })
  })

  const isActionLoading = (actionName: string) => {
    return loadingActions.value.has(actionName)
  }

  const handleAction = (action: Action): Promise<void> => {
    loadingActions.value.add(action.name)

    return new Promise((resolve, reject) => {
      try {
        switch (action.type) {
          case 'navigate':
            if (action.route) {
              router.push(action.route)
                .then(() => resolve())
                .catch(reject)
            } else {
              resolve()
            }
            break

          case 'dispatch':
            if (action.event) {
              store.dispatch(action.event, action.payload)
                .then(() => resolve())
                .catch(reject)
            } else {
              resolve()
            }
            break

          case 'emit':
            // Handled by component
            resolve()
            break

          default:
            resolve()
        }
      } catch (error) {
        reject(error)
      } finally {
        setTimeout(() => {
          loadingActions.value.delete(action.name)
        }, 500)
      }
    })
  }

  return {
    visibleActions,
    isActionLoading,
    handleAction
  }
}
```

**Task 3: Create useHeadPermissions composable**

```typescript
// src/composables/useHeadPermissions.ts
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useHeadPermissions() {
  const store = useStore()

  const permissions = computed(() => 
    store.state.vxg?.cmp?.BasicHead?.allow || {}
  )

  const canPerformAction = (actionName: string): boolean => {
    return permissions.value[actionName] !== false
  }

  const hasAnyPermission = (actionNames: string[]): boolean => {
    return actionNames.some(name => canPerformAction(name))
  }

  const hasAllPermissions = (actionNames: string[]): boolean => {
    return actionNames.every(name => canPerformAction(name))
  }

  return {
    permissions,
    canPerformAction,
    hasAnyPermission,
    hasAllPermissions
  }
}
```

**Task 4: Create useHeadNotifications composable**

```typescript
// src/composables/useHeadNotifications.ts
import { computed } from 'vue'
import { useStore } from 'vuex'

interface Notification {
  id: string
  title: string
  message: string
  icon: string
  color?: string
  read: boolean
  timestamp: Date
  link?: string
}

export function useHeadNotifications() {
  const store = useStore()

  const notifications = computed<Notification[]>(() => 
    store.state.vxg?.cmp?.BasicHead?.notifications || []
  )

  const unreadCount = computed(() => 
    notifications.value.filter(n => !n.read).length
  )

  const markAsRead = (notificationId: string) => {
    const updated = notifications.value.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    )
    
    store.dispatch('set_cmp_flags', {
      name: 'BasicHead',
      flags: { notifications: updated }
    })
  }

  const markAllAsRead = () => {
    const updated = notifications.value.map(n => ({ ...n, read: true }))
    
    store.dispatch('set_cmp_flags', {
      name: 'BasicHead',
      flags: { notifications: updated }
    })
  }

  const dismiss = (notificationId: string) => {
    const updated = notifications.value.filter(n => n.id !== notificationId)
    
    store.dispatch('set_cmp_flags', {
      name: 'BasicHead',
      flags: { notifications: updated }
    })
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismiss
  }
}
```

### Phase 4: Testing (Day 9-12)

**Task 1: Unit tests for all sub-components** (similar structure to NavStages tests)

**Task 2: Integration tests**

```typescript
// src/__tests__/BasicHead.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import BasicHead from '@/components/BasicHead.vue'

describe('BasicHead', () => {
  // Comprehensive integration tests
  // Test search functionality
  // Test action handling
  // Test notifications
  // Test user menu
  // Test permissions
})
```

**Task 3: MiniSearch tests**

```typescript
// src/__tests__/composables/useHeadSearch.spec.ts
import { describe, it, expect } from 'vitest'
import { useHeadSearch } from '@/composables/useHeadSearch'

describe('useHeadSearch', () => {
  it('indexes search documents', () => {
    const { indexItems, handleSearch, searchResults } = useHeadSearch()
    
    indexItems([
      { id: '1', name: 'Test Item', type: 'asset', icon: 'mdi-test' }
    ])
    
    handleSearch('test')
    
    expect(searchResults.value.length).toBeGreaterThan(0)
    expect(searchResults.value[0].name).toBe('Test Item')
  })

  it('performs fuzzy search', () => {
    const { indexItems, handleSearch, searchResults } = useHeadSearch()
    
    indexItems([
      { id: '1', name: 'Equipment', type: 'asset', icon: 'mdi-test' }
    ])
    
    handleSearch('equip') // Partial match
    
    expect(searchResults.value.length).toBeGreaterThan(0)
  })
})
```

**Task 4: Performance tests**

```typescript
// src/__tests__/BasicHead.performance.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasicHead from '@/components/BasicHead.vue'

describe('BasicHead Performance', () => {
  it('search completes in <100ms', () => {
    const wrapper = mount(BasicHead, {
      props: { searchEnabled: true }
    })

    const start = performance.now()
    wrapper.vm.handleSearch('test query')
    const end = performance.now()

    expect(end - start).toBeLessThan(100)
  })

  it('handles 1000+ search documents', () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({
      id: `item-${i}`,
      name: `Item ${i}`,
      type: 'asset',
      icon: 'mdi-test'
    }))

    const wrapper = mount(BasicHead, {
      props: { searchEnabled: true }
    })

    wrapper.vm.indexItems(items)
    wrapper.vm.handleSearch('item')

    expect(wrapper.vm.searchResults.value.length).toBeGreaterThan(0)
  })
})
```

### Acceptance Criteria

- [ ] Split into 4+ logical sub-components
- [ ] All sub-components use Composition API with TypeScript
- [ ] Search logic fully functional (MiniSearch integration)
- [ ] Action system working correctly
- [ ] Permissions system intact
- [ ] Notification system working
- [ ] User menu working
- [ ] Tests achieve >80% coverage
- [ ] Search performance maintained (<100ms)
- [ ] No visual regressions
- [ ] All actions working
- [ ] Vuetify 3 syntax used

### Deliverables

1. **Main Component**:
   - `packages/model-vue/src/components/BasicHead.vue`

2. **Sub-Components**:
   - `packages/model-vue/src/components/HeadToolbar.vue`
   - `packages/model-vue/src/components/HeadSearch.vue`
   - `packages/model-vue/src/components/HeadUser.vue`
   - `packages/model-vue/src/components/HeadNotifications.vue`

3. **Composables**:
   - `packages/model-vue/src/composables/useHeadSearch.ts`
   - `packages/model-vue/src/composables/useHeadActions.ts`
   - `packages/model-vue/src/composables/useHeadPermissions.ts`
   - `packages/model-vue/src/composables/useHeadNotifications.ts`

4. **Tests**:
   - `packages/model-vue/src/__tests__/BasicHead.spec.ts`
   - `packages/model-vue/src/__tests__/HeadToolbar.spec.ts`
   - `packages/model-vue/src/__tests__/HeadSearch.spec.ts`
   - `packages/model-vue/src/__tests__/HeadUser.spec.ts`
   - `packages/model-vue/src/__tests__/HeadNotifications.spec.ts`
   - `packages/model-vue/src/__tests__/composables/useHeadSearch.spec.ts`
   - `packages/model-vue/src/__tests__/composables/useHeadActions.spec.ts`
   - `packages/model-vue/src/__tests__/composables/useHeadPermissions.spec.ts`
   - `packages/model-vue/src/__tests__/composables/useHeadNotifications.spec.ts`
   - `packages/model-vue/src/__tests__/BasicHead.performance.spec.ts`

5. **Documentation**:
   - `.cursor/SEARCH-INTEGRATION.md` (MiniSearch integration guide)
   - Migration notes in component comments

### Dependencies
- 🔗 **Requires**: Week 1 infrastructure complete
- 🔗 **Requires**: Task 2.1, 2.2, 2.3 for pattern reference

### Risks & Mitigations
- ⚠️ **Risk**: MiniSearch complexity
  - **Mitigation**: Isolate in composable, extensive testing
- ⚠️ **Risk**: Performance degradation with large search index
  - **Mitigation**: Performance benchmarks, optimization
- ⚠️ **Risk**: Action system complexity
  - **Mitigation**: Clear action types, comprehensive tests
- ⚠️ **Risk**: 1100+ lines is a lot to split
  - **Mitigation**: Phased approach, clear sub-component boundaries

---

## Week 2-3 Integration & Review

### Daily Schedule

**Daily Review Cycle** (Junior Developer):
- **9:00-10:30 AM**: Review previous day's commits from all 4 agents
- **10:30-12:00 PM**: Testing - run all component tests, check coverage
- **12:00-1:00 PM**: Merge approved changes, resolve conflicts
- **2:00-4:00 PM**: Integration testing, visual validation
- **4:00-5:00 PM**: Update documentation, report to CTO

**CTO Review Schedule**:
- **Week 2, Monday**: Review simple components (2 hours)
- **Week 2, Wednesday**: Review medium components (3 hours)
- **Week 2, Friday**: Review BasicNavStages splitting strategy (3 hours)
- **Week 3, Monday**: Review BasicHead splitting strategy (3 hours)
- **Week 3, Wednesday**: Deep dive on complex components (4 hours)
- **Week 3, Thursday**: Approve all Week 2-3 work (3 hours)
- **Week 3, Friday**: Plan Week 4 ecosystem work (2 hours)

### End of Week 2 Checkpoint (Friday, Feb 28)

**Test Checklist**:
1. [ ] All simple components migrated and tested (Agent 1)
2. [ ] All medium components migrated and tested (Agent 2)
3. [ ] BasicNavStages split complete (Agent 3)
4. [ ] BasicHead 50% split (Agent 4)
5. [ ] All composables extracted
6. [ ] Test coverage >80% for completed components
7. [ ] Integration tests passing
8. [ ] No TypeScript errors
9. [ ] Documentation updated

### End of Week 3 Checkpoint (Friday, Mar 7)

**Final Test Checklist**:
1. [ ] All 9 components migrated to Vue 3
2. [ ] All components use Composition API with TypeScript
3. [ ] All composables tested
4. [ ] Test coverage >80% across all components
5. [ ] Vuetify 3 syntax updated everywhere
6. [ ] Integration tests passing
7. [ ] Performance benchmarks meet targets
8. [ ] Visual regression tests pass
9. [ ] Documentation complete
10. [ ] Ready for Week 4 ecosystem work

### Integration Testing

**Test Scenarios**:
1. **Component Interaction**:
   - BasicHead actions trigger BasicSide
   - BasicNavStages navigation triggers router
   - BasicAuth redirects work

2. **State Management**:
   - All components read from Vuex correctly
   - All components update Vuex correctly
   - No state corruption

3. **Router Integration**:
   - All route changes work
   - Navigation guards work
   - Route params passed correctly

4. **Visual Regression**:
   - All components look the same
   - Responsive behavior intact
   - Dark mode support (if applicable)

### Success Criteria (Week 2-3 Complete)

- ✅ All 9 components migrated
- ✅ All components use Composition API
- ✅ All composables extracted and tested
- ✅ Test coverage >80%
- ✅ All tests passing
- ✅ No TypeScript errors
- ✅ No visual regressions
- ✅ Performance maintained or improved
- ✅ Integration tests passing
- ✅ Documentation complete
- ✅ CTO approval received
- ✅ Ready for Week 4

---

## Next Steps (Week 4-5)

Once Week 2-3 completes successfully:

### Week 4-5 Tasks
1. **Vuetify 3 Migration** (Agent 1)
   - Update all Vuetify 2 syntax
   - Visual regression testing
   - Color system updates

2. **Day.js Migration & Tree-Shaking** (Agent 2)
   - Replace Moment.js with Day.js
   - Setup tree-shakeable exports
   - Bundle size optimization

3. **Integration Testing** (Agent 3)
   - Vuex 4 adapter tests
   - Pinia adapter tests
   - Cross-component tests

4. **Build & Documentation** (Agent 4)
   - Verify all build outputs
   - Write migration guide
   - Prepare alpha release

---

**Prepared By**: Team Lead  
**Date**: February 9, 2026  
**Status**: Ready for Agent Assignment  
**Related**: VUE3-MIGRATION-TASK-SPEC.md, WEEK-1-TASK-ASSIGNMENTS.md, DEC-000018, SPEC-000002

---

## Summary

Week 2-3 is the most critical phase of the migration. All 9 components are migrated in parallel by 4 agents:

- **Agent 1**: 3 simple components (5-7 days)
- **Agent 2**: 3 medium components (7-9 days)
- **Agent 3**: BasicNavStages complex component (7-10 days)
- **Agent 4**: BasicHead complex component (10-12 days)

**Total Components**: 9  
**Total Lines**: ~2,372 lines  
**Duration**: 10 days  
**Team**: 4 AI agents + Junior Developer (20 hrs/week) + CTO (8 hrs/week)

All components will use Vue 3 Composition API with TypeScript, with >80% test coverage, and will be ready for the ecosystem migration in Week 4-5.
