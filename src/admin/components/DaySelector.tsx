import { useMemo } from 'react'
import { formatoCorto, hoyISO, sumarDias } from '../lib/fechas'
import { fechaBloqueadaParaEstilista } from '../lib/disponibilidad'

const DIAS_ADELANTE = 14

function DaySelector({
  fechaSeleccionada,
  onChange,
  diasCerrados,
  diasLibresSemana,
  diasLibresPersonales,
}: {
  fechaSeleccionada: string
  onChange: (fecha: string) => void
  diasCerrados: string[]
  diasLibresSemana: number[]
  diasLibresPersonales: string[]
}) {
  const dias = useMemo(() => {
    const hoy = hoyISO()
    return Array.from({ length: DIAS_ADELANTE }, (_, i) => sumarDias(hoy, i))
  }, [])

  return (
    <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-2">
      {dias.map((iso) => {
        const { label, sublabel } = formatoCorto(iso)
        const cerrado = fechaBloqueadaParaEstilista(
          iso,
          diasCerrados,
          diasLibresSemana,
          diasLibresPersonales,
        )
        const activo = iso === fechaSeleccionada
        return (
          <button
            key={iso}
            onClick={() => onChange(iso)}
            className={`flex min-w-[64px] shrink-0 flex-col items-center rounded-xl border px-3 py-2.5 transition-colors ${
              activo
                ? 'border-rosewood bg-rosewood text-white'
                : cerrado
                  ? 'border-charcoal/10 bg-charcoal/5 text-charcoal/40'
                  : 'border-rosewood/15 bg-white text-charcoal/80'
            }`}
          >
            <span className="text-[11px] font-semibold capitalize">
              {label}
            </span>
            <span className="text-sm font-bold">{sublabel}</span>
            {cerrado && <span className="mt-0.5 text-[9px] uppercase">cerrado</span>}
          </button>
        )
      })}
    </div>
  )
}

export default DaySelector
