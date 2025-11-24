<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDriverStore } from '../store/driver.store'
import { useNotification } from '@/shared/composables/useNotification'
import { useConfirm } from '@/shared/composables/useConfirm'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import OrderFilters from '@/domains/orders/components/OrderFilters.vue'
import OrderList from '@/domains/orders/components/OrderList.vue'

const router = useRouter()
const driverStore = useDriverStore()
const notification = useNotification()
const { confirm } = useConfirm()

const filters = ref({
  status: '',
  search: '',
  dateFrom: '',
  dateTo: ''
})

const activeTab = ref('active')

const myOrders = computed(() => driverStore.myOrders)
const loading = computed(() => driverStore.loading)

const filteredOrders = computed(() => {
  if (activeTab.value === 'active') {
    return myOrders.value.filter((o) => ['accepted', 'picked_up', 'in_transit'].includes(o.status))
  } else if (activeTab.value === 'completed') {
    return myOrders.value.filter((o) => o.status === 'delivered')
  }
  return myOrders.value
})

onMounted(() => {
  fetchOrders()
})

const fetchOrders = async () => {
  try {
    await driverStore.fetchMyOrders(filters.value)
  } catch (error) {
    notification.error('Failed to load your orders')
  }
}

const handleSearch = () => {
  fetchOrders()
}

const handleReset = () => {
  filters.value = {
    status: '',
    search: '',
    dateFrom: '',
    dateTo: ''
  }
  fetchOrders()
}

const handleViewOrder = (order) => {
  router.push(`/orders/${order.id}`)
}

const handleUpdateStatus = async ({ order, status }) => {
  const confirmed = await confirm({
    title: 'Update Status',
    message: `Are you sure you want to update the order status?`,
    confirmText: 'Update',
    type: 'info'
  })

  if (confirmed) {
    try {
      await driverStore.updateOrderStatus(order.id, status)
      notification.success('Order status updated!')
    } catch (error) {
      notification.error('Failed to update order status')
    }
  }
}
</script>

<template>
  <div class="driver-orders-view">
    <PageHeader
      title="My Orders"
      subtitle="Manage your accepted and completed orders"
    />

    <v-tabs
      v-model="activeTab"
      class="mb-4"
      color="primary"
    >
      <v-tab value="active">
        <v-icon
          icon="mdi-truck-delivery"
          class="mr-2"
        />
        Active Orders
      </v-tab>
      <v-tab value="completed">
        <v-icon
          icon="mdi-check-circle"
          class="mr-2"
        />
        Completed
      </v-tab>
      <v-tab value="all">
        <v-icon
          icon="mdi-format-list-bulleted"
          class="mr-2"
        />
        All Orders
      </v-tab>
    </v-tabs>

    <OrderFilters
      v-model="filters"
      @search="handleSearch"
      @reset="handleReset"
    />

    <OrderList
      :orders="filteredOrders"
      :loading="loading"
      action-type="view"
      :empty-title="activeTab === 'active' ? 'No active orders' : activeTab === 'completed' ? 'No completed orders' : 'No orders found'"
      :empty-description="activeTab === 'active' ? 'Accept some orders to see them here' : 'Complete deliveries to see them here'"
      @view="handleViewOrder"
      @update-status="handleUpdateStatus"
    />
  </div>
</template>
