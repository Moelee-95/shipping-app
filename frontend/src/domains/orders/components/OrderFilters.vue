<script setup>
import { reactive, watch } from 'vue'
import { ORDER_STATUS_OPTIONS } from '@/shared/utils/constants'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  hideStatus: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'search', 'reset'])

const filters = reactive({
  status: '',
  search: '',
  dateFrom: '',
  dateTo: ''
})

watch(
  () => props.modelValue,
  (value) => {
    Object.assign(filters, value)
  },
  { immediate: true }
)

const updateFilters = () => {
  emit('update:modelValue', { ...filters })
  emit('search')
}

const resetFilters = () => {
  filters.status = ''
  filters.search = ''
  filters.dateFrom = ''
  filters.dateTo = ''
  emit('update:modelValue', { ...filters })
  emit('reset')
}
</script>

<template>
  <v-card
    class="order-filters mb-4"
    elevation="1"
  >
    <v-card-text>
      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
            v-model="filters.search"
            label="Search"
            variant="outlined"
            density="compact"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            @keyup.enter="updateFilters"
            @click:clear="updateFilters"
          />
        </v-col>
        <v-col
          v-if="!hideStatus"
          cols="12"
          sm="6"
          md="2"
        >
          <v-select
            v-model="filters.status"
            :items="ORDER_STATUS_OPTIONS"
            item-title="label"
            item-value="value"
            label="Status"
            variant="outlined"
            density="compact"
            clearable
            hide-details
            @update:model-value="updateFilters"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="2"
        >
          <v-text-field
            v-model="filters.dateFrom"
            label="From Date"
            type="date"
            variant="outlined"
            density="compact"
            hide-details
            @change="updateFilters"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="2"
        >
          <v-text-field
            v-model="filters.dateTo"
            label="To Date"
            type="date"
            variant="outlined"
            density="compact"
            hide-details
            @change="updateFilters"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <div class="d-flex gap-2">
            <v-btn
              color="primary"
              variant="flat"
              @click="updateFilters"
            >
              <v-icon
                icon="mdi-magnify"
                class="mr-1"
              />
              Search
            </v-btn>
            <v-btn
              variant="outlined"
              @click="resetFilters"
            >
              <v-icon
                icon="mdi-refresh"
                class="mr-1"
              />
              Reset
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
