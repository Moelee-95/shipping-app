import { defineStore } from 'pinia'
import branchesService from '../services/branches.service'
import { useToast } from 'vue-toastification'

export const useBranchesStore = defineStore('branches', {
  state: () => ({
    branches: [],
    currentBranch: null,
    loading: false,
    searchQuery: ''
  }),

  getters: {
    hasBranches: (state) => state.branches.length > 0,
    hasMinimumBranches: (state) => state.branches.length >= 2,
    primaryBranch: (state) => state.branches.find(b => b.is_primary),

    // Get branches as options for select dropdown
    branchOptions: (state) => state.branches.map(branch => ({
      value: branch.id,
      label: `${branch.name} - ${branch.city}, ${branch.state}`,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      zip_code: branch.zip_code,
      phone: branch.phone
    })),

    // Get filtered branches
    filteredBranches: (state) => {
      if (!state.searchQuery) return state.branches

      const query = state.searchQuery.toLowerCase()
      return state.branches.filter(branch =>
        branch.name.toLowerCase().includes(query) ||
        branch.city.toLowerCase().includes(query) ||
        branch.state.toLowerCase().includes(query) ||
        branch.address.toLowerCase().includes(query)
      )
    }
  },

  actions: {
    async fetchBranches(params = {}) {
      this.loading = true
      try {
        const response = await branchesService.getBranches(params)
        this.branches = response.data.data || response.data.branches || []
        return response
      } catch (error) {
        console.error('Error fetching branches:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchBranch(branchId) {
      this.loading = true
      try {
        const response = await branchesService.getBranch(branchId)
        this.currentBranch = response.data.data || response.data.branch
        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async createBranch(branchData) {
      const toast = useToast()
      this.loading = true
      try {
        const response = await branchesService.createBranch(branchData)
        toast.success('Branch created successfully')
        await this.fetchBranches()
        return response
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to create branch'
        toast.error(message)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateBranch(branchId, branchData) {
      const toast = useToast()
      this.loading = true
      try {
        const response = await branchesService.updateBranch(branchId, branchData)
        toast.success('Branch updated successfully')
        await this.fetchBranches()
        return response
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to update branch'
        toast.error(message)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteBranch(branchId) {
      const toast = useToast()
      this.loading = true
      try {
        const response = await branchesService.deleteBranch(branchId)
        toast.success('Branch deleted successfully')
        await this.fetchBranches()
        return response
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete branch'
        toast.error(message)
        throw error
      } finally {
        this.loading = false
      }
    },

    async setPrimaryBranch(branchId) {
      const toast = useToast()
      this.loading = true
      try {
        const response = await branchesService.setPrimaryBranch(branchId)
        toast.success('Primary branch updated')
        await this.fetchBranches()
        return response
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to update primary branch'
        toast.error(message)
        throw error
      } finally {
        this.loading = false
      }
    },

    getBranchById(branchId) {
      return this.branches.find(b => b.id === branchId)
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },

    clearSearch() {
      this.searchQuery = ''
    }
  }
})
