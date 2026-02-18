/**
 * Tests for HeadUser component
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeadUser from '@/components/head/HeadUser.vue'

describe('HeadUser', () => {
  it('renders icon when show prop is true', () => {
    const wrapper = mount(HeadUser, {
      props: {
        show: true
      }
    })

    expect(wrapper.find('v-icon').exists()).toBe(true)
    expect(wrapper.find('v-icon').text()).toContain('mdi-account')
  })

  it('does not render icon when show prop is false', () => {
    const wrapper = mount(HeadUser, {
      props: {
        show: false
      }
    })

    expect(wrapper.find('v-icon').exists()).toBe(false)
  })

  it('emits click event when icon is clicked', async () => {
    const wrapper = mount(HeadUser, {
      props: {
        show: true
      }
    })

    await wrapper.find('v-icon').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('has large icon style', () => {
    const wrapper = mount(HeadUser, {
      props: {
        show: true
      }
    })

    const icon = wrapper.find('v-icon')
    expect(icon.attributes('large')).toBeDefined()
  })

  it('has light theme', () => {
    const wrapper = mount(HeadUser, {
      props: {
        show: true
      }
    })

    const icon = wrapper.find('v-icon')
    expect(icon.attributes('light')).toBeDefined()
  })
})
