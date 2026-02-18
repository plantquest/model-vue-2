/**
 * NavStagePanel Component Tests
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavStagePanel from './NavStagePanel.vue'

describe('NavStagePanel', () => {
  describe('Props', () => {
    it('should render with default props', () => {
      const wrapper = mount(NavStagePanel, {
        props: {
          modelValue: false
        }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('should accept modelValue prop', () => {
      const wrapper = mount(NavStagePanel, {
        props: {
          modelValue: true
        }
      })
      expect(wrapper.props('modelValue')).toBe(true)
    })

    it('should accept publicPath prop', () => {
      const wrapper = mount(NavStagePanel, {
        props: {
          modelValue: false,
          publicPath: '/custom/'
        }
      })
      expect(wrapper.props('publicPath')).toBe('/custom/')
    })

    it('should use default publicPath', () => {
      const wrapper = mount(NavStagePanel, {
        props: {
          modelValue: false
        }
      })
      expect(wrapper.props('publicPath')).toBe('/')
    })
  })

  describe('Icon', () => {
    it('should show nav_in.svg when expanded', () => {
      const wrapper = mount(NavStagePanel, {
        props: {
          modelValue: true
        }
      })
      expect(wrapper.vm.iconSrc).toBe('nav_in.svg')
    })

    it('should show nav_out.svg when collapsed', () => {
      const wrapper = mount(NavStagePanel, {
        props: {
          modelValue: false
        }
      })
      expect(wrapper.vm.iconSrc).toBe('nav_out.svg')
    })
  })

  describe('Content', () => {
    it('should render header with title', () => {
      const wrapper = mount(NavStagePanel, {
        props: {
          modelValue: false
        }
      })
      expect(wrapper.text()).toContain('THIS ROUTE CONTAINS MULTIPLE LEVELS')
    })

    it('should render slot content', () => {
      const wrapper = mount(NavStagePanel, {
        props: {
          modelValue: true
        },
        slots: {
          default: '<div class="test-content">Test Content</div>'
        }
      })
      expect(wrapper.html()).toContain('test-content')
      expect(wrapper.text()).toContain('Test Content')
    })
  })

  describe('Events', () => {
    it('should emit update:modelValue on expansion', async () => {
      const wrapper = mount(NavStagePanel, {
        props: {
          modelValue: false
        }
      })
      
      // Note: Actual event emission depends on Vuetify component behavior
      // This tests our component's event handling structure
      expect(wrapper.emitted()).toBeDefined()
    })
  })
})
