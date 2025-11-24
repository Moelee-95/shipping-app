import MainLayout from '@/shared/components/layout/MainLayout.vue'

export default [
  {
    path: '/company',
    component: MainLayout,
    meta: { requiresAuth: true, role: 'shipping_company' },
    children: [
      {
        path: '',
        redirect: '/company/dashboard'
      },
      {
        path: 'dashboard',
        name: 'CompanyDashboard',
        component: () => import('../views/CompanyDashboard.vue'),
        meta: { requiresAuth: true, role: 'shipping_company' }
      },
      {
        path: 'orders',
        name: 'ManageOrders',
        component: () => import('../views/ManageOrdersView.vue'),
        meta: { requiresAuth: true, role: 'shipping_company' }
      },
      {
        path: 'orders/create',
        name: 'CreateOrder',
        component: () => import('@/domains/orders/views/CreateOrderView.vue'),
        meta: { requiresAuth: true, role: 'shipping_company' }
      },
      {
        path: 'orders/:id',
        name: 'CompanyOrderDetails',
        component: () => import('@/domains/orders/views/OrderDetailsView.vue'),
        meta: { requiresAuth: true, role: 'shipping_company' }
      }
    ]
  }
]
