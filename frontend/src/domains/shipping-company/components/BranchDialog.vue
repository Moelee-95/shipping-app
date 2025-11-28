<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isEditing ? 'Edit Branch' : 'Add New Branch'"
    width="600px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="formRules"
      label-position="top"
    >
      <el-form-item label="Branch Name" prop="name">
        <el-input
          v-model="form.name"
          placeholder="e.g., Main Branch - New York"
        >
          <template #prefix>
            <v-icon size="small">mdi-office-building</v-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="Street Address" prop="address">
        <el-input
          v-model="form.address"
          placeholder="Street address, building number, suite"
        >
          <template #prefix>
            <v-icon size="small">mdi-map-marker</v-icon>
          </template>
        </el-input>
      </el-form-item>

      <v-row>
        <v-col cols="12" sm="6">
          <el-form-item label="City" prop="city">
            <el-input
              v-model="form.city"
              placeholder="City"
            />
          </el-form-item>
        </v-col>
        <v-col cols="12" sm="6">
          <el-form-item label="State" prop="state">
            <el-select
              v-model="form.state"
              placeholder="Select State"
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
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <el-form-item label="ZIP Code" prop="zip_code">
            <el-input
              v-model="form.zip_code"
              placeholder="e.g., 10001"
            />
          </el-form-item>
        </v-col>
        <v-col cols="12" sm="6">
          <el-form-item label="Phone" prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="+1 (555) 123-4567"
            >
              <template #prefix>
                <v-icon size="small">mdi-phone</v-icon>
              </template>
            </el-input>
          </el-form-item>
        </v-col>
      </v-row>

      <el-form-item label="Contact Person" prop="contact_person">
        <el-input
          v-model="form.contact_person"
          placeholder="Name of branch manager or contact person"
        >
          <template #prefix>
            <v-icon size="small">mdi-account</v-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button
          type="primary"
          :loading="branchesStore.loading"
          @click="handleSubmit"
        >
          {{ isEditing ? 'Update Branch' : 'Create Branch' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useBranchesStore } from '../store/branches.store'
import { US_STATES } from '@/shared/utils/us-states'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  branch: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'saved'])

const branchesStore = useBranchesStore()

const formRef = ref(null)
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isEditing = computed(() => !!props.branch?.id)

const initialForm = {
  name: '',
  address: '',
  city: '',
  state: '',
  zip_code: '',
  phone: '',
  contact_person: ''
}

const form = ref({ ...initialForm })

const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Phone is required'))
  } else if (!/^[\d\s\-+()]+$/.test(value)) {
    callback(new Error('Invalid phone number'))
  } else {
    callback()
  }
}

const validateZipCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error('ZIP code is required'))
  } else if (!/^\d{5}(-\d{4})?$/.test(value)) {
    callback(new Error('Invalid ZIP code (e.g., 10001 or 10001-1234)'))
  } else {
    callback()
  }
}

const formRules = {
  name: [
    { required: true, message: 'Branch name is required', trigger: 'blur' },
    { min: 3, message: 'Branch name must be at least 3 characters', trigger: 'blur' }
  ],
  address: [
    { required: true, message: 'Address is required', trigger: 'blur' }
  ],
  city: [
    { required: true, message: 'City is required', trigger: 'blur' }
  ],
  state: [
    { required: true, message: 'State is required', trigger: 'change' }
  ],
  zip_code: [
    { validator: validateZipCode, trigger: 'blur' }
  ],
  phone: [
    { validator: validatePhone, trigger: 'blur' }
  ],
  contact_person: [
    { required: true, message: 'Contact person is required', trigger: 'blur' }
  ]
}

// Watch for branch changes to populate form
watch(() => props.branch, (newBranch) => {
  if (newBranch) {
    form.value = { ...newBranch }
  } else {
    form.value = { ...initialForm }
  }
}, { immediate: true })

// Reset form when dialog closes
watch(dialogVisible, (visible) => {
  if (!visible) {
    formRef.value?.resetFields()
    form.value = { ...initialForm }
  }
})

const handleClose = () => {
  dialogVisible.value = false
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
  } catch (error) {
    return
  }

  try {
    if (isEditing.value) {
      await branchesStore.updateBranch(props.branch.id, form.value)
    } else {
      await branchesStore.createBranch(form.value)
    }
    emit('saved')
  } catch (error) {
    // Error already handled by store
  }
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #424242;
}
</style>
