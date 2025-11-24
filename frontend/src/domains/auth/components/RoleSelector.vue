<script setup>
import { ROLE_OPTIONS } from '@/shared/utils/constants'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const selectRole = (role) => {
  emit('update:modelValue', role)
}
</script>

<template>
  <div class="role-selector">
    <label class="role-selector__label">Select your role</label>
    <div class="role-selector__options">
      <v-card
        v-for="option in ROLE_OPTIONS"
        :key="option.value"
        :class="{
          'role-selector__card': true,
          'role-selector__card--selected': modelValue === option.value
        }"
        @click="selectRole(option.value)"
        variant="outlined"
        hover
      >
        <v-card-text class="text-center pa-3">
          <v-icon
            :icon="option.icon"
            size="36"
            :color="modelValue === option.value ? 'primary' : 'grey'"
            class="mb-1"
          />
          <h4 class="text-subtitle-1 font-weight-medium mb-0">{{ option.label }}</h4>
          <p class="text-caption text-grey mb-0">{{ option.description }}</p>
        </v-card-text>
      </v-card>
    </div>
    <div
      v-if="error"
      class="role-selector__error"
    >
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.role-selector__label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}

.role-selector__options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.role-selector__card {
  cursor: pointer;
  transition: all 0.2s ease;
}

.role-selector__card--selected {
  border-color: rgb(var(--v-theme-primary));
  border-width: 2px;
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.role-selector__error {
  color: rgb(var(--v-theme-error));
  font-size: 12px;
  margin-top: 8px;
}

@media (max-width: 480px) {
  .role-selector__options {
    grid-template-columns: 1fr;
  }
}
</style>
