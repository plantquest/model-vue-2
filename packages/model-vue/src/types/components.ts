/**
 * Shared TypeScript type definitions for Vue 3 components
 */

// ============================================================================
// Authentication Types
// ============================================================================

export interface Credentials {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  name?: string
  role?: string
  avatar?: string
  [key: string]: any
}

export interface AuthState {
  authenticated: boolean
  user: AuthUser | null
}

// ============================================================================
// Admin Types
// ============================================================================

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  [key: string]: any
}

export interface AdminState {
  users: AdminUser[]
  loading: boolean
}

// ============================================================================
// Navigation Types
// ============================================================================

export interface NavItem {
  code: string
  title: string
  icon: string
  route: string
  allow?: any
  klass?: any
  [key: string]: any
}

export interface MenuItem {
  id: string
  label: string
  icon: string
  route?: string
  action?: string | (() => void)
}

// ============================================================================
// Navigation Stages Types
// ============================================================================

export interface Stage {
  id?: string
  map: number
  msg: string
  type?: string
}

export interface RouteMessage {
  msg: string
  map: number
}

export interface ParsedLine {
  id: string
  type: string
  map: number
  x: number
  y: number
}

export interface ParsedNode {
  type: string
  x: number
  y: number
  map: number
  polygon_id?: string
}

export interface BasicNavStagesProps {
  // Currently no props, but reserve for future
}


export interface FooterLink {
  id: string
  label: string
  route?: string
  href?: string
}

// ============================================================================
// Side Drawer Types
// ============================================================================

export interface SideSpec {
  footer?: {
    active?: boolean
    cmp?: any
    spec?: any
  }
  view?: any
  menu?: {
    items: Record<string, NavItem>
    order: string
    default?: string
  }
}

// ============================================================================
// Search Types
// ============================================================================

export interface SearchResult {
  id: string
  name: string
  type: string
  icon: string
  route?: string
  score?: number
  [key: string]: any
}

export interface SearchConfig {
  fields?: string[]
  boost?: Record<string, number>
  fuzzy?: number
  prefix?: boolean
  [key: string]: any
}

// ============================================================================
// Store Types (Vuex)
// ============================================================================

export interface VxgState {
  cmp?: {
    BasicSide?: {
      show?: boolean
      content?: any
    }
    BasicHead?: {
      show?: {
        filter?: boolean
        clear?: boolean
        [key: string]: boolean | undefined
      }
      allow?: Record<string, boolean>
    }
    BasicNavStages?: {
      currentStage?: number
      stages?: any[]
      completedStages?: number[]
      history?: number[]
    }
  }
}

export interface TriggerState {
  search?: {
    a?: string
    b?: string
  }
  select?: {
    value?: any
  }
  filter_disabled?: {
    value?: boolean
  }
}

export interface PathData {
  path?: any
  [key: string]: any
}

export interface PathEstimation {
  time: number
  distance: number
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface BasicAuthProps {
  user?: object | null
  redirectPath?: string
}

export interface BasicAdminProps {
  logo?: string
}

export interface BasicSideProps {
  spec: SideSpec
  logo?: string
}


export interface BasicFootProps {
  links?: FooterLink[]
  copyright?: string
  version?: string
}


// ============================================================================
// Event Types
// ============================================================================

export interface ActionEvent {
  part: string
  event: any
}

export interface SearchEvent {
  term: string
  results: any[]
  mode: 'assetsearch' | 'filtersearch' | 'route'
}

// ============================================================================
// Model Types (PlantQuest specific)
// ============================================================================

export interface Asset {
  id: string
  tag: string
  custom12?: string
  [key: string]: any
}

export interface User {
  id: string
  email: string
  name?: string
  [key: string]: any
}

// ============================================================================
// Utility Types
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
  Pick<T, Exclude<keyof T, Keys>> & 
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]
