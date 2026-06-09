"use client"

import { useState, useEffect, useRef } from "react"
import type { SkynetData } from "@/data/skynet-data"

interface SkynetDashboardProps {
  data: SkynetData
}

/* ----------------------------- TUI primitives ----------------------------- */

const COLS = {
  critical: "text-red-400",
  high: "text-orange-400",
  moderate: "text-yellow-400",
  low: "text-green-400",
  dim: "text-green-700",
  base: "text-green-400",
} as const

function riskClass(level: string) {
  switch (level) {
    case "critical":
      return COLS.critical
    case "high":
      return COLS.high
    case "moderate":
      return COLS.moderate
    case "low":
      return COLS.low
    default:
      return COLS.base
  }
}

// A bordered TUI panel drawn with box-drawing characters.
function Panel({
  title,
  children,
  className = "",
  accent = "text-green-400",
}: {
  title: string
  children: React.ReactNode
  className?: string
  accent?: string
}) {
  return (
    <section className={`relative flex flex-col ${className}`}>
      {/* top border with embedded title */}
      <div className={`flex items-center whitespace-pre leading-none ${accent} text-xs select-none`}>
        <span>┌─[ </span>
        <span className="font-bold tracking-widest">{title}</span>
        <span> ]</span>
        <span className="flex-1 overflow-hidden">
          {"─".repeat(400)}
        </span>
        <span>┐</span>
      </div>
      {/* body with side borders */}
      <div className={`flex flex-1 min-h-0 ${accent}`}>
        <span className="text-xs leading-none select-none">│</span>
        <div className="flex-1 min-w-0 px-2 py-1 text-green-400">{children}</div>
        <span className="text-xs leading-none select-none">│</span>
      </div>
      {/* bottom border */}
      <div className={`whitespace-pre leading-none ${accent} text-xs select-none overflow-hidden`}>
        {"└" + "─".repeat(400) + "┘"}
      </div>
    </section>
  )
}

// Horizontal ASCII bar made of block characters.
function AsciiBar({ value, max = 100, width = 20, className = "" }: { value: number; max?: number; width?: number; className?: string }) {
  const ratio = Math.max(0, Math.min(1, value / max))
  const filled = Math.round(ratio * width)
  const empty = width - filled
  return (
    <span className={`whitespace-pre ${className}`}>
      {"█".repeat(filled)}
      <span className="text-green-900">{"░".repeat(empty)}</span>
    </span>
  )
}

// Vertical column chart using block characters per data point/series.
const BLOCKS = [" ", "▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"]

function Sparkline({ values, className = "" }: { values: number[]; className?: string }) {
  const max = Math.max(...values, 1)
  return (
    <span className={`whitespace-pre ${className}`}>
      {values.map((v, i) => {
        const idx = Math.round((v / max) * (BLOCKS.length - 1))
        return BLOCKS[idx]
      })}
    </span>
  )
}

/* ------------------------------- animations ------------------------------- */

function useTypewriter(text: string, speed = 24) {
  const [out, setOut] = useState("")
  useEffect(() => {
    setOut("")
    let i = 0
    const id = setInterval(() => {
      i++
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return out
}

// A reusable blinking cursor block.
function Cursor() {
  return <span className="cursor-blink">█</span>
}

/* -------------------------------- dashboard ------------------------------- */

export function SkynetDashboard({ data }: SkynetDashboardProps) {
  const [now, setNow] = useState(new Date())
  const [selected, setSelected] = useState(data.companies[0].id)
  const [tick, setTick] = useState(0)
  const [bootLines, setBootLines] = useState<string[]>([])
  const sessionId = useRef(Math.random().toString(36).slice(2, 10).toUpperCase())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    const k = setInterval(() => setTick((p) => p + 1), 600)
    return () => {
      clearInterval(t)
      clearInterval(k)
    }
  }, [])

  // Boot sequence log
  useEffect(() => {
    const lines = [
      "> initializing skynet core ......... OK",
      "> mounting threat matrix .......... OK",
      "> linking neural uplink ........... OK",
      "> calibrating sensors ............. OK",
      "> AUTH level 5 granted ............ OK",
    ]
    let i = 0
    const id = setInterval(() => {
      setBootLines((p) => [...p, lines[i]])
      i++
      if (i >= lines.length) clearInterval(id)
    }, 220)
    return () => clearInterval(id)
  }, [])

  const header = useTypewriter("REAL-TIME ARTIFICIAL INTELLIGENCE THREAT ASSESSMENT GRID")

  const critical = data.companies.filter((c) => c.riskLevel === "critical")
  const high = data.companies.filter((c) => c.riskLevel === "high")
  const totalIncidents = data.companies.reduce((s, c) => s + c.recentIncidents, 0)
  const avg = Math.round(data.companies.reduce((s, c) => s + c.probability, 0) / data.companies.length)
  const sel = data.companies.find((c) => c.id === selected)!

  // Sorted by probability for the threat board.
  const sorted = [...data.companies].sort((a, b) => b.probability - a.probability)

  // Build computational-power series for the selected-ish chart.
  const cp = data.charts.computationalPower
  const series: { key: string; label: string; color: string }[] = [
    { key: "omniscient", label: "OMNI", color: "text-red-400" },
    { key: "neuralink", label: "NRLK", color: "text-orange-400" },
    { key: "nexus", label: "NEXS", color: "text-yellow-400" },
    { key: "cortex", label: "CRTX", color: "text-green-400" },
  ]

  return (
    <div className="crt min-h-screen bg-black text-green-400 font-mono text-[13px] leading-tight p-3 selection:bg-green-400 selection:text-black">
      {/* ============================ TOP TITLE BAR ============================ */}
      <div className="border border-green-700 mb-2">
        <div className="flex items-stretch justify-between bg-green-400 text-black px-2 py-0.5 text-xs font-bold tracking-widest">
          <span className="cursor-blink-invert">SKYNET//MONITOR v2.1 — CLASSIFIED // EYES ONLY</span>
          <span>{now.toLocaleString("en-GB", { hour12: false })}</span>
        </div>
        <div className="px-2 py-1 flex flex-wrap items-center gap-x-6 gap-y-0.5">
          <span className="text-green-300">
            {header}
            <Cursor />
          </span>
          <span className="ml-auto text-xs text-green-700">DATASET: {data.lastUpdated}</span>
          <span className="text-xs text-red-400 blink-slow">● LIVE FEED</span>
        </div>
      </div>

      {/* ============================== STAT STRIP ============================== */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-2 text-xs">
        <StatCell label="CRIT THREATS" value={critical.length} color="text-red-400" alert />
        <StatCell label="HIGH RISK" value={high.length} color="text-orange-400" />
        <StatCell label="INCIDENTS/30D" value={totalIncidents} color="text-yellow-400" />
        <StatCell label="AVG P(SKYNET)" value={`${avg}%`} color="text-green-300" />
        <StatCell label="ENTITIES" value={data.companies.length} color="text-green-400" />
      </div>

      {/* ============================== MAIN GRID ============================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        {/* LEFT: threat board */}
        <Panel title="THREAT BOARD" className="lg:col-span-5" accent="text-green-600">
          <div className="text-xs">
            <div className="flex text-green-700 border-b border-green-900 pb-1 mb-1 whitespace-pre">
              <span className="w-4">#</span>
              <span className="w-20">ENTITY</span>
              <span className="w-44 hidden xl:inline">P(SKYNET)</span>
              <span className="w-12 text-right">PROB</span>
              <span className="w-12 text-right">TRND</span>
              <span className="w-10 text-right">INC</span>
            </div>
            <div className="max-h-[460px] overflow-y-auto pr-1 tui-scroll">
              {sorted.map((c, i) => {
                const active = c.id === selected
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c.id)}
                    className={`flex w-full text-left whitespace-pre items-center py-0.5 ${riskClass(
                      c.riskLevel,
                    )} ${active ? "bg-green-400 text-black" : "hover:bg-green-950"}`}
                  >
                    <span className="w-4">{active ? ">" : String(i + 1).padStart(2, "0").slice(-1)}</span>
                    <span className="w-20 truncate font-bold">{c.shortName}</span>
                    <span className="w-44 hidden xl:inline">
                      <AsciiBar value={c.probability} width={28} className={active ? "text-black" : ""} />
                    </span>
                    <span className="w-12 text-right">{c.probability}%</span>
                    <span className="w-12 text-right">
                      {c.trend.direction === "up" ? "▲" : "▼"}
                      {c.trend.value}
                    </span>
                    <span className="w-10 text-right">{c.recentIncidents}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </Panel>

        {/* CENTER: detail + chart */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <Panel title={`DOSSIER: ${sel.shortName}`} accent="text-green-600">
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-green-700">DESIGNATION</span>
                <span className="text-green-300">{sel.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">RISK LEVEL</span>
                <span className={`font-bold uppercase ${riskClass(sel.riskLevel)}`}>
                  {sel.riskLevel === "critical" && <span className="blink-fast">⚠ </span>}
                  {sel.riskLevel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-700">P(SKYNET)</span>
                <AsciiBar value={sel.probability} width={24} className={riskClass(sel.riskLevel)} />
                <span className={riskClass(sel.riskLevel)}>{sel.probability}%</span>
              </div>
              <div className="text-green-700 pt-1">FACTORS: {sel.riskFactors} │ INCIDENTS: {sel.recentIncidents}</div>
              <div className="border-t border-green-900 my-1" />
              <p className="text-green-500 leading-relaxed">
                {sel.details}
                <Cursor />
              </p>
            </div>
          </Panel>

          <Panel title="COMPUTE POWER // 5MO" accent="text-green-600">
            <div className="text-xs space-y-0.5">
              {series.map((s) => {
                const vals = cp.map((d: any) => d[s.key] as number)
                const last = vals[vals.length - 1]
                return (
                  <div key={s.key} className="flex items-center gap-2 whitespace-pre">
                    <span className={`w-12 ${s.color}`}>{s.label}</span>
                    <span className={`${s.color} text-base tracking-tighter`}>
                      <Sparkline values={vals} />
                    </span>
                    <span className="ml-auto text-green-700">{last}TF</span>
                  </div>
                )
              })}
              <div className="text-green-800 whitespace-pre pt-1">
                {"   "}
                {cp.map((d: any) => (d.name as string).slice(0, 1)).join("    ")}
              </div>
            </div>
          </Panel>
        </div>

        {/* RIGHT: feeds */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <Panel title="INTEL FEED" accent="text-green-600">
            <div className="max-h-[210px] overflow-y-auto tui-scroll text-xs space-y-2 pr-1">
              {data.news.map((n) => (
                <div key={n.id} className="whitespace-normal">
                  <div className="flex justify-between text-[11px]">
                    <span
                      className={
                        n.category === "critical"
                          ? "text-red-400"
                          : n.category === "warning"
                            ? "text-orange-400"
                            : n.category === "positive"
                              ? "text-green-400"
                              : "text-yellow-400"
                      }
                    >
                      [{n.category.toUpperCase()}]
                    </span>
                    <span className="text-green-800">{n.date}</span>
                  </div>
                  <div className="text-green-300 font-bold">{n.title}</div>
                  <div className="text-green-700 line-clamp-2">{n.content}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="PROJECTION" accent="text-green-600">
            <div className="text-xs space-y-1 max-h-[210px] overflow-y-auto tui-scroll pr-1">
              {data.timeline.map((t) => {
                const c =
                  t.status === "critical"
                    ? "text-red-400"
                    : t.status === "warning"
                      ? "text-orange-400"
                      : "text-green-400"
                return (
                  <div key={t.id} className="whitespace-pre-wrap">
                    <div className={`${c} font-bold flex items-center gap-1`}>
                      {t.status === "current" ? <span className="blink-fast">▶</span> : <span>├</span>}
                      {t.period}
                    </div>
                    <div className="text-green-400 pl-2">{t.title}</div>
                  </div>
                )
              })}
            </div>
          </Panel>
        </div>
      </div>

      {/* ============================== BOOT LOG ============================== */}
      <div className="mt-2 border border-green-900 px-2 py-1 text-[11px] text-green-700">
        {bootLines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
        {bootLines.length >= 5 && (
          <div className="text-green-400">
            {"> awaiting command "}
            <Cursor />
          </div>
        )}
      </div>

      {/* ============================ BOTTOM STATUS ============================ */}
      <div className="mt-2 flex flex-wrap justify-between gap-x-6 gap-y-1 bg-green-400 text-black px-2 py-0.5 text-[11px] font-bold tracking-wide">
        <span>CLEARANCE: LVL 5</span>
        <span>SESSION: {sessionId.current}</span>
        <span>OPERATOR: ████████</span>
        <span>UPTIME: 99.97%</span>
        <span className={tick % 2 === 0 ? "" : "opacity-30"}>● SYSTEM OPERATIONAL</span>
      </div>
    </div>
  )
}

function StatCell({
  label,
  value,
  color,
  alert = false,
}: {
  label: string
  value: string | number
  color: string
  alert?: boolean
}) {
  return (
    <div className="border border-green-800 px-2 py-1 flex flex-col">
      <span className="text-[10px] text-green-700 tracking-widest">{label}</span>
      <span className={`text-xl font-bold ${color} ${alert ? "blink-slow" : ""}`}>{value}</span>
    </div>
  )
}
