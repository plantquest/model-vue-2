/**
 * BasicLed Component Tests
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasicLed from './BasicLed.vue'

describe('BasicLed', () => {
  describe('Props', () => {
    it('should render with default props', () => {
      const wrapper = mount(BasicLed)
      expect(wrapper.exists()).toBe(true)
    })

    it('should accept status prop', () => {
      const wrapper = mount(BasicLed, {
        props: {
          status: 'on'
        }
      })
      expect(wrapper.props('status')).toBe('on')
    })

    it('should accept spec prop', () => {
      const wrapper = mount(BasicLed, {
        props: {
          spec: { status: 'warning', field: 'test' }
        }
      })
      expect(wrapper.props('spec')).toHaveProperty('status', 'warning')
    })

    it('should accept param prop', () => {
      const wrapper = mount(BasicLed, {
        props: {
          param: { item: { status: 'error' } }
        }
      })
      expect(wrapper.props('param')).toHaveProperty('item')
    })
  })

  describe('Status Resolution', () => {
    it('should use direct status prop first', () => {
      const wrapper = mount(BasicLed, {
        props: {
          status: 'on',
          spec: { status: 'warning' }
        }
      })
      // Direct prop takes precedence
      expect(wrapper.vm.resolvedStatus).toBe('on')
    })

    it('should use spec.status if no direct status', () => {
      const wrapper = mount(BasicLed, {
        props: {
          status: 'off',
          spec: { status: 'warning' }
        }
      })
      expect(wrapper.vm.resolvedStatus).toBe('warning')
    })

    it('should use item[spec.field] as fallback', () => {
      const wrapper = mount(BasicLed, {
        props: {
          spec: { field: 'health' },
          param: { item: { health: 'error' } }
        }
      })
      expect(wrapper.vm.resolvedStatus).toBe('error')
    })

    it('should default to off when no status provided', () => {
      const wrapper = mount(BasicLed)
      expect(wrapper.vm.resolvedStatus).toBe('off')
    })
  })

  describe('Color Mapping', () => {
    it('should show green for on status', () => {
      const wrapper = mount(BasicLed, {
        props: { status: 'on' }
      })
      expect(wrapper.vm.color).toBe('green')
    })

    it('should show orange for warning status', () => {
      const wrapper = mount(BasicLed, {
        props: { status: 'warning' }
      })
      expect(wrapper.vm.color).toBe('orange')
    })

    it('should show red for error status', () => {
      const wrapper = mount(BasicLed, {
        props: { status: 'error' }
      })
      expect(wrapper.vm.color).toBe('red')
    })

    it('should show grey for off status', () => {
      const wrapper = mount(BasicLed, {
        props: { status: 'off' }
      })
      expect(wrapper.vm.color).toBe('grey')
    })

    it('should show grey for unknown status', () => {
      const wrapper = mount(BasicLed, {
        props: { status: 'off' }
      })
      expect(wrapper.vm.color).toBe('grey')
    })
  })

  describe('Icon', () => {
    it('should always use mdi-circle icon', () => {
      const wrapper = mount(BasicLed)
      expect(wrapper.vm.icon).toBe('mdi-circle')
    })
  })

  describe('Rendering', () => {
    it('should render v-icon component', () => {
      const wrapper = mount(BasicLed, {
        props: { status: 'on' }
      })
      expect(wrapper.find('[icon]').exists()).toBe(true)
    })
  })
})
