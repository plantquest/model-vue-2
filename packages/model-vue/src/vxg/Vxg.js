/**
 * Vxg Core Class
 * Vue 3 compatible version with store integration
 */

import Patrun from 'patrun'
import Jsonic from '@jsonic/jsonic-next'

/**
 * Default configuration
 */
const DEFAULT_CONFIG = {
  allow: {
    match: [],
    modify: (x) => x
  }
}

/**
 * Check if pattern matches
 * Uses flexible matching - all keys in query must exist in pattern and match
 */
function matchesPattern(query, pattern) {
  if (!query || !pattern) return false
  
  for (const key in query) {
    if (!(key in pattern)) {
      // If query has a key not in pattern, no match
      return false
    }
    
    const queryVal = query[key]
    const patternVal = pattern[key]
    
    // Handle arrays
    if (Array.isArray(queryVal) && Array.isArray(patternVal)) {
      // Check if arrays have common elements
      const hasCommon = queryVal.some(v => patternVal.includes(v))
      if (!hasCommon && !patternVal.includes('*')) {
        return false
      }
    } else if (queryVal !== patternVal) {
      // Scalar values must match exactly (unless pattern is wildcard)
      if (patternVal !== '*') {
        return false
      }
    }
  }
  
  return true
}

/**
 * Vxg - Core state management and permission system
 * 
 * @example
 * ```js
 * const vxg = new Vxg({
 *   allow: {
 *     match: [
 *       { role: 'admin', modify: ['*'] }
 *     ]
 *   }
 * })
 * ```
 */
export class Vxg {
  /**
   * Create a new Vxg instance
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    // Permission patterns (stored as array for flexible matching)
    this.allowPatterns = []
    
    // Component registry
    this.cmp = {}
    
    // State object
    this.state = {
      cmp: {},
      ent: {
        meta: {}
      }
    }
    
    // Store connector (initialized when store is connected)
    this._store = null
    this._storeType = null
    
    // Memoization cache for allow() checks
    this.memoizedAllow = new Map()
    
    // Legacy Patrun matcher (kept for backwards compatibility)
    this.match = {
      allow: new Patrun({ gex: true })
    }
    
    // Apply configuration
    this.configure(config)
  }
  
  /**
   * Configure the Vxg instance
   * @param {Object} customConfig - Custom configuration to merge
   */
  configure(customConfig) {
    // Merge with defaults
    this.config = Object.assign({}, DEFAULT_CONFIG, customConfig)
    
    // Ensure allow config exists
    this.config.allow = this.config.allow || {}
    this.config.allow.modify = this.config.allow.modify || ((x) => x)
    this.config.allow.match = this.config.allow.match || []
    
    // Store permission patterns
    this.allowPatterns = [...this.config.allow.match]
    
    // Also register in Patrun for backwards compatibility
    for (const entry of this.config.allow.match) {
      this.match.allow.add(entry, { allow: true })
    }
  }
  
  /**
   * Check if a match pattern is allowed
   * @param {Object|Array|String} match - Pattern to check
   * @returns {boolean} True if allowed
   * 
   * @example
   * ```js
   * vxg.allow({ role: 'admin' })
   * vxg.allow([{ role: 'admin' }, { role: 'editor' }])
   * vxg.allow('{ role: "admin" }')
   * ```
   */
  allow(match) {
    const key = JSON.stringify(match)
    
    // Return cached result if available
    if (this.memoizedAllow.has(key)) {
      return this.memoizedAllow.get(key)
    }
    
    // Parse match pattern using Jsonic if string
    let parsed
    try {
      parsed = typeof match === 'string' ? Jsonic(match) : match
    } catch (e) {
      console.warn('[Vxg] Invalid match pattern:', match, e)
      this.memoizedAllow.set(key, false)
      return false
    }
    
    // Normalize to array of query patterns
    const queries = Array.isArray(parsed) ? parsed : [parsed]
    
    // Check each query against stored patterns
    for (const query of queries) {
      if (!query || typeof query !== 'object') {
        continue
      }
      
      // Apply modifier function
      const modifiedQuery = this.config.allow.modify({ ...query })
      
      // Check against all stored patterns
      for (const pattern of this.allowPatterns) {
        if (matchesPattern(modifiedQuery, pattern)) {
          // Found a match!
          this.memoizedAllow.set(key, true)
          return true
        }
      }
    }
    
    // No match found
    this.memoizedAllow.set(key, false)
    return false
  }
  
  /**
   * Get component state
   * @param {string} name - Component name
   * @returns {Object} Component state
   */
  getComponentState(name) {
    return this.state.cmp[name] || {}
  }
  
  /**
   * Set component flags
   * @param {string} name - Component name
   * @param {Object} flags - Flags to set (show, allow, etc.)
   * 
   * @example
   * ```js
   * vxg.setComponentFlags('basic-head', { show: true })
   * vxg.setComponentFlags('basic-side', { show: false, allow: { edit: true } })
   * ```
   */
  setComponentFlags(name, flags) {
    if (!this.state.cmp[name]) {
      this.state.cmp[name] = {}
    }
    
    Object.assign(this.state.cmp[name], flags)
    
    // If store is connected, sync with store
    if (this._store) {
      this._syncToStore(name, flags)
    }
  }
  
  /**
   * Get nested state value by path
   * @param {string} path - Dot-separated path (e.g., 'cmp.basic-head.show')
   * @returns {*} Value at path
   */
  get(path) {
    const parts = path.split('.')
    let value = this.state
    
    for (const part of parts) {
      if (value && typeof value === 'object') {
        value = value[part]
      } else {
        return undefined
      }
    }
    
    return value
  }
  
  /**
   * Set nested state value by path
   * @param {string} path - Dot-separated path
   * @param {*} value - Value to set
   * 
   * @example
   * ```js
   * vxg.set('cmp.basic-head.show', true)
   * vxg.set('ent.meta.name', 'My Entity')
   * ```
   */
  set(path, value) {
    const parts = path.split('.')
    const last = parts.pop()
    let obj = this.state
    
    for (const part of parts) {
      if (!obj[part] || typeof obj[part] !== 'object') {
        obj[part] = {}
      }
      obj = obj[part]
    }
    
    obj[last] = value
    
    // If store is connected, sync with store
    if (this._store) {
      this._syncToStore(path, value)
    }
  }
  
  /**
   * Connect to a Vuex or Pinia store
   * @param {Object} store - Vuex or Pinia store instance
   * @private
   */
  connectStore(store) {
    this._store = store
    this._storeType = this._detectStoreType(store)
    
    if (this._storeType === 'vuex4') {
      this._connectVuex(store)
    } else if (this._storeType === 'pinia') {
      this._connectPinia(store)
    } else {
      console.warn('[Vxg] Unknown store type, store integration disabled')
    }
  }
  
  /**
   * Detect store type (Vuex 4 or Pinia)
   * @param {Object} store - Store instance
   * @returns {string} 'vuex4', 'pinia', or 'unknown'
   * @private
   */
  _detectStoreType(store) {
    // Vuex 4 has install method and _devtools
    if (typeof store.commit === 'function' && typeof store.dispatch === 'function') {
      return 'vuex4'
    }
    // Pinia has _s (stores registry)
    if (store._s && typeof store._s.get === 'function') {
      return 'pinia'
    }
    return 'unknown'
  }
  
  /**
   * Connect to Vuex 4 store
   * @param {Object} store - Vuex store instance
   * @private
   */
  _connectVuex(store) {
    // Subscribe to mutations
    store.subscribe((mutation, state) => {
      if (mutation.type.startsWith('vxg/')) {
        const path = mutation.type.replace('vxg/', '')
        this._handleStoreChange(path, mutation.payload, state)
      }
    })
    
    // Provide commit/dispatch methods
    this.commit = (type, payload) => {
      return store.commit(`vxg/${type}`, payload)
    }
    
    this.dispatch = (type, payload) => {
      return store.dispatch(`vxg/${type}`, payload)
    }
  }
  
  /**
   * Connect to Pinia store
   * @param {Object} pinia - Pinia instance
   * @private
   */
  _connectPinia(pinia) {
    // Get or create vxg store
    const vxgStore = pinia._s.get('vxg')
    
    if (!vxgStore) {
      console.warn('[Vxg] Pinia store "vxg" not found. Create it using defineStore("vxg", ...)')
      return
    }
    
    // Subscribe to store changes
    vxgStore.$subscribe((mutation, state) => {
      this._handleStoreChange(mutation.storeId, mutation, state)
    })
    
    // Provide update method
    this.updateStore = (updates) => {
      vxgStore.$patch(updates)
    }
  }
  
  /**
   * Handle store changes and sync to Vxg state
   * @param {string} path - State path
   * @param {*} payload - Change payload
   * @param {Object} state - New state
   * @private
   */
  _handleStoreChange(path, payload, state) {
    // Sync store changes back to Vxg state
    if (state.vxg) {
      this.state = { ...state.vxg }
    }
  }
  
  /**
   * Sync Vxg state changes to store
   * @param {string} path - State path
   * @param {*} value - New value
   * @private
   */
  _syncToStore(path, value) {
    if (this._storeType === 'vuex4' && this.commit) {
      this.commit('SET_VXG_STATE', { path, value })
    } else if (this._storeType === 'pinia' && this.updateStore) {
      this.updateStore({ [path]: value })
    }
  }
  
  /**
   * Register a component
   * @param {string} name - Component name
   * @param {Object} component - Component definition
   */
  registerComponent(name, component) {
    this.cmp[name] = component
  }
  
  /**
   * Clear memoization cache
   */
  clearCache() {
    this.memoizedAllow.clear()
  }
}

export default Vxg
