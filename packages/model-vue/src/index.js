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
    
    app.config.globalProperties.$vxg = {
      version,
      options
    }
    
    app.provide('$vxg', {
      version,
      options
    })
  }
}

// Components
export { default as BasicHead } from './components/BasicHead.vue'
export { default as BasicSide } from './components/BasicSide.vue'
export { default as BasicMain } from './components/BasicMain.vue'
export { default as BasicNavStages } from './components/BasicNavStages.vue'
export { default as BasicAuth } from './components/BasicAuth.vue'
export { default as BasicAdmin } from './components/BasicAdmin.vue'
export { default as BasicFieldPick } from './components/BasicFieldPick.vue'
export { default as BasicFoot } from './components/BasicFoot.vue'
export { default as BasicLed } from './components/BasicLed.vue'

// Sub-components
export { default as NavStagePanel } from './components/NavStagePanel.vue'
export { default as NavStageItem } from './components/NavStageItem.vue'
export { default as HeadToolbar } from './components/HeadToolbar.vue'
export { default as HeadSearch } from './components/HeadSearch.vue'
export { default as HeadSelect } from './components/HeadSelect.vue'

// Composables
export { useNavStages } from './composables/useNavStages'
export { usePathParser } from './composables/usePathParser'
export { useMapAssets } from './composables/useMapAssets'
export { useSide, useSideSearch } from './composables/useSide'
export { useHeadSearch } from './composables/useHeadSearch'
export { useHeadActions } from './composables/useHeadActions'
export { useHeadPermissions } from './composables/useHeadPermissions'
export { useHeadState } from './composables/useHeadState'
export { useHeadSync } from './composables/useHeadSync'

// Types
export * from './types'
