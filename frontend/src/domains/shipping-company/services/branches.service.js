import api from '@/shared/utils/api'

const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === 'true'

// Mock data for development
let MOCK_BRANCHES = [
  {
    id: 1,
    name: 'Main Branch - New York',
    address: '123 Main Street, Building A',
    city: 'New York',
    state: 'NY',
    zip_code: '10001',
    phone: '+1 555-0100',
    contact_person: 'John Manager',
    is_primary: true,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },
  {
    id: 2,
    name: 'West Coast Hub - Los Angeles',
    address: '456 Pacific Avenue, Suite 200',
    city: 'Los Angeles',
    state: 'CA',
    zip_code: '90001',
    phone: '+1 555-0200',
    contact_person: 'Jane Supervisor',
    is_primary: false,
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z'
  }
]

export default {
  // Get all branches
  getBranches(params = {}) {
    if (MOCK_AUTH) {
      let branches = [...MOCK_BRANCHES]

      // Apply search filter
      if (params.search) {
        const search = params.search.toLowerCase()
        branches = branches.filter(b =>
          b.name.toLowerCase().includes(search) ||
          b.city.toLowerCase().includes(search) ||
          b.state.toLowerCase().includes(search)
        )
      }

      return Promise.resolve({
        data: {
          data: branches,
          total: branches.length
        }
      })
    }
    return api.get('/company/branches', { params })
  },

  // Get single branch
  getBranch(branchId) {
    if (MOCK_AUTH) {
      const branch = MOCK_BRANCHES.find(b => b.id === parseInt(branchId))
      if (branch) {
        return Promise.resolve({ data: { data: branch } })
      }
      return Promise.reject({ response: { data: { message: 'Branch not found' } } })
    }
    return api.get(`/company/branches/${branchId}`)
  },

  // Create new branch
  createBranch(branchData) {
    if (MOCK_AUTH) {
      const newBranch = {
        id: Date.now(),
        ...branchData,
        is_primary: MOCK_BRANCHES.length === 0, // First branch is primary
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      MOCK_BRANCHES.push(newBranch)
      return Promise.resolve({ data: { data: newBranch } })
    }
    return api.post('/company/branches', branchData)
  },

  // Update branch
  updateBranch(branchId, branchData) {
    if (MOCK_AUTH) {
      const index = MOCK_BRANCHES.findIndex(b => b.id === parseInt(branchId))
      if (index !== -1) {
        MOCK_BRANCHES[index] = {
          ...MOCK_BRANCHES[index],
          ...branchData,
          updated_at: new Date().toISOString()
        }
        return Promise.resolve({ data: { data: MOCK_BRANCHES[index] } })
      }
      return Promise.reject({ response: { data: { message: 'Branch not found' } } })
    }
    return api.patch(`/company/branches/${branchId}`, branchData)
  },

  // Delete branch
  deleteBranch(branchId) {
    if (MOCK_AUTH) {
      const index = MOCK_BRANCHES.findIndex(b => b.id === parseInt(branchId))
      if (index !== -1) {
        const branch = MOCK_BRANCHES[index]
        if (branch.is_primary) {
          return Promise.reject({ response: { data: { message: 'Cannot delete primary branch' } } })
        }
        if (MOCK_BRANCHES.length <= 2) {
          return Promise.reject({ response: { data: { message: 'Company must have at least 2 branches' } } })
        }
        MOCK_BRANCHES.splice(index, 1)
        return Promise.resolve({ data: { message: 'Branch deleted successfully' } })
      }
      return Promise.reject({ response: { data: { message: 'Branch not found' } } })
    }
    return api.delete(`/company/branches/${branchId}`)
  },

  // Set primary branch
  setPrimaryBranch(branchId) {
    if (MOCK_AUTH) {
      MOCK_BRANCHES = MOCK_BRANCHES.map(b => ({
        ...b,
        is_primary: b.id === parseInt(branchId)
      }))
      return Promise.resolve({ data: { message: 'Primary branch updated' } })
    }
    return api.patch(`/company/branches/${branchId}/set-primary`)
  }
}
