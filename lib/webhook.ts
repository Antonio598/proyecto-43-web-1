import type { BookingPayload } from '@/types/experience'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL ?? ''

export async function dispatchBookingWebhook(payload: BookingPayload): Promise<boolean> {
  if (!WEBHOOK_URL) {
    console.log('[webhook] Payload:', JSON.stringify(payload, null, 2))
    return false
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Trip-Session': payload.sessionId,
        'X-Trip-Source': payload.source,
      },
      body: JSON.stringify(payload),
    })
    return response.ok
  } catch (error) {
    console.error('[webhook] Dispatch failed:', error)
    return false
  }
}

export function buildBookingPayload(
  sessionId: string,
  experience: { id: string; title: string; price: number },
  source: BookingPayload['source'],
  formData?: BookingPayload['formData']
): BookingPayload {
  return {
    sessionId,
    experienceId: experience.id,
    experienceTitle: experience.title,
    priceAtBooking: experience.price,
    timestamp: new Date().toISOString(),
    source,
    userLocale: typeof navigator !== 'undefined' ? navigator.language : 'es-ES',
    formData,
  }
}
