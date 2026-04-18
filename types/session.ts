export interface SessionData {
  id: string
  createdAt: string
  pageViews: number
  lastActivity: string
  interactions: SessionInteraction[]
}

export interface SessionInteraction {
  type: 'card_view' | 'cta_click' | 'modal_open' | 'whatsapp_click' | 'form_submit'
  experienceId?: string
  timestamp: string
}
