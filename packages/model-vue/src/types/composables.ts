/**
 * Composable Return Types
 */

import type { ComputedRef, Ref } from 'vue'

export interface UseVxgStoreReturn {
  vxgState: ComputedRef<any>
  componentState: (name: string) => ComputedRef<any>
  setComponentFlags: (name: string, flags: Record<string, any>) => void
  getState: (path: string) => ComputedRef<any>
}

export interface UseVxgPermissionsReturn {
  allow: (action: string) => ComputedRef<boolean>
  show: (action: string) => ComputedRef<boolean>
  allowMultiple: (actions: string[]) => ComputedRef<Record<string, boolean>>
}
