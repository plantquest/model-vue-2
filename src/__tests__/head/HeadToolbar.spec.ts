/**
 * Tests for HeadToolbar component
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeadToolbar from '@/components/head/HeadToolbar.vue'

describe('HeadToolbar', () => {
  const selectItems = [
    { value: 'option1', text: 'Option 1' },
    { value: 'option2', text: 'Option 2' }
  ]

  it('renders select dropdown when showSelect is true', () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showSelect: true,
        selectItems
      }
    })

    expect(wrapper.find('v-select').exists()).toBe(true)
  })

  it('does not render select when showSelect is false', () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showSelect: false,
        selectItems
      }
    })

    expect(wrapper.find('v-select').exists()).toBe(false)
  })

  it('renders add button when showAdd is true', () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showAdd: true,
        itemName: 'Asset'
      }
    })

    const buttons = wrapper.findAll('v-btn')
    const addButton = buttons.find(btn => btn.text().includes('Add'))
    expect(addButton).toBeTruthy()
  })

  it('renders remove button when showRemove is true', () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showRemove: true,
        itemName: 'Asset'
      }
    })

    const buttons = wrapper.findAll('v-btn')
    const removeButton = buttons.find(btn => btn.text().includes('Remove'))
    expect(removeButton).toBeTruthy()
  })

  it('shows "Add Fixed Asset" when itemName is Asset', () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showAdd: true,
        itemName: 'Asset'
      }
    })

    expect(wrapper.text()).toContain('Add Fixed Asset')
  })

  it('shows "Add Device" when itemName is Device', () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showAdd: true,
        itemName: 'Device'
      }
    })

    expect(wrapper.text()).toContain('Add Device')
  })

  it('emits update:modelValue when select changes', async () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showSelect: true,
        selectItems,
        modelValue: 'option1'
      }
    })

    // Simulate select change
    wrapper.vm.handleSelectChange('option2')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option2'])
  })

  it('emits add event when add button is clicked', async () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showAdd: true,
        itemName: 'Asset'
      }
    })

    const buttons = wrapper.findAll('v-btn')
    const addButton = buttons.find(btn => btn.text().includes('Add'))
    await addButton?.trigger('click')

    expect(wrapper.emitted('add')).toBeTruthy()
  })

  it('emits remove event when remove button is clicked', async () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showRemove: true,
        itemName: 'Asset'
      }
    })

    const buttons = wrapper.findAll('v-btn')
    const removeButton = buttons.find(btn => btn.text().includes('Remove'))
    await removeButton?.trigger('click')

    expect(wrapper.emitted('remove')).toBeTruthy()
  })

  it('renders dividers between elements', () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showAdd: true,
        showRemove: true,
        itemName: 'Asset'
      }
    })

    const dividers = wrapper.findAll('v-divider')
    expect(dividers.length).toBeGreaterThan(0)
  })

  it('passes select label to v-select', () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showSelect: true,
        selectItems,
        selectLabel: 'Choose Entity'
      }
    })

    const select = wrapper.find('v-select')
    expect(select.attributes('label')).toBe('Choose Entity')
  })

  it('passes select items to v-select', () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showSelect: true,
        selectItems
      }
    })

    const select = wrapper.find('v-select')
    expect(select.attributes('items')).toBeDefined()
  })

  it('renders nothing when all flags are false', () => {
    const wrapper = mount(HeadToolbar, {
      props: {
        showSelect: false,
        showAdd: false,
        showRemove: false
      }
    })

    expect(wrapper.find('v-select').exists()).toBe(false)
    expect(wrapper.findAll('v-btn').length).toBe(0)
  })
})
