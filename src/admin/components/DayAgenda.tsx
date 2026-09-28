import { nombreServicio } from '../data/estilistas'
import { buildWhatsAppConfirmUrl } from '../lib/whatsapp'
import type { Estilista, Reserva, ServicioReserva } from '../types'

function DayAgenda({
  reservas,
  estilista,
  fechaISO,
  servicios,
  onCancelar,
  onConfirmar,
}: {
  reservas: Reserva[]
  estilista: Estilista
  fechaISO: string
  servicios: ServicioReserva[]
  onCancelar: (id: string) => void
  onConfirmar: (id: string) => void
}) {
  const ordenadas = [...reservas].sort((a, b) => a.hora.localeCompare(b.hora))

  if (ordenadas.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-rosewood/20 bg-white/60 px-4 py-10 text-center">
        <p className="text-sm text-charcoal/50">
          No hay turnos cargados para este día todavía.
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {ordenadas.map((reserva) => {
        const idsServicios = reserva.servicios?.length ? reserva.servicios : [reserva.servicio]
        const nombresServicios = idsServicios.map((id) => nombreServicio(servicios, id)).join(', ')
        const whatsappUrl = buildWhatsAppConfirmUrl({
          telefono: reserva.telefono,
          cliente: reserva.cliente,
          servicioNombre: nombresServicios,
          fechaISO,
          hora: reserva.hora,
          estilistaNombre: estilista.nombre,
        })
        const pendiente = reserva.estado === 'pendiente'

        return (
          <li
            key={reserva.id}
            className={`rounded-2xl border p-4 shadow-sm ${
              pendiente ? 'border-amber-300 bg-amber-50/60' : 'border-rosewood/10 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-bold text-rosewood">
                    {reserva.hora}
                  </span>
                  {pendiente && (
                    <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                      Pendiente
                    </span>
                  )}
                </div>
                <p className="mt-0.5 font-semibold text-charcoal">
                  {reserva.cliente}
                </p>
                <p className="text-sm text-charcoal/60">{reserva.telefono}</p>
                <span className="mt-1 inline-block rounded-full bg-gold-light/60 px-2.5 py-0.5 text-xs font-semibold text-charcoal/70">
                  {nombresServicios}
                {reserva.duracionMinutos && <span className="mt-1 block text-xs text-charcoal/55">Duración estimada total: {reserva.duracionMinutos} min</span>}
                </span>
              </div>
              <button
                onClick={() => onCancelar(reserva.id)}
                title="Cancelar reserva"
                className="shrink-0 rounded-full p-2 text-charcoal/30 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                ✕
              </button>
            </div>

            {pendiente && (
              <p className="mt-3 text-xs text-amber-700">
                Reservado por el cliente desde el sitio. Confirmalo cuando
                quede acordado.
              </p>
            )}

            <div className="mt-3 flex gap-2">
              {pendiente && (
                <button
                  onClick={() => onConfirmar(reserva.id)}
                  className="flex-1 rounded-xl border border-amber-500 px-4 py-2.5 text-sm font-semibold text-amber-700 transition-colors active:scale-95 hover:bg-amber-100"
                >
                  ✓ Confirmar turno
                </button>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95"
              >
                💬 WhatsApp
              </a>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default DayAgenda


