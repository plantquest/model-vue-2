/**
 * useHeadSync Composable
 * Manages synchronization between select, search, and store
 */

import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

/**
 * Tag alias helper
 */
function tagAlias(asset: any): string | null {
  if (!asset || !asset.tag) return null
  if (asset.custom12 != null) {
    return asset.tag + '(' + asset.custom12 + ')'
  }
  return asset.tag
}

/**
 * Composable for BasicHead synchronization
 */
export function useHeadSync(
  searchRef: any,
  items: any,
  tagItems: any,
  updateToolForRoute: (routeName: string) => void,
  defaults: () => string,
  clearSearch: () => void
) {
  const store = useStore()
  const route = useRoute()
  
  // Select state
  const select = ref('')
  
  /**
   * Watch select changes and dispatch to store
   */
  watch(select, (value) => {
    store.dispatch('trigger_select', { value })
  })
  
  /**
   * Watch store trigger.select.value and sync to local
   */
  watch(
    () => store.state.trigger?.select?.value,
    (val) => {
      select.value = val
    }
  )
  
  /**
   * Watch for permission changes and force update
   */
  watch(
    () => store.state.vxg?.cmp?.BasicHead?.allow?.add,
    () => {
      // In Vue 3, reactivity handles updates automatically
      // No need for $forceUpdate()
    }
  )
  
  watch(
    () => store.state.vxg?.cmp?.BasicHead?.allow?.remove,
    () => {
      // In Vue 3, reactivity handles updates automatically
    }
  )
  
  /**
   * Watch route name changes
   */
  watch(
    () => route.name,
    (val) => {
      const name = route.name as string
      
      // Update tool configuration for new route
      updateToolForRoute(name)
      
      // Check if we should preserve search
      const preserveSearch = route && (
        route.query.mode === 'assetsearch' ||
        (route.name === 'admin' && route.query.tab === 'assets')
      )
      
      if (!preserveSearch) {
        // Clear search when switching routes
        clearSearch()
        store.state.trigger.search.term = ''
        
        if (searchRef.value) {
          searchRef.value.reset()
        }
        
        // Reset tag_items to show all items
        if (items.value && items.value.length > 0) {
          tagItems.value = items.value
            .map(tagAlias)
            .filter((item: string | null) => item !== null)
        }
      }
      
      // Reset to defaults
      select.value = defaults()
    },
    { immediate: true }
  )
  
  return {
    select
  }
}
