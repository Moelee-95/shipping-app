<script setup>
import { formatCurrency, formatDate, formatOrderStatus, getStatusColor } from '@/shared/utils/formatters'
import { ORDER_STATUS } from '@/shared/utils/constants'
import EmptyState from '@/shared/components/common/EmptyState.vue'
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner.vue'

defineProps({
  orders: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['view', 'update-status'])

const getNextStatus = (currentStatus) => {
  const statusFlow = {
    [ORDER_STATUS.ACCEPTED]: { next: ORDER_STATUS.PICKED_UP, label: 'Mark Picked Up' },
    [ORDER_STATUS.PICKED_UP]: { next: ORDER_STATUS.IN_TRANSIT, label: 'Start Delivery' },
    [ORDER_STATUS.IN_TRANSIT]: { next: ORDER_STATUS.DELIVERED, label: 'Mark Delivered' }
  }
  return statusFlow[currentStatus] || null
}
</script>

<template>
  <div class="accepted-orders-list">
    <LoadingSpinner
      v-if="loading"
      text="Loading your orders..."
    />

    <EmptyState
      v-else-if="orders.length === 0"
      icon="mdi-clipboard-list-outline"
      title="No active orders"
      description="You haven't accepted any orders yet. Browse available orders to get started!"
    />

    <v-table v-else>
      <thead>
        <tr>
          <th>Order #</th>
          <th>Route</th>
          <th>Pickup Date</th>
          <th>Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
        >
          <td class="font-weight-medium">#{{ order.id }}</td>
          <td>
            <div class="text-body-2">{{ order.pickup_city }}</div>
            <div class="text-caption text-grey">→ {{ order.delivery_city }}</div>
          </td>
          <td>{{ formatDate(order.pickup_date) }}</td>
          <td class="text-primary font-weight-medium">{{ formatCurrency(order.price) }}</td>
          <td>
            <v-chip
              :color="getStatusColor(order.status)"
              size="small"
              label
            >
              {{ formatOrderStatus(order.status) }}
            </v-chip>
          </td>
          <td>
            <v-btn
              variant="text"
              size="small"
              color="primary"
              @click="$emit('view', order)"
            >
              View
            </v-btn>
            <v-btn
              v-if="getNextStatus(order.status)"
              variant="flat"
              size="small"
              color="success"
              class="ml-1"
              @click="$emit('update-status', { order, status: getNextStatus(order.status).next })"
            >
              {{ getNextStatus(order.status).label }}
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
