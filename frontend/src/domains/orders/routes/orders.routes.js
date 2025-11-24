import MainLayout from '@/shared/components/layout/MainLayout.vue'

export default [
  {
    path: '/orders',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: ':id',
        name: 'OrderDetails',
        component: () => import('../views/OrderDetailsView.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]
