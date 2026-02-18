/**
 * Tests for HeadUtilities component
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeadUtilities from '@/components/head/HeadUtilities.vue'

describe('HeadUtilities', () => {
  it('renders print button when showPrint is true', () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showPrint: true
      }
    })

    const icons = wrapper.findAll('v-icon')
    const printIcon = icons.find(icon => icon.text().includes('mdi-printer'))
    expect(printIcon).toBeTruthy()
  })

  it('does not render print button when showPrint is false', () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showPrint: false
      }
    })

    const icons = wrapper.findAll('v-icon')
    const printIcon = icons.find(icon => icon.text().includes('mdi-printer'))
    expect(printIcon).toBeFalsy()
  })

  it('renders bookmark button when showBookmark is true', () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showBookmark: true
      }
    })

    const icons = wrapper.findAll('v-icon')
    const bookmarkIcon = icons.find(icon => icon.text().includes('mdi-bookmark-minus-outline'))
    expect(bookmarkIcon).toBeTruthy()
  })

  it('renders collect button when showCollect is true', () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showCollect: true
      }
    })

    const icons = wrapper.findAll('v-icon')
    const collectIcon = icons.find(icon => icon.text().includes('mdi-folder-open-outline'))
    expect(collectIcon).toBeTruthy()
  })

  it('emits print event when print button is clicked', async () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showPrint: true
      }
    })

    const buttons = wrapper.findAll('v-btn')
    await buttons[0].trigger('click')

    expect(wrapper.emitted('print')).toBeTruthy()
  })

  it('emits bookmark event when bookmark button is clicked', async () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showBookmark: true,
        bookmarkVisible: true
      }
    })

    const buttons = wrapper.findAll('v-btn')
    await buttons[0].trigger('click')

    expect(wrapper.emitted('bookmark')).toBeTruthy()
  })

  it('emits collect event when collect button is clicked', async () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showCollect: true
      }
    })

    const buttons = wrapper.findAll('v-btn')
    await buttons[0].trigger('click')

    expect(wrapper.emitted('collect')).toBeTruthy()
  })

  it('disables print button when printDisabled is true', () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showPrint: true,
        printDisabled: true
      }
    })

    const buttons = wrapper.findAll('v-btn')
    expect(buttons[0].attributes('disabled')).toBeDefined()
  })

  it('disables bookmark button when bookmarkVisible is false', () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showBookmark: true,
        bookmarkVisible: false
      }
    })

    const buttons = wrapper.findAll('v-btn')
    expect(buttons[0].attributes('disabled')).toBeDefined()
  })

  it('shows "SHOW TAGS" tooltip when bookmark is inactive', () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showBookmark: true,
        bookmarkVisible: true,
        bookmarkActive: false
      }
    })

    const tooltips = wrapper.findAll('v-tooltip')
    const bookmarkTooltip = tooltips.find(tooltip => 
      tooltip.text().includes('SHOW TAGS')
    )
    expect(bookmarkTooltip).toBeTruthy()
  })

  it('shows "HIDE TAGS" tooltip when bookmark is active', () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showBookmark: true,
        bookmarkVisible: true,
        bookmarkActive: true
      }
    })

    const tooltips = wrapper.findAll('v-tooltip')
    const bookmarkTooltip = tooltips.find(tooltip => 
      tooltip.text().includes('HIDE TAGS')
    )
    expect(bookmarkTooltip).toBeTruthy()
  })

  it('renders dividers between buttons', () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showPrint: true,
        showBookmark: true,
        showCollect: true
      }
    })

    const dividers = wrapper.findAll('v-divider')
    expect(dividers.length).toBeGreaterThan(0)
  })

  it('renders nothing when all flags are false', () => {
    const wrapper = mount(HeadUtilities, {
      props: {
        showPrint: false,
        showBookmark: false,
        showCollect: false
      }
    })

    expect(wrapper.findAll('v-btn').length).toBe(0)
  })
})
