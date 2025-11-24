import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/domains/auth/store/auth.store'

// Import domain routes
import landingRoutes from '@/domains/landing/routes/landing.routes'
import authRoutes from '@/domains/auth/routes/auth.routes'
import ordersRoutes from '@/domains/orders/routes/orders.routes'
import driverRoutes from '@/domains/driver/routes/driver.routes'
import companyRoutes from '@/domains/shipping-company/routes/company.routes'
import userRoutes from '@/domains/user/routes/user.routes'

const routes = [
  ...landingRoutes,
  ...authRoutes,
  ...ordersRoutes,
  ...driverRoutes,
  ...companyRoutes,
  ...userRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/shared/components/common/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.role

  // If route requires auth and user is not authenticated
  if (requiresAuth && !authStore.isAuthenticated) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  // If authenticated but user data not loaded, fetch it
  if (authStore.isAuthenticated && !authStore.user) {
    try {
      await authStore.fetchUser()
    } catch {
      return next('/login')
    }
  }

  // If route requires specific role and user doesn't have it
  if (requiredRole && authStore.user?.role !== requiredRole) {
    return next('/unauthorized')
  }

  // If authenticated user tries to access auth pages, redirect to dashboard
  if (authStore.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    const dashboardRoute = authStore.isDriver ? '/driver/dashboard' : '/company/dashboard'
    return next(dashboardRoute)
  }

  next()
})

export default router
