import { ESTILISTAS, iniciales } from '../../admin/data/estilistas'
import { CUALQUIERA_ID } from '../constants'

function PasoEstilista({
  estilistaId,
  onSeleccionar,
}: {
  estilistaId: string | null
  onSeleccionar: (id: string) => void
}) {
  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold text-charcoal">
        ¿Con quién querés atenderte?
      </h2>
      <p className="mb-4 text-sm text-charcoal/60">
        Elegí una estilista o dejá que te asignemos la primera disponible.
      </p>

      <div className="flex flex-col gap-3">
        {ESTILISTAS.map((estilista) => {
          const activo = estilistaId === estilista.id
          return (
            <button
              key={estilista.id}
              type="button"
              onClick={() => onSeleccionar(estilista.id)}
              className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left shadow-sm transition-colors ${
                activo
                  ? 'border-rosewood bg-rosewood/5'
                  : 'border-rosewood/15 bg-white'
              }`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rosewood to-gold text-lg font-semibold text-white">
                {iniciales(estilista.nombre)}
              </span>
              <span className="font-display text-lg font-semibold text-charcoal">
                {estilista.nombre}
              </span>
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => onSeleccionar(CUALQUIERA_ID)}
          className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left shadow-sm transition-colors ${
            estilistaId === CUALQUIERA_ID
              ? 'border-rosewood bg-rosewood/5'
              : 'border-dashed border-rosewood/20 bg-white/60'
          }`}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-light text-lg">
            ✨
          </span>
          <span className="font-display text-lg font-semibold text-charcoal">
            Cualquiera disponible
          </span>
        </button>
      </div>
    </div>
  )
}

export default PasoEstilista
