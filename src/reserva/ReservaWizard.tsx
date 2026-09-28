/**
 * Wizard de reserva pública: permite que el cliente reserve su propio turno
 * desde el sitio (#/reservar), sin pasar por la estilista. Complementa al
 * panel interno (`src/admin/components/AdminPanel.tsx`), que sigue igual
 * para cuando la estilista carga un turno a mano.
 *
 * Guarda en el mismo storage de reservas que usa el panel interno
 * (`src/admin/lib/storage.ts`), pero con estado inicial 'pendiente' — la
 * estilista la confirma después desde la pestaña "Agenda" del panel.
 */
import { useMemo, useState } from 'react'
import { ESTILISTAS } from '../admin/data/estilistas'
import type { Reserva, ServicioReserva } from '../admin/types'
import {
  loadDiasCerrados,
  loadDiasLibresPersonales,
  loadDiasLibresSemana,
  loadReservas,
  loadServicios,
  saveReservas,
} from '../admin/lib/storage'
import { CUALQUIERA_ID } from './constants'
import ProgresoPasos from './components/ProgresoPasos'
import PasoServicio from './components/PasoServicio'
import PasoEstilista from './components/PasoEstilista'
import PasoFechaHora from './components/PasoFechaHora'
import PasoContacto from './components/PasoContacto'
import PasoConfirmacion from './components/PasoConfirmacion'

const TOTAL_PASOS = 5

function ReservaWizard() {
  const [paso, setPaso] = useState(1)
  const [servicios] = useState<ServicioReserva[]>(() => loadServicios())
  const [reservas, setReservas] = useState<Reserva[]>(() => loadReservas())
  const [diasCerrados] = useState(() => loadDiasCerrados())
  const [diasLibresSemana] = useState(() => loadDiasLibresSemana())
  const [diasLibresPersonales] = useState(() => loadDiasLibresPersonales())

  const [servicioId, setServicioId] = useState<string | null>(null)
  const [estilistaId, setEstilistaId] = useState<string | null>(null)
  const [fecha, setFecha] = useState<string | null>(null)
  const [hora, setHora] = useState<string | null>(null)
  const [estilistaAsignadoId, setEstilistaAsignadoId] = useState<string | null>(null)
  const [cliente, setCliente] = useState('')
  const [telefono, setTelefono] = useState('')
  const [reservaCreada, setReservaCreada] = useState<Reserva | null>(null)

  const estilistaAsignado = useMemo(
    () => ESTILISTAS.find((e) => e.id === estilistaAsignadoId) ?? null,
    [estilistaAsignadoId],
  )

  function scrollArriba() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function irSiguiente() {
    setPaso((p) => Math.min(TOTAL_PASOS, p + 1))
    scrollArriba()
  }

  function irAtras() {
    setPaso((p) => Math.max(1, p - 1))
    scrollArriba()
  }

  function handleSeleccionEstilista(id: string) {
    setEstilistaId(id)
    // Si ya se había elegido fecha/hora antes de cambiar de estilista, se
    // resetea: la disponibilidad depende de con quién se atienda.
    setFecha(null)
    setHora(null)
    setEstilistaAsignadoId(id === CUALQUIERA_ID ? null : id)
  }

  function handleSeleccionFechaHora(f: string, h: string, asignadoId: string) {
    setFecha(f)
    setHora(h)
    setEstilistaAsignadoId(asignadoId)
  }

  function handleConfirmar() {
    if (!servicioId || !estilistaAsignado || !fecha || !hora) return
    const reserva: Reserva = {
      id: crypto.randomUUID(),
      estilistaId: estilistaAsignado.id,
      cliente: cliente.trim(),
      telefono: telefono.trim(),
      servicio: servicioId,
      fecha,
      hora,
      estado: 'pendiente',
      creadaEn: Date.now(),
    }
    const nuevas = [...reservas, reserva]
    setReservas(nuevas)
    saveReservas(nuevas)
    setReservaCreada(reserva)
    scrollArriba()
  }

  const puedeAvanzar =
    (paso === 1 && !!servicioId) ||
    (paso === 2 && !!estilistaId) ||
    (paso === 3 && !!fecha && !!hora && !!estilistaAsignado) ||
    (paso === 4 && cliente.trim() !== '' && telefono.trim() !== '')

  return (
    <div className="min-h-screen bg-blush-50 pb-28">
      <header className="sticky top-0 z-40 border-b border-rosewood/10 bg-blush-50/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-rosewood uppercase">
              Reservar turno
            </p>
            <p className="font-display text-lg font-semibold text-charcoal">
              Estilo Minas
            </p>
          </div>
          <a
            href="#inicio"
            className="rounded-full border border-rosewood/20 px-3 py-1.5 text-xs font-semibold text-rosewood transition-colors hover:bg-rosewood/10"
          >
            Cerrar
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-5">
        {!reservaCreada && <ProgresoPasos paso={paso} total={TOTAL_PASOS} />}

        {paso === 1 && (
          <PasoServicio
            servicios={servicios}
            servicioId={servicioId}
            onSeleccionar={setServicioId}
          />
        )}

        {paso === 2 && (
          <PasoEstilista estilistaId={estilistaId} onSeleccionar={handleSeleccionEstilista} />
        )}

        {paso === 3 && estilistaId && (
          <PasoFechaHora
            estilistaId={estilistaId}
            reservas={reservas}
            diasCerrados={diasCerrados}
            diasLibresSemana={diasLibresSemana}
            diasLibresPersonales={diasLibresPersonales}
            fecha={fecha}
            hora={hora}
            onSeleccionar={handleSeleccionFechaHora}
          />
        )}

        {paso === 4 && (
          <PasoContacto
            cliente={cliente}
            telefono={telefono}
            onClienteChange={setCliente}
            onTelefonoChange={setTelefono}
          />
        )}

        {paso === 5 && servicioId && estilistaAsignado && fecha && hora && (
          <PasoConfirmacion
            servicios={servicios}
            servicioId={servicioId}
            estilista={estilistaAsignado}
            fecha={fecha}
            hora={hora}
            cliente={cliente}
            telefono={telefono}
            reservaCreada={reservaCreada}
            onConfirmar={handleConfirmar}
          />
        )}
      </main>

      {!reservaCreada && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-rosewood/10 bg-white">
          <div className="mx-auto flex max-w-lg gap-3 px-4 py-3">
            <button
              type="button"
              onClick={irAtras}
              disabled={paso === 1}
              className="flex-1 rounded-xl border border-rosewood/20 px-4 py-3.5 text-base font-semibold text-charcoal transition-colors hover:bg-rosewood/5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Atrás
            </button>
            {paso < TOTAL_PASOS && (
              <button
                type="button"
                onClick={irSiguiente}
                disabled={!puedeAvanzar}
                className="flex-1 rounded-xl bg-rosewood px-4 py-3.5 text-base font-semibold text-white shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente
              </button>
            )}
          </div>
          <div className="pb-safe" />
        </nav>
      )}
    </div>
  )
}

export default ReservaWizard
