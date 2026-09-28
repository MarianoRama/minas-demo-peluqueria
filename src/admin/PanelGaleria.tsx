import { useState } from 'react'
import type { TrabajoGaleria } from '../data'
import { useDatos } from '../data/useDatos'
import { IconBasura, IconLapiz, IconMas } from '../components/icons'
import { BotonPrimario, BotonSecundario, Campo, Input, Toggle, DialogoConfirmar } from './ui'
import { SubidaFoto } from './SubidaFoto'

function nuevoId() {
  return `trabajo-${Date.now().toString(36)}`
}

type FormState = {
  titulo: string
  foto?: string
  activo: boolean
}

function itemAForm(t: TrabajoGaleria | null): FormState {
  return { titulo: t?.titulo ?? '', foto: t?.foto, activo: t?.activo ?? true }
}

export function PanelGaleria() {
  const { datos, crear, actualizar, eliminar } = useDatos()
  const [editando, setEditando] = useState<TrabajoGaleria | null>(null)
  const [creando, setCreando] = useState(false)
  const [aEliminar, setAEliminar] = useState<TrabajoGaleria | null>(null)
  const [form, setForm] = useState<FormState>(itemAForm(null))
  const [error, setError] = useState<string | null>(null)

  function abrirCrear() {
    setForm(itemAForm(null))
    setError(null)
    setCreando(true)
    setEditando(null)
  }

  function abrirEditar(t: TrabajoGaleria) {
    setForm(itemAForm(t))
    setError(null)
    setEditando(t)
    setCreando(false)
  }

  function cerrarFormulario() {
    setCreando(false)
    setEditando(null)
  }

  function guardar() {
    if (form.titulo.trim().length < 2) {
      setError('Escribí un título corto (ej: "Balayage rubio").')
      return
    }
    const item: TrabajoGaleria = {
      id: editando?.id ?? nuevoId(),
      titulo: form.titulo.trim(),
      foto: form.foto,
      activo: form.activo,
    }
    if (editando) actualizar('galeria', editando.id, item)
    else crear('galeria', item)
    cerrarFormulario()
  }

  const mostrandoFormulario = creando || editando !== null

  if (mostrandoFormulario) {
    return (
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          {editando ? 'Editar trabajo' : 'Nuevo trabajo'}
        </h2>
        <div className="space-y-5 border border-ink/15 bg-paper p-5 sm:p-6">
          <SubidaFoto valor={form.foto} onCambiar={(v) => setForm((f) => ({ ...f, foto: v }))} etiqueta="Foto del trabajo" />
          <Campo etiqueta="Título" ayuda="Ej: Balayage rubio, Corte + barba" htmlFor="g-titulo" error={error ?? undefined}>
            <Input id="g-titulo" value={form.titulo} onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))} />
          </Campo>
          <Toggle
            id="g-activo"
            checked={form.activo}
            onChange={(v) => setForm((f) => ({ ...f, activo: v }))}
            etiqueta="Visible en la galería del sitio"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <BotonPrimario onClick={guardar} className="flex-1">
            Guardar
          </BotonPrimario>
          <BotonSecundario onClick={cerrarFormulario} className="flex-1">
            Cancelar
          </BotonSecundario>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl font-semibold text-ink">Galería de trabajos</h2>
        <BotonPrimario onClick={abrirCrear}>
          <IconMas className="h-4 w-4" aria-hidden="true" />
          Agregar foto
        </BotonPrimario>
      </div>

      {datos.galeria.length === 0 && (
        <p className="border border-dashed border-ink/25 bg-paper p-5 text-sm text-ink/55">
          Todavía no hay fotos. Mientras tanto, el sitio muestra marcos vacíos con una nota a mano.
        </p>
      )}

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {datos.galeria.map((t) => (
          <li key={t.id} className="border border-ink/15 bg-paper p-2">
            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-cream-dim">
              {t.foto ? (
                <img src={t.foto} alt={t.titulo} className="h-full w-full object-cover" />
              ) : (
                <span className="px-2 text-center text-xs text-ink/35">Sin foto</span>
              )}
            </div>
            <p className="mt-2 truncate text-sm font-medium text-ink" title={t.titulo}>
              {t.titulo}
            </p>
            {!t.activo && <p className="text-[11px] text-ink/45">Oculto</p>}
            <div className="mt-2 flex gap-1.5">
              <BotonSecundario onClick={() => abrirEditar(t)} className="min-h-[38px] flex-1 px-2 text-xs">
                <IconLapiz className="h-3.5 w-3.5" aria-hidden="true" /> Editar
              </BotonSecundario>
              <BotonSecundario onClick={() => setAEliminar(t)} className="min-h-[38px] px-2 text-xs">
                <IconBasura className="h-3.5 w-3.5" aria-hidden="true" />
              </BotonSecundario>
            </div>
          </li>
        ))}
      </ul>

      {aEliminar && (
        <DialogoConfirmar
          titulo="¿Eliminar esta foto?"
          descripcion={`Se va a borrar "${aEliminar.titulo}" de la galería.`}
          textoConfirmar="Sí, eliminar"
          peligroso
          onConfirmar={() => {
            eliminar('galeria', aEliminar.id)
            setAEliminar(null)
          }}
          onCancelar={() => setAEliminar(null)}
        />
      )}
    </div>
  )
}
