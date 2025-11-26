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
        <el-form ref="formRef" :model="form" :rules="formRules" @submit.prevent="handleSubmit" class="create-order-form">
          <h3 class="text-h6 mb-4">Pickup Information</h3>
          <v-row>
            <v-col cols="12">
              <el-form-item prop="pickup_address">
                <el-input
                  v-model="form.pickup_address"
                  placeholder="Enter full pickup address"
                >
                  <template #prefix>
                    <v-icon icon="mdi-map-marker" size="small" />
                  </template>
                </el-input>
              </el-form-item>
            </v-col>
            <v-col cols="12" sm="6">
              <el-form-item prop="pickup_city">
                <el-input
                  v-model="form.pickup_city"
                  placeholder="Pickup City"
                />
              </el-form-item>
            </v-col>
            <v-col cols="12" sm="6">
              <el-form-item prop="pickup_state">
                <el-select
                  v-model="form.pickup_state"
                  placeholder="Pickup State"
                  filterable
                  style="width: 100%"
                >
                  <el-option
                    v-for="state in US_STATES"
                    :key="state.value"
                    :label="`${state.label} (${state.value})`"
                    :value="state.value"
                  />
                </el-select>
              </el-form-item>
            </v-col>
            <v-col cols="12" sm="6">
              <el-form-item prop="pickup_zip">
                <el-input
                  v-model="form.pickup_zip"
                  placeholder="Pickup ZIP Code (e.g., 10001)"
                />
              </el-form-item>
            </v-col>
            <v-col cols="12" sm="6">
              <el-form-item prop="pickup_contact_phone">
                <el-input
                  v-model="form.pickup_contact_phone"
                  placeholder="Pickup Contact Phone"
                >
                  <template #prefix>
                    <v-icon icon="mdi-phone" size="small" />
                  </template>
                </el-input>
              </el-form-item>
            </v-col>
          </v-row>

          <v-divider class="my-6" />

          <h3 class="text-h6 mb-4">Delivery Information</h3>
          <v-row>
            <v-col cols="12">
              <el-form-item prop="delivery_address">
                <el-input
                  v-model="form.delivery_address"
                  placeholder="Enter full delivery address"
                >
                  <template #prefix>
                    <v-icon icon="mdi-map-marker-check" size="small" />
                  </template>
                </el-input>
              </el-form-item>
            </v-col>
            <v-col cols="12" sm="6">
              <el-form-item prop="delivery_city">
                <el-input
                  v-model="form.delivery_city"
                  placeholder="Delivery City"
                />
              </el-form-item>
            </v-col>
            <v-col cols="12" sm="6">
              <el-form-item prop="delivery_state">
                <el-select
                  v-model="form.delivery_state"
                  placeholder="Delivery State"
                  filterable
                  style="width: 100%"
                >
                  <el-option
                    v-for="state in US_STATES"
                    :key="state.value"
                    :label="`${state.label} (${state.value})`"
                    :value="state.value"
                  />
                </el-select>
              </el-form-item>
            </v-col>
            <v-col cols="12" sm="6">
              <el-form-item prop="delivery_zip">
                <el-input
                  v-model="form.delivery_zip"
                  placeholder="Delivery ZIP Code (e.g., 10001)"
                />
              </el-form-item>
            </v-col>
            <v-col cols="12" sm="6">
              <el-form-item prop="delivery_contact_phone">
                <el-input
                  v-model="form.delivery_contact_phone"
                  placeholder="Delivery Contact Phone"
                >
                  <template #prefix>
                    <v-icon icon="mdi-phone" size="small" />
                  </template>
                </el-input>
              </el-form-item>
            </v-col>
            <v-col cols="12">
              <el-form-item prop="delivery_contact_name">
                <el-input
                  v-model="form.delivery_contact_name"
                  placeholder="Recipient Name"
                >
                  <template #prefix>
                    <v-icon icon="mdi-account" size="small" />
                  </template>
                </el-input>
              </el-form-item>
            </v-col>
          </v-row>

          <v-divider class="my-6" />

          <h3 class="text-h6 mb-4">Package Details</h3>
          <v-row>
            <v-col cols="12" sm="6">
              <el-form-item prop="package_weight">
                <el-input
                  v-model.number="form.package_weight"
                  type="number"
                  placeholder="Weight (kg)"
                  :min="0.1"
                  :step="0.1"
                >
                  <template #prefix>
                    <v-icon icon="mdi-weight" size="small" />
                  </template>
                </el-input>
              </el-form-item>
            </v-col>
            <v-col cols="12" sm="6">
              <el-form-item prop="price">
                <el-input
                  v-model.number="form.price"
                  type="number"
                  placeholder="Price ($)"
                  :min="1"
                  :step="0.01"
                >
                  <template #prefix>
                    <v-icon icon="mdi-currency-usd" size="small" />
                  </template>
                </el-input>
              </el-form-item>
            </v-col>
            <v-col cols="12">
              <el-form-item prop="package_description">
                <el-input
                  v-model="form.package_description"
                  type="textarea"
                  :rows="3"
                  placeholder="Describe the package contents and any special handling instructions"
                />
              </el-form-item>
            </v-col>
            <v-col cols="12">
              <el-form-item>
                <el-input
                  v-model="form.notes"
                  type="textarea"
                  :rows="2"
                  placeholder="Any additional instructions for the driver (Optional)"
                />
              </el-form-item>
            </v-col>
          </v-row>
        </el-form>
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
import { US_STATES } from '@/shared/utils/us-states'
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

const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('This field is required'))
  } else if (!/^[\d\s\-+()]+$/.test(value)) {
    callback(new Error('Invalid phone number'))
  } else {
    callback()
  }
}

const validatePositive = (rule, value, callback) => {
  if (!value) {
    callback(new Error('This field is required'))
  } else if (value <= 0) {
    callback(new Error('Must be greater than 0'))
  } else {
    callback()
  }
}

const formRules = {
  pickup_address: [{ required: true, message: 'Pickup address is required', trigger: 'blur' }],
  pickup_city: [{ required: true, message: 'Pickup city is required', trigger: 'blur' }],
  pickup_state: [{ required: true, message: 'Pickup state is required', trigger: 'blur' }],
  pickup_zip: [{ required: true, message: 'Pickup ZIP code is required', trigger: 'blur' }],
  pickup_contact_phone: [{ validator: validatePhone, trigger: 'blur' }],
  delivery_address: [{ required: true, message: 'Delivery address is required', trigger: 'blur' }],
  delivery_city: [{ required: true, message: 'Delivery city is required', trigger: 'blur' }],
  delivery_state: [{ required: true, message: 'Delivery state is required', trigger: 'blur' }],
  delivery_zip: [{ required: true, message: 'Delivery ZIP code is required', trigger: 'blur' }],
  delivery_contact_phone: [{ validator: validatePhone, trigger: 'blur' }],
  delivery_contact_name: [{ required: true, message: 'Recipient name is required', trigger: 'blur' }],
  package_weight: [{ validator: validatePositive, trigger: 'blur' }],
  price: [{ validator: validatePositive, trigger: 'blur' }],
  package_description: [{ required: true, message: 'Package description is required', trigger: 'blur' }]
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
  if (!formRef.value) return

  try {
    await formRef.value.validate()
  } catch (error) {
    // Validation failed
    return
  }

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

<style scoped>
.create-order-form :deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
