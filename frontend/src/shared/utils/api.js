import axios from 'axios'
import { useAuthStore } from '@/domains/auth/store/auth.store'
import { useToast } from 'vue-toastification'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const toast = useToast()
    const authStore = useAuthStore()

    if (error.response) {
      switch (error.response.status) {
        case 401:
          authStore.logout()
          toast.error('Session expired. Please login again.')
          break
        case 403:
          toast.error('You do not have permission to perform this action.')
          break
        case 404:
          toast.error('Resource not found.')
          break
        case 422:
          // Validation errors
          const errors = error.response.data.errors
          if (errors) {
            Object.values(errors).forEach((errorMessages) => {
              errorMessages.forEach((message) => toast.error(message))
            })
          }
          break
        case 500:
          toast.error('Server error. Please try again later.')
          break
        default:
          toast.error(error.response.data.message || 'An error occurred.')
      }
    } else {
      toast.error('Network error. Please check your connection.')
    }

    return Promise.reject(error)
  }
)

export default api
