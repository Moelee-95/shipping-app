<script setup>
defineProps({
  variant: {
    type: String,
    default: 'flat',
    validator: (v) => ['flat', 'outlined', 'text', 'elevated', 'tonal', 'plain'].includes(v)
  },
  color: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'default',
    validator: (v) => ['x-small', 'small', 'default', 'large', 'x-large'].includes(v)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: null
  },
  prependIcon: {
    type: String,
    default: null
  },
  appendIcon: {
    type: String,
    default: null
  }
})

defineEmits(['click'])
</script>

<template>
  <v-btn
    :variant="variant"
    :color="color"
    :size="size"
    :loading="loading"
    :disabled="disabled || loading"
    :block="block"
    :icon="icon"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    @click="$emit('click', $event)"
  >
    <slot />
  </v-btn>
</template>
