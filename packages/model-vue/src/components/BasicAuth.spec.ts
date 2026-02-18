/**
 * BasicAuth Component Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import BasicAuth from './BasicAuth.vue'

describe('BasicAuth', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: {},
      actions: {
        signin_user: vi.fn()
      }
    })
  })

  describe('Props', () => {
    it('should render sign-in form by default', () => {
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      expect(wrapper.find('.v-card-title').text()).toBe('Sign In')
    })

    it('should render slot when user prop provided', () => {
      const wrapper = mount(BasicAuth, {
        props: {
          user: { id: '123', email: 'test@example.com' }
        },
        slots: {
          default: '<div class="user-content">User Content</div>'
        },
        global: {
          plugins: [store]
        }
      })
      
      expect(wrapper.find('.user-content').exists()).toBe(true)
      expect(wrapper.find('.v-card').exists()).toBe(false)
    })
  })

  describe('Form Validation', () => {
    it('should have email validation rules', () => {
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      expect(wrapper.vm.emailRules).toHaveLength(2)
    })

    it('should require email', () => {
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      const emailRequired = wrapper.vm.emailRules[0]
      expect(emailRequired('')).toBe('E-mail is required')
      expect(emailRequired('test@example.com')).toBe(true)
    })

    it('should validate email format', () => {
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      const emailFormat = wrapper.vm.emailRules[1]
      expect(emailFormat('invalid')).toBe('E-mail must be valid')
      expect(emailFormat('test@example.com')).toBe(true)
    })

    it('should require password', () => {
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      const passwordRequired = wrapper.vm.passwordRules[0]
      expect(passwordRequired('')).toBe('Password is required')
      expect(passwordRequired('password123')).toBe(true)
    })
  })

  describe('Sign In Functionality', () => {
    it('should update state to signin when signing in', async () => {
      store.actions.signin_user = vi.fn().mockResolvedValue({ ok: true })
      
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      wrapper.vm.valid = true
      
      await wrapper.vm.signin()
      
      // State should be 'signin' initially
      // Then reset to 'empty' on success (in the promise)
    })

    it('should dispatch signin_user action', async () => {
      const signinAction = vi.fn().mockResolvedValue({ ok: true })
      store.actions.signin_user = signinAction
      
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      
      await wrapper.vm.signin()
      
      expect(signinAction).toHaveBeenCalledWith(
        expect.anything(),
        {
          email: 'test@example.com',
          password: 'password123'
        }
      )
    })

    it('should set state to fail on unsuccessful signin', async () => {
      store.actions.signin_user = vi.fn().mockResolvedValue({ ok: false })
      
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'wrong'
      
      await wrapper.vm.signin()
      await wrapper.vm.$nextTick()
      
      expect(wrapper.vm.state).toBe('fail')
    })

    it('should handle signin errors', async () => {
      store.actions.signin_user = vi.fn().mockRejectedValue(new Error('Network error'))
      
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      
      await wrapper.vm.signin()
      await wrapper.vm.$nextTick()
      
      expect(wrapper.vm.state).toBe('fail')
    })
  })

  describe('State Messages', () => {
    it('should not show message when state is empty', () => {
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      const cardTexts = wrapper.findAll('.v-card-text')
      const hasStateMessage = cardTexts.some(el => 
        el.text().includes('Signing in') || el.text().includes('incorrect')
      )
      expect(hasStateMessage).toBe(false)
    })

    it('should show signin message when signing in', async () => {
      store.actions.signin_user = vi.fn().mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100))
      )
      
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      wrapper.vm.state = 'signin'
      await wrapper.vm.$nextTick()
      
      expect(wrapper.text()).toContain('Signing in')
    })

    it('should show fail message on error', async () => {
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      wrapper.vm.state = 'fail'
      await wrapper.vm.$nextTick()
      
      expect(wrapper.text()).toContain('incorrect')
    })
  })

  describe('Reset Method', () => {
    it('should reset form fields', () => {
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      wrapper.vm.email = 'test@example.com'
      wrapper.vm.password = 'password123'
      wrapper.vm.state = 'fail'
      
      wrapper.vm.reset()
      
      expect(wrapper.vm.email).toBe('')
      expect(wrapper.vm.password).toBe('')
      expect(wrapper.vm.state).toBe('empty')
    })
  })

  describe('Exposed Methods', () => {
    it('should expose signin method', () => {
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      expect(wrapper.vm.signin).toBeDefined()
      expect(typeof wrapper.vm.signin).toBe('function')
    })

    it('should expose reset method', () => {
      const wrapper = mount(BasicAuth, {
        global: {
          plugins: [store]
        }
      })
      
      expect(wrapper.vm.reset).toBeDefined()
      expect(typeof wrapper.vm.reset).toBe('function')
    })
  })
})
