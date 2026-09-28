import { useDatos } from '../data/useDatos'
import { useReveal } from '../hooks/useReveal'
import { usePaginacion } from '../hooks/usePaginacion'
import { Paginado } from './Paginado'
import { IconImagen } from './icons'

const POR_PAGINA = 8

const NOTAS_VACIAS = [
  { texto: 'acá van tus trabajos', rotacion: -4 },
  { texto: 'antes / después', rotacion: 3 },
]

function PolaroidVacio({ indice }: { indice: number }) {
  const rotacion = indice % 2 === 0 ? -2.5 : 2
  return (
    <div
      className="tarjeta-viva relative border border-ink/15 bg-paper p-3 pb-8 shadow-[4px_4px_0_rgba(28,22,17,0.12)]"
      style={{ transform: `rotate(${rotacion}deg)` }}
    >
      <div className="cinta-esquina relative flex aspect-[4/5] items-center justify-center border border-dashed border-ink/20 bg-cream-dim">
        <IconImagen className="h-10 w-10 text-ink/20" aria-hidden="true" />
      </div>
      {indice < NOTAS_VACIAS.length && (
        <p
          className="font-hand pointer-events-none absolute -bottom-2 left-1/2 w-max -translate-x-1/2 text-xl text-wine"
          style={{ transform: `translateX(-50%) rotate(${NOTAS_VACIAS[indice].rotacion}deg)` }}
        >
          {NOTAS_VACIAS[indice].texto}
        </p>
      )}
    </div>
  )
}

function Polaroid({ titulo, foto, indice }: { titulo: string; foto: string; indice: number }) {
  const rotacion = indice % 3 === 0 ? -2 : indice % 3 === 1 ? 2.5 : -1
  return (
    <figure
      className="tarjeta-viva relative border border-ink/15 bg-paper p-3 pb-8 shadow-[4px_4px_0_rgba(28,22,17,0.14)]"
      style={{ transform: `rotate(${rotacion}deg)` }}
    >
      <div className="cinta-esquina relative aspect-[4/5] overflow-hidden">
        <img src={foto} alt={titulo} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-ink/70">{titulo}</figcaption>
    </figure>
  )
}

export function Galeria() {
  const ref = useReveal<HTMLDivElement>()
  const { datos } = useDatos()
  const trabajos = datos.galeria.filter((t) => t.activo)
  const { itemsPagina, pagina, totalPaginas, desde, hasta, total, irAPagina } = usePaginacion(trabajos, POR_PAGINA)

  return (
    <section id="trabajos" className="bg-cream-dim px-5 py-20 sm:px-8 sm:py-28">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div data-reveal className="md:max-w-xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Algunos trabajos
          </h2>
          <p className="mt-3 text-ink/65">
            {trabajos.length > 0
              ? 'Cortes y color hechos en el salón, subidos por el equipo.'
              : 'Todavía no cargamos fotos, pero acá va a ir el álbum de cortes y color del salón.'}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {trabajos.length === 0
            ? Array.from({ length: 4 }, (_, i) => <PolaroidVacio key={i} indice={i} />)
            : itemsPagina.map((t, i) => (
                <div key={t.id} data-reveal>
                  {t.foto ? (
                    <Polaroid titulo={t.titulo} foto={t.foto} indice={i} />
                  ) : (
                    <PolaroidVacio indice={i} />
                  )}
                </div>
              ))}
        </div>

        {trabajos.length > 0 && (
          <Paginado
            pagina={pagina}
            totalPaginas={totalPaginas}
            desde={desde}
            hasta={hasta}
            total={total}
            onCambiarPagina={irAPagina}
            scrollHaciaId="trabajos"
          />
        )}
      </div>
    </section>
  )
}
