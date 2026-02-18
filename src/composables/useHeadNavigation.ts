/**
 * useHeadNavigation Composable
 * 
 * Handles navigation controls for BasicHead component including:
 * - Side drawer (BasicSide) toggle
 * - Detail panel (BasicMain) toggle
 * 
 * Integrates with Vuex to manage component visibility flags.
 * 
 * @module composables/useHeadNavigation
 */

import { computed, type ComputedRef } from 'vue'
import type { Store } from 'vuex'

/**
 * Return type for useHeadNavigation composable
 */
export interface UseHeadNavigationReturn {
  /** Whether side drawer is currently open */
  drawerOpen: ComputedRef<boolean>
  /** Whether detail panel is currently open */
  detailOpen: ComputedRef<boolean>
  /** Open the side drawer */
  openDrawer: () => void
  /** Close the detail panel */
  closeDetail: () => void
}

/**
 * useHeadNavigation Composable
 * 
 * Provides navigation state and controls for BasicHead toolbar.
 * Manages visibility of side drawer and detail panel through Vuex actions.
 * 
 * @param store - Vuex store instance
 * @returns Navigation state and control methods
 * 
 * @example
 * ```typescript
 * const { drawerOpen, openDrawer, closeDetail } = useHeadNavigation(store)
 * 
 * if (!drawerOpen.value) {
 *   openDrawer()  // Opens BasicSide drawer
 * }
 * ```
 */
export function useHeadNavigation(store: Store<any>): UseHeadNavigationReturn {
  
  // ============================================================================
  // Computed State
  // ============================================================================
  
  /**
   * Whether side drawer (BasicSide) is currently open
   * Reactive computed from Vuex state
   */
  const drawerOpen = computed<boolean>(() => {
    return store.state.vxg?.cmp?.BasicSide?.show || false
  })
  
  /**
   * Whether detail panel (BasicMain) is currently open
   * Note: Inverted logic - BasicMain.show = false means detail IS open
   */
  const detailOpen = computed<boolean>(() => {
    return !store.state.vxg?.cmp?.BasicMain?.show
  })
  
  // ============================================================================
  // Navigation Controls
  // ============================================================================
  
  /**
   * Open the side drawer (BasicSide)
   * Dispatches Vuex action to set component flags
   */
  const openDrawer = (): void => {
    store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { show: true }
    })
      .catch((error: Error) => {
        console.error('[useHeadNavigation] Open drawer error:', error)
      })
  }
  
  /**
   * Close the detail panel (BasicMain)
   * Dispatches Vuex action to set component flags
   */
  const closeDetail = (): void => {
    store.dispatch('set_cmp_flags', {
      name: 'BasicMain',
      flags: { show: false }
    })
      .catch((error: Error) => {
        console.error('[useHeadNavigation] Close detail error:', error)
      })
  }
  
  return {
    drawerOpen,
    detailOpen,
    openDrawer,
    closeDetail
  }
}
