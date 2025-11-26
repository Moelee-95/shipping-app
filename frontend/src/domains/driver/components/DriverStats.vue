<script setup>
import { formatCurrency, formatNumber } from '@/shared/utils/formatters'

defineProps({
  stats: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const statCards = [
  {
    key: 'totalOrders',
    title: 'Total Orders',
    icon: 'mdi-package-variant',
    color: 'primary',
    format: 'number'
  },
  {
    key: 'pendingOrders',
    title: 'Pending',
    icon: 'mdi-clock-outline',
    color: 'warning',
    format: 'number'
  },
  {
    key: 'activeOrders',
    title: 'Active',
    icon: 'mdi-truck-delivery',
    color: 'info',
    format: 'number'
  },
  {
    key: 'completedOrders',
    title: 'Completed',
    icon: 'mdi-check-circle',
    color: 'success',
    format: 'number'
  },
  {
    key: 'totalEarnings',
    title: 'Total Earnings',
    icon: 'mdi-cash-multiple',
    color: 'secondary',
    format: 'currency'
  },
  {
    key: 'rating',
    title: 'Rating',
    icon: 'mdi-star',
    color: 'amber',
    format: 'rating'
  }
]

const formatValue = (value, format) => {
  if (value === null || value === undefined) {
    return format === 'rating' ? 'N/A' : '0'
  }

  switch (format) {
    case 'currency':
      return formatCurrency(value)
    case 'rating':
      return value.toFixed(1) + ' ★'
    default:
      return formatNumber(value)
  }
}
</script>

<template>
  <v-row>
    <v-col
      v-for="card in statCards"
      :key="card.key"
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <v-card
        class="stat-card"
        :loading="loading"
        elevation="2"
      >
        <v-card-text class="pa-4">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-caption text-grey mb-1">{{ card.title }}</div>
              <div class="text-h5 font-weight-bold">
                {{ formatValue(stats[card.key], card.format) }}
              </div>
            </div>
            <v-avatar
              :color="card.color"
              size="48"
              variant="tonal"
              class="stat-icon"
            >
              <v-icon
                :icon="card.icon"
                size="24"
              />
            </v-avatar>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.stat-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  flex-shrink: 0;
}
</style>
