// User roles
export const ROLES = {
  DRIVER: 'driver',
  SHIPPING_COMPANY: 'shipping_company',
  ADMIN: 'admin'
}

// Order statuses
export const ORDER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
}

// Order status options for selects/filters
export const ORDER_STATUS_OPTIONS = [
  { value: ORDER_STATUS.PENDING, label: 'Pending', color: 'warning' },
  { value: ORDER_STATUS.ACCEPTED, label: 'Accepted', color: 'info' },
  { value: ORDER_STATUS.PICKED_UP, label: 'Picked Up', color: 'primary' },
  { value: ORDER_STATUS.IN_TRANSIT, label: 'In Transit', color: 'primary' },
  { value: ORDER_STATUS.DELIVERED, label: 'Delivered', color: 'success' },
  { value: ORDER_STATUS.CANCELLED, label: 'Cancelled', color: 'error' }
]

// Role options for registration
export const ROLE_OPTIONS = [
  {
    value: ROLES.DRIVER,
    label: 'Driver',
    description: 'Accept and deliver shipping orders',
    icon: 'mdi-truck'
  },
  {
    value: ROLES.SHIPPING_COMPANY,
    label: 'Shipping Company',
    description: 'Create and manage shipping orders',
    icon: 'mdi-domain'
  }
]

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  PER_PAGE_OPTIONS: [5, 10, 25, 50, 100]
}

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_TIME: 'MMM DD, YYYY HH:mm',
  INPUT: 'YYYY-MM-DD',
  INPUT_TIME: 'YYYY-MM-DDTHH:mm',
  SHORT: 'MM/DD/YY'
}

// API endpoints (relative to base URL)
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  USER: '/user',

  // Orders
  ORDERS: '/orders',
  AVAILABLE_ORDERS: '/orders/available',
  MY_ORDERS: '/orders/my-orders',

  // Driver
  DRIVER_ORDERS: '/driver/orders',
  DRIVER_STATS: '/driver/stats',
  ACCEPT_ORDER: (id) => `/orders/${id}/accept`,
  UPDATE_ORDER_STATUS: (id) => `/orders/${id}/status`,

  // Company
  COMPANY_ORDERS: '/company/orders',
  COMPANY_STATS: '/company/stats'
}

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed'
}

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

// Weight units
export const WEIGHT_UNITS = [
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'lb', label: 'Pounds (lb)' }
]

// Cities (example - can be replaced with API data)
export const CITIES = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose'
]

// Dashboard refresh interval (in milliseconds)
export const REFRESH_INTERVAL = 30000 // 30 seconds
