import { defineStore } from 'pinia'
import companyService from '../services/company.service'
import { useToast } from 'vue-toastification'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    stats: {
      totalOrders: 0,
      pendingOrders: 0,
      activeOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      totalSpent: 0
    },
    orders: [],
    currentOrder: null,
    loading: false,
    statsLoading: false,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      perPage: 10,
      total: 0
    },
    filters: {
      status: '',
      search: '',
      dateFrom: '',
      dateTo: ''
    }
  }),

  getters: {
    pendingOrders: (state) => state.orders.filter(o => o.status === 'pending'),
    activeOrders: (state) => state.orders.filter(o => ['accepted', 'picked_up', 'in_transit'].includes(o.status)),
    completedOrders: (state) => state.orders.filter(o => o.status === 'delivered'),
    cancelledOrders: (state) => state.orders.filter(o => o.status === 'cancelled'),
    hasOrders: (state) => state.orders.length > 0
  },

  actions: {
    async fetchStats() {
      this.statsLoading = true
      try {
        const response = await companyService.getStats()
        this.stats = response.data.stats || response.data
        return response
      } catch (error) {
        throw error
      } finally {
        this.statsLoading = false
      }
    },

    async fetchOrders(params = {}) {
      this.loading = true
      try {
        const queryParams = {
          page: this.pagination.currentPage,
          per_page: this.pagination.perPage,
          ...this.filters,
          ...params
        }
        const response = await companyService.getOrders(queryParams)
        this.orders = response.data.data || response.data.orders || []

        if (response.data.meta) {
          this.pagination = {
            currentPage: response.data.meta.current_page,
            totalPages: response.data.meta.last_page,
            perPage: response.data.meta.per_page,
            total: response.data.meta.total
          }
        }
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchOrder(orderId) {
      this.loading = true
      try {
        const response = await companyService.getOrder(orderId)
        this.currentOrder = response.data.order || response.data
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async createOrder(orderData) {
      const toast = useToast()
      this.loading = true
      try {
        const response = await companyService.createOrder(orderData)
        toast.success('Order created successfully')
        await this.fetchOrders()
        await this.fetchStats()
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateOrder(orderId, orderData) {
      const toast = useToast()
      this.loading = true
      try {
        const response = await companyService.updateOrder(orderId, orderData)
        toast.success('Order updated successfully')
        await this.fetchOrders()
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteOrder(orderId) {
      const toast = useToast()
      this.loading = true
      try {
        const response = await companyService.deleteOrder(orderId)
        toast.success('Order deleted successfully')
        await this.fetchOrders()
        await this.fetchStats()
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async cancelOrder(orderId) {
      const toast = useToast()
      this.loading = true
      try {
        const response = await companyService.cancelOrder(orderId)
        toast.success('Order cancelled successfully')
        await this.fetchOrders()
        await this.fetchStats()
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
      this.pagination.currentPage = 1
    },

    resetFilters() {
      this.filters = {
        status: '',
        search: '',
        dateFrom: '',
        dateTo: ''
      }
      this.pagination.currentPage = 1
    },

    setPage(page) {
      this.pagination.currentPage = page
    }
  }
})
