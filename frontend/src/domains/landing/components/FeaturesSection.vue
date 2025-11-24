<template>
  <section id="features" class="features-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-badge">Features</span>
        <h2 class="section-title">Everything You Need to Succeed</h2>
        <p class="section-subtitle">
          Powerful tools for shipping companies and drivers to streamline logistics operations
        </p>
      </div>

      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="feature-icon" :style="{ background: feature.gradient }">
            <v-icon :icon="feature.icon" size="28" color="white" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <ul class="feature-list">
            <li v-for="item in feature.items" :key="item">
              <v-icon icon="mdi-check-circle" size="16" color="success" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Feature Highlight -->
      <div class="feature-highlight">
        <div class="highlight-content">
          <span class="highlight-badge">For Shipping Companies</span>
          <h3 class="highlight-title">Manage Your Fleet Effortlessly</h3>
          <p class="highlight-text">
            Create orders in seconds, track deliveries in real-time, and analyze your business performance with detailed analytics.
          </p>
          <div class="highlight-stats">
            <div class="highlight-stat">
              <v-icon icon="mdi-clock-fast" color="primary" />
              <div>
                <span class="stat-value">50%</span>
                <span class="stat-label">Faster Processing</span>
              </div>
            </div>
            <div class="highlight-stat">
              <v-icon icon="mdi-chart-line" color="success" />
              <div>
                <span class="stat-value">30%</span>
                <span class="stat-label">Cost Reduction</span>
              </div>
            </div>
          </div>
          <v-btn color="primary" size="large" class="text-none mt-4" to="/register">
            Start Managing Orders
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <div class="highlight-visual">
          <div class="highlight-card">
            <div class="card-header">
              <v-icon icon="mdi-view-dashboard" color="primary" />
              <span>Company Dashboard</span>
            </div>
            <div class="card-body">
              <div class="mini-stat">
                <span class="mini-label">Today's Orders</span>
                <span class="mini-value">24</span>
              </div>
              <div class="mini-stat">
                <span class="mini-label">In Transit</span>
                <span class="mini-value">12</span>
              </div>
              <div class="mini-stat">
                <span class="mini-label">Delivered</span>
                <span class="mini-value">156</span>
              </div>
              <div class="mini-chart">
                <div class="chart-bar" style="height: 60%"></div>
                <div class="chart-bar" style="height: 80%"></div>
                <div class="chart-bar" style="height: 45%"></div>
                <div class="chart-bar" style="height: 90%"></div>
                <div class="chart-bar" style="height: 70%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: 'mdi-truck-fast',
    title: 'Real-Time Tracking',
    description: 'Monitor every package from pickup to delivery with live GPS tracking.',
    gradient: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
    items: ['Live location updates', 'ETA predictions', 'Route optimization']
  },
  {
    icon: 'mdi-shield-check',
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security to protect your shipments and data.',
    gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
    items: ['End-to-end encryption', 'Verified drivers', 'Insurance coverage']
  },
  {
    icon: 'mdi-lightning-bolt',
    title: 'Quick Order Creation',
    description: 'Create and dispatch orders in under 60 seconds with our smart forms.',
    gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
    items: ['One-click ordering', 'Bulk uploads', 'Template support']
  },
  {
    icon: 'mdi-chart-box',
    title: 'Analytics Dashboard',
    description: 'Gain insights into your shipping operations with detailed reports.',
    gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
    items: ['Performance metrics', 'Cost analysis', 'Trend reports']
  },
  {
    icon: 'mdi-account-group',
    title: 'Driver Network',
    description: 'Access our verified network of professional drivers instantly.',
    gradient: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
    items: ['Verified profiles', 'Rating system', 'Instant matching']
  },
  {
    icon: 'mdi-cellphone',
    title: 'Mobile Ready',
    description: 'Manage everything on the go with our responsive web application.',
    gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
    items: ['Responsive design', 'Push notifications', 'Offline support']
  }
]
</script>

<style scoped>
.features-section {
  padding: 100px 24px;
  background: #fafafa;
}

.section-container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;
}

.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1976D2;
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 80px;
}

@media (max-width: 960px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out both;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 12px;
}

.feature-description {
  color: #757575;
  line-height: 1.6;
  margin-bottom: 16px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #424242;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

/* Feature Highlight */
.feature-highlight {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  background: #fff;
  padding: 60px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

@media (max-width: 960px) {
  .feature-highlight {
    grid-template-columns: 1fr;
    padding: 40px;
  }
}

.highlight-badge {
  display: inline-block;
  background: #e3f2fd;
  color: #1976D2;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.highlight-title {
  font-size: 2rem;
  font-weight: 700;
  color: #212121;
  margin-bottom: 16px;
}

.highlight-text {
  color: #757575;
  line-height: 1.7;
  margin-bottom: 24px;
}

.highlight-stats {
  display: flex;
  gap: 32px;
}

.highlight-stat {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #212121;
}

.stat-label {
  font-size: 0.85rem;
  color: #757575;
}

/* Highlight Visual */
.highlight-visual {
  display: flex;
  justify-content: center;
}

.highlight-card {
  background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%);
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  font-weight: 600;
  color: #424242;
}

.card-body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.mini-stat {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
}

.mini-label {
  display: block;
  font-size: 0.75rem;
  color: #757575;
  margin-bottom: 4px;
}

.mini-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976D2;
}

.mini-chart {
  grid-column: span 3;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100px;
}

.chart-bar {
  width: 30px;
  background: linear-gradient(180deg, #1976D2 0%, #42A5F5 100%);
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}
</style>
