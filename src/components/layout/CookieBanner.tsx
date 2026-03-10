"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { COOKIE_BANNER } from "@/lib/constants"

type ConsentStorage = {
  timestamp: number
  preferences: {
    technical: boolean
  }
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const saveConsent = (preferences: ConsentStorage["preferences"]) => {
    const stored: ConsentStorage = {
      timestamp: Date.now(),
      preferences,
    }
    localStorage.setItem("cookie-consent", JSON.stringify(stored))
    setIsVisible(false)
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
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                {COOKIE_BANNER.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {COOKIE_BANNER.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={handleReject}
                className="min-w-[100px] border-brand text-brand hover:bg-brand hover:text-white"
              >
                {COOKIE_BANNER.reject}
              </Button>
              <Button
                variant="outline"
                onClick={handleAccept}
                className="min-w-[100px] border-brand text-brand hover:bg-brand hover:text-white"
              >
                {COOKIE_BANNER.accept}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowPanel(true)}
                className="text-sm"
              >
                {COOKIE_BANNER.manage}
              </Button>
            </div>
          </div>

          <div className="mt-2">
            <a
              href="/cookie-policy"
              className="text-sm text-brand hover:underline"
            >
              {COOKIE_BANNER.policy}
            </a>
          </div>
        </div>
      </div>

      {/* Pannello preferenze */}
      {showPanel && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-foreground">
                {COOKIE_BANNER.panel.title}
              </h3>
              <button
                onClick={handleClosePanel}
                className="text-muted-foreground hover:text-foreground transition-colors"
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
                  <p className="text-sm text-muted-foreground mt-1">
                    {COOKIE_BANNER.panel.categories[0].description}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/cookie-policy"
                  className="text-sm text-brand hover:underline"
                >
                  Leggi la {COOKIE_BANNER.policy}
                </a>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-200">
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
