import { useEffect, useRef } from 'react'

/**
 * Hook liviano de aparición al hacer scroll (sin librerías).
 * Marca con `data-revealed="true"` cada hijo directo del contenedor cuando
 * entra en viewport, con un pequeño escalonado entre ítems. Se dispara una
 * sola vez por elemento y respeta prefers-reduced-motion (no hace nada: el
 * CSS ya deja los elementos visibles por defecto).
 */
export function useReveal<T extends HTMLElement>(pasoMs = 70) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const contenedor = ref.current
    if (!contenedor) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = Array.from(contenedor.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (items.length === 0) return

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      items.forEach((el) => el.setAttribute('data-revealed', 'true'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const indice = items.indexOf(el)
          window.setTimeout(() => {
            el.setAttribute('data-revealed', 'true')
          }, Math.max(0, indice) * pasoMs)
          observer.unobserve(el)
        })
      },
      { threshold: 0, rootMargin: '0px 0px 200px 0px' },
    )

    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pasoMs])

  return ref
}
