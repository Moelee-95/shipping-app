<script setup>
import { computed } from 'vue'
import { useAuth } from '@/shared/composables/useAuth'
import { ROLES } from '@/shared/utils/constants'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  rail: {
    type: Boolean,
    default: false
  }
})

const { isDriver, isShippingCompany } = useAuth()

const driverMenuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    to: '/driver/dashboard'
  },
  {
    title: 'Available Orders',
    icon: 'mdi-package-variant',
    to: '/driver/available-orders'
  },
  {
    title: 'My Orders',
    icon: 'mdi-clipboard-list',
    to: '/driver/my-orders'
  }
]

const companyMenuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    to: '/company/dashboard'
  },
  {
    title: 'Branches',
    icon: 'mdi-office-building',
    to: '/company/branches'
  },
  {
    title: 'Create Order',
    icon: 'mdi-plus-box',
    to: '/company/orders/create'
  },
  {
    title: 'Manage Orders',
    icon: 'mdi-clipboard-list',
    to: '/company/orders'
  }
]

const menuItems = computed(() => {
  if (isDriver.value) return driverMenuItems
  if (isShippingCompany.value) return companyMenuItems
  return []
})
</script>

<template>
  <v-navigation-drawer
    :rail="rail"
    permanent
    color="primary"
    class="app-sidebar"
  >
    <v-list
      nav
      density="comfortable"
    >
      <v-list-item
        v-for="item in menuItems"
        :key="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
        rounded="xl"
        class="my-1"
        color="white"
      />
    </v-list>

    <template #append>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-help-circle-outline"
          title="Help"
          rounded="xl"
          color="white"
        />
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.app-sidebar {
  border-right: none;
}

.app-sidebar :deep(.v-list-item--active) {
  background-color: rgba(255, 255, 255, 0.2);
}

.app-sidebar :deep(.v-list-item:hover) {
  background-color: rgba(255, 255, 255, 0.1);
}

.app-sidebar :deep(.v-list-item__prepend > .v-icon) {
  color: rgba(255, 255, 255, 0.9);
}

.app-sidebar :deep(.v-list-item-title) {
  color: rgba(255, 255, 255, 0.9);
}
</style>
