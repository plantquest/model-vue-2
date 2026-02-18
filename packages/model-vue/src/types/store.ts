/**
 * State Management Types
 * Types for Vuex and Pinia integration
 */

import { Store } from 'vuex'
import { VxgState, VxgComponentState, ComponentFlags } from './vxg'

/**
 * State adapter interface
 * Abstraction for Vuex and Pinia
 */
export interface StateAdapter {
  /**
   * Get component state
   */
  getComponentState(name: string): VxgComponentState | undefined
  
  /**
   * Set component flags
   */
  setComponentFlags(name: string, flags: ComponentFlags): void
  
  /**
   * Get entire Vxg state
   */
  getVxgState(): VxgState
  
  /**
   * Get nested state value by path
   */
  getState(path: string): any
}

/**
 * Vuex adapter options
 */
export interface VuexAdapterOptions {
  /**
   * Vuex store instance
   */
  store: Store<any>
  
  /**
   * State namespace (default: 'vxg')
   */
  namespace?: string
}

/**
 * Pinia adapter options
 */
export interface PiniaAdapterOptions {
  /**
   * Pinia store composable
   */
  useStore: () => any
  
  /**
   * Store ID (default: 'vxg')
   */
  storeId?: string
}

/**
 * Vuex module definition for Vxg
 */
export interface VxgVuexModule {
  namespaced: boolean
  state: () => VxgState
  mutations: Record<string, (state: VxgState, payload: any) => void>
  actions: Record<string, (context: any, payload: any) => void | Promise<void>>
  getters: Record<string, (state: VxgState) => any>
}
