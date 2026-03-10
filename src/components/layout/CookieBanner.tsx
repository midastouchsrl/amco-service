"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { COOKIE_BANNER } from "@/lib/constants"
import { getCookieConsent, setCookieConsent, hasConsentExpired } from "@/lib/cookies"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    // Mostra il banner se non c'è consenso o se è scaduto (180 giorni)
    const consent = getCookieConsent()
    if (!consent || hasConsentExpired()) {
      setIsVisible(true)
    }

    // Ascolta l'evento dal footer per riaprire le preferenze
    const handleOpenPreferences = () => {
      setIsVisible(true)
      setShowPanel(true)
    }

    window.addEventListener("open-cookie-preferences", handleOpenPreferences)
    return () => {
      window.removeEventListener("open-cookie-preferences", handleOpenPreferences)
    }
  }, [])

  const saveConsent = (preferences: { technical: boolean }) => {
    setCookieConsent({ technical: preferences.technical })
    setIsVisible(false)
    setShowPanel(false)
  }

  const handleAccept = () => {
    saveConsent({ technical: true })
  }

  const handleReject = () => {
    saveConsent({ technical: true })
  }

  const handleClosePanel = () => {
    setShowPanel(false)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Banner principale */}
      {!showPanel && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-md border-t border-border shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1 text-[15px]">
                  {COOKIE_BANNER.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {COOKIE_BANNER.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  onClick={handleReject}
                  className="min-w-[120px] border-border text-foreground hover:bg-surface"
                >
                  {COOKIE_BANNER.reject}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAccept}
                  className="min-w-[120px] border-border text-foreground hover:bg-surface"
                >
                  {COOKIE_BANNER.accept}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowPanel(true)}
                  className="text-sm text-muted-foreground"
                >
                  {COOKIE_BANNER.manage}
                </Button>
              </div>
            </div>

            <div className="mt-2">
              <a
                href="/cookie-policy"
                className="text-sm text-brand hover:underline underline-offset-4"
              >
                {COOKIE_BANNER.policy}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Pannello preferenze */}
      {showPanel && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {COOKIE_BANNER.panel.title}
              </h3>
              <button
                onClick={handleClosePanel}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-surface"
                aria-label={COOKIE_BANNER.close}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-start gap-3">
                <Checkbox checked={true} disabled className="mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {COOKIE_BANNER.panel.categories[0].name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {COOKIE_BANNER.panel.categories[0].description}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/cookie-policy"
                  className="text-sm text-brand hover:underline underline-offset-4"
                >
                  Leggi la {COOKIE_BANNER.policy}
                </a>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-border">
              <Button variant="outline" onClick={handleClosePanel} className="flex-1">
                {COOKIE_BANNER.close}
              </Button>
              <Button variant="default" onClick={handleAccept} className="flex-1">
                {COOKIE_BANNER.panel.save}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
