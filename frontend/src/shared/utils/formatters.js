import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// Date formatters
export const formatDate = (date, format = 'MMM DD, YYYY') => {
  if (!date) return ''
  return dayjs(date).format(format)
}

export const formatDateTime = (date) => {
  if (!date) return ''
  return dayjs(date).format('MMM DD, YYYY HH:mm')
}

export const formatDateShort = (date) => {
  if (!date) return ''
  return dayjs(date).format('MM/DD/YY')
}

export const formatTimeAgo = (date) => {
  if (!date) return ''
  return dayjs(date).fromNow()
}

export const formatDateForInput = (date) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD')
}

export const formatDateTimeForInput = (date) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DDTHH:mm')
}

// Currency formatters
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}

export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined) return ''
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number)
}

// Weight formatters
export const formatWeight = (weight, unit = 'kg') => {
  if (weight === null || weight === undefined) return ''
  return `${formatNumber(weight, 2)} ${unit}`
}

// Distance formatters
export const formatDistance = (distance, unit = 'km') => {
  if (distance === null || distance === undefined) return ''
  return `${formatNumber(distance, 1)} ${unit}`
}

// String formatters
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const capitalizeWords = (str) => {
  if (!str) return ''
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ')
}

export const truncate = (str, length = 50) => {
  if (!str) return ''
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export const slugify = (str) => {
  if (!str) return ''
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Phone formatter
export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

// Order status formatters
export const formatOrderStatus = (status) => {
  const statusMap = {
    pending: 'Pending',
    accepted: 'Accepted',
    picked_up: 'Picked Up',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }
  return statusMap[status] || capitalize(status)
}

export const getStatusColor = (status) => {
  const colorMap = {
    pending: 'warning',
    accepted: 'info',
    picked_up: 'primary',
    in_transit: 'primary',
    delivered: 'success',
    cancelled: 'error'
  }
  return colorMap[status] || 'grey'
}

// Role formatters
export const formatRole = (role) => {
  const roleMap = {
    driver: 'Driver',
    shipping_company: 'Shipping Company',
    admin: 'Administrator'
  }
  return roleMap[role] || capitalize(role)
}
