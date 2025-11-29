<!--
  PhoneInput Component - Advanced US Phone Number Input with Auto-Formatting

  Features:
  - Auto-formats to (xxx) xxx-xxxx format as user types
  - Validates US phone numbers (10 digits)
  - Only accepts numeric input
  - Clears non-numeric characters
  - Element Plus integration
  - Visual feedback for valid/invalid numbers
  - Placeholder with format example
  - Copy/paste support with auto-formatting
  - Disabled state support
  - Custom validation messages

  Usage:
  <PhoneInput
    v-model="phoneNumber"
    label="Phone Number"
    placeholder="Enter phone number"
    :required="true"
    :disabled="false"
    @valid="handleValid"
    @invalid="handleInvalid"
  />
-->

<script setup>
import { ref, computed, watch } from 'vue'
import { Phone } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Phone Number'
  },
  placeholder: {
    type: String,
    default: '(555) 123-4567'
  },
  required: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'large',
    validator: (value) => ['large', 'default', 'small'].includes(value)
  },
  validateOnBlur: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'valid', 'invalid', 'change'])

const inputValue = ref('')
const isFocused = ref(false)
const hasInteracted = ref(false)
const validationMessage = ref('')

// Format phone number to (xxx) xxx-xxxx
const formatPhoneNumber = (value) => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '')

  // Limit to 10 digits
  const limited = cleaned.substring(0, 10)

  // Format based on length
  if (limited.length === 0) return ''
  if (limited.length <= 3) return `(${limited}`
  if (limited.length <= 6) return `(${limited.slice(0, 3)}) ${limited.slice(3)}`
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`
}

// Extract only digits from formatted phone
const getDigitsOnly = (value) => {
  return value.replace(/\D/g, '')
}

// Validate US phone number (must be exactly 10 digits)
const isValidPhone = (value) => {
  const digits = getDigitsOnly(value)
  return digits.length === 10
}

// Computed validation state
const isValid = computed(() => {
  if (!props.required && inputValue.value === '') return true
  return isValidPhone(inputValue.value)
})

const showError = computed(() => {
  return hasInteracted.value && !isValid.value && inputValue.value !== ''
})

const inputClass = computed(() => {
  if (!hasInteracted.value) return ''
  if (isValid.value && inputValue.value !== '') return 'is-valid'
  if (showError.value) return 'is-error'
  return ''
})

// Initialize from modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    inputValue.value = formatPhoneNumber(newValue)
  } else {
    inputValue.value = ''
  }
}, { immediate: true })

// Handle input changes
const handleInput = (value) => {
  // Format the input
  const formatted = formatPhoneNumber(value)
  inputValue.value = formatted

  // Extract digits and emit
  const digits = getDigitsOnly(formatted)
  emit('update:modelValue', digits)
  emit('change', digits)

  // Validate and emit validation events
  if (isValidPhone(formatted)) {
    validationMessage.value = ''
    emit('valid', digits)
  } else {
    if (digits.length > 0) {
      validationMessage.value = props.required
        ? 'Please enter a valid 10-digit US phone number'
        : ''
      emit('invalid', digits)
    } else {
      validationMessage.value = props.required
        ? 'Phone number is required'
        : ''
    }
  }
}

// Handle focus
const handleFocus = () => {
  isFocused.value = true
}

// Handle blur
const handleBlur = () => {
  isFocused.value = false
  hasInteracted.value = true

  if (props.validateOnBlur) {
    if (props.required && inputValue.value === '') {
      validationMessage.value = 'Phone number is required'
    } else if (inputValue.value !== '' && !isValid.value) {
      validationMessage.value = 'Please enter a valid 10-digit US phone number'
    } else {
      validationMessage.value = ''
    }
  }
}

// Handle paste
const handlePaste = (event) => {
  event.preventDefault()
  const pastedText = event.clipboardData.getData('text')
  const cleaned = getDigitsOnly(pastedText)
  const formatted = formatPhoneNumber(cleaned)
  inputValue.value = formatted
  handleInput(formatted)
}

// Clear input
const clearInput = () => {
  inputValue.value = ''
  emit('update:modelValue', '')
  emit('change', '')
  validationMessage.value = ''
  hasInteracted.value = false
}
</script>

<template>
  <div class="phone-input-wrapper">
    <el-form-item
      :label="label"
      :error="showError ? validationMessage : ''"
      :class="inputClass"
    >
      <el-input
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :size="size"
        :prefix-icon="Phone"
        :class="['phone-input', inputClass]"
        clearable
        maxlength="14"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @paste="handlePaste"
        @clear="clearInput"
      >
        <template #suffix>
          <transition name="fade">
            <el-icon v-if="isValid && inputValue !== ''" class="validation-icon success">
              <component :is="'CircleCheck'" />
            </el-icon>
            <el-icon v-else-if="showError" class="validation-icon error">
              <component :is="'CircleClose'" />
            </el-icon>
          </transition>
        </template>
      </el-input>

      <!-- Helper Text -->
      <div v-if="!showError && isFocused" class="helper-text">
        <el-icon size="14"><component :is="'InfoFilled'" /></el-icon>
        <span>Enter a 10-digit US phone number</span>
      </div>
    </el-form-item>
  </div>
</template>

<style scoped>
.phone-input-wrapper {
  width: 100%;
}

.phone-input {
  transition: all 0.3s ease;
}

.phone-input.is-valid :deep(.el-input__wrapper) {
  border-color: #67c23a;
  box-shadow: 0 0 0 1px #67c23a inset;
}

.phone-input.is-valid :deep(.el-input__wrapper:hover) {
  border-color: #85ce61;
}

.phone-input.is-valid :deep(.el-input__wrapper.is-focus) {
  border-color: #67c23a;
  box-shadow: 0 0 0 1px #67c23a inset;
}

.phone-input.is-error :deep(.el-input__wrapper) {
  border-color: #f56c6c;
  box-shadow: 0 0 0 1px #f56c6c inset;
}

.phone-input.is-error :deep(.el-input__wrapper:hover) {
  border-color: #f78989;
}

.phone-input.is-error :deep(.el-input__wrapper.is-focus) {
  border-color: #f56c6c;
  box-shadow: 0 0 0 1px #f56c6c inset;
}

.validation-icon {
  transition: all 0.3s ease;
}

.validation-icon.success {
  color: #67c23a;
  animation: scaleIn 0.3s ease;
}

.validation-icon.error {
  color: #f56c6c;
  animation: shake 0.3s ease;
}

.helper-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #909399;
  margin-top: 6px;
  animation: slideDown 0.3s ease;
}

.helper-text .el-icon {
  flex-shrink: 0;
}

/* Animations */
@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-4px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(4px);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .phone-input {
    font-size: 16px; /* Prevent zoom on iOS */
  }

  .helper-text {
    font-size: 12px;
  }
}

/* Focus state enhancement */
.phone-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset,
              0 0 8px rgba(64, 158, 255, 0.2);
}

/* Disabled state */
.phone-input :deep(.el-input.is-disabled .el-input__wrapper) {
  background-color: #f5f7fa;
  cursor: not-allowed;
}

/* Placeholder styling */
.phone-input :deep(.el-input__inner::placeholder) {
  color: #c0c4cc;
  font-style: italic;
}
</style>
