import { useAuthStore } from '@/domains/auth/store/auth.store'
import { ROLES } from '@/shared/utils/constants'

/**
 * Check if user has a specific role
 * @param {string} role - Role to check
 * @returns {boolean}
 */
export const hasRole = (role) => {
  const authStore = useAuthStore()
  return authStore.user?.role === role
}

/**
 * Check if user has any of the specified roles
 * @param {string[]} roles - Roles to check
 * @returns {boolean}
 */
export const hasAnyRole = (roles) => {
  const authStore = useAuthStore()
  return roles.includes(authStore.user?.role)
}

/**
 * Check if user is a driver
 * @returns {boolean}
 */
export const isDriver = () => hasRole(ROLES.DRIVER)

/**
 * Check if user is a shipping company
 * @returns {boolean}
 */
export const isShippingCompany = () => hasRole(ROLES.SHIPPING_COMPANY)

/**
 * Check if user is an admin
 * @returns {boolean}
 */
export const isAdmin = () => hasRole(ROLES.ADMIN)

/**
 * Guard for routes that require a specific role
 * @param {string} requiredRole - Required role
 * @returns {Function} Navigation guard
 */
export const requireRole = (requiredRole) => {
  return (to, from, next) => {
    if (hasRole(requiredRole)) {
      next()
    } else {
      next('/unauthorized')
    }
  }
}

/**
 * Guard for routes that require any of the specified roles
 * @param {string[]} requiredRoles - Required roles
 * @returns {Function} Navigation guard
 */
export const requireAnyRole = (requiredRoles) => {
  return (to, from, next) => {
    if (hasAnyRole(requiredRoles)) {
      next()
    } else {
      next('/unauthorized')
    }
  }
}

/**
 * Guard specifically for driver routes
 * @param {object} to - Target route
 * @param {object} from - Source route
 * @param {Function} next - Navigation function
 */
export const requireDriver = (to, from, next) => {
  if (isDriver()) {
    next()
  } else {
    next('/unauthorized')
  }
}

/**
 * Guard specifically for shipping company routes
 * @param {object} to - Target route
 * @param {object} from - Source route
 * @param {Function} next - Navigation function
 */
export const requireShippingCompany = (to, from, next) => {
  if (isShippingCompany()) {
    next()
  } else {
    next('/unauthorized')
  }
}

/**
 * Guard specifically for admin routes
 * @param {object} to - Target route
 * @param {object} from - Source route
 * @param {Function} next - Navigation function
 */
export const requireAdmin = (to, from, next) => {
  if (isAdmin()) {
    next()
  } else {
    next('/unauthorized')
  }
}

/**
 * Get the appropriate dashboard route based on user role
 * @returns {string} Dashboard route path
 */
export const getDashboardRoute = () => {
  const authStore = useAuthStore()

  switch (authStore.user?.role) {
    case ROLES.DRIVER:
      return '/driver/dashboard'
    case ROLES.SHIPPING_COMPANY:
      return '/company/dashboard'
    case ROLES.ADMIN:
      return '/admin/dashboard'
    default:
      return '/login'
  }
}

export default {
  hasRole,
  hasAnyRole,
  isDriver,
  isShippingCompany,
  isAdmin,
  requireRole,
  requireAnyRole,
  requireDriver,
  requireShippingCompany,
  requireAdmin,
  getDashboardRoute
}
