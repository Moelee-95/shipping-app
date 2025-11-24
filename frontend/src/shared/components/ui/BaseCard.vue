<script setup>
defineProps({
  title: {
    type: String,
    default: null
  },
  subtitle: {
    type: String,
    default: null
  },
  elevation: {
    type: [Number, String],
    default: 2
  },
  loading: {
    type: Boolean,
    default: false
  },
  hover: {
    type: Boolean,
    default: false
  },
  flat: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <v-card
    :elevation="flat ? 0 : elevation"
    :loading="loading"
    :hover="hover"
    :flat="flat"
    class="base-card"
  >
    <v-card-title
      v-if="title || $slots.title"
      class="base-card__title"
    >
      <slot name="title">{{ title }}</slot>
    </v-card-title>

    <v-card-subtitle
      v-if="subtitle || $slots.subtitle"
      class="base-card__subtitle"
    >
      <slot name="subtitle">{{ subtitle }}</slot>
    </v-card-subtitle>

    <v-card-text
      v-if="$slots.default"
      class="base-card__content"
    >
      <slot />
    </v-card-text>

    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.base-card {
  border-radius: 8px;
}

.base-card__title {
  font-weight: 600;
}
</style>
