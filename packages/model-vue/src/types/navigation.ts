/**
 * Navigation and Stage Types
 * TypeScript definitions for navigation components
 */

/**
 * Stage message for navigation
 */
export interface StageMessage {
  /** Map index for this stage */
  map: number
  /** Human-readable message */
  msg: string
}

/**
 * Path node from route data
 */
export interface PathNode {
  /** Node ID */
  id: string
  /** Node type (Standard, Connector, etc.) */
  type: string
  /** Map/level index */
  map: number
  /** X coordinate */
  x: number
  /** Y coordinate */
  y: number
}

/**
 * Path line data with detail string
 */
export interface PathLineData {
  /** CSV detail string */
  detail: string
  /** Index in path */
  index: number
}

/**
 * Asset with location data
 */
export interface Asset {
  /** Asset ID */
  id?: string
  /** Map/level index */
  map: string | number
  /** X coordinate */
  xco: number
  /** Y coordinate */
  yco: number
  /** Level name */
  level?: string
  /** Custom fields */
  [key: string]: any
}

/**
 * Path data from Vuex store
 */
export interface PathData {
  /** Asset path data */
  asset123?: PathLineData[][]
}
