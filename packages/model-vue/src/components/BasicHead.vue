<template>
  <v-app-bar app class="vxg-app-bar">
    <!-- Left: Navigation controls (drawer expand) -->
    <HeadNavigation
      :drawer-open="drawerOpen"
      :show-expand-side="tool.expandSide?.active || false"
      show-expand-main-false
      @toggle-drawer="openDrawer"
    />

    <!-- Toolbar: Select + Action buttons -->
    <HeadToolbar
      v-model="select"
      :select-items="selectItems"
      :select-label="tool.select?.title || ''"
      :item-name="itemName"
      :show-select="show('select') && (tool.select?.active || false)"
      :show-add="show('add') && (tool.add?.active || false)"
      :show-remove="show('remove') && (tool.remove?.active || false)"
      @add="addItem"
      @remove="removeItem"
    />

    <!-- Search -->
    <HeadSearch
      ref="searchRef"
      v-model="search"
      :items="tagItems"
      placeholder="Search"
      :custom-filter="customFilter"
      @keydown="handleSearchChange"
      @clear="handleSearchClear"
      @change="handleSearchSelect"
      @filter="toggleFilter"
    />

    <!-- Spacer -->
    <v-spacer v-if="tool.avatar?.active || tool.expandMain?.active" />

    <!-- Right: User icon -->
    <HeadUser
      :show="tool.avatar?.active || false"
      @click="handleAvatarClick"
    />

    <!-- Right: Navigation controls (detail collapse) -->
    <HeadNavigation
      :detail-open="detailOpen"
      show-expand-side-false
      :show-expand-main="tool.expandMain?.active || false"
      @toggle-detail="closeDetail"
    />

    <!-- Right: Utility buttons -->
    <HeadUtilities
      :show-print="show('print')"
      :show-bookmark="show('bookmark')"
      :show-collect="show('collect')"
      :print-disabled="tool.print?.disabled || false"
      :bookmark-visible="bookmarkVisible"
      :bookmark-active="bookmarkActive"
      @print="print"
      @bookmark="showTags"
      @collect="collect"
    />
  </v-app-bar>
</template>

<script setup lang="ts">
/**
 * BasicHead Component
 * 
 * Main application header/toolbar with:
 * - Navigation controls (drawer/detail panel toggles)
 * - Entity selector dropdown
 * - Action buttons (add/remove)
 * - Search with MiniSearch integration
 * - User menu
 * - Utility actions (print/bookmark/collect)
 * 
 * Migrated from Vue 2 Options API to Vue 3 Composition API.
 * Split into 5 sub-components with 5 composables for maintainability.
 * 
 * @component
 */

import { ref, computed, watch, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

// Sub-components
import HeadNavigation from './head/HeadNavigation.vue'
import HeadToolbar from './head/HeadToolbar.vue'
import HeadSearch from './head/HeadSearch.vue'
import HeadUser from './head/HeadUser.vue'
import HeadUtilities from './head/HeadUtilities.vue'

// Composables
import { useHeadSearch } from '../composables/useHeadSearch'
import { useHeadActions } from '../composables/useHeadActions'
import { useHeadPermissions } from '../composables/useHeadPermissions'
import { useHeadNavigation } from '../composables/useHeadNavigation'
import { useHeadConfig } from '../composables/useHeadConfig'

// ============================================================================
// Props
// ============================================================================

interface Props {
  logo?: string
}

const props = withDefaults(defineProps<Props>(), {
  logo: ''
})

// ============================================================================
// Emits
// ============================================================================

interface Emits {
  (e: 'action', name: string): void
}

const emit = defineEmits<Emits>()

// ============================================================================
// Composition
// ============================================================================

const store = useStore()
const router = useRouter()
const route = useRoute()

// Access Vue instance for $seneca and $model
const instance = getCurrentInstance()
const seneca = instance?.proxy?.$seneca
const model = instance?.proxy?.$model
const senecaUtil = instance?.proxy?.$main?.seneca?.util

// Navigation composable
const {
  drawerOpen,
  detailOpen,
  openDrawer,
  closeDetail
} = useHeadNavigation(store)

// Config composable
const {
  tool,
  itemName,
  select,
  selectItems
} = useHeadConfig(store, route, model, senecaUtil)

// Search composable
const {
  search,
  tagItems,
  items,
  customFilter,
  handleSearchChange: performSearchChange,
  handleSearchSelect: performSearchSelect,
  initializeAssetLoading,
  cleanup: cleanupSearch
} = useHeadSearch(store, router, route, seneca, model)

// Actions composable
const {
  addItem,
  removeItem,
  print,
  collect,
  showTags,
  toggleFilter
} = useHeadActions(store)

// Permissions composable
const {
  show,
  allow,
  bookmarkVisible,
  bookmarkActive
} = useHeadPermissions(store)

// ============================================================================
// Refs
// ============================================================================

const searchRef = ref()

// ============================================================================
// Event Handlers
// ============================================================================

/**
 * Handle search input change
 * Forwards to composable with proper event wrapping
 */
const handleSearchChange = (event: KeyboardEvent): void => {
  // Create synthetic event compatible with original implementation
  const syntheticEvent = {
    target: event.target
  } as Event
  
  performSearchChange(syntheticEvent)
}

/**
 * Handle search clear button
 */
const handleSearchClear = (): void => {
  search.value = ''
  
  // Create synthetic event for clear
  const syntheticEvent = {
    target: { value: '' }
  } as Event
  
  performSearchChange(syntheticEvent)
}

/**
 * Handle search selection from dropdown
 */
const handleSearchSelect = (value: string): void => {
  performSearchSelect(value)
}

/**
 * Handle avatar/user icon click
 */
const handleAvatarClick = (): void => {
  emit('action', 'avatar')
}

// ============================================================================
// Route Watcher
// ============================================================================

/**
 * Watch for route changes to handle search clearing and dropdown closing
 * Implements DESKTOP-771 fix for preserving search in specific contexts
 */
watch(
  () => route.name,
  (routeName) => {
    if (routeName) {
      // Always blur and close dropdown when route changes
      if (searchRef.value) {
        searchRef.value.blur()
        
        // Close dropdown after DOM updates
        setTimeout(() => {
          if (searchRef.value) {
            searchRef.value.closeMenu()
          }
        }, 50)
      }

      // DESKTOP-771: Don't clear search when in specific modes
      const preserveSearch = route.query.mode === 'assetsearch' ||
        (route.name === 'admin' && route.query.tab === 'assets')
      
      if (!preserveSearch) {
        // Clear search when switching routes
        search.value = ''
        store.state.trigger.search.term = ''
        
        if (searchRef.value) {
          searchRef.value.reset()
        }
        
        // Reset tag_items to show all items
        if (items.value && items.value.length > 0) {
          const tagAlias = (asset: any): string | null => {
            if (!asset || !asset.tag) return null
            return asset.custom12 != null 
              ? `${asset.tag}(${asset.custom12})`
              : asset.tag
          }
          
          tagItems.value = items.value
            .map(tagAlias)
            .filter((item): item is string => item !== null)
        }
      }
    }
  }
)

/**
 * Watch for external search term changes
 * Resets search input when cleared externally
 */
watch(
  () => store.state.trigger?.search?.term,
  (term: string) => {
    if (term === '' && searchRef.value) {
      searchRef.value.reset()
    }
  }
)

// ============================================================================
// Lifecycle
// ============================================================================

onMounted(() => {
  // Initialize asset loading with MiniSearch
  initializeAssetLoading()
})

onUnmounted(() => {
  // Cleanup intervals and timeouts
  cleanupSearch()
})
</script>

<style lang="scss" scoped>
.vxg-app-bar {
  height: 64px;
  background-color: white;
  margin-left: 25px;
}
</style>
