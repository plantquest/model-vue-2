<template>
  <v-app-bar app class="vxg-app-bar">
    <!-- Entity Name -->
    <h2 style="margin-left: 10px;">{{ itemName }}</h2>
    
    <!-- Select Dropdown -->
    <HeadSelect
      v-model="select"
      :items="selectItems"
      :tool="tool"
      :show="showSelect"
    />
    
    <!-- Main Toolbar Actions -->
    <HeadToolbar
      :tool="tool"
      :drawer-open="drawerOpen"
      :item-name="itemName"
      :bookmark-visible="bookmarkVisible"
      :show="show"
      :show-add="showAdd"
      :show-remove="showRemove"
      :show-print="showPrint"
      :show-bookmark="showBookmark"
      @open-drawer="openDrawer"
      @add-item="addItem"
      @remove-item="removeItem"
      @print="print"
      @show-tags="showTags"
      @collect="collect"
    />
    
    <!-- Search -->
    <HeadSearch
      ref="searchComponentRef"
      v-model="search"
      :items="tagItems"
      :show-icon="showIcon"
      :custom-filter="customFilter"
      @keydown="changeSearch"
      @clear="changeSearch"
      @change="handleChangeSearch"
      @click="handleClick"
      @blur="handleBlur"
      @click-append="toggleFilter"
    />
    
    <v-spacer
      v-if="tool.avatar?.active || tool.expandMain?.active"
    />
    
    <!-- Avatar Icon -->
    <v-icon
      v-if="tool.avatar?.active"
      large
      @click="action('avatar')"
      style="display:inline-block;"
      light
    >
      mdi-account
    </v-icon>
    
    <!-- Detail Close -->
    <v-divider
      v-if="!detailOpen && tool.expandMain?.active"
      vertical
      style="margin:0px 16px;"
    />
    
    <v-icon
      v-if="!detailOpen && tool.expandMain?.active"
      large
      @click="closeDetail"
      style="display:inline-block;"
      light
    >
      mdi-chevron-left
    </v-icon>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useHeadSearch } from '@/composables/useHeadSearch'
import { useHeadActions } from '@/composables/useHeadActions'
import { useHeadPermissions } from '@/composables/useHeadPermissions'
import { useHeadState } from '@/composables/useHeadState'
import { useHeadSync } from '@/composables/useHeadSync'
import HeadToolbar from './HeadToolbar.vue'
import HeadSearch from './HeadSearch.vue'
import HeadSelect from './HeadSelect.vue'

/**
 * BasicHead Props
 */
interface Props {
  /** Logo HTML or image URL */
  logo?: string
}

const props = withDefaults(defineProps<Props>(), {
  logo: ''
})

/**
 * Component emits
 */
const emit = defineEmits<{
  /** Emitted when an action occurs */
  action: [name: string]
}>()

// Template refs
const searchComponentRef = ref()

// Composables
const {
  search,
  items,
  tagItems,
  showIcon,
  changeSearch,
  handleChangeSearch,
  customFilter,
  handleClick,
  handleBlur,
  clearSearch,
  loadAssets
} = useHeadSearch()

const {
  addItem: addItemAction,
  addMobileAsset,
  removeItem: removeItemAction,
  filterAssets,
  clearFilter,
  toggleFilter: toggleFilterAction,
  print: printAction,
  collect: collectAction,
  showTags: showTagsAction,
  openDrawer: openDrawerAction,
  closeDetail: closeDetailAction
} = useHeadActions()

const {
  allow,
  show,
  showAdd,
  showRemove,
  showPrint,
  showBookmark,
  showSelect
} = useHeadPermissions()

const {
  view,
  filterDisabled,
  filterIcon,
  bookmarkVisible,
  bookmark,
  drawerOpen,
  detailOpen,
  itemName,
  tool,
  searchConfig,
  updateToolForRoute,
  defaults
} = useHeadState()

const { select } = useHeadSync(
  searchComponentRef,
  items,
  tagItems,
  updateToolForRoute,
  defaults,
  clearSearch
)

// Local computed
const selectItems = computed(() => {
  const selectTool = tool.value.select
  if (!selectTool?.items) return []
  
  return Object.entries(selectTool.items).map(([value, data]: [string, any]) => ({
    value,
    text: data.title
  }))
})

// Action handlers (wrapper functions for emit + composable calls)
const addItem = () => {
  addItemAction()
}

const removeItem = () => {
  removeItemAction()
}

const print = () => {
  printAction()
}

const showTags = () => {
  showTagsAction()
}

const collect = () => {
  collectAction()
}

const openDrawer = () => {
  openDrawerAction()
}

const closeDetail = () => {
  closeDetailAction()
}

const toggleFilter = () => {
  toggleFilterAction()
}

const action = (name: string) => {
  emit('action', name)
}

// Lifecycle
onMounted(async () => {
  console.log('BasicHead mounted')
  
  // Load assets on mount
  await loadAssets()
})

// Expose methods for external access
defineExpose({
  search,
  select,
  clearSearch,
  allow,
  show
})
</script>

<style lang="scss" scoped>
.vxg-app-bar {
  /* Styles from original BasicHead */
}

.vxg-head-btn {
  text-transform: none;
}

.vxg-icon {
  color: rgb(var(--vxg-ct2, #666));
}

:deep(.v-toolbar__content) {
  padding: 4px 16px;
}
</style>
