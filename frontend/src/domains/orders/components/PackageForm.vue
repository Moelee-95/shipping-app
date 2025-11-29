<template>
  <div class="package-form">
    <el-row :gutter="20">
      <el-col :xs="24" :md="8">
        <el-form-item label="Weight (kg)" prop="package_weight">
          <el-input-number
            :model-value="modelValue.package_weight"
            @update:model-value="updateField('package_weight', $event)"
            :min="0.1"
            :step="0.1"
            :precision="2"
            placeholder="0.0"
            size="large"
            class="full-width"
            controls-position="right"
            :disabled="disabled"
          />
          <div class="field-hint">
            <el-icon><InfoFilled /></el-icon>
            Minimum 0.1 kg
          </div>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Dimensions" prop="package_dimensions">
          <el-input
            :model-value="modelValue.package_dimensions"
            @update:model-value="updateField('package_dimensions', $event)"
            placeholder="e.g., 10x20x30 cm"
            :prefix-icon="Box"
            size="large"
            clearable
            :disabled="disabled"
          />
          <div class="field-hint">
            <el-icon><InfoFilled /></el-icon>
            Length x Width x Height
          </div>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Price ($)" prop="price">
          <el-input-number
            :model-value="modelValue.price"
            @update:model-value="updateField('price', $event)"
            :min="1"
            :step="0.01"
            :precision="2"
            placeholder="0.00"
            size="large"
            class="full-width"
            controls-position="right"
            :disabled="disabled"
          />
          <div class="field-hint">
            <el-icon><InfoFilled /></el-icon>
            Shipping cost
          </div>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="Package Description" prop="package_description">
          <el-input
            :model-value="modelValue.package_description"
            @update:model-value="updateField('package_description', $event)"
            type="textarea"
            :rows="5"
            placeholder="Describe the package contents, special handling requirements, and any important notes..."
            maxlength="500"
            show-word-limit
            size="large"
            :disabled="disabled"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Box, InfoFilled } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const updateField = (field, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}
</script>

<style scoped>
.full-width {
  width: 100%;
}

.field-hint {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}
</style>
