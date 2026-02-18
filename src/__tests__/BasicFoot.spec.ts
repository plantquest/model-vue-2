import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import BasicFoot from '../components/BasicFoot.vue'

describe('BasicFoot', () => {
  const mockRouter = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/about', component: { template: '<div>About</div>' } }
    ]
  })

  it('renders footer element', () => {
    const wrapper = mount(BasicFoot, {
      global: {
        plugins: [mockRouter]
      }
    })
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('displays current year in copyright', () => {
    const wrapper = mount(BasicFoot, {
      global: {
        plugins: [mockRouter]
      }
    })
    const currentYear = new Date().getFullYear()
    expect(wrapper.text()).toContain(currentYear.toString())
  })

  it('displays custom copyright text', () => {
    const wrapper = mount(BasicFoot, {
      props: {
        copyright: '© MyCompany'
      },
      global: {
        plugins: [mockRouter]
      }
    })
    expect(wrapper.text()).toContain('© MyCompany')
  })

  it('displays default copyright when not provided', () => {
    const wrapper = mount(BasicFoot, {
      global: {
        plugins: [mockRouter]
      }
    })
    expect(wrapper.text()).toContain('© PlantQuest')
  })

  it('displays version when provided', () => {
    const wrapper = mount(BasicFoot, {
      props: {
        version: '1.2.3'
      },
      global: {
        plugins: [mockRouter]
      }
    })
    expect(wrapper.text()).toContain('v1.2.3')
  })

  it('does not display version when not provided', () => {
    const wrapper = mount(BasicFoot, {
      global: {
        plugins: [mockRouter]
      }
    })
    expect(wrapper.text()).not.toContain('v')
  })

  it('renders footer links', () => {
    const links = [
      { id: 'home', label: 'Home', route: '/' },
      { id: 'about', label: 'About', route: '/about' }
    ]
    const wrapper = mount(BasicFoot, {
      props: { links },
      global: {
        plugins: [mockRouter]
      }
    })
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('About')
  })

  it('emits linkClick event when link is clicked', async () => {
    const links = [
      { id: 'home', label: 'Home', route: '/' }
    ]
    const wrapper = mount(BasicFoot, {
      props: { links },
      global: {
        plugins: [mockRouter]
      }
    })
    
    const button = wrapper.find('button')
    await button.trigger('click')
    
    expect(wrapper.emitted('linkClick')).toBeTruthy()
    expect(wrapper.emitted('linkClick')?.[0]).toEqual([links[0]])
  })

  it('navigates to route when link with route is clicked', async () => {
    const links = [
      { id: 'about', label: 'About', route: '/about' }
    ]
    const pushSpy = vi.spyOn(mockRouter, 'push')
    
    const wrapper = mount(BasicFoot, {
      props: { links },
      global: {
        plugins: [mockRouter]
      }
    })
    
    const button = wrapper.find('button')
    await button.trigger('click')
    
    expect(pushSpy).toHaveBeenCalledWith('/about')
  })

  it('opens external link in new tab when href is provided', async () => {
    const links = [
      { id: 'docs', label: 'Docs', href: 'https://example.com' }
    ]
    
    // Mock window.open
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    
    const wrapper = mount(BasicFoot, {
      props: { links },
      global: {
        plugins: [mockRouter]
      }
    })
    
    const button = wrapper.find('button')
    await button.trigger('click')
    
    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank')
    
    openSpy.mockRestore()
  })

  it('renders with no links', () => {
    const wrapper = mount(BasicFoot, {
      props: { links: [] },
      global: {
        plugins: [mockRouter]
      }
    })
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(BasicFoot, {
      global: {
        plugins: [mockRouter]
      }
    })
    expect(wrapper.find('.basic-footer').exists()).toBe(true)
  })
})
