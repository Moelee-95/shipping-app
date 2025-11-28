<template>
  <section id="pricing" class="pricing-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-badge">Pricing</span>
        <h2 class="section-title">Simple, Transparent Pricing</h2>
        <p class="section-subtitle">
          Choose the plan that fits your business. No hidden fees, cancel anytime.
        </p>
      </div>

      <!-- COMMENTED OUT: Old subscription-based pricing model -->
      <!--
      Billing Toggle
      <div class="billing-toggle">
        <span :class="{ active: !isYearly }">Monthly</span>
        <v-switch
          v-model="isYearly"
          color="primary"
          hide-details
          inset
        />
        <span :class="{ active: isYearly }">
          Yearly
          <v-chip color="success" size="x-small" class="ml-1">Save 20%</v-chip>
        </span>
      </div>

      <div class="pricing-grid">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="pricing-card"
          :class="{ popular: plan.popular }"
        >
          <div v-if="plan.popular" class="popular-badge">Most Popular</div>

          <div class="plan-header">
            <h3 class="plan-name">{{ plan.name }}</h3>
            <p class="plan-description">{{ plan.description }}</p>
          </div>

          <div class="plan-price">
            <span class="currency">$</span>
            <span class="amount">{{ isYearly ? plan.yearlyPrice : plan.monthlyPrice }}</span>
            <span class="period">/{{ isYearly ? 'year' : 'month' }}</span>
          </div>

          <v-btn
            :color="plan.popular ? 'white' : 'primary'"
            :variant="plan.popular ? 'flat' : 'outlined'"
            :class="{ 'text-primary': plan.popular }"
            size="large"
            block
            class="text-none mb-6"
            to="/register"
          >
            {{ plan.cta }}
          </v-btn>

          <ul class="plan-features">
            <li v-for="feature in plan.features" :key="feature">
              <v-icon icon="mdi-check-circle" size="18" color="success" />
              {{ feature }}
            </li>
          </ul>

          <div v-if="plan.limitations" class="plan-limitations">
            <li v-for="limitation in plan.limitations" :key="limitation">
              <v-icon icon="mdi-close-circle" size="18" color="grey" />
              {{ limitation }}
            </li>
          </div>
        </div>
      </div>
      -->

      <!-- FAQ Preview -->
      <div class="faq-preview">
        <h3>Frequently Asked Questions</h3>
        <div class="faq-grid">
          <div class="faq-item">
            <h4>Can I change plans later?</h4>
            <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.</p>
          </div>
          <div class="faq-item">
            <h4>Is there a free trial?</h4>
            <p>Our Starter plan is completely free with essential features. Try it before upgrading to a paid plan.</p>
          </div>
          <div class="faq-item">
            <h4>What payment methods do you accept?</h4>
            <p>We accept all major credit cards, PayPal, and bank transfers for enterprise customers.</p>
          </div>
          <div class="faq-item">
            <h4>Do you offer refunds?</h4>
            <p>Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// import { ref } from 'vue'

// COMMENTED OUT: Old subscription-based pricing plans
/*
const isYearly = ref(false)

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses just getting started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: 'Get Started Free',
    features: [
      'Up to 50 orders/month',
      'Basic real-time tracking',
      'Email support',
      'Standard reports',
      'Mobile app access'
    ],
    limitations: [
      'Limited analytics',
      'No API access'
    ]
  },
  {
    name: 'Professional',
    description: 'For growing businesses with higher volume',
    monthlyPrice: 49,
    yearlyPrice: 470,
    cta: 'Start Free Trial',
    popular: true,
    features: [
      'Up to 500 orders/month',
      'Advanced real-time tracking',
      'Priority email & chat support',
      'Advanced analytics dashboard',
      'API access',
      'Custom branding',
      'Team collaboration (5 users)'
    ]
  },
  {
    name: 'Enterprise',
    description: 'For large operations with custom needs',
    monthlyPrice: 149,
    yearlyPrice: 1430,
    cta: 'Contact Sales',
    features: [
      'Unlimited orders',
      'Premium tracking & ETA',
      '24/7 phone & chat support',
      'Custom analytics & reports',
      'Full API access',
      'White-label solution',
      'Unlimited team members',
      'Dedicated account manager',
      'Custom integrations'
    ]
  }
]
*/
</script>

<style scoped>
.pricing-section {
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
  margin: 0 auto 40px;
}

.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%);
  color: #7B1FA2;
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

.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 48px;
  font-weight: 500;
  color: #757575;
}

.billing-toggle .active {
  color: #212121;
  font-weight: 600;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 80px;
}

@media (max-width: 960px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto 80px;
  }
}

.pricing-card {
  background: #fff;
  padding: 32px;
  border-radius: 20px;
  border: 2px solid #e0e0e0;
  position: relative;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  border-color: #1976D2;
  transform: translateY(-4px);
}

.pricing-card.popular {
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
  border-color: transparent;
  color: #fff;
  transform: scale(1.05);
}

.pricing-card.popular:hover {
  transform: scale(1.05) translateY(-4px);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
  color: #fff;
  padding: 6px 20px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.plan-header {
  margin-bottom: 24px;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.plan-description {
  font-size: 0.9rem;
  opacity: 0.8;
}

.pricing-card:not(.popular) .plan-description {
  color: #757575;
}

.plan-price {
  margin-bottom: 24px;
}

.currency {
  font-size: 1.5rem;
  font-weight: 600;
  vertical-align: top;
}

.amount {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
}

.period {
  font-size: 1rem;
  opacity: 0.7;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.plan-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  font-size: 0.95rem;
}

.pricing-card:not(.popular) .plan-features li {
  color: #424242;
}

.plan-limitations {
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 10px;
  margin-top: 10px;
}

.pricing-card.popular .plan-limitations {
  border-top-color: rgba(255, 255, 255, 0.2);
}

.plan-limitations li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 0.9rem;
  opacity: 0.7;
}

/* FAQ Preview */
.faq-preview {
  background: #fafafa;
  padding: 48px;
  border-radius: 20px;
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
  background: #fff;
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
</style>
