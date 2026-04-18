'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getOrCreateSession } from '@/lib/session'
import type { SessionData } from '@/types/session'

interface SessionContextValue {
  session: SessionData | null
  sessionId: string | null
}

const SessionContext = createContext<SessionContextValue>({
  session: null,
  sessionId: null,
})

export function useSession() {
  return useContext(SessionContext)
}

export default function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionData | null>(null)

  useEffect(() => {
    const s = getOrCreateSession()
    setSession(s)
  }, [])

  return (
    <SessionContext.Provider value={{ session, sessionId: session?.id ?? null }}>
      {children}
    </SessionContext.Provider>
  )
}
