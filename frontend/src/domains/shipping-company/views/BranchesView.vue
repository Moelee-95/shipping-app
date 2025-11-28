<template>
  <div class="branches-view">
    <PageHeader
      title="Branch Management"
      subtitle="Manage your company's branch locations"
    >
      <template #actions>
        <el-button type="primary" @click="handleAddBranch">
          <v-icon>mdi-plus</v-icon>
          Add Branch
        </el-button>
      </template>
    </PageHeader>

    <!-- Search and Info -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <el-input
          v-model="searchQuery"
          placeholder="Search branches by name, city, or state..."
          clearable
          @input="handleSearch"
        >
          <template #prefix>
            <v-icon size="small">mdi-magnify</v-icon>
          </template>
        </el-input>
      </v-col>
      <v-col cols="12" md="6">
        <v-alert
          v-if="!branchesStore.hasMinimumBranches"
          type="warning"
          variant="tonal"
          density="compact"
        >
          <v-icon start>mdi-alert</v-icon>
          You need at least 2 branches to create orders
        </v-alert>
      </v-col>
    </v-row>

    <!-- Branches List -->
    <v-row>
      <v-col
        v-for="branch in branchesStore.filteredBranches"
        :key="branch.id"
        cols="12"
        md="6"
        lg="4"
      >
        <el-card shadow="hover" class="branch-card">
          <div class="branch-header">
            <div class="d-flex align-center">
              <v-icon
                :color="branch.is_primary ? 'warning' : 'primary'"
                size="32"
                class="mr-3"
              >
                mdi-office-building
              </v-icon>
              <div class="flex-grow-1">
                <h3 class="branch-name">{{ branch.name }}</h3>
                <v-chip
                  v-if="branch.is_primary"
                  size="x-small"
                  color="warning"
                  class="mt-1"
                >
                  Primary Branch
                </v-chip>
              </div>
            </div>
          </div>

          <v-divider class="my-3" />

          <div class="branch-details">
            <div class="detail-item">
              <v-icon size="18" class="mr-2">mdi-map-marker</v-icon>
              <span class="detail-text">{{ branch.address }}</span>
            </div>
            <div class="detail-item">
              <v-icon size="18" class="mr-2">mdi-city</v-icon>
              <span class="detail-text">{{ branch.city }}, {{ branch.state }} {{ branch.zip_code }}</span>
            </div>
            <div class="detail-item">
              <v-icon size="18" class="mr-2">mdi-phone</v-icon>
              <span class="detail-text">{{ branch.phone }}</span>
            </div>
            <div class="detail-item">
              <v-icon size="18" class="mr-2">mdi-account</v-icon>
              <span class="detail-text">{{ branch.contact_person }}</span>
            </div>
          </div>

          <template #footer>
            <div class="branch-actions">
              <el-button
                v-if="!branch.is_primary"
                size="small"
                text
                @click="handleSetPrimary(branch)"
              >
                <v-icon size="small">mdi-star</v-icon>
                Set as Primary
              </el-button>
              <el-button
                size="small"
                text
                type="primary"
                @click="handleEdit(branch)"
              >
                <v-icon size="small">mdi-pencil</v-icon>
                Edit
              </el-button>
              <el-button
                v-if="!branch.is_primary && branchesStore.branches.length > 2"
                size="small"
                text
                type="danger"
                @click="handleDelete(branch)"
              >
                <v-icon size="small">mdi-delete</v-icon>
                Delete
              </el-button>
            </div>
          </template>
        </el-card>
      </v-col>

      <!-- Empty State -->
      <v-col v-if="!branchesStore.loading && !branchesStore.hasBranches" cols="12">
        <v-card class="text-center pa-8">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-office-building-outline</v-icon>
          <h3 class="text-h6 mb-2">No Branches Yet</h3>
          <p class="text-body-2 text-grey mb-4">Add your company branches to start creating orders</p>
          <el-button type="primary" @click="handleAddBranch">
            <v-icon>mdi-plus</v-icon>
            Add Your First Branch
          </el-button>
        </v-card>
      </v-col>

      <!-- Loading State -->
      <v-col v-if="branchesStore.loading" cols="12">
        <div class="text-center pa-8">
          <v-progress-circular indeterminate color="primary" size="48" />
          <p class="text-body-2 text-grey mt-4">Loading branches...</p>
        </div>
      </v-col>
    </v-row>

    <!-- Branch Dialog -->
    <BranchDialog
      v-model="dialogVisible"
      :branch="selectedBranch"
      @saved="handleBranchSaved"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useBranchesStore } from '../store/branches.store'
import PageHeader from '@/shared/components/common/PageHeader.vue'
import BranchDialog from '../components/BranchDialog.vue'

const branchesStore = useBranchesStore()

const dialogVisible = ref(false)
const selectedBranch = ref(null)
const searchQuery = ref('')

onMounted(async () => {
  await branchesStore.fetchBranches()
})

const handleSearch = (query) => {
  branchesStore.setSearchQuery(query)
}

const handleAddBranch = () => {
  selectedBranch.value = null
  dialogVisible.value = true
}

const handleEdit = (branch) => {
  selectedBranch.value = { ...branch }
  dialogVisible.value = true
}

const handleSetPrimary = async (branch) => {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to set "${branch.name}" as the primary branch?`,
      'Set Primary Branch',
      {
        confirmButtonText: 'Yes, Set as Primary',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    )

    await branchesStore.setPrimaryBranch(branch.id)
  } catch (error) {
    // User cancelled
  }
}

const handleDelete = async (branch) => {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete "${branch.name}"? This action cannot be undone.`,
      'Delete Branch',
      {
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel',
        type: 'error',
        confirmButtonClass: 'el-button--danger'
      }
    )

    await branchesStore.deleteBranch(branch.id)
  } catch (error) {
    // User cancelled
  }
}

const handleBranchSaved = () => {
  dialogVisible.value = false
  selectedBranch.value = null
}
</script>

<style scoped>
.branches-view {
  padding: 0;
}

.branch-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.branch-card :deep(.el-card__body) {
  flex: 1;
}

.branch-header {
  margin-bottom: 8px;
}

.branch-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #212121;
  margin: 0;
  line-height: 1.3;
}

.branch-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  color: #757575;
  font-size: 0.875rem;
}

.detail-text {
  flex: 1;
  line-height: 1.4;
}

.branch-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 12px;
}
</style>
