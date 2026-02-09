/**
 * Authentication Composable
 * Provides authentication state and methods for Vue 3 Composition API
 */
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export interface Credentials {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  name?: string
  [key: string]: any
}

export interface AuthState {
  authenticated: boolean
  user: AuthUser | null
}

/**
 * Composable for authentication logic
 * Integrates with Vuex store for state management
 */
export function useAuth() {
  const store = useStore()
  const router = useRouter()

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = computed(() => {
    return store.state.auth?.authenticated || false
  })

  /**
   * Get current authenticated user
   */
  const currentUser = computed<AuthUser | null>(() => {
    return store.state.auth?.user || null
  })

  /**
   * Sign in with email and password
   * @param credentials - User email and password
   * @returns Promise that resolves with auth result
   */
  const signin = (credentials: Credentials): Promise<{ ok: boolean }> => {
    return store.dispatch('signin_user', credentials)
  }

  /**
   * Sign out current user
   * @returns Promise that resolves when signed out
   */
  const signout = (): Promise<void> => {
    return store.dispatch('signout_user')
      .then(() => {
        router.push('/login')
      })
  }

  /**
   * Check authentication status
   * @returns Promise that resolves with auth status
   */
  const checkAuth = (): Promise<boolean> => {
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
