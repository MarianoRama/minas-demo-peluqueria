import { useMemo, useState } from 'react'
import { ESTILISTAS } from '../../admin/data/estilistas'
import { formatoCorto, formatoLargo, hoyISO, sumarDias } from '../../admin/lib/fechas'
import { fechaBloqueadaParaEstilista } from '../../admin/lib/disponibilidad'
import { horasLibresParaEstilista } from '../../admin/lib/horarios'
import type { Reserva } from '../../admin/types'
import { CUALQUIERA_ID } from '../constants'

const DIAS_ADELANTE = 21

type OpcionHora = { hora: string; estilistaId: string }

function PasoFechaHora({
  estilistaId,
  reservas,
  diasCerrados,
  diasLibresSemana,
  diasLibresPersonales,
  fecha,
  hora,
  onSeleccionar,
}: {
  estilistaId: string
  reservas: Reserva[]
  diasCerrados: string[]
  diasLibresSemana: Record<string, number[]>
  diasLibresPersonales: Record<string, string[]>
  fecha: string | null
  hora: string | null
  onSeleccionar: (fecha: string, hora: string, estilistaAsignadoId: string) => void
}) {
  const fechasCandidatas = useMemo(() => {
    const hoy = hoyISO()
    return Array.from({ length: DIAS_ADELANTE }, (_, i) => sumarDias(hoy, i))
  }, [])

  // Para cada fecha candidata, calcula las opciones de horario realmente
  // disponibles (respeta cierre global, disponibilidad personal de la
  // estilista y turnos ya ocupados). Si se eligió "cualquiera disponible",
  // junta las horas libres de las 3 estilistas y se queda con la primera
  // que puede tomar cada horario.
  const disponibilidadPorFecha = useMemo(() => {
    const mapa = new Map<string, OpcionHora[]>()
    const candidatos =
      estilistaId === CUALQUIERA_ID
        ? ESTILISTAS
        : ESTILISTAS.filter((e) => e.id === estilistaId)

    for (const fechaISO of fechasCandidatas) {
      const opciones: OpcionHora[] = []
      const horasAsignadas = new Set<string>()

      for (const est of candidatos) {
        const bloqueada = fechaBloqueadaParaEstilista(
          fechaISO,
          diasCerrados,
          diasLibresSemana[est.id] ?? est.diasLibresSemana,
          diasLibresPersonales[est.id] ?? [],
        )
        if (bloqueada) continue

        const libres = horasLibresParaEstilista(reservas, est.id, fechaISO)
        for (const h of libres) {
          if (horasAsignadas.has(h)) continue
          horasAsignadas.add(h)
          opciones.push({ hora: h, estilistaId: est.id })
        }
      }

      opciones.sort((a, b) => a.hora.localeCompare(b.hora))
      if (opciones.length > 0) mapa.set(fechaISO, opciones)
    }

    return mapa
  }, [
    fechasCandidatas,
    estilistaId,
    reservas,
    diasCerrados,
    diasLibresSemana,
    diasLibresPersonales,
  ])

  const fechasDisponibles = useMemo(
    () => fechasCandidatas.filter((f) => disponibilidadPorFecha.has(f)),
    [fechasCandidatas, disponibilidadPorFecha],
  )

  const [fechaVista, setFechaVista] = useState<string | null>(
    fecha ?? fechasDisponibles[0] ?? null,
  )

  const opcionesDelDia = fechaVista ? disponibilidadPorFecha.get(fechaVista) ?? [] : []

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold text-charcoal">
        Elegí fecha y hora
      </h2>
      <p className="mb-4 text-sm text-charcoal/60">
        Solo se muestran los días y horarios realmente disponibles.
      </p>

      {fechasDisponibles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-rosewood/20 bg-white/60 px-4 py-10 text-center">
          <p className="text-sm text-charcoal/50">
            No hay horarios disponibles en los próximos días. Probá con otra
            estilista o escribinos por WhatsApp.
          </p>
        </div>
      ) : (
        <>
          <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-2">
            {fechasDisponibles.map((iso) => {
              const { label, sublabel } = formatoCorto(iso)
              const activo = iso === fechaVista
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setFechaVista(iso)}
                  className={`flex min-w-[64px] shrink-0 flex-col items-center rounded-xl border px-3 py-2.5 transition-colors ${
                    activo
                      ? 'border-rosewood bg-rosewood text-white'
                      : 'border-rosewood/15 bg-white text-charcoal/80'
                  }`}
                >
                  <span className="text-[11px] font-semibold capitalize">{label}</span>
                  <span className="text-sm font-bold">{sublabel}</span>
                </button>
              )
            })}
          </div>

          {fechaVista && (
            <>
              <p className="mb-3 text-sm font-medium text-charcoal/60 capitalize">
                {formatoLargo(fechaVista)}
              </p>
              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                {opcionesDelDia.map((opcion) => {
                  const activo = fecha === fechaVista && hora === opcion.hora
                  return (
                    <button
                      key={opcion.hora}
                      type="button"
                      onClick={() =>
                        onSeleccionar(fechaVista, opcion.hora, opcion.estilistaId)
                      }
                      className={`rounded-xl border px-2 py-3 text-sm font-semibold transition-colors ${
                        activo
                          ? 'border-rosewood bg-rosewood text-white'
                          : 'border-rosewood/15 bg-white text-charcoal/80 hover:bg-rosewood/10'
                      }`}
                    >
                      {opcion.hora}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default PasoFechaHora
