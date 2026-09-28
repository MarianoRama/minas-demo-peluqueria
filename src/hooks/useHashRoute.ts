import { useEffect, useState } from 'react'

/**
 * Router mínimo por hash (#/admin, #/admin/servicios, etc.), sin librerías.
 * Funciona en GitHub Pages y cualquier hosting estático sin configurar
 * rewrites de servidor.
 */
export function useHashRoute(): [string, (ruta: string) => void] {
  const [hash, setHash] = useState(() => normalizar(window.location.hash))

  useEffect(() => {
    function onHashChange() {
      setHash(normalizar(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function ir(ruta: string) {
    window.location.hash = ruta
  }

  return [hash, ir]
}

function normalizar(hash: string): string {
  const sinNumeral = hash.replace(/^#/, '')
  return sinNumeral || '/'
}
