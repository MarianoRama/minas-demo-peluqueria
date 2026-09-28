import { createContext } from 'react'

export type SeleccionReservaContextValue = {
  /** Se incrementa cada vez que se pide reservar un servicio puntual. */
  senal: number
  servicioId: string | null
  pedirReserva: (servicioId: string) => void
}

export const SeleccionReservaContext = createContext<SeleccionReservaContextValue | null>(null)
