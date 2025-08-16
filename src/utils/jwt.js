export function decodeJwt(token) {
    try {
      const [, payload] = token.split('.')
      return JSON.parse(atob(payload))
    } catch {
      return null
    }
  }
  
  export function isExpired(token) {
    const p = decodeJwt(token)
    if (!p?.exp) return true
    return Date.now() >= p.exp * 1000
  }
  