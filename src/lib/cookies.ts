export type CookiePreferences = {
  technical: boolean
}

export type StoredConsent = {
  timestamp: number
  preferences: CookiePreferences
}

const CONSENT_KEY = 'cookie-consent'
const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000 // 180 giorni in millisecondi

/**
 * Ritorna le preferenze salvate o null se non esistono
 */
export function getCookieConsent(): StoredConsent | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      return null
    }

    const parsed = JSON.parse(stored) as StoredConsent
    return parsed
  } catch {
    return null
  }
}

/**
 * Salva le preferenze con timestamp corrente
 */
export function setCookieConsent(preferences: CookiePreferences): void {
  if (typeof window === 'undefined') {
    return
  }

  const consent: StoredConsent = {
    timestamp: Date.now(),
    preferences,
  }

  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
  } catch {
    // Silently fail se localStorage non e' disponibile
  }
}

/**
 * Verifica se il consenso e' scaduto (180 giorni)
 * Ritorna true se non c'e' consenso O se sono passati piu' di 180 giorni
 */
export function hasConsentExpired(): boolean {
  const consent = getCookieConsent()

  if (!consent) {
    return true
  }

  const now = Date.now()
  const elapsed = now - consent.timestamp

  return elapsed > CONSENT_DURATION_MS
}

/**
 * Reset del consenso (usato da "Gestisci cookie" nel footer)
 */
export function resetCookieConsent(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.removeItem(CONSENT_KEY)
  } catch {
    // Silently fail se localStorage non e' disponibile
  }
}
