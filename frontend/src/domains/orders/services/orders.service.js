import api from '@/shared/utils/api'

const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === 'true'

// Mock data for development - shared orders data
const MOCK_ORDERS = [
  // Driver's orders (IDs 201-203)
  {
    id: 201,
    tracking_number: 'TRK-2024-101',
    status: 'picked_up',
    pickup_address: '100 Pickup Lane',
    delivery_address: '200 Delivery Street',
    pickup_city: 'Manhattan',
    delivery_city: 'Brooklyn',
    package_type: 'Medium Box',
    weight: 7.5,
    price: 60.00,
    estimated_distance: '15 km',
    created_at: '2024-01-14T09:00:00Z',
    picked_up_at: '2024-01-15T10:00:00Z',
    company: { name: 'ShipTrack Demo Co.' },
    customer_name: 'John Smith',
    customer_phone: '+1 555-0123',
    customer_email: 'john.smith@email.com',
    notes: 'Ring doorbell twice',
    driver: { id: 2, name: 'Test Driver', phone: '+1 555-0200' }
  },
  {
    id: 202,
    tracking_number: 'TRK-2024-102',
    status: 'in_transit',
    pickup_address: '300 Warehouse Blvd',
    delivery_address: '400 Customer Ave',
    pickup_city: 'Queens',
    delivery_city: 'Bronx',
    package_type: 'Large Box',
    weight: 15.0,
    price: 85.00,
    estimated_distance: '20 km',
    created_at: '2024-01-14T11:00:00Z',
    picked_up_at: '2024-01-15T08:30:00Z',
    company: { name: 'Express Logistics' },
    customer_name: 'Jane Doe',
    customer_phone: '+1 555-0456',
    customer_email: 'jane.doe@email.com',
    notes: 'Fragile items inside',
    driver: { id: 2, name: 'Test Driver', phone: '+1 555-0200' }
  },
  {
    id: 203,
    tracking_number: 'TRK-2024-103',
    status: 'accepted',
    pickup_address: '500 Business Center',
    delivery_address: '600 Residential Complex',
    pickup_city: 'Newark',
    delivery_city: 'Jersey City',
    package_type: 'Small Parcel',
    weight: 2.0,
    price: 30.00,
    estimated_distance: '10 km',
    created_at: '2024-01-15T08:00:00Z',
    company: { name: 'Quick Ship Inc.' },
    customer_name: 'Bob Wilson',
    customer_phone: '+1 555-0789',
    customer_email: 'bob.wilson@email.com',
    notes: 'Leave with concierge if not home',
    driver: { id: 2, name: 'Test Driver', phone: '+1 555-0200' }
  },
  // Available orders for drivers (IDs 101-106)
  {
    id: 101,
    tracking_number: 'TRK-2024-001',
    status: 'pending',
    pickup_address: '123 Main Street, Downtown',
    delivery_address: '456 Oak Avenue, Suburbs',
    pickup_city: 'New York',
    delivery_city: 'Brooklyn',
    package_type: 'Medium Box',
    weight: 5.2,
    price: 45.00,
    estimated_distance: '12 km',
    created_at: '2024-01-15T10:30:00Z',
    company: { name: 'ShipTrack Demo Co.' },
    customer_name: 'Alice Johnson',
    customer_phone: '+1 555-0101',
    customer_email: 'alice@email.com',
    notes: 'Handle with care'
  },
  {
    id: 102,
    tracking_number: 'TRK-2024-002',
    status: 'pending',
    pickup_address: '789 Pine Road, Business District',
    delivery_address: '321 Elm Street, Residential Area',
    pickup_city: 'Manhattan',
    delivery_city: 'Queens',
    package_type: 'Large Box',
    weight: 12.5,
    price: 75.00,
    estimated_distance: '18 km',
    created_at: '2024-01-15T11:00:00Z',
    company: { name: 'Express Logistics' },
    customer_name: 'Bob Smith',
    customer_phone: '+1 555-0102',
    customer_email: 'bob@email.com',
    notes: ''
  },
  // Company orders (IDs 1-8)
  {
    id: 1,
    tracking_number: 'TRK-2024-C001',
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
  }
]

export default {
  getOrders(params = {}) {
    if (MOCK_AUTH) {
      return Promise.resolve({ data: { data: MOCK_ORDERS } })
    }
    // This should be called through company/driver specific services
    return api.get('/company/orders', { params })
  },

  getOrder(id) {
    if (MOCK_AUTH) {
      const order = MOCK_ORDERS.find(o => o.id === parseInt(id))
      if (order) {
        return Promise.resolve({ data: { data: order } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    // Generic order endpoint for viewing order details
    return api.get(`/orders/${id}`)
  },

  createOrder(data) {
    if (MOCK_AUTH) {
      const newOrder = {
        id: Date.now(),
        tracking_number: `TRK-${Date.now()}`,
        status: 'pending',
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      MOCK_ORDERS.unshift(newOrder)
      return Promise.resolve({ data: { data: newOrder } })
    }
    return api.post('/company/orders', data)
  },

  updateOrder(id, data) {
    if (MOCK_AUTH) {
      const index = MOCK_ORDERS.findIndex(o => o.id === parseInt(id))
      if (index !== -1) {
        MOCK_ORDERS[index] = { ...MOCK_ORDERS[index], ...data, updated_at: new Date().toISOString() }
        return Promise.resolve({ data: { data: MOCK_ORDERS[index] } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.patch(`/company/orders/${id}`, data)
  },

  deleteOrder(id) {
    if (MOCK_AUTH) {
      const index = MOCK_ORDERS.findIndex(o => o.id === parseInt(id))
      if (index !== -1) {
        MOCK_ORDERS.splice(index, 1)
        return Promise.resolve({ data: { message: 'Order deleted' } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.delete(`/company/orders/${id}`)
  },

  getAvailableOrders(params = {}) {
    if (MOCK_AUTH) {
      const available = MOCK_ORDERS.filter(o => o.status === 'pending')
      return Promise.resolve({ data: { data: available } })
    }
    return api.get('/driver/available-orders', { params })
  },

  acceptOrder(id) {
    if (MOCK_AUTH) {
      const index = MOCK_ORDERS.findIndex(o => o.id === parseInt(id))
      if (index !== -1) {
        MOCK_ORDERS[index].status = 'accepted'
        MOCK_ORDERS[index].updated_at = new Date().toISOString()
        return Promise.resolve({ data: { data: MOCK_ORDERS[index] } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.post(`/driver/orders/${id}/accept`)
  },

  cancelOrder(id, reason = 'Cancelled by company') {
    if (MOCK_AUTH) {
      const index = MOCK_ORDERS.findIndex(o => o.id === parseInt(id))
      if (index !== -1) {
        MOCK_ORDERS[index].status = 'cancelled'
        MOCK_ORDERS[index].cancel_reason = reason
        MOCK_ORDERS[index].cancelled_at = new Date().toISOString()
        MOCK_ORDERS[index].updated_at = new Date().toISOString()
        return Promise.resolve({ data: { data: MOCK_ORDERS[index] } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.delete(`/company/orders/${id}`, { data: { cancellation_reason: reason } })
  },

  updateOrderStatus(id, status) {
    if (MOCK_AUTH) {
      const index = MOCK_ORDERS.findIndex(o => o.id === parseInt(id))
      if (index !== -1) {
        MOCK_ORDERS[index].status = status
        MOCK_ORDERS[index].updated_at = new Date().toISOString()
        if (status === 'picked_up') {
          MOCK_ORDERS[index].picked_up_at = new Date().toISOString()
        }
        if (status === 'delivered') {
          MOCK_ORDERS[index].delivered_at = new Date().toISOString()
        }
        return Promise.resolve({ data: { data: MOCK_ORDERS[index] } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.patch(`/driver/orders/${id}/status`, { status })
  },

  getMyOrders(params = {}) {
    if (MOCK_AUTH) {
      // Return orders that have been accepted by the driver
      const myOrders = MOCK_ORDERS.filter(o => ['accepted', 'picked_up', 'in_transit', 'delivered'].includes(o.status))
      return Promise.resolve({ data: { data: myOrders } })
    }
    return api.get('/driver/my-orders', { params })
  }
}
