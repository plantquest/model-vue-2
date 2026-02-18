/**
 * useSide Composable
 * Manages sidebar drawer state and visibility
 */

import { ref, computed } from 'vue'
import { useStore } from 'vuex'

/**
 * Composable for BasicSide drawer management
 */
export function useSide() {
  const store = useStore()
  
  // Computed drawer state from Vuex
  const isOpen = computed({
    get: () => store.state.vxg?.cmp?.BasicSide?.show ?? false,
    set: (value: boolean) => {
      store.dispatch('set_cmp_flags', {
        name: 'BasicSide',
        flags: { show: value }
      })
    }
  })
  
  const content = computed(() => store.state.vxg?.cmp?.BasicSide?.content ?? null)
  
  const width = computed(() => store.state.vxg?.cmp?.BasicSide?.width ?? 282)
  
  /**
   * Open the sidebar
   */
  const open = () => {
    isOpen.value = true
  }
  
  /**
   * Close the sidebar
   */
  const close = () => {
    isOpen.value = false
  }
  
  /**
   * Toggle sidebar open/close
   */
  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  
  /**
   * Set sidebar content
   */
  const setContent = (newContent: any) => {
    store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { content: newContent }
    })
  }
  
  return {
    isOpen,
    content,
    width,
    open,
    close,
    toggle,
    setContent
  }
}

/**
 * useSideSearch Composable
 * Manages search functionality for BasicSide
 */
export function useSideSearch() {
  const store = useStore()
  
  // Search state
  const search = ref('')
  const search2 = ref('')
  const showSearch2 = ref(false)
  
  // Search results
  const tagItems = ref<any[]>([])
  const tagItems2 = ref<any[]>([])
  
  // Data items
  const items = ref<any[]>([])
  const items2 = ref<any[]>([])
  
  /**
   * Toggle second search box (navigation mode)
   */
  const toggleSearch2 = () => {
    showSearch2.value = !showSearch2.value
    store.commit('toggleSearch2')
  }
  
  /**
   * Clear all filters and search
   */
  const clearFilter = () => {
    search.value = ''
    search2.value = ''
    showSearch2.value = false
    tagItems.value = []
    tagItems2.value = []
    
    store.commit('clear_path_data')
    store.commit('clearMatchingConnectorData')
    store.dispatch('trigger_clear')
  }
  
  /**
   * Reverse search inputs (swap search and search2)
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
   * Load assets from store or API
   */
  const loadAssets = async (): Promise<any[]> => {
    // Try to get assets from store first
    if (store.state.main_asset && store.state.main_asset.length > 0) {
      items.value = [...store.state.main_asset]
      return store.state.main_asset
    }
    
    // Otherwise load from API
    const seneca = (window as any).$seneca
    if (seneca) {
      try {
        const result = await seneca.post('sys:asset,cmd:list', {})
        if (result && result.assets) {
          items.value = result.assets
          return result.assets
        }
      } catch (error) {
        console.error('Error loading assets:', error)
      }
    }
    
    return []
  }
  
  /**
   * Perform asset search
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
    clearFilter,
    reverseInputs,
    loadAssets,
    searchAssets
  }
}
