<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 40
  },
  color: {
    type: String,
    default: 'primary'
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  overlay: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div
    :class="{
      'loading-spinner': true,
      'loading-spinner--fullscreen': fullscreen,
      'loading-spinner--overlay': overlay
    }"
  >
    <v-progress-circular
      :size="size"
      :color="color"
      indeterminate
    />
    <span
      v-if="text"
      class="loading-spinner__text"
    >
      {{ text }}
    </span>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
}

.loading-spinner--fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.9);
}

.loading-spinner--overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
}

.loading-spinner__text {
  font-size: 14px;
  color: #666;
}
</style>
