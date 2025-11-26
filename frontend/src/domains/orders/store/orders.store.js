import { defineStore } from 'pinia'
import ordersService from '../services/orders.service'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    currentOrder: null,
    availableOrders: [],
    myOrders: [],
    loading: false,
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
      lastPage: 1
    },
    filters: {
      status: '',
      search: '',
      dateFrom: '',
      dateTo: ''
    }
  }),

  getters: {
    pendingOrders: (state) => state.orders.filter((o) => o.status === 'pending'),
    activeOrders: (state) => state.orders.filter((o) => ['accepted', 'picked_up', 'in_transit'].includes(o.status)),
    completedOrders: (state) => state.orders.filter((o) => o.status === 'delivered'),
    cancelledOrders: (state) => state.orders.filter((o) => o.status === 'cancelled')
  },

  actions: {
    async fetchOrders(params = {}) {
      this.loading = true
      try {
        const response = await ordersService.getOrders({
          page: this.pagination.page,
          per_page: this.pagination.perPage,
          ...this.filters,
          ...params
        })
        this.orders = response.data.data
        this.pagination = {
          page: response.data.current_page,
          perPage: response.data.per_page,
          total: response.data.total,
          lastPage: response.data.last_page
        }
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchOrder(id) {
      this.loading = true
      try {
        const response = await ordersService.getOrder(id)
        this.currentOrder = response.data.data
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async createOrder(data) {
      this.loading = true
      try {
        const response = await ordersService.createOrder(data)
        this.orders.unshift(response.data.data)
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateOrder(id, data) {
      this.loading = true
      try {
        const response = await ordersService.updateOrder(id, data)
        const index = this.orders.findIndex((o) => o.id === id)
        if (index !== -1) {
          this.orders[index] = response.data.data
        }
        if (this.currentOrder?.id === id) {
          this.currentOrder = response.data.data
        }
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteOrder(id) {
      this.loading = true
      try {
        await ordersService.deleteOrder(id)
        this.orders = this.orders.filter((o) => o.id !== id)
        if (this.currentOrder?.id === id) {
          this.currentOrder = null
        }
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchAvailableOrders(params = {}) {
      this.loading = true
      try {
        const response = await ordersService.getAvailableOrders(params)
        this.availableOrders = response.data.data
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async acceptOrder(id) {
      this.loading = true
      try {
        const response = await ordersService.acceptOrder(id)
        // Remove from available orders
        this.availableOrders = this.availableOrders.filter((o) => o.id !== id)
        // Add to my orders
        this.myOrders.unshift(response.data.data)
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async cancelOrder(id, reason = '') {
      this.loading = true
      try {
        const response = await ordersService.cancelOrder(id, reason)
        const index = this.orders.findIndex((o) => o.id === id)
        if (index !== -1) {
          this.orders[index] = response.data.data
        }
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(id, status) {
      this.loading = true
      try {
        const response = await ordersService.updateOrderStatus(id, status)
        const updatedOrder = response.data.data

        // Update in myOrders array
        const myOrderIndex = this.myOrders.findIndex((o) => o.id === id)
        if (myOrderIndex !== -1) {
          this.myOrders.splice(myOrderIndex, 1, updatedOrder)
        }

        // Update in orders array
        const orderIndex = this.orders.findIndex((o) => o.id === id)
        if (orderIndex !== -1) {
          this.orders.splice(orderIndex, 1, updatedOrder)
        }

        // Update current order
        if (this.currentOrder?.id === id) {
          this.currentOrder = updatedOrder
        }

        // Sync with driver store if it exists
        try {
          const { useDriverStore } = await import('@/domains/driver/store/driver.store')
          const driverStore = useDriverStore()
          const driverOrderIndex = driverStore.myOrders.findIndex((o) => o.id === id)
          if (driverOrderIndex !== -1) {
            driverStore.myOrders.splice(driverOrderIndex, 1, updatedOrder)

            // Update driver stats if status is delivered
            if (status === 'delivered') {
              driverStore.stats.activeOrders = Math.max(0, driverStore.stats.activeOrders - 1)
              driverStore.stats.completedOrders++
              driverStore.stats.totalEarnings += updatedOrder.price || 0
            }
          }
        } catch (e) {
          // Driver store not available, skip sync
        }

        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchMyOrders(params = {}) {
      this.loading = true
      try {
        const response = await ordersService.getMyOrders(params)
        this.myOrders = response.data.data
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
    },

    resetFilters() {
      this.filters = {
        status: '',
        search: '',
        dateFrom: '',
        dateTo: ''
      }
    },

    setPage(page) {
      this.pagination.page = page
    },

    clearCurrentOrder() {
      this.currentOrder = null
    }
  }
})
