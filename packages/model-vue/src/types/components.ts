/**
 * Component Prop Types
 * TypeScript definitions for component props
 */

/**
 * BasicHead component props
 */
export interface BasicHeadProps {
  /**
   * Logo image URL
   */
  logo?: string
  
  /**
   * Application title
   */
  title?: string
}

/**
 * BasicSide component props
 */
export interface BasicSideProps {
  /**
   * Sidebar title
   */
  title?: string
  
  /**
   * Sidebar width in pixels
   */
  width?: number
  
  /**
   * Whether sidebar is initially open
   */
  modelValue?: boolean
}

/**
 * BasicNavStages component props
 */
export interface BasicNavStagesProps {
  /**
   * Current stage number
   */
  modelValue?: number
  
  /**
   * Array of available stages
   */
  stages?: Array<{
    id: number
    name: string
    label?: string
    [key: string]: any
  }>
  
  /**
   * Stage configuration
   */
  config?: {
    allowSkip?: boolean
    showLabels?: boolean
    [key: string]: any
  }
}

/**
 * BasicAuth component props
 */
export interface BasicAuthProps {
  /**
   * Redirect path after successful login
   */
  redirectPath?: string
  
  /**
   * Show remember me checkbox
   */
  rememberMe?: boolean
}

/**
 * BasicAdmin component props
 */
export interface BasicAdminProps {
  /**
   * Admin panel title
   */
  title?: string
}

/**
 * BasicMain component props
 */
export interface BasicMainProps {
  /**
   * Main content layout type
   */
  layout?: 'default' | 'full' | 'compact'
}

/**
 * BasicFieldPick component props
 */
export interface BasicFieldPickProps {
  /**
   * Field label
   */
  label?: string
  
  /**
   * Available options
   */
  options?: Array<any>
  
  /**
   * Selected value
   */
  modelValue?: any
}

/**
 * BasicFoot component props
 */
export interface BasicFootProps {
  /**
   * Footer content
   */
  content?: string
  
  /**
   * Show copyright
   */
  showCopyright?: boolean
}

/**
 * BasicLed component props
 */
export interface BasicLedProps {
  /**
   * LED status
   */
  status?: 'on' | 'off' | 'blink'
  
  /**
   * LED color
   */
  color?: string
}
