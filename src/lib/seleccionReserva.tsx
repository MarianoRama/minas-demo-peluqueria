import { useMemo, useState, type ReactNode } from 'react'
import { SeleccionReservaContext } from './seleccionReservaContext'

/**
 * Puente chico entre la carta de precios y el wizard de reserva: al tocar
 * "Reservar" en un servicio de la carta, el wizard arranca directamente en
 * el paso de profesional con ese servicio ya elegido (en vez de obligar a
 * elegirlo de nuevo). Evita que la carta y el paso 1 del wizard sean dos
 * listas iguales que no se hablan entre sí.
 */
export function SeleccionReservaProvider({ children }: { children: ReactNode }) {
  const [senal, setSenal] = useState(0)
  const [servicioId, setServicioId] = useState<string | null>(null)

  const value = useMemo(
    () => ({
      senal,
      servicioId,
      pedirReserva: (id: string) => {
        setServicioId(id)
        setSenal((v) => v + 1)
        const destino = document.getElementById('reserva')
        if (!destino) return
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        destino.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      },
    }),
    [senal, servicioId],
  )

  return <SeleccionReservaContext.Provider value={value}>{children}</SeleccionReservaContext.Provider>
}
