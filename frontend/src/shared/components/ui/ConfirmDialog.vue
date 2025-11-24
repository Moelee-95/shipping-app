<script setup>
import { computed } from 'vue'
import { useConfirm } from '@/shared/composables/useConfirm'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: undefined
  },
  title: {
    type: String,
    default: 'Confirm'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  confirmColor: {
    type: String,
    default: 'warning'
  },
  type: {
    type: String,
    default: 'warning'
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

// Composable state for global usage
const confirmComposable = useConfirm()

// Determine if using prop-based (local) or composable-based (global) mode
const isPropsMode = computed(() => props.modelValue !== undefined)

// Reactive dialog state
const dialogOpen = computed({
  get: () => isPropsMode.value ? props.modelValue : confirmComposable.isOpen.value,
  set: (val) => {
    if (isPropsMode.value) {
      emit('update:modelValue', val)
    } else {
      confirmComposable.isOpen.value = val
    }
  }
})

const dialogTitle = computed(() => isPropsMode.value ? props.title : confirmComposable.title.value)
const dialogMessage = computed(() => isPropsMode.value ? props.message : confirmComposable.message.value)
const dialogConfirmText = computed(() => isPropsMode.value ? props.confirmText : confirmComposable.confirmText.value)
const dialogCancelText = computed(() => isPropsMode.value ? props.cancelText : confirmComposable.cancelText.value)
const dialogType = computed(() => isPropsMode.value ? props.type : confirmComposable.type.value)

const colorMap = {
  warning: 'warning',
  danger: 'error',
  error: 'error',
  info: 'info',
  success: 'success'
}

const iconMap = {
  warning: 'mdi-alert-circle',
  danger: 'mdi-alert',
  error: 'mdi-alert',
  info: 'mdi-information',
  success: 'mdi-check-circle'
}

const getColor = computed(() => {
  if (isPropsMode.value && props.confirmColor !== 'warning') {
    return props.confirmColor
  }
  return colorMap[dialogType.value] || 'warning'
})

const getIcon = computed(() => iconMap[dialogType.value] || 'mdi-alert-circle')

const handleConfirm = () => {
  if (isPropsMode.value) {
    emit('confirm')
    emit('update:modelValue', false)
  } else {
    confirmComposable.handleConfirm()
  }
}

const handleCancel = () => {
  if (isPropsMode.value) {
    emit('cancel')
    emit('update:modelValue', false)
  } else {
    confirmComposable.handleCancel()
  }
}
</script>

<template>
  <v-dialog
    v-model="dialogOpen"
    max-width="400"
    :persistent="false"
    @click:outside="handleCancel"
  >
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon
          :icon="getIcon"
          :color="getColor"
          class="mr-2"
        />
        {{ dialogTitle }}
      </v-card-title>

      <v-card-text>
        {{ dialogMessage }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="text"
          @click="handleCancel"
        >
          {{ dialogCancelText }}
        </v-btn>
        <v-btn
          :color="getColor"
          variant="flat"
          @click="handleConfirm"
        >
          {{ dialogConfirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
