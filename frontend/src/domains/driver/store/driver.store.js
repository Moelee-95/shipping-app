import { defineStore } from 'pinia'
import driverService from '../services/driver.service'

export const useDriverStore = defineStore('driver', {
  state: () => ({
    stats: {
      totalOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      activeOrders: 0,
      totalEarnings: 0,
      rating: null
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
        const data = response.data.data || response.data

        // Map snake_case to camelCase
        this.stats = {
          totalOrders: data.total_orders || 0,
          pendingOrders: data.pending_orders || 0,
          activeOrders: data.active_orders || 0,
          completedOrders: data.completed_orders || 0,
          totalEarnings: data.total_earnings || 0,
          rating: data.rating || null
        }

        return response
      } catch (error) {
        console.error('Error fetching stats:', error)
        throw error
      } finally {
        this.statsLoading = false
      }
    },

    async fetchAvailableOrders(params = {}) {
      this.loading = true
      try {
        const response = await driverService.getAvailableOrders(params)
        this.availableOrders = response.data.data || response.data || []
        return response
      } catch (error) {
        console.error('Error fetching available orders:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchMyOrders(params = {}) {
      this.loading = true
      try {
        const response = await driverService.getMyOrders(params)
        this.myOrders = response.data.data || response.data || []
        return response
      } catch (error) {
        console.error('Error fetching my orders:', error)
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
        const updatedOrder = response.data.data
        const index = this.myOrders.findIndex((o) => o.id === orderId)

        if (index !== -1) {
          // Use splice to ensure reactivity
          this.myOrders.splice(index, 1, updatedOrder)
        }

        // Update stats if delivered
        if (status === 'delivered') {
          this.stats.activeOrders = Math.max(0, this.stats.activeOrders - 1)
          this.stats.completedOrders++
          this.stats.totalEarnings += updatedOrder.price || 0
        }

        // Sync with orders store if it exists
        try {
          const { useOrdersStore } = await import('@/domains/orders/store/orders.store')
          const ordersStore = useOrdersStore()

          // Update in myOrders array
          const myOrderIndex = ordersStore.myOrders.findIndex((o) => o.id === orderId)
          if (myOrderIndex !== -1) {
            ordersStore.myOrders.splice(myOrderIndex, 1, updatedOrder)
          }

          // Update in orders array
          const orderIndex = ordersStore.orders.findIndex((o) => o.id === orderId)
          if (orderIndex !== -1) {
            ordersStore.orders.splice(orderIndex, 1, updatedOrder)
          }

          // Update current order
          if (ordersStore.currentOrder?.id === orderId) {
            ordersStore.currentOrder = updatedOrder
          }
        } catch (e) {
          // Orders store not available, skip sync
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
