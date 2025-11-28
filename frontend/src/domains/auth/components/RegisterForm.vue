<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'
import { useNotification } from '@/shared/composables/useNotification'
import { registerSchema } from '@/shared/utils/validators'
import { ROLES } from '@/shared/utils/constants'
import RoleSelector from './RoleSelector.vue'

const route = useRoute()
const { register, loading } = useAuth()
const notification = useNotification()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: '',
  phone: '',
  company_name: ''
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: '',
  phone: '',
  company_name: ''
})

// Pre-select role from query parameter
onMounted(() => {
  const roleParam = route.query.role
  if (roleParam && (roleParam === ROLES.SHIPPING_COMPANY || roleParam === ROLES.DRIVER)) {
    form.role = roleParam
  }
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const validateField = async (field) => {
  try {
    await registerSchema.validateAt(field, form)
    errors[field] = ''
  } catch (error) {
    errors[field] = error.message
  }
}

const handleSubmit = async () => {
  // Reset errors
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  // Validate all fields
  try {
    await registerSchema.validate(form, { abortEarly: false })
  } catch (error) {
    error.inner.forEach((err) => {
      errors[err.path] = err.message
    })
    return
  }

  try {
    await register(form)
    notification.success('Registration successful!')
  } catch (error) {
    notification.error(error.response?.data?.message || 'Registration failed. Please try again.')
  }
}

// Clear company name when role changes to driver
watch(
  () => form.role,
  (newRole) => {
    if (newRole === 'driver') {
      form.company_name = ''
      errors.company_name = ''
    }
  }
)
</script>

<template>
  <v-form @submit.prevent="handleSubmit" class="register-form">
    <RoleSelector
      v-model="form.role"
      :error="errors.role"
      class="mb-4"
    />

    <v-text-field
      v-model="form.name"
      label="Full Name"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-account"
      :error-messages="errors.name"
      @blur="validateField('name')"
      class="mb-1"
    />

    <v-text-field
      v-model="form.email"
      label="Email"
      type="email"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-email"
      :error-messages="errors.email"
      @blur="validateField('email')"
      class="mb-1"
    />

    <v-text-field
      v-model="form.phone"
      label="Phone Number"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-phone"
      prefix="+1"
      placeholder="(555) 123-4567"
      :error-messages="errors.phone"
      @blur="validateField('phone')"
      class="mb-1"
    />

    <v-text-field
      v-if="form.role === 'shipping_company'"
      v-model="form.company_name"
      label="Company Name"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-domain"
      :error-messages="errors.company_name"
      @blur="validateField('company_name')"
      class="mb-1"
    />

    <v-text-field
      v-model="form.password"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-lock"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :error-messages="errors.password"
      @blur="validateField('password')"
      @click:append-inner="showPassword = !showPassword"
      class="mb-1"
    />

    <v-text-field
      v-model="form.password_confirmation"
      label="Confirm Password"
      :type="showConfirmPassword ? 'text' : 'password'"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-lock-check"
      :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :error-messages="errors.password_confirmation"
      @blur="validateField('password_confirmation')"
      @click:append-inner="showConfirmPassword = !showConfirmPassword"
      class="mb-3"
    />

    <v-btn
      type="submit"
      color="primary"
      size="large"
      block
      :loading="loading"
      :disabled="loading"
    >
      Create Account
    </v-btn>
  </v-form>
</template>
