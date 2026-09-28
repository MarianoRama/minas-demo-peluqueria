import type { ComponentType } from 'react'
import { CATEGORIAS } from '../data'
import { useDatos } from '../data/useDatos'
import { useSeleccionReserva } from '../lib/useSeleccionReserva'
import { IconTijera, IconGota, IconMano, IconNavaja, IconSecador, IconSello } from './icons'
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
  const { datos } = useDatos()
  const { pedirReserva } = useSeleccionReserva()
  const servicios = datos.servicios.filter((s) => s.activo)

  return (
    <section id="servicios" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div data-reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              La carta del salón
            </h2>
          </div>
          <p className="text-sm text-ink/60 md:col-span-4">
            Precios de referencia en pesos uruguayos. La duración cambia un
            poco según el largo y el tipo de cabello de cada uno.
          </p>
        </div>

        <div className="textura-papel relative mt-14 border border-ink/12 bg-paper p-5 sm:p-10 md:columns-2 md:gap-x-14">
          <IconSello
            aria-hidden="true"
            className="pointer-events-none absolute -top-7 -right-4 hidden h-24 w-24 text-wine/60 sm:-right-6 sm:block sm:h-28 sm:w-28"
          />
          {CATEGORIAS.map((categoria) => {
            const items = servicios.filter((s) => s.categoria === categoria)
            if (items.length === 0) return null
            const Icono = ICONO_CATEGORIA[categoria]
            return (
              <div key={categoria} data-reveal className="mb-14 break-inside-avoid">
                <div className="flex items-center gap-3 border-b border-ink/20 pb-3">
                  <Icono className="h-6 w-6 shrink-0 text-wine" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-semibold text-ink">{categoria}</h3>
                </div>
                <ul className="mt-5 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="relative">
                      {item.destacado && (
                        <span
                          aria-hidden="true"
                          className="font-hand pointer-events-none absolute -top-4 right-1 -rotate-6 text-base text-wine sm:-top-5 sm:right-4 sm:text-lg"
                        >
                          ¡lo más pedido!
                        </span>
                      )}
                      <div className="tarjeta-viva flex items-baseline gap-3 border border-transparent px-2 py-1 hover:border-ink/10 hover:bg-cream/60">
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
                            <button
                              type="button"
                              onClick={() => pedirReserva(item.id)}
                              className="enlace-flecha ml-auto inline-flex items-center gap-1 py-1 font-semibold text-wine hover:text-wine-dark"
                            >
                              Reservar
                              <span className="enlace-flecha-icono">→</span>
                            </button>
                          </div>
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
