<template>
  <div class="order-statistics">
    <v-row>
      <v-col v-for="stat in statCards" :key="stat.title" cols="12" sm="6" md="4" lg="2">
        <v-card class="stat-card pa-4" :class="stat.class">
          <div class="d-flex align-center justify-space-between">
            <div>
              <p class="text-caption text-grey mb-1">{{ stat.title }}</p>
              <p class="text-h5 font-weight-bold mb-0">
                <template v-if="loading">
                  <v-progress-circular size="20" width="2" indeterminate />
                </template>
                <template v-else>
                  {{ stat.prefix }}{{ stat.value }}{{ stat.suffix }}
                </template>
              </p>
            </div>
            <v-avatar :color="stat.color" size="48" class="stat-icon">
              <v-icon color="white">{{ stat.icon }}</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  stats: {
    type: Object,
    default: () => ({
      totalOrders: 0,
      pendingOrders: 0,
      activeOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      totalRevenue: 0
    })
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const formatValue = (value) => {
  if (value === null || value === undefined) return 0
  return typeof value === 'number' ? value : value
}

const statCards = computed(() => [
  {
    title: 'Total Orders',
    value: formatValue(props.stats.totalOrders),
    icon: 'mdi-package-variant-closed',
    color: 'primary',
    prefix: '',
    suffix: ''
  },
  {
    title: 'Pending',
    value: formatValue(props.stats.pendingOrders),
    icon: 'mdi-clock-outline',
    color: 'warning',
    prefix: '',
    suffix: ''
  },
  {
    title: 'Active',
    value: formatValue(props.stats.activeOrders),
    icon: 'mdi-truck-delivery',
    color: 'info',
    prefix: '',
    suffix: ''
  },
  {
    title: 'Completed',
    value: formatValue(props.stats.completedOrders),
    icon: 'mdi-check-circle',
    color: 'success',
    prefix: '',
    suffix: ''
  },
  {
    title: 'Cancelled',
    value: formatValue(props.stats.cancelledOrders),
    icon: 'mdi-close-circle',
    color: 'error',
    prefix: '',
    suffix: ''
  },
  {
    title: 'Total Revenue',
    value: formatValue(props.stats.totalRevenue)?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00',
    icon: 'mdi-currency-usd',
    color: 'secondary',
    prefix: '$',
    suffix: ''
  }
])
</script>

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
