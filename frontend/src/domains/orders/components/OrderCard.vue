<script setup>
import { formatCurrency, formatDate, formatOrderStatus, getStatusColor } from '@/shared/utils/formatters'

const props = defineProps({
  order: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: true
  },
  actionType: {
    type: String,
    default: 'view',
    validator: (v) => ['view', 'accept', 'manage'].includes(v)
  }
})

defineEmits(['view', 'accept', 'cancel', 'update-status'])
</script>

<template>
  <v-card
    class="order-card"
    elevation="2"
    hover
  >
    <v-card-text>
      <div class="order-card__header">
        <div class="order-card__id">
          <span class="text-caption text-grey">Order #</span>
          <span class="font-weight-bold">{{ order.id }}</span>
        </div>
        <v-chip
          :color="getStatusColor(order.status)"
          size="small"
          label
        >
          {{ formatOrderStatus(order.status) }}
        </v-chip>
      </div>

      <v-divider class="my-3" />

      <div class="order-card__locations">
        <div class="order-card__location">
          <v-icon
            icon="mdi-map-marker"
            color="success"
            size="small"
            class="mr-2"
          />
          <div>
            <div class="text-caption text-grey">Pickup</div>
            <div class="text-body-2">{{ order.pickup_address }}</div>
            <div class="text-caption">{{ order.pickup_city }}</div>
          </div>
        </div>
        <div class="order-card__arrow">
          <v-icon
            icon="mdi-arrow-down"
            color="grey"
          />
        </div>
        <div class="order-card__location">
          <v-icon
            icon="mdi-map-marker-check"
            color="error"
            size="small"
            class="mr-2"
          />
          <div>
            <div class="text-caption text-grey">Delivery</div>
            <div class="text-body-2">{{ order.delivery_address }}</div>
            <div class="text-caption">{{ order.delivery_city }}</div>
          </div>
        </div>
      </div>

      <v-divider class="my-3" />

      <div class="order-card__details">
        <div class="order-card__detail">
          <v-icon
            icon="mdi-package-variant"
            size="small"
            class="mr-1"
          />
          {{ order.weight }} kg
        </div>
        <div class="order-card__detail">
          <v-icon
            icon="mdi-calendar"
            size="small"
            class="mr-1"
          />
          {{ formatDate(order.pickup_date) }}
        </div>
        <div class="order-card__detail order-card__price">
          <v-icon
            icon="mdi-cash"
            size="small"
            class="mr-1"
          />
          {{ formatCurrency(order.price) }}
        </div>
      </div>
    </v-card-text>

    <v-card-actions v-if="showActions">
      <v-spacer />
      <v-btn
        v-if="actionType === 'view' || actionType === 'manage'"
        variant="text"
        color="primary"
        size="small"
        @click="$emit('view', order)"
      >
        View Details
      </v-btn>
      <v-btn
        v-if="actionType === 'accept'"
        variant="flat"
        color="success"
        size="small"
        @click="$emit('accept', order)"
      >
        Accept Order
      </v-btn>
      <v-btn
        v-if="actionType === 'manage' && order.status === 'pending'"
        variant="text"
        color="error"
        size="small"
        @click="$emit('cancel', order)"
      >
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.order-card {
  border-radius: 12px;
}

.order-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-card__locations {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-card__location {
  display: flex;
  align-items: flex-start;
}

.order-card__arrow {
  display: flex;
  justify-content: center;
  padding-left: 8px;
}

.order-card__details {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.order-card__detail {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #666;
}

.order-card__price {
  font-weight: 600;
  color: #1976d2;
}
</style>
