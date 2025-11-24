<script setup>
defineProps({
  icon: {
    type: String,
    default: 'mdi-inbox-outline'
  },
  title: {
    type: String,
    default: 'No data available'
  },
  description: {
    type: String,
    default: null
  },
  actionText: {
    type: String,
    default: null
  }
})

defineEmits(['action'])
</script>

<template>
  <div class="empty-state">
    <v-icon
      :icon="icon"
      size="80"
      color="grey-lighten-1"
      class="empty-state__icon"
    />
    <h3 class="empty-state__title">{{ title }}</h3>
    <p
      v-if="description"
      class="empty-state__description"
    >
      {{ description }}
    </p>
    <v-btn
      v-if="actionText"
      color="primary"
      variant="flat"
      class="mt-4"
      @click="$emit('action')"
    >
      {{ actionText }}
    </v-btn>
    <slot />
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}

.empty-state__icon {
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state__title {
  font-size: 18px;
  font-weight: 500;
  color: #666;
  margin: 0;
}

.empty-state__description {
  font-size: 14px;
  color: #999;
  margin: 8px 0 0;
  max-width: 300px;
}
</style>
