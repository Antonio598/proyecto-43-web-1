import type { PaycometOrderResponse } from '@/types/paycomet'

const PAYCOMET_API_URL = 'https://rest.paycomet.com/v1/form'

export async function createPaycometOrder(opts: {
  terminal: number
  order: string
  amount: string
  currency: string
  originalIp: string
  productDescription: string
  merchantDescription: string
  language: string
  urlOk: string
  urlKo: string
}): Promise<PaycometOrderResponse> {
  const body = {
    operationType: 1,
    payment: {
      terminal: opts.terminal,
      methodId: 1,
      order: opts.order,
      amount: opts.amount,
      currency: opts.currency,
      originalIp: opts.originalIp,
      secure: 1,
      productDescription: opts.productDescription,
      merchantDescription: opts.merchantDescription,
      language: opts.language,
      urlOk: opts.urlOk,
      urlKo: opts.urlKo,
      userInteraction: 1,
    },
  }

  const res = await fetch(PAYCOMET_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'PAYCOMET-API-TOKEN': process.env.PAYCOMET_API_KEY!,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PayComet HTTP ${res.status}: ${text}`)
  }

  return res.json() as Promise<PaycometOrderResponse>
}
