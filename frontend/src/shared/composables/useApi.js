import { ref } from 'vue'
import api from '@/shared/utils/api'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  const execute = async (method, url, payload = null, config = {}) => {
    loading.value = true
    error.value = null

    try {
      let response
      switch (method.toLowerCase()) {
        case 'get':
          response = await api.get(url, { params: payload, ...config })
          break
        case 'post':
          response = await api.post(url, payload, config)
          break
        case 'put':
          response = await api.put(url, payload, config)
          break
        case 'patch':
          response = await api.patch(url, payload, config)
          break
        case 'delete':
          response = await api.delete(url, config)
          break
        default:
          throw new Error(`Unsupported method: ${method}`)
      }
      data.value = response.data
      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const get = (url, params, config) => execute('get', url, params, config)
  const post = (url, payload, config) => execute('post', url, payload, config)
  const put = (url, payload, config) => execute('put', url, payload, config)
  const patch = (url, payload, config) => execute('patch', url, payload, config)
  const del = (url, config) => execute('delete', url, null, config)

  return {
    loading,
    error,
    data,
    execute,
    get,
    post,
    put,
    patch,
    delete: del
  }
}
