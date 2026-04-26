export function generateOrderId(): string {
  const ts = Date.now().toString(36).slice(-5).toUpperCase()
  const rnd = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `TDE${ts}${rnd}` // 11 chars, alphanumeric, ≤12 PayComet limit
}
