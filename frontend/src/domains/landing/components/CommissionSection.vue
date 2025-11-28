<template>
  <section id="pricing" class="commission-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-badge">Pricing</span>
        <h2 class="section-title">Simple, Fair Commission</h2>
        <p class="section-subtitle">
          We only succeed when you do. Pay a small commission per successful delivery - no monthly fees, no hidden charges.
        </p>
      </div>

      <!-- Main Commission Display -->
      <div class="commission-showcase">
        <div class="commission-card main-card">
          <div class="commission-icon">
            <v-icon icon="mdi-currency-usd" size="64" color="white" />
          </div>
          <div class="commission-details">
            <div class="commission-label">Platform Commission</div>
            <div class="commission-percentage">
              <span class="percentage-value">{{ commission.percentage }}</span>
              <span class="percentage-symbol">%</span>
            </div>
            <div class="commission-description">per completed order</div>
          </div>

          <div class="commission-benefits">
            <div class="benefit-item">
              <v-icon icon="mdi-check-decagram" color="success" size="20" />
              <span>No setup fees</span>
            </div>
            <div class="benefit-item">
              <v-icon icon="mdi-check-decagram" color="success" size="20" />
              <span>No monthly subscription</span>
            </div>
            <div class="benefit-item">
              <v-icon icon="mdi-check-decagram" color="success" size="20" />
              <span>Only pay for successful deliveries</span>
            </div>
          </div>
        </div>
      </div>

      <!-- How It Works -->
      <div class="how-commission-works">
        <h3 class="subsection-title">How It Works</h3>
        <div class="commission-flow">
          <div class="flow-card">
            <div class="flow-number">1</div>
            <div class="flow-icon">
              <v-icon icon="mdi-package-variant" size="40" color="primary" />
            </div>
            <h4>Create Order</h4>
            <p>Set your delivery price based on distance, urgency, and package details</p>
          </div>

          <div class="flow-arrow">
            <v-icon icon="mdi-arrow-right" size="32" color="grey-lighten-1" />
          </div>

          <div class="flow-card">
            <div class="flow-number">2</div>
            <div class="flow-icon">
              <v-icon icon="mdi-truck-delivery" size="40" color="primary" />
            </div>
            <h4>Driver Delivers</h4>
            <p>Driver accepts and completes the delivery to the destination</p>
          </div>

          <div class="flow-arrow">
            <v-icon icon="mdi-arrow-right" size="32" color="grey-lighten-1" />
          </div>

          <div class="flow-card">
            <div class="flow-number">3</div>
            <div class="flow-icon">
              <v-icon icon="mdi-hand-coin" size="40" color="success" />
            </div>
            <h4>We Take Commission</h4>
            <p>{{ commission.percentage }}% platform fee is automatically deducted from the delivery price</p>
          </div>
        </div>
      </div>

      <!-- Example Calculation -->
      <div class="calculation-example">
        <h3 class="subsection-title">Example Calculation</h3>
        <div class="calculation-grid">
          <div class="calculation-card" v-for="example in examples" :key="example.orderPrice">
            <div class="example-header">
              <v-icon :icon="example.icon" :color="example.color" size="32" />
              <h4>{{ example.title }}</h4>
            </div>
            <div class="example-body">
              <div class="calculation-row">
                <span class="label">Delivery Price</span>
                <span class="value">${{ example.orderPrice.toFixed(2) }}</span>
              </div>
              <div class="calculation-row highlight">
                <span class="label">Platform Fee ({{ commission.percentage }}%)</span>
                <span class="value">-${{ example.commission.toFixed(2) }}</span>
              </div>
              <div class="calculation-row total">
                <span class="label">Driver Receives</span>
                <span class="value">${{ example.driverReceives.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Preview -->
      <div class="faq-preview">
        <h3>Frequently Asked Questions</h3>
        <div class="faq-grid">
          <div class="faq-item">
            <h4>When is the commission charged?</h4>
            <p>The commission is only charged after successful delivery completion. No payment processing or failed deliveries are charged.</p>
          </div>
          <div class="faq-item">
            <h4>Are there any other fees?</h4>
            <p>No. The {{ commission.percentage }}% commission is the only fee. No setup fees, no monthly subscriptions, no hidden charges.</p>
          </div>
          <div class="faq-item">
            <h4>How is payment processed?</h4>
            <p>Payments are processed automatically through our secure payment system. Drivers receive their earnings minus the platform commission.</p>
          </div>
          <div class="faq-item">
            <h4>Can I negotiate the commission rate?</h4>
            <p>For high-volume shippers (500+ deliveries/month), we offer custom rates. Contact our sales team for enterprise pricing.</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="commission-cta">
        <h3>Ready to Get Started?</h3>
        <p>Join thousands of businesses using our platform for reliable, commission-based deliveries</p>
        <el-button type="primary" size="large" @click="$router.push('/register')">
          Start Shipping Now
        </el-button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const commission = {
  percentage: 15 // You can adjust this percentage
}

const examples = computed(() => [
  {
    title: 'Local Delivery',
    icon: 'mdi-map-marker-distance',
    color: 'blue',
    orderPrice: 25,
    commission: (25 * commission.percentage) / 100,
    driverReceives: 25 - (25 * commission.percentage) / 100
  },
  {
    title: 'City to City',
    icon: 'mdi-city',
    color: 'purple',
    orderPrice: 75,
    commission: (75 * commission.percentage) / 100,
    driverReceives: 75 - (75 * commission.percentage) / 100
  },
  {
    title: 'Long Distance',
    icon: 'mdi-truck-fast',
    color: 'orange',
    orderPrice: 150,
    commission: (150 * commission.percentage) / 100,
    driverReceives: 150 - (150 * commission.percentage) / 100
  }
])
</script>

<style scoped>
.commission-section {
  padding: 100px 24px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
}

.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  color: #2e7d32;
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

/* Main Commission Showcase */
.commission-showcase {
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
}

.commission-card {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  padding: 48px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(25, 118, 210, 0.3);
  max-width: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.commission-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.commission-icon {
  text-align: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.commission-details {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.commission-label {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 16px;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.commission-percentage {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 8px;
}

.percentage-value {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
}

.percentage-symbol {
  font-size: 3rem;
  font-weight: 700;
  margin-left: 8px;
}

.commission-description {
  font-size: 1.125rem;
  opacity: 0.9;
}

.commission-benefits {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

/* How It Works Section */
.how-commission-works {
  margin-bottom: 80px;
}

.subsection-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #212121;
  margin-bottom: 48px;
}

.commission-flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 24px;
  align-items: center;
}

@media (max-width: 960px) {
  .commission-flow {
    grid-template-columns: 1fr;
  }

  .flow-arrow {
    transform: rotate(90deg);
    margin: 16px 0;
  }
}

.flow-card {
  background: white;
  padding: 32px 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.flow-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.flow-number {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.flow-icon {
  margin-bottom: 16px;
}

.flow-card h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 12px;
}

.flow-card p {
  font-size: 0.9rem;
  color: #757575;
  line-height: 1.6;
  margin: 0;
}

.flow-arrow {
  display: flex;
  justify-content: center;
}

/* Example Calculation */
.calculation-example {
  margin-bottom: 80px;
}

.calculation-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 960px) {
  .calculation-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
}

.calculation-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.calculation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.example-header {
  background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%);
  padding: 24px;
  text-align: center;
}

.example-header h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #212121;
  margin-top: 12px;
  margin-bottom: 0;
}

.example-body {
  padding: 24px;
}

.calculation-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.calculation-row.highlight {
  background: #fff3e0;
  margin: 0 -24px;
  padding: 12px 24px;
  border-bottom: none;
}

.calculation-row.total {
  border-bottom: none;
  margin-top: 8px;
  font-weight: 700;
  font-size: 1.125rem;
  color: #2e7d32;
}

.calculation-row .label {
  color: #757575;
  font-size: 0.9rem;
}

.calculation-row.total .label {
  color: #2e7d32;
}

.calculation-row .value {
  font-weight: 600;
  color: #212121;
  font-size: 1rem;
}

/* FAQ Preview */
.faq-preview {
  background: white;
  padding: 48px;
  border-radius: 20px;
  margin-bottom: 60px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.faq-preview h3 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #212121;
  margin-bottom: 32px;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }
}

.faq-item {
  background: #fafafa;
  padding: 24px;
  border-radius: 12px;
}

.faq-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 8px;
}

.faq-item p {
  font-size: 0.9rem;
  color: #757575;
  line-height: 1.6;
  margin: 0;
}

/* CTA Section */
.commission-cta {
  text-align: center;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(25, 118, 210, 0.3);
}

.commission-cta h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.commission-cta p {
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .commission-section {
    padding: 60px 16px;
  }

  .section-title {
    font-size: 2rem;
  }

  .commission-card {
    padding: 32px 24px;
  }

  .percentage-value {
    font-size: 4rem;
  }

  .percentage-symbol {
    font-size: 2.5rem;
  }

  .subsection-title {
    font-size: 1.5rem;
  }

  .commission-cta h3 {
    font-size: 1.5rem;
  }
}
</style>
