<script setup>
import OrderCard from './OrderCard.vue'
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
  },
  actionType: {
    type: String,
    default: 'view'
  },
  emptyTitle: {
    type: String,
    default: 'No orders found'
  },
  emptyDescription: {
    type: String,
    default: 'There are no orders to display at the moment.'
  },
  emptyIcon: {
    type: String,
    default: 'mdi-package-variant-closed'
  }
})

defineEmits(['view', 'accept', 'cancel', 'update-status'])
</script>

<template>
  <div class="order-list">
    <LoadingSpinner
      v-if="loading"
      text="Loading orders..."
    />

    <EmptyState
      v-else-if="orders.length === 0"
      :icon="emptyIcon"
      :title="emptyTitle"
      :description="emptyDescription"
    />

    <v-row v-else>
      <v-col
        v-for="order in orders"
        :key="order.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <OrderCard
          :order="order"
          :action-type="actionType"
          @view="$emit('view', order)"
          @accept="$emit('accept', order)"
          @cancel="$emit('cancel', order)"
          @update-status="$emit('update-status', { order, status: $event })"
        />
      </v-col>
    </v-row>
  </div>
</template>
