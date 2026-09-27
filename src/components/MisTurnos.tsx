import { useState } from 'react'
import { cancelarReserva, formatearFechaLarga, obtenerReservas, type Reserva } from '../lib/booking'
import { IconCerrar, IconReloj } from './icons'

function formatearPrecio(precio: number) {
  return `$${precio.toLocaleString('es-UY')}`
}

export function MisTurnos({ actualizarSenal }: { actualizarSenal: number }) {
  const [turnos, setTurnos] = useState<Reserva[]>(() => obtenerReservas())
  const [aCancelar, setACancelar] = useState<Reserva | null>(null)
  const [ultimaSenal, setUltimaSenal] = useState(actualizarSenal)

  if (actualizarSenal !== ultimaSenal) {
    setUltimaSenal(actualizarSenal)
    setTurnos(obtenerReservas())
  }

  function confirmarCancelacion() {
    if (!aCancelar) return
    cancelarReserva(aCancelar.id)
    setTurnos(obtenerReservas())
    setACancelar(null)
  }

  if (turnos.length === 0) return null

  return (
    <div className="mt-10 border-t border-ink/15 pt-8">
      <h3 className="font-display text-xl font-semibold text-ink">Tus turnos</h3>
      <ul className="mt-4 space-y-3">
        {turnos.map((t) => (
          <li
            key={t.id}
            className="flex flex-col gap-3 border border-ink/15 bg-cream px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-ink">
                {t.servicioNombre} <span className="font-normal text-ink/50">· {t.nombreCliente}</span>
              </p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-ink/55">
                <span>{formatearFechaLarga(t.fecha)}</span>
                <span className="flex items-center gap-1">
                  <IconReloj className="h-3.5 w-3.5" /> {t.hora}
                </span>
                <span>{t.profesionalNombre}</span>
                <span>{formatearPrecio(t.precio)}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setACancelar(t)}
              className="inline-flex min-h-[44px] items-center justify-center border border-ink/25 px-4 text-sm font-semibold text-ink transition-colors hover:border-wine hover:text-wine"
            >
              Cancelar
            </button>
          </li>
        ))}
      </ul>

      {aCancelar && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-cancelar"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-5"
        >
          <div className="relative w-full max-w-sm border border-ink/15 bg-cream p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setACancelar(null)}
              aria-label="Cerrar"
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center text-ink/50 hover:text-ink"
            >
              <IconCerrar className="h-5 w-5" />
            </button>
            <h4 id="titulo-cancelar" className="pr-8 font-display text-xl font-semibold text-ink">
              ¿Cancelar este turno?
            </h4>
            <p className="mt-2 text-sm text-ink/65">
              {aCancelar.servicioNombre} · {formatearFechaLarga(aCancelar.fecha)} a las{' '}
              {aCancelar.hora}. Esta acción no se puede deshacer.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={confirmarCancelacion}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center bg-wine px-4 text-sm font-semibold text-cream hover:bg-wine-dark"
              >
                Sí, cancelar turno
              </button>
              <button
                type="button"
                onClick={() => setACancelar(null)}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center border border-ink/25 px-4 text-sm font-semibold text-ink hover:border-ink"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
