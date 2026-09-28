import { useState } from 'react'
import { nombreServicio } from '../data/estilistas'
import { hoyISO } from '../lib/fechas'
import { fechaBloqueadaParaEstilista } from '../lib/disponibilidad'
import { buildWhatsAppConfirmUrl } from '../lib/whatsapp'
import type { Estilista, Reserva, ServicioReserva } from '../types'

function NewBookingModal({
  estilista,
  fechaInicial,
  diasCerrados,
  diasLibresSemana,
  diasLibresPersonales,
  servicios,
  onGuardar,
  onCerrar,
}: {
  estilista: Estilista
  fechaInicial: string
  diasCerrados: string[]
  diasLibresSemana: number[]
  diasLibresPersonales: string[]
  servicios: ServicioReserva[]
  onGuardar: (reserva: Reserva) => void
  onCerrar: () => void
}) {
  const [cliente, setCliente] = useState('')
  const [telefono, setTelefono] = useState('')
  const [servicio, setServicio] = useState<string>(servicios[0]?.id ?? '')
  const [fecha, setFecha] = useState(fechaInicial)
  const [hora, setHora] = useState('')
  const [reservaCreada, setReservaCreada] = useState<Reserva | null>(null)

  const cerrado = fechaBloqueadaParaEstilista(
    fecha,
    diasCerrados,
    diasLibresSemana,
    diasLibresPersonales,
  )
  const formValido =
    cliente.trim() !== '' && telefono.trim() !== '' && hora !== '' && servicio !== '' && !cerrado

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formValido) return

    const reserva: Reserva = {
      id: crypto.randomUUID(),
      estilistaId: estilista.id,
      cliente: cliente.trim(),
      telefono: telefono.trim(),
      servicio,
      fecha,
      hora,
      estado: 'confirmada',
      creadaEn: Date.now(),
    }
    onGuardar(reserva)
    setReservaCreada(reserva)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-charcoal/50 backdrop-blur-sm sm:items-center">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        {!reservaCreada ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-charcoal">
                Nueva reserva
              </h2>
              <button
                onClick={onCerrar}
                className="rounded-full p-2 text-charcoal/40 hover:bg-charcoal/5"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-charcoal/70">
                  Cliente
                </span>
                <input
                  autoFocus
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="Nombre y apellido"
                  className="rounded-xl border border-rosewood/20 px-4 py-3 text-base outline-none focus:border-rosewood"
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-charcoal/70">
                  Teléfono
                </span>
                <input
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  type="tel"
                  inputMode="tel"
                  placeholder="099 000 000"
                  className="rounded-xl border border-rosewood/20 px-4 py-3 text-base outline-none focus:border-rosewood"
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-charcoal/70">
                  Servicio
                </span>
                <select
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                  className="rounded-xl border border-rosewood/20 px-4 py-3 text-base outline-none focus:border-rosewood"
                >
                  {servicios.length === 0 && <option value="">Sin servicios cargados</option>}
                  {servicios.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex gap-3">
                <label className="flex flex-1 flex-col gap-1.5">
                  <span className="text-sm font-semibold text-charcoal/70">
                    Fecha
                  </span>
                  <input
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    type="date"
                    min={hoyISO()}
                    className="rounded-xl border border-rosewood/20 px-3 py-3 text-base outline-none focus:border-rosewood"
                    required
                  />
                </label>
                <label className="flex flex-1 flex-col gap-1.5">
                  <span className="text-sm font-semibold text-charcoal/70">
                    Hora
                  </span>
                  <input
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    type="time"
                    className="rounded-xl border border-rosewood/20 px-3 py-3 text-base outline-none focus:border-rosewood"
                    required
                  />
                </label>
              </div>

              {cerrado && (
                <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                  Este día no está disponible (cierre del salón o día libre
                  de {estilista.nombre}). Elegí otra fecha o revisá "Días
                  cerrados".
                </p>
              )}

              <button
                type="submit"
                disabled={!formValido}
                className="mt-2 rounded-xl bg-rosewood px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Guardar reserva
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <span className="text-4xl">✅</span>
            <h2 className="font-display text-xl font-bold text-charcoal">
              Reserva guardada
            </h2>
            <p className="text-sm text-charcoal/60">
              {reservaCreada.cliente} — {nombreServicio(servicios, reservaCreada.servicio)}{' '}
              — {reservaCreada.fecha} {reservaCreada.hora}
            </p>
            <a
              href={buildWhatsAppConfirmUrl({
                telefono: reservaCreada.telefono,
                cliente: reservaCreada.cliente,
                servicioNombre: nombreServicio(servicios, reservaCreada.servicio),
                fechaISO: reservaCreada.fecha,
                hora: reservaCreada.hora,
                estilistaNombre: estilista.nombre,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-base font-semibold text-white shadow-sm transition-transform active:scale-95"
            >
              💬 Enviar confirmación por WhatsApp
            </a>
            <button
              onClick={onCerrar}
              className="w-full rounded-xl border border-rosewood/20 px-4 py-3 text-base font-semibold text-charcoal transition-colors hover:bg-rosewood/5"
            >
              Listo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewBookingModal
