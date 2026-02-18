/**
 * Store Connector
 * Provides integration between Vxg and Vuex 4 / Pinia
 */

/**
 * Create a Vuex 4 module for Vxg
 * @returns {Object} Vuex module definition
 * 
 * @example
 * ```js
 * import { createStore } from 'vuex'
 * import { createVxgVuexModule } from '@plantquest/model-vue'
 * 
 * const store = createStore({
 *   modules: {
 *     vxg: createVxgVuexModule()
 *   }
 * })
 * ```
 */
export function createVxgVuexModule(initialState = {}) {
  return {
    namespaced: true,
    
    state: () => ({
      cmp: {},
      ent: {
        meta: {}
      },
      ...initialState
    }),
    
    mutations: {
      /**
       * Set component flags
       */
      SET_COMPONENT_FLAGS(state, { name, flags }) {
        if (!state.cmp[name]) {
          state.cmp[name] = {}
        }
        Object.assign(state.cmp[name], flags)
      },
      
      /**
       * Set nested state value
       */
      SET_VXG_STATE(state, { path, value }) {
        const parts = path.split('.')
        const last = parts.pop()
        let obj = state
        
        for (const part of parts) {
          if (!obj[part] || typeof obj[part] !== 'object') {
            obj[part] = {}
          }
          obj = obj[part]
        }
        
        obj[last] = value
      },
      
      /**
       * Set entire state
       */
      SET_STATE(state, newState) {
        Object.assign(state, newState)
      },
      
      /**
       * Reset state to initial
       */
      RESET_STATE(state) {
        state.cmp = {}
        state.ent = { meta: {} }
      }
    },
    
    actions: {
      /**
       * Update component flags
       */
      updateComponentFlags({ commit }, { name, flags }) {
        commit('SET_COMPONENT_FLAGS', { name, flags })
      },
      
      /**
       * Update state by path
       */
      updateState({ commit }, { path, value }) {
        commit('SET_VXG_STATE', { path, value })
      },
      
      /**
       * Reset all state
       */
      resetState({ commit }) {
        commit('RESET_STATE')
      }
    },
    
    getters: {
      /**
       * Get component state by name
       */
      componentState: (state) => (name) => {
        return state.cmp[name] || {}
      },
      
      /**
       * Get all component states
       */
      allComponents: (state) => {
        return state.cmp
      },
      
      /**
       * Get entity metadata
       */
      entityMeta: (state) => {
        return state.ent?.meta || {}
      },
      
      /**
       * Get state by path
       */
      getByPath: (state) => (path) => {
        const parts = path.split('.')
        let value = state
        
        for (const part of parts) {
          if (value && typeof value === 'object') {
            value = value[part]
          } else {
            return undefined
          }
        }
        
        return value
      }
    }
  }
}

/**
 * Create a Pinia store for Vxg
 * @param {Function} defineStore - Pinia's defineStore function
 * @param {Object} initialState - Initial state
 * @returns {Function} Pinia store composable
 * 
 * @example
 * ```js
 * import { defineStore } from 'pinia'
 * import { createVxgPiniaStore } from '@plantquest/model-vue'
 * 
 * export const useVxgStore = createVxgPiniaStore(defineStore)
 * ```
 */
export function createVxgPiniaStore(defineStore, initialState = {}) {
  return defineStore('vxg', {
    state: () => ({
      cmp: {},
      ent: {
        meta: {}
      },
      ...initialState
    }),
    
    getters: {
      /**
       * Get component state by name
       */
      componentState: (state) => (name) => {
        return state.cmp[name] || {}
      },
      
      /**
       * Get all component states
       */
      allComponents: (state) => {
        return state.cmp
      },
      
      /**
       * Get entity metadata
       */
      entityMeta: (state) => {
        return state.ent?.meta || {}
      },
      
      /**
       * Get state by path
       */
      getByPath: (state) => (path) => {
        const parts = path.split('.')
        let value = state
        
        for (const part of parts) {
          if (value && typeof value === 'object') {
            value = value[part]
          } else {
            return undefined
          }
        }
        
        return value
      }
    },
    
    actions: {
      /**
       * Set component flags
       */
      setComponentFlags(name, flags) {
        if (!this.cmp[name]) {
          this.cmp[name] = {}
        }
        Object.assign(this.cmp[name], flags)
      },
      
      /**
       * Set state by path
       */
      setByPath(path, value) {
        const parts = path.split('.')
        const last = parts.pop()
        let obj = this
        
        for (const part of parts) {
          if (!obj[part] || typeof obj[part] !== 'object') {
            obj[part] = {}
          }
          obj = obj[part]
        }
        
        obj[last] = value
      },
      
      /**
       * Reset all state
       */
      resetState() {
        this.cmp = {}
        this.ent = { meta: {} }
      }
    }
  })
}

/**
 * Store adapter interface
 * Provides unified API for Vuex and Pinia
 */
export class StoreAdapter {
  constructor(vxg, store) {
    this.vxg = vxg
    this.store = store
    this.storeType = vxg._detectStoreType(store)
  }
  
  /**
   * Connect the store to Vxg
   */
  connect() {
    this.vxg.connectStore(this.store)
  }
  
  /**
   * Get component state
   */
  getComponentState(name) {
    if (this.storeType === 'vuex4') {
      return this.store.getters['vxg/componentState'](name)
    } else if (this.storeType === 'pinia') {
      return this.store.componentState(name)
    }
    return {}
  }
  
  /**
   * Set component flags
   */
  setComponentFlags(name, flags) {
    if (this.storeType === 'vuex4') {
      this.store.dispatch('vxg/updateComponentFlags', { name, flags })
    } else if (this.storeType === 'pinia') {
      this.store.setComponentFlags(name, flags)
    }
  }
  
  /**
   * Get entire Vxg state
   */
  getVxgState() {
    if (this.storeType === 'vuex4') {
      return this.store.state.vxg
    } else if (this.storeType === 'pinia') {
      return {
        cmp: this.store.cmp,
        ent: this.store.ent
      }
    }
    return { cmp: {}, ent: { meta: {} } }
  }
  
  /**
   * Get state by path
   */
  getState(path) {
    if (this.storeType === 'vuex4') {
      return this.store.getters['vxg/getByPath'](path)
    } else if (this.storeType === 'pinia') {
      return this.store.getByPath(path)
    }
    return undefined
  }
}
