<template>
  <div class="manage-orders">
    <PageHeader
      title="Manage Orders"
      subtitle="View and manage all your shipping orders"
    >
      <template #actions>
        <v-btn color="primary" prepend-icon="mdi-plus" @click="goToCreateOrder">
          New Order
        </v-btn>
      </template>
    </PageHeader>

    <v-card class="mb-4">
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="filters.search"
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
              v-model="filters.status"
              label="Status"
              :items="statusOptions"
              variant="outlined"
              density="compact"
              hide-details
              clearable
              @update:model-value="applyFilters"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="filters.dateFrom"
              label="From Date"
              type="date"
              variant="outlined"
              density="compact"
              hide-details
              @update:model-value="applyFilters"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="filters.dateTo"
              label="To Date"
              type="date"
              variant="outlined"
              density="compact"
              hide-details
              @update:model-value="applyFilters"
            />
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn icon variant="text" @click="resetFilters">
              <v-icon>mdi-filter-off</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card>
      <CompanyOrdersList
        :orders="orders"
        :loading="loading"
        :pagination="pagination"
        @view="viewOrder"
        @edit="editOrder"
        @cancel="handleCancelOrder"
        @create="goToCreateOrder"
        @page-change="handlePageChange"
      />
    </v-card>

    <ConfirmDialog
      v-model="showCancelDialog"
      title="Cancel Order"
      message="Are you sure you want to cancel this order? This action cannot be undone."
      confirm-text="Yes, Cancel"
      confirm-color="error"
      @confirm="confirmCancelOrder"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCompanyStore } from '../store/company.store'
import { ORDER_STATUS_OPTIONS } from '@/shared/utils/constants'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import CompanyOrdersList from '../components/CompanyOrdersList.vue'
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog.vue'

const router = useRouter()
const companyStore = useCompanyStore()

const showCancelDialog = ref(false)
const orderToCancel = ref(null)
let searchTimeout = null

const filters = reactive({
  search: '',
  status: '',
  dateFrom: '',
  dateTo: ''
})

const statusOptions = ORDER_STATUS_OPTIONS.map(opt => ({
  title: opt.label,
  value: opt.value
}))

const orders = computed(() => companyStore.orders)
const loading = computed(() => companyStore.loading)
const pagination = computed(() => companyStore.pagination)

onMounted(() => {
  companyStore.fetchOrders()
})

const debouncedSearch = (value) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    companyStore.setFilters({ search: value })
    companyStore.fetchOrders()
  }, 300)
}

const applyFilters = () => {
  companyStore.setFilters(filters)
  companyStore.fetchOrders()
}

const resetFilters = () => {
  filters.search = ''
  filters.status = ''
  filters.dateFrom = ''
  filters.dateTo = ''
  companyStore.resetFilters()
  companyStore.fetchOrders()
}

const handlePageChange = (page) => {
  companyStore.setPage(page)
  companyStore.fetchOrders()
}

const goToCreateOrder = () => router.push('/company/orders/create')
const viewOrder = (order) => router.push(`/company/orders/${order.id}`)
const editOrder = (order) => router.push(`/company/orders/${order.id}?edit=true`)

const handleCancelOrder = (order) => {
  orderToCancel.value = order
  showCancelDialog.value = true
}

const confirmCancelOrder = async () => {
  if (orderToCancel.value) {
    await companyStore.cancelOrder(orderToCancel.value.id)
    orderToCancel.value = null
  }
}
</script>
