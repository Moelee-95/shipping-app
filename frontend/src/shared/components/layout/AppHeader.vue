<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '@/shared/composables/useAuth'
import { formatRole, formatTimeAgo } from '@/shared/utils/formatters'

defineProps({
  sidebarCollapsed: {
    type: Boolean,
    default: false
  },
  mobile: {
    type: Boolean,
    default: false
  },
  drawerOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-sidebar'])

const { user, logout, isDriver, isShippingCompany } = useAuth()

// Mock notifications data
const notifications = ref([
  {
    id: 1,
    type: 'order',
    title: 'New Order Available',
    message: 'A new order is available for pickup in Manhattan area.',
    read: false,
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString() // 5 mins ago
  },
  {
    id: 2,
    type: 'status',
    title: 'Order Delivered',
    message: 'Order #TRK-2024-005 has been successfully delivered.',
    read: false,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 mins ago
  },
  {
    id: 3,
    type: 'system',
    title: 'Welcome to ShipTrack!',
    message: 'Thank you for joining. Start exploring available orders.',
    read: true,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  }
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const getNotificationIcon = (type) => {
  const icons = {
    order: 'mdi-package-variant',
    status: 'mdi-truck-check',
    system: 'mdi-information',
    alert: 'mdi-alert-circle'
  }
  return icons[type] || 'mdi-bell'
}

const getNotificationColor = (type) => {
  const colors = {
    order: 'primary',
    status: 'success',
    system: 'info',
    alert: 'warning'
  }
  return colors[type] || 'grey'
}

const markAsRead = (notification) => {
  notification.read = true
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}
</script>

<template>
  <v-app-bar
    color="white"
    elevation="1"
    class="app-header"
  >
    <v-app-bar-nav-icon @click="emit('toggle-sidebar')">
      <v-icon :icon="mobile ? 'mdi-menu' : (sidebarCollapsed ? 'mdi-menu' : 'mdi-menu-open')" />
    </v-app-bar-nav-icon>

    <v-app-bar-title>
      <div class="d-flex align-center">
        <v-icon
          icon="mdi-truck-fast"
          color="primary"
          class="mr-2"
        />
        <span class="font-weight-bold">ShipTrack</span>
      </div>
    </v-app-bar-title>

    <v-spacer />

    <!-- Notifications Menu -->
    <v-menu
      :close-on-content-click="false"
      location="bottom end"
      max-width="400"
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          icon
          variant="text"
          class="mr-2"
        >
          <v-badge
            :content="unreadCount"
            :model-value="unreadCount > 0"
            color="error"
            floating
          >
            <v-icon icon="mdi-bell-outline" />
          </v-badge>
        </v-btn>
      </template>

      <v-card min-width="350">
        <v-card-title class="d-flex justify-space-between align-center py-3">
          <span class="text-h6">Notifications</span>
          <v-btn
            v-if="unreadCount > 0"
            variant="text"
            size="small"
            color="primary"
            @click="markAllAsRead"
          >
            Mark all read
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-list v-if="notifications.length" class="py-0" max-height="400" style="overflow-y: auto;">
          <v-list-item
            v-for="notification in notifications"
            :key="notification.id"
            :class="{ 'bg-grey-lighten-4': !notification.read }"
            @click="markAsRead(notification)"
            class="py-3"
          >
            <template #prepend>
              <v-avatar
                :color="getNotificationColor(notification.type)"
                size="40"
                variant="tonal"
              >
                <v-icon :icon="getNotificationIcon(notification.type)" size="20" />
              </v-avatar>
            </template>

            <v-list-item-title class="text-body-2 font-weight-medium">
              {{ notification.title }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-caption mt-1">
              {{ notification.message }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption text-grey mt-1">
              {{ formatTimeAgo(notification.created_at) }}
            </v-list-item-subtitle>

            <template #append>
              <v-icon
                v-if="!notification.read"
                icon="mdi-circle"
                color="primary"
                size="8"
              />
            </template>
          </v-list-item>
        </v-list>

        <div v-else class="pa-6 text-center">
          <v-icon icon="mdi-bell-off-outline" size="48" color="grey-lighten-1" class="mb-2" />
          <p class="text-body-2 text-grey">No notifications yet</p>
        </div>

        <v-divider />

        <v-card-actions class="justify-center">
          <v-btn variant="text" color="primary" size="small">
            View All Notifications
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

    <!-- User Menu -->
    <v-menu>
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          class="text-none"
        >
          <v-avatar
            color="primary"
            size="32"
            class="mr-2"
          >
            <span class="text-white text-body-2">
              {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
            </span>
          </v-avatar>
          <div class="d-none d-sm-block text-left">
            <div class="text-body-2 font-weight-medium">{{ user?.name || 'User' }}</div>
            <div class="text-caption text-grey">{{ formatRole(user?.role) }}</div>
          </div>
          <v-icon
            icon="mdi-chevron-down"
            size="small"
            class="ml-1"
          />
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          prepend-icon="mdi-account"
          title="Profile"
          to="/profile"
        />
        <v-list-item
          prepend-icon="mdi-cog"
          title="Settings"
          to="/settings"
        />
        <v-divider />
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          @click="logout"
        />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.app-header {
  border-bottom: 1px solid #e0e0e0;
}
</style>
