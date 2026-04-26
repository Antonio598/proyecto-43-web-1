import type { PaycometOrderRequest, PaycometOrderResponse } from '@/types/paycomet'

const PAYCOMET_API_URL = 'https://rest.paycomet.com/v1/payments'

export async function createPaycometOrder(
  req: PaycometOrderRequest
): Promise<PaycometOrderResponse> {
  const res = await fetch(PAYCOMET_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'PAYCOMET-API-TOKEN': process.env.PAYCOMET_API_KEY!,
    },
    body: JSON.stringify(req),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PayComet HTTP ${res.status}: ${text}`)
  }

  return res.json() as Promise<PaycometOrderResponse>
}
