import type { Estilista, ServicioReserva } from '../types'

// Estilistas de EJEMPLO — nombres ficticios para la demo.
export const ESTILISTAS: Estilista[] = [
  { id: 'valentina', nombre: 'Valentina Ferreira', diasLibresSemana: [] },
  { id: 'lucia', nombre: 'Lucía Gómez', diasLibresSemana: [] },
  // Ejemplo: Martín no atiende los martes.
  { id: 'martin', nombre: 'Martín Silva', diasLibresSemana: [2] },
]

// Semilla inicial de servicios — se usa una sola vez para poblar localStorage
// la primera vez que se abre el sitio. A partir de ahí, la lista real vive en
// localStorage y es editable desde el panel interno (pestaña "Servicios"),
// ver `lib/storage.ts` (`loadServicios` / `saveServicios`).
export const SERVICIOS_SEED: ServicioReserva[] = [
  { id: 'corte', nombre: 'Corte' },
  { id: 'color', nombre: 'Color' },
  { id: 'barba', nombre: 'Barba' },
  { id: 'tratamiento', nombre: 'Tratamiento' },
]

export function nombreServicio(servicios: ServicioReserva[], id: string): string {
  return servicios.find((s) => s.id === id)?.nombre ?? id
}

export function iniciales(nombre: string): string {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase())
    .join('')
}
