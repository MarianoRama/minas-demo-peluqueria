import { useState } from 'react'
import { NOMBRES_DIA, type BloqueHorario, type DiaBloqueado, type DiaSemana } from '../data'
import { useDatos } from '../data/useDatos'
import { IconBasura, IconMas } from '../components/icons'
import { BotonPrimario, BotonSecundario, Campo, Input, Textarea, Toggle } from './ui'
import { SubidaFoto } from './SubidaFoto'

const DIAS: DiaSemana[] = [1, 2, 3, 4, 5, 6, 0]

export function PanelNegocio() {
  const { datos, actualizarNegocio } = useDatos()
  const n = datos.negocio

  const [nuevaFecha, setNuevaFecha] = useState('')
  const [nuevoMotivo, setNuevoMotivo] = useState('')

  function cambiarHorario(dia: DiaSemana, campo: 'apertura' | 'cierre', valor: number | null) {
    const horarioSemana: BloqueHorario[] = n.horarioSemana.map((b) =>
      b.dia === dia ? { ...b, [campo]: valor } : b,
    )
    actualizarNegocio({ horarioSemana })
  }

  function alternarCerrado(dia: DiaSemana, cerrado: boolean) {
    const horarioSemana: BloqueHorario[] = n.horarioSemana.map((b) =>
      b.dia === dia ? { ...b, apertura: cerrado ? null : 9, cierre: cerrado ? null : 19 } : b,
    )
    actualizarNegocio({ horarioSemana })
  }

  function agregarBloqueo() {
    if (!nuevaFecha) return
    const diasBloqueados: DiaBloqueado[] = [
      ...n.diasBloqueados.filter((b) => b.fecha !== nuevaFecha),
      { fecha: nuevaFecha, motivo: nuevoMotivo.trim() || undefined },
    ].sort((a, b) => a.fecha.localeCompare(b.fecha))
    actualizarNegocio({ diasBloqueados })
    setNuevaFecha('')
    setNuevoMotivo('')
  }

  function quitarBloqueo(fecha: string) {
    actualizarNegocio({ diasBloqueados: n.diasBloqueados.filter((b) => b.fecha !== fecha) })
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Datos del negocio</h2>
        <p className="mt-1 text-sm text-ink/55">
          Esto se ve en el encabezado, el pie de página y la sección de contacto del sitio.
        </p>
      </div>

      <div className="space-y-5 border border-ink/15 bg-paper p-5 sm:p-6">
        <SubidaFoto valor={n.heroFoto} onCambiar={(v) => actualizarNegocio({ heroFoto: v })} etiqueta="Foto del salón (portada)" />
        <Campo etiqueta="Nombre del negocio" htmlFor="n-nombre">
          <Input id="n-nombre" value={n.nombre} onChange={(e) => actualizarNegocio({ nombre: e.target.value })} />
        </Campo>
        <Campo etiqueta="Aviso del home" ayuda="Se muestra como una notita arriba del sitio. Dejalo vacío para ocultarlo." htmlFor="n-aviso">
          <Textarea id="n-aviso" rows={2} value={n.aviso} onChange={(e) => actualizarNegocio({ aviso: e.target.value })} />
        </Campo>
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo etiqueta="WhatsApp" ayuda="Con código de país, solo números (ej: 59899000000)" htmlFor="n-wsp">
            <Input
              id="n-wsp"
              inputMode="numeric"
              value={n.whatsapp}
              onChange={(e) => actualizarNegocio({ whatsapp: e.target.value.replace(/[^0-9]/g, '') })}
            />
          </Campo>
          <Campo etiqueta="Teléfono a mostrar" htmlFor="n-tel">
            <Input id="n-tel" value={n.telefonoDisplay} onChange={(e) => actualizarNegocio({ telefonoDisplay: e.target.value })} />
          </Campo>
        </div>
        <Campo etiqueta="Dirección" htmlFor="n-dir">
          <Input id="n-dir" value={n.direccion} onChange={(e) => actualizarNegocio({ direccion: e.target.value })} />
        </Campo>
        <Campo etiqueta="Referencia" ayuda='Ej: "a dos cuadras de Plaza Libertad"' htmlFor="n-ref">
          <Input id="n-ref" value={n.referencia} onChange={(e) => actualizarNegocio({ referencia: e.target.value })} />
        </Campo>
        <Campo etiqueta="Email" htmlFor="n-email">
          <Input id="n-email" type="email" value={n.email} onChange={(e) => actualizarNegocio({ email: e.target.value })} />
        </Campo>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-ink">Horario semanal</h3>
        <div className="mt-4 divide-y divide-ink/10 border border-ink/15 bg-paper">
          {DIAS.map((dia) => {
            const bloque = n.horarioSemana.find((b) => b.dia === dia)
            const cerrado = !bloque || bloque.apertura === null
            return (
              <div key={dia} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-medium text-ink sm:w-32">{NOMBRES_DIA[dia]}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Toggle
                    id={`cerrado-${dia}`}
                    checked={!cerrado}
                    onChange={(v) => alternarCerrado(dia, !v)}
                    etiqueta={cerrado ? 'Cerrado' : 'Abierto'}
                  />
                  {!cerrado && (
                    <>
                      <label className="flex items-center gap-1.5 text-sm text-ink/60">
                        de
                        <Input
                          type="number"
                          min={0}
                          max={23}
                          value={bloque?.apertura ?? 9}
                          onChange={(e) => cambiarHorario(dia, 'apertura', Number(e.target.value))}
                          className="w-20"
                          aria-label={`Hora de apertura ${NOMBRES_DIA[dia]}`}
                        />
                      </label>
                      <label className="flex items-center gap-1.5 text-sm text-ink/60">
                        a
                        <Input
                          type="number"
                          min={0}
                          max={23}
                          value={bloque?.cierre ?? 19}
                          onChange={(e) => cambiarHorario(dia, 'cierre', Number(e.target.value))}
                          className="w-20"
                          aria-label={`Hora de cierre ${NOMBRES_DIA[dia]}`}
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-ink">Días puntuales cerrados</h3>
        <p className="mt-1 text-sm text-ink/55">Feriados o días sueltos, por ejemplo "el 15 no abrimos".</p>

        <div className="mt-4 flex flex-col gap-3 border border-ink/15 bg-paper p-4 sm:flex-row sm:items-end">
          <Campo etiqueta="Fecha" htmlFor="n-fecha-bloqueo">
            <Input id="n-fecha-bloqueo" type="date" value={nuevaFecha} onChange={(e) => setNuevaFecha(e.target.value)} />
          </Campo>
          <Campo etiqueta="Motivo (opcional)" htmlFor="n-motivo-bloqueo">
            <Input
              id="n-motivo-bloqueo"
              value={nuevoMotivo}
              onChange={(e) => setNuevoMotivo(e.target.value)}
              placeholder="Ej: feriado, arreglos en el local"
            />
          </Campo>
          <BotonPrimario onClick={agregarBloqueo} disabled={!nuevaFecha}>
            <IconMas className="h-4 w-4" aria-hidden="true" /> Agregar
          </BotonPrimario>
        </div>

        {n.diasBloqueados.length > 0 && (
          <ul className="mt-3 divide-y divide-ink/10 border border-ink/15 bg-paper">
            {n.diasBloqueados.map((b) => (
              <li key={b.fecha} className="flex items-center justify-between p-3 text-sm">
                <span>
                  <strong className="font-medium text-ink">{b.fecha}</strong>
                  {b.motivo && <span className="text-ink/55"> · {b.motivo}</span>}
                </span>
                <BotonSecundario onClick={() => quitarBloqueo(b.fecha)} className="min-h-[36px] px-3 text-xs">
                  <IconBasura className="h-3.5 w-3.5" aria-hidden="true" /> Quitar
                </BotonSecundario>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
