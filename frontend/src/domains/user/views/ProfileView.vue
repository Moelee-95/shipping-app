<template>
  <div class="profile-page">
    <PageHeader
      title="My Profile"
      subtitle="View and manage your personal information"
    />

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="text-center pa-6">
          <v-avatar size="120" color="primary" class="mb-4">
            <span class="text-h3 text-white">{{ userInitials }}</span>
          </v-avatar>
          <h2 class="text-h5 mb-1">{{ user?.name }}</h2>
          <v-chip :color="roleColor" size="small" class="mb-4">
            {{ formatRole(user?.role) }}
          </v-chip>
          <div class="text-body-2 text-grey mb-4">
            Member since {{ formatDate(user?.created_at || '2024-01-01') }}
          </div>
          <v-btn
            color="primary"
            variant="outlined"
            prepend-icon="mdi-pencil"
            @click="editMode = true"
            v-if="!editMode"
          >
            Edit Profile
          </v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <v-icon icon="mdi-account-details" class="mr-2" />
            Personal Information
          </v-card-title>
          <v-card-text>
            <v-form ref="formRef" v-model="formValid">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.name"
                    label="Full Name"
                    prepend-inner-icon="mdi-account"
                    :readonly="!editMode"
                    :variant="editMode ? 'outlined' : 'plain'"
                    :rules="[v => !!v || 'Name is required']"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    prepend-inner-icon="mdi-email"
                    :readonly="true"
                    variant="plain"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.phone"
                    label="Phone Number"
                    prepend-inner-icon="mdi-phone"
                    :readonly="!editMode"
                    :variant="editMode ? 'outlined' : 'plain'"
                  />
                </v-col>
                <v-col cols="12" sm="6" v-if="user?.role === 'shipping_company'">
                  <v-text-field
                    v-model="form.company_name"
                    label="Company Name"
                    prepend-inner-icon="mdi-domain"
                    :readonly="!editMode"
                    :variant="editMode ? 'outlined' : 'plain'"
                  />
                </v-col>
                <v-col cols="12" sm="6" v-if="user?.role === 'driver'">
                  <v-text-field
                    v-model="form.license_number"
                    label="License Number"
                    prepend-inner-icon="mdi-card-account-details"
                    :readonly="!editMode"
                    :variant="editMode ? 'outlined' : 'plain'"
                  />
                </v-col>
                <v-col cols="12" sm="6" v-if="user?.role === 'driver'">
                  <v-text-field
                    v-model="form.vehicle_type"
                    label="Vehicle Type"
                    prepend-inner-icon="mdi-truck"
                    :readonly="!editMode"
                    :variant="editMode ? 'outlined' : 'plain'"
                  />
                </v-col>
                <v-col cols="12" sm="6" v-if="user?.role === 'driver'">
                  <v-text-field
                    v-model="form.vehicle_plate"
                    label="Vehicle Plate"
                    prepend-inner-icon="mdi-card-text"
                    :readonly="!editMode"
                    :variant="editMode ? 'outlined' : 'plain'"
                  />
                </v-col>
                <v-col cols="12" v-if="user?.role === 'shipping_company'">
                  <v-text-field
                    v-model="form.address"
                    label="Address"
                    prepend-inner-icon="mdi-map-marker"
                    :readonly="!editMode"
                    :variant="editMode ? 'outlined' : 'plain'"
                  />
                </v-col>
                <v-col cols="12" sm="6" v-if="user?.role === 'shipping_company'">
                  <v-text-field
                    v-model="form.city"
                    label="City"
                    prepend-inner-icon="mdi-city"
                    :readonly="!editMode"
                    :variant="editMode ? 'outlined' : 'plain'"
                  />
                </v-col>
                <v-col cols="12" sm="6" v-if="user?.role === 'shipping_company'">
                  <v-text-field
                    v-model="form.state"
                    label="State"
                    prepend-inner-icon="mdi-map"
                    :readonly="!editMode"
                    :variant="editMode ? 'outlined' : 'plain'"
                  />
                </v-col>
                <v-col cols="12" sm="6" v-if="user?.role === 'shipping_company'">
                  <v-text-field
                    v-model="form.zip_code"
                    label="ZIP Code"
                    prepend-inner-icon="mdi-mailbox"
                    :readonly="!editMode"
                    :variant="editMode ? 'outlined' : 'plain'"
                  />
                </v-col>
              </v-row>

              <div v-if="editMode" class="d-flex gap-2 mt-4">
                <v-btn
                  color="primary"
                  :loading="saving"
                  @click="saveProfile"
                >
                  Save Changes
                </v-btn>
                <v-btn
                  variant="outlined"
                  @click="cancelEdit"
                >
                  Cancel
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>
            <v-icon icon="mdi-shield-lock" class="mr-2" />
            Security
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                prepend-icon="mdi-lock"
                title="Change Password"
                subtitle="Update your password to keep your account secure"
              >
                <template #append>
                  <v-btn
                    variant="outlined"
                    size="small"
                    @click="showPasswordDialog = true"
                  >
                    Change
                  </v-btn>
                </template>
              </v-list-item>
              <v-list-item
                prepend-icon="mdi-two-factor-authentication"
                title="Two-Factor Authentication"
                subtitle="Add an extra layer of security to your account"
              >
                <template #append>
                  <v-chip color="warning" size="small">Coming Soon</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Password Change Dialog -->
    <v-dialog v-model="showPasswordDialog" max-width="500">
      <v-card>
        <v-card-title>Change Password</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="passwordForm.current"
            label="Current Password"
            type="password"
            prepend-inner-icon="mdi-lock"
            variant="outlined"
            class="mb-3"
          />
          <v-text-field
            v-model="passwordForm.new"
            label="New Password"
            type="password"
            prepend-inner-icon="mdi-lock-plus"
            variant="outlined"
            class="mb-3"
          />
          <v-text-field
            v-model="passwordForm.confirm"
            label="Confirm New Password"
            type="password"
            prepend-inner-icon="mdi-lock-check"
            variant="outlined"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showPasswordDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="changePassword">Update Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/domains/auth/store/auth.store'
import { useNotification } from '@/shared/composables/useNotification'
import { formatRole } from '@/shared/utils/formatters'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import authService from '@/domains/auth/services/auth.service'

const authStore = useAuthStore()
const notification = useNotification()

const user = computed(() => authStore.user)
const userInitials = computed(() => {
  const name = user.value?.name || 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const roleColor = computed(() => {
  return user.value?.role === 'driver' ? 'success' : 'primary'
})

const editMode = ref(false)
const formValid = ref(true)
const saving = ref(false)
const showPasswordDialog = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  company_name: '',
  license_number: '',
  vehicle_type: '',
  vehicle_plate: '',
  address: '',
  city: '',
  state: '',
  zip_code: ''
})

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

onMounted(() => {
  if (user.value) {
    const userable = user.value.userable || {}
    form.value = {
      name: user.value.name || '',
      email: user.value.email || '',
      phone: userable.phone || '',
      company_name: userable.company_name || '',
      license_number: userable.license_number || '',
      vehicle_type: userable.vehicle_type || '',
      vehicle_plate: userable.vehicle_plate || '',
      address: userable.address || '',
      city: userable.city || '',
      state: userable.state || '',
      zip_code: userable.zip_code || ''
    }
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

const saveProfile = async () => {
  if (!formValid.value) {
    notification.error('Please fill in all required fields correctly')
    return
  }

  saving.value = true
  try {
    const response = await authService.updateProfile(form.value)

    // Update auth store with the new user data
    if (response.data.user) {
      authStore.user = response.data.user
    }

    notification.success('Profile updated successfully!')
    editMode.value = false
  } catch (error) {
    console.error('Profile update error:', error)
    notification.error(error.response?.data?.message || 'Failed to update profile')
  } finally {
    saving.value = false
  }
}

const cancelEdit = () => {
  const userable = user.value?.userable || {}
  form.value = {
    name: user.value?.name || '',
    email: user.value?.email || '',
    phone: userable.phone || '',
    company_name: userable.company_name || '',
    license_number: userable.license_number || '',
    vehicle_type: userable.vehicle_type || '',
    vehicle_plate: userable.vehicle_plate || '',
    address: userable.address || '',
    city: userable.city || '',
    state: userable.state || '',
    zip_code: userable.zip_code || ''
  }
  editMode.value = false
}

const changePassword = async () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    notification.error('Passwords do not match')
    return
  }

  if (passwordForm.value.new.length < 8) {
    notification.error('Password must be at least 8 characters')
    return
  }

  try {
    await authService.updatePassword({
      current_password: passwordForm.value.current,
      password: passwordForm.value.new,
      password_confirmation: passwordForm.value.confirm
    })

    notification.success('Password changed successfully!')
    showPasswordDialog.value = false
    passwordForm.value = { current: '', new: '', confirm: '' }
  } catch (error) {
    console.error('Password update error:', error)
    const errorMessage = error.response?.data?.errors?.current_password?.[0]
      || error.response?.data?.message
      || 'Failed to update password'
    notification.error(errorMessage)
  }
}
</script>

<style scoped>
.profile-page {
  max-width: 1200px;
}
</style>
