import type { Reserva, ServicioReserva } from '../types'
import { SERVICIOS_SEED } from '../data/estilistas'

// Mismo criterio que la demo de pádel del mismo proyecto: useState +
// localStorage, sin backend. Ver D:\Proyectos\minas-demos\padel\src\components\Booking.tsx
const RESERVAS_KEY = 'estilo-minas.reservas'
const DIAS_CERRADOS_KEY = 'estilo-minas.dias-cerrados'
const PERFIL_ACTIVO_KEY = 'estilo-minas.perfil-activo'
// Disponibilidad individual por estilista (no confundir con DIAS_CERRADOS_KEY,
// que es el cierre global del salón para las 3 estilistas).
const DIAS_LIBRES_SEMANA_KEY = 'estilo-minas.dias-libres-semana'
const DIAS_LIBRES_PERSONALES_KEY = 'estilo-minas.dias-libres-personales'
// Lista de servicios ofrecidos, compartida entre las 3 estilistas (no es
// personal como los días libres). Editable desde el panel interno.
const SERVICIOS_KEY = 'estilo-minas.servicios'

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

// Días de semana recurrentes libres por estilista (ej. { martin: [2] }).
// Se siembra desde `ESTILISTAS[].diasLibresSemana` pero el usuario puede
// editarlo desde el panel; lo editado se persiste acá.
export function loadDiasLibresSemana(): Record<string, number[]> {
  try {
    const raw = window.localStorage.getItem(DIAS_LIBRES_SEMANA_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, number[]>) : {}
  } catch {
    return {}
  }
}

export function saveDiasLibresSemana(dias: Record<string, number[]>) {
  window.localStorage.setItem(DIAS_LIBRES_SEMANA_KEY, JSON.stringify(dias))
}

// Fechas puntuales (no recurrentes) libres por estilista, ej. { martin: ['2026-10-03'] }.
export function loadDiasLibresPersonales(): Record<string, string[]> {
  try {
    const raw = window.localStorage.getItem(DIAS_LIBRES_PERSONALES_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, string[]>) : {}
  } catch {
    return {}
  }
}

export function saveDiasLibresPersonales(dias: Record<string, string[]>) {
  window.localStorage.setItem(DIAS_LIBRES_PERSONALES_KEY, JSON.stringify(dias))
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

// Lista de servicios editable (panel interno, pestaña "Servicios") y leída
// tanto por el selector del panel interno (NewBookingModal) como por el
// paso 1 del wizard de reserva pública. Se siembra una sola vez desde
// SERVICIOS_SEED la primera vez que no hay nada guardado.
export function loadServicios(): ServicioReserva[] {
  try {
    const raw = window.localStorage.getItem(SERVICIOS_KEY)
    if (!raw) return SERVICIOS_SEED
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return SERVICIOS_SEED
    return (parsed as ServicioReserva[]).map((servicio) => {
      const referencia = SERVICIOS_SEED.find((semilla) => semilla.id === servicio.id)
      return servicio.precio || !referencia?.precio
        ? servicio
        : { ...servicio, precio: referencia.precio }
    })
  } catch {
    return SERVICIOS_SEED
  }
}

export function saveServicios(servicios: ServicioReserva[]) {
  window.localStorage.setItem(SERVICIOS_KEY, JSON.stringify(servicios))
}

