/**
 * Tipos del panel de administración (demo).
 *
 * Modelo inspirado conceptualmente en el esquema de reservas de proyectos
 * como ARKA-Veterinary-Clinic-Page-and-Appointment-Booking-System (horarios
 * por día, fechas no disponibles, estado de la reserva) pero escrito desde
 * cero y adaptado a un salón con varios estilistas, sin backend: todo vive
 * en localStorage.
 */

export interface Estilista {
  id: string
  nombre: string
  /**
   * Días de la semana en los que este estilista NUNCA atiende (recurrente,
   * todas las semanas). 0 = domingo, 1 = lunes, ..., 6 = sábado.
   * Es el valor por defecto/semilla; el usuario puede editarlo desde el
   * panel y esa edición se persiste aparte en localStorage (ver
   * `lib/storage.ts`).
   */
  diasLibresSemana: number[]
}

/**
 * Los servicios ya no son una lista fija: se editan desde el panel interno
 * (pestaña "Servicios") y se guardan en localStorage (ver `lib/storage.ts`,
 * sembrado inicialmente desde `data/estilistas.ts`). Por eso el id es un
 * string libre en vez de una unión fija.
 */
export interface ServicioReserva {
  id: string
  nombre: string
  /** Precio ilustrativo, opcional (ej. "$450"). */
  precio?: string
}

/**
 * - 'confirmada': turno ya acordado en persona y cargado por la estilista
 *   directamente en el panel interno.
 * - 'pendiente': turno reservado por el propio cliente desde el sitio
 *   público (wizard de reserva online), a la espera de que la estilista lo
 *   confirme.
 * - 'cancelada': valor histórico, hoy las cancelaciones se borran del
 *   arreglo de reservas en vez de marcarse con este estado.
 */
export type EstadoReserva = 'confirmada' | 'pendiente' | 'cancelada'

export interface Reserva {
  id: string
  estilistaId: string
  cliente: string
  telefono: string
  servicio: string
  fecha: string // YYYY-MM-DD
  hora: string // HH:MM
  estado: EstadoReserva
  creadaEn: number
}
