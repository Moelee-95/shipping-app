import { useAuthStore } from '@/domains/auth/store/auth.store'

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const authStore = useAuthStore()
  return authStore.isAuthenticated
}

/**
 * Guard for routes that require authentication
 * @param {object} to - Target route
 * @param {object} from - Source route
 * @param {Function} next - Navigation function
 */
export const requireAuth = (to, from, next) => {
  if (isAuthenticated()) {
    next()
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
}

/**
 * Guard for routes that should only be accessible to guests
 * @param {object} to - Target route
 * @param {object} from - Source route
 * @param {Function} next - Navigation function
 */
export const requireGuest = (to, from, next) => {
  if (!isAuthenticated()) {
    next()
  } else {
    const authStore = useAuthStore()
    const dashboardRoute = authStore.isDriver ? '/driver/dashboard' : '/company/dashboard'
    next(dashboardRoute)
  }
}

/**
 * Fetch user data if authenticated but user data not loaded
 * @param {object} to - Target route
 * @param {object} from - Source route
 * @param {Function} next - Navigation function
 */
export const fetchUserIfNeeded = async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated && !authStore.user) {
    try {
      await authStore.fetchUser()
      next()
    } catch {
      authStore.logout()
      next('/login')
    }
  } else {
    next()
  }
}

/**
 * Create a composed guard that runs multiple guards in sequence
 * @param  {...Function} guards - Guards to compose
 * @returns {Function} Composed guard
 */
export const composeGuards = (...guards) => {
  return async (to, from, next) => {
    for (const guard of guards) {
      let nextCalled = false
      let nextArg = null

      await guard(to, from, (arg) => {
        nextCalled = true
        nextArg = arg
      })

      if (nextCalled && nextArg !== undefined) {
        return next(nextArg)
      }
    }
    next()
  }
}

export default {
  isAuthenticated,
  requireAuth,
  requireGuest,
  fetchUserIfNeeded,
  composeGuards
}
