import { useContext } from 'react'
import { SeleccionReservaContext } from './seleccionReservaContext'

export function useSeleccionReserva() {
  const ctx = useContext(SeleccionReservaContext)
  if (!ctx) throw new Error('useSeleccionReserva() debe usarse dentro de <SeleccionReservaProvider>')
  return ctx
}
