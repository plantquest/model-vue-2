/**
 * Vitest Setup File
 * Runs before each test file
 */

import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Configure Vue Test Utils globally
config.global.mocks = {
  // Mock Vue Router
  $router: {
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn()
  },
  $route: {
    path: '/',
    params: {},
    query: {},
    hash: '',
    name: undefined,
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: undefined
  },
  
  // Mock Vxg plugin (will be properly implemented in Week 2)
  $vxg: {
    version: '1.0.0-alpha.1',
    options: {}
  }
}

// Stub Vuetify components globally (will be properly configured in Week 4)
config.global.stubs = {
  // Vuetify components (basic stubs for now)
  VBtn: true,
  VIcon: true,
  VNavigationDrawer: true,
  VAppBar: true,
  VToolbar: true,
  VCard: true,
  VCardTitle: true,
  VCardText: true,
  VCardActions: true,
  VList: true,
  VListItem: true,
  VListItemTitle: true,
  VMenu: true,
  VDialog: true,
  VTextField: true,
  VSelect: true,
  VCombobox: true,
  VCheckbox: true,
  VSwitch: true,
  VExpansionPanels: true,
  VExpansionPanel: true,
  VExpansionPanelTitle: true,
  VExpansionPanelText: true,
  VContainer: true,
  VRow: true,
  VCol: true,
  VSpacer: true,
  VDivider: true,
  VSheet: true,
  VChip: true,
  VBadge: true,
  VAvatar: true,
  VTooltip: true
}

// Configure global provides
config.global.provide = {
  // Provide Vxg instance for inject() in Composition API
  $vxg: {
    version: '1.0.0-alpha.1',
    options: {}
  }
}

// Mock window.matchMedia (used by Vuetify)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Mock IntersectionObserver (used by some components)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as any

// Mock ResizeObserver (used by some components)
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any

// Reset mocks after each test
afterEach(() => {
  vi.clearAllMocks()
})
