<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'

const router = useRouter()
const { isAuthenticated, getDashboardRoute, logout } = useAuth()

const goBack = () => {
  if (isAuthenticated.value) {
    router.push(getDashboardRoute())
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div class="unauthorized-view">
    <div class="unauthorized-view__content">
      <v-icon
        icon="mdi-shield-lock"
        size="100"
        color="white"
        class="mb-4"
      />
      <h1 class="text-h3 font-weight-bold mb-4">Access Denied</h1>
      <p class="text-h6 mb-6">You don't have permission to access this page.</p>
      <div class="d-flex gap-3">
        <v-btn
          color="white"
          variant="outlined"
          size="large"
          @click="goBack"
        >
          <v-icon
            icon="mdi-arrow-left"
            class="mr-2"
          />
          Go Back
        </v-btn>
        <v-btn
          color="white"
          variant="flat"
          size="large"
          @click="logout"
        >
          <v-icon
            icon="mdi-logout"
            class="mr-2"
          />
          Logout
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unauthorized-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff6b6b 0%, #c0392b 100%);
  padding: 24px;
  text-align: center;
  color: white;
}

.unauthorized-view__content {
  max-width: 500px;
}
</style>
