/**
 * Tests for BasicAdmin component
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import BasicAdmin from '@/components/BasicAdmin.vue'

describe('BasicAdmin', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: {
        model: {
          main: {
            app: {
              web: {
                parts: {
                  head: { tool: {} },
                  side: { menu: {} },
                  main: { content: {} },
                  foot: { copyright: 'PlantQuest' }
                }
              }
            }
          }
        },
        vxg: {
          cmp: {
            BasicSide: {
              show: true
            }
          }
        }
      }
    })
  })

  it('renders v-app container', () => {
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
    
    expect(wrapper.find('#app').exists()).toBe(true)
  })

  it('renders BasicHead component with spec and logo', () => {
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
    
    const head = wrapper.findComponent({ name: 'vxg-basic-head' })
    expect(head.exists()).toBe(true)
    expect(head.props('logo')).toBe('<img src="logo.png" />')
  })

  it('conditionally renders BasicSide based on Vuex state', () => {
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
    
    expect(wrapper.findComponent({ name: 'vxg-basic-side' }).exists()).toBe(true)
    
    // Hide side
    store.state.vxg.cmp.BasicSide.show = false
    wrapper.vm.$nextTick()
    
    expect(wrapper.findComponent({ name: 'vxg-basic-side' }).exists()).toBe(false)
  })

  it('renders BasicMain component', () => {
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

  it('renders BasicFoot component', () => {
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

  it('emits action event when BasicHead emits action', async () => {
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
    
    const head = wrapper.findComponent({ name: 'vxg-basic-head' })
    await head.vm.$emit('action', { type: 'test', data: 'value' })
    
    expect(wrapper.emitted('action')).toBeTruthy()
    expect(wrapper.emitted('action')?.[0]).toEqual([{
      part: 'BasicHead',
      event: { type: 'test', data: 'value' }
    }])
  })

  it('emits action event when BasicSide emits action', async () => {
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
    
    const side = wrapper.findComponent({ name: 'vxg-basic-side' })
    await side.vm.$emit('action', { type: 'navigate', route: '/test' })
    
    expect(wrapper.emitted('action')).toBeTruthy()
    expect(wrapper.emitted('action')?.[0]).toEqual([{
      part: 'BasicSide',
      event: { type: 'navigate', route: '/test' }
    }])
  })

  it('passes spec parts to child components correctly', () => {
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
    
    expect(wrapper.vm.headSpec).toEqual({ tool: {} })
    expect(wrapper.vm.sideSpec).toEqual({ menu: {} })
    expect(wrapper.vm.mainSpec).toEqual({ content: {} })
    expect(wrapper.vm.footSpec).toEqual({ copyright: 'PlantQuest' })
  })

  it('logs spec parts on mount', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    
    mount(BasicAdmin, {
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
    
    expect(consoleSpy).toHaveBeenCalledWith('BasicAdmin mounted', expect.any(Object))
  })

  it('handles missing model data gracefully', () => {
    store.state.model = null
    
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
    
    expect(wrapper.vm.spec).toEqual({})
    expect(wrapper.vm.headSpec).toEqual({})
  })
})
