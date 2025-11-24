<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDriverStore } from '../store/driver.store'
import { useNotification } from '@/shared/composables/useNotification'
import { useConfirm } from '@/shared/composables/useConfirm'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import OrderFilters from '@/domains/orders/components/OrderFilters.vue'
import AvailableOrdersGrid from '../components/AvailableOrdersGrid.vue'

const router = useRouter()
const driverStore = useDriverStore()
const notification = useNotification()
const { confirm } = useConfirm()

const filters = ref({
  search: '',
  dateFrom: '',
  dateTo: ''
})

const availableOrders = computed(() => driverStore.availableOrders)
const loading = computed(() => driverStore.loading)

onMounted(() => {
  fetchOrders()
})

const fetchOrders = async () => {
  try {
    await driverStore.fetchAvailableOrders(filters.value)
  } catch (error) {
    notification.error('Failed to load available orders')
  }
}

const handleSearch = () => {
  fetchOrders()
}

const handleReset = () => {
  filters.value = {
    search: '',
    dateFrom: '',
    dateTo: ''
  }
  fetchOrders()
}

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
</script>

<template>
  <div class="available-orders-view">
    <PageHeader
      title="Available Orders"
      subtitle="Browse and accept orders for delivery"
    >
      <template #actions>
        <v-btn
          color="primary"
          variant="outlined"
          prepend-icon="mdi-refresh"
          @click="fetchOrders"
        >
          Refresh
        </v-btn>
      </template>
    </PageHeader>

    <OrderFilters
      v-model="filters"
      hide-status
      @search="handleSearch"
      @reset="handleReset"
    />

    <AvailableOrdersGrid
      :orders="availableOrders"
      :loading="loading"
      @accept="handleAcceptOrder"
      @view="handleViewOrder"
    />
  </div>
</template>
