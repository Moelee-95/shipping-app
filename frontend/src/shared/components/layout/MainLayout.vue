<script setup>
import { ref } from 'vue'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import AppFooter from './AppFooter.vue'
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog.vue'

const sidebarRail = ref(false)

const toggleSidebar = () => {
  sidebarRail.value = !sidebarRail.value
}
</script>

<template>
  <v-layout class="main-layout">
    <AppHeader
      :sidebar-collapsed="sidebarRail"
      @toggle-sidebar="toggleSidebar"
    />

    <AppSidebar :rail="sidebarRail" />

    <v-main class="main-layout__content">
      <div class="main-layout__page">
        <router-view />
      </div>
    </v-main>

    <AppFooter />

    <ConfirmDialog />
  </v-layout>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
}

.main-layout__content {
  background-color: #f5f5f5;
  overflow-y: auto;
}

.main-layout__page {
  padding: 24px;
  padding-bottom: 80px;
}

@media (max-width: 600px) {
  .main-layout__page {
    padding: 16px;
    padding-bottom: 80px;
  }
}
</style>
