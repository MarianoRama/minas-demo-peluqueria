import { ESTILISTAS, iniciales } from '../data/estilistas'

function ProfileSelect({ onSelect }: { onSelect: (estilistaId: string) => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-blush-50 px-6 py-16 text-center">
      <span className="rounded-full bg-white/70 px-4 py-1 text-xs font-semibold tracking-wide text-rosewood uppercase shadow-sm">
        Panel de estilistas — demo
      </span>
      <h1 className="font-display text-3xl font-bold text-charcoal">
        ¿Quién sos?
      </h1>
      <p className="max-w-xs text-sm text-charcoal/60">
        Elegí tu perfil para ver tu agenda. Es una demo de portafolio: no
        hace falta contraseña.
      </p>

      <div className="flex w-full max-w-sm flex-col gap-3">
        {ESTILISTAS.map((estilista) => (
          <button
            key={estilista.id}
            onClick={() => onSelect(estilista.id)}
            className="flex items-center gap-4 rounded-2xl border border-rosewood/15 bg-white px-5 py-4 text-left shadow-sm transition-transform active:scale-95"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rosewood to-gold text-lg font-semibold text-white">
              {iniciales(estilista.nombre)}
            </span>
            <span className="font-display text-lg font-semibold text-charcoal">
              {estilista.nombre}
            </span>
          </button>
        ))}
      </div>

      <a href="#inicio" className="mt-4 text-xs text-charcoal/40 underline">
        volver al sitio
      </a>
    </div>
  )
}

export default ProfileSelect
