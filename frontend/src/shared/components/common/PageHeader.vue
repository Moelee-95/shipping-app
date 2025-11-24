<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: null
  },
  backRoute: {
    type: [String, Object],
    default: null
  }
})
</script>

<template>
  <div class="page-header">
    <div class="page-header__left">
      <v-btn
        v-if="backRoute"
        icon
        variant="text"
        size="small"
        class="mr-2"
        :to="backRoute"
      >
        <v-icon icon="mdi-arrow-left" />
      </v-btn>
      <div>
        <h1 class="page-header__title">{{ title }}</h1>
        <p
          v-if="subtitle"
          class="page-header__subtitle"
        >
          {{ subtitle }}
        </p>
      </div>
    </div>
    <div
      v-if="$slots.actions"
      class="page-header__actions"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.page-header__left {
  display: flex;
  align-items: center;
}

.page-header__title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.page-header__subtitle {
  font-size: 14px;
  color: #666;
  margin: 4px 0 0;
}

.page-header__actions {
  display: flex;
  gap: 8px;
}
</style>
