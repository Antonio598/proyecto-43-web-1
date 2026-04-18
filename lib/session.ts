import type { SessionData, SessionInteraction } from '@/types/session'

const SESSION_STORAGE_KEY = 'tt_session'

function createSession(): SessionData {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    pageViews: 1,
    lastActivity: new Date().toISOString(),
    interactions: [],
  }
}

export function getOrCreateSession(): SessionData {
  if (typeof window === 'undefined') {
    return createSession()
  }

  const stored = sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (stored) {
    try {
      const session: SessionData = JSON.parse(stored)
      session.pageViews += 1
      session.lastActivity = new Date().toISOString()
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
      return session
    } catch {
      // corrupted storage — reset
    }
  }

  const session = createSession()
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  return session
}

export function getSessionId(): string {
  return getOrCreateSession().id
}

export function trackInteraction(interaction: Omit<SessionInteraction, 'timestamp'>): void {
  if (typeof window === 'undefined') return

  const stored = sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (!stored) return

  try {
    const session: SessionData = JSON.parse(stored)
    session.interactions.push({
      ...interaction,
      timestamp: new Date().toISOString(),
    })
    session.lastActivity = new Date().toISOString()
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  } catch { /* silent */ }
}
