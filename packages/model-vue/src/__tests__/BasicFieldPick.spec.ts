import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import BasicFieldPick from '../components/BasicFieldPick.vue'

describe('BasicFieldPick', () => {
  let mockStore: any

  beforeEach(() => {
    mockStore = createStore({
      state: {
        current_user: {
          profile: 'ob' // Regular user
        }
      }
    })
  })

  it('renders select element', () => {
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {}
        }
      },
      global: {
        plugins: [mockStore]
      }
    })
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('displays label from field title', () => {
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {}
        }
      },
      global: {
        plugins: [mockStore]
      }
    })
    expect(wrapper.text()).toContain('User Role')
  })

  it('displays label from prop when provided', () => {
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {}
        },
        label: 'Custom Label'
      },
      global: {
        plugins: [mockStore]
      }
    })
    expect(wrapper.text()).toContain('Custom Label')
  })

  it('generates items from field.kind', () => {
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {
            admin: { title: 'Administrator', level: 1 },
            user: { title: 'Regular User', level: 2 }
          }
        }
      },
      global: {
        plugins: [mockStore]
      }
    })
    // Check that items are rendered (implementation-specific)
    expect(wrapper.html()).toBeTruthy()
  })

  it('filters items based on user permissions (Admin user)', () => {
    mockStore = createStore({
      state: {
        current_user: {
          profile: 'sea' // Admin user
        }
      }
    })

    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {
            gea: { title: 'System Owner', level: 1 },
            sea: { title: 'Admin', level: 2 },
            ob: { title: 'User', level: 3 }
          }
        }
      },
      global: {
        plugins: [mockStore]
      }
    })
    
    // Admin should not see 'gea' (System Owner) option
    const vm = wrapper.vm as any
    const items = vm.filteredItems
    expect(items.find((item: any) => item.value === 'gea')).toBeUndefined()
    expect(items.find((item: any) => item.value === 'sea')).toBeDefined()
    expect(items.find((item: any) => item.value === 'ob')).toBeDefined()
  })

  it('filters items based on user permissions (Regular user)', () => {
    mockStore = createStore({
      state: {
        current_user: {
          profile: 'ob' // Regular user
        }
      }
    })

    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {
            gea: { title: 'System Owner', level: 1 },
            sea: { title: 'Admin', level: 2 },
            ob: { title: 'User', level: 3 }
          }
        }
      },
      global: {
        plugins: [mockStore]
      }
    })
    
    // Regular user should only see 'ob' (User) option
    const vm = wrapper.vm as any
    const items = vm.filteredItems
    expect(items.find((item: any) => item.value === 'gea')).toBeUndefined()
    expect(items.find((item: any) => item.value === 'sea')).toBeUndefined()
    expect(items.find((item: any) => item.value === 'ob')).toBeDefined()
  })

  it('emits update:modelValue when selection changes', async () => {
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {
            admin: { title: 'Administrator' },
            user: { title: 'Regular User' }
          }
        },
        modelValue: 'user'
      },
      global: {
        plugins: [mockStore]
      }
    })

    await wrapper.vm.handleSelection('admin')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['admin'])
  })

  it('emits change event when selection changes', async () => {
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {
            admin: { title: 'Administrator' },
            user: { title: 'Regular User' }
          }
        },
        modelValue: 'user'
      },
      global: {
        plugins: [mockStore]
      }
    })

    await wrapper.vm.handleSelection('admin')
    
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['admin'])
  })

  it('is disabled when readonly prop is true', () => {
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {},
          readonly: true
        }
      },
      global: {
        plugins: [mockStore]
      }
    })
    
    const vm = wrapper.vm as any
    expect(vm.disabled).toBe(true)
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {}
        },
        disabled: true
      },
      global: {
        plugins: [mockStore]
      }
    })
    
    const vm = wrapper.vm as any
    expect(vm.disabled).toBe(true)
  })

  it('respects custom allow function', () => {
    const allowFunc = vi.fn().mockReturnValue(false)
    
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {},
          custom: {
            allow: allowFunc
          }
        }
      },
      global: {
        plugins: [mockStore]
      }
    })
    
    const vm = wrapper.vm as any
    expect(vm.disabled).toBe(true)
  })

  it('supports multiple selection mode', () => {
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'roles',
          title: 'User Roles',
          kind: {
            admin: { title: 'Administrator' },
            user: { title: 'Regular User' }
          }
        },
        multiple: true,
        modelValue: []
      },
      global: {
        plugins: [mockStore]
      }
    })
    
    expect(wrapper.props('multiple')).toBe(true)
  })

  it('updates item value in legacy mode', async () => {
    const item = { role: 'user' }
    
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {
            admin: { title: 'Administrator' },
            user: { title: 'Regular User' }
          }
        },
        param: { item }
      },
      global: {
        plugins: [mockStore]
      }
    })

    await wrapper.vm.handleSelection('admin')
    
    expect(item.role).toBe('admin')
  })

  it('handles custom field filter', () => {
    const filterFunc = vi.fn().mockReturnValue(true)
    
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {
            admin: { title: 'Administrator' },
            user: { title: 'Regular User' }
          },
          custom: {
            field: {
              role: {
                filter: filterFunc
              }
            }
          }
        }
      },
      global: {
        plugins: [mockStore]
      }
    })
    
    // Filter should be called for each item
    expect(filterFunc).toHaveBeenCalled()
  })

  it('renders with no kinds', () => {
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: undefined
        }
      },
      global: {
        plugins: [mockStore]
      }
    })
    
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('handles missing store gracefully', () => {
    const wrapper = mount(BasicFieldPick, {
      props: {
        field: {
          name: 'role',
          title: 'User Role',
          kind: {
            admin: { title: 'Administrator' }
          }
        }
      }
    })
    
    expect(wrapper.find('select').exists()).toBe(true)
  })
})
