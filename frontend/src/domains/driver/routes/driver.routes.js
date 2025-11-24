import MainLayout from '@/shared/components/layout/MainLayout.vue'

export default [
  {
    path: '/driver',
    component: MainLayout,
    meta: {
      requiresAuth: true,
      role: 'driver'
    },
    children: [
      {
        path: '',
        redirect: '/driver/dashboard'
      },
      {
        path: 'dashboard',
        name: 'DriverDashboard',
        component: () => import('../views/DriverDashboard.vue')
      },
      {
        path: 'available-orders',
        name: 'AvailableOrders',
        component: () => import('../views/AvailableOrdersView.vue')
      },
      {
        path: 'my-orders',
        name: 'DriverOrders',
        component: () => import('../views/DriverOrdersView.vue')
      }
    ]
  }
]
