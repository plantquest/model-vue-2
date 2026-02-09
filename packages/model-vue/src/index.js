/**
 * @plantquest/model-vue v1.0.0-alpha.1
 * Vue 3 Component Library
 * 
 * Main entry point for the library
 */

export const version = '1.0.0-alpha.1'

/**
 * Vxg Vue 3 Plugin
 */
export default {
  install(app, options = {}) {
    console.log('[Vxg] Vue 3 plugin installed - v' + version)
    
    // Plugin configuration
    app.config.globalProperties.$vxg = {
      version,
      options
    }
    
    // Provide/inject for Composition API
    app.provide('$vxg', {
      version,
      options
    })
  }
}

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
// TypeScript Types
// ============================================================================

export * from './types'
