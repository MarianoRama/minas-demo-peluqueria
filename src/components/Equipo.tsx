import { EQUIPO } from '../data'
import { useReveal } from '../hooks/useReveal'

export function Equipo() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section id="equipo" className="border-y border-ink/10 bg-ink px-5 py-20 text-cream sm:px-8 sm:py-28">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div data-reveal className="md:max-w-xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-cream/50 uppercase">
            El equipo
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Cuatro personas, un mismo oficio
          </h2>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
          {EQUIPO.map((persona, i) => (
            <li
              key={persona.id}
              data-reveal
              className="tarjeta-viva flex items-start gap-5 border border-transparent p-3 hover:border-cream/15"
            >
              {persona.foto ? (
                <img
                  src={persona.foto}
                  alt={persona.nombre}
                  className="h-16 w-16 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span
                  className="tarjeta-viva-icono flex h-16 w-16 shrink-0 items-center justify-center rounded-full border font-display text-xl"
                  style={{
                    borderColor: 'rgba(245,239,226,0.35)',
                    color: i % 2 === 0 ? '#f5efe2' : '#c96b7b',
                  }}
                  aria-hidden="true"
                >
                  {persona.iniciales}
                </span>
              )}
              <div>
                <p className="font-display text-xl font-semibold">{persona.nombre}</p>
                <p className="mt-0.5 text-sm text-cream/60">{persona.rol}</p>
                <p className="mt-2 text-sm text-cream/80">{persona.especialidad}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
