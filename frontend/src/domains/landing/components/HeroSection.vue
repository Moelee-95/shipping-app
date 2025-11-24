<template>
  <section class="hero-section">
    <div class="hero-background">
      <div class="hero-gradient"></div>
      <div class="hero-pattern"></div>
    </div>

    <div class="hero-content">
      <div class="hero-text animate-fade-in">
        <div class="hero-badge">
          <v-icon icon="mdi-lightning-bolt" size="small" />
          <span>Fast & Reliable Shipping</span>
        </div>

        <h1 class="hero-title">
          Deliver Packages
          <span class="text-gradient">Faster Than Ever</span>
        </h1>

        <p class="hero-subtitle">
          Connect shipping companies with professional drivers.
          Track deliveries in real-time, manage orders efficiently,
          and grow your logistics business.
        </p>

        <div class="hero-actions">
          <v-btn
            size="x-large"
            color="white"
            class="text-primary text-none hero-btn-primary"
            to="/register"
          >
            Start Shipping Free
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn
            size="x-large"
            variant="outlined"
            color="white"
            class="text-none hero-btn-secondary"
            @click="scrollToFeatures"
          >
            <v-icon start>mdi-play-circle</v-icon>
            See How It Works
          </v-btn>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">10K+</span>
            <span class="stat-label">Deliveries</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">500+</span>
            <span class="stat-label">Active Drivers</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">99%</span>
            <span class="stat-label">On-Time Rate</span>
          </div>
        </div>
      </div>

      <div class="hero-visual animate-slide-up">
        <div class="hero-card-container">
          <!-- Floating Cards -->
          <div class="floating-card card-1">
            <v-icon icon="mdi-package-variant-closed" color="primary" size="24" />
            <div>
              <div class="card-title">Package Picked Up</div>
              <div class="card-subtitle">Order #1234</div>
            </div>
          </div>

          <div class="floating-card card-2">
            <v-icon icon="mdi-truck-delivery" color="success" size="24" />
            <div>
              <div class="card-title">In Transit</div>
              <div class="card-subtitle">ETA: 2 hours</div>
            </div>
          </div>

          <div class="floating-card card-3">
            <v-icon icon="mdi-map-marker-check" color="info" size="24" />
            <div>
              <div class="card-title">Delivered!</div>
              <div class="card-subtitle">5 mins ago</div>
            </div>
          </div>

          <!-- Main Dashboard Preview -->
          <div class="dashboard-preview">
            <div class="preview-header">
              <div class="preview-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span class="preview-title">Dashboard</span>
            </div>
            <div class="preview-content">
              <div class="preview-stat-row">
                <div class="preview-stat">
                  <v-icon icon="mdi-package" size="20" color="primary" />
                  <span>24 Active</span>
                </div>
                <div class="preview-stat">
                  <v-icon icon="mdi-check-circle" size="20" color="success" />
                  <span>156 Delivered</span>
                </div>
              </div>
              <div class="preview-map">
                <v-icon icon="mdi-map" size="48" color="grey-lighten-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator" @click="scrollToFeatures">
      <v-icon icon="mdi-chevron-down" size="32" class="bounce" />
    </div>
  </section>
</template>

<script setup>
const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 100px 24px 60px;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 50%, #0D47A1 100%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%),
    radial-gradient(circle at 40% 80%, rgba(255,255,255,0.05) 0%, transparent 30%);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

@media (max-width: 960px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.hero-text {
  color: #fff;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2.5rem;
  }
}

.text-gradient {
  display: block;
  background: linear-gradient(90deg, #fff 0%, #82B1FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.7;
  opacity: 0.9;
  margin-bottom: 32px;
  max-width: 500px;
}

@media (max-width: 960px) {
  .hero-subtitle {
    margin: 0 auto 32px;
  }
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

@media (max-width: 960px) {
  .hero-actions {
    justify-content: center;
  }
}

.hero-btn-primary {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.hero-btn-secondary {
  border-width: 2px;
}

.hero-stats {
  display: flex;
  gap: 32px;
  align-items: center;
}

@media (max-width: 960px) {
  .hero-stats {
    justify-content: center;
  }
}

@media (max-width: 500px) {
  .hero-stats {
    flex-direction: column;
    gap: 16px;
  }

  .stat-divider {
    display: none;
  }
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

/* Hero Visual */
.hero-visual {
  position: relative;
}

@media (max-width: 960px) {
  .hero-visual {
    display: none;
  }
}

.hero-card-container {
  position: relative;
  height: 500px;
}

.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  top: 20px;
  left: 0;
  animation-delay: 0s;
}

.card-2 {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  animation-delay: -2s;
}

.card-3 {
  bottom: 40px;
  left: 40px;
  animation-delay: -4s;
}

.card-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #212121;
}

.card-subtitle {
  font-size: 0.8rem;
  color: #757575;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.card-2 {
  animation: float2 6s ease-in-out infinite;
}

@keyframes float2 {
  0%, 100% { transform: translateY(-50%); }
  50% { transform: translateY(calc(-50% - 10px)); }
}

/* Dashboard Preview */
.dashboard-preview {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.preview-header {
  background: #f5f5f5;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.preview-dots {
  display: flex;
  gap: 6px;
}

.preview-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e0e0e0;
}

.preview-dots span:nth-child(1) { background: #FF5F56; }
.preview-dots span:nth-child(2) { background: #FFBD2E; }
.preview-dots span:nth-child(3) { background: #27CA40; }

.preview-title {
  font-size: 0.8rem;
  color: #757575;
  font-weight: 500;
}

.preview-content {
  padding: 20px;
}

.preview-stat-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.preview-stat {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #424242;
}

.preview-map {
  height: 120px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: color 0.3s ease;
}

.scroll-indicator:hover {
  color: #fff;
}

.bounce {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(10px); }
  60% { transform: translateY(5px); }
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out 0.3s both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
