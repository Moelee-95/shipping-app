import MainLayout from '@/shared/components/layout/MainLayout.vue'

export default [
  {
    path: '/profile',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import('../views/ProfileView.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/settings',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('../views/SettingsView.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]
