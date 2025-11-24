<template>
  <div class="orders-list-view">
    <PageHeader
      title="Available Orders"
      subtitle="Browse and accept available shipping orders"
    />

    <v-card class="mb-4">
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="searchQuery"
              label="Search by address or ID..."
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
              v-model="cityFilter"
              label="Filter by City"
              :items="cityOptions"
              variant="outlined"
              density="compact"
              hide-details
              clearable
              @update:model-value="applyFilters"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              v-model="sortBy"
              label="Sort by"
              :items="sortOptions"
              variant="outlined"
              density="compact"
              hide-details
              @update:model-value="applyFilters"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-btn icon variant="text" @click="resetFilters">
              <v-icon>mdi-filter-off</v-icon>
              <v-tooltip activator="parent">Clear Filters</v-tooltip>
            </v-btn>
            <v-btn icon variant="text" @click="refreshOrders">
              <v-icon>mdi-refresh</v-icon>
              <v-tooltip activator="parent">Refresh</v-tooltip>
            </v-btn>
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

      <template v-else-if="orders.length">
        <v-row class="pa-4">
          <v-col v-for="order in orders" :key="order.id" cols="12" sm="6" lg="4">
            <OrderCard
              :order="order"
              show-actions
              @view="viewOrder"
              @accept="handleAcceptOrder"
            />
          </v-col>
        </v-row>

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
        icon="mdi-package-variant-closed"
        title="No Available Orders"
        description="There are no orders available at the moment. Check back later or adjust your filters."
      />
    </v-card>

    <ConfirmDialog
      v-model="showAcceptDialog"
      title="Accept Order"
      :message="`Are you sure you want to accept order #${orderToAccept?.id}? You will be responsible for this delivery.`"
      confirm-text="Accept Order"
      confirm-color="success"
      @confirm="confirmAcceptOrder"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrdersStore } from '../store/orders.store'
import { CITIES } from '@/shared/utils/constants'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import OrderCard from '../components/OrderCard.vue'
import EmptyState from '@/shared/components/common/EmptyState.vue'
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog.vue'

const router = useRouter()
const ordersStore = useOrdersStore()

const searchQuery = ref('')
const cityFilter = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const showAcceptDialog = ref(false)
const orderToAccept = ref(null)
let searchTimeout = null

const cityOptions = CITIES.map(city => ({ title: city, value: city }))

const sortOptions = [
  { title: 'Newest First', value: 'newest' },
  { title: 'Oldest First', value: 'oldest' },
  { title: 'Highest Price', value: 'price_high' },
  { title: 'Lowest Price', value: 'price_low' }
]

const loading = computed(() => ordersStore.loading)
const orders = computed(() => ordersStore.availableOrders)
const pagination = computed(() => ordersStore.pagination)

onMounted(() => {
  fetchOrders()
})

const fetchOrders = () => {
  ordersStore.fetchAvailableOrders({
    page: currentPage.value,
    search: searchQuery.value,
    city: cityFilter.value,
    sort: sortBy.value
  })
}

const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchOrders()
  }, 300)
}

const applyFilters = () => {
  currentPage.value = 1
  fetchOrders()
}

const resetFilters = () => {
  searchQuery.value = ''
  cityFilter.value = ''
  sortBy.value = 'newest'
  currentPage.value = 1
  fetchOrders()
}

const refreshOrders = () => {
  fetchOrders()
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchOrders()
}

const viewOrder = (order) => {
  router.push(`/orders/${order.id}`)
}

const handleAcceptOrder = (order) => {
  orderToAccept.value = order
  showAcceptDialog.value = true
}

const confirmAcceptOrder = async () => {
  if (orderToAccept.value) {
    await ordersStore.acceptOrder(orderToAccept.value.id)
    orderToAccept.value = null
    fetchOrders()
  }
}
</script>
