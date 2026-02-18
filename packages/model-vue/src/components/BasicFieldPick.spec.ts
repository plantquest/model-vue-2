/**
 * BasicFieldPick Component Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import BasicFieldPick from './BasicFieldPick.vue'

describe('BasicFieldPick', () => {
  let mockStore: any

  beforeEach(() => {
    mockStore = createStore({
      state: {
        current_user: {
          profile: 'ob'
        }
      }
    })
  })

  describe('Props', () => {
    it('should render with default props', () => {
      const wrapper = mount(BasicFieldPick, {
        global: { plugins: [mockStore] }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('should accept field prop', () => {
      const field = {
        name: 'role',
        title: 'User Role',
        kind: {}
      }
      const wrapper = mount(BasicFieldPick, {
        props: { field },
        global: { plugins: [mockStore] }
      })
      expect(wrapper.props('field')).toEqual(field)
    })

    it('should accept modelValue prop', () => {
      const wrapper = mount(BasicFieldPick, {
        props: { modelValue: 'test-value' },
        global: { plugins: [mockStore] }
      })
      expect(wrapper.props('modelValue')).toBe('test-value')
    })

    it('should accept multiple prop', () => {
      const wrapper = mount(BasicFieldPick, {
        props: { multiple: true },
        global: { plugins: [mockStore] }
      })
      expect(wrapper.props('multiple')).toBe(true)
    })
  })

  describe('Label Computation', () => {
    it('should use label prop if provided', () => {
      const wrapper = mount(BasicFieldPick, {
        props: {
          label: 'Custom Label',
          field: { name: 'test', title: 'Field Title', kind: {} }
        },
        global: { plugins: [mockStore] }
      })
      expect(wrapper.vm.computedLabel).toBe('Custom Label')
    })

    it('should use field.title if no label prop', () => {
      const wrapper = mount(BasicFieldPick, {
        props: {
          field: { name: 'test', title: 'Field Title', kind: {} }
        },
        global: { plugins: [mockStore] }
      })
      expect(wrapper.vm.computedLabel).toBe('Field Title')
    })

    it('should default to empty string if no label', () => {
      const wrapper = mount(BasicFieldPick, {
        global: { plugins: [mockStore] }
      })
      expect(wrapper.vm.computedLabel).toBe('')
    })
  })

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      const wrapper = mount(BasicFieldPick, {
        props: { disabled: true },
        global: { plugins: [mockStore] }
      })
      expect(wrapper.vm.computedDisabled).toBe(true)
    })

    it('should be disabled when field is readonly', () => {
      const wrapper = mount(BasicFieldPick, {
        props: {
          field: { name: 'test', title: 'Test', kind: {}, readonly: true }
        },
        global: { plugins: [mockStore] }
      })
      expect(wrapper.vm.computedDisabled).toBe(true)
    })

    it('should be disabled when allow function returns false', () => {
      const wrapper = mount(BasicFieldPick, {
        props: {
          field: {
            name: 'test',
            title: 'Test',
            kind: {},
            custom: {
              allow: () => false
            }
          }
        },
        global: { plugins: [mockStore] }
      })
      expect(wrapper.vm.computedDisabled).toBe(true)
    })

    it('should be enabled by default', () => {
      const wrapper = mount(BasicFieldPick, {
        global: { plugins: [mockStore] }
      })
      expect(wrapper.vm.computedDisabled).toBe(false)
    })
  })

  describe('Items Generation', () => {
    it('should generate items from field.kind', () => {
      const wrapper = mount(BasicFieldPick, {
        props: {
          field: {
            name: 'role',
            title: 'Role',
            kind: {
              admin: { title: 'Administrator' },
              user: { title: 'User' }
            }
          }
        },
        global: { plugins: [mockStore] }
      })
      
      expect(wrapper.vm.filteredItems).toHaveLength(2)
      expect(wrapper.vm.filteredItems[0]).toEqual({
        text: 'Administrator',
        value: 'admin'
      })
    })

    it('should return empty array when no kinds', () => {
      const wrapper = mount(BasicFieldPick, {
        props: {
          field: {
            name: 'test',
            title: 'Test',
            kind: {}
          }
        },
        global: { plugins: [mockStore] }
      })
      expect(wrapper.vm.filteredItems).toHaveLength(0)
    })
  })

  describe('Permission Filtering', () => {
    it('should filter out gea for sea profile', () => {
      const store = createStore({
        state: {
          current_user: { profile: 'sea' }
        }
      })
      
      const wrapper = mount(BasicFieldPick, {
        props: {
          field: {
            name: 'role',
            title: 'Role',
            kind: {
              gea: { title: 'System Owner' },
              sea: { title: 'Admin' },
              ob: { title: 'User' }
            }
          }
        },
        global: { plugins: [store] }
      })
      
      const values = wrapper.vm.filteredItems.map((i: any) => i.value)
      expect(values).not.toContain('gea')
      expect(values).toContain('sea')
      expect(values).toContain('ob')
    })

    it('should filter out gea and sea for ob profile', () => {
      const store = createStore({
        state: {
          current_user: { profile: 'ob' }
        }
      })
      
      const wrapper = mount(BasicFieldPick, {
        props: {
          field: {
            name: 'role',
            title: 'Role',
            kind: {
              gea: { title: 'System Owner' },
              sea: { title: 'Admin' },
              ob: { title: 'User' }
            }
          }
        },
        global: { plugins: [store] }
      })
      
      const values = wrapper.vm.filteredItems.map((i: any) => i.value)
      expect(values).not.toContain('gea')
      expect(values).not.toContain('sea')
      expect(values).toContain('ob')
    })

    it('should show all items when no current user', () => {
      const store = createStore({
        state: {
          current_user: null
        }
      })
      
      const wrapper = mount(BasicFieldPick, {
        props: {
          field: {
            name: 'role',
            title: 'Role',
            kind: {
              gea: { title: 'System Owner' },
              sea: { title: 'Admin' },
              ob: { title: 'User' }
            }
          }
        },
        global: { plugins: [store] }
      })
      
      expect(wrapper.vm.filteredItems).toHaveLength(3)
    })
  })

  describe('Selection Handling', () => {
    it('should emit update:modelValue on selection', async () => {
      const wrapper = mount(BasicFieldPick, {
        global: { plugins: [mockStore] }
      })
      
      await wrapper.vm.handleSelection('new-value')
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new-value'])
    })

    it('should emit change event on selection', async () => {
      const wrapper = mount(BasicFieldPick, {
        global: { plugins: [mockStore] }
      })
      
      await wrapper.vm.handleSelection('new-value')
      
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')?.[0]).toEqual(['new-value'])
    })

    it('should update item when field and param provided', async () => {
      const item = { role: 'old-value' }
      const wrapper = mount(BasicFieldPick, {
        props: {
          field: { name: 'role', title: 'Role', kind: {} },
          param: { item }
        },
        global: { plugins: [mockStore] }
      })
      
      await wrapper.vm.handleSelection('new-value')
      
      expect(item.role).toBe('new-value')
    })

    it('should handle multiple selection', async () => {
      const wrapper = mount(BasicFieldPick, {
        props: { multiple: true },
        global: { plugins: [mockStore] }
      })
      
      await wrapper.vm.handleSelection(['value1', 'value2'])
      
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['value1', 'value2']])
    })
  })

  describe('Custom Filter', () => {
    it('should apply custom field filter', () => {
      const wrapper = mount(BasicFieldPick, {
        props: {
          field: {
            name: 'role',
            title: 'Role',
            kind: {
              admin: { title: 'Admin', level: 10 },
              user: { title: 'User', level: 1 }
            },
            custom: {
              field: {
                role: {
                  filter: ([name, kind]: [string, any]) => kind.level >= 5
                }
              }
            }
          }
        },
        global: { plugins: [mockStore] }
      })
      
      // Should only include admin (level 10), not user (level 1)
      expect(wrapper.vm.filteredItems).toHaveLength(1)
      expect(wrapper.vm.filteredItems[0].value).toBe('admin')
    })
  })

  describe('Allow Function', () => {
    it('should expose allow function', () => {
      const wrapper = mount(BasicFieldPick, {
        global: { plugins: [mockStore] }
      })
      expect(wrapper.vm.allow).toBeDefined()
      expect(typeof wrapper.vm.allow).toBe('function')
    })

    it('should return true by default', () => {
      const wrapper = mount(BasicFieldPick, {
        global: { plugins: [mockStore] }
      })
      expect(wrapper.vm.allow('edit')).toBe(true)
    })

    it('should use custom allow function when provided', () => {
      const customAllow = (action: string) => action === 'view'
      const wrapper = mount(BasicFieldPick, {
        props: {
          field: {
            name: 'test',
            title: 'Test',
            kind: {},
            custom: { allow: customAllow }
          }
        },
        global: { plugins: [mockStore] }
      })
      
      expect(wrapper.vm.allow('view')).toBe(true)
      expect(wrapper.vm.allow('edit')).toBe(false)
    })
  })
})
