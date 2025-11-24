<template>
  <div class="settings-page">
    <PageHeader
      title="Settings"
      subtitle="Customize your application preferences"
    />

    <v-row>
      <v-col cols="12" md="3">
        <v-card>
          <v-list nav density="comfortable">
            <v-list-item
              v-for="section in sections"
              :key="section.id"
              :prepend-icon="section.icon"
              :title="section.title"
              :active="activeSection === section.id"
              @click="activeSection = section.id"
              rounded="lg"
            />
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <!-- Notifications Settings -->
        <v-card v-if="activeSection === 'notifications'">
          <v-card-title>
            <v-icon icon="mdi-bell" class="mr-2" />
            Notification Preferences
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <template #prepend>
                  <v-icon icon="mdi-email" />
                </template>
                <v-list-item-title>Email Notifications</v-list-item-title>
                <v-list-item-subtitle>Receive order updates via email</v-list-item-subtitle>
                <template #append>
                  <v-switch
                    v-model="settings.emailNotifications"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>

              <v-list-item>
                <template #prepend>
                  <v-icon icon="mdi-cellphone" />
                </template>
                <v-list-item-title>SMS Notifications</v-list-item-title>
                <v-list-item-subtitle>Receive text messages for important updates</v-list-item-subtitle>
                <template #append>
                  <v-switch
                    v-model="settings.smsNotifications"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>

              <v-list-item>
                <template #prepend>
                  <v-icon icon="mdi-bell-ring" />
                </template>
                <v-list-item-title>Push Notifications</v-list-item-title>
                <v-list-item-subtitle>Browser push notifications for real-time updates</v-list-item-subtitle>
                <template #append>
                  <v-switch
                    v-model="settings.pushNotifications"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>

              <v-divider class="my-4" />

              <v-list-subheader>Notify me about</v-list-subheader>

              <v-list-item>
                <v-list-item-title>Order Status Changes</v-list-item-title>
                <template #append>
                  <v-checkbox
                    v-model="settings.notifyOrderStatus"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>New Order Assignments</v-list-item-title>
                <template #append>
                  <v-checkbox
                    v-model="settings.notifyNewOrders"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Delivery Confirmations</v-list-item-title>
                <template #append>
                  <v-checkbox
                    v-model="settings.notifyDeliveries"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Appearance Settings -->
        <v-card v-if="activeSection === 'appearance'">
          <v-card-title>
            <v-icon icon="mdi-palette" class="mr-2" />
            Appearance
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Theme</v-list-item-title>
                <v-list-item-subtitle>Choose your preferred color theme</v-list-item-subtitle>
                <template #append>
                  <v-btn-toggle
                    v-model="settings.theme"
                    mandatory
                    color="primary"
                    density="compact"
                  >
                    <v-btn value="light" icon>
                      <v-icon icon="mdi-white-balance-sunny" />
                    </v-btn>
                    <v-btn value="dark" icon>
                      <v-icon icon="mdi-moon-waning-crescent" />
                    </v-btn>
                    <v-btn value="system" icon>
                      <v-icon icon="mdi-laptop" />
                    </v-btn>
                  </v-btn-toggle>
                </template>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Compact Mode</v-list-item-title>
                <v-list-item-subtitle>Reduce spacing for more content on screen</v-list-item-subtitle>
                <template #append>
                  <v-switch
                    v-model="settings.compactMode"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Sidebar Collapsed by Default</v-list-item-title>
                <v-list-item-subtitle>Start with the sidebar minimized</v-list-item-subtitle>
                <template #append>
                  <v-switch
                    v-model="settings.sidebarCollapsed"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Language & Region Settings -->
        <v-card v-if="activeSection === 'language'">
          <v-card-title>
            <v-icon icon="mdi-translate" class="mr-2" />
            Language & Region
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="settings.language"
                  :items="languages"
                  item-title="name"
                  item-value="code"
                  label="Language"
                  variant="outlined"
                  prepend-inner-icon="mdi-translate"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="settings.timezone"
                  :items="timezones"
                  label="Timezone"
                  variant="outlined"
                  prepend-inner-icon="mdi-clock-outline"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="settings.dateFormat"
                  :items="dateFormats"
                  label="Date Format"
                  variant="outlined"
                  prepend-inner-icon="mdi-calendar"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="settings.currency"
                  :items="currencies"
                  label="Currency"
                  variant="outlined"
                  prepend-inner-icon="mdi-currency-usd"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Privacy Settings -->
        <v-card v-if="activeSection === 'privacy'">
          <v-card-title>
            <v-icon icon="mdi-shield-account" class="mr-2" />
            Privacy
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Profile Visibility</v-list-item-title>
                <v-list-item-subtitle>Control who can see your profile information</v-list-item-subtitle>
                <template #append>
                  <v-select
                    v-model="settings.profileVisibility"
                    :items="['Public', 'Contacts Only', 'Private']"
                    density="compact"
                    variant="outlined"
                    hide-details
                    style="max-width: 150px"
                  />
                </template>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Share Location</v-list-item-title>
                <v-list-item-subtitle>Allow sharing your location for deliveries</v-list-item-subtitle>
                <template #append>
                  <v-switch
                    v-model="settings.shareLocation"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Activity Status</v-list-item-title>
                <v-list-item-subtitle>Show when you're online</v-list-item-subtitle>
                <template #append>
                  <v-switch
                    v-model="settings.showActivityStatus"
                    color="primary"
                    hide-details
                  />
                </template>
              </v-list-item>
            </v-list>

            <v-divider class="my-4" />

            <v-alert type="info" variant="tonal" class="mb-4">
              <v-alert-title>Data & Privacy</v-alert-title>
              You can request a copy of your data or delete your account at any time.
            </v-alert>

            <div class="d-flex gap-2">
              <v-btn variant="outlined" prepend-icon="mdi-download">
                Download My Data
              </v-btn>
              <v-btn variant="outlined" color="error" prepend-icon="mdi-delete">
                Delete Account
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Save Button -->
        <div class="mt-4 d-flex justify-end">
          <v-btn
            color="primary"
            size="large"
            :loading="saving"
            @click="saveSettings"
          >
            Save Settings
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotification } from '@/shared/composables/useNotification'
import PageHeader from '@/shared/components/common/PageHeader.vue'

const notification = useNotification()

const sections = [
  { id: 'notifications', title: 'Notifications', icon: 'mdi-bell' },
  { id: 'appearance', title: 'Appearance', icon: 'mdi-palette' },
  { id: 'language', title: 'Language & Region', icon: 'mdi-translate' },
  { id: 'privacy', title: 'Privacy', icon: 'mdi-shield-account' }
]

const activeSection = ref('notifications')
const saving = ref(false)

const settings = ref({
  // Notifications
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  notifyOrderStatus: true,
  notifyNewOrders: true,
  notifyDeliveries: true,
  // Appearance
  theme: 'light',
  compactMode: false,
  sidebarCollapsed: false,
  // Language
  language: 'en',
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
  currency: 'USD',
  // Privacy
  profileVisibility: 'Contacts Only',
  shareLocation: true,
  showActivityStatus: true
})

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Spanish', code: 'es' },
  { name: 'French', code: 'fr' },
  { name: 'German', code: 'de' },
  { name: 'Arabic', code: 'ar' }
]

const timezones = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Dubai',
  'Asia/Tokyo'
]

const dateFormats = [
  'MM/DD/YYYY',
  'DD/MM/YYYY',
  'YYYY-MM-DD'
]

const currencies = ['USD', 'EUR', 'GBP', 'AED', 'SAR']

const saveSettings = async () => {
  saving.value = true
  try {
    // Mock implementation - save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings.value))
    notification.success('Settings saved successfully!')
  } catch (error) {
    notification.error('Failed to save settings')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.settings-page {
  max-width: 1200px;
}
</style>
