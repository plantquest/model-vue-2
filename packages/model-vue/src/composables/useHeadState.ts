/**
 * useHeadState Composable
 * Manages computed state for BasicHead component
 */

import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

/**
 * Composable for BasicHead state management
 */
export function useHeadState() {
  const store = useStore()
  const route = useRoute()
  
  // Local view state
  const view = ref<any>({
    tool: {}
  })
  
  /**
   * Computed properties from store
   */
  const filterDisabled = computed(() => 
    store.state.trigger?.filter_disabled?.value ?? false
  )
  
  const filterIcon = computed(() => 
    store.state.vxg?.cmp?.BasicHead?.show?.filter ?? false
  )
  
  const bookmarkVisible = computed(() => 
    store.state.trigger?.bookmark?.visible ?? false
  )
  
  const bookmark = computed(() => 
    store.state.trigger?.bookmark?.value ?? false
  )
  
  const drawerOpen = computed(() => 
    store.state.vxg?.cmp?.BasicSide?.show ?? false
  )
  
  const detailOpen = computed(() => 
    !(store.state.vxg?.cmp?.BasicMain?.show ?? true)
  )
  
  const itemName = computed(() => 
    store.state.vxg?.ent?.meta?.name || 'Item'
  )
  
  /**
   * Tool configuration (merged headtool + viewtool)
   */
  const tool = computed(() => {
    const model = (window as any).$model
    if (!model) return {}
    
    const headtool = model.main?.app?.web?.parts?.head?.tool || {}
    const viewtool = view.value.tool || {}
    
    // Deep merge (using Seneca util if available, otherwise shallow merge)
    const seneca = (window as any).$main?.seneca
    if (seneca?.util?.deep) {
      return seneca.util.deep(headtool, viewtool)
    }
    
    // Fallback to shallow merge
    return { ...headtool, ...viewtool }
  })
  
  /**
   * Search configuration from model
   */
  const searchConfig = computed(() => {
    const model = (window as any).$model
    return model?.main?.ux?.custom?.search_config || {}
  })
  
  /**
   * Update tool based on route
   */
  const updateToolForRoute = (routeName: string) => {
    const model = (window as any).$model
    if (!model) return
    
    const routeView = model.main?.app?.web?.view?.[routeName]
    if (routeView?.head) {
      view.value.tool = routeView.head.tool || {}
    }
  }
  
  /**
   * Reset to defaults
   */
  const defaults = () => {
    if (tool.value.select?.active) {
      return tool.value.select.initial || ''
    }
    return ''
  }
  
  return {
    // Local state
    view,
    
    // Computed from store
    filterDisabled,
    filterIcon,
    bookmarkVisible,
    bookmark,
    drawerOpen,
    detailOpen,
    itemName,
    tool,
    searchConfig,
    
    // Methods
    updateToolForRoute,
    defaults
  }
}
