import { useToast } from 'vue-toastification'

export function useNotification() {
  const toast = useToast()

  const success = (message, options = {}) => {
    toast.success(message, options)
  }

  const error = (message, options = {}) => {
    toast.error(message, options)
  }

  const warning = (message, options = {}) => {
    toast.warning(message, options)
  }

  const info = (message, options = {}) => {
    toast.info(message, options)
  }

  const notify = (type, message, options = {}) => {
    switch (type) {
      case 'success':
        success(message, options)
        break
      case 'error':
        error(message, options)
        break
      case 'warning':
        warning(message, options)
        break
      case 'info':
        info(message, options)
        break
      default:
        toast(message, options)
    }
  }

  const clear = () => {
    toast.clear()
  }

  return {
    success,
    error,
    warning,
    info,
    notify,
    clear
  }
}
