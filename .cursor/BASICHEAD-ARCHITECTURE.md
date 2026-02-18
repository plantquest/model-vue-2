# BasicHead Component Architecture

**Date**: February 9, 2026  
**Component**: BasicHead.vue Migration  
**Target**: Vue 3 Composition API + TypeScript  
**Status**: Architecture Design Complete

---

## Architecture Overview

The BasicHead component will be split into **4 sub-components** and **4 composables** to improve maintainability, testability, and reusability.

```
┌─────────────────────────────────────────────────────────────┐
│                     BasicHead.vue                           │
│                  (Main Orchestrator ~200 lines)             │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ HeadToolbar  │  │  HeadSearch  │  │   HeadUser   │     │
│  │   ~150 lines │  │  ~250 lines  │  │  ~150 lines  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌──────────────────────────────────────────────────┐     │
│  │         HeadNotifications  ~200 lines            │     │
│  └──────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘

Composables Layer:
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐
│ useHeadSearch    │  │ useHeadActions   │  │useHeadPermissions│  │useHeadNotifications  │
│ MiniSearch       │  │ Action handling  │  │ Permission checks│  │ Notification state   │
│ Integration      │  │ (navigate,       │  │                  │  │                      │
│                  │  │  dispatch, emit) │  │                  │  │                      │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────────┘
```

---

## Component Hierarchy

### 1. BasicHead.vue (Main Component)

**Purpose**: Orchestrate sub-components and manage overall layout

**Responsibilities**:
- v-app-bar layout
- Title display
- Sub-component placement
- Event delegation
- Route integration
- Lifecycle management

**Template Structure**:
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
```

**Props**:
```typescript
interface Props {
  title?: string
  searchEnabled?: boolean
  searchPlaceholder?: string
  actions?: Action[]
  user?: User | null
  userMenuItems?: MenuItem[]
}
```

**Emits**:
```typescript
interface Emits {
  searchSelect: [result: SearchResult]
  searchQuery: [query: string]
  actionClick: [action: Action]
  actionComplete: [action: Action]
  actionError: [action: Action, error: Error]
  notificationClick: [notification: Notification]
  notificationDismiss: [id: string]
  userMenuClick: [item: MenuItem]
}
```

**Size**: ~200 lines
**File**: `packages/model-vue/src/components/BasicHead.vue`

---

### 2. HeadSearch.vue

**Purpose**: Search functionality with MiniSearch autocomplete

**Responsibilities**:
- Search input (v-combobox)
- MiniSearch integration
- Autocomplete suggestions
- Search result navigation
- Clear search functionality

**Template Structure**:
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
```

**Props**:
```typescript
interface Props {
  placeholder?: string
  minSearchLength?: number
}
```

**Emits**:
```typescript
interface Emits {
  select: [result: SearchResult]
  search: [query: string]
}
```

**Uses Composable**: `useHeadSearch`

**Size**: ~250 lines
**File**: `packages/model-vue/src/components/HeadSearch.vue`

---

### 3. HeadToolbar.vue

**Purpose**: Action buttons with permission-based visibility

**Responsibilities**:
- Render action buttons
- Check permissions
- Handle action clicks
- Show loading states
- Tooltips

**Template Structure**:
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
```

**Props**:
```typescript
interface Props {
  actions?: Action[]
}
```

**Emits**:
```typescript
interface Emits {
  actionClick: [action: Action]
  actionComplete: [action: Action]
  actionError: [action: Action, error: Error]
}
```

**Uses Composables**: 
- `useHeadActions`
- `useHeadPermissions`

**Size**: ~150 lines
**File**: `packages/model-vue/src/components/HeadToolbar.vue`

---

### 4. HeadUser.vue

**Purpose**: User menu with profile, settings, logout

**Responsibilities**:
- Avatar display
- User info
- Menu dropdown
- Profile/Settings navigation
- Logout functionality

**Template Structure**:
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
```

**Props**:
```typescript
interface Props {
  user?: User | null
  menuItems?: MenuItem[]
}
```

**Emits**:
```typescript
interface Emits {
  menuItemClick: [item: MenuItem]
}
```

**Uses Composable**: `useAuth` (from Task 2.2)

**Size**: ~150 lines
**File**: `packages/model-vue/src/components/HeadUser.vue`

---

### 5. HeadNotifications.vue

**Purpose**: Notification system with bell icon and dropdown

**Responsibilities**:
- Notification bell icon
- Unread count badge
- Notification list dropdown
- Mark as read functionality
- Dismiss notifications

**Template Structure**:
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
```

**Props**: None (uses store)

**Emits**:
```typescript
interface Emits {
  notificationClick: [notification: Notification]
  notificationDismiss: [id: string]
}
```

**Uses Composable**: `useHeadNotifications`

**Size**: ~200 lines
**File**: `packages/model-vue/src/components/HeadNotifications.vue`

---

## Composables

### 1. useHeadSearch.ts

**Purpose**: MiniSearch integration and search logic

**Exports**:
```typescript
interface UseHeadSearchReturn {
  searchQuery: Ref<string>
  searchResults: Ref<SearchDocument[]>
  isSearching: Ref<boolean>
  handleSearch: (query: string) => void
  clearSearch: () => void
  indexItems: (items: SearchDocument[]) => void
}

export function useHeadSearch(): UseHeadSearchReturn
```

**Features**:
- MiniSearch initialization
- Document indexing
- Fuzzy search (fuzzy: 0.2)
- Prefix matching (prefix: true)
- Field boosting (name: 2x)
- Auto-indexing on items change
- TypeScript typed

**Implementation**:
```typescript
import { ref, computed, watch } from 'vue'
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
      const results = miniSearch.search(query)
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

**Size**: ~150 lines
**File**: `packages/model-vue/src/composables/useHeadSearch.ts`

---

### 2. useHeadActions.ts

**Purpose**: Action handling logic (navigate, dispatch, emit)

**Exports**:
```typescript
interface UseHeadActionsReturn {
  visibleActions: ComputedRef<Action[]>
  isActionLoading: (actionName: string) => boolean
  handleAction: (action: Action) => Promise<void>
}

export function useHeadActions(actions: Action[]): UseHeadActionsReturn
```

**Features**:
- Filter actions by permissions
- Handle 3 action types:
  - `navigate` - Router navigation
  - `dispatch` - Vuex action
  - `emit` - Component event
- Loading states per action
- Error handling

**Implementation**:
```typescript
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

**Size**: ~120 lines
**File**: `packages/model-vue/src/composables/useHeadActions.ts`

---

### 3. useHeadPermissions.ts

**Purpose**: Permission checking logic

**Exports**:
```typescript
interface UseHeadPermissionsReturn {
  permissions: ComputedRef<Record<string, boolean>>
  canPerformAction: (actionName: string) => boolean
  hasAnyPermission: (actionNames: string[]) => boolean
  hasAllPermissions: (actionNames: string[]) => boolean
}

export function useHeadPermissions(): UseHeadPermissionsReturn
```

**Features**:
- Permission checking
- Default allow (null = true)
- Multiple permission checks

**Implementation**:
```typescript
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

**Size**: ~60 lines
**File**: `packages/model-vue/src/composables/useHeadPermissions.ts`

---

### 4. useHeadNotifications.ts

**Purpose**: Notification state management

**Exports**:
```typescript
interface UseHeadNotificationsReturn {
  notifications: ComputedRef<Notification[]>
  unreadCount: ComputedRef<number>
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  dismiss: (notificationId: string) => void
}

export function useHeadNotifications(): UseHeadNotificationsReturn
```

**Features**:
- Notification list from store
- Unread count
- Mark as read
- Dismiss notifications

**Implementation**:
```typescript
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

**Size**: ~100 lines
**File**: `packages/model-vue/src/composables/useHeadNotifications.ts`

---

## Type Definitions

**File**: `packages/model-vue/src/types/components.ts`

```typescript
// Action types
export interface Action {
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
export interface SearchResult {
  id: string
  name: string
  type: string
  icon: string
  route?: string
  score?: number
}

export interface SearchDocument {
  id: string
  name: string
  type: string
  icon: string
  route?: string
  tags?: string[]
}

// User types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

// MenuItem types
export interface MenuItem {
  id: string
  label: string
  icon: string
  route?: string
  action?: string
}

// Notification types
export interface Notification {
  id: string
  title: string
  message: string
  icon: string
  color?: string
  read: boolean
  timestamp: Date
  link?: string
}
```

---

## Data Flow

### Search Flow

```
User Input → HeadSearch.vue
              ↓
           useHeadSearch composable
              ↓
           MiniSearch index
              ↓
           Search results
              ↓
           emit('select', result)
              ↓
           BasicHead.vue
              ↓
           Router navigation
```

### Action Flow

```
User Click → HeadToolbar.vue
              ↓
           useHeadPermissions (check)
              ↓
           useHeadActions (handle)
              ↓
           ┌─────────┬─────────┬─────────┐
           ↓         ↓         ↓         ↓
        navigate  dispatch   emit    custom
        (router)  (store)  (parent)
```

### Notification Flow

```
Store Update → useHeadNotifications
                 ↓
              HeadNotifications.vue
                 ↓
              Display badge + list
                 ↓
              User interaction
                 ↓
              markAsRead / dismiss
                 ↓
              Store update
```

---

## Benefits of Architecture

### 1. Separation of Concerns
- Each sub-component has single responsibility
- Composables isolate business logic
- Main component just orchestrates

### 2. Reusability
- Composables can be used elsewhere
- Sub-components can be tested independently
- Types shared across application

### 3. Testability
- Small components = easier to test
- Composables can be tested in isolation
- Mock store/router per component

### 4. Maintainability
- Clear file structure
- TypeScript types prevent errors
- Smaller files are easier to understand

### 5. Performance
- Components can be lazy-loaded
- MiniSearch optimized for <100ms
- Reactive updates only where needed

---

## File Structure

```
packages/model-vue/
├── src/
│   ├── components/
│   │   ├── BasicHead.vue              (~200 lines)
│   │   ├── HeadSearch.vue             (~250 lines)
│   │   ├── HeadToolbar.vue            (~150 lines)
│   │   ├── HeadUser.vue               (~150 lines)
│   │   └── HeadNotifications.vue      (~200 lines)
│   ├── composables/
│   │   ├── useHeadSearch.ts           (~150 lines)
│   │   ├── useHeadActions.ts          (~120 lines)
│   │   ├── useHeadPermissions.ts      (~60 lines)
│   │   └── useHeadNotifications.ts    (~100 lines)
│   ├── types/
│   │   └── components.ts              (updated)
│   └── __tests__/
│       ├── BasicHead.spec.ts
│       ├── HeadSearch.spec.ts
│       ├── HeadToolbar.spec.ts
│       ├── HeadUser.spec.ts
│       ├── HeadNotifications.spec.ts
│       ├── BasicHead.performance.spec.ts
│       └── composables/
│           ├── useHeadSearch.spec.ts
│           ├── useHeadActions.spec.ts
│           ├── useHeadPermissions.spec.ts
│           └── useHeadNotifications.spec.ts
```

---

## Implementation Order

### Phase 2: Component Splitting (Day 3-5)

**Day 3**:
1. Create directory structure
2. Create HeadSearch.vue (simpler, good starting point)
3. Test HeadSearch in isolation

**Day 4**:
1. Create HeadToolbar.vue (most complex sub-component)
2. Create HeadUser.vue (simple)
3. Test both components

**Day 5**:
1. Create HeadNotifications.vue
2. Create main BasicHead.vue (orchestrator)
3. Integration test

### Phase 3: Composables (Day 6-8)

**Day 6**:
1. Create useHeadSearch.ts
2. Integrate with HeadSearch.vue
3. Test MiniSearch functionality

**Day 7**:
1. Create useHeadActions.ts
2. Create useHeadPermissions.ts
3. Integrate with HeadToolbar.vue

**Day 8**:
1. Create useHeadNotifications.ts
2. Integrate with HeadNotifications.vue
3. Test all composables

### Phase 4: Testing (Day 9-12)

**Day 9-10**: Unit tests for all components
**Day 11**: Integration tests
**Day 12**: Performance tests + documentation

---

## Success Criteria

- [ ] 4+ sub-components created
- [ ] 4 composables extracted
- [ ] All use Composition API
- [ ] All TypeScript typed
- [ ] Test coverage >80%
- [ ] Search performance <100ms
- [ ] No visual regressions
- [ ] All actions working
- [ ] Permissions working
- [ ] Notifications working

---

## Next Steps

1. ✅ Architecture design complete
2. **Create directory structure**
3. **Start Phase 2: Component Splitting**
4. **Begin with HeadSearch.vue**
5. **Extract composables in Phase 3**
6. **Write comprehensive tests in Phase 4**

---

**Status**: Ready for Phase 2 implementation
