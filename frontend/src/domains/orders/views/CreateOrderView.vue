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
          <h3 class="text-h6 mb-4">
            <v-icon icon="mdi-map-marker" class="mr-2" color="success" />
            Pickup Branch
          </h3>
          <v-row>
            <v-col cols="12">
              <el-form-item prop="pickup_branch_id" label="Select Pickup Branch">
                <el-select
                  v-model="form.pickup_branch_id"
                  placeholder="Select a branch for pickup"
                  filterable
                  style="width: 100%"
                  size="large"
                >
                  <el-option
                    v-for="branch in branchesStore.branchOptions"
                    :key="branch.value"
                    :label="branch.label"
                    :value="branch.value"
                  />
                </el-select>
              </el-form-item>
            </v-col>
            <v-col v-if="selectedPickupBranch" cols="12">
              <v-alert type="info" variant="tonal" density="compact">
                <div class="text-body-2">
                  <strong>Address:</strong> {{ selectedPickupBranch.address }}<br>
                  <strong>City:</strong> {{ selectedPickupBranch.city }}, {{ selectedPickupBranch.state }} {{ selectedPickupBranch.zip_code }}<br>
                  <strong>Phone:</strong> {{ selectedPickupBranch.phone }}
                </div>
              </v-alert>
            </v-col>
          </v-row>

          <v-divider class="my-6" />

          <h3 class="text-h6 mb-4">
            <v-icon icon="mdi-map-marker-check" class="mr-2" color="error" />
            Delivery Branch
          </h3>
          <v-row>
            <v-col cols="12">
              <el-form-item prop="delivery_branch_id" label="Select Delivery Branch">
                <el-select
                  v-model="form.delivery_branch_id"
                  placeholder="Select a branch for delivery"
                  filterable
                  style="width: 100%"
                  size="large"
                >
                  <el-option
                    v-for="branch in branchesStore.branchOptions"
                    :key="branch.value"
                    :label="branch.label"
                    :value="branch.value"
                    :disabled="branch.value === form.pickup_branch_id"
                  />
                </el-select>
              </el-form-item>
            </v-col>
            <v-col v-if="selectedDeliveryBranch" cols="12">
              <v-alert type="info" variant="tonal" density="compact">
                <div class="text-body-2">
                  <strong>Address:</strong> {{ selectedDeliveryBranch.address }}<br>
                  <strong>City:</strong> {{ selectedDeliveryBranch.city }}, {{ selectedDeliveryBranch.state }} {{ selectedDeliveryBranch.zip_code }}<br>
                  <strong>Phone:</strong> {{ selectedDeliveryBranch.phone }}
                </div>
              </v-alert>
            </v-col>
            <v-col cols="12" sm="6">
              <el-form-item prop="delivery_contact_name" label="Recipient Name">
                <el-input
                  v-model="form.delivery_contact_name"
                  placeholder="Name of person receiving the package"
                >
                  <template #prefix>
                    <v-icon icon="mdi-account" size="small" />
                  </template>
                </el-input>
              </el-form-item>
            </v-col>
            <v-col cols="12" sm="6">
              <el-form-item prop="delivery_contact_phone" label="Recipient Phone">
                <el-input
                  v-model="form.delivery_contact_phone"
                  placeholder="Contact phone for delivery"
                >
                  <template #prefix>
                    <v-icon icon="mdi-phone" size="small" />
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
import { ElMessageBox } from 'element-plus'
import { useOrdersStore } from '../store/orders.store'
import { useBranchesStore } from '@/domains/shipping-company/store/branches.store'
import { US_STATES } from '@/shared/utils/us-states'
import { useNotification } from '@/shared/composables/useNotification'
import PageHeader from '@/shared/components/common/PageHeader.vue'

const router = useRouter()
const route = useRoute()
const ordersStore = useOrdersStore()
const branchesStore = useBranchesStore()
const notification = useNotification()

const formRef = ref(null)
const loading = ref(false)

const orderId = computed(() => route.params.id)
const isEditing = computed(() => !!orderId.value && route.query.edit === 'true')

const initialForm = {
  pickup_branch_id: null,
  delivery_branch_id: null,
  delivery_contact_name: '',
  delivery_contact_phone: '',
  package_weight: null,
  price: null,
  package_description: '',
  notes: ''
}

const form = reactive({ ...initialForm })

// Computed properties for selected branches
const selectedPickupBranch = computed(() => {
  if (!form.pickup_branch_id) return null
  return branchesStore.getBranchById(form.pickup_branch_id)
})

const selectedDeliveryBranch = computed(() => {
  if (!form.delivery_branch_id) return null
  return branchesStore.getBranchById(form.delivery_branch_id)
})

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
  pickup_branch_id: [{ required: true, message: 'Please select a pickup branch', trigger: 'change' }],
  delivery_branch_id: [{ required: true, message: 'Please select a delivery branch', trigger: 'change' }],
  delivery_contact_phone: [{ validator: validatePhone, trigger: 'blur' }],
  delivery_contact_name: [{ required: true, message: 'Recipient name is required', trigger: 'blur' }],
  package_weight: [{ validator: validatePositive, trigger: 'blur' }],
  price: [{ validator: validatePositive, trigger: 'blur' }],
  package_description: [{ required: true, message: 'Package description is required', trigger: 'blur' }]
}

onMounted(async () => {
  // Fetch branches first
  await branchesStore.fetchBranches()

  // Check if company has minimum branches required
  if (!branchesStore.hasMinimumBranches) {
    try {
      await ElMessageBox.confirm(
        'You need at least 2 branches to create an order. Would you like to add branches now?',
        'Branches Required',
        {
          confirmButtonText: 'Go to Branches',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
      router.push('/company/branches')
    } catch (error) {
      // User cancelled, go back
      router.back()
    }
    return
  }

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

  // Validate that pickup and delivery are different
  if (form.pickup_branch_id === form.delivery_branch_id) {
    notification.error('Pickup and delivery branches must be different')
    return
  }

  loading.value = true
  try {
    // Send order data with branch IDs (addresses come from branches)
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
