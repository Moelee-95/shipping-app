<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useDriverStore } from '../store/driver.store'
import { useNotification } from '@/shared/composables/useNotification'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import DriverStats from '../components/DriverStats.vue'
import AvailableOrdersGrid from '../components/AvailableOrdersGrid.vue'
import AcceptedOrdersList from '../components/AcceptedOrdersList.vue'

const router = useRouter()
const driverStore = useDriverStore()
const notification = useNotification()

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
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to accept order #${order.id}? You will be responsible for picking up and delivering this package.`,
      'Accept Order',
      {
        confirmButtonText: 'Accept',
        cancelButtonText: 'Cancel',
        type: 'info'
      }
    )

    await driverStore.acceptOrder(order.id)
    notification.success('Order accepted successfully!')
  } catch (error) {
    if (error !== 'cancel') {
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
    <el-card class="mb-6" shadow="hover">
      <template #header>
        <div class="d-flex justify-space-between align-center">
          <span>
            <v-icon icon="mdi-truck-delivery" class="mr-2" />
            Active Orders
          </span>
          <el-button type="primary" text @click="router.push('/driver/my-orders')">
            View All
          </el-button>
        </div>
      </template>
      <AcceptedOrdersList
        :orders="activeOrders"
        :loading="loading"
        @view="handleViewOrder"
        @update-status="handleUpdateStatus"
      />
    </el-card>

    <!-- Available Orders -->
    <el-card shadow="hover">
      <template #header>
        <div class="d-flex justify-space-between align-center">
          <span>
            <v-icon icon="mdi-package-variant" class="mr-2" />
            Available Orders
          </span>
          <el-button type="primary" text @click="router.push('/driver/available-orders')">
            View All
          </el-button>
        </div>
      </template>
      <AvailableOrdersGrid
        :orders="availableOrders"
        :loading="loading"
        @accept="handleAcceptOrder"
        @view="handleViewOrder"
      />
    </el-card>
  </div>
</template>
