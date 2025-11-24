<script setup>
import { ref, reactive } from 'vue'
import { useAuth } from '@/shared/composables/useAuth'
import { useNotification } from '@/shared/composables/useNotification'
import { loginSchema } from '@/shared/utils/validators'

const { login, loading } = useAuth()
const notification = useNotification()

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)

const validateField = async (field) => {
  try {
    await loginSchema.validateAt(field, form)
    errors[field] = ''
  } catch (error) {
    errors[field] = error.message
  }
}

const handleSubmit = async () => {
  // Validate all fields
  try {
    await loginSchema.validate(form, { abortEarly: false })
  } catch (error) {
    error.inner.forEach((err) => {
      errors[err.path] = err.message
    })
    return
  }

  try {
    await login(form)
    notification.success('Login successful!')
  } catch (error) {
    notification.error(error.response?.data?.message || 'Login failed. Please try again.')
  }
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="form.email"
      label="Email"
      type="email"
      variant="outlined"
      prepend-inner-icon="mdi-email"
      :error-messages="errors.email"
      @blur="validateField('email')"
      class="mb-3"
    />

    <v-text-field
      v-model="form.password"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      variant="outlined"
      prepend-inner-icon="mdi-lock"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :error-messages="errors.password"
      @blur="validateField('password')"
      @click:append-inner="showPassword = !showPassword"
      class="mb-4"
    />

    <v-btn
      type="submit"
      color="primary"
      size="large"
      block
      :loading="loading"
      :disabled="loading"
    >
      Sign In
    </v-btn>
  </v-form>
</template>
