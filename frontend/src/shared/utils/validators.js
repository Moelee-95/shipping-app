import * as yup from 'yup'

// Common validation schemas
export const emailSchema = yup.string().email('Invalid email address').required('Email is required')

export const passwordSchema = yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required')

export const confirmPasswordSchema = yup
  .string()
  .oneOf([yup.ref('password')], 'Passwords must match')
  .required('Please confirm your password')

export const phoneSchema = yup
  .string()
  .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
  .min(10, 'Phone number must be at least 10 digits')

export const requiredString = (fieldName) => yup.string().required(`${fieldName} is required`)

export const requiredNumber = (fieldName) =>
  yup.number().typeError(`${fieldName} must be a number`).required(`${fieldName} is required`)

export const positiveNumber = (fieldName) =>
  yup
    .number()
    .typeError(`${fieldName} must be a number`)
    .positive(`${fieldName} must be positive`)
    .required(`${fieldName} is required`)

// Login schema
export const loginSchema = yup.object({
  email: emailSchema,
  password: yup.string().required('Password is required')
})

// Registration schema
export const registerSchema = yup.object({
  name: requiredString('Name'),
  email: emailSchema,
  password: passwordSchema,
  password_confirmation: confirmPasswordSchema,
  role: yup.string().oneOf(['driver', 'shipping_company'], 'Please select a valid role').required('Role is required'),
  phone: phoneSchema,
  company_name: yup.string().when('role', {
    is: 'shipping_company',
    then: (schema) => schema.required('Company name is required for shipping companies'),
    otherwise: (schema) => schema.notRequired()
  })
})

// Order schema
export const orderSchema = yup.object({
  pickup_address: requiredString('Pickup address'),
  delivery_address: requiredString('Delivery address'),
  pickup_city: requiredString('Pickup city'),
  delivery_city: requiredString('Delivery city'),
  package_description: requiredString('Package description'),
  weight: positiveNumber('Weight'),
  dimensions: yup.string(),
  price: positiveNumber('Price'),
  pickup_date: yup.date().typeError('Invalid date').required('Pickup date is required'),
  notes: yup.string()
})

// Validation helper functions
export const validateField = async (schema, value) => {
  try {
    await schema.validate(value)
    return { valid: true, error: null }
  } catch (error) {
    return { valid: false, error: error.message }
  }
}

export const validateForm = async (schema, values) => {
  try {
    await schema.validate(values, { abortEarly: false })
    return { valid: true, errors: {} }
  } catch (error) {
    const errors = {}
    error.inner.forEach((err) => {
      errors[err.path] = err.message
    })
    return { valid: false, errors }
  }
}
