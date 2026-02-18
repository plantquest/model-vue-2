/**
 * useHeadPermissions Composable
 * Manages permission checks for BasicHead actions
 */

import { computed } from 'vue'
import { useStore } from 'vuex'

/**
 * Composable for BasicHead permissions
 */
export function useHeadPermissions() {
  const store = useStore()
  
  /**
   * Check if action is allowed (permission check)
   * @param action - Action name
   * @returns true if allowed, false if not
   */
  const allow = (action: string): boolean => {
    const allowed = store.state.vxg?.cmp?.BasicHead?.allow?.[action]
    return allowed == null ? true : allowed
  }
  
  /**
   * Check if action should be shown (visibility + permission)
   * @param action - Action name
   * @returns true if should be shown, false if not
   */
  const show = (action: string): boolean => {
    return allow(action) && (store.state.vxg?.cmp?.BasicHead?.show?.[action] ?? false)
  }
  
  /**
   * Get all show flags
   */
  const showFlags = computed(() => store.state.vxg?.cmp?.BasicHead?.show || {})
  
  /**
   * Get all allow flags
   */
  const allowFlags = computed(() => store.state.vxg?.cmp?.BasicHead?.allow || {})
  
  /**
   * Check multiple permissions at once
   */
  const allowMultiple = (actions: string[]): Record<string, boolean> => {
    const result: Record<string, boolean> = {}
    actions.forEach(action => {
      result[action] = allow(action)
    })
    return result
  }
  
  /**
   * Check multiple show conditions at once
   */
  const showMultiple = (actions: string[]): Record<string, boolean> => {
    const result: Record<string, boolean> = {}
    actions.forEach(action => {
      result[action] = show(action)
    })
    return result
  }
  
  /**
   * Computed permissions for common actions
   */
  const canAdd = computed(() => allow('add'))
  const canRemove = computed(() => allow('remove'))
  const canEdit = computed(() => allow('edit'))
  const canSave = computed(() => allow('save'))
  const canPrint = computed(() => allow('print'))
  const canFilter = computed(() => allow('filter'))
  const canClear = computed(() => allow('clear'))
  const canBookmark = computed(() => allow('bookmark'))
  
  /**
   * Computed visibility for common actions
   */
  const showAdd = computed(() => show('add'))
  const showRemove = computed(() => show('remove'))
  const showEdit = computed(() => show('edit'))
  const showSave = computed(() => show('save'))
  const showPrint = computed(() => show('print'))
  const showFilter = computed(() => show('filter'))
  const showClear = computed(() => show('clear'))
  const showBookmark = computed(() => show('bookmark'))
  const showSelect = computed(() => show('select'))
  const showGo = computed(() => show('go'))
  
  return {
    // Core functions
    allow,
    show,
    allowMultiple,
    showMultiple,
    
    // Flags
    showFlags,
    allowFlags,
    
    // Computed permissions
    canAdd,
    canRemove,
    canEdit,
    canSave,
    canPrint,
    canFilter,
    canClear,
    canBookmark,
    
    // Computed visibility
    showAdd,
    showRemove,
    showEdit,
    showSave,
    showPrint,
    showFilter,
    showClear,
    showBookmark,
    showSelect,
    showGo
  }
}
