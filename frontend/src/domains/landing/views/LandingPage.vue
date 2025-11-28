<template>
  <div class="landing-page">
    <LandingNavbar />
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <CommissionSection />
    <!-- <PricingSection /> -->
    <LandingFooter />
  </div>
</template>

<script setup>
import LandingNavbar from '../components/LandingNavbar.vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import HowItWorksSection from '../components/HowItWorksSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import CommissionSection from '../components/CommissionSection.vue'
// import PricingSection from '../components/PricingSection.vue'
import LandingFooter from '../components/LandingFooter.vue'
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
}
</style>
