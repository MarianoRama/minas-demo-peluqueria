import { nombreServicio } from '../../admin/data/estilistas'
import { formatoLargo } from '../../admin/lib/fechas'
import type { Estilista, Reserva, ServicioReserva } from '../../admin/types'

function Fila({ label, valor, className }: { label: string; valor: string; className?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-dashed border-charcoal/10 pb-2 last:border-0 last:pb-0">
      <span className="shrink-0 text-sm text-charcoal/60">{label}</span>
      <span className={`text-right text-sm font-semibold text-charcoal ${className ?? ''}`}>{valor}</span>
    </div>
  )
}

function PasoConfirmacion({
  servicios,
  servicioIds,
  duracionMinutos,
  precioEstimado,
  estilista,
  fecha,
  hora,
  cliente,
  telefono,
  reservaCreada,
  onConfirmar,
}: {
  servicios: ServicioReserva[]
  servicioIds: string[]
  duracionMinutos: number
  precioEstimado?: string
  estilista: Estilista
  fecha: string
  hora: string
  cliente: string
  telefono: string
  reservaCreada: Reserva | null
  onConfirmar: () => void
}) {
  const nombreServicios = servicioIds.map((id) => nombreServicio(servicios, id)).join(', ')

  if (reservaCreada) {
    return (
      <div className="flex flex-col gap-4 py-4">
        <div className="text-center">
          <span className="text-4xl" aria-hidden="true">✓</span>
          <h2 className="mt-2 font-display text-xl font-bold text-charcoal">Solicitud de prueba guardada</h2>
        </div>
        <p role="status" className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Demo: la solicitud quedó guardada solo en este navegador. No se envió al salón y no reservó un turno real.
        </p>
        <div className="flex flex-col gap-3 rounded-2xl border border-rosewood/10 bg-white p-5 shadow-sm">
          <Fila label="Servicios" valor={nombreServicios} />
          <Fila label="Duración estimada" valor={`${duracionMinutos} min`} />
          {precioEstimado && <Fila label="Precio de ejemplo" valor={precioEstimado} />}
          <Fila label="Estilista" valor={estilista.nombre} />
          <Fila label="Fecha y hora" valor={`${formatoLargo(fecha)} · ${hora}`} className="capitalize" />
          <Fila label="Nombre" valor={cliente} />
          <Fila label="Teléfono" valor={telefono} />
        </div>
        <a href="#inicio" className="w-full rounded-xl border border-rosewood/20 px-4 py-3.5 text-center text-base font-semibold text-charcoal transition-colors hover:bg-rosewood/5">
          Volver al inicio
        </a>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold text-charcoal">Revisá tu solicitud</h2>
      <p className="mb-4 text-sm text-charcoal/60">Comprobá los servicios y el horario antes de guardarla.</p>
      <div className="flex flex-col gap-3 rounded-2xl border border-rosewood/10 bg-white p-5 shadow-sm">
        <Fila label="Servicios" valor={nombreServicios} />
        <Fila label="Duración estimada" valor={`${duracionMinutos} min`} />
        {precioEstimado && <Fila label="Precio de ejemplo" valor={precioEstimado} />}
        <Fila label="Estilista" valor={estilista.nombre} />
        <Fila label="Fecha y hora" valor={`${formatoLargo(fecha)} · ${hora}`} className="capitalize" />
        <Fila label="Nombre" valor={cliente} />
        <Fila label="Teléfono" valor={telefono} />
      </div>
      <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
        Demo: al guardar se crea un registro local solo en este navegador. No se envía al salón ni confirma un turno real.
      </p>
      <button type="button" onClick={onConfirmar} className="mt-4 w-full rounded-xl bg-rosewood px-6 py-4 text-base font-semibold text-white shadow-sm transition-transform active:scale-95">
        Guardar solicitud de prueba
      </button>
    </div>
  )
}

export default PasoConfirmacion
