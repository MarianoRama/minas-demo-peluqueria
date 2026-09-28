import { useMemo, useState } from 'react'
import { CATEGORIAS, type Servicio } from '../data'
import { useDatos } from '../data/useDatos'
import { FUENTE_DATOS } from '../config'
import { IconBasura, IconBuscar, IconCopiar, IconLapiz, IconMas } from '../components/icons'
import { BotonPrimario, BotonSecundario, Campo, Input, Select, Textarea, Toggle, DialogoConfirmar, Aviso } from './ui'

function nuevoId(nombre: string) {
  const base = nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${base || 'servicio'}-${Date.now().toString(36)}`
}

function formatearPrecio(precio: number) {
  return `$${precio.toLocaleString('es-UY')}`
}

type FormState = {
  nombre: string
  categoria: string
  precio: string
  duracionMin: string
  descripcion: string
  activo: boolean
  destacado: boolean
}

function servicioAForm(s: Servicio | null): FormState {
  return {
    nombre: s?.nombre ?? '',
    categoria: s?.categoria ?? CATEGORIAS[0],
    precio: s ? String(s.precio) : '',
    duracionMin: s ? String(s.duracionMin) : '',
    descripcion: s?.descripcion ?? '',
    activo: s?.activo ?? true,
    destacado: s?.destacado ?? false,
  }
}

export function PanelServicios() {
  const { datos, crear, actualizar, eliminar } = useDatos()
  const [busqueda, setBusqueda] = useState('')
  const [editando, setEditando] = useState<Servicio | null>(null)
  const [creando, setCreando] = useState(false)
  const [aEliminar, setAEliminar] = useState<Servicio | null>(null)
  const [form, setForm] = useState<FormState>(servicioAForm(null))
  const [errores, setErrores] = useState<Partial<Record<keyof FormState, string>>>({})

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return datos.servicios
    return datos.servicios.filter(
      (s) => s.nombre.toLowerCase().includes(q) || s.categoria.toLowerCase().includes(q),
    )
  }, [datos.servicios, busqueda])

  if (FUENTE_DATOS.tipo === 'sheets') {
    return (
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-ink">Servicios y precios</h2>
        <Aviso>
          Estos datos se editan en tu planilla de Google.{' '}
          <a href={FUENTE_DATOS.csvUrl} target="_blank" rel="noopener noreferrer" className="underline">
            Abrir planilla
          </a>
        </Aviso>
      </div>
    )
  }

  function abrirCrear() {
    setForm(servicioAForm(null))
    setErrores({})
    setCreando(true)
    setEditando(null)
  }

  function abrirEditar(s: Servicio) {
    setForm(servicioAForm(s))
    setErrores({})
    setEditando(s)
    setCreando(false)
  }

  function cerrarFormulario() {
    setCreando(false)
    setEditando(null)
  }

  function duplicar(s: Servicio) {
    crear('servicios', { ...s, id: nuevoId(s.nombre + '-copia'), nombre: `${s.nombre} (copia)` })
  }

  function validar(): boolean {
    const nuevosErrores: typeof errores = {}
    if (form.nombre.trim().length < 2) nuevosErrores.nombre = 'Escribí el nombre del servicio.'
    const precioNum = Number(form.precio)
    if (!form.precio || Number.isNaN(precioNum) || precioNum <= 0) {
      nuevosErrores.precio = 'Ingresá un precio válido en pesos, sin puntos.'
    }
    const duracionNum = Number(form.duracionMin)
    if (!form.duracionMin || Number.isNaN(duracionNum) || duracionNum <= 0) {
      nuevosErrores.duracionMin = 'Ingresá la duración en minutos (ej: 45).'
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function guardar() {
    if (!validar()) return
    const item: Servicio = {
      id: editando?.id ?? nuevoId(form.nombre),
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      precio: Number(form.precio),
      duracionMin: Number(form.duracionMin),
      descripcion: form.descripcion.trim() || undefined,
      activo: form.activo,
      destacado: form.destacado,
    }
    if (editando) actualizar('servicios', editando.id, item)
    else crear('servicios', item)
    cerrarFormulario()
  }

  const mostrandoFormulario = creando || editando !== null

  if (mostrandoFormulario) {
    return (
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          {editando ? 'Editar servicio' : 'Nuevo servicio'}
        </h2>
        <div className="space-y-5 border border-ink/15 bg-paper p-5 sm:p-6">
          <Campo etiqueta="Nombre" htmlFor="s-nombre" error={errores.nombre}>
            <Input
              id="s-nombre"
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              placeholder="Ej: Corte dama"
            />
          </Campo>
          <Campo etiqueta="Categoría" htmlFor="s-categoria">
            <Select
              id="s-categoria"
              value={form.categoria}
              onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
            >
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Campo>
          <div className="grid grid-cols-2 gap-4">
            <Campo etiqueta="Precio" ayuda="En pesos, sin puntos" htmlFor="s-precio" error={errores.precio}>
              <Input
                id="s-precio"
                inputMode="numeric"
                value={form.precio}
                onChange={(e) => setForm((f) => ({ ...f, precio: e.target.value.replace(/[^0-9]/g, '') }))}
                placeholder="450"
              />
            </Campo>
            <Campo etiqueta="Duración" ayuda="En minutos" htmlFor="s-duracion" error={errores.duracionMin}>
              <Input
                id="s-duracion"
                inputMode="numeric"
                value={form.duracionMin}
                onChange={(e) => setForm((f) => ({ ...f, duracionMin: e.target.value.replace(/[^0-9]/g, '') }))}
                placeholder="45"
              />
            </Campo>
          </div>
          <Campo etiqueta="Descripción" ayuda="Opcional, una línea corta" htmlFor="s-desc">
            <Textarea
              id="s-desc"
              rows={2}
              value={form.descripcion}
              onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
            />
          </Campo>
          <div className="space-y-3 border-t border-ink/10 pt-4">
            <Toggle
              id="s-activo"
              checked={form.activo}
              onChange={(v) => setForm((f) => ({ ...f, activo: v }))}
              etiqueta="Activo (aparece en la carta y se puede reservar)"
            />
            <Toggle
              id="s-destacado"
              checked={form.destacado}
              onChange={(v) => setForm((f) => ({ ...f, destacado: v }))}
              etiqueta='Marcar "¡lo más pedido!" en la carta'
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <BotonPrimario onClick={guardar} className="flex-1">
            Guardar servicio
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
        <h2 className="font-display text-2xl font-semibold text-ink">Servicios y precios</h2>
        <BotonPrimario onClick={abrirCrear}>
          <IconMas className="h-4 w-4" aria-hidden="true" />
          Nuevo servicio
        </BotonPrimario>
      </div>

      <div className="relative">
        <IconBuscar className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink/40" aria-hidden="true" />
        <Input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o categoría"
          className="pl-10"
          aria-label="Buscar servicio"
        />
      </div>

      <ul className="divide-y divide-ink/10 border border-ink/15 bg-paper">
        {filtrados.length === 0 && <li className="p-5 text-sm text-ink/50">No hay servicios que coincidan.</li>}
        {filtrados.map((s) => (
          <li key={s.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 font-medium text-ink">
                {s.nombre}
                {!s.activo && (
                  <span className="border border-ink/20 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-ink/50 uppercase">
                    Pausado
                  </span>
                )}
                {s.destacado && (
                  <span className="border border-wine/40 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-wine uppercase">
                    Destacado
                  </span>
                )}
              </p>
              <p className="text-sm text-ink/50">
                {s.categoria} · {formatearPrecio(s.precio)} · {s.duracionMin} min
              </p>
            </div>
            <div className="flex gap-2">
              <BotonSecundario onClick={() => abrirEditar(s)} className="min-h-[40px] px-3 text-xs">
                <IconLapiz className="h-3.5 w-3.5" aria-hidden="true" /> Editar
              </BotonSecundario>
              <BotonSecundario onClick={() => duplicar(s)} className="min-h-[40px] px-3 text-xs">
                <IconCopiar className="h-3.5 w-3.5" aria-hidden="true" /> Duplicar
              </BotonSecundario>
              <BotonSecundario onClick={() => setAEliminar(s)} className="min-h-[40px] px-3 text-xs">
                <IconBasura className="h-3.5 w-3.5" aria-hidden="true" /> Eliminar
              </BotonSecundario>
            </div>
          </li>
        ))}
      </ul>

      {aEliminar && (
        <DialogoConfirmar
          titulo="¿Eliminar servicio?"
          descripcion={`Se va a borrar "${aEliminar.nombre}" de la carta. Esta acción no se puede deshacer.`}
          textoConfirmar="Sí, eliminar"
          peligroso
          onConfirmar={() => {
            eliminar('servicios', aEliminar.id)
            setAEliminar(null)
          }}
          onCancelar={() => setAEliminar(null)}
        />
      )}
    </div>
  )
}
