/**
 * Tests for HeadSearch component
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HeadSearch from '@/components/head/HeadSearch.vue'

describe('HeadSearch', () => {
  const items = ['ASSET001', 'ASSET002', 'ASSET003']

  it('renders v-combobox', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    expect(wrapper.find('v-combobox').exists()).toBe(true)
  })

  it('displays model value', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: 'ASSET001',
        items
      }
    })

    const combobox = wrapper.find('v-combobox')
    expect(combobox.attributes('model-value')).toBe('ASSET001')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    wrapper.vm.handleUpdateValue('ASSET002')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['ASSET002'])
  })

  it('emits keydown on key press', async () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    const event = new KeyboardEvent('keydown', { key: 'a' })
    wrapper.vm.handleKeydown(event)

    expect(wrapper.emitted('keydown')).toBeTruthy()
  })

  it('emits clear on clear button click', async () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: 'ASSET001',
        items
      }
    })

    wrapper.vm.handleClear()

    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('emits change on selection', async () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    wrapper.vm.handleChange('ASSET001')

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual(['ASSET001'])
  })

  it('uses custom filter function', () => {
    const customFilter = vi.fn().mockReturnValue(true)
    
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items,
        customFilter
      }
    })

    const combobox = wrapper.find('v-combobox')
    expect(combobox.attributes('filter')).toBeDefined()
  })

  it('default custom filter performs substring matching', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    // Access the default filter function
    const filter = wrapper.props('customFilter')
    
    expect(filter('ASSET001', 'asset', 'ASSET001')).toBe(true)
    expect(filter('ASSET001', '', 'ASSET001')).toBe(true)
    expect(filter('ASSET001', 'NOTFOUND', 'ASSET001')).toBe(false)
  })

  it('shows placeholder text', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items,
        placeholder: 'Search assets...'
      }
    })

    const combobox = wrapper.find('v-combobox')
    expect(combobox.attributes('placeholder')).toBe('Search assets...')
  })

  it('has clearable attribute', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    const combobox = wrapper.find('v-combobox')
    expect(combobox.attributes('clearable')).toBeDefined()
  })

  it('has flat and outlined attributes', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    const combobox = wrapper.find('v-combobox')
    expect(combobox.attributes('flat')).toBeDefined()
    expect(combobox.attributes('outlined')).toBeDefined()
  })

  it('exposes reset method', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    expect(wrapper.vm.reset).toBeDefined()
    expect(typeof wrapper.vm.reset).toBe('function')
  })

  it('exposes blur method', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    expect(wrapper.vm.blur).toBeDefined()
    expect(typeof wrapper.vm.blur).toBe('function')
  })

  it('exposes closeMenu method', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    expect(wrapper.vm.closeMenu).toBeDefined()
    expect(typeof wrapper.vm.closeMenu).toBe('function')
  })

  it('reset method does not throw', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: 'ASSET001',
        items
      }
    })

    expect(() => wrapper.vm.reset()).not.toThrow()
  })

  it('blur method does not throw', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    expect(() => wrapper.vm.blur()).not.toThrow()
  })

  it('closeMenu method does not throw', () => {
    const wrapper = mount(HeadSearch, {
      props: {
        modelValue: '',
        items
      }
    })

    expect(() => wrapper.vm.closeMenu()).not.toThrow()
  })
})
