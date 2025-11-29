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
            <el-input
              v-model="filters.search"
              placeholder="Search orders..."
              clearable
              @input="debouncedSearch"
            >
              <template #prefix>
                <v-icon icon="mdi-magnify" size="small" />
              </template>
            </el-input>
          </v-col>
          <v-col cols="12" sm="3">
            <el-select
              v-model="filters.status"
              placeholder="Status"
              clearable
              @change="applyFilters"
              style="width: 100%"
            >
              <el-option
                v-for="option in statusOptions"
                :key="option.value"
                :label="option.title"
                :value="option.value"
              />
            </el-select>
          </v-col>
          <v-col cols="12" sm="4">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="to"
              start-placeholder="Start date"
              end-placeholder="End date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
              size="default"
              clearable
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
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

const dateRange = ref([])

watch(dateRange, (newRange, oldRange) => {
  if (newRange && newRange.length === 2) {
    filters.dateFrom = newRange[0] ? formatDate(newRange[0]) : ''
    filters.dateTo = newRange[1] ? formatDate(newRange[1]) : ''
    applyFilters()
  } else if (oldRange && oldRange.length > 0) {
    // Only apply filters when clearing an existing range
    filters.dateFrom = ''
    filters.dateTo = ''
    applyFilters()
  }
})

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

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
  dateRange.value = []
  companyStore.resetFilters()
  companyStore.fetchOrders()
}

const handlePageChange = (page) => {
  companyStore.setPage(page)
  companyStore.fetchOrders()
}

const goToCreateOrder = () => router.push('/company/orders/create')
const viewOrder = (order) => router.push(`/company/orders/${order.id}`)
const editOrder = (order) => router.push(`/company/orders/${order.id}/edit`)

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

<style scoped>
/* Component-specific styles if needed */
</style>
