/**
 * Admin Composable
 * Provides admin panel state and methods for Vue 3 Composition API
 */
import { computed } from 'vue'
import { useStore } from 'vuex'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  [key: string]: any
}

export interface AdminState {
  users: AdminUser[]
  loading: boolean
}

/**
 * Composable for admin panel logic
 * Manages users, permissions, and admin operations
 */
export function useAdmin() {
  const store = useStore()

  /**
   * Get all users
   */
  const users = computed<AdminUser[]>(() => {
    return store.state.admin?.users || []
  })

  /**
   * Check if current user has admin role
   */
  const isAdmin = computed(() => {
    return store.state.auth?.user?.role === 'admin'
  })

  /**
   * Check if admin operations are loading
   */
  const isLoading = computed(() => {
    return store.state.admin?.loading || false
  })

  /**
   * Load all users
   * @returns Promise that resolves when users are loaded
   */
  const loadUsers = (): Promise<void> => {
    return store.dispatch('admin/loadUsers')
  }

  /**
   * Update user data
   * @param userId - User ID to update
   * @param data - User data to update
   * @returns Promise that resolves when user is updated
   */
  const updateUser = (userId: string, data: Partial<AdminUser>): Promise<void> => {
    return store.dispatch('admin/updateUser', { userId, data })
  }

  /**
   * Delete user
   * @param userId - User ID to delete
   * @returns Promise that resolves when user is deleted
   */
  const deleteUser = (userId: string): Promise<void> => {
    return store.dispatch('admin/deleteUser', userId)
  }

  /**
   * Create new user
   * @param userData - New user data
   * @returns Promise that resolves when user is created
   */
  const createUser = (userData: Partial<AdminUser>): Promise<void> => {
    return store.dispatch('admin/createUser', userData)
  }

  return {
    users,
    isAdmin,
    isLoading,
    loadUsers,
    updateUser,
    deleteUser,
    createUser
  }
}
