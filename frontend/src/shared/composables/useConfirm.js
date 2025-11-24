import { ref, watch } from 'vue'

const isOpen = ref(false)
const title = ref('')
const message = ref('')
const confirmText = ref('Confirm')
const cancelText = ref('Cancel')
const type = ref('warning')
let resolvePromise = null

// Watch for isOpen changes to ensure cleanup
watch(isOpen, (newVal) => {
  if (!newVal && resolvePromise) {
    // If dialog closes without explicit confirm/cancel, treat as cancel
    resolvePromise(false)
    resolvePromise = null
  }
})

export function useConfirm() {
  const confirm = (options = {}) => {
    // Reset any pending promise
    if (resolvePromise) {
      resolvePromise(false)
      resolvePromise = null
    }

    title.value = options.title || 'Confirm'
    message.value = options.message || 'Are you sure you want to proceed?'
    confirmText.value = options.confirmText || 'Confirm'
    cancelText.value = options.cancelText || 'Cancel'
    type.value = options.type || 'warning'
    isOpen.value = true

    return new Promise((resolve) => {
      resolvePromise = resolve
    })
  }

  const handleConfirm = () => {
    const resolver = resolvePromise
    resolvePromise = null
    isOpen.value = false
    if (resolver) {
      resolver(true)
    }
  }

  const handleCancel = () => {
    const resolver = resolvePromise
    resolvePromise = null
    isOpen.value = false
    if (resolver) {
      resolver(false)
    }
  }

  const close = () => {
    handleCancel()
  }

  return {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    type,
    confirm,
    handleConfirm,
    handleCancel,
    close
  }
}
