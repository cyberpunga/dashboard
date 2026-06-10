"use client"

import { useState, useEffect } from "react"
import { SkynetDashboard } from "@/components/skynet-dashboard"
import { coerceLocale, initialDataByLocale, SkynetI18nProvider, useI18n, type Locale } from "@/lib/i18n"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("skynet-locale")
    setLocale(coerceLocale(savedLocale ?? window.navigator.language))
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      window.localStorage.setItem("skynet-locale", locale)
    }
  }, [locale, mounted])

  return (
    <SkynetI18nProvider locale={locale}>
      {!mounted ? (
        <LoadingScreen />
      ) : (
        <SkynetDashboard data={initialDataByLocale[locale]} locale={locale} onLocaleChange={setLocale} />
      )}
    </SkynetI18nProvider>
  )
}

function LoadingScreen() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-green-400 font-mono text-xl animate-pulse">{t("app.loading")}</div>
    </div>
  )
}
