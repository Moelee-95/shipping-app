<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'

const router = useRouter()
const { isAuthenticated, getDashboardRoute } = useAuth()

const goHome = () => {
  if (isAuthenticated.value) {
    router.push(getDashboardRoute())
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div class="not-found">
    <div class="not-found__content">
      <h1 class="not-found__code">404</h1>
      <h2 class="not-found__title">Page Not Found</h2>
      <p class="not-found__description">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <v-btn
        color="primary"
        variant="flat"
        size="large"
        @click="goHome"
      >
        <v-icon
          icon="mdi-home"
          class="mr-2"
        />
        Go to Home
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.not-found__content {
  text-align: center;
  color: white;
}

.not-found__code {
  font-size: 120px;
  font-weight: 700;
  margin: 0;
  line-height: 1;
  opacity: 0.8;
}

.not-found__title {
  font-size: 32px;
  font-weight: 600;
  margin: 16px 0;
}

.not-found__description {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 32px;
}
</style>
