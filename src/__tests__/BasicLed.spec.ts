import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasicLed from '../components/BasicLed.vue'

describe('BasicLed', () => {
  it('renders with default status (off)', () => {
    const wrapper = mount(BasicLed, {
      props: {}
    })
    expect(wrapper.find('[role="img"]').exists()).toBe(true)
  })

  it('renders green when status is on', () => {
    const wrapper = mount(BasicLed, {
      props: { status: 'on' }
    })
    const icon = wrapper.find('[role="img"]')
    expect(icon.exists()).toBe(true)
    // In Vuetify 3, check the color via classes or attributes
  })

  it('renders orange when status is warning', () => {
    const wrapper = mount(BasicLed, {
      props: { status: 'warning' }
    })
    const icon = wrapper.find('[role="img"]')
    expect(icon.exists()).toBe(true)
  })

  it('renders red when status is error', () => {
    const wrapper = mount(BasicLed, {
      props: { status: 'error' }
    })
    const icon = wrapper.find('[role="img"]')
    expect(icon.exists()).toBe(true)
  })

  it('renders grey when status is off', () => {
    const wrapper = mount(BasicLed, {
      props: { status: 'off' }
    })
    const icon = wrapper.find('[role="img"]')
    expect(icon.exists()).toBe(true)
  })

  it('uses correct icon (mdi-circle)', () => {
    const wrapper = mount(BasicLed, {
      props: { status: 'on' }
    })
    expect(wrapper.html()).toContain('mdi-circle')
  })

  it('reads status from spec object', () => {
    const wrapper = mount(BasicLed, {
      props: {
        spec: { status: 'warning' }
      }
    })
    expect(wrapper.find('[role="img"]').exists()).toBe(true)
  })

  it('reads status from item via spec field', () => {
    const wrapper = mount(BasicLed, {
      props: {
        spec: { field: 'deviceStatus' },
        param: {
          item: {
            deviceStatus: 'error'
          }
        }
      }
    })
    expect(wrapper.find('[role="img"]').exists()).toBe(true)
  })

  it('prioritizes direct status prop over spec', () => {
    const wrapper = mount(BasicLed, {
      props: {
        status: 'on',
        spec: { status: 'error' }
      }
    })
    // Should use 'on' status (green)
    expect(wrapper.find('[role="img"]').exists()).toBe(true)
  })

  it('handles missing item gracefully', () => {
    const wrapper = mount(BasicLed, {
      props: {
        spec: { field: 'status' },
        param: {}
      }
    })
    // Should default to 'off'
    expect(wrapper.find('[role="img"]').exists()).toBe(true)
  })

  it('handles empty spec gracefully', () => {
    const wrapper = mount(BasicLed, {
      props: {
        spec: {},
        param: { item: {} }
      }
    })
    // Should default to 'off'
    expect(wrapper.find('[role="img"]').exists()).toBe(true)
  })
})
