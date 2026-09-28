/** Types for the Estilo Minas portfolio demo. Persisted records live in this browser's localStorage only. */
export interface Estilista {
  id: string
  nombre: string
  /** Recurrent days off: 0 Sunday through 6 Saturday. */
  diasLibresSemana: number[]
}

/** Editable salon service shown by the public wizard and local panel. */
export interface ServicioReserva {
  id: string
  nombre: string
  /** Illustrative price, when provided. */
  precio?: string
}

export type EstadoReserva = 'confirmada' | 'pendiente' | 'cancelada'

export interface Reserva {
  id: string
  estilistaId: string
  cliente: string
  telefono: string
  /** First service ID retained for compatibility with existing single-service entries. */
  servicio: string
  /** All service IDs for public multi-service requests. */
  servicios?: string[]
  /** Estimated duration snapshot, in minutes. */
  duracionMinutos?: number
  /** Illustrative total based on the reference prices available when requested. */
  precioEstimado?: string
  fecha: string
  hora: string
  estado: EstadoReserva
  creadaEn: number
}
