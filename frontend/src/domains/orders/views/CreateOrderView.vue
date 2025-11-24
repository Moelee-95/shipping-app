<template>
  <div class="create-order-view">
    <PageHeader
      :title="isEditing ? 'Edit Order' : 'Create New Order'"
      :subtitle="isEditing ? 'Update order details' : 'Fill in the details to create a new shipping order'"
    >
      <template #actions>
        <v-btn variant="outlined" @click="goBack">
          <v-icon start>mdi-arrow-left</v-icon>
          Back
        </v-btn>
      </template>
    </PageHeader>

    <v-card max-width="800" class="mx-auto">
      <v-card-text class="pa-6">
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <h3 class="text-h6 mb-4">Pickup Information</h3>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.pickup_address"
                label="Pickup Address"
                prepend-inner-icon="mdi-map-marker"
                :rules="[rules.required]"
                variant="outlined"
                placeholder="Enter full pickup address"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.pickup_city"
                label="Pickup City"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.pickup_phone"
                label="Pickup Contact Phone"
                prepend-inner-icon="mdi-phone"
                :rules="[rules.required, rules.phone]"
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-divider class="my-6" />

          <h3 class="text-h6 mb-4">Delivery Information</h3>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.delivery_address"
                label="Delivery Address"
                prepend-inner-icon="mdi-map-marker-check"
                :rules="[rules.required]"
                variant="outlined"
                placeholder="Enter full delivery address"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.delivery_city"
                label="Delivery City"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.delivery_phone"
                label="Delivery Contact Phone"
                prepend-inner-icon="mdi-phone"
                :rules="[rules.required, rules.phone]"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="form.recipient_name"
                label="Recipient Name"
                prepend-inner-icon="mdi-account"
                :rules="[rules.required]"
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-divider class="my-6" />

          <h3 class="text-h6 mb-4">Package Details</h3>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="form.weight"
                label="Weight (kg)"
                type="number"
                prepend-inner-icon="mdi-weight"
                :rules="[rules.required, rules.positive]"
                variant="outlined"
                min="0.1"
                step="0.1"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="form.price"
                label="Price ($)"
                type="number"
                prepend-inner-icon="mdi-currency-usd"
                :rules="[rules.required, rules.positive]"
                variant="outlined"
                min="1"
                step="0.01"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="form.description"
                label="Package Description"
                rows="3"
                variant="outlined"
                placeholder="Describe the package contents and any special handling instructions"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="form.notes"
                label="Additional Notes (Optional)"
                rows="2"
                variant="outlined"
                placeholder="Any additional instructions for the driver"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn variant="outlined" size="large" @click="goBack">Cancel</v-btn>
        <v-btn
          color="primary"
          variant="flat"
          size="large"
          :loading="loading"
          @click="handleSubmit"
        >
          {{ isEditing ? 'Update Order' : 'Create Order' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useOrdersStore } from '../store/orders.store'
import PageHeader from '@/shared/components/common/PageHeader.vue'

const router = useRouter()
const route = useRoute()
const ordersStore = useOrdersStore()

const formRef = ref(null)
const loading = ref(false)

const orderId = computed(() => route.params.id)
const isEditing = computed(() => !!orderId.value && route.query.edit === 'true')

const initialForm = {
  pickup_address: '',
  pickup_city: '',
  pickup_phone: '',
  delivery_address: '',
  delivery_city: '',
  delivery_phone: '',
  recipient_name: '',
  weight: null,
  price: null,
  description: '',
  notes: ''
}

const form = reactive({ ...initialForm })

const rules = {
  required: (v) => !!v || 'This field is required',
  positive: (v) => (v && v > 0) || 'Must be greater than 0',
  phone: (v) => !v || /^[\d\s\-+()]+$/.test(v) || 'Invalid phone number'
}

onMounted(async () => {
  if (isEditing.value) {
    await ordersStore.fetchOrder(orderId.value)
    const order = ordersStore.currentOrder
    if (order) {
      Object.keys(form).forEach(key => {
        if (order[key] !== undefined) {
          form[key] = order[key]
        }
      })
    }
  }
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    if (isEditing.value) {
      await ordersStore.updateOrder(orderId.value, form)
    } else {
      await ordersStore.createOrder(form)
    }
    goBack()
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>
