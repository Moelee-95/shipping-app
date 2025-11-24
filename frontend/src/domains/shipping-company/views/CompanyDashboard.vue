<template>
  <div class="company-dashboard">
    <PageHeader
      title="Dashboard"
      subtitle="Manage your shipping orders and track deliveries"
    >
      <template #actions>
        <v-btn color="primary" prepend-icon="mdi-plus" @click="goToCreateOrder">
          New Order
        </v-btn>
      </template>
    </PageHeader>

    <OrderStatistics :stats="stats" :loading="statsLoading" class="mb-6" />

    <v-row>
      <v-col cols="12" lg="8">
        <v-card>
          <v-card-title class="d-flex align-center justify-space-between">
            <span>Recent Orders</span>
            <v-btn variant="text" size="small" @click="goToOrders">
              View All
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="pa-0">
            <CompanyOrdersList
              :orders="recentOrders"
              :loading="loading"
              :pagination="{ currentPage: 1, totalPages: 1 }"
              @view="viewOrder"
              @edit="editOrder"
              @cancel="handleCancelOrder"
              @create="goToCreateOrder"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <QuickOrderForm :loading="createLoading" @submit="handleQuickOrder" ref="quickOrderRef" />
      </v-col>
    </v-row>

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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCompanyStore } from '../store/company.store'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import OrderStatistics from '../components/OrderStatistics.vue'
import CompanyOrdersList from '../components/CompanyOrdersList.vue'
import QuickOrderForm from '../components/QuickOrderForm.vue'
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog.vue'

const router = useRouter()
const companyStore = useCompanyStore()

const quickOrderRef = ref(null)
const showCancelDialog = ref(false)
const orderToCancel = ref(null)
const createLoading = ref(false)

const stats = computed(() => companyStore.stats)
const statsLoading = computed(() => companyStore.statsLoading)
const loading = computed(() => companyStore.loading)
const recentOrders = computed(() => companyStore.orders.slice(0, 5))

onMounted(async () => {
  await Promise.all([
    companyStore.fetchStats(),
    companyStore.fetchOrders({ per_page: 5 })
  ])
})

const goToCreateOrder = () => router.push('/company/orders/create')
const goToOrders = () => router.push('/company/orders')
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

const handleQuickOrder = async (orderData) => {
  createLoading.value = true
  try {
    await companyStore.createOrder(orderData)
    quickOrderRef.value?.resetForm()
  } finally {
    createLoading.value = false
  }
}
</script>

<style scoped>
.company-dashboard {
  padding: 0;
}
</style>
