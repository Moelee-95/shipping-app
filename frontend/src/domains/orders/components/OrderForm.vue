<script setup>
import { reactive, watch } from 'vue'
import { orderSchema } from '@/shared/utils/validators'
import { formatDateForInput } from '@/shared/utils/formatters'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  },
  submitLabel: {
    type: String,
    default: 'Create Order'
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  pickup_address: '',
  delivery_address: '',
  pickup_city: '',
  delivery_city: '',
  package_description: '',
  weight: '',
  dimensions: '',
  price: '',
  pickup_date: '',
  notes: ''
})

const errors = reactive({
  pickup_address: '',
  delivery_address: '',
  pickup_city: '',
  delivery_city: '',
  package_description: '',
  weight: '',
  dimensions: '',
  price: '',
  pickup_date: '',
  notes: ''
})

// Initialize form with initial data
watch(
  () => props.initialData,
  (data) => {
    if (data) {
      Object.keys(form).forEach((key) => {
        if (data[key] !== undefined) {
          if (key === 'pickup_date') {
            form[key] = formatDateForInput(data[key])
          } else {
            form[key] = data[key]
          }
        }
      })
    }
  },
  { immediate: true }
)

const validateField = async (field) => {
  try {
    await orderSchema.validateAt(field, form)
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
    await orderSchema.validate(form, { abortEarly: false })
  } catch (error) {
    error.inner.forEach((err) => {
      errors[err.path] = err.message
    })
    return
  }

  emit('submit', { ...form })
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row>
      <!-- Pickup Details -->
      <v-col cols="12">
        <h3 class="text-h6 mb-3">
          <v-icon
            icon="mdi-map-marker"
            color="success"
            class="mr-2"
          />
          Pickup Details
        </h3>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="form.pickup_address"
          label="Pickup Address"
          variant="outlined"
          :error-messages="errors.pickup_address"
          @blur="validateField('pickup_address')"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="form.pickup_city"
          label="Pickup City"
          variant="outlined"
          :error-messages="errors.pickup_city"
          @blur="validateField('pickup_city')"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="form.pickup_date"
          label="Pickup Date"
          type="date"
          variant="outlined"
          :error-messages="errors.pickup_date"
          @blur="validateField('pickup_date')"
        />
      </v-col>

      <!-- Delivery Details -->
      <v-col cols="12">
        <h3 class="text-h6 mb-3 mt-2">
          <v-icon
            icon="mdi-map-marker-check"
            color="error"
            class="mr-2"
          />
          Delivery Details
        </h3>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="form.delivery_address"
          label="Delivery Address"
          variant="outlined"
          :error-messages="errors.delivery_address"
          @blur="validateField('delivery_address')"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="form.delivery_city"
          label="Delivery City"
          variant="outlined"
          :error-messages="errors.delivery_city"
          @blur="validateField('delivery_city')"
        />
      </v-col>

      <!-- Package Details -->
      <v-col cols="12">
        <h3 class="text-h6 mb-3 mt-2">
          <v-icon
            icon="mdi-package-variant"
            color="primary"
            class="mr-2"
          />
          Package Details
        </h3>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="form.package_description"
          label="Package Description"
          variant="outlined"
          rows="2"
          :error-messages="errors.package_description"
          @blur="validateField('package_description')"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="form.weight"
          label="Weight (kg)"
          type="number"
          variant="outlined"
          :error-messages="errors.weight"
          @blur="validateField('weight')"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="form.dimensions"
          label="Dimensions (e.g., 30x20x15 cm)"
          variant="outlined"
          :error-messages="errors.dimensions"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="form.price"
          label="Price ($)"
          type="number"
          variant="outlined"
          :error-messages="errors.price"
          @blur="validateField('price')"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="form.notes"
          label="Additional Notes (Optional)"
          variant="outlined"
          rows="2"
        />
      </v-col>

      <!-- Actions -->
      <v-col cols="12">
        <div class="d-flex gap-3 justify-end">
          <v-btn
            variant="text"
            @click="emit('cancel')"
          >
            Cancel
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            :loading="loading"
            :disabled="loading"
          >
            {{ submitLabel }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
