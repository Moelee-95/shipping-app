export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      requiresAuth: false,
      layout: 'auth'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      requiresAuth: false,
      layout: 'auth'
    }
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('../views/UnauthorizedView.vue'),
    meta: {
      requiresAuth: false,
      layout: 'auth'
    }
  }
]
