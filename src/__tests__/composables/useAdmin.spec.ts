/**
 * Tests for useAdmin composable
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createStore } from 'vuex'
import { useAdmin } from '@/composables/useAdmin'

describe('useAdmin', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: {
        auth: {
          user: { id: '1', role: 'admin' }
        },
        admin: {
          users: [
            { id: '1', email: 'admin@example.com', name: 'Admin', role: 'admin' },
            { id: '2', email: 'user@example.com', name: 'User', role: 'user' }
          ],
          loading: false
        }
      },
      actions: {
        'admin/loadUsers': vi.fn(),
        'admin/updateUser': vi.fn(),
        'admin/deleteUser': vi.fn(),
        'admin/createUser': vi.fn()
      }
    })
  })

  it('returns users list', () => {
    const { users } = useAdmin()
    expect(users.value).toHaveLength(2)
    expect(users.value[0].email).toBe('admin@example.com')
  })

  it('returns isAdmin as true when user is admin', () => {
    const { isAdmin } = useAdmin()
    expect(isAdmin.value).toBe(true)
  })

  it('returns isAdmin as false when user is not admin', () => {
    store.state.auth.user.role = 'user'
    const { isAdmin } = useAdmin()
    expect(isAdmin.value).toBe(false)
  })

  it('returns loading state', () => {
    const { isLoading } = useAdmin()
    expect(isLoading.value).toBe(false)
    
    store.state.admin.loading = true
    expect(isLoading.value).toBe(true)
  })

  it('calls loadUsers action', async () => {
    const { loadUsers } = useAdmin()
    
    await loadUsers()
    
    expect(store._actions['admin/loadUsers']).toHaveBeenCalled()
  })

  it('calls updateUser action with userId and data', async () => {
    const { updateUser } = useAdmin()
    const userId = '2'
    const data = { name: 'Updated User' }
    
    await updateUser(userId, data)
    
    expect(store._actions['admin/updateUser']).toHaveBeenCalledWith(
      expect.any(Object),
      { userId, data }
    )
  })

  it('calls deleteUser action with userId', async () => {
    const { deleteUser } = useAdmin()
    const userId = '2'
    
    await deleteUser(userId)
    
    expect(store._actions['admin/deleteUser']).toHaveBeenCalledWith(
      expect.any(Object),
      userId
    )
  })

  it('calls createUser action with userData', async () => {
    const { createUser } = useAdmin()
    const userData = { email: 'new@example.com', name: 'New User', role: 'user' }
    
    await createUser(userData)
    
    expect(store._actions['admin/createUser']).toHaveBeenCalledWith(
      expect.any(Object),
      userData
    )
  })
})
