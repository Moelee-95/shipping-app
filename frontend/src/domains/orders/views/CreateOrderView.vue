<template>
  <div class="create-order-view">
    <!-- Page Header -->
    <div class="page-header">
      <el-page-header @back="goBack">
        <template #content>
          <div class="header-content">
            <h1 class="page-title">{{ isEditing ? 'Edit Order' : 'Create New Order' }}</h1>
            <p class="page-subtitle">{{ isEditing ? 'Update order details' : 'Follow the steps to create your shipping order' }}</p>
          </div>
        </template>
      </el-page-header>
    </div>

    <!-- Main Form Container -->
    <div class="form-container">
      <!-- Steps Progress -->
      <el-card class="steps-card" shadow="never">
        <el-steps :active="isEditing ? 3 : currentStep" align-center finish-status="success">
          <el-step title="Locations" description="Pickup & Delivery">
            <template #icon>
              <el-icon :size="24"><LocationFilled /></el-icon>
            </template>
          </el-step>
          <el-step title="Package" description="Details & Pricing">
            <template #icon>
              <el-icon :size="24"><Box /></el-icon>
            </template>
          </el-step>
          <el-step title="Finalize" description="Review & Submit">
            <template #icon>
              <el-icon :size="24"><Check /></el-icon>
            </template>
          </el-step>
        </el-steps>
      </el-card>

      <!-- Form Steps Content -->
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-position="top"
        size="large"
        class="order-form"
      >
        <!-- Step 1: Branch Selection & Recipient -->
        <transition name="slide-fade" mode="out-in">
          <el-card v-show="currentStep === 0" class="step-card" shadow="hover">
            <template #header>
              <div class="step-header">
                <div class="step-number">1</div>
                <div class="step-info">
                  <h3 class="step-title">Pickup & Delivery Locations</h3>
                  <p class="step-description">Select the branch locations for pickup and delivery</p>
                </div>
              </div>
            </template>

            <div class="step-content">
              <LocationForm
                :model-value="form"
                @update:model-value="updateForm"
                :branches="branchesStore.branchOptions"
                :branches-by-id="branchesById"
              />
            </div>
          </el-card>
        </transition>

        <!-- Step 2: Package Details -->
        <transition name="slide-fade" mode="out-in">
          <el-card v-show="currentStep === 1" class="step-card" shadow="hover">
            <template #header>
              <div class="step-header">
                <div class="step-number">2</div>
                <div class="step-info">
                  <h3 class="step-title">Package Information</h3>
                  <p class="step-description">Enter package details and pricing</p>
                </div>
              </div>
            </template>

            <div class="step-content">
              <PackageForm
                :model-value="form"
                @update:model-value="updateForm"
              />
            </div>
          </el-card>
        </transition>

        <!-- Step 3: Additional Information & Review -->
        <transition name="slide-fade" mode="out-in">
          <el-card v-show="currentStep === 2" class="step-card" shadow="hover">
            <template #header>
              <div class="step-header">
                <div class="step-number">3</div>
                <div class="step-info">
                  <h3 class="step-title">Review & Finalize</h3>
                  <p class="step-description">Add notes and review your order</p>
                </div>
              </div>
            </template>

            <div class="step-content">
              <!-- Additional Notes -->
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="Notes for Driver (Optional)">
                    <el-input
                      v-model="form.notes"
                      type="textarea"
                      :rows="4"
                      placeholder="Any special instructions for the driver (delivery time preferences, access codes, etc.)..."
                      maxlength="300"
                      show-word-limit
                      size="large"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- Order Summary -->
              <el-divider content-position="left">
                <el-icon><Document /></el-icon>
                <span class="divider-text">Order Summary</span>
              </el-divider>

              <div class="order-summary">
                <el-row :gutter="16">
                  <el-col :xs="24" :md="12">
                    <div class="summary-section">
                      <h4 class="summary-title">
                        <el-icon color="#67c23a"><Location /></el-icon>
                        Pickup Location
                      </h4>
                      <div class="summary-content" v-if="selectedPickupBranch">
                        <p class="summary-item"><strong>{{ selectedPickupBranch.name }}</strong></p>
                        <p class="summary-item">{{ selectedPickupBranch.address }}</p>
                        <p class="summary-item">{{ selectedPickupBranch.city }}, {{ selectedPickupBranch.state }} {{ selectedPickupBranch.zip_code }}</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :md="12">
                    <div class="summary-section">
                      <h4 class="summary-title">
                        <el-icon color="#f56c6c"><LocationFilled /></el-icon>
                        Delivery Location
                      </h4>
                      <div class="summary-content" v-if="selectedDeliveryBranch">
                        <p class="summary-item"><strong>{{ selectedDeliveryBranch.name }}</strong></p>
                        <p class="summary-item">{{ selectedDeliveryBranch.address }}</p>
                        <p class="summary-item">{{ selectedDeliveryBranch.city }}, {{ selectedDeliveryBranch.state }} {{ selectedDeliveryBranch.zip_code }}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>

                <el-row :gutter="16" class="mt-3">
                  <el-col :xs="24" :md="12">
                    <div class="summary-section">
                      <h4 class="summary-title">
                        <el-icon color="#409eff"><User /></el-icon>
                        Recipient Details
                      </h4>
                      <div class="summary-content">
                        <p class="summary-item"><strong>{{ form.delivery_contact_name }}</strong></p>
                        <p class="summary-item">{{ form.delivery_contact_phone }}</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :md="12">
                    <div class="summary-section">
                      <h4 class="summary-title">
                        <el-icon color="#e6a23c"><Box /></el-icon>
                        Package Information
                      </h4>
                      <div class="summary-content">
                        <p class="summary-item"><strong>Weight:</strong> {{ form.package_weight }} kg</p>
                        <p class="summary-item" v-if="form.package_dimensions"><strong>Dimensions:</strong> {{ form.package_dimensions }}</p>
                        <p class="summary-item price-item"><strong>Price:</strong> ${{ form.price?.toFixed(2) }}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>

                <el-row :gutter="16" class="mt-3" v-if="form.package_description">
                  <el-col :span="24">
                    <div class="summary-section">
                      <h4 class="summary-title">
                        <el-icon color="#909399"><Document /></el-icon>
                        Description
                      </h4>
                      <div class="summary-content">
                        <p class="summary-item">{{ form.package_description }}</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </transition>

        <!-- Navigation Buttons -->
        <div class="form-navigation">
          <el-button
            v-if="currentStep > 0"
            size="large"
            @click="previousStep"
          >
            <template #icon>
              <el-icon><ArrowLeft /></el-icon>
            </template>
            Previous
          </el-button>
          <div class="spacer"></div>
          <el-button
            size="large"
            @click="goBack"
          >
            <template #icon>
              <el-icon><Close /></el-icon>
            </template>
            Cancel
          </el-button>

          <!-- Edit Mode: Show Next/Previous navigation + Update button on all steps -->
          <template v-if="isEditing">
            <el-button
              v-if="currentStep < 2"
              type="primary"
              size="large"
              @click="nextStep"
            >
              Next
              <template #icon>
                <el-icon><ArrowRight /></el-icon>
              </template>
            </el-button>
            <el-button
              type="success"
              size="large"
              :loading="loading"
              @click="handleSubmit"
            >
              <template #icon>
                <el-icon v-if="!loading"><Check /></el-icon>
              </template>
              Update Order
            </el-button>
          </template>

          <!-- Create Mode: Show Next button on steps 0-1, Create button on step 2 -->
          <template v-else>
            <el-button
              v-if="currentStep < 2"
              type="primary"
              size="large"
              @click="nextStep"
            >
              Next
              <template #icon>
                <el-icon><ArrowRight /></el-icon>
              </template>
            </el-button>
            <el-button
              v-else
              type="primary"
              size="large"
              :loading="loading"
              @click="handleSubmit"
            >
              <template #icon>
                <el-icon v-if="!loading"><Check /></el-icon>
              </template>
              Create Order
            </el-button>
          </template>
        </div>
      </el-form>
    </div>

    <!-- Success Dialog -->
    <el-dialog
      v-model="showSuccessDialog"
      title="Success!"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      align-center
    >
      <div class="success-content">
        <el-result icon="success" title="Order Created Successfully!">
          <template #sub-title>
            <p>Your order has been created and is now available for drivers to accept.</p>
            <p class="next-action">What would you like to do next?</p>
          </template>
        </el-result>
      </div>
      <template #footer>
        <div class="dialog-actions">
          <el-button size="large" @click="createAnotherOrder">
            <template #icon>
              <el-icon><Plus /></el-icon>
            </template>
            Create Another Order
          </el-button>
          <el-button type="primary" size="large" @click="goToManageOrders">
            <template #icon>
              <el-icon><List /></el-icon>
            </template>
            Manage Orders
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  Location,
  LocationFilled,
  User,
  Phone,
  Box,
  Document,
  Close,
  Check,
  Plus,
  List,
  ArrowLeft,
  ArrowRight,
  InfoFilled
} from '@element-plus/icons-vue'
import { useOrdersStore } from '../store/orders.store'
import { useBranchesStore } from '@/domains/shipping-company/store/branches.store'
import { useNotification } from '@/shared/composables/useNotification'
import LocationForm from '../components/LocationForm.vue'
import PackageForm from '../components/PackageForm.vue'

const router = useRouter()
const route = useRoute()
const ordersStore = useOrdersStore()
const branchesStore = useBranchesStore()
const notification = useNotification()

const formRef = ref(null)
const loading = ref(false)
const showSuccessDialog = ref(false)
const currentStep = ref(0)

const orderId = computed(() => route.params.id)
const isEditing = computed(() => route.name === 'EditOrder' && !!orderId.value)

const initialForm = {
  pickup_branch_id: null,
  delivery_branch_id: null,
  delivery_contact_name: '',
  delivery_contact_phone: '',
  package_weight: null,
  package_dimensions: '',
  price: null,
  package_description: '',
  notes: ''
}

const form = reactive({ ...initialForm })

// Computed properties for branches
const branchesById = computed(() => {
  const map = {}
  branchesStore.branches.forEach(branch => {
    map[branch.id] = branch
  })
  return map
})

const selectedPickupBranch = computed(() => {
  if (!form.pickup_branch_id) return null
  return branchesStore.getBranchById(form.pickup_branch_id)
})

const selectedDeliveryBranch = computed(() => {
  if (!form.delivery_branch_id) return null
  return branchesStore.getBranchById(form.delivery_branch_id)
})

const updateForm = (updatedData) => {
  Object.keys(updatedData).forEach(key => {
    form[key] = updatedData[key]
  })
}

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

// Step fields mapping
const stepFields = [
  ['pickup_branch_id', 'delivery_branch_id', 'delivery_contact_name', 'delivery_contact_phone'],
  ['package_weight', 'price', 'package_description'],
  []
]

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
      // Check if order is pending
      if (order.status !== 'pending') {
        ElMessage.warning('Only pending orders can be edited')
        router.push('/company/orders')
        return
      }

      Object.keys(form).forEach(key => {
        if (order[key] !== undefined) {
          form[key] = order[key]
        }
      })
    }
  }
})

const validateStep = async (step) => {
  if (!formRef.value) return false

  const fields = stepFields[step]
  if (fields.length === 0) return true

  try {
    await formRef.value.validateField(fields)

    // Additional validation for step 0
    if (step === 0) {
      if (form.pickup_branch_id === form.delivery_branch_id) {
        ElMessage.error('Pickup and delivery branches must be different')
        return false
      }
    }

    return true
  } catch (error) {
    ElMessage.warning('Please fill in all required fields correctly')
    return false
  }
}

const nextStep = async () => {
  const isValid = await validateStep(currentStep.value)
  if (isValid && currentStep.value < 2) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
  } catch (error) {
    ElMessage.error('Please complete all required fields')
    return
  }

  // Validate that pickup and delivery are different
  if (form.pickup_branch_id === form.delivery_branch_id) {
    ElMessage.error('Pickup and delivery branches must be different')
    return
  }

  loading.value = true
  try {
    if (isEditing.value) {
      await ordersStore.updateOrder(orderId.value, form)
      notification.success('Order updated successfully')
      goBack()
    } else {
      await ordersStore.createOrder(form)
      showSuccessDialog.value = true
    }
  } finally {
    loading.value = false
  }
}

const createAnotherOrder = () => {
  showSuccessDialog.value = false
  currentStep.value = 0
  // Reset form to initial state
  Object.keys(initialForm).forEach(key => {
    form[key] = initialForm[key]
  })
  // Reset form validation
  if (formRef.value) {
    formRef.value.resetFields()
  }
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goToManageOrders = () => {
  showSuccessDialog.value = false
  router.push('/company/orders')
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.create-order-view {
  padding: 16px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  min-height: calc(100vh - 64px);
}

.page-header {
  background: white;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header-content {
  margin-left: 8px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px 0;
}

.page-subtitle {
  font-size: 13px;
  color: #909399;
  margin: 0;
}

.form-container {
  max-width: 1000px;
  margin: 0 auto;
}

.steps-card {
  margin-bottom: 8px;
  border-radius: 8px;
  border: none;
}

.steps-card :deep(.el-card__body) {
  padding: 12px 20px;
}

.order-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-card {
  border-radius: 8px;
  border: none;
  min-height: 450px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 3px 8px rgba(64, 158, 255, 0.3);
}

.step-info {
  flex: 1;
}

.step-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 2px 0;
}

.step-description {
  font-size: 13px;
  color: #909399;
  margin: 0;
}

.step-content {
  padding: 16px 0;
}

.order-summary {
  background: #f9fafb;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #ebeef5;
}

.summary-section {
  margin-bottom: 20px;
}

.summary-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 12px 0;
}

.summary-content {
  padding-left: 28px;
}

.summary-item {
  margin: 6px 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}

.price-item {
  font-size: 16px;
  font-weight: 600;
  color: #409eff;
}

.mt-3 {
  margin-top: 20px;
}

.form-navigation {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.spacer {
  flex: 1;
}

.success-content {
  padding: 20px 0;
}

.next-action {
  margin-top: 12px;
  font-weight: 500;
  color: #606266;
}

.dialog-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .create-order-view {
    padding: 16px;
  }

  .page-header {
    padding: 16px;
  }

  .page-title {
    font-size: 22px;
  }

  .step-number {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .step-title {
    font-size: 18px;
  }

  .form-navigation {
    flex-wrap: wrap;
  }

  .form-navigation .el-button {
    flex: 1;
    min-width: 120px;
  }

  .spacer {
    display: none;
  }

  .dialog-actions {
    flex-direction: column;
  }

  .dialog-actions .el-button {
    width: 100%;
  }
}

/* Element Plus Customizations */
:deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
  margin-bottom: 8px;
}

:deep(.el-card__header) {
  background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);
  border-bottom: 2px solid #ebeef5;
  padding: 16px 20px;
}

:deep(.el-input-number) {
  width: 100%;
}

:deep(.el-alert) {
  border-radius: 8px;
}

:deep(.el-result) {
  padding: 20px 0;
}

:deep(.el-steps) {
  padding: 0;
}

:deep(.el-step__title) {
  font-size: 14px;
  font-weight: 600;
}

:deep(.el-step__description) {
  font-size: 12px;
}

:deep(.el-divider__text) {
  background: white;
}
</style>
