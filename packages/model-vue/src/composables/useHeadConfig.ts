/**
 * useHeadConfig Composable
 * 
 * Manages configuration and dynamic behavior for BasicHead component including:
 * - Tool configuration (deep merge from model + view)
 * - Entity name resolution with route-based overrides
 * - Select dropdown state and items
 * - Route-based configuration updates
 * - Default value management
 * 
 * @module composables/useHeadConfig
 */

import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'
import type { Store } from 'vuex'
import type { RouteLocationNormalized } from 'vue-router'

/**
 * Select dropdown item
 */
export interface SelectItem {
  value: string
  text: string
}

/**
 * Tool configuration from model
 */
export interface ToolConfig {
  expandSide?: { active: boolean }
  expandMain?: { active: boolean }
  select?: {
    active: boolean
    title: string
    initial?: string
    items?: Record<string, { title: string }>
  }
  add?: { active: boolean }
  remove?: { active: boolean }
  avatar?: { active: boolean }
  print?: { active: boolean; disabled?: boolean }
  bookmark?: { active: boolean }
  collect?: { active: boolean }
  [key: string]: any
}

/**
 * View configuration
 */
export interface ViewConfig {
  tool?: Partial<ToolConfig>
  [key: string]: any
}

/**
 * Return type for useHeadConfig composable
 */
export interface UseHeadConfigReturn {
  /** Current tool configuration (merged from model + view) */
  tool: ComputedRef<ToolConfig>
  /** Display name for current entity type */
  itemName: ComputedRef<string>
  /** Current select dropdown value */
  select: Ref<string>
  /** Select dropdown items */
  selectItems: ComputedRef<SelectItem[]>
  /** Internal view tool configuration */
  viewTool: Ref<Partial<ToolConfig>>
  /** Reset to default values */
  defaults: () => void
}

/**
 * useHeadConfig Composable
 * 
 * Provides dynamic configuration management for BasicHead based on:
 * - Model configuration (static defaults)
 * - Route configuration (view-specific overrides)
 * - Entity metadata
 * 
 * @param store - Vuex store instance
 * @param route - Current route location
 * @param model - Application model configuration
 * @param senecaUtil - Seneca utilities (for deep merge)
 * @returns Configuration state and methods
 * 
 * @example
 * ```typescript
 * const { tool, itemName, select } = useHeadConfig(store, route, model, senecaUtil)
 * 
 * if (tool.value.add.active) {
 *   // Add button is active for this view
 * }
 * ```
 */
export function useHeadConfig(
  store: Store<any>,
  route: RouteLocationNormalized,
  model: any,
  senecaUtil: any
): UseHeadConfigReturn {
  
  // ============================================================================
  // State
  // ============================================================================
  
  const select = ref<string>('')
  const viewTool = ref<Partial<ToolConfig>>({})
  
  // ============================================================================
  // Computed
  // ============================================================================
  
  /**
   * Tool configuration with deep merge
   * Combines base tool config from model with view-specific overrides
   */
  const tool = computed<ToolConfig>(() => {
    const headTool = model?.main?.app?.web?.parts?.head?.tool || {}
    const mergedTool = senecaUtil?.deep(headTool, viewTool.value) || headTool
    return mergedTool
  })
  
  /**
   * Display name for current entity
   * Handles special cases for routes (Device, User) and generic entities
   */
  const itemName = computed<string>(() => {
    const entityName = store.state.vxg?.ent?.meta?.name || 'Item'
    
    // Special handling for 'Item' entity based on route
    if (entityName === 'Item') {
      const routePath = route.path
      
      if (routePath.includes('/device')) {
        return 'Device'
      }
      
      if (routePath.includes('/user')) {
        return 'User'
      }
    }
    
    return entityName
  })
  
  /**
   * Select dropdown items
   * Transforms tool.select.items object into dropdown-compatible array
   */
  const selectItems = computed<SelectItem[]>(() => {
    const items: SelectItem[] = []
    const selectConfig = tool.value.select?.items
    
    if (selectConfig) {
      Object.entries(selectConfig).forEach(([key, value]: [string, any]) => {
        items.push({
          value: key,
          text: value.title || key
        })
      })
    }
    
    return items
  })
  
  // ============================================================================
  // Methods
  // ============================================================================
  
  /**
   * Reset select to default/initial value
   * Called on route changes to restore default state
   */
  const defaults = (): void => {
    if (tool.value.select?.active && tool.value.select?.initial) {
      select.value = tool.value.select.initial
    }
  }
  
  // ============================================================================
  // Route Watcher
  // ============================================================================
  
  /**
   * Watch for route changes and update view tool configuration
   * Runs immediately on mount and whenever route name changes
   */
  watch(
    () => route.name,
    (routeName) => {
      if (routeName) {
        const view = model?.main?.app?.web?.view?.[routeName]
        
        if (view && view.head) {
          viewTool.value = view.head.tool || {}
        } else {
          viewTool.value = {}
        }
        
        // Reset to defaults when route changes
        defaults()
      }
    },
    { immediate: true }
  )
  
  // ============================================================================
  // Select Watcher
  // ============================================================================
  
  /**
   * Watch select value changes and dispatch to Vuex
   */
  watch(select, (value) => {
    store.dispatch('trigger_select', { value })
      .catch((error: Error) => {
        console.error('[useHeadConfig] Select dispatch error:', error)
      })
  })
  
  /**
   * Watch Vuex select value changes and sync back to local state
   */
  watch(
    () => store.state.trigger?.select?.value,
    (value) => {
      if (value !== undefined && value !== select.value) {
        select.value = value
      }
    }
  )
  
  return {
    tool,
    itemName,
    select,
    selectItems,
    viewTool,
    defaults
  }
}
