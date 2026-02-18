/**
 * useSide composable - Side drawer state management
 * Handles side drawer visibility and content
 */

import { ref, computed } from 'vue'
import { useStore } from 'vuex'

/**
 * useSide composable
 *
 * Provides side drawer state and methods:
 * - isOpen: reactive boolean for drawer state
 * - content: reactive drawer content
 * - toggle: method to toggle drawer
 * - open: method to open drawer
 * - close: method to close drawer
 * - setContent: method to set drawer content
 * - handleResize: method to handle window resize
 *
 * @returns Side drawer state and methods
 */
export function useSide() {
  const store = useStore()

  /**
   * Check if drawer is open
   */
  const isOpen = computed<boolean>(() =>
    store.state.vxg?.cmp?.BasicSide?.show || false
  )

  /**
   * Get drawer content
   */
  const content = computed<any>(() =>
    store.state.vxg?.cmp?.BasicSide?.content || null
  )

  /**
   * Get drawer width
   */
  const width = computed(() => store.state.vxg?.cmp?.BasicSide?.width ?? 282)

  /**
   * Toggle drawer open/close
   *
   * @param show - Optional boolean to set specific state
   * @returns Promise that resolves when toggle completes
   */
  const toggle = (show?: boolean) => {
    const newShow = show !== undefined ? show : !isOpen.value
    return store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { show: newShow }
    })
  }

  /**
   * Open drawer
   *
   * @returns Promise that resolves when drawer is opened
   */
  const open = () => {
    return store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { show: true }
    })
  }

  /**
   * Close drawer
   *
   * @returns Promise that resolves when drawer is closed
   */
  const close = () => {
    return store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { show: false }
    })
  }

  /**
   * Set drawer content
   *
   * @param newContent - Content to display in drawer
   * @returns Promise that resolves when content is set
   */
  const setContent = (newContent: any) => {
    return store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { content: newContent }
    })
  }

  /**
   * Handle window resize - close drawer on mobile
   */
  const handleResize = () => {
    const isMobile = window.innerWidth < 960
    if (isMobile && isOpen.value) {
      close()
    }
  }

  return {
    isOpen,
    content,
    width,
    toggle,
    open,
    close,
    setContent,
    handleResize
  }
}

/**
 * useSideSearch composable
 *
 * Provides search state and methods for side drawer:
 * - search: reactive search term (primary)
 * - search2: reactive search term (secondary/navigation)
 * - showSearch2: reactive boolean for navigation mode
 * - tagItems: reactive array of search results
 * - tagItems2: reactive array of secondary search results
 * - items: reactive array of all assets
 * - items2: reactive array of all secondary assets
 * - toggleSearch2: method to toggle navigation mode
 * - clearFilter: method to clear all filters
 * - reverseInputs: method to swap search inputs
 * - loadAssets: method to load assets
 *
 * @returns Search state and methods
 */
export function useSideSearch() {
  const store = useStore()

  // Search state
  const search = ref('')
  const search2 = ref('')
  const tagItems = ref<any[]>([])
  const tagItems2 = ref<any[]>([])
  const items = ref<any[]>([])
  const items2 = ref<any[]>([])

  /**
   * Check if navigation search mode is active
   */
  const showSearch2 = computed<boolean>(() =>
    store.state.showSearch2 || false
  )

  /**
   * Toggle navigation search mode (dual search boxes)
   */
  const toggleSearch2 = () => {
    store.commit('toggleSearch2')
  }

  /**
   * Clear all search filters and reset state
   */
  const clearFilter = () => {
    search.value = ''
    search2.value = ''
    tagItems.value = []
    tagItems2.value = []

    store.dispatch('vxg_trigger_clear')
    store.dispatch('setLastTrackedSearch', null)
    store.dispatch('clear_path_data')
    store.commit('clear_path_data')
    store.commit('clearMatchingConnectorData')

    if (showSearch2.value) {
      store.commit('toggleSearch2')
    }
  }

  /**
   * Reverse/swap the two search inputs
   */
  const reverseInputs = () => {
    const temp = search.value
    search.value = search2.value
    search2.value = temp

    const tempItems = tagItems.value
    tagItems.value = tagItems2.value
    tagItems2.value = tempItems

    const tempData = items.value
    items.value = items2.value
    items2.value = tempData

    store.commit('setReverseTriggered', true)
  }

  /**
   * Load assets from store
   *
   * @returns Promise that resolves with assets array
   */
  const loadAssets = (): Promise<any[]> => {
    return new Promise((resolve) => {
      const tool = {
        assets: []
      }

      store.dispatch('vxg_get_assets', tool)
        .then(() => {
          items.value = tool.assets
          resolve(tool.assets)
        })
        .catch(() => {
          resolve([])
        })
    })
  }

  /**
   * Toggle expansion panel visibility
   */
  const toggleExpansion = () => {
    store.state.showExpansion = !store.state.showExpansion
  }

  /**
   * Perform asset search via Seneca
   */
  const searchAssets = async (term: string, searchConfig: any) => {
    const seneca = (window as any).$seneca
    if (!seneca) return []

    try {
      const out = await seneca.post('sys:search,cmd:search', {
        query: term,
        params: searchConfig
      })

      return out.data?.hits || []
    } catch (error) {
      console.error('Error searching assets:', error)
      return []
    }
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
    toggleExpansion,
    clearFilter,
    reverseInputs,
    loadAssets,
    searchAssets
  }
}
