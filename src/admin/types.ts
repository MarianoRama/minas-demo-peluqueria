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

export type ServicioId = 'corte' | 'color' | 'barba' | 'tratamiento'

export interface ServicioReserva {
  id: ServicioId
  nombre: string
}

export type EstadoReserva = 'confirmada' | 'cancelada'

export interface Reserva {
  id: string
  estilistaId: string
  cliente: string
  telefono: string
  servicio: ServicioId
  fecha: string // YYYY-MM-DD
  hora: string // HH:MM
  estado: EstadoReserva
  creadaEn: number
}
