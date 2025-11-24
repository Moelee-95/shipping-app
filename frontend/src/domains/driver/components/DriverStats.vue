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
    key: 'activeOrders',
    title: 'Active Orders',
    icon: 'mdi-truck-delivery',
    color: 'warning',
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
    color: 'info',
    format: 'currency'
  }
]
</script>

<template>
  <v-row>
    <v-col
      v-for="card in statCards"
      :key="card.key"
      cols="12"
      sm="6"
      md="3"
    >
      <v-card
        :loading="loading"
        elevation="2"
      >
        <v-card-text>
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-caption text-grey mb-1">{{ card.title }}</div>
              <div class="text-h5 font-weight-bold">
                {{ card.format === 'currency' ? formatCurrency(stats[card.key]) : formatNumber(stats[card.key]) }}
              </div>
            </div>
            <v-avatar
              :color="card.color"
              size="48"
              variant="tonal"
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
