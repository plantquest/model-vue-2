/**
 * Vue Type Augmentation
 * Extends Vue's global types to include Vxg plugin
 */

import { VxgInstance } from './vxg'

/**
 * Augment Vue instance with $vxg
 */
declare module 'vue' {
  interface ComponentCustomProperties {
    /**
     * Vxg instance
     * Available as this.$vxg in Options API
     */
    $vxg: VxgInstance
    
    /**
     * Vxg version string
     */
    $vxgVersion: string
  }
}

/**
 * Augment Vue runtime to include global components
 * Provides autocomplete for Vxg components
 */
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    /**
     * BasicHead component
     * Main application header with search, actions, and user menu
     */
    VxgBasicHead: typeof import('../components/BasicHead.vue').default
    
    /**
     * BasicSide component
     * Sidebar navigation drawer
     */
    VxgBasicSide: typeof import('../components/BasicSide.vue').default
    
    /**
     * BasicMain component
     * Main content area
     */
    VxgBasicMain: typeof import('../components/BasicMain.vue').default
    
    /**
     * BasicNavStages component
     * Multi-stage navigation
     */
    VxgBasicNavStages: typeof import('../components/BasicNavStages.vue').default
    
    /**
     * BasicAuth component
     * Authentication form
     */
    VxgBasicAuth: typeof import('../components/BasicAuth.vue').default
    
    /**
     * BasicAdmin component
     * Admin panel
     */
    VxgBasicAdmin: typeof import('../components/BasicAdmin.vue').default
    
    /**
     * BasicFieldPick component
     * Field selection component
     */
    VxgBasicFieldPick: typeof import('../components/BasicFieldPick.vue').default
    
    /**
     * BasicFoot component
     * Application footer
     */
    VxgBasicFoot: typeof import('../components/BasicFoot.vue').default
    
    /**
     * BasicLed component
     * LED status indicator
     */
    VxgBasicLed: typeof import('../components/BasicLed.vue').default
  }
}

// Ensure this file is treated as a module
export {}
