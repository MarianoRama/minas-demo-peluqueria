import { estimatedTotalDuration, parseReferencePrice } from '../../data/appointments'
import type { ServicioReserva } from '../../admin/types'

function formatoPrecio(precio: number) {
  return `$${new Intl.NumberFormat('es-UY').format(precio)} UYU`
}

function PasoServicio({
  servicios,
  servicioIds,
  onSeleccionar,
}: {
  servicios: ServicioReserva[]
  servicioIds: string[]
  onSeleccionar: (id: string) => void
}) {
  const seleccionados = servicios.filter((servicio) => servicioIds.includes(servicio.id))
  const duracionTotal = estimatedTotalDuration(seleccionados.map((servicio) => servicio.nombre))
  const precioCompleto = seleccionados.length > 0 && seleccionados.every((servicio) => parseReferencePrice(servicio.precio) !== null)
  const precioTotal = seleccionados.reduce((total, servicio) => total + (parseReferencePrice(servicio.precio) ?? 0), 0)

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold text-charcoal">
        ¿Qué servicios querés reservar?
      </h2>
      <p className="mb-4 text-sm text-charcoal/60">
        Podés sumar varios. Los precios y tiempos son referencias de ejemplo.
      </p>

      {servicios.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-rosewood/20 bg-white/60 px-4 py-10 text-center">
          <p className="text-sm text-charcoal/50">
            Todavía no hay servicios cargados. Escribinos por WhatsApp.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {servicios.map((servicio) => {
            const activo = servicioIds.includes(servicio.id)
            return (
              <button
                key={servicio.id}
                type="button"
                aria-pressed={activo}
                onClick={() => onSeleccionar(servicio.id)}
                className={`flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left shadow-sm transition-colors ${
                  activo
                    ? 'border-rosewood bg-rosewood/5'
                    : 'border-rosewood/15 bg-white'
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-display text-lg font-semibold text-charcoal">
                    {servicio.nombre}
                  </span>
                  <span className="mt-1 block text-xs text-charcoal/55">
                    {estimatedTotalDuration([servicio.nombre])} min estimados
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-semibold text-gold">
                    {servicio.precio || 'Precio a consultar'}
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-rosewood">
                    {activo ? 'Quitar' : 'Agregar'}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      )}

      {seleccionados.length > 0 && (
        <div className="mt-5 rounded-2xl bg-charcoal p-4 text-white" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-light">Tu selección</p>
          <ul className="mt-2 space-y-1 text-sm">
            {seleccionados.map((servicio) => <li key={servicio.id}>{servicio.nombre} · {servicio.precio || 'precio a consultar'}</li>)}
          </ul>
          <p className="mt-3 border-t border-white/15 pt-3 text-sm font-semibold">
            {duracionTotal} min estimados · {precioCompleto ? formatoPrecio(precioTotal) : 'precio total a confirmar'}
          </p>
        </div>
      )}

      {servicios.length > 0 && (
        <p className="mt-4 text-xs text-charcoal/50">
          La duración total se suma para calcular horarios que alcancen antes del cierre. Valores ilustrativos; el salón define el precio final.
        </p>
      )}
    </div>
  )
}

export default PasoServicio



