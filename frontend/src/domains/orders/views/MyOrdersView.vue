<template>
  <div class="my-orders-view">
    <PageHeader
      title="My Orders"
      subtitle="View all your orders and their current status"
    />

    <v-card class="mb-4">
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="searchQuery"
              label="Search orders..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              clearable
              @update:model-value="debouncedSearch"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              v-model="statusFilter"
              label="Filter by Status"
              :items="statusOptions"
              variant="outlined"
              density="compact"
              hide-details
              clearable
              @update:model-value="applyFilter"
            />
          </v-col>
          <v-col cols="12" sm="5">
            <v-btn-toggle v-model="viewMode" mandatory density="compact" color="primary">
              <v-btn value="all">All</v-btn>
              <v-btn value="active">Active</v-btn>
              <v-btn value="completed">Completed</v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-text v-if="loading" class="pa-6">
        <div class="d-flex justify-center">
          <v-progress-circular indeterminate color="primary" size="48" />
        </div>
      </v-card-text>

      <template v-else-if="filteredOrders.length">
        <OrderList
          :orders="filteredOrders"
          @view="viewOrder"
        />

        <div v-if="pagination.totalPages > 1" class="d-flex justify-center pa-4">
          <v-pagination
            v-model="currentPage"
            :length="pagination.totalPages"
            :total-visible="5"
            @update:model-value="handlePageChange"
          />
        </div>
      </template>

      <EmptyState
        v-else
        icon="mdi-package-variant"
        title="No Orders Found"
        :description="emptyStateMessage"
      />
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useOrdersStore } from '../store/orders.store'
import { ORDER_STATUS_OPTIONS } from '@/shared/utils/constants'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import OrderList from '../components/OrderList.vue'
import EmptyState from '@/shared/components/common/EmptyState.vue'

const router = useRouter()
const ordersStore = useOrdersStore()

const searchQuery = ref('')
const statusFilter = ref('')
const viewMode = ref('all')
const currentPage = ref(1)
let searchTimeout = null

const statusOptions = ORDER_STATUS_OPTIONS.map(opt => ({
  title: opt.label,
  value: opt.value
}))

const loading = computed(() => ordersStore.loading)
const pagination = computed(() => ordersStore.pagination)

const filteredOrders = computed(() => {
  let orders = ordersStore.myOrders

  if (viewMode.value === 'active') {
    orders = orders.filter(o => ['pending', 'accepted', 'picked_up', 'in_transit'].includes(o.status))
  } else if (viewMode.value === 'completed') {
    orders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status))
  }

  return orders
})

const emptyStateMessage = computed(() => {
  if (searchQuery.value || statusFilter.value) {
    return 'No orders match your search criteria. Try adjusting your filters.'
  }
  return 'You have no orders yet.'
})

onMounted(() => {
  fetchOrders()
})

watch(viewMode, () => {
  currentPage.value = 1
  fetchOrders()
})

const fetchOrders = () => {
  ordersStore.fetchMyOrders({
    page: currentPage.value,
    search: searchQuery.value,
    status: statusFilter.value
  })
}

const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchOrders()
  }, 300)
}

const applyFilter = () => {
  currentPage.value = 1
  fetchOrders()
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchOrders()
}

const viewOrder = (order) => {
  router.push(`/orders/${order.id}`)
}
</script>
