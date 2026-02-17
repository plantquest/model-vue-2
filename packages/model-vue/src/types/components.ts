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

/**
 * PQS Asset Entity
 * entity$: "-/pqs/asset"
 *
 * Full field schema for PlantQuest asset entities.
 * Room/Area asset types may include the `poly` field for polygon geometry.
 *
 * Decision: DEC-000007 (Seneca entity model)
 * Spec: SPEC-000003 (Backup Delivery Plane)
 * @see provenance/decisions/pqs-frontend/DEC-000007/decision.json
 * @see provenance/specs/SPEC-000003/spec.json
 */
export interface Asset {
  // --- Identity & Core ---
  'entity$'?: string       // Always "-/pqs/asset"
  id: string               // UUID
  tag: string              // Primary asset tag/name
  description?: string     // Asset description

  // --- Positioning ---
  xco?: string | number    // X pixel coordinate
  yco?: string | number    // Y pixel coordinate
  zco?: string | number | null  // Z coordinate (null for 2D)
  map?: string             // Map/level index ("1", "2", etc.)
  floorz?: string          // Floor Z-reference

  // --- Classification ---
  atype?: string           // Asset type (e.g. "Room/Area", "Valve")
  gt2m?: string            // Greater than 2m flag
  gt4m?: string            // Greater than 4m flag
  anodedep?: string        // A-node dependency
  icon?: string            // Asset icon identifier

  // --- Location ---
  room?: string            // Room/area name
  loc?: string             // Location reference
  building?: string        // Building name
  level?: string           // Level/floor name

  // --- Filter Hierarchy ---
  filtertop?: string       // Top-level filter category
  filterside?: string      // Side filter category
  filtersubside?: string   // Sub-side filter
  filtersubside2?: string  // Second sub-side filter

  // --- Disciplines ---
  dicipline1?: string      // Primary discipline
  dicipline2?: string      // Secondary discipline
  dicipline3?: string      // Tertiary discipline

  // --- Grouping ---
  agroupname?: string      // Asset group name

  // --- Departments (dept1-dept10) ---
  dept1?: string
  dept2?: string
  dept3?: string
  dept4?: string
  dept5?: string
  dept6?: string
  dept7?: string
  dept8?: string
  dept9?: string
  dept10?: string

  // --- Custom Fields (custom1-custom32) ---
  custom1?: string
  custom2?: string
  custom3?: string
  custom4?: string
  custom5?: string
  custom6?: string
  custom7?: string
  custom8?: string
  custom9?: string
  custom10?: string
  custom11?: string
  custom12?: string        // Used as tag alias in search/display
  custom13?: string
  custom14?: string
  custom15?: string
  custom16?: string
  custom17?: string
  custom18?: string
  custom19?: string
  custom20?: string
  custom21?: string
  custom22?: string
  custom23?: string
  custom24?: string
  custom25?: string
  custom26?: string
  custom27?: string
  custom28?: string
  custom29?: string
  custom30?: string
  custom31?: string
  custom32?: string

  // --- Data Fields (data1-data20) ---
  data1?: string
  data2?: string
  data3?: string
  data4?: string
  data5?: string
  data6?: string
  data7?: string
  data8?: string
  data9?: string
  data10?: string
  data11?: string
  data12?: string
  data13?: string
  data14?: string
  data15?: string
  data16?: string
  data17?: string
  data18?: string
  data19?: string
  data20?: string

  // --- Line/Piping ---
  line?: string            // Line reference
  lineno?: string          // Line number
  pidno?: string           // P&ID number
  preceededby?: string     // Preceded-by reference
  followeby?: string       // Followed-by reference

  // --- Geometry (Room/Area types) ---
  poly?: number[][]        // Polygon coordinates [[x,y], [x,y], ...]

  // --- Catch-all for future fields ---
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
