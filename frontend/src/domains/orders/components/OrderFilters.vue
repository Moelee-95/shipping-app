<script setup>
import { reactive, watch, ref } from 'vue'
import { ORDER_STATUS_OPTIONS } from '@/shared/utils/constants'
import { US_STATES } from '@/shared/utils/us-states'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  hideStatus: {
    type: Boolean,
    default: false
  },
  showStateFilter: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'search', 'reset'])

const filters = reactive({
  status: '',
  search: '',
  dateFrom: '',
  dateTo: '',
  state: ''
})

const dateRange = ref([])

watch(
  () => props.modelValue,
  (value) => {
    Object.assign(filters, value)
    // Initialize date range from filters
    if (value.dateFrom && value.dateTo) {
      dateRange.value = [new Date(value.dateFrom), new Date(value.dateTo)]
    } else if (value.dateFrom || value.dateTo) {
      dateRange.value = [
        value.dateFrom ? new Date(value.dateFrom) : null,
        value.dateTo ? new Date(value.dateTo) : null
      ]
    }
  },
  { immediate: true }
)

watch(dateRange, (newRange) => {
  if (newRange && newRange.length === 2) {
    filters.dateFrom = newRange[0] ? formatDate(newRange[0]) : ''
    filters.dateTo = newRange[1] ? formatDate(newRange[1]) : ''
  } else {
    filters.dateFrom = ''
    filters.dateTo = ''
  }
})

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const updateFilters = () => {
  emit('update:modelValue', { ...filters })
  emit('search')
}

const resetFilters = () => {
  filters.status = ''
  filters.search = ''
  filters.dateFrom = ''
  filters.dateTo = ''
  filters.state = ''
  dateRange.value = []
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
          <el-input
            v-model="filters.search"
            placeholder="Search"
            clearable
            @keyup.enter="updateFilters"
            @clear="updateFilters"
          >
            <template #prefix>
              <v-icon icon="mdi-magnify" size="small" />
            </template>
          </el-input>
        </v-col>
        <v-col
          v-if="!hideStatus"
          cols="12"
          sm="6"
          md="2"
        >
          <el-select
            v-model="filters.status"
            placeholder="Status"
            clearable
            @change="updateFilters"
            style="width: 100%"
          >
            <el-option
              v-for="option in ORDER_STATUS_OPTIONS"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </v-col>
        <v-col
          v-if="showStateFilter"
          cols="12"
          sm="6"
          md="2"
        >
          <el-select
            v-model="filters.state"
            placeholder="Filter by State"
            clearable
            filterable
            @change="updateFilters"
            style="width: 100%"
          >
            <el-option
              v-for="state in US_STATES"
              :key="state.value"
              :label="`${state.label} (${state.value})`"
              :value="state.value"
            />
          </el-select>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          :md="hideStatus && !showStateFilter ? 4 : showStateFilter && !hideStatus ? 3 : hideStatus ? 3 : 4"
        >
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="to"
            start-placeholder="Start date"
            end-placeholder="End date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
            size="default"
            clearable
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

<style scoped>
/* Component-specific styles if needed */
</style>
