/**
 * Side Drawer Composable
 * Provides side drawer state and methods for Vue 3 Composition API
 */
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

export interface NavItem {
  code: string
  title: string
  icon: string
  route: string
  allow?: any
  [key: string]: any
}

/**
 * Composable for side drawer logic
 * Manages drawer state, navigation, and responsive behavior
 */
export function useSide() {
  const store = useStore()

  /**
   * Check if drawer is open
   */
  const isOpen = computed(() => {
    return store.state.vxg?.cmp?.BasicSide?.show || false
  })

  /**
   * Get drawer content
   */
  const content = computed(() => {
    return store.state.vxg?.cmp?.BasicSide?.content || null
  })

  /**
   * Toggle drawer open/close
   * @param value - Optional explicit value (true/false)
   */
  const toggle = (value?: boolean) => {
    const newValue = value !== undefined ? value : !isOpen.value
    return store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { show: newValue }
    })
  }

  /**
   * Open drawer
   */
  const open = () => {
    return toggle(true)
  }

  /**
   * Close drawer
   */
  const close = () => {
    return toggle(false)
  }

  /**
   * Set drawer content
   * @param newContent - Content to display in drawer
   */
  const setContent = (newContent: any) => {
    return store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { content: newContent }
    })
  }

  /**
   * Handle window resize
   * Closes drawer on mobile devices
   */
  const handleResize = () => {
    const width = window.innerWidth
    if (width < 960) {
      close()
    }
  }

  /**
   * Setup resize listener
   */
  const setupResize = () => {
    window.addEventListener('resize', handleResize)
    handleResize() // Call once on mount
  }

  /**
   * Cleanup resize listener
   */
  const cleanupResize = () => {
    window.removeEventListener('resize', handleResize)
  }

  return {
    isOpen,
    content,
    toggle,
    open,
    close,
    setContent,
    handleResize,
    setupResize,
    cleanupResize
  }
}

/**
 * Composable for side drawer search functionality
 */
export function useSideSearch() {
  const store = useStore()

  // Search state
  const search = ref('')
  const search2 = ref('')
  const showSearch2 = computed(() => store.state.showSearch2 || false)
  const tagItems = ref<string[]>([])
  const tagItems2 = ref<string[]>([])
  const items = ref<any[]>([])
  const items2 = ref<any[]>([])

  /**
   * Toggle navigation search mode
   */
  const toggleSearch2 = () => {
    store.commit('toggleSearch2')
  }

  /**
   * Clear search filters
   */
  const clearFilter = () => {
    store.dispatch('vxg_trigger_clear')
    search.value = ''
    search2.value = ''
    store.state.trigger.search.a = ''
    store.state.trigger.search.b = ''
    store.dispatch('setLastTrackedSearch', null)
    store.state.showSearch2 = false
    store.commit('clear_path_data')
    store.state.showExpansion = true
    store.commit('clearMatchingConnectorData')
    store.dispatch('clear_path_data')
  }

  /**
   * Reverse search inputs (swap source and destination)
   */
  const reverseInputs = () => {
    const temp = search.value
    search.value = search2.value
    search2.value = temp
    
    if (!showSearch2.value) {
      toggleSearch2()
    }
  }

  /**
   * Load assets for search
   */
  const loadAssets = async () => {
    const tool: any = {}
    await store.dispatch('vxg_get_assets', tool)
    items.value = tool.assets || []
    return items.value
  }

  return {
    search,
    search2,
    showSearch2,
    tagItems,
    tagItems2,
    items,
    items2,
    toggleSearch2,
    clearFilter,
    reverseInputs,
    loadAssets
  }
}
