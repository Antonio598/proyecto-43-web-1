export interface PaycometPaymentPayload {
  terminal: number
  methodId: number        // 1 = card
  order: string
  amount: string          // cents as string e.g. "12000"
  currency: string
  originalIp: string
  secure?: number
  productDescription: string
  merchantDescription: string
  language: string
  urlOk: string
  urlKo: string
  userInteraction: number
}

export interface PaycometOrderRequest {
  payment: PaycometPaymentPayload
}

export interface PaycometOrderResponse {
  errorCode: number
  challengeUrl?: string
  order?: string
}

export interface PaycometWebhookPayload {
  TransactionType?: string
  Order?: string
  Amount?: string
  Currency?: string
  Response?: string   // "OK" | "KO"
  ErrorCode?: string
  Signature?: string
  [key: string]: string | undefined
}
