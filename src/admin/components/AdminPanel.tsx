import { useEffect, useMemo, useState } from 'react'
import { ESTILISTAS } from '../data/estilistas'
import { formatoLargo, hoyISO } from '../lib/fechas'
import { fechaBloqueadaParaEstilista } from '../lib/disponibilidad'
import {
  limpiarPerfilActivo,
  loadDiasCerrados,
  loadDiasLibresPersonales,
  loadDiasLibresSemana,
  loadPerfilActivo,
  loadReservas,
  loadServicios,
  savePerfilActivo,
  saveDiasCerrados,
  saveDiasLibresPersonales,
  saveDiasLibresSemana,
  saveReservas,
  saveServicios,
} from '../lib/storage'
import type { Reserva, ServicioReserva } from '../types'
import ProfileSelect from './ProfileSelect'
import DaySelector from './DaySelector'
import DayAgenda from './DayAgenda'
import NewBookingModal from './NewBookingModal'
import ClosedDaysCalendar from './ClosedDaysCalendar'
import MisDiasLibres from './MisDiasLibres'
import ServiciosPanel from './ServiciosPanel'

type Tab = 'agenda' | 'servicios' | 'cerrados'

function AdminPanel() {
  const [estilistaId, setEstilistaId] = useState<string | null>(() => loadPerfilActivo())
  const [tab, setTab] = useState<Tab>('agenda')
  const [reservas, setReservas] = useState<Reserva[]>(() => loadReservas())
  const [diasCerrados, setDiasCerrados] = useState<string[]>(() => loadDiasCerrados())
  const [diasLibresSemana, setDiasLibresSemana] = useState<Record<string, number[]>>(() => {
    const guardado = loadDiasLibresSemana()
    const inicial: Record<string, number[]> = {}
    for (const e of ESTILISTAS) {
      inicial[e.id] = guardado[e.id] ?? e.diasLibresSemana
    }
    return inicial
  })
  const [diasLibresPersonales, setDiasLibresPersonales] = useState<Record<string, string[]>>(
    () => loadDiasLibresPersonales(),
  )
  const [servicios, setServicios] = useState<ServicioReserva[]>(() => loadServicios())
  const [fechaSeleccionada, setFechaSeleccionada] = useState(() => hoyISO())
  const [mostrarForm, setMostrarForm] = useState(false)

  useEffect(() => saveReservas(reservas), [reservas])
  useEffect(() => saveDiasCerrados(diasCerrados), [diasCerrados])
  useEffect(() => saveDiasLibresSemana(diasLibresSemana), [diasLibresSemana])
  useEffect(() => saveDiasLibresPersonales(diasLibresPersonales), [diasLibresPersonales])
  useEffect(() => saveServicios(servicios), [servicios])

  useEffect(() => {
    if (estilistaId) savePerfilActivo(estilistaId)
  }, [estilistaId])

  const estilista = useMemo(
    () => ESTILISTAS.find((e) => e.id === estilistaId) ?? null,
    [estilistaId],
  )

  if (!estilistaId || !estilista) {
    return <ProfileSelect onSelect={setEstilistaId} />
  }

  function cambiarPerfil() {
    limpiarPerfilActivo()
    setEstilistaId(null)
    setTab('agenda')
  }

  function handleGuardarReserva(reserva: Reserva) {
    setReservas((prev) => [...prev, reserva])
  }

  function handleCancelarReserva(id: string) {
    const confirmar = window.confirm('¿Cancelar esta reserva?')
    if (!confirmar) return
    setReservas((prev) => prev.filter((r) => r.id !== id))
  }

  function handleConfirmarReserva(id: string) {
    setReservas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, estado: 'confirmada' } : r)),
    )
  }

  function handleAgregarServicio(nombre: string, precio: string) {
    const nuevo: ServicioReserva = {
      id: crypto.randomUUID(),
      nombre,
      ...(precio ? { precio } : {}),
    }
    setServicios((prev) => [...prev, nuevo])
  }

  function handleEliminarServicio(id: string) {
    const confirmar = window.confirm('¿Eliminar este servicio?')
    if (!confirmar) return
    setServicios((prev) => prev.filter((s) => s.id !== id))
  }

  function toggleDiaCerrado(fechaISO: string) {
    setDiasCerrados((prev) =>
      prev.includes(fechaISO)
        ? prev.filter((d) => d !== fechaISO)
        : [...prev, fechaISO],
    )
  }

  function toggleDiaSemanaLibre(dia: number) {
    const id = estilista!.id
    setDiasLibresSemana((prev) => {
      const actual = prev[id] ?? []
      const nuevo = actual.includes(dia)
        ? actual.filter((d) => d !== dia)
        : [...actual, dia]
      return { ...prev, [id]: nuevo }
    })
  }

  function toggleDiaPersonal(fechaISO: string) {
    const id = estilista!.id
    setDiasLibresPersonales((prev) => {
      const actual = prev[id] ?? []
      const nuevo = actual.includes(fechaISO)
        ? actual.filter((d) => d !== fechaISO)
        : [...actual, fechaISO]
      return { ...prev, [id]: nuevo }
    })
  }

  const diasLibresSemanaEstilista = diasLibresSemana[estilistaId] ?? []
  const diasLibresPersonalesEstilista = diasLibresPersonales[estilistaId] ?? []

  const reservasDelDia = reservas.filter(
    (r) => r.estilistaId === estilistaId && r.fecha === fechaSeleccionada,
  )
  const diaCerrado = fechaBloqueadaParaEstilista(
    fechaSeleccionada,
    diasCerrados,
    diasLibresSemanaEstilista,
    diasLibresPersonalesEstilista,
  )

  return (
    <div className="min-h-screen bg-blush-50 pb-28">
      <header className="sticky top-0 z-40 border-b border-rosewood/10 bg-blush-50/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-rosewood uppercase">
              Panel de estilistas
            </p>
            <p className="font-display text-lg font-semibold text-charcoal">
              {estilista.nombre}
            </p>
          </div>
          <button
            onClick={cambiarPerfil}
            className="rounded-full border border-rosewood/20 px-3 py-1.5 text-xs font-semibold text-rosewood transition-colors hover:bg-rosewood/10"
          >
            Cambiar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-5">
        {tab === 'agenda' && (
          <>
            <DaySelector
              fechaSeleccionada={fechaSeleccionada}
              onChange={setFechaSeleccionada}
              diasCerrados={diasCerrados}
              diasLibresSemana={diasLibresSemanaEstilista}
              diasLibresPersonales={diasLibresPersonalesEstilista}
            />
            <p className="mb-3 text-sm font-medium text-charcoal/60 capitalize">
              {formatoLargo(fechaSeleccionada)}
            </p>

            {diaCerrado && (
              <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                Este día está marcado como cerrado. No se pueden cargar
                turnos nuevos.
              </div>
            )}

            <DayAgenda
              reservas={reservasDelDia}
              estilista={estilista}
              fechaISO={fechaSeleccionada}
              servicios={servicios}
              onCancelar={handleCancelarReserva}
              onConfirmar={handleConfirmarReserva}
            />
          </>
        )}

        {tab === 'servicios' && (
          <ServiciosPanel
            servicios={servicios}
            onAgregar={handleAgregarServicio}
            onEliminar={handleEliminarServicio}
          />
        )}

        {tab === 'cerrados' && (
          <>
            <MisDiasLibres
              estilista={estilista}
              diasLibresSemana={diasLibresSemanaEstilista}
              onToggleDiaSemana={toggleDiaSemanaLibre}
              diasLibresPersonales={diasLibresPersonalesEstilista}
              onTogglePersonal={toggleDiaPersonal}
            />
            <ClosedDaysCalendar
              diasCerrados={diasCerrados}
              onToggle={toggleDiaCerrado}
            />
          </>
        )}
      </main>

      {tab === 'agenda' && (
        <button
          onClick={() => setMostrarForm(true)}
          className="fixed right-4 bottom-24 z-40 flex items-center gap-2 rounded-full bg-rosewood px-6 py-4 text-base font-semibold text-white shadow-lg shadow-rosewood/30 transition-transform active:scale-95"
        >
          + Nueva reserva
        </button>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-rosewood/10 bg-white">
        <div className="mx-auto flex max-w-lg">
          <button
            onClick={() => setTab('agenda')}
            className={`flex-1 py-3.5 text-center text-sm font-semibold transition-colors ${
              tab === 'agenda' ? 'text-rosewood' : 'text-charcoal/40'
            }`}
          >
            📅 Agenda
          </button>
          <button
            onClick={() => setTab('servicios')}
            className={`flex-1 py-3.5 text-center text-sm font-semibold transition-colors ${
              tab === 'servicios' ? 'text-rosewood' : 'text-charcoal/40'
            }`}
          >
            💈 Servicios
          </button>
          <button
            onClick={() => setTab('cerrados')}
            className={`flex-1 py-3.5 text-center text-sm font-semibold transition-colors ${
              tab === 'cerrados' ? 'text-rosewood' : 'text-charcoal/40'
            }`}
          >
            🚫 Días cerrados
          </button>
        </div>
        <div className="pb-safe" />
      </nav>

      {mostrarForm && (
        <NewBookingModal
          estilista={estilista}
          fechaInicial={fechaSeleccionada}
          diasCerrados={diasCerrados}
          diasLibresSemana={diasLibresSemanaEstilista}
          diasLibresPersonales={diasLibresPersonalesEstilista}
          servicios={servicios}
          onGuardar={handleGuardarReserva}
          onCerrar={() => setMostrarForm(false)}
        />
      )}

      <div className="mx-auto max-w-lg px-4 pb-4 text-center">
        <a href="#inicio" className="text-xs text-charcoal/40 underline">
          ← Volver al sitio
        </a>
        <p className="mt-2 text-[11px] text-charcoal/30">
          Demo de portafolio: los datos se guardan en este navegador
          (localStorage), no hay backend real detrás.
        </p>
      </div>
    </div>
  )
}

export default AdminPanel
