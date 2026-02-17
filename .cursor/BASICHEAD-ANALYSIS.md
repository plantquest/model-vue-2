# BasicHead Component Analysis

**Component**: BasicHead.vue  
**Current Size**: ~1100 lines (with duplication)  
**Status**: Vue 2 Options API  
**Migration Target**: Vue 3 Composition API + TypeScript  
**Date**: February 9, 2026

---

## Executive Summary

BasicHead is the **largest and most complex component** in the @plantquest/model-vue library. It serves as the application header/toolbar with search, actions, permissions, and user controls.

**Complexity Factors**:
- MiniSearch integration for full-text search
- Complex permission system (allow/deny actions)
- Multiple action types (navigate, dispatch, emit)
- Router-based search modes
- Heavy Vuex state management
- Dynamic toolbar configuration

---

## Feature Mapping

### 1. Search System (Lines 97-101, 631-649, 927-966, 968-1016)

**Current Implementation**:
```javascript
// Data
search: ''          // Search term
items: []           // All assets
tag_items: []       // Filtered/searchable items

// Methods
setupMiniSearch(items)     // Initialize MiniSearch with assets
performSearch(term)         // Execute search via Seneca
customFilter(item, query)   // Combobox filter
changeSearch(event)         // Handle search input
handleChangeSearch(event)   // Handle search selection
```

**MiniSearch Integration**:
- Uses Seneca microservice: `sys:search, cmd:add` and `sys:search, cmd:search`
- NOT direct MiniSearch (uses remote service)
- Search config from: `this.$model.main.ux.custom.search_config`
- Results mapped with `tag_alias()` function
- Supports fuzzy matching via config

**Search Modes** (Router-based):
- `headsearch` - BasicHead initiated search
- `assetsearch` - Assets page search
- `filtersearch` - Filter panel search
- `route` - Route-based search

**State Management**:
```javascript
// Store properties updated
this.$store.state.trigger.search.term   // For BasicLed data table
this.$store.state.trigger.search.a      // For BasicSide search
```

**Sub-Component**: HeadSearch.vue
- v-combobox with autocomplete
- MiniSearch integration via composable
- Router navigation on selection
- Clear search functionality

---

### 2. Toolbar Actions (Lines 52-96, 582-629)

**Action Buttons Identified**:

| Action | Icon | Method | Store Dispatch | Lines |
|--------|------|--------|----------------|-------|
| `add` | mdi-map-marker-path | `addItem()` | `trigger_led_add` | 52-62, 582-592 |
| `addmobile` | mdi-map-marker-path | `addMobileAsset()` | `trigger_led_add_mobile` | 64-74, 597-608 |
| `remove` | mdi-map-marker-path | `removeItem()` | `trigger_led_remove` | 81-91, 615-625 |
| `print` | mdi-printer | `print()` | `vxg_trigger_printMap` | 130-144, 678-692 |
| `bookmark` | mdi-bookmark-minus-outline | `showTags()` | `adjust_trigger_bookmark` | 146-157, 694-705 |
| `collect` | mdi-folder-open-outline | `collect()` | `vxg_trigger_collect` | 159-169, 707-717 |
| `expandSide` | mdi-chevron-right | `openDrawer()` | `set_cmp_flags` | 4-13, 534-543 |
| `expandMain` | mdi-chevron-left | `closeDetail()` | `set_cmp_flags` | 122-128, 670-676 |
| `avatar` | mdi-account | `action('avatar')` | emit | 107-113, 656-662 |

**Action System**:
```javascript
// Permission checks
show(action)    // Checks both allow() and state.show[action]
allow(action)   // Checks state.allow[action] (default: true)

// Action visibility logic
v-if="show('add') && tool.add.active"

// Store state structure
$store.state.vxg.cmp.BasicHead.show[action]   // Show/hide
$store.state.vxg.cmp.BasicHead.allow[action]  // Permission
```

**Tool Configuration**:
```javascript
// Tool structure (from model)
tool = {
  add: { active: true },
  remove: { active: true },
  print: { active: true, disabled: false },
  bookmark: { active: true },
  collect: { active: true },
  expandSide: { active: true },
  expandMain: { active: true },
  avatar: { active: true },
  select: { 
    active: true, 
    title: 'Select', 
    initial: '',
    items: {}
  }
}
```

**Sub-Component**: HeadToolbar.vue
- Action buttons with icons
- Permission-based visibility
- Loading states per action
- Tooltips for actions

---

### 3. Select Component (Lines 31-44, 561-574)

**Purpose**: Dropdown for view-specific selections

**Implementation**:
```javascript
// Data
select: ''  // Selected value

// Computed
tool.select.active   // Show/hide select
tool.select.title    // Label text
tool.select.initial  // Default value
tool.select.items    // Options

// Methods
selectItems()        // Convert items object to array
defaults()           // Set initial value

// Watch
select()             // Dispatch on change
$store.state.trigger.select.value  // External updates
```

**State Management**:
```javascript
this.$store.dispatch('trigger_select', {value: this.select})
```

**Inclusion**: Part of HeadToolbar.vue

---

### 4. User/Avatar Menu (Lines 107-113, 656-662)

**Current Implementation**:
```javascript
// Icon button
<v-icon @click="action('avatar')">mdi-account</v-icon>

// Method
action(name) {
  this.$emit('action', name)  // Parent handles menu
}
```

**State**:
```javascript
tool.avatar.active  // Show/hide avatar
```

**Sub-Component**: HeadUser.vue
- Avatar/icon button
- Dropdown menu (Profile, Settings, Logout)
- User info display
- Integration with useAuth composable

---

### 5. Drawer/Detail Controls (Lines 4-13, 117-128, 534-543, 665-676)

**Purpose**: Toggle side drawer and detail panel visibility

**Drawer Toggle**:
```javascript
// Show when drawer is closed
v-if="!drawerOpen && tool.expandSide.active"

// Computed
drawerOpen() {
  return this.$store.state.vxg.cmp.BasicSide.show
}

// Method
openDrawer() {
  this.$store.dispatch('set_cmp_flags', {
    name: 'BasicSide',
    flags: { show: true }
  })
}
```

**Detail Toggle**:
```javascript
// Show when detail is open
v-if="!detailOpen && tool.expandMain.active"

// Computed
detailOpen() {
  return !this.$store.state.vxg.cmp.BasicMain.show
}

// Method
closeDetail() {
  this.$store.dispatch('set_cmp_flags', {
    name: 'BasicMain',
    flags: { show: false }
  })
}
```

**Inclusion**: Part of HeadToolbar.vue

---

### 6. Permission System (Lines 503-511, 1074-1082)

**Implementation**:
```javascript
// Check if action is allowed AND should be shown
show(action) {
  return this.allow(action) && 
    this.$store.state.vxg.cmp.BasicHead.show[action]
}

// Check if action is allowed (permission)
allow(action) {
  let allowed = this.$store.state.vxg.cmp.BasicHead.allow[action]
  return null == allowed ? true : allowed  // Default: allowed
}
```

**Store State Structure**:
```javascript
$store.state.vxg.cmp.BasicHead = {
  show: {
    add: true,
    remove: true,
    print: true,
    bookmark: true,
    collect: true,
    select: true,
    clear: false,
    go: false
  },
  allow: {
    add: true,      // Can be set to false to deny
    remove: false,  // Denied
    // null = allowed (default)
  }
}
```

**Composable**: useHeadPermissions
- canPerformAction(actionName)
- hasAnyPermission(actionNames[])
- hasAllPermissions(actionNames[])

---

### 7. Route Integration (Lines 257-317, 805-880)

**Route Watcher**:
```javascript
'$route.name': {
  immediate: true,
  handler(val) {
    // Update tool config from route
    let view = this.$model.main.app.web.view[name]
    if (view && view.head) {
      this.view.tool = view.head.tool
    }
    
    // Preserve search in specific modes
    const preserveSearch = this.$route && (
      this.$route.query.mode === 'assetsearch' || 
      (this.$route.name === 'admin' && this.$route.query.tab === 'assets')
    )
    
    // Clear search when switching routes
    if (!preserveSearch) {
      this.search = ''
      this.$store.state.trigger.search.term = ''
      this.tag_items = this.items.map(tag_alias)
    }
    
    this.defaults()  // Set initial select value
  }
}
```

**Search Router Integration**:
```javascript
// Push search term to URL
this.$router.push({
  path: this.$route.path,
  query: {
    mode: 'headsearch',
    term: term
  }
})
```

**Dynamic Tool Configuration**:
- Tool config changes per route
- View-specific head.tool merged with global head.tool
- Uses Seneca deep merge: `this.$main.seneca.util.deep(headtool, viewtool)`

---

### 8. Lifecycle & Watchers (Lines 232-250, 780-798, 805-880)

**created() Hook**:
```javascript
async created() {
  let tool = {}
  
  // Poll for assets until loaded
  let load_assets = setInterval(async () => {
    await this.$store.dispatch('vxg_get_assets', tool)
    this.items = tool.assets
    
    if (this.items.length != 0) {
      // Prepare tag items
      this.tag_items = this.items
        .map(tag_alias)
        .filter(item => item !== null)
      
      // Setup MiniSearch
      this.setupMiniSearch(this.items)
      clearInterval(load_assets)
    }
  }, 111)  // 111ms interval
}
```

**Watchers**:
```javascript
// Watch for external search clear
'$store.state.trigger.search.term'(term) {
  if (term == '' && this.$refs.search2) {
    this.$refs.search2.reset()
    this.tag_items = this.items.map(tag_alias).filter(item => item !== null)
  }
}

// Watch select changes
select() {
  this.$store.dispatch('trigger_select', {value: this.select})
}

// Watch for external select updates
'$store.state.trigger.select.value'(val) {
  this.select = val
}

// Watch for permission changes (force update)
'$store.vxg.cmp.BasicHead.allow.add': {
  handler() {
    this.$forceUpdate()
  }
}

// Watch for route changes
'$route.name': { /* ... */ }
```

---

### 9. Computed Properties (Lines 319-352, 882-924)

```javascript
filterDisabled() {
  return this.$store.state.trigger.filter_disabled.value
}

filterIcon() {
  return this.$store.state.vxg.cmp.BasicHead.show.filter
}

bookmarkVisible() {
  return this.$store.state.trigger.bookmark.visible
}

bookmark() {
  return this.$store.state.trigger.bookmark.value
}

drawerOpen() {
  return this.$store.state.vxg.cmp.BasicSide.show
}

detailOpen() {
  return !this.$store.state.vxg.cmp.BasicMain.show
}

itemName() {
  // Special handling for Device/User routes
  if (this.$store.state.vxg.ent.meta.name == 'Item') {
    if (this.$route.path.includes('/device')) return 'Device'
    if (this.$route.path.includes('/user')) return 'User'
  }
  return this.$store.state.vxg.ent.meta.name
}

tool() {
  // Merge global and view-specific tool config
  let headtool = this.$model.main.app.web.parts.head.tool
  let viewtool = this.view.tool
  let tool = this.$main.seneca.util.deep(headtool, viewtool)
  return tool
}

search_config() {
  return this.$model.main.ux.custom.search_config
}
```

---

## Component Architecture Plan

### Proposed Structure

```
BasicHead.vue (~200 lines)
├── HeadToolbar.vue (~150 lines)
│   ├── Action buttons (add, remove, print, bookmark, collect)
│   ├── Drawer/detail toggles
│   └── Select dropdown
├── HeadSearch.vue (~250 lines)
│   ├── v-combobox with autocomplete
│   ├── MiniSearch integration
│   └── Router navigation
├── HeadUser.vue (~150 lines)
│   ├── Avatar button
│   ├── User menu dropdown
│   └── Profile/Settings/Logout
└── HeadNotifications.vue (~200 lines)
    ├── Notification bell icon
    ├── Badge with unread count
    └── Dropdown with notification list

Composables:
├── useHeadSearch.ts
│   ├── searchQuery (ref)
│   ├── searchResults (ref)
│   ├── isSearching (ref)
│   ├── handleSearch(query)
│   ├── clearSearch()
│   └── indexItems(items)
├── useHeadActions.ts
│   ├── visibleActions (computed)
│   ├── isActionLoading(name)
│   └── handleAction(action)
├── useHeadPermissions.ts
│   ├── permissions (computed)
│   ├── canPerformAction(name)
│   ├── hasAnyPermission(names)
│   └── hasAllPermissions(names)
└── useHeadNotifications.ts
    ├── notifications (computed)
    ├── unreadCount (computed)
    ├── markAsRead(id)
    ├── markAllAsRead()
    └── dismiss(id)
```

---

## MiniSearch Usage Documentation

### Current Implementation

**NOT Direct MiniSearch** - Uses Seneca microservice wrapper:

```javascript
// Initialize (add documents)
async setupMiniSearch(items) {
  for (const item of items) {
    this.$seneca.post('sys:search, cmd:add', { doc: item })
  }
}

// Search
async performSearch(term) {
  if (term) {
    let out = await this.$seneca.post('sys:search, cmd:search', {
      query: term,
      params: this.search_config  // From model
    })
    
    this.tag_items = out.data.hits
      .map(v => tag_alias(v.doc))
      .filter(item => item !== null)
  }
}
```

**Search Config** (from model):
```javascript
this.$model.main.ux.custom.search_config = {
  // MiniSearch options
  fuzzy: 0.2,
  prefix: true,
  boost: { name: 2 },
  // etc.
}
```

**Migration Strategy**:
1. Keep Seneca integration if available
2. Add fallback direct MiniSearch implementation
3. Use TypeScript types for search documents
4. Extract to useHeadSearch composable

### Proposed MiniSearch Integration

```typescript
// useHeadSearch.ts
import MiniSearch from 'minisearch'

interface SearchDocument {
  id: string
  tag: string
  custom12?: string
  type: string
  // ... other fields
}

const miniSearch = new MiniSearch<SearchDocument>({
  fields: ['tag', 'custom12', 'type'],
  storeFields: ['id', 'tag', 'custom12'],
  searchOptions: {
    boost: { tag: 2 },
    fuzzy: 0.2,
    prefix: true
  }
})
```

---

## State Dependencies

### Store State Read (Computed)

```javascript
// Component flags
$store.state.vxg.cmp.BasicHead.show[action]
$store.state.vxg.cmp.BasicHead.allow[action]
$store.state.vxg.cmp.BasicSide.show
$store.state.vxg.cmp.BasicMain.show

// Trigger state
$store.state.trigger.search.term
$store.state.trigger.search.a
$store.state.trigger.select.value
$store.state.trigger.filter_disabled.value
$store.state.trigger.bookmark.visible
$store.state.trigger.bookmark.value

// Entity metadata
$store.state.vxg.ent.meta.name
```

### Store State Write (Dispatch)

```javascript
// Asset loading
$store.dispatch('vxg_get_assets', tool)

// Triggers
$store.dispatch('trigger_led_add')
$store.dispatch('trigger_led_add_mobile')
$store.dispatch('trigger_led_remove')
$store.dispatch('trigger_select', {value})
$store.dispatch('vxg_trigger_go')
$store.dispatch('vxg_trigger_clear')
$store.dispatch('vxg_trigger_printMap')
$store.dispatch('vxg_trigger_collect')
$store.dispatch('adjust_trigger_bookmark')
$store.dispatch('trigger_toggle_filter')

// Component flags
$store.dispatch('set_cmp_flags', {name, flags})
```

### Store State Direct Mutation (Anti-pattern)

```javascript
// Direct mutations (should be actions)
this.$store.state.trigger.search.term = term
this.$store.state.trigger.search.a = term
```

**Migration Note**: Replace direct mutations with proper actions/mutations in Vue 3.

---

## Breaking Changes & Migration Notes

### 1. Seneca Integration

**Current**: Uses `this.$seneca.post()` for search
**Migration**: 
- Check if Seneca plugin available
- Add fallback direct MiniSearch
- Type the search API

### 2. Model Access

**Current**: Uses `this.$model.main.app.web.view[name]`
**Migration**:
- Inject model via provide/inject
- Or pass as prop from parent
- Type the model structure

### 3. Store Structure

**Current**: Uses `$store.state.vxg.cmp.BasicHead`
**Migration**:
- Create Vuex module for BasicHead
- Or migrate to Pinia store
- Keep backwards compatibility

### 4. Router Integration

**Current**: Uses `this.$router.push()` directly
**Migration**:
- Use `useRouter()` from vue-router
- Same API, no changes needed

### 5. Refs

**Current**: Uses `this.$refs.search2`
**Migration**:
- Use `ref()` and template refs
- Type the ref properly

### 6. Watchers

**Current**: Options API watchers
**Migration**:
- Use `watch()` and `watchEffect()`
- Route watcher: `watch(() => route.name, ...)`
- Store watcher: `watch(() => store.state.x, ...)`

---

## Sub-Component Boundaries

### HeadSearch.vue Scope

**Includes**:
- v-combobox component (lines 631-649)
- Search state (search, tag_items)
- MiniSearch methods (setupMiniSearch, performSearch)
- Search handlers (changeSearch, handleChangeSearch, customFilter)
- useHeadSearch composable

**Props**:
- placeholder: string
- minSearchLength: number

**Emits**:
- select: (result: SearchResult) => void
- search: (query: string) => void

**Size**: ~250 lines

---

### HeadToolbar.vue Scope

**Includes**:
- Action buttons (add, remove, print, bookmark, collect)
- Drawer/detail toggles (expandSide, expandMain)
- Select dropdown
- Action handlers
- useHeadActions composable
- useHeadPermissions composable

**Props**:
- actions: Action[]

**Emits**:
- actionClick: (action: Action) => void
- actionComplete: (action: Action) => void
- actionError: (action: Action, error: Error) => void

**Size**: ~150 lines

---

### HeadUser.vue Scope

**Includes**:
- Avatar button/icon
- User menu dropdown
- Profile/Settings/Logout items
- useAuth composable (from Task 2.2)

**Props**:
- user: User | null
- menuItems: MenuItem[]

**Emits**:
- menuItemClick: (item: MenuItem) => void

**Size**: ~150 lines

---

### HeadNotifications.vue Scope

**Includes**:
- Notification bell icon
- Badge with unread count
- Dropdown with notification list
- Mark as read functionality
- useHeadNotifications composable

**Props**: None (uses store)

**Emits**:
- notificationClick: (notification: Notification) => void
- notificationDismiss: (id: string) => void

**Size**: ~200 lines

---

### Main BasicHead.vue Scope

**Includes**:
- v-app-bar wrapper
- Title display
- Sub-component orchestration
- Event delegation
- Route integration

**Props**:
- title: string
- searchEnabled: boolean
- searchPlaceholder: string
- actions: Action[]
- user: User | null
- userMenuItems: MenuItem[]

**Emits**:
- All sub-component events (bubbled up)

**Size**: ~200 lines

---

## TypeScript Types Required

```typescript
// Action types
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

// Search types
interface SearchResult {
  id: string
  name: string
  type: string
  icon: string
  route?: string
  score?: number
}

interface SearchDocument {
  id: string
  tag: string
  custom12?: string
  type: string
  // ... asset fields
}

// User types
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

// MenuItem types
interface MenuItem {
  id: string
  label: string
  icon: string
  route?: string
  action?: string
}

// Notification types
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

// Tool configuration types
interface Tool {
  add: ToolConfig
  remove: ToolConfig
  print: ToolConfig
  bookmark: ToolConfig
  collect: ToolConfig
  expandSide: ToolConfig
  expandMain: ToolConfig
  avatar: ToolConfig
  select: SelectConfig
}

interface ToolConfig {
  active: boolean
  disabled?: boolean
}

interface SelectConfig extends ToolConfig {
  title: string
  initial: string
  items: Record<string, { title: string }>
}
```

---

## Performance Considerations

### Current Performance

- Assets loaded with 111ms polling interval
- Search via Seneca microservice (network call)
- Filter applies on each keystroke (with 11ms setTimeout)
- Force updates on permission changes

### Optimization Opportunities

1. **Search Performance**:
   - Cache search results
   - Debounce search input (currently 11ms, increase to 300ms)
   - Use local MiniSearch for <100ms searches

2. **Permission Updates**:
   - Remove `$forceUpdate()` calls
   - Use reactive computed properties

3. **Asset Loading**:
   - Replace polling with event-based loading
   - Use Vue 3 Suspense for loading state

4. **Search Indexing**:
   - Index on component mount
   - Re-index only when assets change
   - Use web worker for large datasets (1000+ items)

### Performance Targets

- Search: <100ms (per spec)
- Initial load: <500ms
- Re-render: <16ms (60fps)
- Search with 1000+ documents: <100ms

---

## Testing Strategy

### Unit Tests (Per Sub-Component)

1. **HeadSearch.spec.ts**:
   - Renders combobox
   - Handles search input
   - Filters results
   - Emits select event
   - Clears search
   - MiniSearch integration

2. **HeadToolbar.spec.ts**:
   - Renders action buttons
   - Checks permissions
   - Handles action clicks
   - Shows/hides based on permissions
   - Loading states

3. **HeadUser.spec.ts**:
   - Renders avatar
   - Shows user info
   - Menu items work
   - Logout functionality

4. **HeadNotifications.spec.ts**:
   - Renders notification bell
   - Shows unread count
   - Mark as read works
   - Dismiss functionality

### Integration Tests

1. **BasicHead.spec.ts**:
   - All sub-components render
   - Events bubble up correctly
   - Store integration works
   - Router navigation works
   - Permissions applied

### Composable Tests

1. **useHeadSearch.spec.ts**:
   - Indexes documents
   - Performs search
   - Fuzzy matching works
   - Prefix matching works
   - Clears search

2. **useHeadActions.spec.ts**:
   - Filters visible actions
   - Handles navigation
   - Handles dispatch
   - Loading states

3. **useHeadPermissions.spec.ts**:
   - Checks permissions
   - hasAny/hasAll work

4. **useHeadNotifications.spec.ts**:
   - Loads notifications
   - Marks as read
   - Dismisses notifications

### Performance Tests

1. **Search Performance**:
   - 100 documents: <50ms
   - 1000 documents: <100ms
   - 10000 documents: <200ms

2. **Render Performance**:
   - Initial render: <500ms
   - Re-render: <16ms

---

## Dependencies & Imports

### External Libraries

```javascript
import MiniSearch from 'minisearch'  // Search
// Note: Currently uses Seneca wrapper
```

### Vue Imports

```javascript
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
```

### Internal Composables

```javascript
import { useAuth } from '@/composables/useAuth'
import { useHeadSearch } from '@/composables/useHeadSearch'
import { useHeadActions } from '@/composables/useHeadActions'
import { useHeadPermissions } from '@/composables/useHeadPermissions'
import { useHeadNotifications } from '@/composables/useHeadNotifications'
```

### Type Imports

```javascript
import type { 
  Action, 
  SearchResult, 
  SearchDocument,
  User, 
  MenuItem,
  Notification 
} from '@/types'
```

---

## Migration Risks

### High Risk

1. **Seneca Integration**: May not be available in test environment
   - **Mitigation**: Fallback to direct MiniSearch
   
2. **Store Structure**: Complex nested state
   - **Mitigation**: Create typed getters/actions
   
3. **Model Access**: Uses `this.$model` global
   - **Mitigation**: Inject or pass as prop

### Medium Risk

1. **Search Performance**: Network calls may be slow
   - **Mitigation**: Add local caching
   
2. **Permission System**: Complex logic
   - **Mitigation**: Comprehensive tests
   
3. **Route Integration**: Multiple search modes
   - **Mitigation**: Document all modes, add tests

### Low Risk

1. **UI Components**: Vuetify 3 syntax similar
   - **Mitigation**: Follow migration guide
   
2. **TypeScript**: Straightforward types
   - **Mitigation**: Start with loose types

---

## Next Steps

1. ✅ **Complete Phase 1 Analysis** - DONE
2. **Review with Team** - Validate architecture
3. **Start Phase 2** - Component splitting
4. **Create Sub-Components** - HeadSearch first
5. **Extract Composables** - useHeadSearch first
6. **Write Tests** - TDD approach
7. **Integration Testing** - Full component
8. **Performance Testing** - Meet <100ms target

---

## Summary Statistics

**Current Component**:
- Total Lines: ~1100 (with duplication)
- Actual Unique Lines: ~530
- Methods: 20+
- Computed Properties: 9
- Watchers: 5+
- Store Dependencies: 15+

**Target Architecture**:
- Main Component: ~200 lines
- Sub-Components: 4 @ ~150-250 lines each
- Composables: 4 @ ~100-150 lines each
- Total: ~1400 lines (better organized)
- Test Coverage: >80%

**Reduction in Complexity**:
- Smaller, focused components
- Reusable composables
- Better testability
- Clearer separation of concerns
- TypeScript type safety
