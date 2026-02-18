/**
 * State Management Types
 */

export interface StateAdapter {
  getComponentState(name: string): any
  setComponentFlags(name: string, flags: Record<string, any>): void
  getVxgState(): any
  getState(path: string): any
}

export interface VuexAdapterOptions {
  store: any
  namespace?: string
}

export interface PiniaAdapterOptions {
  useStore: () => any
  storeId?: string
}
