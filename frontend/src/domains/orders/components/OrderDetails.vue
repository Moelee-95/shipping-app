<script setup>
import { computed } from 'vue'
import { formatCurrency, formatDate, formatDateTime, formatOrderStatus, getStatusColor, formatWeight } from '@/shared/utils/formatters'
import { ORDER_STATUS } from '@/shared/utils/constants'

const props = defineProps({
  order: {
    type: Object,
    required: true
  },
  showStatusActions: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update-status', 'cancel'])

const statusSteps = computed(() => {
  const steps = [
    { status: ORDER_STATUS.PENDING, label: 'Pending', icon: 'mdi-clock-outline' },
    { status: ORDER_STATUS.ACCEPTED, label: 'Accepted', icon: 'mdi-check' },
    { status: ORDER_STATUS.PICKED_UP, label: 'Picked Up', icon: 'mdi-package-variant' },
    { status: ORDER_STATUS.IN_TRANSIT, label: 'In Transit', icon: 'mdi-truck' },
    { status: ORDER_STATUS.DELIVERED, label: 'Delivered', icon: 'mdi-check-circle' }
  ]
  return steps
})

const currentStepIndex = computed(() => {
  if (props.order.status === ORDER_STATUS.CANCELLED) return -1
  return statusSteps.value.findIndex((s) => s.status === props.order.status)
})

const nextStatus = computed(() => {
  if (currentStepIndex.value < 0 || currentStepIndex.value >= statusSteps.value.length - 1) {
    return null
  }
  return statusSteps.value[currentStepIndex.value + 1]
})
</script>

<template>
  <div class="order-details">
    <!-- Status Timeline -->
    <v-card
      class="mb-4"
      elevation="2"
    >
      <v-card-title>Order Status</v-card-title>
      <v-card-text>
        <div
          v-if="order.status === ORDER_STATUS.CANCELLED"
          class="text-center py-4"
        >
          <v-icon
            icon="mdi-close-circle"
            size="64"
            color="error"
            class="mb-2"
          />
          <div class="text-h6 text-error">Order Cancelled</div>
          <div
            v-if="order.cancellation_reason"
            class="text-body-2 text-grey mt-2"
          >
            Reason: {{ order.cancellation_reason }}
          </div>
        </div>
        <v-timeline
          v-else
          density="compact"
          side="end"
        >
          <v-timeline-item
            v-for="(step, index) in statusSteps"
            :key="step.status"
            :dot-color="index <= currentStepIndex ? 'primary' : 'grey-lighten-2'"
            :icon="step.icon"
            size="small"
          >
            <div :class="{ 'font-weight-bold': index === currentStepIndex }">
              {{ step.label }}
            </div>
          </v-timeline-item>
        </v-timeline>

        <div
          v-if="showStatusActions && nextStatus && order.status !== ORDER_STATUS.CANCELLED"
          class="mt-4 text-center"
        >
          <v-btn
            color="primary"
            @click="emit('update-status', nextStatus.status)"
          >
            Mark as {{ nextStatus.label }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Order Information -->
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card elevation="2">
          <v-card-title>
            <v-icon
              icon="mdi-map-marker"
              class="mr-2"
            />
            Pickup Details
          </v-card-title>
          <v-card-text>
            <div class="mb-2">
              <div class="text-caption text-grey">Address</div>
              <div>{{ order.pickup_address }}</div>
            </div>
            <div class="mb-2">
              <div class="text-caption text-grey">City</div>
              <div>{{ order.pickup_city }}</div>
            </div>
            <div>
              <div class="text-caption text-grey">Pickup Date</div>
              <div>{{ formatDate(order.pickup_date) }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-card elevation="2">
          <v-card-title>
            <v-icon
              icon="mdi-map-marker-check"
              class="mr-2"
            />
            Delivery Details
          </v-card-title>
          <v-card-text>
            <div class="mb-2">
              <div class="text-caption text-grey">Address</div>
              <div>{{ order.delivery_address }}</div>
            </div>
            <div>
              <div class="text-caption text-grey">City</div>
              <div>{{ order.delivery_city }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Package Information -->
    <v-card
      class="mt-4"
      elevation="2"
    >
      <v-card-title>
        <v-icon
          icon="mdi-package-variant"
          class="mr-2"
        />
        Package Information
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="6"
            sm="3"
          >
            <div class="text-caption text-grey">Description</div>
            <div>{{ order.package_description }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="3"
          >
            <div class="text-caption text-grey">Weight</div>
            <div>{{ formatWeight(order.weight) }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="3"
          >
            <div class="text-caption text-grey">Dimensions</div>
            <div>{{ order.dimensions || 'N/A' }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="3"
          >
            <div class="text-caption text-grey">Price</div>
            <div class="text-h6 text-primary">{{ formatCurrency(order.price) }}</div>
          </v-col>
        </v-row>
        <div
          v-if="order.notes"
          class="mt-4"
        >
          <div class="text-caption text-grey">Notes</div>
          <div>{{ order.notes }}</div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Additional Info -->
    <v-card
      class="mt-4"
      elevation="2"
    >
      <v-card-title>
        <v-icon
          icon="mdi-information"
          class="mr-2"
        />
        Additional Information
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="6"
            sm="4"
          >
            <div class="text-caption text-grey">Created At</div>
            <div>{{ formatDateTime(order.created_at) }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <div class="text-caption text-grey">Updated At</div>
            <div>{{ formatDateTime(order.updated_at) }}</div>
          </v-col>
          <v-col
            v-if="order.driver"
            cols="12"
            sm="4"
          >
            <div class="text-caption text-grey">Driver</div>
            <div>{{ order.driver.name }}</div>
          </v-col>
          <v-col
            v-if="order.company"
            cols="12"
            sm="4"
          >
            <div class="text-caption text-grey">Company</div>
            <div>{{ order.company.company_name || order.company.name }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
