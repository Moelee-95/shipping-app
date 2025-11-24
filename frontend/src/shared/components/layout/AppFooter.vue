<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <v-footer
    app
    color="grey-lighten-4"
    class="app-footer"
  >
    <div class="app-footer__content">
      <span class="text-grey-darken-1">
        &copy; {{ currentYear }} ShipTrack. All rights reserved.
      </span>
      <div class="app-footer__links">
        <a
          href="#"
          class="text-grey-darken-1 text-decoration-none mx-2"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          class="text-grey-darken-1 text-decoration-none mx-2"
        >
          Terms of Service
        </a>
        <a
          href="#"
          class="text-grey-darken-1 text-decoration-none mx-2"
        >
          Contact
        </a>
      </div>
    </div>
  </v-footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid #e0e0e0;
  padding: 16px 24px;
}

.app-footer__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 13px;
}

.app-footer__links a:hover {
  text-decoration: underline !important;
}

@media (max-width: 600px) {
  .app-footer__content {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
