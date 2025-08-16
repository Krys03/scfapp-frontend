import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8081'
const api = axios.create({ baseURL })

// Ajoute automatiquement le Bearer sauf pour /auth/*
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  const isAuthEndpoint = (config.url || '').startsWith('/auth/')
  if (token && !isAuthEndpoint) {
    config.headers = config.headers || {}
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Refresh automatique sur 401 (hors /auth/*)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    const status = error.response?.status
    const isAuthEndpoint = (original?.url || '').startsWith('/auth/')
    const refreshToken = localStorage.getItem('refreshToken')

    if (status === 401 && !original._retry && !isAuthEndpoint && refreshToken) {
      original._retry = true
      try {
        const { data } = await axios.post(`${baseURL}/auth/refresh`, { refreshToken }, { headers: { Authorization: '' } })
        localStorage.setItem('accessToken', data.accessToken)
        if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
        original.headers = original.headers || {}
        original.headers.Authorization = `Bearer ${data.accessToken}`
        return api(original)
      } catch {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
