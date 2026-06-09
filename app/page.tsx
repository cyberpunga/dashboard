"use client"

import { useState, useEffect } from "react"
import { SkynetDashboard } from "@/components/skynet-dashboard"
import { initialData } from "@/data/skynet-data"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 font-mono text-xl animate-pulse">INITIALIZING SKYNET MONITORING SYSTEM...</div>
      </div>
    )
  }

  return <SkynetDashboard data={initialData} />
}
