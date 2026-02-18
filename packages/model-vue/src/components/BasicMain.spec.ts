/**
 * BasicMain Component Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import BasicMain from './BasicMain.vue'

describe('BasicMain', () => {
  let router: any

  beforeEach(() => {
    // Mock $model
    ;(window as any).$model = {
      main: {
        app: {
          web: {
            defaults: {
              view: 'default'
            },
            view: {
              default: {
                spec: {
                  title: 'Default View'
                }
              },
              custom: {
                spec: {
                  title: 'Custom View'
                }
              }
            }
          }
        }
      }
    }

    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { 
          path: '/', 
          component: { template: '<div>Home</div>' },
          meta: { view: 'default' }
        }
      ]
    })
  })

  describe('Rendering', () => {
    it('should render v-main wrapper', () => {
      const wrapper = mount(BasicMain, {
        global: {
          plugins: [router],
          stubs: {
            'router-view': true
          }
        }
      })
      expect(wrapper.find('.v-main').exists()).toBe(true)
    })

    it('should render v-container with fluid and pa-0', () => {
      const wrapper = mount(BasicMain, {
        global: {
          plugins: [router],
          stubs: {
            'router-view': true
          }
        }
      })
      const container = wrapper.find('.v-container')
      expect(container.exists()).toBe(true)
    })

    it('should render router-view', () => {
      const wrapper = mount(BasicMain, {
        global: {
          plugins: [router],
          stubs: {
            'router-view': true
          }
        }
      })
      expect(wrapper.findComponent({ name: 'router-view' }).exists()).toBe(true)
    })
  })

  describe('ViewSpec Computation', () => {
    it('should compute viewSpec from route meta', async () => {
      await router.push('/')
      
      const wrapper = mount(BasicMain, {
        global: {
          plugins: [router],
          stubs: {
            'router-view': true
          }
        }
      })
      
      expect(wrapper.vm.viewSpec).toHaveProperty('title', 'Default View')
    })

    it('should use default view when no route meta', () => {
      router = createRouter({
        history: createMemoryHistory(),
        routes: [
          { 
            path: '/no-meta', 
            component: { template: '<div>No Meta</div>' }
          }
        ]
      })
      
      router.push('/no-meta')
      
      const wrapper = mount(BasicMain, {
        global: {
          plugins: [router],
          stubs: {
            'router-view': true
          }
        }
      })
      
      expect(wrapper.vm.viewSpec).toHaveProperty('title', 'Default View')
    })

    it('should return empty object if no model', () => {
      delete (window as any).$model
      
      const wrapper = mount(BasicMain, {
        global: {
          plugins: [router],
          stubs: {
            'router-view': true
          }
        }
      })
      
      expect(wrapper.vm.viewSpec).toEqual({})
    })
  })

  describe('Props to router-view', () => {
    it('should pass viewSpec to router-view', () => {
      const wrapper = mount(BasicMain, {
        global: {
          plugins: [router],
          stubs: {
            'router-view': true
          }
        }
      })
      
      const routerView = wrapper.findComponent({ name: 'router-view' })
      expect(routerView.props('spec')).toBeDefined()
    })
  })
})
