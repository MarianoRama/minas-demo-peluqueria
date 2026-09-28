import { useState } from 'react'
import { hoyISO, toISO } from '../lib/fechas'
import type { Estilista } from '../types'

const NOMBRES_MES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const DIAS_SEMANA = [
  { label: 'Lun', dia: 1 },
  { label: 'Mar', dia: 2 },
  { label: 'Mié', dia: 3 },
  { label: 'Jue', dia: 4 },
  { label: 'Vie', dia: 5 },
  { label: 'Sáb', dia: 6 },
  { label: 'Dom', dia: 0 },
]

function MisDiasLibres({
  estilista,
  diasLibresSemana,
  onToggleDiaSemana,
  diasLibresPersonales,
  onTogglePersonal,
}: {
  estilista: Estilista
  diasLibresSemana: number[]
  onToggleDiaSemana: (dia: number) => void
  diasLibresPersonales: string[]
  onTogglePersonal: (fechaISO: string) => void
}) {
  const [mesActual, setMesActual] = useState(() => {
    const hoy = new Date()
    return new Date(hoy.getFullYear(), hoy.getMonth(), 1)
  })

  const hoy = hoyISO()
  const anio = mesActual.getFullYear()
  const mes = mesActual.getMonth()
  const primerDiaSemana = new Date(anio, mes, 1).getDay()
  const diasEnMes = new Date(anio, mes + 1, 0).getDate()

  const celdas: (string | null)[] = [
    ...Array(primerDiaSemana).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => toISO(new Date(anio, mes, i + 1))),
  ]

  return (
    <div className="mb-6">
      <div className="mb-3">
        <h2 className="font-display text-base font-bold text-charcoal">
          Mis días libres
        </h2>
        <p className="text-xs text-charcoal/50">
          Personal de {estilista.nombre} — no afecta a las demás estilistas.
        </p>
      </div>

      <div className="mb-3 rounded-2xl border border-rosewood/10 bg-white p-4 shadow-sm">
        <p className="mb-2 text-sm font-semibold text-charcoal/70">
          Días fijos que no trabajo (todas las semanas)
        </p>
        <div className="flex flex-wrap gap-2">
          {DIAS_SEMANA.map(({ label, dia }) => {
            const activo = diasLibresSemana.includes(dia)
            return (
              <button
                key={dia}
                onClick={() => onToggleDiaSemana(dia)}
                className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                  activo
                    ? 'border-amber-500 bg-amber-500 text-white'
                    : 'border-rosewood/15 bg-blush-50 text-charcoal/70 hover:bg-rosewood/10'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
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
            const libre = diasLibresPersonales.includes(iso)
            const esHoy = iso === hoy
            const dia = Number(iso.split('-')[2])
            return (
              <button
                key={iso}
                onClick={() => onTogglePersonal(iso)}
                className={`aspect-square rounded-lg text-sm font-semibold transition-colors ${
                  libre
                    ? 'bg-amber-500 text-white'
                    : esHoy
                      ? 'border border-rosewood bg-rosewood/10 text-rosewood'
                      : 'bg-blush-50 text-charcoal/70 hover:bg-rosewood/10'
                }`}
                title={libre ? 'Día libre personal — tocá para sacarlo' : 'Tocá para marcarlo como libre personal'}
              >
                {dia}
              </button>
            )
          })}
        </div>
      </div>

      {diasLibresPersonales.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-charcoal/70">
            Fechas puntuales libres guardadas
          </h3>
          <ul className="flex flex-col gap-2">
            {[...diasLibresPersonales].sort().map((iso) => (
              <li
                key={iso}
                className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 text-sm shadow-sm"
              >
                <span className="text-charcoal/80">{iso}</span>
                <button
                  onClick={() => onTogglePersonal(iso)}
                  className="text-xs font-semibold text-rosewood underline"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MisDiasLibres
