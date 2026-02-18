/**
 * BasicAdmin Component Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import BasicAdmin from './BasicAdmin.vue'

describe('BasicAdmin', () => {
  let store: any

  beforeEach(() => {
    // Mock $model
    ;(window as any).$model = {
      main: {
        app: {
          web: {
            parts: {
              head: { title: 'Header' },
              side: { title: 'Sidebar' },
              main: { title: 'Main' },
              foot: { title: 'Footer' }
            }
          }
        }
      }
    }

    store = createStore({
      state: {
        vxg: {
          cmp: {
            BasicSide: {
              show: false
            }
          }
        }
      }
    })
  })

  describe('Props', () => {
    it('should render with default props', () => {
      const wrapper = mount(BasicAdmin, {
        global: {
          plugins: [store],
          stubs: {
            'vxg-basic-head': true,
            'vxg-basic-side': true,
            'vxg-basic-main': true,
            'vxg-basic-foot': true
          }
        }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('should accept logo prop', () => {
      const wrapper = mount(BasicAdmin, {
        props: {
          logo: '<img src="logo.png" />'
        },
        global: {
          plugins: [store],
          stubs: {
            'vxg-basic-head': true,
            'vxg-basic-side': true,
            'vxg-basic-main': true,
            'vxg-basic-foot': true
          }
        }
      })
      expect(wrapper.props('logo')).toBe('<img src="logo.png" />')
    })
  })

  describe('Component Composition', () => {
    it('should render BasicHead', () => {
      const wrapper = mount(BasicAdmin, {
        global: {
          plugins: [store],
          stubs: {
            'vxg-basic-head': true,
            'vxg-basic-side': true,
            'vxg-basic-main': true,
            'vxg-basic-foot': true
          }
        }
      })
      expect(wrapper.findComponent({ name: 'vxg-basic-head' }).exists()).toBe(true)
    })

    it('should render BasicMain', () => {
      const wrapper = mount(BasicAdmin, {
        global: {
          plugins: [store],
          stubs: {
            'vxg-basic-head': true,
            'vxg-basic-side': true,
            'vxg-basic-main': true,
            'vxg-basic-foot': true
          }
        }
      })
      expect(wrapper.findComponent({ name: 'vxg-basic-main' }).exists()).toBe(true)
    })

    it('should render BasicFoot', () => {
      const wrapper = mount(BasicAdmin, {
        global: {
          plugins: [store],
          stubs: {
            'vxg-basic-head': true,
            'vxg-basic-side': true,
            'vxg-basic-main': true,
            'vxg-basic-foot': true
          }
        }
      })
      expect(wrapper.findComponent({ name: 'vxg-basic-foot' }).exists()).toBe(true)
    })

    it('should conditionally render BasicSide based on store', () => {
      const wrapper = mount(BasicAdmin, {
        global: {
          plugins: [store],
          stubs: {
            'vxg-basic-head': true,
            'vxg-basic-side': true,
            'vxg-basic-main': true,
            'vxg-basic-foot': true
          }
        }
      })
      
      // Side should not render when show is false
      expect(wrapper.vm.showSide).toBe(false)
    })

    it('should show BasicSide when store state is true', () => {
      store.state.vxg.cmp.BasicSide.show = true
      
      const wrapper = mount(BasicAdmin, {
        global: {
          plugins: [store],
          stubs: {
            'vxg-basic-head': true,
            'vxg-basic-side': true,
            'vxg-basic-main': true,
            'vxg-basic-foot': true
          }
        }
      })
      
      expect(wrapper.vm.showSide).toBe(true)
    })
  })

  describe('Event Handling', () => {
    it('should emit action event from BasicHead', async () => {
      const wrapper = mount(BasicAdmin, {
        global: {
          plugins: [store],
          stubs: {
            'vxg-basic-head': {
              template: '<div @click="$emit(\'action\', \'test\')">Head</div>'
            },
            'vxg-basic-side': true,
            'vxg-basic-main': true,
            'vxg-basic-foot': true
          }
        }
      })
      
      await wrapper.find('div').trigger('click')
      
      expect(wrapper.emitted('action')).toBeTruthy()
    })

    it('should format action event correctly', async () => {
      const wrapper = mount(BasicAdmin, {
        global: {
          plugins: [store],
          stubs: {
            'vxg-basic-head': true,
            'vxg-basic-side': true,
            'vxg-basic-main': true,
            'vxg-basic-foot': true
          }
        }
      })
      
      await wrapper.vm.handleAction('BasicHead', { type: 'click' })
      
      expect(wrapper.emitted('action')?.[0]).toEqual([{
        part: 'BasicHead',
        event: { type: 'click' }
      }])
    })
  })

  describe('Spec Loading', () => {
    it('should load spec from model on mount', () => {
      const wrapper = mount(BasicAdmin, {
        global: {
          plugins: [store],
          stubs: {
            'vxg-basic-head': true,
            'vxg-basic-side': true,
            'vxg-basic-main': true,
            'vxg-basic-foot': true
          }
        }
      })
      
      expect(wrapper.vm.spec).toHaveProperty('parts')
    })
  })
})
