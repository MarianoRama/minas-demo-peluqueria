import { useRef, useState } from 'react'
import { redimensionarAJpegDataUrl } from '../lib/imagen'
import { IconCamara, IconCerrar } from '../components/icons'
import { BotonSecundario } from './ui'

type Props = {
  valor?: string
  onCambiar: (dataUrl: string | undefined) => void
  etiqueta?: string
}

export function SubidaFoto({ valor, onCambiar, etiqueta = 'Foto' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function manejarArchivo(archivo: File | undefined) {
    if (!archivo) return
    setError(null)
    setProcesando(true)
    try {
      const dataUrl = await redimensionarAJpegDataUrl(archivo)
      onCambiar(dataUrl)
    } catch {
      setError('No se pudo procesar la foto. Probá con otra imagen.')
    } finally {
      setProcesando(false)
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-ink">{etiqueta}</p>
      <div className="mt-1.5 flex items-center gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden border border-dashed border-ink/25 bg-cream-dim">
          {valor ? (
            <img src={valor} alt="Vista previa" className="h-full w-full object-cover" />
          ) : (
            <IconCamara className="h-8 w-8 text-ink/25" aria-hidden="true" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
            id="input-foto"
            onChange={(e) => manejarArchivo(e.target.files?.[0])}
          />
          <BotonSecundario onClick={() => inputRef.current?.click()} disabled={procesando}>
            <IconCamara className="h-4 w-4" aria-hidden="true" />
            {procesando ? 'Procesando…' : valor ? 'Cambiar foto' : 'Sacar o subir foto'}
          </BotonSecundario>
          {valor && (
            <button
              type="button"
              onClick={() => onCambiar(undefined)}
              className="inline-flex items-center gap-1 self-start text-xs font-medium text-ink/50 hover:text-wine"
            >
              <IconCerrar className="h-3.5 w-3.5" /> Quitar foto
            </button>
          )}
        </div>
      </div>
      <p className="mt-1.5 text-xs text-ink/45">
        Se guarda achicada, lista para la web. Si no entra en este navegador, avisamos.
      </p>
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-wine">
          {error}
        </p>
      )}
    </div>
  )
}
