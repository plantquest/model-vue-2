# Vue 3 Demo Application - Complete Guide

**Location**: `example/vue3-demo/`  
**Purpose**: Test and showcase all Vue 3 migrated components from `@plantquest/model-vue`  
**Last Updated**: February 10, 2026

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Sample Data Structure](#sample-data-structure)
4. [Routes & Testing](#routes--testing)
5. [Component Testing Patterns](#component-testing-patterns)
6. [How to Add New Tests](#how-to-add-new-tests)
7. [Running the Demo](#running-the-demo)

---

## Overview

The demo app is a comprehensive test environment for the `@plantquest/model-vue` library. It demonstrates:

- ✅ All 9 migrated components in action
- ✅ Vue 3 Composition API patterns
- ✅ Vuex 4 store integration
- ✅ Vue Router 4 navigation
- ✅ Vuetify 3 UI components
- ✅ TypeScript type safety
- ✅ Real-world usage scenarios

---

## Architecture

### File Structure

```
example/vue3-demo/
├── src/
│   ├── main.js              # App bootstrap, store, router setup
│   ├── App.vue              # Root component with nav drawers
│   ├── router/
│   │   └── index.js         # Route definitions
│   └── views/
│       ├── HomeView.vue           # Landing page
│       ├── ComponentsView.vue     # Simple components demo
│       ├── StagesView.vue         # BasicNavStages testing
│       ├── SideView.vue           # BasicSide testing
│       ├── AuthView.vue           # useAuth composable testing
│       ├── Stage1View.vue         # Multi-stage workflow (stage 1)
│       ├── Stage2View.vue         # Multi-stage workflow (stage 2)
│       └── Stage3View.vue         # Multi-stage workflow (stage 3)
├── package.json
└── vite.config.js
```

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue | 3.4+ | Framework |
| Vuex | 4.1.0 | State management |
| Vue Router | 4.2.0 | Routing |
| Vuetify | 3.5.0 | UI components |
| Vite | 5.0+ | Build tool |
| TypeScript | 5.3+ | Type checking |

---

## Sample Data Structure

### Vuex Store State (`main.js` lines 17-100)

The demo uses a mock Vuex store that mimics PlantQuest's production state structure:

```javascript
const store = createStore({
  state: {
    // VXG state (model-vue component state)
    vxg: {
      cmp: {
        BasicHead: {
          show: true,
          allow: { add: true, remove: true, print: true, bookmark: true },
          actions: [],
          notifications: [],
          searchableItems: []
        },
        BasicSide: {
          show: true,
          content: null,
          width: 280,
          logo: '...',
          showSearch2: false,  // Navigation mode toggle
          isExpanded: false,
          items: [],
          search: '',
          search2: '',
          filterIcon: true,
          prependIcon: 'mdi-magnify'
        },
        BasicNavStages: {
          currentStage: 0,
          stages: [],
          completedStages: [],
          history: []
        }
      },
      ent: {
        meta: { name: 'Vue 3 Demo' },
        asset: {
          list: [
            { tag: 'Asset 1', custom12: 'Description 1', id: 1 },
            { tag: 'Asset 2', custom12: 'Description 2', id: 2 },
            // ... more assets
          ]
        },
        menu: {
          items: {
            home: { title: 'Home', icon: 'home', code: 'home' },
            components: { title: 'Components', icon: 'view-dashboard', code: 'components' },
            stages: { title: 'Stages', icon: 'map-marker-path', code: 'stages' }
          },
          order: 'home,components,stages'
        }
      }
    },
    
    // Auth state
    auth: {
      authenticated: false,
      user: null
    },
    
    // Navigation state
    pathData: null,
    currentStage: 0,
    trigger: {
      select: { value: null },
      search: { a: '', b: '' }
    },
    
    // BasicSide specific state
    showSearch2: false,  // Navigation mode
    showExpansion: false,
    main_asset: [
      { map: 1, custom02: 'Level 1', x: 100, y: 200 },
      { map: 2, custom02: 'Level 2', x: 150, y: 250 },
      { map: 3, custom02: 'Level 3', x: 200, y: 300 }
    ]
  }
})
```

### Key Mutations & Actions

The store includes all required mutations and actions that components expect:

**Mutations**:
- `SET_CMP_FLAGS` - Update component flags
- `SET_AUTH` - Update auth state
- `SET_ASSETS` - Update asset list
- `setCurrentStage` - Update navigation stage
- `toggleSearch2` - Toggle navigation mode
- `clear_path_data` - Clear path data
- `clearMatchingConnectorData` - Clear connector highlights

**Actions**:
- `set_cmp_flags` - Dispatch component flag updates
- `set_path_data` - Process path details (for BasicNavStages)
- `setCurrentStage` - Navigate to stage
- `vxg_get_assets` - Load assets (with MiniSearch callback support)
- `vxg_trigger_clear` - Clear filters
- `trigger_search` - Execute search
- `toggleSideInfoCardVisibility` - Toggle info card
- `auth/login` - Login user
- `auth/logout` - Logout user

---

## Routes & Testing

### Route Map

| Path | View | Purpose | Components Tested |
|------|------|---------|-------------------|
| `/` | HomeView | Landing page | Navigation overview |
| `/components` | ComponentsView | Simple components | BasicLed, BasicFoot, BasicFieldPick |
| `/stages` | StagesView | Navigation stages | BasicNavStages |
| `/side` | SideView | Side navigation | BasicSide (search & navigation modes) |
| `/auth` | AuthView | Auth composable | useAuth |
| `/stage-1` | Stage1View | Multi-stage workflow | BasicNavStages (stage 1) |
| `/stage-2` | Stage2View | Multi-stage workflow | BasicNavStages (stage 2) |
| `/stage-3` | Stage3View | Multi-stage workflow | BasicNavStages (stage 3) |

### Navigation Structure

**App.vue** provides the main navigation:
- **Left Drawer**: Standard navigation (always visible)
  - Home
  - Components
  - Stages
  - Side Navigation
  - Authentication
  
- **Right Drawer**: BasicSide component (only on `/side` route)
  - Demonstrates side navigation
  - Search and navigation modes
  - Asset searching

---

## Component Testing Patterns

### 1. Simple Components (BasicLed, BasicFoot, BasicFieldPick)

**Location**: `ComponentsView.vue`

**Pattern**:
```vue
<template>
  <v-card>
    <v-card-title>Component Name</v-card-title>
    <v-card-text>
      <!-- Demo the component with different props -->
      <BasicLed status="on" />
      <BasicLed status="off" />
      <BasicLed status="warning" />
      <BasicLed status="error" />
      
      <!-- Interactive state testing -->
      <v-btn-toggle v-model="ledStatus">
        <v-btn value="on">On</v-btn>
        <v-btn value="off">Off</v-btn>
      </v-btn-toggle>
      
      <BasicLed :status="ledStatus" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { BasicLed } from '@plantquest/model-vue'

const ledStatus = ref('on')
</script>
```

**Sample Data**:
- LED statuses: `on`, `off`, `warning`, `error`
- Footer links: Array of route/href objects
- Field picker options: Array of field objects with `id`, `name`, `type`

### 2. Complex Navigation (BasicNavStages)

**Location**: `StagesView.vue`

**Pattern**:
```vue
<template>
  <div>
    <!-- Control buttons to load sample routes -->
    <v-btn @click="loadSimpleRoute">
      Simple: Level 1 → Level 2
    </v-btn>
    <v-btn @click="loadComplexRoute">
      Complex: Level 1 → Level 2 → Level 3
    </v-btn>
    
    <!-- Mock map container -->
    <div class="mock-map-container">
      <BasicNavStages @stage-selected="handleStageSelected" />
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { BasicNavStages } from '@plantquest/model-vue'

const store = useStore()

const loadSimpleRoute = () => {
  store.dispatch('set_path_data', {
    pathDetails: {
      path: [
        { map: 1, custom02: 'Level 1' },
        { map: 2, custom02: 'Level 2' }
      ]
    }
  })
}

const loadComplexRoute = () => {
  store.dispatch('set_path_data', {
    pathDetails: {
      path: [
        { map: 1, custom02: 'Level 1', x: 100, y: 200 },
        { connector: 'stairs', from: 1, to: 2 },
        { map: 2, custom02: 'Level 2', x: 150, y: 250 },
        { connector: 'stairs', from: 2, to: 3 },
        { map: 3, custom02: 'Level 3', x: 200, y: 300 }
      ]
    }
  })
}

const handleStageSelected = (stage) => {
  console.log('Stage selected:', stage)
}
</script>
```

**Sample Data for BasicNavStages**:

```javascript
// Simple Route (2 levels)
{
  pathDetails: {
    path: [
      { map: 1, custom02: 'Level 1', x: 100, y: 200 },
      { map: 2, custom02: 'Level 2', x: 150, y: 250 }
    ]
  }
}

// Complex Route (3 levels with connectors)
{
  pathDetails: {
    path: [
      { map: 1, custom02: 'Level 1', x: 100, y: 200 },
      { connector: 'stairs', from: 1, to: 2, custom02: 'Take stairs to Level 2' },
      { map: 2, custom02: 'Level 2', x: 150, y: 250 },
      { connector: 'stairs', from: 2, to: 3, custom02: 'Take stairs to Level 3' },
      { map: 3, custom02: 'Level 3', x: 200, y: 300 }
    ]
  }
}

// Multi-Stair Route
{
  pathDetails: {
    path: [
      { map: 1, custom02: 'Basement', x: 50, y: 100 },
      { connector: 'stairs', from: 1, to: 2, custom02: 'Stairs A' },
      { map: 2, custom02: 'Ground Floor', x: 100, y: 200 },
      { connector: 'elevator', from: 2, to: 3, custom02: 'Elevator B' },
      { map: 3, custom02: 'First Floor', x: 150, y: 250 },
      { connector: 'stairs', from: 3, to: 4, custom02: 'Stairs C' },
      { map: 4, custom02: 'Second Floor', x: 200, y: 300 }
    ]
  }
}
```

### 3. Side Navigation & Search (BasicSide)

**Location**: `SideView.vue`

**Pattern**:
```vue
<template>
  <div>
    <!-- Toggle navigation mode -->
    <v-btn @click="toggleNavigationMode">
      {{ isNavigationMode ? 'Switch to Search' : 'Switch to Navigation' }}
    </v-btn>
    
    <!-- Load sample assets -->
    <v-btn @click="populateSampleAssets">
      Load Sample Assets
    </v-btn>
    
    <!-- State display -->
    <div>
      <strong>Mode:</strong> {{ isNavigationMode ? 'Navigation' : 'Search' }}
      <strong>Assets:</strong> {{ store.state.vxg.ent.asset.list.length }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isNavigationMode = computed(() => store.state.showSearch2)

const toggleNavigationMode = () => {
  store.commit('toggleSearch2')
}

const populateSampleAssets = () => {
  store.commit('SET_ASSETS', [
    { tag: 'ERT ROOM U01.22', custom12: 'Emergency Room', id: 1 },
    { tag: 'P1L5M02', custom12: 'Operating Room', id: 2 },
    { tag: 'ADMIN OFFICE', custom12: 'Administrative', id: 3 },
    // ... more assets
  ])
}
</script>
```

**Sample Data for BasicSide**:

```javascript
// Sample Assets
const sampleAssets = [
  { tag: 'ERT ROOM U01.22', custom12: 'Emergency Room - Level 1', id: 1 },
  { tag: 'P1L5M02', custom12: 'Operating Room - Level 5', id: 2 },
  { tag: 'ADMIN OFFICE', custom12: 'Administrative Office', id: 3 },
  { tag: 'LAB 301', custom12: 'Laboratory - Level 3', id: 4 },
  { tag: 'CAFETERIA', custom12: 'Staff Cafeteria - Ground Floor', id: 5 },
  { tag: 'IT ROOM', custom12: 'Server Room - Basement', id: 6 },
  { tag: 'CONFERENCE A', custom12: 'Conference Room A', id: 7 },
  { tag: 'STORAGE B2', custom12: 'Storage - Level B2', id: 8 }
]

// Component State
{
  show: true,
  showSearch2: false,  // false = Search mode, true = Navigation mode
  search: '',          // Primary search value
  search2: '',         // Destination search (navigation mode only)
  filterIcon: true,
  prependIcon: 'mdi-magnify',
  items: [],           // Populated by MiniSearch
  isExpanded: false
}
```

### 4. Composables Testing (useAuth)

**Location**: `AuthView.vue`

**Pattern**:
```vue
<template>
  <div>
    <!-- Display auth state -->
    <div>
      <p>Authenticated: {{ isAuthenticated ? 'Yes' : 'No' }}</p>
      <p>User: {{ currentUser?.name }}</p>
    </div>
    
    <!-- Login form -->
    <div v-if="!isAuthenticated">
      <v-text-field v-model="email" label="Email" />
      <v-text-field v-model="password" label="Password" type="password" />
      <v-btn @click="handleLogin">Login</v-btn>
    </div>
    
    <!-- Logout button -->
    <v-btn v-else @click="handleLogout">Logout</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useAuth } from '@plantquest/model-vue'

const store = useStore()
const { isAuthenticated, currentUser, login, logout } = useAuth(store)

const email = ref('demo@plantquest.com')
const password = ref('password123')

const handleLogin = () => {
  login({ email: email.value, password: password.value })
    .then(() => console.log('Login successful'))
    .catch(err => console.error('Login failed', err))
}

const handleLogout = () => {
  logout()
    .then(() => console.log('Logout successful'))
}
</script>
```

**Sample Data for useAuth**:

```javascript
// Login credentials (any values accepted)
{
  email: 'demo@plantquest.com',
  password: 'password123'
}

// Mock user object (returned after login)
{
  id: 1,
  name: 'Demo User',
  email: 'demo@plantquest.com'
}

// Auth state structure
{
  authenticated: false,
  user: null  // or user object
}
```

---

## How to Add New Tests

### Adding a New Component Demo

1. **Create a new view** (if needed):
   ```bash
   touch example/vue3-demo/src/views/NewComponentView.vue
   ```

2. **Add route** in `router/index.js`:
   ```javascript
   {
     path: '/new-component',
     name: 'NewComponent',
     component: () => import('../views/NewComponentView.vue')
   }
   ```

3. **Create the view template**:
   ```vue
   <template>
     <v-row>
       <v-col cols="12">
         <v-card>
           <v-card-title>Component Name Demo</v-card-title>
           <v-card-text>
             <!-- Component demo here -->
             <YourComponent 
               v-bind="componentProps"
               @event="handleEvent"
             />
             
             <!-- Controls -->
             <v-btn @click="loadSampleData">Load Sample Data</v-btn>
             
             <!-- State display -->
             <pre>{{ JSON.stringify(componentState, null, 2) }}</pre>
           </v-card-text>
         </v-card>
       </v-col>
     </v-row>
   </template>

   <script setup>
   import { ref, reactive } from 'vue'
   import { YourComponent } from '@plantquest/model-vue'
   
   const componentProps = reactive({
     // Your props
   })
   
   const componentState = ref({})
   
   const loadSampleData = () => {
     // Load sample data
   }
   
   const handleEvent = (data) => {
     console.log('Event:', data)
   }
   </script>
   ```

4. **Add navigation link** in `App.vue`:
   ```javascript
   const navItems = ref([
     // ... existing items
     { 
       code: 'new-component', 
       label: 'New Component', 
       icon: 'mdi-new-box', 
       route: '/new-component' 
     }
   ])
   ```

### Adding Sample Data

**Option 1: In Vuex Store** (`main.js`)
```javascript
const store = createStore({
  state: {
    vxg: {
      ent: {
        yourData: {
          list: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' }
          ]
        }
      }
    }
  }
})
```

**Option 2: In Component** (for local testing)
```vue
<script setup>
const sampleData = ref([
  { id: 1, name: 'Item 1', type: 'A' },
  { id: 2, name: 'Item 2', type: 'B' },
  { id: 3, name: 'Item 3', type: 'A' }
])

const loadMoreData = () => {
  sampleData.value.push({
    id: sampleData.value.length + 1,
    name: `Item ${sampleData.value.length + 1}`,
    type: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
  })
}
</script>
```

### Testing Complex Interactions

**Example: Multi-step workflow**

```vue
<template>
  <div>
    <!-- Step indicator -->
    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <v-stepper-item value="1">Step 1</v-stepper-item>
        <v-stepper-item value="2">Step 2</v-stepper-item>
        <v-stepper-item value="3">Step 3</v-stepper-item>
      </v-stepper-header>
      
      <v-stepper-window>
        <v-stepper-window-item value="1">
          <YourComponent1 @complete="currentStep = 2" />
        </v-stepper-window-item>
        
        <v-stepper-window-item value="2">
          <YourComponent2 @complete="currentStep = 3" />
        </v-stepper-window-item>
        
        <v-stepper-window-item value="3">
          <YourComponent3 @complete="handleFinish" />
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(1)

const handleFinish = () => {
  console.log('Workflow complete!')
  currentStep.value = 1 // Reset
}
</script>
```

---

## Running the Demo

### Development Mode

```bash
# From project root
cd example/vue3-demo

# Install dependencies (if not already)
pnpm install

# Start dev server
pnpm dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
cd example/vue3-demo
pnpm build

# Preview production build
pnpm preview
```

### Testing Checklist

When testing components in the demo:

1. **Visual Testing**
   - [ ] Component renders correctly
   - [ ] Responsive at different screen sizes
   - [ ] Vuetify theme colors applied
   - [ ] Icons display properly

2. **Functional Testing**
   - [ ] Props update reactively
   - [ ] Events emit correctly
   - [ ] v-model binding works
   - [ ] State changes reflected

3. **Integration Testing**
   - [ ] Vuex store integration works
   - [ ] Router navigation works
   - [ ] Component interactions work
   - [ ] Error states handled

4. **Performance Testing**
   - [ ] No console errors
   - [ ] Fast initial render
   - [ ] Smooth interactions
   - [ ] No memory leaks

---

## Common Testing Patterns

### Pattern 1: State Toggle Testing
```vue
<v-btn @click="toggleState">
  Toggle: {{ state ? 'ON' : 'OFF' }}
</v-btn>
<YourComponent :active="state" />
```

### Pattern 2: Array Data Testing
```vue
<v-btn @click="addItem">Add Item</v-btn>
<v-btn @click="removeItem">Remove Item</v-btn>
<v-btn @click="clearItems">Clear All</v-btn>

<YourComponent :items="items" />

<p>Count: {{ items.length }}</p>
```

### Pattern 3: Form Input Testing
```vue
<v-text-field v-model="inputValue" label="Test Input" />
<YourComponent :value="inputValue" @change="inputValue = $event" />
<p>Current: {{ inputValue }}</p>
```

### Pattern 4: Event Logging
```vue
<YourComponent 
  @event1="log('Event 1', $event)"
  @event2="log('Event 2', $event)"
  @event3="log('Event 3', $event)"
/>

<v-card v-if="eventLog.length">
  <v-card-title>Event Log</v-card-title>
  <v-list>
    <v-list-item v-for="(event, i) in eventLog" :key="i">
      {{ event }}
    </v-list-item>
  </v-list>
</v-card>

<script setup>
const eventLog = ref([])

const log = (eventName, data) => {
  eventLog.value.push(`${new Date().toLocaleTimeString()} - ${eventName}: ${JSON.stringify(data)}`)
}
</script>
```

---

## Tips & Best Practices

### 1. Use Mock Data That Reflects Production
Your sample data should mirror the structure used in production PlantQuest:
- Asset objects with `tag`, `custom12`, `id`, `map`, `x`, `y`
- Path data with map levels and connectors
- User objects with `id`, `name`, `email`

### 2. Test Edge Cases
Include sample data for:
- Empty states (no data)
- Single item
- Many items (100+)
- Long strings
- Special characters
- null/undefined values

### 3. Visual Feedback
Always provide visual feedback for:
- Loading states
- Success states
- Error states
- Current state values

### 4. Console Logging
Use descriptive console logs to track:
```javascript
console.log('✅ Action successful:', data)
console.log('🔍 Searching for:', searchTerm)
console.log('🗺️ Navigation mode:', enabled ? 'ON' : 'OFF')
console.log('❌ Error occurred:', error)
```

### 5. Realistic Interactions
Test real-world scenarios:
- Search with partial matches
- Navigate through multiple stages
- Toggle modes back and forth
- Load/clear data multiple times

---

## Troubleshooting

### Component Not Rendering
1. Check import: `import { Component } from '@plantquest/model-vue'`
2. Verify component is exported in `packages/model-vue/src/index.js`
3. Check console for errors
4. Verify props are correct type

### State Not Updating
1. Check Vuex mutations are defined
2. Verify store.commit/dispatch calls
3. Use Vue DevTools to inspect state
4. Check reactivity (use `ref()` or `reactive()`)

### Events Not Firing
1. Verify event name matches component emit
2. Check handler function is defined
3. Use `@event.native` if needed
4. Add console.log in handler

### Styling Issues
1. Verify Vuetify 3 component names (v-btn not v-button)
2. Check theme colors are defined
3. Use browser DevTools to inspect CSS
4. Verify `<style scoped>` if needed

---

## Next Steps

### Expanding the Demo

1. **Add Component Playground**
   - Interactive prop editor
   - Live code preview
   - Copy code button

2. **Add Performance Metrics**
   - Render time tracking
   - Memory usage display
   - Event frequency counter

3. **Add API Mocking**
   - Mock HTTP requests
   - Simulate loading delays
   - Test error scenarios

4. **Add Visual Regression Tests**
   - Screenshot comparison
   - Cross-browser testing
   - Responsive testing

---

**Last Updated**: February 10, 2026  
**Maintainer**: PlantQuest Development Team  
**Related Docs**: 
- `.cursor/MIGRATION-GUIDE-V2-TO-V3.md`
- `.cursor/COMPONENT-API-DOCS.md`
- `packages/model-vue/README.md`
