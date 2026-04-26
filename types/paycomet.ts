export interface PaycometOrderRequest {
  terminal: number
  methods: number[]
  order: string
  amount: string        // cents as string e.g. "12000"
  currency: string
  productDescription: string
  merchantDescription: string
  language: string
  urlOk: string
  urlKo: string
  hosted: 1
  userInteraction: 1
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
