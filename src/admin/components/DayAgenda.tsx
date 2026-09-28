import { nombreServicio } from '../data/estilistas'
import { buildWhatsAppConfirmUrl } from '../lib/whatsapp'
import type { Estilista, Reserva } from '../types'

function DayAgenda({
  reservas,
  estilista,
  fechaISO,
  onCancelar,
}: {
  reservas: Reserva[]
  estilista: Estilista
  fechaISO: string
  onCancelar: (id: string) => void
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
        const whatsappUrl = buildWhatsAppConfirmUrl({
          telefono: reserva.telefono,
          cliente: reserva.cliente,
          servicioNombre: nombreServicio(reserva.servicio),
          fechaISO,
          hora: reserva.hora,
          estilistaNombre: estilista.nombre,
        })

        return (
          <li
            key={reserva.id}
            className="rounded-2xl border border-rosewood/10 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-display text-lg font-bold text-rosewood">
                  {reserva.hora}
                </span>
                <p className="mt-0.5 font-semibold text-charcoal">
                  {reserva.cliente}
                </p>
                <p className="text-sm text-charcoal/60">{reserva.telefono}</p>
                <span className="mt-1 inline-block rounded-full bg-gold-light/60 px-2.5 py-0.5 text-xs font-semibold text-charcoal/70">
                  {nombreServicio(reserva.servicio)}
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

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95"
            >
              💬 Enviar confirmación por WhatsApp
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default DayAgenda
