import { useMemo, useState } from 'react'
import {
  cambiarEstadoReserva,
  cancelarReserva,
  formatearFechaLarga,
  obtenerReservas,
  type Reserva,
} from '../lib/booking'
import { IconBasura, IconCheck } from '../components/icons'
import { BotonSecundario, DialogoConfirmar } from './ui'

function formatearPrecio(precio: number) {
  return `$${precio.toLocaleString('es-UY')}`
}

const ETIQUETA_ESTADO: Record<Reserva['estado'], string> = {
  pendiente: 'Pendiente',
  atendido: 'Atendido',
  cancelado: 'Cancelado',
}

export function PanelTurnos() {
  const [senal, setSenal] = useState(0)
  const [aCancelar, setACancelar] = useState<Reserva | null>(null)

  // Releemos localStorage cada vez que `senal` cambia (tras marcar/cancelar).
  const turnos = useMemo(() => {
    if (senal < 0) return [] // nunca ocurre: mantiene `senal` como dependencia real
    return obtenerReservas()
  }, [senal])

  const porFecha = useMemo(() => {
    const mapa = new Map<string, Reserva[]>()
    for (const t of turnos) {
      const lista = mapa.get(t.fecha) ?? []
      lista.push(t)
      mapa.set(t.fecha, lista)
    }
    return Array.from(mapa.entries())
  }, [turnos])

  function marcarAtendido(t: Reserva) {
    cambiarEstadoReserva(t.id, 'atendido')
    setSenal((v) => v + 1)
  }

  function confirmarCancelacion() {
    if (!aCancelar) return
    cancelarReserva(aCancelar.id)
    setACancelar(null)
    setSenal((v) => v + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Turnos reservados</h2>
        <p className="mt-1 text-sm text-ink/55">
          Los turnos que la gente reservó desde este mismo navegador. Para bloquear un día entero
          (feriado, arreglos), andá a "Negocio → Días puntuales cerrados".
        </p>
      </div>

      {turnos.length === 0 ? (
        <p className="border border-dashed border-ink/25 bg-paper p-6 text-sm text-ink/55">
          Todavía no hay turnos reservados en este navegador.
        </p>
      ) : (
        porFecha.map(([fecha, lista]) => (
          <div key={fecha}>
            <h3 className="font-display text-lg font-semibold text-ink capitalize">
              {formatearFechaLarga(fecha)}
            </h3>
            <ul className="mt-2 divide-y divide-ink/10 border border-ink/15 bg-paper">
              {lista.map((t) => (
                <li key={t.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 font-medium text-ink">
                      {t.hora} · {t.servicioNombre}
                      <span
                        className={`border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
                          t.estado === 'atendido'
                            ? 'border-ink/25 text-ink/60'
                            : t.estado === 'cancelado'
                              ? 'border-wine/40 text-wine'
                              : 'border-wine bg-wine text-cream'
                        }`}
                      >
                        {ETIQUETA_ESTADO[t.estado]}
                      </span>
                    </p>
                    <p className="mt-0.5 text-sm text-ink/55">
                      {t.nombreCliente} · {t.telefonoCliente} · {t.profesionalNombre} · {formatearPrecio(t.precio)}
                    </p>
                  </div>
                  {t.estado === 'pendiente' && (
                    <div className="flex gap-2">
                      <BotonSecundario onClick={() => marcarAtendido(t)} className="min-h-[40px] px-3 text-xs">
                        <IconCheck className="h-3.5 w-3.5" aria-hidden="true" /> Marcar atendido
                      </BotonSecundario>
                      <BotonSecundario onClick={() => setACancelar(t)} className="min-h-[40px] px-3 text-xs">
                        <IconBasura className="h-3.5 w-3.5" aria-hidden="true" /> Cancelar
                      </BotonSecundario>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      {aCancelar && (
        <DialogoConfirmar
          titulo="¿Cancelar este turno?"
          descripcion={`${aCancelar.servicioNombre} · ${formatearFechaLarga(aCancelar.fecha)} a las ${aCancelar.hora}, de ${aCancelar.nombreCliente}.`}
          textoConfirmar="Sí, cancelar"
          peligroso
          onConfirmar={confirmarCancelacion}
          onCancelar={() => setACancelar(null)}
        />
      )}
    </div>
  )
}
