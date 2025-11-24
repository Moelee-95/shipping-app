<script setup>
import OrderCard from '@/domains/orders/components/OrderCard.vue'
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

defineEmits(['accept', 'view'])
</script>

<template>
  <div class="available-orders-grid">
    <LoadingSpinner
      v-if="loading"
      text="Loading available orders..."
    />

    <EmptyState
      v-else-if="orders.length === 0"
      icon="mdi-package-variant-closed"
      title="No available orders"
      description="There are no orders available for pickup at the moment. Check back later!"
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
          action-type="accept"
          @accept="$emit('accept', order)"
          @view="$emit('view', order)"
        />
      </v-col>
    </v-row>
  </div>
</template>
