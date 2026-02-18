/**
 * Tests for BasicAuth component
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import BasicAuth from '@/components/BasicAuth.vue'

describe('BasicAuth', () => {
  let store: any
  let router: any

  beforeEach(() => {
    store = createStore({
      state: {
        auth: {
          authenticated: false,
          user: null
        }
      },
      actions: {
        signin_user: vi.fn().mockResolvedValue({ ok: true }),
        signout_user: vi.fn().mockResolvedValue(undefined),
        check_auth: vi.fn().mockResolvedValue(true)
      }
    })

    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/login', component: { template: '<div>Login</div>' } },
        { path: '/dashboard', component: { template: '<div>Dashboard</div>' } }
      ]
    })
  })

  it('renders login form when not authenticated', () => {
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    expect(wrapper.find('v-card-title').text()).toBe('Sign In')
    expect(wrapper.find('v-text-field[label="Email"]').exists()).toBe(true)
    expect(wrapper.find('v-text-field[label="Password"]').exists()).toBe(true)
  })

  it('renders slot content when user is authenticated', () => {
    store.state.auth.user = { id: '1', email: 'test@example.com' }
    
    const wrapper = mount(BasicAuth, {
      slots: {
        default: '<div class="authenticated-content">Authenticated</div>'
      },
      global: {
        plugins: [store, router]
      }
    })
    
    expect(wrapper.find('.authenticated-content').exists()).toBe(true)
    expect(wrapper.find('v-card').exists()).toBe(false)
  })

  it('disables signin button when form is invalid', () => {
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    const button = wrapper.find('v-btn')
    expect(button.attributes('disabled')).toBe('true')
  })

  it('validates email field on blur', async () => {
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    const emailField = wrapper.find('v-text-field[label="Email"]')
    await emailField.trigger('blur')
    
    // Email validation should fail for empty field
    expect(wrapper.vm.email).toBe('')
  })

  it('validates password field on blur', async () => {
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    const passwordField = wrapper.find('v-text-field[label="Password"]')
    await passwordField.trigger('blur')
    
    // Password validation should fail for empty field
    expect(wrapper.vm.password).toBe('')
  })

  it('calls signin action on submit with valid credentials', async () => {
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    // Set valid credentials
    await wrapper.setData({
      email: 'test@example.com',
      password: 'password123',
      valid: true
    })
    
    const button = wrapper.find('v-btn')
    await button.trigger('click')
    
    expect(store._actions.signin_user).toHaveBeenCalledWith(
      expect.any(Object),
      {
        email: 'test@example.com',
        password: 'password123'
      }
    )
  })

  it('shows loading state during signin', async () => {
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    await wrapper.setData({
      email: 'test@example.com',
      password: 'password123',
      valid: true
    })
    
    const button = wrapper.find('v-btn')
    await button.trigger('click')
    
    // Should show loading state
    expect(wrapper.vm.isLoading).toBe(true)
  })

  it('shows error message on failed signin', async () => {
    store._actions.signin_user.mockResolvedValue({ ok: false })
    
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    await wrapper.setData({
      email: 'test@example.com',
      password: 'wrongpassword',
      valid: true
    })
    
    await wrapper.find('v-btn').trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toContain('Signin details are incorrect')
  })

  it('redirects to dashboard on successful signin', async () => {
    const pushSpy = vi.spyOn(router, 'push')
    
    const wrapper = mount(BasicAuth, {
      props: {
        redirectPath: '/dashboard'
      },
      global: {
        plugins: [store, router]
      }
    })
    
    await wrapper.setData({
      email: 'test@example.com',
      password: 'password123',
      valid: true
    })
    
    await wrapper.find('v-btn').trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(pushSpy).toHaveBeenCalledWith('/dashboard')
  })

  it('emits signinSuccess event on successful signin', async () => {
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    await wrapper.setData({
      email: 'test@example.com',
      password: 'password123',
      valid: true
    })
    
    await wrapper.find('v-btn').trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('signinSuccess')).toBeTruthy()
  })

  it('emits signinError event on failed signin', async () => {
    store._actions.signin_user.mockResolvedValue({ ok: false })
    
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    await wrapper.setData({
      email: 'test@example.com',
      password: 'wrongpassword',
      valid: true
    })
    
    await wrapper.find('v-btn').trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('signinError')).toBeTruthy()
  })

  it('redirects if already authenticated on mount', async () => {
    store.state.auth.user = { id: '1', email: 'test@example.com' }
    const pushSpy = vi.spyOn(router, 'push')
    
    mount(BasicAuth, {
      props: {
        redirectPath: '/dashboard'
      },
      global: {
        plugins: [store, router]
      }
    })
    
    await router.isReady()
    
    expect(pushSpy).toHaveBeenCalledWith('/dashboard')
  })

  it('validates email format correctly', async () => {
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    // Test invalid email
    await wrapper.setData({ email: 'invalidemail' })
    const isValidBad = wrapper.vm.validateEmail()
    expect(isValidBad).toBe(false)
    
    // Test valid email
    await wrapper.setData({ email: 'valid@email.com' })
    const isValidGood = wrapper.vm.validateEmail()
    expect(isValidGood).toBe(true)
  })

  it('validates password is required', async () => {
    const wrapper = mount(BasicAuth, {
      global: {
        plugins: [store, router]
      }
    })
    
    // Test empty password
    await wrapper.setData({ password: '' })
    const isValidBad = wrapper.vm.validatePassword()
    expect(isValidBad).toBe(false)
    
    // Test with password
    await wrapper.setData({ password: 'password123' })
    const isValidGood = wrapper.vm.validatePassword()
    expect(isValidGood).toBe(true)
  })
})
