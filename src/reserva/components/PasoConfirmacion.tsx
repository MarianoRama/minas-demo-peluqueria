import { nombreServicio } from '../../admin/data/estilistas'
import { formatoLargo } from '../../admin/lib/fechas'
import { buildWhatsAppConfirmUrl } from '../../admin/lib/whatsapp'
import type { Estilista, Reserva, ServicioReserva } from '../../admin/types'

function Fila({
  label,
  valor,
  className,
}: {
  label: string
  valor: string
  className?: string
}) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-charcoal/10 pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-charcoal/60">{label}</span>
      <span className={`text-sm font-semibold text-charcoal ${className ?? ''}`}>
        {valor}
      </span>
    </div>
  )
}

function PasoConfirmacion({
  servicios,
  servicioId,
  estilista,
  fecha,
  hora,
  cliente,
  telefono,
  reservaCreada,
  onConfirmar,
}: {
  servicios: ServicioReserva[]
  servicioId: string
  estilista: Estilista
  fecha: string
  hora: string
  cliente: string
  telefono: string
  reservaCreada: Reserva | null
  onConfirmar: () => void
}) {
  const nombreServ = nombreServicio(servicios, servicioId)

  if (reservaCreada) {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <span className="text-4xl">✅</span>
        <h2 className="font-display text-xl font-bold text-charcoal">
          ¡Turno solicitado!
        </h2>
        <p className="text-sm text-charcoal/60">
          Tu turno quedó <strong>pendiente de confirmación</strong> por parte
          de {estilista.nombre}. Te contactamos para confirmarlo.
        </p>

        <div className="w-full rounded-2xl border border-rosewood/10 bg-white p-4 text-left text-sm shadow-sm">
          <p>
            <strong>Servicio:</strong> {nombreServ}
          </p>
          <p>
            <strong>Estilista:</strong> {estilista.nombre}
          </p>
          <p className="capitalize">
            <strong>Día:</strong> {formatoLargo(fecha)} a las {hora}
          </p>
        </div>

        <a
          href={buildWhatsAppConfirmUrl({
            telefono,
            cliente,
            servicioNombre: nombreServ,
            fechaISO: fecha,
            hora,
            estilistaNombre: estilista.nombre,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3.5 text-base font-semibold text-white shadow-sm transition-transform active:scale-95"
        >
          💬 Avisar por WhatsApp
        </a>
        <a
          href="#inicio"
          className="w-full rounded-xl border border-rosewood/20 px-4 py-3.5 text-center text-base font-semibold text-charcoal transition-colors hover:bg-rosewood/5"
        >
          Volver al inicio
        </a>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold text-charcoal">
        Confirmá tu turno
      </h2>
      <p className="mb-4 text-sm text-charcoal/60">
        Revisá los datos antes de confirmar.
      </p>

      <div className="flex flex-col gap-3 rounded-2xl border border-rosewood/10 bg-white p-5 shadow-sm">
        <Fila label="Servicio" valor={nombreServ} />
        <Fila label="Estilista" valor={estilista.nombre} />
        <Fila label="Fecha" valor={formatoLargo(fecha)} className="capitalize" />
        <Fila label="Hora" valor={hora} />
        <Fila label="Nombre" valor={cliente} />
        <Fila label="Teléfono" valor={telefono} />
      </div>

      <p className="mt-4 text-xs text-charcoal/50">
        Tu turno queda como <strong>pendiente</strong> hasta que{' '}
        {estilista.nombre} lo confirme.
      </p>

      <button
        type="button"
        onClick={onConfirmar}
        className="mt-6 w-full rounded-xl bg-rosewood px-6 py-4 text-base font-semibold text-white shadow-sm transition-transform active:scale-95"
      >
        Confirmar reserva
      </button>
    </div>
  )
}

export default PasoConfirmacion
