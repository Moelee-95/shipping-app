import { defineStore } from 'pinia'
import authService from '../services/auth.service'
import router from '@/router'

const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === 'true'

// Mock users for development
const MOCK_USERS = {
  'company@company.com': {
    id: 1,
    name: 'Test Company',
    email: 'company@company.com',
    role: 'shipping_company',
    phone: '+1 555-0100',
    company_name: 'ShipTrack Demo Co.'
  },
  'driver@driver.com': {
    id: 2,
    name: 'Test Driver',
    email: 'driver@driver.com',
    role: 'driver',
    phone: '+1 555-0200'
  }
}

const MOCK_PASSWORDS = {
  'company@company.com': 'company',
  'driver@driver.com': 'driver'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isDriver: (state) => state.user?.role === 'driver',
    isShippingCompany: (state) => state.user?.role === 'shipping_company',
    userRole: (state) => state.user?.role
  },

  actions: {
    async login(credentials) {
      this.loading = true
      try {
        let user, token

        if (MOCK_AUTH) {
          // Mock authentication
          const mockUser = MOCK_USERS[credentials.email]
          const mockPassword = MOCK_PASSWORDS[credentials.email]

          if (!mockUser || mockPassword !== credentials.password) {
            throw { response: { data: { message: 'Invalid credentials' } } }
          }

          user = mockUser
          token = 'mock-token-' + Date.now()
        } else {
          // Real API authentication
          const response = await authService.login(credentials)
          token = response.data.token
          user = response.data.user
        }

        this.token = token
        this.user = user
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))

        // Redirect based on role
        if (this.isDriver) {
          router.push('/driver/dashboard')
        } else if (this.isShippingCompany) {
          router.push('/company/dashboard')
        }

        return { data: { token, user } }
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true
      try {
        let user, token

        if (MOCK_AUTH) {
          // Mock registration
          user = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            role: userData.role,
            phone: userData.phone,
            company_name: userData.company_name || null
          }
          token = 'mock-token-' + Date.now()
        } else {
          // Real API registration
          const response = await authService.register(userData)
          token = response.data.token
          user = response.data.user
        }

        this.token = token
        this.user = user
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))

        // Redirect based on role
        if (this.isDriver) {
          router.push('/driver/dashboard')
        } else if (this.isShippingCompany) {
          router.push('/company/dashboard')
        }

        return { data: { token, user } }
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      try {
        if (MOCK_AUTH) {
          // In mock mode, user is already in localStorage
          return { data: { user: this.user } }
        }

        const response = await authService.getUser()
        this.user = response.data.user
        localStorage.setItem('user', JSON.stringify(this.user))
        return response
      } catch (error) {
        this.logout()
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    }
  }
})
