/**
 * Component Prop Types
 */

export interface FooterLink {
  id: string
  label: string
  route?: string
  href?: string
}

export interface BasicHeadProps {
  logo?: string
}

export interface BasicSideProps {
  spec: any
  logo?: string
}

export interface BasicMainProps {
  spec?: any
}

export interface BasicAdminProps {
  logo?: string
}

export interface BasicAuthProps {
  user?: any
}

export interface BasicNavStagesProps {
  spec?: any
}

export interface BasicLedProps {
  status?: 'on' | 'off' | 'warning' | 'error'
  spec?: any
  param?: any
}

export interface BasicFootProps {
  links?: FooterLink[]
  version?: string
  copyright?: string
}

export interface BasicFieldPickProps {
  field?: any
  param?: any
  modelValue?: string | string[]
  label?: string
  disabled?: boolean
  multiple?: boolean
}
