/**
 * Vxg Plugin Types
 * Core plugin configuration and state types
 */

import { App, Plugin } from 'vue'

/**
 * Permission match pattern
 */
export interface PermissionMatch {
  role?: string
  modify?: string[]
  [key: string]: any
}

/**
 * Vxg plugin configuration options
 */
export interface VxgConfig {
  /**
   * Permission configuration
   */
  allow?: {
    /**
     * Array of permission match patterns
     */
    match?: PermissionMatch[]
    /**
     * Function to modify permissions
     */
    modify?: (x: any) => any
  }
  
  /**
   * Custom configuration options
   */
  [key: string]: any
}

/**
 * Plugin installation options
 */
export interface VxgPluginOptions extends VxgConfig {
  /**
   * Register components globally (default: true)
   */
  components?: boolean
  
  /**
   * Component name prefix (default: 'Vxg')
   */
  prefix?: string
  
  /**
   * Vuex or Pinia store instance
   */
  store?: any
  
  /**
   * Initial state
   */
  initialState?: Partial<VxgState>
}

/**
 * Vxg state structure
 * Represents the state stored in Vuex or Pinia
 */
export interface VxgState {
  /**
   * Component states
   */
  cmp: {
    [componentName: string]: VxgComponentState
  }
  
  /**
   * Entity metadata
   */
  ent?: {
    meta?: {
      name?: string
      [key: string]: any
    }
  }
}

/**
 * Individual component state
 */
export interface VxgComponentState {
  /**
   * Visibility flag
   */
  show?: boolean
  
  /**
   * Permission flags
   */
  allow?: Record<string, boolean>
  
  /**
   * Custom component state
   */
  [key: string]: any
}

/**
 * Component flags for state updates
 */
export interface ComponentFlags {
  show?: boolean
  allow?: Record<string, boolean>
  [key: string]: any
}

/**
 * Vxg Instance Interface
 * Main Vxg class interface
 */
export interface VxgInstance {
  /**
   * Configuration
   */
  config: VxgConfig
  
  /**
   * Component registry
   */
  cmp: Record<string, any>
  
  /**
   * Current state
   */
  state: VxgState
  
  /**
   * Permission matcher
   */
  match: {
    allow: any
  }
  
  /**
   * Check if a pattern is allowed
   */
  allow(match: any): boolean
  
  /**
   * Get component state
   */
  getComponentState(name: string): VxgComponentState
  
  /**
   * Set component flags
   */
  setComponentFlags(name: string, flags: ComponentFlags): void
  
  /**
   * Get state by path
   */
  get(path: string): any
  
  /**
   * Set state by path
   */
  set(path: string, value: any): void
  
  /**
   * Connect to store
   */
  connectStore(store: any): void
  
  /**
   * Register component
   */
  registerComponent(name: string, component: any): void
  
  /**
   * Clear memoization cache
   */
  clearCache(): void
  
  /**
   * Commit mutation (Vuex only)
   */
  commit?(type: string, payload: any): void
  
  /**
   * Dispatch action (Vuex only)
   */
  dispatch?(type: string, payload: any): Promise<any>
  
  /**
   * Update store (Pinia only)
   */
  updateStore?(updates: any): void
}

/**
 * Vxg Plugin Interface
 * Main plugin that gets installed with app.use()
 */
export interface VxgPlugin extends Plugin {
  /**
   * Vue plugin install method
   */
  install(app: App, options?: VxgPluginOptions): void
}
