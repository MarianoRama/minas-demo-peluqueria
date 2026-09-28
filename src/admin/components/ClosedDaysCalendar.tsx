import { useState } from 'react'
import { hoyISO, toISO } from '../lib/fechas'

const NOMBRES_MES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

function ClosedDaysCalendar({
  diasCerrados,
  onToggle,
}: {
  diasCerrados: string[]
  onToggle: (fechaISO: string) => void
}) {
  const [mesActual, setMesActual] = useState(() => {
    const hoy = new Date()
    return new Date(hoy.getFullYear(), hoy.getMonth(), 1)
  })

  const hoy = hoyISO()
  const anio = mesActual.getFullYear()
  const mes = mesActual.getMonth()
  const primerDiaSemana = new Date(anio, mes, 1).getDay() // 0 = domingo
  const diasEnMes = new Date(anio, mes + 1, 0).getDate()

  const celdas: (string | null)[] = [
    ...Array(primerDiaSemana).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => toISO(new Date(anio, mes, i + 1))),
  ]

  return (
    <div>
      <div className="mb-3 rounded-xl bg-white/70 px-4 py-3 text-sm text-charcoal/60 shadow-sm">
        Tocá un día para marcarlo como <strong>cerrado</strong> (feriado, día
        libre). Ningún estilista va a poder cargar turnos ese día.
      </div>

      <div className="rounded-2xl border border-rosewood/10 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <button
            onClick={() => setMesActual(new Date(anio, mes - 1, 1))}
            className="rounded-full px-3 py-2 text-lg text-rosewood hover:bg-rosewood/10"
          >
            ‹
          </button>
          <span className="font-display text-base font-semibold text-charcoal">
            {NOMBRES_MES[mes]} {anio}
          </span>
          <button
            onClick={() => setMesActual(new Date(anio, mes + 1, 1))}
            className="rounded-full px-3 py-2 text-lg text-rosewood hover:bg-rosewood/10"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-charcoal/40">
          {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1.5">
          {celdas.map((iso, i) => {
            if (!iso) return <span key={`vacio-${i}`} />
            const cerrado = diasCerrados.includes(iso)
            const esHoy = iso === hoy
            const dia = Number(iso.split('-')[2])
            return (
              <button
                key={iso}
                onClick={() => onToggle(iso)}
                className={`aspect-square rounded-lg text-sm font-semibold transition-colors ${
                  cerrado
                    ? 'bg-red-500 text-white'
                    : esHoy
                      ? 'border border-rosewood bg-rosewood/10 text-rosewood'
                      : 'bg-blush-50 text-charcoal/70 hover:bg-rosewood/10'
                }`}
                title={cerrado ? 'Cerrado — tocá para reabrir' : 'Tocá para marcar como cerrado'}
              >
                {dia}
              </button>
            )
          })}
        </div>
      </div>

      {diasCerrados.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-charcoal/70">
            Días cerrados guardados
          </h3>
          <ul className="flex flex-col gap-2">
            {[...diasCerrados].sort().map((iso) => (
              <li
                key={iso}
                className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 text-sm shadow-sm"
              >
                <span className="text-charcoal/80">{iso}</span>
                <button
                  onClick={() => onToggle(iso)}
                  className="text-xs font-semibold text-rosewood underline"
                >
                  Reabrir
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ClosedDaysCalendar
