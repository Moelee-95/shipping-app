import api from '@/shared/utils/api'

const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === 'true'

// Mock data for development
const MOCK_STATS = {
  totalOrders: 156,
  pendingOrders: 12,
  activeOrders: 8,
  completedOrders: 128,
  cancelledOrders: 8,
  totalSpent: 12450.75
}

const MOCK_ORDERS = [
  {
    id: 1,
    tracking_number: 'TRK-2024-001',
    status: 'pending',
    pickup_address: '123 Main Street, Downtown',
    delivery_address: '456 Oak Avenue, Suburbs',
    pickup_city: 'New York',
    delivery_city: 'Brooklyn',
    package_type: 'Medium Box',
    weight: 5.2,
    price: 45.00,
    customer_name: 'Alice Johnson',
    customer_phone: '+1 555-0101',
    customer_email: 'alice@email.com',
    notes: 'Handle with care',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    tracking_number: 'TRK-2024-002',
    status: 'accepted',
    pickup_address: '789 Pine Road, Business District',
    delivery_address: '321 Elm Street, Residential Area',
    pickup_city: 'Manhattan',
    delivery_city: 'Queens',
    package_type: 'Large Box',
    weight: 12.5,
    price: 75.00,
    customer_name: 'Bob Smith',
    customer_phone: '+1 555-0102',
    customer_email: 'bob@email.com',
    notes: '',
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-15T11:30:00Z',
    driver: { id: 2, name: 'Test Driver', phone: '+1 555-0200' }
  },
  {
    id: 3,
    tracking_number: 'TRK-2024-003',
    status: 'picked_up',
    pickup_address: '555 Commerce Blvd',
    delivery_address: '777 Residential Lane',
    pickup_city: 'Bronx',
    delivery_city: 'Staten Island',
    package_type: 'Small Parcel',
    weight: 1.8,
    price: 25.00,
    customer_name: 'Carol White',
    customer_phone: '+1 555-0103',
    customer_email: 'carol@email.com',
    notes: 'Leave at door',
    created_at: '2024-01-14T14:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
    picked_up_at: '2024-01-15T08:00:00Z',
    driver: { id: 2, name: 'Test Driver', phone: '+1 555-0200' }
  },
  {
    id: 4,
    tracking_number: 'TRK-2024-004',
    status: 'in_transit',
    pickup_address: '222 Industrial Ave',
    delivery_address: '888 Home Street',
    pickup_city: 'Jersey City',
    delivery_city: 'Hoboken',
    package_type: 'Fragile',
    weight: 3.0,
    price: 55.00,
    customer_name: 'David Brown',
    customer_phone: '+1 555-0104',
    customer_email: 'david@email.com',
    notes: 'Fragile electronics',
    created_at: '2024-01-14T10:00:00Z',
    updated_at: '2024-01-15T09:30:00Z',
    picked_up_at: '2024-01-15T07:00:00Z',
    driver: { id: 3, name: 'Mike Driver', phone: '+1 555-0300' }
  },
  {
    id: 5,
    tracking_number: 'TRK-2024-005',
    status: 'delivered',
    pickup_address: '999 Warehouse Row',
    delivery_address: '111 Apartment Complex',
    pickup_city: 'Newark',
    delivery_city: 'Elizabeth',
    package_type: 'Extra Large',
    weight: 25.0,
    price: 120.00,
    customer_name: 'Eve Davis',
    customer_phone: '+1 555-0105',
    customer_email: 'eve@email.com',
    notes: '',
    created_at: '2024-01-13T08:00:00Z',
    updated_at: '2024-01-14T16:00:00Z',
    picked_up_at: '2024-01-13T10:00:00Z',
    delivered_at: '2024-01-14T16:00:00Z',
    driver: { id: 2, name: 'Test Driver', phone: '+1 555-0200' }
  },
  {
    id: 6,
    tracking_number: 'TRK-2024-006',
    status: 'cancelled',
    pickup_address: '444 Tech Park',
    delivery_address: '666 Office Building',
    pickup_city: 'Secaucus',
    delivery_city: 'Weehawken',
    package_type: 'Documents',
    weight: 0.5,
    price: 15.00,
    customer_name: 'Frank Miller',
    customer_phone: '+1 555-0106',
    customer_email: 'frank@email.com',
    notes: 'Cancelled by customer',
    created_at: '2024-01-12T11:00:00Z',
    updated_at: '2024-01-12T15:00:00Z',
    cancelled_at: '2024-01-12T15:00:00Z'
  },
  {
    id: 7,
    tracking_number: 'TRK-2024-007',
    status: 'pending',
    pickup_address: '100 Shopping Center',
    delivery_address: '200 Family Home',
    pickup_city: 'Paramus',
    delivery_city: 'Hackensack',
    package_type: 'Medium Box',
    weight: 8.0,
    price: 50.00,
    customer_name: 'Grace Lee',
    customer_phone: '+1 555-0107',
    customer_email: 'grace@email.com',
    notes: 'Call before delivery',
    created_at: '2024-01-15T13:00:00Z',
    updated_at: '2024-01-15T13:00:00Z'
  },
  {
    id: 8,
    tracking_number: 'TRK-2024-008',
    status: 'delivered',
    pickup_address: '333 Distribution Hub',
    delivery_address: '444 Customer Address',
    pickup_city: 'Edison',
    delivery_city: 'New Brunswick',
    package_type: 'Small Parcel',
    weight: 2.5,
    price: 30.00,
    customer_name: 'Henry Wilson',
    customer_phone: '+1 555-0108',
    customer_email: 'henry@email.com',
    notes: '',
    created_at: '2024-01-11T09:00:00Z',
    updated_at: '2024-01-12T14:00:00Z',
    picked_up_at: '2024-01-11T11:00:00Z',
    delivered_at: '2024-01-12T14:00:00Z',
    driver: { id: 4, name: 'Sarah Driver', phone: '+1 555-0400' }
  }
]

export default {
  // Dashboard statistics
  getStats() {
    if (MOCK_AUTH) {
      return Promise.resolve({ data: { stats: MOCK_STATS } })
    }
    return api.get('/company/stats')
  },

  // Orders management
  getOrders(params = {}) {
    if (MOCK_AUTH) {
      let filteredOrders = [...MOCK_ORDERS]

      // Apply status filter
      if (params.status) {
        filteredOrders = filteredOrders.filter(o => o.status === params.status)
      }

      // Apply search filter
      if (params.search) {
        const search = params.search.toLowerCase()
        filteredOrders = filteredOrders.filter(o =>
          o.tracking_number.toLowerCase().includes(search) ||
          o.customer_name.toLowerCase().includes(search)
        )
      }

      const perPage = params.per_page || 10
      const page = params.page || 1
      const total = filteredOrders.length
      const start = (page - 1) * perPage
      const paginatedOrders = filteredOrders.slice(start, start + perPage)

      return Promise.resolve({
        data: {
          data: paginatedOrders,
          meta: {
            current_page: page,
            last_page: Math.ceil(total / perPage),
            per_page: perPage,
            total: total
          }
        }
      })
    }
    return api.get('/company/orders', { params })
  },

  getOrder(orderId) {
    if (MOCK_AUTH) {
      const order = MOCK_ORDERS.find(o => o.id === parseInt(orderId))
      if (order) {
        return Promise.resolve({ data: { order } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.get(`/company/orders/${orderId}`)
  },

  createOrder(orderData) {
    if (MOCK_AUTH) {
      const newOrder = {
        id: Date.now(),
        tracking_number: `TRK-${Date.now()}`,
        status: 'pending',
        ...orderData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      MOCK_ORDERS.unshift(newOrder)
      return Promise.resolve({ data: { order: newOrder } })
    }
    return api.post('/company/orders', orderData)
  },

  updateOrder(orderId, orderData) {
    if (MOCK_AUTH) {
      const index = MOCK_ORDERS.findIndex(o => o.id === parseInt(orderId))
      if (index !== -1) {
        MOCK_ORDERS[index] = { ...MOCK_ORDERS[index], ...orderData, updated_at: new Date().toISOString() }
        return Promise.resolve({ data: { order: MOCK_ORDERS[index] } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.patch(`/company/orders/${orderId}`, orderData)
  },

  deleteOrder(orderId) {
    if (MOCK_AUTH) {
      const index = MOCK_ORDERS.findIndex(o => o.id === parseInt(orderId))
      if (index !== -1) {
        MOCK_ORDERS.splice(index, 1)
        return Promise.resolve({ data: { message: 'Order deleted' } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.delete(`/company/orders/${orderId}`)
  },

  cancelOrder(orderId, reason = 'Cancelled by company') {
    if (MOCK_AUTH) {
      const index = MOCK_ORDERS.findIndex(o => o.id === parseInt(orderId))
      if (index !== -1) {
        MOCK_ORDERS[index].status = 'cancelled'
        MOCK_ORDERS[index].cancelled_at = new Date().toISOString()
        MOCK_ORDERS[index].updated_at = new Date().toISOString()
        return Promise.resolve({ data: { order: MOCK_ORDERS[index] } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.delete(`/company/orders/${orderId}`, { data: { cancellation_reason: reason } })
  },

  // Analytics
  getOrderAnalytics(params = {}) {
    if (MOCK_AUTH) {
      return Promise.resolve({
        data: {
          daily_orders: [
            { date: '2024-01-10', count: 12 },
            { date: '2024-01-11', count: 15 },
            { date: '2024-01-12', count: 8 },
            { date: '2024-01-13', count: 20 },
            { date: '2024-01-14', count: 18 },
            { date: '2024-01-15', count: 14 }
          ]
        }
      })
    }
    return api.get('/company/analytics', { params })
  },

  // Export orders
  exportOrders(format = 'csv', params = {}) {
    if (MOCK_AUTH) {
      return Promise.resolve({ data: new Blob(['mock export data'], { type: 'text/csv' }) })
    }
    return api.get('/company/orders/export', {
      params: { format, ...params },
      responseType: 'blob'
    })
  }
}
