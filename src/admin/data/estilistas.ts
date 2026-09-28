import type { Estilista, ServicioReserva } from '../types'

// Estilistas de EJEMPLO — nombres ficticios para la demo.
export const ESTILISTAS: Estilista[] = [
  { id: 'valentina', nombre: 'Valentina Ferreira' },
  { id: 'lucia', nombre: 'Lucía Gómez' },
  { id: 'martin', nombre: 'Martín Silva' },
]

export const SERVICIOS_RESERVA: ServicioReserva[] = [
  { id: 'corte', nombre: 'Corte' },
  { id: 'color', nombre: 'Color' },
  { id: 'barba', nombre: 'Barba' },
  { id: 'tratamiento', nombre: 'Tratamiento' },
]

export function nombreServicio(id: string): string {
  return SERVICIOS_RESERVA.find((s) => s.id === id)?.nombre ?? id
}

export function iniciales(nombre: string): string {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase())
    .join('')
}
