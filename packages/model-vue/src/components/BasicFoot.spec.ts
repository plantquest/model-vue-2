/**
 * BasicFoot Component Tests
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import BasicFoot from './BasicFoot.vue'

const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    { path: '/about', name: 'about', component: { template: '<div>About</div>' } }
  ]
})

describe('BasicFoot', () => {
  describe('Props', () => {
    it('should render with default props', () => {
      const wrapper = mount(BasicFoot, {
        global: {
          plugins: [mockRouter]
        }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('should accept links prop', () => {
      const links = [
        { id: '1', label: 'Link 1', route: '/' }
      ]
      const wrapper = mount(BasicFoot, {
        props: { links },
        global: { plugins: [mockRouter] }
      })
      expect(wrapper.props('links')).toHaveLength(1)
    })

    it('should accept version prop', () => {
      const wrapper = mount(BasicFoot, {
        props: { version: '1.0.0' },
        global: { plugins: [mockRouter] }
      })
      expect(wrapper.props('version')).toBe('1.0.0')
    })

    it('should accept copyright prop', () => {
      const wrapper = mount(BasicFoot, {
        props: { copyright: '© Test Company' },
        global: { plugins: [mockRouter] }
      })
      expect(wrapper.props('copyright')).toBe('© Test Company')
    })
  })

  describe('Rendering', () => {
    it('should display copyright text', () => {
      const wrapper = mount(BasicFoot, {
        props: { copyright: '© PlantQuest' },
        global: { plugins: [mockRouter] }
      })
      expect(wrapper.text()).toContain('© PlantQuest')
    })

    it('should display current year', () => {
      const wrapper = mount(BasicFoot, {
        global: { plugins: [mockRouter] }
      })
      const currentYear = new Date().getFullYear()
      expect(wrapper.text()).toContain(currentYear.toString())
    })

    it('should display version when provided', () => {
      const wrapper = mount(BasicFoot, {
        props: { version: '2.5.0' },
        global: { plugins: [mockRouter] }
      })
      expect(wrapper.text()).toContain('v2.5.0')
    })

    it('should not display version when not provided', () => {
      const wrapper = mount(BasicFoot, {
        global: { plugins: [mockRouter] }
      })
      expect(wrapper.text()).not.toContain('v')
    })

    it('should render footer links', () => {
      const links = [
        { id: '1', label: 'Privacy', href: 'https://example.com/privacy' },
        { id: '2', label: 'Terms', href: 'https://example.com/terms' }
      ]
      const wrapper = mount(BasicFoot, {
        props: { links },
        global: { plugins: [mockRouter] }
      })
      expect(wrapper.text()).toContain('Privacy')
      expect(wrapper.text()).toContain('Terms')
    })
  })

  describe('Link Navigation', () => {
    it('should navigate to route when link has route property', async () => {
      const links = [
        { id: '1', label: 'Home', route: '/' }
      ]
      const wrapper = mount(BasicFoot, {
        props: { links },
        global: { plugins: [mockRouter] }
      })
      
      const buttons = wrapper.findAll('button')
      await buttons[0].trigger('click')
      
      // Router push should be called
      expect(mockRouter.currentRoute.value.path).toBe('/')
    })

    it('should open external link when link has href property', async () => {
      const windowOpen = vi.spyOn(window, 'open').mockImplementation(() => null)
      
      const links = [
        { id: '1', label: 'External', href: 'https://example.com' }
      ]
      const wrapper = mount(BasicFoot, {
        props: { links },
        global: { plugins: [mockRouter] }
      })
      
      const buttons = wrapper.findAll('button')
      await buttons[0].trigger('click')
      
      expect(windowOpen).toHaveBeenCalledWith('https://example.com', '_blank')
      windowOpen.mockRestore()
    })

    it('should emit linkClick event on link click', async () => {
      const links = [
        { id: '1', label: 'Test', route: '/' }
      ]
      const wrapper = mount(BasicFoot, {
        props: { links },
        global: { plugins: [mockRouter] }
      })
      
      const buttons = wrapper.findAll('button')
      await buttons[0].trigger('click')
      
      expect(wrapper.emitted('linkClick')).toBeTruthy()
      expect(wrapper.emitted('linkClick')?.[0]).toEqual([links[0]])
    })
  })

  describe('Current Year Computation', () => {
    it('should compute current year correctly', () => {
      const wrapper = mount(BasicFoot, {
        global: { plugins: [mockRouter] }
      })
      const expectedYear = new Date().getFullYear()
      expect(wrapper.vm.currentYear).toBe(expectedYear)
    })
  })
})
