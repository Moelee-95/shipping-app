<template>
  <section id="testimonials" class="testimonials-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-badge">Testimonials</span>
        <h2 class="section-title">Trusted by Thousands</h2>
        <p class="section-subtitle">
          See what our customers and drivers have to say about ShipTrack
        </p>
      </div>

      <div class="testimonials-grid">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonial-card"
          :class="{ 'featured': testimonial.featured }"
        >
          <div class="testimonial-quote">
            <v-icon icon="mdi-format-quote-open" size="32" color="primary" class="quote-icon" />
            <p>{{ testimonial.quote }}</p>
          </div>

          <div class="testimonial-rating">
            <v-icon
              v-for="star in 5"
              :key="star"
              :icon="star <= testimonial.rating ? 'mdi-star' : 'mdi-star-outline'"
              size="20"
              :color="star <= testimonial.rating ? 'amber' : 'grey-lighten-1'"
            />
          </div>

          <div class="testimonial-author">
            <v-avatar :color="testimonial.avatarColor" size="48">
              <span class="text-white font-weight-bold">{{ testimonial.initials }}</span>
            </v-avatar>
            <div class="author-info">
              <span class="author-name">{{ testimonial.name }}</span>
              <span class="author-role">{{ testimonial.role }}</span>
            </div>
            <v-chip
              :color="testimonial.type === 'company' ? 'primary' : 'success'"
              size="small"
              variant="tonal"
              class="ml-auto"
            >
              {{ testimonial.type === 'company' ? 'Company' : 'Driver' }}
            </v-chip>
          </div>
        </div>
      </div>

      <!-- Stats Bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <v-icon icon="mdi-star" size="28" color="amber" />
          <div class="stat-content">
            <span class="stat-value">4.9/5</span>
            <span class="stat-label">Average Rating</span>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <v-icon icon="mdi-account-group" size="28" color="primary" />
          <div class="stat-content">
            <span class="stat-value">10,000+</span>
            <span class="stat-label">Happy Customers</span>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <v-icon icon="mdi-truck-check" size="28" color="success" />
          <div class="stat-content">
            <span class="stat-value">50,000+</span>
            <span class="stat-label">Deliveries Completed</span>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <v-icon icon="mdi-map-marker-radius" size="28" color="info" />
          <div class="stat-content">
            <span class="stat-value">100+</span>
            <span class="stat-label">Cities Covered</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    quote: "ShipTrack has revolutionized how we handle logistics. Our delivery times improved by 40% and customer complaints dropped significantly.",
    name: "Sarah Johnson",
    role: "Operations Manager, FastShip Co.",
    initials: "SJ",
    avatarColor: "#1976D2",
    rating: 5,
    type: "company",
    featured: true
  },
  {
    quote: "As a driver, I love the flexibility. I can choose orders that fit my schedule and the payment is always on time. Great platform!",
    name: "Michael Chen",
    role: "Independent Driver",
    initials: "MC",
    avatarColor: "#4CAF50",
    rating: 5,
    type: "driver"
  },
  {
    quote: "The real-time tracking feature is a game-changer. Our clients love being able to see exactly where their packages are.",
    name: "Emily Rodriguez",
    role: "CEO, QuickDeliver",
    initials: "ER",
    avatarColor: "#9C27B0",
    rating: 5,
    type: "company"
  },
  {
    quote: "I've tried other platforms but ShipTrack is by far the best. The interface is intuitive and finding orders in my area is super easy.",
    name: "David Kim",
    role: "Fleet Driver",
    initials: "DK",
    avatarColor: "#FF9800",
    rating: 4,
    type: "driver"
  },
  {
    quote: "Setting up our company account was seamless. Within a day, we were managing all our shipments through ShipTrack.",
    name: "Lisa Thompson",
    role: "Logistics Director, MegaCorp",
    initials: "LT",
    avatarColor: "#E91E63",
    rating: 5,
    type: "company"
  },
  {
    quote: "The earning potential is great! I've been able to grow my delivery business significantly since joining ShipTrack.",
    name: "Robert Martinez",
    role: "Owner-Operator",
    initials: "RM",
    avatarColor: "#00BCD4",
    rating: 5,
    type: "driver"
  }
]
</script>

<style scoped>
.testimonials-section {
  padding: 100px 24px;
  background: linear-gradient(180deg, #fafafa 0%, #fff 100%);
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
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  color: #E65100;
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

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 60px;
}

@media (max-width: 1024px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

.testimonial-card {
  background: #fff;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.testimonial-card.featured {
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
  color: #fff;
}

.testimonial-card.featured .testimonial-quote p,
.testimonial-card.featured .author-name {
  color: #fff;
}

.testimonial-card.featured .author-role {
  color: rgba(255, 255, 255, 0.8);
}

.testimonial-card.featured .quote-icon {
  color: rgba(255, 255, 255, 0.5) !important;
}

.testimonial-quote {
  flex: 1;
  margin-bottom: 20px;
}

.quote-icon {
  opacity: 0.3;
  margin-bottom: 8px;
}

.testimonial-quote p {
  font-size: 1rem;
  line-height: 1.7;
  color: #424242;
}

.testimonial-rating {
  margin-bottom: 20px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.testimonial-card.featured .testimonial-author {
  border-top-color: rgba(255, 255, 255, 0.2);
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: #212121;
}

.author-role {
  font-size: 0.85rem;
  color: #757575;
}

/* Stats Bar */
.stats-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .stats-bar {
    gap: 24px;
    padding: 32px 24px;
  }

  .stat-divider {
    display: none;
  }
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212121;
}

.stat-label {
  font-size: 0.85rem;
  color: #757575;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: #e0e0e0;
}
</style>
