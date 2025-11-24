import { defineStore } from 'pinia'
import driverService from '../services/driver.service'

export const useDriverStore = defineStore('driver', {
  state: () => ({
    stats: {
      totalOrders: 0,
      completedOrders: 0,
      activeOrders: 0,
      totalEarnings: 0
    },
    availableOrders: [],
    myOrders: [],
    loading: false,
    statsLoading: false
  }),

  getters: {
    pendingOrders: (state) => state.myOrders.filter((o) => o.status === 'accepted'),
    inProgressOrders: (state) => state.myOrders.filter((o) => ['picked_up', 'in_transit'].includes(o.status)),
    completedOrders: (state) => state.myOrders.filter((o) => o.status === 'delivered')
  },

  actions: {
    async fetchStats() {
      this.statsLoading = true
      try {
        const response = await driverService.getStats()
        this.stats = response.data.data
        return response
      } catch (error) {
        throw error
      } finally {
        this.statsLoading = false
      }
    },

    async fetchAvailableOrders(params = {}) {
      this.loading = true
      try {
        const response = await driverService.getAvailableOrders(params)
        this.availableOrders = response.data.data
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
        const response = await driverService.getMyOrders(params)
        this.myOrders = response.data.data
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async acceptOrder(orderId) {
      this.loading = true
      try {
        const response = await driverService.acceptOrder(orderId)
        // Remove from available orders
        this.availableOrders = this.availableOrders.filter((o) => o.id !== orderId)
        // Add to my orders
        this.myOrders.unshift(response.data.data)
        // Update stats
        this.stats.activeOrders++
        this.stats.totalOrders++
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(orderId, status) {
      this.loading = true
      try {
        const response = await driverService.updateOrderStatus(orderId, status)
        const index = this.myOrders.findIndex((o) => o.id === orderId)
        if (index !== -1) {
          this.myOrders[index] = response.data.data
        }
        // Update stats if delivered
        if (status === 'delivered') {
          this.stats.activeOrders--
          this.stats.completedOrders++
          this.stats.totalEarnings += response.data.data.price
        }
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
