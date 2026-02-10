/**
 * Vuetify 3 Plugin Configuration
 * @plantquest/model-vue
 * 
 * Theme configuration with PlantQuest custom colors and design tokens.
 * 
 * Usage:
 * ```javascript
 * import { createApp } from 'vue'
 * import { createVuetify } from './plugins/vuetify'
 * 
 * const vuetify = createVuetify()
 * app.use(vuetify)
 * ```
 */

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

/**
 * PlantQuest Color Palette
 * 
 * Design tokens used throughout the PlantQuest application.
 * Colors are organized by function and semantic meaning.
 */
const plantQuestColors = {
  // Primary Brand Colors
  'pqs-green': '#4CAF50',       // Primary brand green
  'pqs-blue': '#2196F3',        // Secondary brand blue
  'pqs-dark-blue': '#141B2D',   // Dark background blue
  'pqs-mid-blue': '#27324A',    // Mid-tone blue for headers
  
  // Neutral Grays
  'pqs-gray-dark': '#757575',   // Dark gray for text
  'pqs-gray-mid': '#9E9E9E',    // Mid gray for secondary text
  'pqs-gray-light': '#E0E0E0',  // Light gray for borders
  
  // Functional Colors
  'pqs-success': '#4CAF50',     // Success states
  'pqs-warning': '#FB8C00',     // Warning states
  'pqs-error': '#FF5252',       // Error states
  'pqs-info': '#2196F3',        // Info states
  
  // UI Element Colors (from existing CSS variables)
  'pqs-cb1': '#4CAF50',         // Component background 1 (primary)
  'pqs-cb2': '#2E3B55',         // Component background 2 (secondary)
  'pqs-ct0': '#141B2D',         // Component text 0 (primary dark)
  'pqs-ct1': '#FFFFFF',         // Component text 1 (light/white)
  'pqs-ct2': '#9E9E9E',         // Component text 2 (muted)
  'pqs-ci0': '#4CAF50',         // Component icon 0 (primary)
}

/**
 * Vuetify 3 Breakpoints
 * 
 * Standard Vuetify breakpoints for responsive design:
 * - xs: < 600px (mobile)
 * - sm: 600px - 960px (tablet portrait)
 * - md: 960px - 1280px (tablet landscape / small desktop)
 * - lg: 1280px - 1920px (desktop)
 * - xl: > 1920px (large desktop)
 */
const breakpoints = {
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
}

/**
 * Light Theme Configuration
 */
const lightTheme = {
  dark: false,
  colors: {
    // Vuetify standard colors
    primary: '#2196F3',           // PlantQuest blue
    secondary: '#4CAF50',         // PlantQuest green
    accent: '#82B1FF',            // Light blue accent
    error: '#FF5252',             // Red for errors
    info: '#2196F3',              // Blue for info
    success: '#4CAF50',           // Green for success
    warning: '#FB8C00',           // Orange for warnings
    
    // Background colors
    background: '#FFFFFF',        // Main background
    surface: '#FFFFFF',           // Surface background
    
    // Text colors
    'on-primary': '#FFFFFF',      // Text on primary color
    'on-secondary': '#FFFFFF',    // Text on secondary color
    'on-background': '#141B2D',   // Text on background
    'on-surface': '#141B2D',      // Text on surface
    
    // PlantQuest custom colors
    ...plantQuestColors,
  },
}

/**
 * Dark Theme Configuration
 */
const darkTheme = {
  dark: true,
  colors: {
    // Vuetify standard colors (adjusted for dark mode)
    primary: '#2196F3',           // PlantQuest blue
    secondary: '#4CAF50',         // PlantQuest green
    accent: '#82B1FF',            // Light blue accent
    error: '#FF5252',             // Red for errors
    info: '#2196F3',              // Blue for info
    success: '#4CAF50',           // Green for success
    warning: '#FB8C00',           // Orange for warnings
    
    // Background colors (dark mode)
    background: '#141B2D',        // Dark background
    surface: '#27324A',           // Surface background
    
    // Text colors (dark mode)
    'on-primary': '#FFFFFF',      // Text on primary color
    'on-secondary': '#FFFFFF',    // Text on secondary color
    'on-background': '#FFFFFF',   // Text on background
    'on-surface': '#FFFFFF',      // Text on surface
    
    // PlantQuest custom colors
    ...plantQuestColors,
  },
}

/**
 * Default Configuration
 * 
 * Creates a Vuetify instance with PlantQuest theme configuration.
 * Can be customized by passing options to createVuetify().
 * 
 * @param {Object} options - Vuetify configuration options
 * @returns {Object} Vuetify instance
 */
export function createVuetify(options = {}) {
  return createVuetify({
    // Theme configuration
    theme: {
      defaultTheme: 'light',
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      // Enable CSS variables for dynamic theming
      variations: {
        colors: ['primary', 'secondary', 'accent'],
        lighten: 5,
        darken: 5,
      },
    },
    
    // Icons configuration
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    
    // Breakpoints
    display: {
      ...breakpoints,
    },
    
    // Default component props
    defaults: {
      // VBtn defaults
      VBtn: {
        variant: 'flat',
        color: 'primary',
      },
      // VCard defaults
      VCard: {
        elevation: 2,
      },
      // VTextField defaults
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
      },
      // VSelect defaults
      VSelect: {
        variant: 'outlined',
        density: 'comfortable',
      },
      // VCombobox defaults
      VCombobox: {
        variant: 'outlined',
        density: 'comfortable',
      },
    },
    
    // SSR support
    ssr: false,
    
    // Allow custom options to override defaults
    ...options,
  })
}

export default createVuetify
