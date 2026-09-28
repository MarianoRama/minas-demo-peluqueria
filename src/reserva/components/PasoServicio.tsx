import type { ServicioReserva } from '../../admin/types'

function PasoServicio({
  servicios,
  servicioId,
  onSeleccionar,
}: {
  servicios: ServicioReserva[]
  servicioId: string | null
  onSeleccionar: (id: string) => void
}) {
  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold text-charcoal">
        ¿Qué servicio querés reservar?
      </h2>
      <p className="mb-4 text-sm text-charcoal/60">
        Elegí uno de nuestros servicios.
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
            const activo = servicioId === servicio.id
            return (
              <button
                key={servicio.id}
                type="button"
                onClick={() => onSeleccionar(servicio.id)}
                className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left shadow-sm transition-colors ${
                  activo
                    ? 'border-rosewood bg-rosewood/5'
                    : 'border-rosewood/15 bg-white'
                }`}
              >
                <span className="font-display text-lg font-semibold text-charcoal">
                  {servicio.nombre}
                </span>
                {servicio.precio && (
                  <span className="font-semibold text-gold">{servicio.precio}</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PasoServicio
