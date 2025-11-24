<template>
  <div class="navbar-wrapper">
    <nav class="landing-navbar" :class="{ 'navbar-scrolled': isScrolled }">
      <div class="navbar-container">
        <router-link to="/" class="navbar-brand">
          <v-icon icon="mdi-truck-fast" size="32" class="brand-icon" />
          <span class="brand-text">ShipTrack</span>
        </router-link>

        <div class="navbar-links d-none d-md-flex">
          <a href="#features" class="nav-link" @click.prevent="scrollTo('features')">Features</a>
          <a href="#how-it-works" class="nav-link" @click.prevent="scrollTo('how-it-works')">How It Works</a>
          <a href="#pricing" class="nav-link" @click.prevent="scrollTo('pricing')">Pricing</a>
          <a href="#testimonials" class="nav-link" @click.prevent="scrollTo('testimonials')">Testimonials</a>
        </div>

        <div class="navbar-actions">
          <v-btn
            variant="text"
            class="text-none d-none d-sm-flex"
            :color="isScrolled ? 'primary' : 'white'"
            to="/login"
          >
            Sign In
          </v-btn>
          <v-btn
            variant="flat"
            color="primary"
            class="text-none"
            to="/register"
          >
            Get Started
          </v-btn>

          <v-btn
            icon
            variant="text"
            class="d-md-none mobile-menu-btn"
            :color="isScrolled ? 'grey-darken-3' : 'white'"
            @click="mobileMenuOpen = true"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu - Teleported to body -->
    <Teleport to="body">
      <v-navigation-drawer
        v-model="mobileMenuOpen"
        location="right"
        temporary
        class="mobile-drawer"
      >
        <div class="drawer-header">
          <div class="d-flex align-center gap-2">
            <v-icon icon="mdi-truck-fast" size="28" color="primary" />
            <span class="text-h6 font-weight-bold">ShipTrack</span>
          </div>
          <v-btn icon variant="text" size="small" @click="mobileMenuOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-divider />
        <v-list nav class="pa-2">
          <v-list-item
            prepend-icon="mdi-home"
            title="Home"
            to="/"
            rounded="lg"
            @click="mobileMenuOpen = false"
          />
          <v-list-item
            prepend-icon="mdi-star"
            title="Features"
            rounded="lg"
            @click="scrollTo('features'); mobileMenuOpen = false"
          />
          <v-list-item
            prepend-icon="mdi-help-circle"
            title="How It Works"
            rounded="lg"
            @click="scrollTo('how-it-works'); mobileMenuOpen = false"
          />
          <v-list-item
            prepend-icon="mdi-currency-usd"
            title="Pricing"
            rounded="lg"
            @click="scrollTo('pricing'); mobileMenuOpen = false"
          />
          <v-list-item
            prepend-icon="mdi-message-quote"
            title="Testimonials"
            rounded="lg"
            @click="scrollTo('testimonials'); mobileMenuOpen = false"
          />
        </v-list>
        <v-divider class="my-2" />
        <div class="drawer-actions pa-4">
          <v-btn
            block
            variant="outlined"
            color="primary"
            class="mb-3 text-none"
            to="/login"
            @click="mobileMenuOpen = false"
          >
            <v-icon start>mdi-login</v-icon>
            Sign In
          </v-btn>
          <v-btn
            block
            color="primary"
            class="text-none"
            to="/register"
            @click="mobileMenuOpen = false"
          >
            <v-icon start>mdi-account-plus</v-icon>
            Get Started
          </v-btn>
        </div>
      </v-navigation-drawer>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar-wrapper {
  position: relative;
  z-index: 1000;
}

.landing-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  padding: 16px 0;
  transition: all 0.3s ease;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 12px 0;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 8px;
}

.brand-icon {
  color: #fff;
  transition: color 0.3s ease;
}

.navbar-scrolled .brand-icon {
  color: #1976D2;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  transition: color 0.3s ease;
}

.navbar-scrolled .brand-text {
  color: #1976D2;
}

.navbar-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  cursor: pointer;
}

.nav-link:hover {
  color: #fff;
}

.navbar-scrolled .nav-link {
  color: #424242;
}

.navbar-scrolled .nav-link:hover {
  color: #1976D2;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mobile-menu-btn {
  position: relative;
  z-index: 1002;
}
</style>

<style>
/* Global styles for mobile drawer - not scoped */
.mobile-drawer {
  z-index: 2000 !important;
}

.mobile-drawer .drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.mobile-drawer .drawer-actions {
  margin-top: auto;
}

.v-overlay--active .v-overlay__scrim {
  z-index: 1999 !important;
}
</style>
