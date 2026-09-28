import { useRef, useState } from 'react'
import { useDatos } from '../data/useDatos'
import { BotonSecundario, DialogoConfirmar, Aviso } from './ui'
import { IconDescargar, IconSubir } from '../components/icons'

export function PanelCopias() {
  const { exportar, importar, restaurarEjemplo } = useDatos()
  const inputRef = useRef<HTMLInputElement>(null)
  const [confirmarRestaurar, setConfirmarRestaurar] = useState(false)
  const [mensaje, setMensaje] = useState<{ tono: 'info' | 'error'; texto: string } | null>(null)

  function manejarArchivo(archivo: File | undefined) {
    if (!archivo) return
    const lector = new FileReader()
    lector.onload = () => {
      const resultado = importar(String(lector.result))
      setMensaje(
        resultado.ok
          ? { tono: 'info', texto: 'Copia cargada correctamente.' }
          : { tono: 'error', texto: resultado.error ?? 'No se pudo cargar el archivo.' },
      )
    }
    lector.readAsText(archivo)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Copias de seguridad</h2>
        <p className="mt-1 text-sm text-ink/55">
          Los datos viven en este navegador. Descargá una copia de vez en cuando por las dudas.
        </p>
      </div>

      {mensaje && <Aviso tono={mensaje.tono}>{mensaje.texto}</Aviso>}

      <div className="flex flex-col gap-3 border border-ink/15 bg-paper p-5 sm:flex-row">
        <BotonSecundario onClick={exportar} className="flex-1">
          <IconDescargar className="h-4 w-4" aria-hidden="true" /> Descargar copia (JSON)
        </BotonSecundario>
        <BotonSecundario onClick={() => inputRef.current?.click()} className="flex-1">
          <IconSubir className="h-4 w-4" aria-hidden="true" /> Cargar copia
        </BotonSecundario>
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          className="sr-only"
          onChange={(e) => manejarArchivo(e.target.files?.[0])}
        />
      </div>

      <div className="border border-wine/30 bg-wine/5 p-5">
        <h3 className="font-display text-lg font-semibold text-ink">Volver a los datos de ejemplo</h3>
        <p className="mt-1 text-sm text-ink/60">
          Borra todos los cambios hechos en este navegador y vuelve a la carta, equipo y galería de
          ejemplo. No afecta los turnos ya reservados.
        </p>
        <BotonSecundario onClick={() => setConfirmarRestaurar(true)} className="mt-3">
          Restaurar datos de ejemplo
        </BotonSecundario>
      </div>

      {confirmarRestaurar && (
        <DialogoConfirmar
          titulo="¿Volver a los datos de ejemplo?"
          descripcion="Se van a perder los cambios hechos en servicios, equipo, galería y datos del negocio en este navegador."
          textoConfirmar="Sí, restaurar"
          peligroso
          onConfirmar={() => {
            restaurarEjemplo()
            setConfirmarRestaurar(false)
            setMensaje({ tono: 'info', texto: 'Se restauraron los datos de ejemplo.' })
          }}
          onCancelar={() => setConfirmarRestaurar(false)}
        />
      )}
    </div>
  )
}
