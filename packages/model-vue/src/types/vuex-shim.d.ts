/**
 * Vuex Type Shims
 * Helps TypeScript understand Vuex 4 exports
 */

declare module 'vuex' {
  import type { InjectionKey } from 'vue'
  import type { Store } from 'vuex'
  
  export function useStore<S = any>(injectKey?: InjectionKey<Store<S>>): Store<S>
  export function createStore<S>(options: any): Store<S>
  export { Store }
}
