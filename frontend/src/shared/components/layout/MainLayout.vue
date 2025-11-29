<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import AppFooter from './AppFooter.vue'
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog.vue'

const { mobile } = useDisplay()

const sidebarRail = ref(false)
const mobileDrawerOpen = ref(false)

const toggleSidebar = () => {
  if (mobile.value) {
    // On mobile, toggle drawer open/close
    mobileDrawerOpen.value = !mobileDrawerOpen.value
  } else {
    // On desktop, toggle rail mode (collapsed/expanded)
    sidebarRail.value = !sidebarRail.value
  }
}
</script>

<template>
  <v-layout class="main-layout">
    <AppHeader
      :sidebar-collapsed="sidebarRail"
      :mobile="mobile"
      :drawer-open="mobileDrawerOpen"
      @toggle-sidebar="toggleSidebar"
    />

    <AppSidebar
      :rail="sidebarRail"
      :mobile="mobile"
      :drawer-open="mobileDrawerOpen"
      @update:drawer-open="mobileDrawerOpen = $event"
    />

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
  padding: 5px;
  padding-bottom: 80px;
}

@media (max-width: 600px) {
  .main-layout__page {
    padding: 16px;
    padding-bottom: 80px;
  }
}
</style>
