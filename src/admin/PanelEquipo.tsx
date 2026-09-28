import { useMemo, useState } from 'react'
import { NOMBRES_DIA, type DiaSemana, type Profesional } from '../data'
import { useDatos } from '../data/useDatos'
import { IconBasura, IconBuscar, IconCopiar, IconLapiz, IconMas } from '../components/icons'
import { BotonPrimario, BotonSecundario, Campo, Input, Toggle, DialogoConfirmar } from './ui'
import { SubidaFoto } from './SubidaFoto'

const DIAS: DiaSemana[] = [0, 1, 2, 3, 4, 5, 6]

function nuevoId(nombre: string) {
  const base = nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${base || 'persona'}-${Date.now().toString(36)}`
}

function iniciales(nombre: string) {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

type FormState = {
  nombre: string
  rol: string
  especialidad: string
  diasTrabaja: DiaSemana[]
  activo: boolean
  foto?: string
}

function personaAForm(p: Profesional | null): FormState {
  return {
    nombre: p?.nombre ?? '',
    rol: p?.rol ?? '',
    especialidad: p?.especialidad ?? '',
    diasTrabaja: p?.diasTrabaja ?? [1, 2, 3, 4, 5],
    activo: p?.activo ?? true,
    foto: p?.foto,
  }
}

export function PanelEquipo() {
  const { datos, crear, actualizar, eliminar } = useDatos()
  const [busqueda, setBusqueda] = useState('')
  const [editando, setEditando] = useState<Profesional | null>(null)
  const [creando, setCreando] = useState(false)
  const [aEliminar, setAEliminar] = useState<Profesional | null>(null)
  const [form, setForm] = useState<FormState>(personaAForm(null))
  const [errores, setErrores] = useState<Partial<Record<'nombre' | 'rol' | 'diasTrabaja', string>>>({})

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return datos.equipo
    return datos.equipo.filter((p) => p.nombre.toLowerCase().includes(q) || p.rol.toLowerCase().includes(q))
  }, [datos.equipo, busqueda])

  function abrirCrear() {
    setForm(personaAForm(null))
    setErrores({})
    setCreando(true)
    setEditando(null)
  }

  function abrirEditar(p: Profesional) {
    setForm(personaAForm(p))
    setErrores({})
    setEditando(p)
    setCreando(false)
  }

  function cerrarFormulario() {
    setCreando(false)
    setEditando(null)
  }

  function duplicar(p: Profesional) {
    crear('equipo', { ...p, id: nuevoId(p.nombre + '-copia'), nombre: `${p.nombre} (copia)` })
  }

  function alternarDia(dia: DiaSemana) {
    setForm((f) => ({
      ...f,
      diasTrabaja: f.diasTrabaja.includes(dia) ? f.diasTrabaja.filter((d) => d !== dia) : [...f.diasTrabaja, dia].sort(),
    }))
  }

  function validar(): boolean {
    const nuevosErrores: typeof errores = {}
    if (form.nombre.trim().length < 2) nuevosErrores.nombre = 'Escribí nombre y apellido.'
    if (form.rol.trim().length < 2) nuevosErrores.rol = 'Escribí el rol (ej: Estilista, Barbero).'
    if (form.diasTrabaja.length === 0) nuevosErrores.diasTrabaja = 'Elegí al menos un día.'
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function guardar() {
    if (!validar()) return
    const item: Profesional = {
      id: editando?.id ?? nuevoId(form.nombre),
      nombre: form.nombre.trim(),
      iniciales: iniciales(form.nombre),
      rol: form.rol.trim(),
      especialidad: form.especialidad.trim(),
      diasTrabaja: form.diasTrabaja,
      activo: form.activo,
      foto: form.foto,
    }
    if (editando) actualizar('equipo', editando.id, item)
    else crear('equipo', item)
    cerrarFormulario()
  }

  const mostrandoFormulario = creando || editando !== null

  if (mostrandoFormulario) {
    return (
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          {editando ? 'Editar profesional' : 'Nuevo profesional'}
        </h2>
        <div className="space-y-5 border border-ink/15 bg-paper p-5 sm:p-6">
          <SubidaFoto valor={form.foto} onCambiar={(v) => setForm((f) => ({ ...f, foto: v }))} etiqueta="Foto de perfil" />
          <Campo etiqueta="Nombre y apellido" htmlFor="p-nombre" error={errores.nombre}>
            <Input id="p-nombre" value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} />
          </Campo>
          <Campo etiqueta="Rol" ayuda="Ej: Estilista senior, Barbero" htmlFor="p-rol" error={errores.rol}>
            <Input id="p-rol" value={form.rol} onChange={(e) => setForm((f) => ({ ...f, rol: e.target.value }))} />
          </Campo>
          <Campo etiqueta="Especialidad" htmlFor="p-esp">
            <Input
              id="p-esp"
              value={form.especialidad}
              onChange={(e) => setForm((f) => ({ ...f, especialidad: e.target.value }))}
            />
          </Campo>
          <Campo etiqueta="Días que atiende" htmlFor="p-dias" error={errores.diasTrabaja}>
            <div id="p-dias" className="flex flex-wrap gap-2">
              {DIAS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => alternarDia(d)}
                  className={`min-h-[44px] border px-3 text-sm font-medium transition-colors ${
                    form.diasTrabaja.includes(d) ? 'border-wine bg-wine text-cream' : 'border-ink/25 text-ink/70'
                  }`}
                >
                  {NOMBRES_DIA[d].slice(0, 3)}
                </button>
              ))}
            </div>
          </Campo>
          <Toggle
            id="p-activo"
            checked={form.activo}
            onChange={(v) => setForm((f) => ({ ...f, activo: v }))}
            etiqueta="Activo (aparece en el equipo y se puede elegir al reservar)"
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
        <h2 className="font-display text-2xl font-semibold text-ink">Equipo</h2>
        <BotonPrimario onClick={abrirCrear}>
          <IconMas className="h-4 w-4" aria-hidden="true" />
          Agregar persona
        </BotonPrimario>
      </div>

      <div className="relative">
        <IconBuscar className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink/40" aria-hidden="true" />
        <Input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o rol"
          className="pl-10"
          aria-label="Buscar en el equipo"
        />
      </div>

      <ul className="divide-y divide-ink/10 border border-ink/15 bg-paper">
        {filtrados.length === 0 && <li className="p-5 text-sm text-ink/50">No hay nadie que coincida.</li>}
        {filtrados.map((p) => (
          <li key={p.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-ink/15 bg-cream-dim font-display text-sm text-wine">
                {p.foto ? <img src={p.foto} alt="" className="h-full w-full object-cover" /> : p.iniciales}
              </div>
              <div>
                <p className="flex flex-wrap items-center gap-2 font-medium text-ink">
                  {p.nombre}
                  {!p.activo && (
                    <span className="border border-ink/20 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-ink/50 uppercase">
                      Pausado
                    </span>
                  )}
                </p>
                <p className="text-sm text-ink/50">{p.rol}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <BotonSecundario onClick={() => abrirEditar(p)} className="min-h-[40px] px-3 text-xs">
                <IconLapiz className="h-3.5 w-3.5" aria-hidden="true" /> Editar
              </BotonSecundario>
              <BotonSecundario onClick={() => duplicar(p)} className="min-h-[40px] px-3 text-xs">
                <IconCopiar className="h-3.5 w-3.5" aria-hidden="true" /> Duplicar
              </BotonSecundario>
              <BotonSecundario onClick={() => setAEliminar(p)} className="min-h-[40px] px-3 text-xs">
                <IconBasura className="h-3.5 w-3.5" aria-hidden="true" /> Eliminar
              </BotonSecundario>
            </div>
          </li>
        ))}
      </ul>

      {aEliminar && (
        <DialogoConfirmar
          titulo="¿Eliminar esta persona?"
          descripcion={`Se va a borrar a "${aEliminar.nombre}" del equipo. Esta acción no se puede deshacer.`}
          textoConfirmar="Sí, eliminar"
          peligroso
          onConfirmar={() => {
            eliminar('equipo', aEliminar.id)
            setAEliminar(null)
          }}
          onCancelar={() => setAEliminar(null)}
        />
      )}
    </div>
  )
}
