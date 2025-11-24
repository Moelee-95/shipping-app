<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'
import LoginForm from '../components/LoginForm.vue'

const router = useRouter()
const { isAuthenticated, getDashboardRoute } = useAuth()

onMounted(() => {
  if (isAuthenticated.value) {
    router.push(getDashboardRoute())
  }
})
</script>

<template>
  <div class="login-view">
    <div class="login-view__container">
      <div class="login-view__header">
        <div class="logo-wrapper">
          <v-icon
            icon="mdi-truck-fast"
            size="56"
            color="white"
          />
        </div>
        <h1 class="text-h4 font-weight-bold mb-2">Welcome Back</h1>
        <p class="text-body-2 header-subtitle">Sign in to your account to continue</p>
      </div>

      <v-card
        class="login-view__card"
        elevation="8"
      >
        <v-card-text class="pa-6">
          <LoginForm />
        </v-card-text>
      </v-card>

      <div class="login-view__footer">
        <p class="text-body-2">
          Don't have an account?
          <router-link to="/register" class="signup-link">
            Sign up
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
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 50%, #0D47A1 100%);
  padding: 24px;
  position: relative;
}

.login-view::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%);
  pointer-events: none;
}

.login-view__container {
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 1;
}

.login-view__header {
  text-align: center;
  margin-bottom: 32px;
  color: white;
}

.logo-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.header-subtitle {
  color: rgba(255, 255, 255, 0.85);
}

.login-view__card {
  border-radius: 16px;
  overflow: hidden;
}

.login-view__footer {
  text-align: center;
  margin-top: 24px;
  color: white;
}

.login-view__footer p {
  margin-bottom: 16px;
}

.signup-link {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  padding-bottom: 2px;
  transition: border-color 0.3s ease;
}

.signup-link:hover {
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
