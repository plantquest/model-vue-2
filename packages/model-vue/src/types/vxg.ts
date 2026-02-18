/**
 * Vxg Plugin Types
 * Core plugin configuration and state types
 */

import type { App } from 'vue'

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
    match?: Array<Record<string, any>>
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
 * Vxg Plugin Class
 * Main plugin that gets installed with app.use()
 */
export interface VxgPlugin {
  /**
   * Vue plugin install method
   */
  install(app: App, options?: VxgConfig): void
  
  /**
   * Plugin version
   */
  version: string
  
  /**
   * Plugin configuration
   */
  options?: VxgConfig
}

/**
 * Component flags for state updates
 */
export interface ComponentFlags {
  show?: boolean
  allow?: Record<string, boolean>
  [key: string]: any
}
