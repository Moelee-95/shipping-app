<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app class="app-root">
    <RouterView />
  </v-app>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

html {
  overflow-y: scroll;
}

#app {
  min-height: 100vh;
}

.app-root {
  min-height: 100vh;
  background: transparent !important;
}

.app-root .v-application__wrap {
  min-height: 100vh;
  background: transparent !important;
}

/* Override Vuetify's default white background */
.v-application {
  background: transparent !important;
}

.v-theme--light {
  --v-theme-background: transparent !important;
}

/* Ensure v-main allows scrolling */
.v-main {
  overflow-y: auto;
}
</style>
