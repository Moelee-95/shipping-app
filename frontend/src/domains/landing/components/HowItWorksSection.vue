<template>
  <section id="how-it-works" class="how-it-works-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-badge">How It Works</span>
        <h2 class="section-title">Start Shipping in 3 Simple Steps</h2>
        <p class="section-subtitle">
          Whether you're a shipping company or a driver, getting started is quick and easy
        </p>
      </div>

      <!-- Role Toggle -->
      <div class="role-toggle">
        <v-btn-toggle v-model="selectedRole" mandatory color="primary" rounded="pill">
          <v-btn value="company" class="text-none px-6">
            <v-icon start>mdi-domain</v-icon>
            Shipping Company
          </v-btn>
          <v-btn value="driver" class="text-none px-6">
            <v-icon start>mdi-truck</v-icon>
            Driver
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Steps -->
      <div class="steps-container">
        <div class="steps-line"></div>

        <div
          v-for="(step, index) in currentSteps"
          :key="step.title"
          class="step-card"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-icon">
            <v-icon :icon="step.icon" size="40" color="primary" />
          </div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-container">
        <v-btn
          color="primary"
          size="x-large"
          class="text-none"
          to="/register"
        >
          {{ selectedRole === 'company' ? 'Create Company Account' : 'Become a Driver' }}
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
        <p class="cta-note">Free to sign up. No credit card required.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedRole = ref('company')

const companySteps = [
  {
    icon: 'mdi-account-plus',
    title: 'Create Your Account',
    description: 'Sign up in less than 2 minutes with your company details. Get instant access to your dashboard.'
  },
  {
    icon: 'mdi-package-variant-plus',
    title: 'Post Your Orders',
    description: 'Create shipping orders with pickup and delivery details. Set your budget and delivery timeline.'
  },
  {
    icon: 'mdi-chart-timeline-variant',
    title: 'Track & Manage',
    description: 'Monitor all your shipments in real-time. Get notified at every step of the delivery process.'
  }
]

const driverSteps = [
  {
    icon: 'mdi-account-check',
    title: 'Register & Verify',
    description: 'Create your driver profile and complete the verification process. Add your vehicle details.'
  },
  {
    icon: 'mdi-magnify',
    title: 'Browse Available Orders',
    description: 'View nearby shipping orders that match your route. Filter by location, price, and package type.'
  },
  {
    icon: 'mdi-cash-multiple',
    title: 'Deliver & Earn',
    description: 'Accept orders, make deliveries, and get paid. Build your reputation with customer ratings.'
  }
]

const currentSteps = computed(() =>
  selectedRole.value === 'company' ? companySteps : driverSteps
)
</script>

<style scoped>
.how-it-works-section {
  padding: 100px 24px;
  background: #fff;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 48px;
}

.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  color: #388E3C;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212121;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #757575;
  line-height: 1.7;
}

.role-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  position: relative;
  margin-bottom: 60px;
}

@media (max-width: 768px) {
  .steps-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .steps-line {
    display: none;
  }
}

.steps-line {
  position: absolute;
  top: 80px;
  left: 15%;
  right: 15%;
  height: 3px;
  background: linear-gradient(90deg, #1976D2 0%, #42A5F5 50%, #1976D2 100%);
  border-radius: 2px;
}

.step-card {
  text-align: center;
  position: relative;
  animation: fadeIn 0.6s ease-out both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-number {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  z-index: 1;
}

.step-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  position: relative;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 12px;
}

.step-description {
  color: #757575;
  line-height: 1.6;
  max-width: 280px;
  margin: 0 auto;
}

.cta-container {
  text-align: center;
}

.cta-note {
  margin-top: 16px;
  color: #9e9e9e;
  font-size: 0.9rem;
}
</style>
