import { useDatos } from '../data/useDatos'

/** Nota/aviso corto del home, editable desde el panel ("Datos del negocio"). */
export function AvisoNegocio() {
  const { datos } = useDatos()
  const aviso = datos.negocio.aviso.trim()
  if (!aviso) return null
  return (
    <div className="border-b border-ink/10 bg-cream-dim px-5 py-2.5 text-center text-sm text-ink/75 sm:px-8">
      <span aria-hidden="true" className="mr-1.5">
        ✎
      </span>
      {aviso}
    </div>
  )
}
