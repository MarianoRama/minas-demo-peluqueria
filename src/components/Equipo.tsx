import { NOMBRES_DIA, type DiaSemana } from '../data'
import { useDatos } from '../data/useDatos'
import { useReveal } from '../hooks/useReveal'
import {
  IconBustoCorto,
  IconBustoLargo,
  IconBustoOndulado,
  IconBustoRizado,
  IconFirma,
} from './icons'

const BUSTO_POR_ID: Record<string, typeof IconBustoLargo> = {
  valentina: IconBustoLargo,
  braian: IconBustoCorto,
  noelia: IconBustoOndulado,
  ramiro: IconBustoRizado,
}

const ABREV_DIA: Record<DiaSemana, string> = {
  0: 'D', 1: 'L', 2: 'M', 3: 'X', 4: 'J', 5: 'V', 6: 'S',
}

export function Equipo() {
  const ref = useReveal<HTMLDivElement>()
  const { datos } = useDatos()
  const equipo = datos.equipo.filter((p) => p.activo)
  return (
    <section id="equipo" className="border-y border-ink/10 bg-ink px-5 py-20 text-cream sm:px-8 sm:py-28">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div data-reveal className="md:max-w-xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {equipo.length} personas, un mismo oficio
          </h2>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {equipo.map((persona, i) => {
            const Busto = BUSTO_POR_ID[persona.id] ?? IconBustoCorto
            const acento = i % 2 === 0 ? '#f5efe2' : '#c96b7b'
            return (
              <li
                key={persona.id}
                data-reveal
                className="tarjeta-viva flex items-start gap-5 border border-cream/10 p-5"
              >
                {persona.foto ? (
                  <img
                    src={persona.foto}
                    alt={persona.nombre}
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="tarjeta-viva-icono flex h-20 w-20 shrink-0 items-center justify-center rounded-full border"
                    style={{ borderColor: 'rgba(245,239,226,0.3)', color: acento }}
                    aria-hidden="true"
                  >
                    <Busto className="h-11 w-11" />
                  </span>
                )}
                <div>
                  <p className="font-display text-xl font-semibold">{persona.nombre}</p>
                  <p className="mt-0.5 text-sm text-cream/60">{persona.rol}</p>
                  <IconFirma
                    className="mt-2 h-3 w-16"
                    style={{ color: acento }}
                    aria-hidden="true"
                  />
                  <p className="mt-2 text-sm text-cream/80">{persona.especialidad}</p>
                  <p className="mt-3 flex gap-1 text-[11px] tracking-wide text-cream/45" aria-label={`Atiende: ${persona.diasTrabaja.map((d) => NOMBRES_DIA[d]).join(', ')}`}>
                    {([0, 1, 2, 3, 4, 5, 6] as DiaSemana[]).map((d) => (
                      <span
                        key={d}
                        aria-hidden="true"
                        className={`flex h-5 w-5 items-center justify-center border ${
                          persona.diasTrabaja.includes(d)
                            ? 'border-cream/40 text-cream/80'
                            : 'border-cream/10 text-cream/25'
                        }`}
                      >
                        {ABREV_DIA[d]}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
