<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrdersStore } from '../store/orders.store'
import { useAuth } from '@/shared/composables/useAuth'
import { useNotification } from '@/shared/composables/useNotification'
import { useConfirm } from '@/shared/composables/useConfirm'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import OrderDetails from '../components/OrderDetails.vue'
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const ordersStore = useOrdersStore()
const { isDriver } = useAuth()
const notification = useNotification()
const { confirm } = useConfirm()

const loading = ref(true)

const order = computed(() => ordersStore.currentOrder)

const backRoute = computed(() => {
  if (isDriver.value) {
    return '/driver/my-orders'
  }
  return '/company/orders'
})

onMounted(async () => {
  try {
    await ordersStore.fetchOrder(route.params.id)
  } catch (error) {
    notification.error('Failed to load order details')
    router.push(backRoute.value)
  } finally {
    loading.value = false
  }
})

const handleUpdateStatus = async (status) => {
  const confirmed = await confirm({
    title: 'Update Status',
    message: `Are you sure you want to update the order status?`,
    confirmText: 'Update',
    type: 'info'
  })

  if (confirmed) {
    try {
      await ordersStore.updateOrderStatus(order.value.id, status)
      notification.success('Order status updated successfully')
    } catch (error) {
      notification.error('Failed to update order status')
    }
  }
}
</script>

<template>
  <div class="order-details-view">
    <LoadingSpinner
      v-if="loading"
      text="Loading order details..."
    />

    <template v-else-if="order">
      <PageHeader
        :title="`Order #${order.id}`"
        subtitle="Order details and tracking"
        :back-route="backRoute"
      />

      <OrderDetails
        :order="order"
        :show-status-actions="isDriver && !['delivered', 'cancelled'].includes(order.status)"
        @update-status="handleUpdateStatus"
      />
    </template>
  </div>
</template>
