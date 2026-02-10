# Sample Data Patterns - Quick Reference

**Purpose**: Quick reference for sample data structures used in the Vue 3 demo app  
**Date**: February 10, 2026

---

## 🎯 Component Sample Data

### BasicLed

```javascript
// Status values
const ledStatuses = ['on', 'off', 'warning', 'error']

// Usage
<BasicLed status="on" />      // Green
<BasicLed status="off" />     // Grey  
<BasicLed status="warning" /> // Orange
<BasicLed status="error" />   // Red
```

### BasicFoot

```javascript
// Footer configuration
const footerConfig = {
  links: [
    { id: 'home', label: 'Home', route: '/' },
    { id: 'docs', label: 'Documentation', route: '/docs' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/plantquest/model-vue-2' }
  ],
  version: '1.0.0-alpha.1',
  copyright: '© 2026 PlantQuest Demo'
}
```

### BasicFieldPick

```javascript
// Field options
const sampleFields = [
  { id: 'name', name: 'Name', type: 'text' },
  { id: 'email', name: 'Email', type: 'email' },
  { id: 'phone', name: 'Phone', type: 'tel' },
  { id: 'age', name: 'Age', type: 'number' },
  { id: 'address', name: 'Address', type: 'text' },
  { id: 'city', name: 'City', type: 'text' },
  { id: 'zipcode', name: 'Zip Code', type: 'text' },
  { id: 'country', name: 'Country', type: 'text' }
]
```

---

## 🗺️ Navigation Sample Data

### BasicNavStages - Simple Route

```javascript
// 2-level navigation
const simpleRoute = {
  pathDetails: {
    path: [
      { 
        map: 1, 
        custom02: 'Level 1',
        x: 100,
        y: 200
      },
      { 
        map: 2, 
        custom02: 'Level 2',
        x: 150,
        y: 250
      }
    ]
  }
}

// Dispatch to store
store.dispatch('set_path_data', simpleRoute)
```

### BasicNavStages - Complex Route (with connectors)

```javascript
// 3-level navigation with stairs
const complexRoute = {
  pathDetails: {
    path: [
      { 
        map: 1, 
        custom02: 'Level 1 - Start',
        x: 100,
        y: 200
      },
      { 
        connector: 'stairs',
        from: 1,
        to: 2,
        custom02: 'Take stairs to Level 2'
      },
      { 
        map: 2, 
        custom02: 'Level 2 - Intermediate',
        x: 150,
        y: 250
      },
      { 
        connector: 'stairs',
        from: 2,
        to: 3,
        custom02: 'Take stairs to Level 3'
      },
      { 
        map: 3, 
        custom02: 'Level 3 - Destination',
        x: 200,
        y: 300
      }
    ]
  }
}
```

### BasicNavStages - Multi-Connector Route

```javascript
// Multiple connector types
const multiConnectorRoute = {
  pathDetails: {
    path: [
      { map: 1, custom02: 'Basement', x: 50, y: 100 },
      { connector: 'stairs', from: 1, to: 2, custom02: 'Stairs A to Ground' },
      { map: 2, custom02: 'Ground Floor', x: 100, y: 200 },
      { connector: 'elevator', from: 2, to: 3, custom02: 'Elevator B' },
      { map: 3, custom02: 'First Floor', x: 150, y: 250 },
      { connector: 'stairs', from: 3, to: 4, custom02: 'Stairs C' },
      { map: 4, custom02: 'Second Floor', x: 200, y: 300 }
    ]
  }
}
```

### BasicNavStages - Real-World Building Route

```javascript
// Realistic building navigation
const buildingRoute = {
  pathDetails: {
    path: [
      { 
        map: 1, 
        custom02: 'Building A - Lobby',
        tag: 'BLDG-A-LOBBY',
        x: 100,
        y: 200
      },
      { 
        connector: 'stairs',
        from: 1,
        to: 2,
        custom02: 'Take East Stairwell to Floor 2',
        tag: 'STAIRS-EAST-1-2'
      },
      { 
        map: 2, 
        custom02: 'Building A - Floor 2',
        tag: 'BLDG-A-FL2',
        x: 150,
        y: 250
      },
      { 
        connector: 'bridge',
        from: 2,
        to: 3,
        custom02: 'Cross skybridge to Building B',
        tag: 'BRIDGE-AB'
      },
      { 
        map: 3, 
        custom02: 'Building B - Floor 2',
        tag: 'BLDG-B-FL2',
        x: 200,
        y: 250
      }
    ]
  }
}
```

---

## 🔍 Search & Assets Sample Data

### BasicSide - Asset List

```javascript
// Comprehensive asset list for search
const sampleAssets = [
  // Emergency & Medical
  { tag: 'ERT ROOM U01.22', custom12: 'Emergency Room - Level 1', id: 1, map: 1, x: 100, y: 200 },
  { tag: 'P1L5M02', custom12: 'Operating Room 2 - Level 5', id: 2, map: 5, x: 300, y: 400 },
  { tag: 'ICU-01', custom12: 'Intensive Care Unit 1', id: 3, map: 3, x: 200, y: 250 },
  
  // Administrative
  { tag: 'ADMIN OFFICE', custom12: 'Administrative Office', id: 4, map: 2, x: 150, y: 220 },
  { tag: 'HR DEPT', custom12: 'Human Resources Department', id: 5, map: 2, x: 180, y: 240 },
  
  // Labs & Research
  { tag: 'LAB 301', custom12: 'Laboratory 301 - Level 3', id: 6, map: 3, x: 220, y: 280 },
  { tag: 'LAB 302', custom12: 'Laboratory 302 - Level 3', id: 7, map: 3, x: 240, y: 300 },
  { tag: 'RESEARCH-A', custom12: 'Research Wing A', id: 8, map: 4, x: 280, y: 350 },
  
  // Facilities
  { tag: 'CAFETERIA', custom12: 'Staff Cafeteria - Ground Floor', id: 9, map: 1, x: 120, y: 180 },
  { tag: 'IT ROOM', custom12: 'Server Room - Basement', id: 10, map: 0, x: 80, y: 150 },
  { tag: 'MAINTENANCE', custom12: 'Maintenance Workshop', id: 11, map: 0, x: 60, y: 120 },
  
  // Meeting Spaces
  { tag: 'CONFERENCE A', custom12: 'Conference Room A - Floor 2', id: 12, map: 2, x: 160, y: 230 },
  { tag: 'CONFERENCE B', custom12: 'Conference Room B - Floor 2', id: 13, map: 2, x: 170, y: 240 },
  { tag: 'BOARDROOM', custom12: 'Executive Boardroom - Floor 5', id: 14, map: 5, x: 320, y: 420 },
  
  // Storage
  { tag: 'STORAGE B2', custom12: 'Storage B2 - Basement Level 2', id: 15, map: -1, x: 40, y: 100 },
  { tag: 'ARCHIVE', custom12: 'Document Archives', id: 16, map: 0, x: 70, y: 140 },
  
  // Equipment
  { tag: 'MRI-01', custom12: 'MRI Scanner 1 - Radiology', id: 17, map: 2, x: 190, y: 260 },
  { tag: 'CT-SCAN-02', custom12: 'CT Scanner 2 - Radiology', id: 18, map: 2, x: 200, y: 270 },
  { tag: 'XRAY-03', custom12: 'X-Ray Room 3', id: 19, map: 1, x: 140, y: 210 }
]

// Load into store
store.commit('SET_ASSETS', sampleAssets)
```

### BasicSide - Navigation Mode Data

```javascript
// Navigation mode state
const navigationState = {
  showSearch2: true,  // Enable navigation mode
  search: 'ERT ROOM U01.22',     // Start location
  search2: 'P1L5M02',            // Destination
  items: sampleAssets            // Available search items
}

// Update store
store.commit('toggleSearch2')  // Toggle navigation mode
store.dispatch('trigger_search', { 
  a: 'ERT ROOM U01.22',  // Start
  b: 'P1L5M02'           // Destination
})
```

---

## 👤 Authentication Sample Data

### useAuth Composable

```javascript
// Login credentials (demo - any values work)
const loginCredentials = {
  email: 'demo@plantquest.com',
  password: 'password123'
}

// Mock user object (returned after login)
const mockUser = {
  id: 1,
  name: 'Demo User',
  email: 'demo@plantquest.com',
  role: 'admin',
  department: 'Engineering',
  created: '2026-01-01T00:00:00Z'
}

// Auth state structure
const authState = {
  authenticated: false,
  user: null  // or mockUser object
}

// Test different user roles
const users = [
  { id: 1, name: 'Admin User', email: 'admin@plantquest.com', role: 'admin' },
  { id: 2, name: 'Regular User', email: 'user@plantquest.com', role: 'user' },
  { id: 3, name: 'Guest User', email: 'guest@plantquest.com', role: 'guest' }
]
```

---

## 🏗️ Vuex Store State Structure

### Complete Store State Template

```javascript
const store = createStore({
  state: {
    // VXG Component State
    vxg: {
      cmp: {
        BasicHead: {
          show: true,
          allow: {
            add: true,
            remove: true,
            print: true,
            bookmark: true,
            settings: false
          },
          actions: [],
          notifications: [],
          searchableItems: []
        },
        BasicSide: {
          show: true,
          content: null,
          width: 280,
          logo: '<div>PlantQuest Demo</div>',
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
      
      // Entity Data
      ent: {
        meta: {
          name: 'Vue 3 Demo',
          version: '1.0.0-alpha.1'
        },
        asset: {
          list: [/* assets array */]
        },
        menu: {
          items: {
            home: { title: 'Home', icon: 'home', code: 'home' },
            components: { title: 'Components', icon: 'view-dashboard', code: 'components' },
            stages: { title: 'Stages', icon: 'map-marker-path', code: 'stages' }
          },
          order: 'home,components,stages'
        }
      },
      
      seneca: null
    },
    
    // Authentication State
    auth: {
      authenticated: false,
      user: null
    },
    
    // Navigation State
    pathData: null,
    currentStage: 0,
    
    // Trigger State
    trigger: {
      select: { value: null },
      search: { a: '', b: '' }
    },
    
    // BasicSide Navigation Mode
    showSearch2: false,
    showExpansion: false,
    
    // Map Assets
    main_asset: [
      { map: 1, custom02: 'Level 1', x: 100, y: 200 },
      { map: 2, custom02: 'Level 2', x: 150, y: 250 },
      { map: 3, custom02: 'Level 3', x: 200, y: 300 }
    ]
  }
})
```

---

## 🎨 UI State Patterns

### Loading States

```javascript
// Component loading pattern
const componentState = {
  isLoading: false,
  hasError: false,
  errorMessage: '',
  data: null
}

// Usage
const loadData = () => {
  componentState.isLoading = true
  componentState.hasError = false
  
  fetchData()
    .then(data => {
      componentState.data = data
      componentState.isLoading = false
    })
    .catch(error => {
      componentState.hasError = true
      componentState.errorMessage = error.message
      componentState.isLoading = false
    })
}
```

### Pagination

```javascript
// Pagination state
const paginationState = {
  page: 1,
  pageSize: 20,
  total: 0,
  items: []
}

// Sample paginated data
const generatePaginatedAssets = (page, pageSize) => {
  const allAssets = [/* full asset list */]
  const start = (page - 1) * pageSize
  const end = start + pageSize
  
  return {
    items: allAssets.slice(start, end),
    page: page,
    pageSize: pageSize,
    total: allAssets.length,
    totalPages: Math.ceil(allAssets.length / pageSize)
  }
}
```

### Filtering & Sorting

```javascript
// Filter state
const filterState = {
  searchTerm: '',
  category: 'all',
  sortBy: 'name',
  sortOrder: 'asc'
}

// Filter assets
const filteredAssets = computed(() => {
  let result = [...allAssets.value]
  
  // Search
  if (filterState.searchTerm) {
    result = result.filter(asset => 
      asset.tag.toLowerCase().includes(filterState.searchTerm.toLowerCase()) ||
      asset.custom12.toLowerCase().includes(filterState.searchTerm.toLowerCase())
    )
  }
  
  // Sort
  result.sort((a, b) => {
    const order = filterState.sortOrder === 'asc' ? 1 : -1
    return a[filterState.sortBy].localeCompare(b[filterState.sortBy]) * order
  })
  
  return result
})
```

---

## 🧪 Test Data Generators

### Generate Random Assets

```javascript
const generateRandomAssets = (count = 50) => {
  const prefixes = ['RM', 'LAB', 'OFFICE', 'STORAGE', 'EQUIP']
  const types = ['Medical', 'Administrative', 'Technical', 'Storage', 'Equipment']
  const levels = ['Basement', 'Ground', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    tag: `${prefixes[i % prefixes.length]}-${String(i + 1).padStart(3, '0')}`,
    custom12: `${types[i % types.length]} - ${levels[i % levels.length]}`,
    map: (i % 6) + 1,
    x: Math.floor(Math.random() * 500) + 50,
    y: Math.floor(Math.random() * 500) + 50
  }))
}

// Usage
const assets = generateRandomAssets(100)
store.commit('SET_ASSETS', assets)
```

### Generate Random Path

```javascript
const generateRandomPath = (levels = 3) => {
  const connectorTypes = ['stairs', 'elevator', 'ramp', 'bridge']
  const path = []
  
  for (let i = 1; i <= levels; i++) {
    // Add level
    path.push({
      map: i,
      custom02: `Level ${i}`,
      x: Math.floor(Math.random() * 300) + 100,
      y: Math.floor(Math.random() * 300) + 100
    })
    
    // Add connector (except after last level)
    if (i < levels) {
      const connectorType = connectorTypes[Math.floor(Math.random() * connectorTypes.length)]
      path.push({
        connector: connectorType,
        from: i,
        to: i + 1,
        custom02: `Take ${connectorType} to Level ${i + 1}`
      })
    }
  }
  
  return { pathDetails: { path } }
}

// Usage
const randomPath = generateRandomPath(5)
store.dispatch('set_path_data', randomPath)
```

---

## 📝 Notes

### Data Consistency
- Always use the same property names as production PlantQuest
- `tag` for asset identifier
- `custom12` for description
- `map` for level/floor number
- `x`, `y` for coordinates

### Performance Tips
- Keep asset lists under 1000 items for MiniSearch performance
- Use pagination for large datasets
- Debounce search inputs (300ms)
- Lazy load navigation routes

### Debugging Tips
```javascript
// Add helpful console logs
console.log('🔍 Search term:', searchTerm)
console.log('📦 Assets loaded:', assets.length)
console.log('🗺️ Navigation mode:', isNavMode ? 'ON' : 'OFF')
console.log('✅ State updated:', JSON.stringify(newState, null, 2))
```

---

**Quick Links**:
- [Demo App Guide](.cursor/DEMO-APP-GUIDE.md)
- [Component API Docs](.cursor/COMPONENT-API-DOCS.md)
- [Migration Guide](.cursor/MIGRATION-GUIDE-V2-TO-V3.md)

**Last Updated**: February 10, 2026
