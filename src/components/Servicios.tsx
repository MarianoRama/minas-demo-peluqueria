import type { ComponentType } from 'react'
import { CATEGORIAS, SERVICIOS } from '../data'
import { IconTijera, IconGota, IconMano, IconNavaja, IconSecador } from './icons'
import { useReveal } from '../hooks/useReveal'

const ICONO_CATEGORIA: Record<string, ComponentType<{ className?: string }>> = {
  Corte: IconTijera,
  Color: IconGota,
  Tratamientos: IconSecador,
  Barbería: IconNavaja,
  Manicura: IconMano,
}

function formatearPrecio(precio: number) {
  return `$${precio.toLocaleString('es-UY')}`
}

export function Servicios() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section id="servicios" className="px-5 py-20 sm:px-8 sm:py-28">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div data-reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="text-xs font-semibold tracking-[0.25em] text-wine uppercase">
              Lista de precios
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              La carta del salón
            </h2>
          </div>
          <p className="text-sm text-ink/60 md:col-span-4">
            Precios de referencia, en pesos uruguayos. Duración estimada por
            servicio — se ajusta según largo y tipo de cabello.
          </p>
        </div>

        <div className="mt-14 md:columns-2 md:gap-x-14">
          {CATEGORIAS.map((categoria) => {
            const items = SERVICIOS.filter((s) => s.categoria === categoria)
            const Icono = ICONO_CATEGORIA[categoria]
            return (
              <div key={categoria} data-reveal className="mb-14 break-inside-avoid">
                <div className="flex items-center gap-3 border-b border-ink/20 pb-3">
                  <Icono className="h-6 w-6 shrink-0 text-wine" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-semibold text-ink">{categoria}</h3>
                </div>
                <ul className="mt-5 space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="tarjeta-viva flex items-baseline gap-3 border border-transparent px-2 py-1 hover:border-ink/10 hover:bg-paper"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium text-ink">{item.nombre}</span>
                          <span className="linea-punteada h-0 flex-1" aria-hidden="true" />
                          <span className="font-display text-lg font-semibold whitespace-nowrap text-wine">
                            {formatearPrecio(item.precio)}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 text-xs text-ink/50">
                          {item.descripcion && <span>{item.descripcion}</span>}
                          <span>· {item.duracionMin} min</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
