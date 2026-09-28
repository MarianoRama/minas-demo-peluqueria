import { IconFlecha } from './icons'

type Props = {
  pagina: number
  totalPaginas: number
  desde: number
  hasta: number
  total: number
  onCambiarPagina: (pagina: number) => void
  /** Selector para hacer scroll suave al cambiar de página. */
  scrollHaciaId?: string
}

export function Paginado({ pagina, totalPaginas, desde, hasta, total, onCambiarPagina, scrollHaciaId }: Props) {
  if (totalPaginas <= 1) return null

  function cambiar(p: number) {
    onCambiarPagina(p)
    if (!scrollHaciaId) return
    const el = document.getElementById(scrollHaciaId)
    if (!el) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1)

  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      <p className="text-xs text-ink/50">
        Mostrando {desde}–{hasta} de {total}
      </p>
      <nav aria-label="Paginado de resultados" className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => cambiar(pagina - 1)}
          disabled={pagina === 1}
          aria-label="Página anterior"
          className="flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
        >
          <IconFlecha className="h-4 w-4 rotate-180" />
        </button>
        {paginas.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => cambiar(p)}
            aria-current={p === pagina ? 'page' : undefined}
            className={`flex h-11 min-w-[2.75rem] items-center justify-center border px-2 font-display text-sm font-semibold transition-colors ${
              p === pagina ? 'border-wine bg-wine text-cream' : 'border-ink/20 text-ink hover:border-ink'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() => cambiar(pagina + 1)}
          disabled={pagina === totalPaginas}
          aria-label="Página siguiente"
          className="flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
        >
          <IconFlecha className="h-4 w-4" />
        </button>
      </nav>
    </div>
  )
}
