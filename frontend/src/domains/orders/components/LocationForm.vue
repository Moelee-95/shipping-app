<template>
  <div class="location-form">
    <!-- Branch Selection -->
    <el-row :gutter="24" class="branch-row">
      <el-col :xs="24" :lg="12">
        <div class="branch-card pickup-card">
          <div class="branch-header">
            <el-icon class="branch-icon" :size="24" color="#67c23a">
              <Location />
            </el-icon>
            <span class="branch-title">Pickup Branch</span>
          </div>
          <el-form-item prop="pickup_branch_id">
            <el-select
              :model-value="modelValue.pickup_branch_id"
              @update:model-value="updateField('pickup_branch_id', $event)"
              placeholder="Select pickup branch"
              filterable
              size="large"
              class="full-width"
              :disabled="disabled"
            >
              <el-option
                v-for="branch in branches"
                :key="branch.value"
                :label="branch.label"
                :value="branch.value"
              >
                <div class="branch-option">
                  <span class="branch-name">{{ branch.label }}</span>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
          <el-alert
            v-if="selectedPickupBranch"
            type="success"
            :closable="false"
            class="branch-info"
          >
            <div class="branch-details">
              <p><el-icon><Location /></el-icon> {{ selectedPickupBranch.address }}</p>
              <p><el-icon><Location /></el-icon> {{ selectedPickupBranch.city }}, {{ selectedPickupBranch.state }} {{ selectedPickupBranch.zip_code }}</p>
              <p><el-icon><Phone /></el-icon> {{ selectedPickupBranch.phone }}</p>
            </div>
          </el-alert>
        </div>
      </el-col>

      <el-col :xs="24" :lg="12">
        <div class="branch-card delivery-card">
          <div class="branch-header">
            <el-icon class="branch-icon" :size="24" color="#f56c6c">
              <LocationFilled />
            </el-icon>
            <span class="branch-title">Delivery Branch</span>
          </div>
          <el-form-item prop="delivery_branch_id">
            <el-select
              :model-value="modelValue.delivery_branch_id"
              @update:model-value="updateField('delivery_branch_id', $event)"
              placeholder="Select delivery branch"
              filterable
              size="large"
              class="full-width"
              :disabled="disabled"
            >
              <el-option
                v-for="branch in branches"
                :key="branch.value"
                :label="branch.label"
                :value="branch.value"
                :disabled="branch.value === modelValue.pickup_branch_id"
              >
                <div class="branch-option">
                  <span class="branch-name">{{ branch.label }}</span>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
          <el-alert
            v-if="selectedDeliveryBranch"
            type="error"
            :closable="false"
            class="branch-info"
          >
            <div class="branch-details">
              <p><el-icon><Location /></el-icon> {{ selectedDeliveryBranch.address }}</p>
              <p><el-icon><Location /></el-icon> {{ selectedDeliveryBranch.city }}, {{ selectedDeliveryBranch.state }} {{ selectedDeliveryBranch.zip_code }}</p>
              <p><el-icon><Phone /></el-icon> {{ selectedDeliveryBranch.phone }}</p>
            </div>
          </el-alert>
        </div>
      </el-col>
    </el-row>

    <!-- Recipient Information -->
    <el-divider content-position="left">
      <el-icon><User /></el-icon>
      <span class="divider-text">Recipient Information</span>
    </el-divider>

    <el-row :gutter="20">
      <el-col :xs="24" :md="12">
        <el-form-item label="Recipient Name" prop="delivery_contact_name">
          <el-input
            :model-value="modelValue.delivery_contact_name"
            @update:model-value="updateField('delivery_contact_name', $event)"
            placeholder="Full name of recipient"
            :prefix-icon="User"
            size="large"
            clearable
            :disabled="disabled"
          />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="12">
        <PhoneInput
          :model-value="modelValue.delivery_contact_phone"
          @update:model-value="updateField('delivery_contact_phone', $event)"
          label="Recipient Phone"
          placeholder="(555) 123-4567"
          :disabled="disabled"
          :required="true"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Location, LocationFilled, User } from '@element-plus/icons-vue'
import PhoneInput from '@/shared/components/form/PhoneInput.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  branches: {
    type: Array,
    default: () => []
  },
  branchesById: {
    type: Object,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedPickupBranch = computed(() => {
  if (!props.modelValue.pickup_branch_id) return null
  return props.branchesById[props.modelValue.pickup_branch_id]
})

const selectedDeliveryBranch = computed(() => {
  if (!props.modelValue.delivery_branch_id) return null
  return props.branchesById[props.modelValue.delivery_branch_id]
})

const updateField = (field, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}
</script>

<style scoped>
.branch-row {
  margin-bottom: 16px;
}

.branch-card {
  padding: 16px;
  border: 2px solid #ebeef5;
  border-radius: 8px;
  background: #fafafa;
  transition: all 0.3s ease;
}

.branch-card:hover {
  border-color: #409eff;
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

.pickup-card:hover {
  border-color: #67c23a;
  box-shadow: 0 4px 12px rgba(103, 194, 58, 0.15);
}

.delivery-card:hover {
  border-color: #f56c6c;
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.15);
}

.branch-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.branch-icon {
  display: flex;
}

.branch-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}

.full-width {
  width: 100%;
}

.branch-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.branch-name {
  font-weight: 500;
}

.branch-info {
  margin-top: 12px;
  border-radius: 8px;
}

.branch-details p {
  margin: 8px 0;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.divider-text {
  margin-left: 8px;
  font-weight: 500;
  color: #606266;
}

@media (max-width: 768px) {
  .branch-card {
    margin-bottom: 16px;
  }
}
</style>
