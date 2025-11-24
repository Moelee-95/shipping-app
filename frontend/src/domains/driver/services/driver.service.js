import api from '@/shared/utils/api'

const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === 'true'

// Mock data for development
const MOCK_STATS = {
  totalOrders: 47,
  completedOrders: 38,
  activeOrders: 5,
  totalEarnings: 2840.50
}

const MOCK_AVAILABLE_ORDERS = [
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
    company: { name: 'ShipTrack Demo Co.' }
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
    company: { name: 'Express Logistics' }
  },
  {
    id: 103,
    tracking_number: 'TRK-2024-003',
    status: 'pending',
    pickup_address: '555 Commerce Blvd',
    delivery_address: '777 Residential Lane',
    pickup_city: 'Bronx',
    delivery_city: 'Staten Island',
    package_type: 'Small Parcel',
    weight: 1.8,
    price: 25.00,
    estimated_distance: '8 km',
    created_at: '2024-01-15T12:15:00Z',
    company: { name: 'Quick Ship Inc.' }
  },
  {
    id: 104,
    tracking_number: 'TRK-2024-004',
    status: 'pending',
    pickup_address: '222 Industrial Ave',
    delivery_address: '888 Home Street',
    pickup_city: 'Jersey City',
    delivery_city: 'Hoboken',
    package_type: 'Fragile',
    weight: 3.0,
    price: 55.00,
    estimated_distance: '5 km',
    created_at: '2024-01-15T13:45:00Z',
    company: { name: 'Careful Cargo' }
  },
  {
    id: 105,
    tracking_number: 'TRK-2024-005',
    status: 'pending',
    pickup_address: '999 Warehouse Row',
    delivery_address: '111 Apartment Complex',
    pickup_city: 'Newark',
    delivery_city: 'Elizabeth',
    package_type: 'Extra Large',
    weight: 25.0,
    price: 120.00,
    estimated_distance: '22 km',
    created_at: '2024-01-15T14:00:00Z',
    company: { name: 'Big Box Shipping' }
  },
  {
    id: 106,
    tracking_number: 'TRK-2024-006',
    status: 'pending',
    pickup_address: '444 Tech Park',
    delivery_address: '666 Office Building',
    pickup_city: 'Secaucus',
    delivery_city: 'Weehawken',
    package_type: 'Documents',
    weight: 0.5,
    price: 15.00,
    estimated_distance: '3 km',
    created_at: '2024-01-15T15:30:00Z',
    company: { name: 'DocuShip' }
  }
]

const MOCK_MY_ORDERS = [
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
    customer_phone: '+1 555-0123'
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
    customer_phone: '+1 555-0456'
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
    customer_phone: '+1 555-0789'
  }
]

export default {
  getStats() {
    if (MOCK_AUTH) {
      return Promise.resolve({ data: { data: MOCK_STATS } })
    }
    return api.get('/driver/stats')
  },

  getMyOrders(params = {}) {
    if (MOCK_AUTH) {
      return Promise.resolve({ data: { data: MOCK_MY_ORDERS } })
    }
    return api.get('/driver/orders', { params })
  },

  getAvailableOrders(params = {}) {
    if (MOCK_AUTH) {
      return Promise.resolve({ data: { data: MOCK_AVAILABLE_ORDERS } })
    }
    return api.get('/orders/available', { params })
  },

  acceptOrder(orderId) {
    if (MOCK_AUTH) {
      const order = MOCK_AVAILABLE_ORDERS.find(o => o.id === orderId)
      if (order) {
        const acceptedOrder = { ...order, status: 'accepted' }
        return Promise.resolve({ data: { data: acceptedOrder } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.post(`/orders/${orderId}/accept`)
  },

  updateOrderStatus(orderId, status) {
    if (MOCK_AUTH) {
      const order = MOCK_MY_ORDERS.find(o => o.id === orderId)
      if (order) {
        const updatedOrder = { ...order, status }
        return Promise.resolve({ data: { data: updatedOrder } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.patch(`/orders/${orderId}/status`, { status })
  },

  getOrderDetails(orderId) {
    if (MOCK_AUTH) {
      const order = [...MOCK_AVAILABLE_ORDERS, ...MOCK_MY_ORDERS].find(o => o.id === orderId)
      if (order) {
        return Promise.resolve({ data: { data: order } })
      }
      return Promise.reject({ response: { data: { message: 'Order not found' } } })
    }
    return api.get(`/orders/${orderId}`)
  }
}
