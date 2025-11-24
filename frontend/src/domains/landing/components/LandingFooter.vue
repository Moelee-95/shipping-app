<template>
  <footer class="landing-footer">
    <!-- CTA Section -->
    <div class="footer-cta">
      <div class="cta-container">
        <div class="cta-content">
          <h2>Ready to Transform Your Shipping?</h2>
          <p>Join thousands of businesses already using ShipTrack to streamline their logistics.</p>
        </div>
        <div class="cta-actions">
          <v-btn
            color="white"
            size="x-large"
            class="text-primary text-none"
            to="/register"
          >
            Get Started Free
          </v-btn>
          <v-btn
            variant="outlined"
            color="white"
            size="x-large"
            class="text-none"
            href="mailto:sales@shiptrack.com"
          >
            Contact Sales
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="footer-main">
      <div class="footer-container">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div class="footer-brand">
            <div class="brand-logo">
              <v-icon icon="mdi-truck-fast" size="32" color="primary" />
              <span>ShipTrack</span>
            </div>
            <p class="brand-description">
              Connecting shipping companies with professional drivers for fast, reliable deliveries.
            </p>
            <div class="social-links">
              <v-btn icon variant="text" size="small">
                <v-icon icon="mdi-facebook" />
              </v-btn>
              <v-btn icon variant="text" size="small">
                <v-icon icon="mdi-twitter" />
              </v-btn>
              <v-btn icon variant="text" size="small">
                <v-icon icon="mdi-linkedin" />
              </v-btn>
              <v-btn icon variant="text" size="small">
                <v-icon icon="mdi-instagram" />
              </v-btn>
            </div>
          </div>

          <!-- Product Column -->
          <div class="footer-column">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><router-link to="/login">Sign In</router-link></li>
              <li><router-link to="/register">Get Started</router-link></li>
            </ul>
          </div>

          <!-- Company Column -->
          <div class="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>

          <!-- Resources Column -->
          <div class="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>

          <!-- Contact Column -->
          <div class="footer-column">
            <h4>Contact</h4>
            <ul class="contact-list">
              <li>
                <v-icon icon="mdi-email" size="18" />
                <a href="mailto:support@shiptrack.com">support@shiptrack.com</a>
              </li>
              <li>
                <v-icon icon="mdi-phone" size="18" />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li>
                <v-icon icon="mdi-map-marker" size="18" />
                <span>123 Shipping Lane<br>San Francisco, CA 94102</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- App Download -->
        <div class="app-download">
          <span>Download our app:</span>
          <div class="app-buttons">
            <v-btn variant="outlined" class="app-btn">
              <v-icon icon="mdi-apple" size="24" class="mr-2" />
              <div class="app-btn-text">
                <small>Download on</small>
                <span>App Store</span>
              </div>
            </v-btn>
            <v-btn variant="outlined" class="app-btn">
              <v-icon icon="mdi-google-play" size="24" class="mr-2" />
              <div class="app-btn-text">
                <small>Get it on</small>
                <span>Google Play</span>
              </div>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="footer-container">
        <p>&copy; {{ currentYear }} ShipTrack. All rights reserved.</p>
        <div class="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.landing-footer {
  background: #fff;
}

/* CTA Section */
.footer-cta {
  background: linear-gradient(135deg, #1976D2 0%, #0D47A1 100%);
  padding: 80px 24px;
}

.cta-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

@media (max-width: 768px) {
  .cta-container {
    flex-direction: column;
    text-align: center;
  }
}

.cta-content h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}

.cta-content p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.cta-actions {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .cta-actions {
    flex-direction: column;
    width: 100%;
  }
}

/* Main Footer */
.footer-main {
  padding: 80px 24px 40px;
  background: #fafafa;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 60px;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .footer-brand {
    grid-column: span 3;
    max-width: 400px;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .footer-brand {
    grid-column: span 2;
  }
}

/* Brand Column */
.footer-brand {
  padding-right: 40px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.brand-logo span {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212121;
}

.brand-description {
  color: #757575;
  line-height: 1.7;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  gap: 4px;
}

/* Footer Columns */
.footer-column h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 20px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 12px;
}

.footer-column a {
  color: #757575;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.footer-column a:hover {
  color: #1976D2;
}

/* Contact List */
.contact-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #757575;
  font-size: 0.95rem;
}

.contact-list a {
  color: #757575;
  text-decoration: none;
}

.contact-list a:hover {
  color: #1976D2;
}

/* App Download */
.app-download {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-top: 40px;
  border-top: 1px solid #e0e0e0;
  flex-wrap: wrap;
}

.app-download span {
  color: #757575;
  font-weight: 500;
}

.app-buttons {
  display: flex;
  gap: 12px;
}

.app-btn {
  padding: 8px 16px;
  height: auto;
}

.app-btn-text {
  text-align: left;
  line-height: 1.2;
}

.app-btn-text small {
  display: block;
  font-size: 0.65rem;
  text-transform: uppercase;
  opacity: 0.7;
}

.app-btn-text span {
  font-size: 0.95rem;
  font-weight: 600;
}

/* Bottom Bar */
.footer-bottom {
  background: #212121;
  padding: 20px 24px;
}

.footer-bottom .footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 0.9rem;
}

.legal-links {
  display: flex;
  gap: 24px;
}

.legal-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.legal-links a:hover {
  color: #fff;
}

@media (max-width: 600px) {
  .footer-bottom .footer-container {
    justify-content: center;
    text-align: center;
  }

  .legal-links {
    gap: 16px;
  }
}
</style>
