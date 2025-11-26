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
  <el-form @submit.prevent="handleSubmit" class="order-form">
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
        <el-form-item :error="errors.pickup_address">
          <el-input
            v-model="form.pickup_address"
            placeholder="Pickup Address"
            @blur="validateField('pickup_address')"
          />
        </el-form-item>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <el-form-item :error="errors.pickup_city">
          <el-input
            v-model="form.pickup_city"
            placeholder="Pickup City"
            @blur="validateField('pickup_city')"
          />
        </el-form-item>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <el-form-item :error="errors.pickup_date">
          <el-date-picker
            v-model="form.pickup_date"
            type="date"
            placeholder="Pickup Date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
            @blur="validateField('pickup_date')"
          />
        </el-form-item>
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
        <el-form-item :error="errors.delivery_address">
          <el-input
            v-model="form.delivery_address"
            placeholder="Delivery Address"
            @blur="validateField('delivery_address')"
          />
        </el-form-item>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <el-form-item :error="errors.delivery_city">
          <el-input
            v-model="form.delivery_city"
            placeholder="Delivery City"
            @blur="validateField('delivery_city')"
          />
        </el-form-item>
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
        <el-form-item :error="errors.package_description">
          <el-input
            v-model="form.package_description"
            type="textarea"
            placeholder="Package Description"
            :rows="2"
            @blur="validateField('package_description')"
          />
        </el-form-item>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <el-form-item :error="errors.weight">
          <el-input
            v-model="form.weight"
            type="number"
            placeholder="Weight (kg)"
            @blur="validateField('weight')"
          />
        </el-form-item>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <el-form-item :error="errors.dimensions">
          <el-input
            v-model="form.dimensions"
            placeholder="Dimensions (e.g., 30x20x15 cm)"
          />
        </el-form-item>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <el-form-item :error="errors.price">
          <el-input
            v-model="form.price"
            type="number"
            placeholder="Price ($)"
            @blur="validateField('price')"
          />
        </el-form-item>
      </v-col>
      <v-col cols="12">
        <el-form-item>
          <el-input
            v-model="form.notes"
            type="textarea"
            placeholder="Additional Notes (Optional)"
            :rows="2"
          />
        </el-form-item>
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
  </el-form>
</template>

<style scoped>
.order-form :deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
