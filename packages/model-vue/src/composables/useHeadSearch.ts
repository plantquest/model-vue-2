/**
 * useHeadSearch Composable
 * Manages search functionality for BasicHead component
 */

import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

/**
 * Tag alias helper - adds custom12 field to tag display
 */
function tagAlias(asset: any): string | null {
  if (!asset || !asset.tag) {
    return null
  }
  
  if (asset.custom12 != null) {
    return asset.tag + '(' + asset.custom12 + ')'
  }
  return asset.tag
}

/**
 * Composable for BasicHead search functionality
 */
export function useHeadSearch() {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  
  // Search state
  const search = ref('')
  const items = ref<any[]>([])
  const tagItems = ref<string[]>([])
  const showIcon = ref(true)
  
  /**
   * Setup MiniSearch index with assets
   */
  const setupMiniSearch = async (assets: any[]) => {
    const seneca = (window as any).$seneca
    if (!seneca) {
      console.warn('Seneca not available for search setup')
      return
    }
    
    for (const item of assets) {
      await seneca.post('sys:search,cmd:add', { doc: item })
    }
    
    console.log('MiniSearch setup complete with', assets.length, 'assets')
  }
  
  /**
   * Perform search via Seneca
   */
  const performSearch = async (term: string, searchConfig: any) => {
    try {
      if (term) {
        const seneca = (window as any).$seneca
        if (!seneca) {
          console.warn('Seneca not available for search')
          return
        }
        
        const out = await seneca.post('sys:search,cmd:search', {
          query: term,
          params: searchConfig
        })
        
        // Filter out null values after mapping
        tagItems.value = out.data.hits
          .map((v: any) => tagAlias(v.doc))
          .filter((item: string | null) => item !== null) as string[]
          
        console.log('Search results:', tagItems.value.length, 'items')
      } else {
        // Show all items when search is empty
        if (items.value && items.value.length > 0) {
          tagItems.value = items.value
            .map(tagAlias)
            .filter((item: string | null) => item !== null) as string[]
        }
      }
    } catch (error) {
      console.error('Search error:', error)
      tagItems.value = []
    }
  }
  
  /**
   * Handle search input changes (debounced)
   */
  const changeSearch = async (event: any, searchConfig: any) => {
    setTimeout(async () => {
      const term = event.target ? event.target.value : null
      
      console.log('searching.. term', term)
      
      // Update store properties for component integration
      store.state.trigger.search.term = term || ''  // For BasicLed data table
      store.state.trigger.search.a = term || ''     // For BasicSide search 1
      
      // Perform search for autocomplete
      await performSearch(term, searchConfig)
      
      // Skip URL navigation if other modes active
      if (
        route.query.mode === 'assetsearch' ||
        route.query.mode === 'filtersearch' ||
        route.query.mode === 'route'
      ) {
        return
      }
      
      // Update URL with search mode
      if (term) {
        router.push({
          path: route.path,
          query: {
            mode: 'headsearch',
            term: term
          }
        }).catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            console.error('Router navigation error:', err)
          }
        })
      } else {
        // Clear search by removing query parameters
        router.push({
          path: route.path,
          query: {}
        }).catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            console.error('Router navigation error:', err)
          }
        })
      }
    }, 11)  // 11ms debounce
  }
  
  /**
   * Handle search change event
   */
  const handleChangeSearch = (event: any) => {
    console.log('handleChangeSearch called with:', search.value)
    // Update both store states for component integration
    store.state.trigger.search.term = search.value || ''  // For BasicLed
    store.state.trigger.search.a = search.value || ''     // For BasicSide search 1
  }
  
  /**
   * Custom filter for combobox autosuggest
   */
  const customFilter = (item: any, queryText: string, itemText: string): boolean => {
    if (!queryText) return true
    
    // Filter items that contain the query text (case insensitive)
    const searchText = queryText.toLowerCase()
    const itemContent = (item || '').toLowerCase()
    
    return itemContent.includes(searchText)
  }
  
  /**
   * Handle search icon visibility
   */
  const handleClick = () => {
    showIcon.value = false
  }
  
  const handleBlur = () => {
    showIcon.value = true
  }
  
  /**
   * Clear search
   */
  const clearSearch = () => {
    search.value = ''
    if (items.value && items.value.length > 0) {
      tagItems.value = items.value
        .map(tagAlias)
        .filter((item: string | null) => item !== null) as string[]
    }
  }
  
  /**
   * Load assets from store
   */
  const loadAssets = async (): Promise<any[]> => {
    const tool: any = {}
    await store.dispatch('vxg_get_assets', tool)
    items.value = tool.assets || []
    
    if (items.value.length > 0) {
      tagItems.value = items.value
        .map(tagAlias)
        .filter((item: string | null) => item !== null) as string[]
      
      await setupMiniSearch(items.value)
    }
    
    return items.value
  }
  
  // Watch for trigger.search.term to reset
  watch(
    () => store.state.trigger?.search?.term,
    (term) => {
      if (term === '') {
        clearSearch()
      }
    }
  )
  
  return {
    search,
    items,
    tagItems,
    showIcon,
    setupMiniSearch,
    performSearch,
    changeSearch,
    handleChangeSearch,
    customFilter,
    handleClick,
    handleBlur,
    clearSearch,
    loadAssets
  }
}
