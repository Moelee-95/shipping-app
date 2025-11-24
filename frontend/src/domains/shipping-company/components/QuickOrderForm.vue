<template>
  <v-card class="quick-order-form">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-lightning-bolt</v-icon>
      Quick Order
    </v-card-title>

    <v-card-text>
      <v-form ref="formRef" @submit.prevent="handleSubmit">
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="form.pickup_address"
              label="Pickup Address"
              prepend-inner-icon="mdi-map-marker"
              :rules="[rules.required]"
              variant="outlined"
              density="compact"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="form.delivery_address"
              label="Delivery Address"
              prepend-inner-icon="mdi-map-marker-check"
              :rules="[rules.required]"
              variant="outlined"
              density="compact"
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model.number="form.weight"
              label="Weight (kg)"
              type="number"
              prepend-inner-icon="mdi-weight"
              :rules="[rules.required, rules.positive]"
              variant="outlined"
              density="compact"
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model.number="form.price"
              label="Price ($)"
              type="number"
              prepend-inner-icon="mdi-currency-usd"
              :rules="[rules.required, rules.positive]"
              variant="outlined"
              density="compact"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="form.description"
              label="Description (Optional)"
              rows="2"
              variant="outlined"
              density="compact"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions class="pa-4 pt-0">
      <v-spacer />
      <v-btn variant="text" @click="resetForm">Clear</v-btn>
      <v-btn color="primary" variant="flat" :loading="loading" @click="handleSubmit">
        Create Order
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['submit'])

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const formRef = ref(null)

const initialForm = {
  pickup_address: '',
  delivery_address: '',
  weight: null,
  price: null,
  description: ''
}

const form = reactive({ ...initialForm })

const rules = {
  required: (v) => !!v || 'This field is required',
  positive: (v) => (v && v > 0) || 'Must be greater than 0'
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (valid) {
    emit('submit', { ...form })
  }
}

const resetForm = () => {
  Object.assign(form, initialForm)
  formRef.value?.resetValidation()
}

defineExpose({ resetForm })
</script>

<style scoped>
.quick-order-form {
  height: 100%;
}
</style>
