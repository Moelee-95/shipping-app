<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDriverStore } from '../store/driver.store'
import { useNotification } from '@/shared/composables/useNotification'
import { useConfirm } from '@/shared/composables/useConfirm'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import DriverStats from '../components/DriverStats.vue'
import AvailableOrdersGrid from '../components/AvailableOrdersGrid.vue'
import AcceptedOrdersList from '../components/AcceptedOrdersList.vue'

const router = useRouter()
const driverStore = useDriverStore()
const notification = useNotification()
const { confirm } = useConfirm()

const stats = computed(() => driverStore.stats)
const availableOrders = computed(() => driverStore.availableOrders.slice(0, 6))
const activeOrders = computed(() => driverStore.inProgressOrders.concat(driverStore.pendingOrders).slice(0, 5))
const loading = computed(() => driverStore.loading)
const statsLoading = computed(() => driverStore.statsLoading)

onMounted(async () => {
  try {
    await Promise.all([driverStore.fetchStats(), driverStore.fetchAvailableOrders(), driverStore.fetchMyOrders()])
  } catch (error) {
    notification.error('Failed to load dashboard data')
  }
})

const handleAcceptOrder = async (order) => {
  const confirmed = await confirm({
    title: 'Accept Order',
    message: `Are you sure you want to accept order #${order.id}? You will be responsible for picking up and delivering this package.`,
    confirmText: 'Accept',
    type: 'info'
  })

  if (confirmed) {
    try {
      await driverStore.acceptOrder(order.id)
      notification.success('Order accepted successfully!')
    } catch (error) {
      notification.error('Failed to accept order')
    }
  }
}

const handleViewOrder = (order) => {
  router.push(`/orders/${order.id}`)
}

const handleUpdateStatus = async ({ order, status }) => {
  try {
    await driverStore.updateOrderStatus(order.id, status)
    notification.success('Order status updated!')
  } catch (error) {
    notification.error('Failed to update order status')
  }
}
</script>

<template>
  <div class="driver-dashboard">
    <PageHeader
      title="Driver Dashboard"
      subtitle="Welcome back! Here's your overview"
    />

    <!-- Stats -->
    <DriverStats
      :stats="stats"
      :loading="statsLoading"
      class="mb-6"
    />

    <!-- Active Orders -->
    <v-card
      class="mb-6"
      elevation="2"
    >
      <v-card-title class="d-flex justify-space-between align-center">
        <span>
          <v-icon
            icon="mdi-truck-delivery"
            class="mr-2"
          />
          Active Orders
        </span>
        <v-btn
          variant="text"
          color="primary"
          size="small"
          to="/driver/my-orders"
        >
          View All
        </v-btn>
      </v-card-title>
      <v-card-text>
        <AcceptedOrdersList
          :orders="activeOrders"
          :loading="loading"
          @view="handleViewOrder"
          @update-status="handleUpdateStatus"
        />
      </v-card-text>
    </v-card>

    <!-- Available Orders -->
    <v-card elevation="2">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>
          <v-icon
            icon="mdi-package-variant"
            class="mr-2"
          />
          Available Orders
        </span>
        <v-btn
          variant="text"
          color="primary"
          size="small"
          to="/driver/available-orders"
        >
          View All
        </v-btn>
      </v-card-title>
      <v-card-text>
        <AvailableOrdersGrid
          :orders="availableOrders"
          :loading="loading"
          @accept="handleAcceptOrder"
          @view="handleViewOrder"
        />
      </v-card-text>
    </v-card>
  </div>
</template>
