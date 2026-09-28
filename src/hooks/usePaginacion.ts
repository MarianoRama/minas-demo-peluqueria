import { useState } from 'react'

/**
 * Paginación de lista genérica. Vuelve a la página 1 cuando cambia la
 * cantidad total de ítems (por ejemplo, al aplicar un filtro o búsqueda).
 * El reset se calcula durante el render (sin efecto), siguiendo el patrón
 * de React para "ajustar estado cuando cambian las props": ver
 * https://react.dev/learn/you-might-not-need-an-effect
 */
export function usePaginacion<T>(items: T[], porPagina: number) {
  const totalPaginas = Math.max(1, Math.ceil(items.length / porPagina))
  const [pagina, setPagina] = useState(1)
  const [totalAnterior, setTotalAnterior] = useState(items.length)

  let paginaActual = pagina
  if (totalAnterior !== items.length) {
    setTotalAnterior(items.length)
    if (pagina !== 1) {
      paginaActual = 1
      setPagina(1)
    }
  }

  const paginaSegura = Math.min(paginaActual, totalPaginas)
  const inicio = (paginaSegura - 1) * porPagina
  const itemsPagina = items.slice(inicio, inicio + porPagina)

  return {
    pagina: paginaSegura,
    totalPaginas,
    itemsPagina,
    desde: items.length === 0 ? 0 : inicio + 1,
    hasta: Math.min(inicio + porPagina, items.length),
    total: items.length,
    irAPagina: setPagina,
  }
}
