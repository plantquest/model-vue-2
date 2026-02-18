/**
 * Tests for HeadNavigation component
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeadNavigation from '@/components/head/HeadNavigation.vue'

describe('HeadNavigation', () => {
  it('renders drawer expand icon when showExpandSide is true and drawer is closed', () => {
    const wrapper = mount(HeadNavigation, {
      props: {
        showExpandSide: true,
        drawerOpen: false
      }
    })

    const icons = wrapper.findAll('v-icon')
    expect(icons.length).toBeGreaterThan(0)
    expect(icons[0].text()).toContain('mdi-chevron-right')
  })

  it('does not render drawer expand icon when drawer is open', () => {
    const wrapper = mount(HeadNavigation, {
      props: {
        showExpandSide: true,
        drawerOpen: true
      }
    })

    const rightChevrons = wrapper.findAll('v-icon').filter(icon => 
      icon.text().includes('mdi-chevron-right')
    )
    expect(rightChevrons.length).toBe(0)
  })

  it('renders detail collapse icon when showExpandMain is true and detail is closed', () => {
    const wrapper = mount(HeadNavigation, {
      props: {
        showExpandMain: true,
        detailOpen: false
      }
    })

    const icons = wrapper.findAll('v-icon')
    const leftChevrons = icons.filter(icon => icon.text().includes('mdi-chevron-left'))
    expect(leftChevrons.length).toBeGreaterThan(0)
  })

  it('does not render detail collapse icon when detail is open', () => {
    const wrapper = mount(HeadNavigation, {
      props: {
        showExpandMain: true,
        detailOpen: true
      }
    })

    const icons = wrapper.findAll('v-icon')
    const leftChevrons = icons.filter(icon => icon.text().includes('mdi-chevron-left'))
    expect(leftChevrons.length).toBe(0)
  })

  it('emits toggle-drawer when drawer icon is clicked', async () => {
    const wrapper = mount(HeadNavigation, {
      props: {
        showExpandSide: true,
        drawerOpen: false
      }
    })

    const icons = wrapper.findAll('v-icon')
    await icons[0].trigger('click')

    expect(wrapper.emitted('toggle-drawer')).toBeTruthy()
    expect(wrapper.emitted('toggle-drawer')?.length).toBe(1)
  })

  it('emits toggle-detail when detail icon is clicked', async () => {
    const wrapper = mount(HeadNavigation, {
      props: {
        showExpandMain: true,
        detailOpen: false
      }
    })

    const icons = wrapper.findAll('v-icon')
    const leftChevron = icons.find(icon => icon.text().includes('mdi-chevron-left'))
    await leftChevron?.trigger('click')

    expect(wrapper.emitted('toggle-detail')).toBeTruthy()
    expect(wrapper.emitted('toggle-detail')?.length).toBe(1)
  })

  it('renders dividers alongside navigation icons', () => {
    const wrapper = mount(HeadNavigation, {
      props: {
        showExpandSide: true,
        drawerOpen: false,
        showExpandMain: true,
        detailOpen: false
      }
    })

    const dividers = wrapper.findAll('v-divider')
    expect(dividers.length).toBeGreaterThan(0)
  })

  it('renders nothing when all flags are false', () => {
    const wrapper = mount(HeadNavigation, {
      props: {
        showExpandSide: false,
        showExpandMain: false
      }
    })

    expect(wrapper.findAll('v-icon').length).toBe(0)
  })
})
