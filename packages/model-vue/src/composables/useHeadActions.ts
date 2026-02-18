/**
 * useHeadActions Composable
 * Manages action dispatches for BasicHead component
 */

import { useStore } from 'vuex'

/**
 * Composable for BasicHead actions
 */
export function useHeadActions() {
  const store = useStore()
  
  /**
   * CRUD Actions
   */
  const addItem = () => {
    store.dispatch('trigger_led_add')
  }
  
  const addMobileAsset = () => {
    store.dispatch('trigger_led_add_mobile')
  }
  
  const removeItem = () => {
    store.dispatch('trigger_led_remove')
  }
  
  /**
   * Filter Actions
   */
  const filterAssets = () => {
    store.dispatch('vxg_trigger_go')
  }
  
  const clearFilter = () => {
    store.dispatch('vxg_trigger_clear')
  }
  
  const toggleFilter = () => {
    store.dispatch('trigger_toggle_filter')
  }
  
  /**
   * Utility Actions
   */
  const print = () => {
    store.dispatch('vxg_trigger_printMap')
  }
  
  const collect = () => {
    store.dispatch('vxg_trigger_collect')
  }
  
  const showTags = () => {
    console.log('showTags triggered')
    store.dispatch('adjust_trigger_bookmark')
  }
  
  /**
   * Drawer Actions
   */
  const openDrawer = () => {
    store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { show: true }
    })
  }
  
  const closeDetail = () => {
    store.dispatch('set_cmp_flags', {
      name: 'BasicMain',
      flags: { show: false }
    })
  }
  
  /**
   * Get asset tags
   */
  const getTags = (): string[] => {
    const tool: any = {}
    store.dispatch('vxg_get_assets', tool)
    return tool.assets?.map((v: any) => v.tag) || []
  }
  
  return {
    // CRUD
    addItem,
    addMobileAsset,
    removeItem,
    
    // Filter
    filterAssets,
    clearFilter,
    toggleFilter,
    
    // Utility
    print,
    collect,
    showTags,
    getTags,
    
    // Drawer
    openDrawer,
    closeDetail
  }
}
