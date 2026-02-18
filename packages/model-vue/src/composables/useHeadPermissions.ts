/**
 * useHeadPermissions Composable
 *
 * Handles permission checking and visibility logic for BasicHead component.
 * Integrates with Vuex store to determine what actions/buttons should be visible
 * and enabled based on:
 * - User permissions (allow checks)
 * - Component state (show checks)
 * - Feature flags (tool configuration)
 *
 * @module composables/useHeadPermissions
 */

import { computed, type ComputedRef } from 'vue'
import type { Store } from 'vuex'

/**
 * Return type for useHeadPermissions composable
 */
export interface UseHeadPermissionsReturn {
  /** Check if action is allowed (permission check) */
  allow: (action: string) => boolean
  /** Check if action should be shown (combines allow + visibility) */
  show: (action: string) => boolean
  /** Filter button disabled state */
  filterDisabled: ComputedRef<boolean>
  /** Filter icon visibility state */
  filterIcon: ComputedRef<boolean>
  /** Bookmark button visibility state */
  bookmarkVisible: ComputedRef<boolean>
  /** Bookmark active state (showing/hiding tags) */
  bookmarkActive: ComputedRef<boolean>
  /** Print button disabled state */
  printDisabled: ComputedRef<boolean>
}

/**
 * useHeadPermissions Composable
 *
 * Provides reactive permission and visibility checks for BasicHead actions.
 * Uses Vuex state to determine UI element visibility and enabled states.
 *
 * @param store - Vuex store instance
 * @returns Permission check functions and computed states
 *
 * @example
 * ```typescript
 * const { show, allow, filterDisabled } = useHeadPermissions(store)
 *
 * if (show('add')) {
 *   // Render add button
 * }
 *
 * if (allow('remove')) {
 *   // User has permission to remove
 * }
 * ```
 */
export function useHeadPermissions(store: Store<any>): UseHeadPermissionsReturn {

  // ============================================================================
  // Permission Checks
  // ============================================================================

  /**
   * Check if user has permission to perform an action
   * Returns true if permission is not explicitly set (default allow)
   *
   * @param action - Action name (e.g., 'add', 'remove', 'print')
   * @returns True if action is allowed
   */
  const allow = (action: string): boolean => {
    const allowed = store.state.vxg?.cmp?.BasicHead?.allow?.[action]
    // Default to true if permission is not explicitly set
    return allowed == null ? true : allowed
  }

  /**
   * Check if action should be shown in UI
   * Combines permission check (allow) with visibility flag (show)
   *
   * @param action - Action name (e.g., 'add', 'remove', 'print')
   * @returns True if action should be visible
   */
  const show = (action: string): boolean => {
    return allow(action) && (store.state.vxg?.cmp?.BasicHead?.show?.[action] || false)
  }

  // ============================================================================
  // Computed States
  // ============================================================================

  /**
   * Filter button disabled state
   * When true, filter/Go button is disabled
   */
  const filterDisabled = computed<boolean>(() => {
    return store.state.trigger?.filter_disabled?.value || false
  })

  /**
   * Filter icon visibility
   * Controls whether filter icon is shown
   */
  const filterIcon = computed<boolean>(() => {
    return store.state.vxg?.cmp?.BasicHead?.show?.filter || false
  })

  /**
   * Bookmark button visibility
   * Controls whether bookmark button is enabled
   */
  const bookmarkVisible = computed<boolean>(() => {
    return store.state.trigger?.bookmark?.visible || false
  })

  /**
   * Bookmark active state
   * True when tags are currently being shown
   */
  const bookmarkActive = computed<boolean>(() => {
    return store.state.trigger?.bookmark?.value || false
  })

  /**
   * Print button disabled state
   * Derived from tool configuration
   * Note: This requires accessing tool config which is computed in useHeadConfig
   * For now, we'll check store state directly
   */
  const printDisabled = computed<boolean>(() => {
    // This would ideally come from tool configuration
    // For now, return false as print is usually always enabled
    return false
  })

  return {
    allow,
    show,
    filterDisabled,
    filterIcon,
    bookmarkVisible,
    bookmarkActive,
    printDisabled
  }
}
