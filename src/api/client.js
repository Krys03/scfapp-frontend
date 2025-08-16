export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081'

export async function apiFetch(path, { method = 'GET', headers = {}, body, token } = {}) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'omit',
  }
  if (token) {
    opts.headers['Authorization'] = `Bearer ${token}`
  }
  if (body !== undefined) {
    opts.body = typeof body === 'string' ? body : JSON.stringify(body)
  }

  const res = await fetch(`${API_URL}${path}`, opts)
  const text = await res.text()
  let json
  try { json = text ? JSON.parse(text) : null } catch { json = { raw: text } }

  if (!res.ok) {
    const msg = json?.message || json?.error || res.statusText
    const err = new Error(msg)
    err.status = res.status
    err.payload = json
    throw err
  }
  return json
}
