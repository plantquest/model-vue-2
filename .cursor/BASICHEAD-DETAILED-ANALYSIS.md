# BasicHead Component - Comprehensive Analysis

**Component**: BasicHead.vue  
**Size**: 1,100 lines  
**Complexity**: VERY HIGH (Most complex component)  
**Status**: Vue 2 Options API → Vue 3 Composition API  
**Priority**: CRITICAL (Final de-risking component)

---

## Structure Analysis

### TWO Script Blocks!
```
Lines 1-199:    Template (first half)
Lines 200-530:  <script> block #1 - Helper functions + main component
Lines 531-747:  Template (second half) 
Lines 748-1100: <script> block #2 - Additional code
```

**Note**: Unusual structure with template split and two script blocks. Will need careful consolidation.

---

## Feature Inventory

### 1. Toolbar Actions (~200 lines template)

**Drawer Controls**:
- `openDrawer` - Open sidebar (v-icon mdi-chevron-right)
- `closeDetail` - Close detail panel (v-icon mdi-chevron-left)

**CRUD Actions**:
- `addItem` - Add fixed asset (v-btn with mdi-map-marker-path)
- `addMobileAsset` - Add mobile asset
- `removeItem` - Remove asset
- All have permission checks (`show(action) && tool.action.active`)

**Utility Actions**:
- `print` - Print map (mdi-printer, tooltip)
- `collect` - Collect action (mdi-inbox-arrow-down)
- `showTags` / `bookmark` - Bookmark management (mdi-bookmark-minus-outline)

### 2. Search System (~150 lines)

**Primary Search** (v-combobox ref="search2"):
- Search input with autocomplete
- Tag items (with custom12 alias support)
- MiniSearch integration
- Debounced search (11ms delay)
- Custom filter function
- Clear functionality
- Router query integration (mode: 'headsearch')

**Search Features**:
- `setupMiniSearch` - Initialize search index
- `performSearch` - Execute search via Seneca
- `changeSearch` - Handle search input
- `handleChangeSearch` - Update store state
- `customFilter` - Autosuggest filtering

### 3. Select Dropdown (~50 lines)

**v-select**:
- Dynamic items from `tool.select.items`
- Syncs with `$store.state.trigger.select.value`
- Watcher for bidirectional sync
- `selectItems()` method generates options

### 4. Permission System (~50 lines)

**Two-tier system**:
- `show(action)` - Visibility control (allow + show flags)
- `allow(action)` - Permission control (from store)
- Applied to all actions (add, remove, edit, print, etc.)

### 5. Store Integration (~100 lines)

**Read from Store**:
- `vxg.ent.meta.name` - Item name
- `vxg.cmp.BasicHead.show` - Visibility flags
- `vxg.cmp.BasicHead.allow` - Permission flags
- `vxg.cmp.BasicSide.show` - Drawer state
- `vxg.cmp.BasicMain.show` - Detail state
- `trigger.search.term` - Search term
- `trigger.select.value` - Select value
- `trigger.filter_disabled` - Filter state
- `trigger.bookmark` - Bookmark state

**Write to Store**:
- Multiple dispatch actions (20+)
- Direct state mutations (trigger.search)

### 6. Route Integration (~100 lines)

**Watchers**:
- `$route.name` - Updates tool based on route view
- Clears search on route change (with exceptions)
- `defaults()` method resets select

**Router Push**:
- Search mode routing
- Query parameter management
- Navigation duplicate handling

### 7. Tool Configuration (~50 lines)

**Computed `tool`**:
- Merges headtool + viewtool
- Uses deep merge from Seneca util
- Provides tool.add, tool.remove, tool.select, etc.

---

## Data Properties Analysis

```javascript
data() {
  return {
    search: '',          // Primary search term
    select: '',          // Selected value
    view: {              // View configuration
      tool: {}
    },
    featuresMenu: [],    // Features menu items
    items: [],           // All assets
    tag_items: []        // Tag aliases for autocomplete
  }
}
```

---

## Computed Properties Analysis (10+)

```javascript
computed: {
  filterDisabled()     // From store trigger.filter_disabled
  filterIcon()         // From store vxg.cmp.BasicHead.show.filter
  bookmarkVisible()    // From store trigger.bookmark.visible
  bookmark()           // From store trigger.bookmark.value
  drawerOpen()         // From store vxg.cmp.BasicSide.show
  detailOpen()         // From store !vxg.cmp.BasicMain.show
  itemName()           // From store vxg.ent.meta.name
  tool()               // Merged headtool + viewtool
  search_config()      // From model search config
}
```

---

## Methods Analysis (20+)

**Search Methods**:
- `setupMiniSearch(items)` - Initialize search
- `performSearch(term)` - Execute search
- `customFilter(item, query, text)` - Filter logic
- `changeSearch(event)` - Handle input
- `handleChangeSearch(event)` - Update store

**Action Methods**:
- `addItem()` - Dispatch trigger_led_add
- `addMobileAsset()` - Dispatch trigger_led_add_mobile
- `removeItem()` - Dispatch trigger_led_remove
- `filterAssets()` - Dispatch vxg_trigger_go
- `clearFilter()` - Dispatch vxg_trigger_clear
- `print()` - Dispatch vxg_trigger_printMap
- `collect()` - Dispatch vxg_trigger_collect
- `showTags()` - Dispatch adjust_trigger_bookmark

**Utility Methods**:
- `selectItems()` - Generate select options
- `getTags()` - Get asset tags
- `defaults()` - Reset to defaults
- `show(action)` - Check visibility
- `allow(action)` - Check permissions
- `openDrawer()` - Open sidebar
- `closeDetail()` - Close detail panel
- `action(name)` - Emit action event

---

## Watchers Analysis (5+)

```javascript
watch: {
  '$store.state.trigger.search.term'(term)   // Reset search on clear
  select()                                    // Trigger select dispatch
  '$store.state.trigger.select.value'(val)   // Sync select value
  '$store.vxg.cmp.BasicHead.allow.add'       // Force update on permission change
  '$store.vxg.cmp.BasicHead.allow.remove'    // Force update on permission change
  '$route.name'                              // Update tool, clear search
}
```

---

## Splitting Strategy

### Proposed Architecture

```
BasicHead.vue (Main orchestrator ~150 lines)
├── HeadToolbar.vue (~200 lines)
│   ├── Drawer controls
│   ├── Action buttons (add, remove, etc.)
│   └── Utility actions (print, collect, bookmark)
│
├── HeadSearch.vue (~150 lines)
│   ├── Search combobox
│   ├── Autocomplete
│   └── Clear functionality
│
├── HeadSelect.vue (~100 lines)
│   └── Select dropdown with sync
│
└── composables/
    ├── useHeadSearch.ts (~200 lines)
    │   ├── MiniSearch setup
    │   ├── Search execution
    │   ├── Tag alias handling
    │   └── Router integration
    │
    ├── useHeadActions.ts (~150 lines)
    │   ├── All dispatch actions
    │   ├── CRUD operations
    │   ├── Utility operations
    │   └── Event emission
    │
    ├── useHeadPermissions.ts (~100 lines)
    │   ├── show() logic
    │   ├── allow() logic
    │   └── Store integration
    │
    ├── useHeadState.ts (~100 lines)
    │   ├── Computed from store
    │   ├── Tool configuration
    │   └── View management
    │
    └── useHeadSync.ts (~100 lines)
        ├── Select sync
        ├── Search sync
        └── Route watchers
```

---

## Migration Complexity Factors

### HIGH Complexity:
1. **Two script blocks** - Need to consolidate
2. **20+ methods** - Many dispatch actions
3. **10+ computed** - Store dependencies
4. **5+ watchers** - Complex synchronization
5. **MiniSearch integration** - Seneca search system
6. **Permission system** - show/allow checks
7. **Router integration** - Multiple query modes
8. **Tool merging** - Deep merge from model

### MEDIUM Complexity:
1. **Multiple action buttons** - But similar patterns
2. **Template structure** - Can be split logically
3. **Store integration** - Well-defined patterns

### LOW Complexity:
1. **TypeScript migration** - Straightforward typing
2. **Event emission** - Simple @emit replacement
3. **Props** - Only one prop (logo)

---

## Migration Timeline

### Day 1: Analysis & Composables (6-8 hours)
- [x] Deep analysis (done now)
- [ ] Create useHeadSearch composable
- [ ] Create useHeadActions composable
- [ ] Create useHeadPermissions composable
- [ ] Create useHeadState composable
- [ ] Create useHeadSync composable
- [ ] Write composable tests

### Day 2: Sub-components (6-8 hours)
- [ ] Create HeadToolbar.vue
- [ ] Create HeadSearch.vue
- [ ] Create HeadSelect.vue
- [ ] Write sub-component tests
- [ ] Consolidate two script blocks

### Day 3: Main Component & Integration (6-8 hours)
- [ ] Refactor BasicHead.vue as orchestrator
- [ ] Integration testing
- [ ] Visual regression testing
- [ ] Achieve >80% coverage
- [ ] Documentation

---

## Challenges & Solutions

### Challenge 1: Two Script Blocks
**Current**: Template split with two `<script>` blocks

**Solution**: Consolidate into single `<script setup>`
- Extract helper functions to utilities
- Merge component logic
- Single cohesive component

### Challenge 2: MiniSearch Integration
**Current**: `this.$seneca.post('sys:search, cmd:search')`

**Solution**: Extract to useHeadSearch
- Encapsulate all search logic
- Handle Seneca integration
- Provide clean API

### Challenge 3: 20+ Dispatch Actions
**Current**: Scattered throughout methods

**Solution**: Extract to useHeadActions
- Group by category (CRUD, utility, etc.)
- Provide typed action handlers
- Clean separation

### Challenge 4: Complex Watchers
**Current**: 5+ watchers with side effects

**Solution**: Use Vue 3 watch()
- Convert each watcher
- Maintain synchronization
- Test thoroughly

### Challenge 5: Permission System
**Current**: show() and allow() methods

**Solution**: Extract to useHeadPermissions
- Encapsulate permission logic
- Provide computed permissions
- Reactive updates

---

## Testing Strategy

### Unit Tests

**Composables** (5 files):
- useHeadSearch: Search, MiniSearch, tag aliases
- useHeadActions: All actions, dispatches
- useHeadPermissions: show/allow logic
- useHeadState: Computed properties
- useHeadSync: Watchers, synchronization

**Sub-components** (3 files):
- HeadToolbar: Action buttons, permissions
- HeadSearch: Search input, autocomplete
- HeadSelect: Select dropdown, sync

**Main Component** (1 file):
- Integration of all parts
- Event emission
- Props handling

### Integration Tests

- Full toolbar functionality
- Search with results
- Select synchronization
- Permission checks
- Router integration
- Store updates

---

## Acceptance Criteria

- [ ] Component split into 3 sub-components + 5 composables
- [ ] All logic converted to Composition API
- [ ] TypeScript throughout
- [ ] >80% test coverage
- [ ] No functionality regressions
- [ ] Visual appearance maintained
- [ ] All 20+ actions working
- [ ] Permission system working
- [ ] Search working
- [ ] Select synchronization working
- [ ] Router integration working

---

## Estimated Effort

**Conservative**: 3 days (24 hours)
- Day 1: Composables (8 hrs)
- Day 2: Sub-components (8 hrs)
- Day 3: Integration & testing (8 hrs)

**Aggressive**: 2 days (16 hours)
- Day 1: Composables + sub-components (8-10 hrs)
- Day 2: Integration & testing (6-8 hrs)

**Recommendation**: Take 3 days for quality

---

## Next Steps

Ready to begin BasicHead migration:

1. Create 5 composables
2. Create 3 sub-components
3. Refactor main component
4. Write comprehensive tests
5. Achieve >80% coverage

**Start with**: useHeadSearch composable (most complex logic)

---

**Status**: Analysis complete, ready for implementation  
**Timeline**: 2-3 days  
**Risk**: HIGH (most complex) but MANAGED (good strategy)  
**Team Lead**: Standing by for go-ahead to begin implementation
