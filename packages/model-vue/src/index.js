/**
 * @plantquest/model-vue v1.0.0-alpha.1
 * Vue 3 Component Library
 * 
 * Main entry point for the library
 */

import { Vxg } from './vxg/Vxg.js'
import { StoreAdapter } from './vxg/store-connector.js'

export const version = '1.0.0-alpha.1'

// ============================================================================
// Vxg Vue 3 Plugin
// ============================================================================

/**
 * VxgPlugin - Main plugin for Vue 3
 * 
 * @example
 * ```js
 * import { createApp } from 'vue'
 * import VxgPlugin from '@plantquest/model-vue'
 * 
 * const app = createApp(App)
 * app.use(VxgPlugin, {
 *   components: true,
 *   store: store,
 *   allow: {
 *     match: [{ role: 'admin', modify: ['*'] }]
 *   }
 * })
 * ```
 */
export const VxgPlugin = {
  install(app, options = {}) {
    console.log('[Vxg] Vue 3 plugin installed - v' + version)
    
    // Extract options
    const {
      components = true,
      prefix = 'Vxg',
      store = null,
      allow = {},
      initialState = {},
      ...vxgConfig
    } = options
    
    // Create Vxg instance
    const vxg = new Vxg({
      allow,
      ...vxgConfig
    })
    
    // Initialize state
    if (initialState) {
      Object.assign(vxg.state, initialState)
    }
    
    // Connect to store if provided
    if (store) {
      const adapter = new StoreAdapter(vxg, store)
      adapter.connect()
    }
    
    // Provide Vxg instance for Composition API
    app.provide('vxg', vxg)
    app.provide('$vxg', vxg) // Also provide with $ for consistency
    
    // Add to global properties for Options API
    app.config.globalProperties.$vxg = vxg
    
    // Register components globally if enabled
    if (components !== false) {
      // Import components
      import('./components/BasicHead.vue').then(m => {
        app.component(`${prefix}BasicHead`, m.default)
      })
      import('./components/BasicSide.vue').then(m => {
        app.component(`${prefix}BasicSide`, m.default)
      })
      import('./components/BasicMain.vue').then(m => {
        app.component(`${prefix}BasicMain`, m.default)
      })
      import('./components/BasicNavStages.vue').then(m => {
        app.component(`${prefix}BasicNavStages`, m.default)
      })
      import('./components/NavStagesExpansion.vue').then(m => {
        app.component(`${prefix}NavStagesExpansion`, m.default)
      })
      import('./components/NavStageItem.vue').then(m => {
        app.component(`${prefix}NavStageItem`, m.default)
      })
      import('./components/BasicAuth.vue').then(m => {
        app.component(`${prefix}BasicAuth`, m.default)
      })
      import('./components/BasicAdmin.vue').then(m => {
        app.component(`${prefix}BasicAdmin`, m.default)
      })
      import('./components/BasicFieldPick.vue').then(m => {
        app.component(`${prefix}BasicFieldPick`, m.default)
      })
      import('./components/BasicFoot.vue').then(m => {
        app.component(`${prefix}BasicFoot`, m.default)
      })
      import('./components/BasicLed.vue').then(m => {
        app.component(`${prefix}BasicLed`, m.default)
      })
      
      // Register Vxg instance in components registry
      vxg.registerComponent('BasicHead', 'VxgBasicHead')
      vxg.registerComponent('BasicSide', 'VxgBasicSide')
      vxg.registerComponent('BasicMain', 'VxgBasicMain')
      vxg.registerComponent('BasicNavStages', 'VxgBasicNavStages')
      vxg.registerComponent('BasicAuth', 'VxgBasicAuth')
      vxg.registerComponent('BasicAdmin', 'VxgBasicAdmin')
      vxg.registerComponent('BasicFieldPick', 'VxgBasicFieldPick')
      vxg.registerComponent('BasicFoot', 'VxgBasicFoot')
      vxg.registerComponent('BasicLed', 'VxgBasicLed')
    }
    
    // Store plugin version
    app.config.globalProperties.$vxgVersion = version
  }
}

// Default export is the plugin
export default VxgPlugin

// ============================================================================
// Components (Week 2-3 Migration Complete)
// ============================================================================

// Simple Components
export { default as BasicLed } from './components/BasicLed.vue'
export { default as BasicFoot } from './components/BasicFoot.vue'
export { default as BasicFieldPick } from './components/BasicFieldPick.vue'

// Medium Components
export { default as BasicAuth } from './components/BasicAuth.vue'
export { default as BasicAdmin } from './components/BasicAdmin.vue'
export { default as BasicSide } from './components/BasicSide.vue'

// Complex Components
export { default as BasicNavStages } from './components/BasicNavStages.vue'
export { default as NavStagesExpansion } from './components/NavStagesExpansion.vue'
export { default as NavStageItem } from './components/NavStageItem.vue'

export { default as BasicHead } from './components/BasicHead.vue'

// Head Sub-Components
export { default as HeadNavigation } from './components/head/HeadNavigation.vue'
export { default as HeadToolbar } from './components/head/HeadToolbar.vue'
export { default as HeadSearch } from './components/head/HeadSearch.vue'
export { default as HeadUtilities } from './components/head/HeadUtilities.vue'
export { default as HeadUser } from './components/head/HeadUser.vue'

// Other Components
export { default as BasicMain } from './components/BasicMain.vue'

// ============================================================================
// Composables (Week 2-3 Migration Complete)
// ============================================================================

// Authentication & Admin
export { useAuth } from './composables/useAuth'
export { useAdmin } from './composables/useAdmin'

// Navigation
export { useSide, useSideSearch } from './composables/useSide'
export { useNavStages } from './composables/useNavStages'
export { useStageRouting } from './composables/useStageRouting'

// Head Component Composables
export { useHeadSearch } from './composables/useHeadSearch'
export { useHeadActions } from './composables/useHeadActions'
export { useHeadPermissions } from './composables/useHeadPermissions'
export { useHeadNavigation } from './composables/useHeadNavigation'
export { useHeadConfig } from './composables/useHeadConfig'

// ============================================================================
// Vxg Core & Store Integration
// ============================================================================

export { Vxg } from './vxg/Vxg.js'
export { 
  StoreAdapter,
  createVxgVuexModule,
  createVxgPiniaStore
} from './vxg/store-connector.js'

// ============================================================================
// TypeScript Types
// ============================================================================

export * from './types'
