"use client"

import { createContext, useContext, useMemo, type ReactNode } from "react"
import { MDText } from "i18n-react"
import { initialDataEn, initialDataEs, initialDataFr, type SkynetData } from "@/data/skynet-data"

export const locales = ["en", "es", "fr"] as const
export type Locale = (typeof locales)[number]

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  fr: "FR",
}

export const localeDateIds: Record<Locale, string> = {
  en: "en-GB",
  es: "es-CL",
  fr: "fr-FR",
}

export const initialDataByLocale: Record<Locale, SkynetData> = {
  en: initialDataEn,
  es: initialDataEs,
  fr: initialDataFr,
}

const messages = {
  en: {
    app: {
      loading: "INITIALIZING SKYNET MONITORING SYSTEM...",
    },
    top: {
      title: "SKYNET//MONITOR v2.1 - CLASSIFIED // EYES ONLY",
      header: "REAL-TIME ARTIFICIAL INTELLIGENCE THREAT ASSESSMENT GRID",
      dataset: "DATASET",
      liveFeed: "LIVE FEED",
      language: "LANG",
    },
    stats: {
      criticalThreats: "CRIT THREATS",
      highRisk: "HIGH RISK",
      incidents30d: "INCIDENTS/30D",
      avgSkynet: "AVG P(SKYNET)",
      entities: "ENTITIES",
    },
    panels: {
      threatBoard: "THREAT BOARD",
      dossier: "DOSSIER: {name}",
      computePower: "COMPUTE POWER // 5MO",
      intelFeed: "INTEL FEED",
      projection: "PROJECTION",
    },
    table: {
      entity: "ENTITY",
      probability: "PROB",
      trend: "TRND",
      incidents: "INC",
    },
    dossier: {
      designation: "DESIGNATION",
      riskLevel: "RISK LEVEL",
      factors: "FACTORS",
      incidents: "INCIDENTS",
    },
    riskLevels: {
      critical: "critical",
      high: "high",
      moderate: "moderate",
      low: "low",
    },
    categories: {
      critical: "CRITICAL",
      warning: "WARNING",
      positive: "POSITIVE",
      development: "DEVELOPMENT",
    },
    boot: {
      initializing: "> initializing skynet core ......... OK",
      mounting: "> mounting threat matrix .......... OK",
      linking: "> linking neural uplink ........... OK",
      calibrating: "> calibrating sensors ............. OK",
      auth: "> AUTH level 5 granted ............ OK",
      awaiting: "> awaiting command ",
    },
    status: {
      clearance: "CLEARANCE: LVL 5",
      session: "SESSION: {sessionId}",
      operator: "OPERATOR: ████████",
      uptime: "UPTIME: 99.97%",
      operational: "SYSTEM OPERATIONAL",
    },
  },
  es: {
    app: {
      loading: "INICIALIZANDO SISTEMA DE MONITOREO SKYNET...",
    },
    top: {
      title: "SKYNET//MONITOR v2.1 - CLASIFICADO // SOLO PERSONAL AUTORIZADO",
      header: "MATRIZ DE EVALUACION DE AMENAZAS DE INTELIGENCIA ARTIFICIAL EN TIEMPO REAL",
      dataset: "DATOS",
      liveFeed: "FLUJO EN VIVO",
      language: "IDIOMA",
    },
    stats: {
      criticalThreats: "AMENAZAS CRIT",
      highRisk: "ALTO RIESGO",
      incidents30d: "INCIDENTES/30D",
      avgSkynet: "PROM P(SKYNET)",
      entities: "ENTIDADES",
    },
    panels: {
      threatBoard: "TABLERO DE AMENAZAS",
      dossier: "EXPEDIENTE: {name}",
      computePower: "PODER DE COMPUTO // 5M",
      intelFeed: "FLUJO DE INTEL",
      projection: "PROYECCION",
    },
    table: {
      entity: "ENTIDAD",
      probability: "PROB",
      trend: "TEND",
      incidents: "INC",
    },
    dossier: {
      designation: "DESIGNACION",
      riskLevel: "NIVEL DE RIESGO",
      factors: "FACTORES",
      incidents: "INCIDENTES",
    },
    riskLevels: {
      critical: "critico",
      high: "alto",
      moderate: "moderado",
      low: "bajo",
    },
    categories: {
      critical: "CRITICO",
      warning: "ALERTA",
      positive: "POSITIVO",
      development: "DESARROLLO",
    },
    boot: {
      initializing: "> inicializando nucleo skynet ...... OK",
      mounting: "> montando matriz de amenazas ...... OK",
      linking: "> enlazando uplink neural .......... OK",
      calibrating: "> calibrando sensores .............. OK",
      auth: "> autorizacion nivel 5 otorgada .... OK",
      awaiting: "> esperando comando ",
    },
    status: {
      clearance: "ACCESO: NIVEL 5",
      session: "SESION: {sessionId}",
      operator: "OPERADOR: ████████",
      uptime: "ACTIVO: 99.97%",
      operational: "SISTEMA OPERATIVO",
    },
  },
  fr: {
    app: {
      loading: "INITIALISATION DU SYSTEME DE SURVEILLANCE SKYNET...",
    },
    top: {
      title: "SKYNET//MONITOR v2.1 - CLASSIFIE // ACCES RESTREINT",
      header: "GRILLE D'EVALUATION DES MENACES D'INTELLIGENCE ARTIFICIELLE EN TEMPS REEL",
      dataset: "DONNEES",
      liveFeed: "FLUX DIRECT",
      language: "LANGUE",
    },
    stats: {
      criticalThreats: "MENACES CRIT",
      highRisk: "RISQUE ELEVE",
      incidents30d: "INCIDENTS/30J",
      avgSkynet: "MOY P(SKYNET)",
      entities: "ENTITES",
    },
    panels: {
      threatBoard: "TABLEAU DES MENACES",
      dossier: "DOSSIER : {name}",
      computePower: "PUISSANCE CALCUL // 5M",
      intelFeed: "FLUX RENSEIGN.",
      projection: "PROJECTION",
    },
    table: {
      entity: "ENTITE",
      probability: "PROB",
      trend: "TEND",
      incidents: "INC",
    },
    dossier: {
      designation: "DESIGNATION",
      riskLevel: "NIVEAU DE RISQUE",
      factors: "FACTEURS",
      incidents: "INCIDENTS",
    },
    riskLevels: {
      critical: "critique",
      high: "eleve",
      moderate: "modere",
      low: "faible",
    },
    categories: {
      critical: "CRITIQUE",
      warning: "ALERTE",
      positive: "POSITIF",
      development: "EVOLUTION",
    },
    boot: {
      initializing: "> initialisation noyau skynet ...... OK",
      mounting: "> montage matrice menaces .......... OK",
      linking: "> liaison uplink neuronal .......... OK",
      calibrating: "> calibration capteurs ............. OK",
      auth: "> autorisation niveau 5 accordee ... OK",
      awaiting: "> en attente de commande ",
    },
    status: {
      clearance: "ACCES : NIV 5",
      session: "SESSION : {sessionId}",
      operator: "OPERATEUR : ████████",
      uptime: "DISPO : 99.97%",
      operational: "SYSTEME OPERATIONNEL",
    },
  },
} as const

interface I18nContextValue {
  locale: Locale
  t: (key: string, options?: Record<string, unknown>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function toText(value: ReactNode): string {
  if (value == null || typeof value === "boolean") return ""
  if (typeof value === "string" || typeof value === "number") return String(value)
  return ""
}

export function SkynetI18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const text = useMemo(() => new MDText(messages[locale], { MDFlavor: 1 }), [locale])

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: (key, options) => toText(text.translate(key, options)),
    }),
    [locale, text],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error("useI18n must be used inside SkynetI18nProvider")
  }

  return context
}

export function coerceLocale(value: string | null | undefined): Locale {
  const locale = value?.slice(0, 2).toLowerCase()
  return locales.includes(locale as Locale) ? (locale as Locale) : "en"
}
