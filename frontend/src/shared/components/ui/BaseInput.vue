<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'text'
  },
  variant: {
    type: String,
    default: 'outlined',
    validator: (v) => ['outlined', 'filled', 'underlined', 'solo', 'solo-inverted', 'solo-filled', 'plain'].includes(v)
  },
  density: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'comfortable', 'compact'].includes(v)
  },
  prependIcon: {
    type: String,
    default: null
  },
  appendIcon: {
    type: String,
    default: null
  },
  prependInnerIcon: {
    type: String,
    default: null
  },
  appendInnerIcon: {
    type: String,
    default: null
  },
  hint: {
    type: String,
    default: null
  },
  persistentHint: {
    type: Boolean,
    default: false
  },
  errorMessages: {
    type: [String, Array],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'click:append', 'click:prepend', 'click:appendInner', 'click:prependInner'])

const updateValue = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <v-text-field
    :model-value="modelValue"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    :variant="variant"
    :density="density"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :prepend-inner-icon="prependInnerIcon"
    :append-inner-icon="appendInnerIcon"
    :hint="hint"
    :persistent-hint="persistentHint"
    :error-messages="errorMessages"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    :rules="rules"
    @update:model-value="updateValue"
    @click:append="$emit('click:append', $event)"
    @click:prepend="$emit('click:prepend', $event)"
    @click:append-inner="$emit('click:appendInner', $event)"
    @click:prepend-inner="$emit('click:prependInner', $event)"
  />
</template>
