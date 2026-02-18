/**
 * useHeadActions Composable
 *
 * Provides action handlers for BasicHead component including:
 * - Add/Remove entity actions
 * - Print map action
 * - Collection action
 * - Bookmark/tags toggle
 * - Filter actions
 * - Drawer/detail panel actions
 *
 * All actions are dispatched to Vuex store for centralized state management.
 *
 * @module composables/useHeadActions
 */

import type { Store } from 'vuex'

/**
 * Return type for useHeadActions composable
 */
export interface UseHeadActionsReturn {
  /** Dispatch add item action */
  addItem: () => void
  /** Dispatch add mobile asset action */
  addMobileAsset: () => void
  /** Dispatch remove item action */
  removeItem: () => void
  /** Dispatch print map action */
  print: () => void
  /** Dispatch asset collection action */
  collect: () => void
  /** Dispatch bookmark toggle action */
  showTags: () => void
  /** Dispatch filter assets action (Go button) */
  filterAssets: () => void
  /** Dispatch clear filter action */
  clearFilter: () => void
  /** Dispatch toggle filter visibility action */
  toggleFilter: () => void
  /** Open side drawer */
  openDrawer: () => void
  /** Close detail panel */
  closeDetail: () => void
}

/**
 * useHeadActions Composable
 *
 * Wraps Vuex action dispatches for BasicHead toolbar actions.
 * All methods return void as they trigger Vuex actions that update global state.
 *
 * @param store - Vuex store instance
 * @returns Action handler methods
 *
 * @example
 * ```typescript
 * const { addItem, removeItem, print } = useHeadActions(store)
 *
 * addItem()  // Dispatches 'trigger_led_add'
 * print()    // Dispatches 'vxg_trigger_printMap'
 * ```
 */
export function useHeadActions(store: Store<any>): UseHeadActionsReturn {

  /**
   * Trigger add item dialog
   * Opens the LED (List/Edit/Detail) add dialog for creating new entities
   */
  const addItem = (): void => {
    store.dispatch('trigger_led_add')
      .catch((error: Error) => {
        console.error('[useHeadActions] Add item error:', error)
      })
  }

  /**
   * Trigger add mobile asset dialog
   * Opens dialog specifically for creating mobile assets
   */
  const addMobileAsset = (): void => {
    store.dispatch('trigger_led_add_mobile')
      .catch((error: Error) => {
        console.error('[useHeadActions] Add mobile asset error:', error)
      })
  }

  /**
   * Trigger remove item action
   * Opens the LED remove dialog for deleting entities
   */
  const removeItem = (): void => {
    store.dispatch('trigger_led_remove')
      .catch((error: Error) => {
        console.error('[useHeadActions] Remove item error:', error)
      })
  }

  /**
   * Trigger map print action
   * Initiates printing of the current map view
   */
  const print = (): void => {
    store.dispatch('vxg_trigger_printMap')
      .catch((error: Error) => {
        console.error('[useHeadActions] Print error:', error)
      })
  }

  /**
   * Trigger asset collection dialog
   * Opens the asset collection management interface
   */
  const collect = (): void => {
    store.dispatch('vxg_trigger_collect')
      .catch((error: Error) => {
        console.error('[useHeadActions] Collect error:', error)
      })
  }

  /**
   * Toggle bookmark/tags visibility
   * Shows or hides asset tags on the map
   */
  const showTags = (): void => {
    store.dispatch('adjust_trigger_bookmark')
      .catch((error: Error) => {
        console.error('[useHeadActions] Show tags error:', error)
      })
  }

  /**
   * Trigger filter assets action (Go button)
   * Applies current filter criteria to asset list
   */
  const filterAssets = (): void => {
    store.dispatch('vxg_trigger_go')
      .catch((error: Error) => {
        console.error('[useHeadActions] Filter assets error:', error)
      })
  }

  /**
   * Trigger clear filter action
   * Removes all active filters
   */
  const clearFilter = (): void => {
    store.dispatch('vxg_trigger_clear')
      .catch((error: Error) => {
        console.error('[useHeadActions] Clear filter error:', error)
      })
  }

  /**
   * Toggle filter panel visibility
   * Shows or hides the filter configuration panel
   */
  const toggleFilter = (): void => {
    store.dispatch('trigger_toggle_filter')
      .catch((error: Error) => {
        console.error('[useHeadActions] Toggle filter error:', error)
      })
  }

  /**
   * Open side drawer
   */
  const openDrawer = (): void => {
    store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { show: true }
    })
  }

  /**
   * Close detail panel
   */
  const closeDetail = (): void => {
    store.dispatch('set_cmp_flags', {
      name: 'BasicMain',
      flags: { show: false }
    })
  }

  return {
    addItem,
    addMobileAsset,
    removeItem,
    print,
    collect,
    showTags,
    filterAssets,
    clearFilter,
    toggleFilter,
    openDrawer,
    closeDetail
  }
}
