import type { Reserva } from '../types'

// Mismo criterio que la demo de pádel del mismo proyecto: useState +
// localStorage, sin backend. Ver D:\Proyectos\minas-demos\padel\src\components\Booking.tsx
const RESERVAS_KEY = 'estilo-minas.reservas'
const DIAS_CERRADOS_KEY = 'estilo-minas.dias-cerrados'
const PERFIL_ACTIVO_KEY = 'estilo-minas.perfil-activo'

export function loadReservas(): Reserva[] {
  try {
    const raw = window.localStorage.getItem(RESERVAS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Reserva[]) : []
  } catch {
    return []
  }
}

export function saveReservas(reservas: Reserva[]) {
  window.localStorage.setItem(RESERVAS_KEY, JSON.stringify(reservas))
}

export function loadDiasCerrados(): string[] {
  try {
    const raw = window.localStorage.getItem(DIAS_CERRADOS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as string[]) : []
  } catch {
    return []
  }
}

export function saveDiasCerrados(dias: string[]) {
  window.localStorage.setItem(DIAS_CERRADOS_KEY, JSON.stringify(dias))
}

export function loadPerfilActivo(): string | null {
  try {
    return window.localStorage.getItem(PERFIL_ACTIVO_KEY)
  } catch {
    return null
  }
}

export function savePerfilActivo(estilistaId: string) {
  window.localStorage.setItem(PERFIL_ACTIVO_KEY, estilistaId)
}

export function limpiarPerfilActivo() {
  window.localStorage.removeItem(PERFIL_ACTIVO_KEY)
}
