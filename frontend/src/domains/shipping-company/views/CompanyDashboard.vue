<template>
  <div class="company-dashboard">
    <PageHeader
      title="Dashboard"
      subtitle="Manage your shipping orders and track deliveries"
    >
      <template #actions>
        <el-button type="primary" @click="goToCreateOrder">
          <v-icon>mdi-plus</v-icon>
          New Order
        </el-button>
      </template>
    </PageHeader>

    <OrderStatistics :stats="stats" :loading="statsLoading" class="mb-6" />

    <v-row>
      <v-col cols="12">
        <el-card shadow="hover">
          <template #header>
            <div class="d-flex align-center justify-space-between">
              <span>Recent Orders</span>
              <el-button type="primary" text @click="goToOrders">
                View All
                <v-icon class="ml-1">mdi-arrow-right</v-icon>
              </el-button>
            </div>
          </template>
          <CompanyOrdersList
            :orders="recentOrders"
            :loading="loading"
            :pagination="{ currentPage: 1, totalPages: 1 }"
            @view="viewOrder"
            @edit="editOrder"
            @cancel="handleCancelOrder"
            @create="goToCreateOrder"
          />
        </el-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useCompanyStore } from '../store/company.store'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import OrderStatistics from '../components/OrderStatistics.vue'
import CompanyOrdersList from '../components/CompanyOrdersList.vue'

const router = useRouter()
const companyStore = useCompanyStore()

const quickOrderRef = ref(null)
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

const handleCancelOrder = async (order) => {
  try {
    await ElMessageBox.confirm(
      'Are you sure you want to cancel this order? This action cannot be undone.',
      'Cancel Order',
      {
        confirmButtonText: 'Yes, Cancel',
        cancelButtonText: 'No, Keep It',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )

    await companyStore.cancelOrder(order.id)
  } catch (error) {
    // User cancelled the dialog
    if (error !== 'cancel') {
      console.error('Failed to cancel order:', error)
    }
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
