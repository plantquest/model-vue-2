/**
 * useAuth composable - Authentication logic
 * Handles user authentication, signin, signout, and auth state
 */
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

/**
 * Credentials interface for signin
 */
export interface Credentials {
  email: string
  password: string
}

/**
 * User interface
 */
export interface User {
  id: string
  email: string
  name?: string
  role?: string
}

/**
 * useAuth composable
 * 
 * Provides authentication state and methods:
 * - isAuthenticated: reactive boolean
 * - currentUser: reactive user object or null
 * - signin: method to sign in with credentials
 * - signout: method to sign out
 * - checkAuth: method to check authentication status
 * 
 * @returns Authentication state and methods
 */
export function useAuth() {
  const store = useStore()
  const router = useRouter()

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = computed<boolean>(() => 
    store.state.auth?.authenticated || false
  )

  /**
   * Get current authenticated user
   */
  const currentUser = computed<User | null>(() => 
    store.state.auth?.user || null
  )

  /**
   * Sign in with email and password
   * 
   * @param credentials - Email and password
   * @returns Promise that resolves when signin completes
   */
  const signin = (credentials: Credentials) => {
    return store.dispatch('signin_user', credentials)
  }

  /**
   * Sign out current user and redirect to login
   * 
   * @returns Promise that resolves when signout completes
   */
  const signout = () => {
    return store.dispatch('signout_user')
      .then(() => router.push('/login'))
  }

  /**
   * Check authentication status
   * 
   * @returns Promise that resolves with auth status
   */
  const checkAuth = () => {
    return store.dispatch('check_auth')
  }

  return {
    isAuthenticated,
    currentUser,
    signin,
    signout,
    checkAuth
  }
}
