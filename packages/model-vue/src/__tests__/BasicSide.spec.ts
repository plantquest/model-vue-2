/**
 * Tests for BasicSide component
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import BasicSide from '@/components/BasicSide.vue'

describe('BasicSide', () => {
  let store: any
  let router: any

  beforeEach(() => {
    store = createStore({
      state: {
        vxg: {
          cmp: {
            BasicSide: {
              show: true
            },
            BasicHead: {
              show: {
                filter: true,
                clear: true
              },
              allow: {}
            }
          }
        },
        showSearch2: false,
        showExpansion: true,
        pathData: null,
        pathEstimation: {
          time: 0,
          distance: 0
        },
        trigger: {
          search: {
            a: '',
            b: ''
          },
          select: {},
          filter_disabled: {
            value: false
          }
        }
      },
      mutations: {
        toggleSearch2: vi.fn(),
        toggleExpansion: vi.fn(),
        setCurrentStage: vi.fn(),
        clear_path_data: vi.fn(),
        clearMatchingConnectorData: vi.fn()
      },
      actions: {
        vxg_get_assets: vi.fn().mockImplementation((context, tool) => {
          tool.assets = [
            { id: '1', tag: 'Asset 1' },
            { id: '2', tag: 'Asset 2' }
          ]
        }),
        set_cmp_flags: vi.fn(),
        trigger_search: vi.fn(),
        trigger_toggle_filter: vi.fn(),
        vxg_trigger_clear: vi.fn(),
        setLastTrackedSearch: vi.fn(),
        clear_path_data: vi.fn(),
        trigger_asset_search: vi.fn(),
        toggleSideInfoCardVisibility: vi.fn()
      }
    })

    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
        { path: '/pqview', name: 'pqview', component: { template: '<div>PQ View</div>' } }
      ]
    })
  })

  it('renders navigation drawer', () => {
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        },
        logo: '<img src="logo.png" />'
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    expect(wrapper.find('.vxg-side').exists()).toBe(true)
  })

  it('displays logo in header', () => {
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        },
        logo: '<img src="logo.png" />'
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    const logo = wrapper.find('.d-flex.justify-space-between')
    expect(logo.html()).toContain('<img src="logo.png" />')
  })

  it('shows clear button when clear is allowed', async () => {
    await router.push('/pqview')
    
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    // Mock tool with clear active
    wrapper.vm.tool = { clear: { active: true } }
    await wrapper.vm.$nextTick()
    
    const clearBtn = wrapper.find('.btn-clear')
    expect(clearBtn.exists()).toBe(true)
  })

  it('clears filter when clear button clicked', async () => {
    await router.push('/pqview')
    
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    wrapper.vm.tool = { clear: { active: true } }
    await wrapper.vm.$nextTick()
    
    await wrapper.find('.btn-clear').trigger('click')
    
    expect(store._actions.vxg_trigger_clear).toHaveBeenCalled()
  })

  it('renders search combobox on pqview route', async () => {
    await router.push('/pqview')
    
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true,
          'v-combobox': true
        }
      }
    })
    
    expect(wrapper.find('.comboxSearch').exists()).toBe(true)
  })

  it('shows navigation mode search when showSearch2 is true', async () => {
    store.state.showSearch2 = true
    await router.push('/pqview')
    
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true,
          'v-combobox': true
        }
      }
    })
    
    expect(wrapper.find('.comboxSearch2').exists()).toBe(true)
  })

  it('displays path estimation when available', async () => {
    store.state.showSearch2 = true
    store.state.pathData = { path: 'test' }
    store.state.pathEstimation = {
      time: 120,
      distance: 500
    }
    await router.push('/pqview')
    
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    wrapper.vm.search2 = 'destination'
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toContain('2:00 minutes')
    expect(wrapper.text()).toContain('500 meters')
  })

  it('renders navigation stages in navigation mode', async () => {
    store.state.showSearch2 = true
    await router.push('/pqview')
    
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    const navStages = wrapper.findComponent({ name: 'BasicNavStages' })
    expect(navStages.exists()).toBe(true)
  })

  it('reverses search inputs when reverse button clicked', async () => {
    store.state.showSearch2 = true
    await router.push('/pqview')
    
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    wrapper.vm.search = 'source'
    wrapper.vm.search2 = 'destination'
    
    await wrapper.vm.reverseInputs()
    
    expect(wrapper.vm.search).toBe('destination')
    expect(wrapper.vm.search2).toBe('source')
  })

  it('loads assets on mount', async () => {
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    await wrapper.vm.$nextTick()
    
    expect(store._actions.vxg_get_assets).toHaveBeenCalled()
  })

  it('handles route query params for navigation mode', async () => {
    await router.push({
      path: '/pqview',
      query: {
        mode: 'route',
        a: 'source',
        b: 'destination'
      }
    })
    
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.search).toBe('source')
    expect(wrapper.vm.search2).toBe('destination')
  })

  it('triggers filter toggle when filter button clicked', async () => {
    await router.push('/pqview')
    
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    await wrapper.vm.filter({})
    
    expect(store._actions.trigger_toggle_filter).toHaveBeenCalled()
  })

  it('renders menu items in standard mode', () => {
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {
            standard: {
              mode: 'standard',
              menu: {
                items: {
                  home: { title: 'Home', icon: 'home', code: 'home' },
                  settings: { title: 'Settings', icon: 'cog', code: 'settings' }
                },
                order: 'home,settings'
              }
            }
          }
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    expect(wrapper.vm.menu.length).toBeGreaterThan(0)
  })

  it('renders custom component in custom mode', () => {
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {
            custom: {
              mode: 'custom',
              cmp: 'CustomComponent',
              view: {
                spec: {}
              }
            }
          }
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true,
          'CustomComponent': true
        }
      }
    })
    
    expect(wrapper.vm.menuView.mode).toBe('custom')
  })

  it('applies correct drawer styles', () => {
    const wrapper = mount(BasicSide, {
      props: {
        spec: {
          footer: { active: false },
          view: {}
        }
      },
      global: {
        plugins: [store, router],
        stubs: {
          'BasicNavStages': true
        }
      }
    })
    
    expect(wrapper.vm.drawerStyle).toEqual({
      width: "282px",
      visibility: "visible !important",
      transform: "none !important"
    })
  })
})
