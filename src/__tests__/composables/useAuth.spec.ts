/**
 * Tests for useAuth composable
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

describe('useAuth', () => {
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
        signin_user: vi.fn(),
        signout_user: vi.fn(),
        check_auth: vi.fn()
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

  it('returns isAuthenticated as false when not authenticated', () => {
    const { isAuthenticated } = useAuth()
    expect(isAuthenticated.value).toBe(false)
  })

  it('returns isAuthenticated as true when authenticated', () => {
    store.state.auth.authenticated = true
    const { isAuthenticated } = useAuth()
    expect(isAuthenticated.value).toBe(true)
  })

  it('returns currentUser as null when not authenticated', () => {
    const { currentUser } = useAuth()
    expect(currentUser.value).toBeNull()
  })

  it('returns currentUser when authenticated', () => {
    const user = { id: '1', email: 'test@example.com', name: 'Test User' }
    store.state.auth.user = user
    const { currentUser } = useAuth()
    expect(currentUser.value).toEqual(user)
  })

  it('calls signin_user action with credentials', async () => {
    const { signin } = useAuth()
    const credentials = { email: 'test@example.com', password: 'password123' }
    
    await signin(credentials)
    
    expect(store._actions.signin_user).toHaveBeenCalledWith(
      expect.any(Object),
      credentials
    )
  })

  it('calls signout_user action and navigates to login', async () => {
    const { signout } = useAuth()
    const pushSpy = vi.spyOn(router, 'push')
    
    store._actions.signout_user.mockResolvedValue(undefined)
    await signout()
    
    expect(store._actions.signout_user).toHaveBeenCalled()
    expect(pushSpy).toHaveBeenCalledWith('/login')
  })

  it('calls check_auth action', async () => {
    const { checkAuth } = useAuth()
    
    await checkAuth()
    
    expect(store._actions.check_auth).toHaveBeenCalled()
  })
})
