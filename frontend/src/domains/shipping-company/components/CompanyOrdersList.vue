<template>
  <div class="company-orders-list">
    <v-card v-if="loading" class="pa-4">
      <div class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary" />
      </div>
    </v-card>

    <template v-else-if="orders.length">
      <v-table class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Pickup</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Driver</th>
            <th>Price</th>
            <th>Created</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td class="font-weight-medium">#{{ order.id }}</td>
            <td>
              <div class="location-cell">
                <v-icon size="small" color="success" class="mr-1">mdi-map-marker</v-icon>
                {{ truncate(order.pickup_address, 25) }}
              </div>
            </td>
            <td>
              <div class="location-cell">
                <v-icon size="small" color="error" class="mr-1">mdi-map-marker-check</v-icon>
                {{ truncate(order.delivery_address, 25) }}
              </div>
            </td>
            <td>
              <v-chip :color="getStatusColor(order.status)" size="small" label>
                {{ formatStatus(order.status) }}
              </v-chip>
            </td>
            <td>
              <span v-if="order.driver">{{ order.driver.name }}</span>
              <span v-else class="text-grey">Unassigned</span>
            </td>
            <td class="font-weight-medium">${{ order.price }}</td>
            <td>{{ formatDateTime(order.created_at) }}</td>
            <td class="text-center">
              <el-button text size="small" @click="$emit('view', order)">
                <v-icon size="small">mdi-eye</v-icon>
              </el-button>
              <el-button
                v-if="order.status === 'pending'"
                text
                size="small"
                @click="$emit('edit', order)"
              >
                <v-icon size="small">mdi-pencil</v-icon>
              </el-button>
              <el-button
                v-if="canCancel(order.status)"
                text
                type="danger"
                size="small"
                @click="$emit('cancel', order)"
              >
                <v-icon size="small">mdi-close-circle</v-icon>
              </el-button>
            </td>
          </tr>
        </tbody>
      </v-table>

      <div v-if="pagination.totalPages > 1" class="d-flex justify-center mt-4">
        <v-pagination
          :model-value="pagination.currentPage"
          :length="pagination.totalPages"
          :total-visible="5"
          @update:model-value="$emit('page-change', $event)"
        />
      </div>
    </template>

    <EmptyState
      v-else
      icon="mdi-package-variant"
      title="No Orders Found"
      description="You haven't created any orders yet. Create your first order to get started."
    >
      <el-button type="primary" @click="$emit('create')">
        <v-icon>mdi-plus</v-icon>
        Create Order
      </el-button>
    </EmptyState>
  </div>
</template>

<script setup>
import { formatDateTime, formatOrderStatus, getStatusColor as getColor, truncate } from '@/shared/utils/formatters'
import EmptyState from '@/shared/components/common/EmptyState.vue'

defineProps({
  orders: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Object,
    default: () => ({
      currentPage: 1,
      totalPages: 1,
      perPage: 10,
      total: 0
    })
  }
})

defineEmits(['view', 'edit', 'cancel', 'create', 'page-change'])

const formatStatus = (status) => formatOrderStatus(status)
const getStatusColor = (status) => getColor(status)

const canCancel = (status) => ['pending', 'accepted'].includes(status)
</script>

<style scoped>
.orders-table {
  width: 100%;
}

.location-cell {
  display: flex;
  align-items: center;
  max-width: 200px;
}
</style>
