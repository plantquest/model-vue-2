/**
 * useAdmin composable - Admin operations and state
 * Handles admin-specific functionality including user management
 */
import { computed } from 'vue'
import { useStore } from 'vuex'

/**
 * User data interface
 */
export interface UserData {
  id?: string
  email: string
  name: string
  role: string
}

/**
 * useAdmin composable
 * 
 * Provides admin state and methods:
 * - users: reactive list of users
 * - isAdmin: reactive boolean for admin status
 * - isLoading: reactive loading state
 * - loadUsers: method to load users list
 * - updateUser: method to update a user
 * - deleteUser: method to delete a user
 * - createUser: method to create a new user
 * 
 * @returns Admin state and methods
 */
export function useAdmin() {
  const store = useStore()

  /**
   * Get users list from admin state
   */
  const users = computed<UserData[]>(() => 
    store.state.admin?.users || []
  )

  /**
   * Check if current user is an admin
   */
  const isAdmin = computed<boolean>(() => 
    store.state.auth?.user?.role === 'admin'
  )

  /**
   * Get loading state
   */
  const isLoading = computed<boolean>(() => 
    store.state.admin?.loading || false
  )

  /**
   * Load users list
   * 
   * @returns Promise that resolves when users are loaded
   */
  const loadUsers = () => {
    return store.dispatch('admin/loadUsers')
  }

  /**
   * Update user data
   * 
   * @param userId - ID of user to update
   * @param data - Updated user data
   * @returns Promise that resolves when user is updated
   */
  const updateUser = (userId: string, data: Partial<UserData>) => {
    return store.dispatch('admin/updateUser', { userId, data })
  }

  /**
   * Delete a user
   * 
   * @param userId - ID of user to delete
   * @returns Promise that resolves when user is deleted
   */
  const deleteUser = (userId: string) => {
    return store.dispatch('admin/deleteUser', userId)
  }

  /**
   * Create a new user
   * 
   * @param userData - New user data
   * @returns Promise that resolves when user is created
   */
  const createUser = (userData: UserData) => {
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
