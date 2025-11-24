import { computed } from 'vue'
import { useAuthStore } from '@/domains/auth/store/auth.store'
import { ROLES } from '@/shared/utils/constants'

export function useAuth() {
  const authStore = useAuthStore()

  const user = computed(() => authStore.user)
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const isDriver = computed(() => authStore.isDriver)
  const isShippingCompany = computed(() => authStore.isShippingCompany)
  const userRole = computed(() => authStore.userRole)
  const loading = computed(() => authStore.loading)

  const login = async (credentials) => {
    return authStore.login(credentials)
  }

  const register = async (userData) => {
    return authStore.register(userData)
  }

  const logout = () => {
    authStore.logout()
  }

  const fetchUser = async () => {
    return authStore.fetchUser()
  }

  const hasRole = (role) => {
    return userRole.value === role
  }

  const hasAnyRole = (roles) => {
    return roles.includes(userRole.value)
  }

  const getDashboardRoute = () => {
    if (isDriver.value) return '/driver/dashboard'
    if (isShippingCompany.value) return '/company/dashboard'
    return '/'
  }

  return {
    user,
    isAuthenticated,
    isDriver,
    isShippingCompany,
    userRole,
    loading,
    login,
    register,
    logout,
    fetchUser,
    hasRole,
    hasAnyRole,
    getDashboardRoute,
    ROLES
  }
}
