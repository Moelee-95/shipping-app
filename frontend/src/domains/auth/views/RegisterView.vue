<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'
import RegisterForm from '../components/RegisterForm.vue'

const router = useRouter()
const { isAuthenticated, getDashboardRoute } = useAuth()

onMounted(() => {
  if (isAuthenticated.value) {
    router.push(getDashboardRoute())
  }
})
</script>

<template>
  <div class="register-view">
    <div class="register-view__container">
      <div class="register-view__header">
        <router-link to="/" class="logo-link">
          <div class="logo-wrapper">
            <v-icon
              icon="mdi-truck-fast"
              size="40"
              color="white"
            />
          </div>
        </router-link>
        <h1 class="text-h5 font-weight-bold mb-1">Create Account</h1>
        <p class="text-body-2 header-subtitle">Join ShipTrack to start shipping</p>
      </div>

      <v-card
        class="register-view__card"
        elevation="8"
      >
        <v-card-text class="pa-4">
          <RegisterForm />
        </v-card-text>
      </v-card>

      <div class="register-view__footer">
        <p class="text-body-2">
          Already have an account?
          <router-link to="/login" class="signin-link">
            Sign in
          </router-link>
        </p>
        <router-link to="/" class="back-home">
          <v-icon icon="mdi-arrow-left" size="small" />
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 50%, #0D47A1 100%);
  padding: 24px;
}

.register-view__container {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
}

.register-view__header {
  text-align: center;
  margin-bottom: 16px;
  color: white;
}

.logo-link {
  text-decoration: none;
  display: inline-block;
}

.logo-wrapper {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo-wrapper:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}

.header-subtitle {
  color: rgba(255, 255, 255, 0.85);
}

.register-view__card {
  border-radius: 16px;
  overflow: hidden;
}

.register-view__footer {
  text-align: center;
  margin-top: 16px;
  color: white;
}

.register-view__footer p {
  margin-bottom: 12px;
}

.signin-link {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  padding-bottom: 2px;
  transition: border-color 0.3s ease;
}

.signin-link:hover {
  border-color: #fff;
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.back-home:hover {
  color: #fff;
}
</style>
