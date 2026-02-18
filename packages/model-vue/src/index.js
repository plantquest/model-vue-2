/**
 * @plantquest/model-vue v1.0.0-alpha.1
 * Vue 3 Component Library
 * 
 * Main entry point for the library
 */

export const version = '1.0.0-alpha.1'

/**
 * Vxg Vue 3 Plugin
 * This is a placeholder that will be fully implemented during component migration
 */
export default {
  install(app, options = {}) {
    console.log('[Vxg] Vue 3 plugin installed - v' + version)
    
    // Plugin configuration will be added during migration
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

// Components will be exported here after migration (Week 2-3)
// export { default as BasicHead } from './components/BasicHead.vue'
// export { default as BasicSide } from './components/BasicSide.vue'
// ... etc

// Composables will be exported here after creation (Week 2-3)
// export { useVxgStore } from './composables/useVxgStore'
// export { useVxgPermissions } from './composables/useVxgPermissions'
// ... etc

// Types (TypeScript users only)
// JavaScript users can ignore these exports
export * from './types'
