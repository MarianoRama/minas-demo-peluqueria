import { useEffect, useMemo, useState } from 'react'
import { CATEGORIAS, type DiaSemana, type Servicio } from '../data'
import { useDatos } from '../data/useDatos'
import { useSeleccionReserva } from '../lib/useSeleccionReserva'
import {
  dateKey,
  estaCerrado,
  formatearFechaLarga,
  generarSlots,
  guardarReserva,
  proximosDias,
  type Reserva as ReservaTipo,
} from '../lib/booking'
import { IconCheck, IconFlecha, IconReloj, IconWhatsapp } from './icons'

const PASOS = ['Servicio', 'Profesional', 'Día y hora', 'Tus datos']

const NOMBRE_DIA = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
const MES = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
]

function formatearPrecio(precio: number) {
  return `$${precio.toLocaleString('es-UY')}`
}

function crearId() {
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

type Props = {
  onReservaConfirmada: () => void
}

export function Reserva({ onReservaConfirmada }: Props) {
  const { datos } = useDatos()
  const { negocio: NEGOCIO } = datos
  const SERVICIOS = useMemo(() => datos.servicios.filter((s) => s.activo), [datos.servicios])
  const EQUIPO = useMemo(() => datos.equipo.filter((p) => p.activo), [datos.equipo])
  const { senal: senalSeleccion, servicioId: servicioPedido } = useSeleccionReserva()

  const [paso, setPaso] = useState(0)
  const [categoriaActiva, setCategoriaActiva] = useState<string>(CATEGORIAS[0])
  const [servicioId, setServicioId] = useState<string | null>(null)
  const [profesionalId, setProfesionalId] = useState<string | 'cualquiera' | null>(null)
  const [fecha, setFecha] = useState<Date | null>(null)
  const [hora, setHora] = useState<string | null>(null)
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [errores, setErrores] = useState<{ nombre?: string; telefono?: string }>({})
  const [confirmado, setConfirmado] = useState<ReservaTipo | null>(null)

  const dias = useMemo(() => proximosDias(10), [])
  const servicio = SERVICIOS.find((s) => s.id === servicioId) ?? null
  const profesional = EQUIPO.find((p) => p.id === profesionalId) ?? null

  // Un servicio elegido desde la carta de precios salta directo al paso 2
  // (elegir profesional) para no hacer elegir el mismo servicio dos veces.
  useEffect(() => {
    if (!servicioPedido) return
    const existe = SERVICIOS.some((s) => s.id === servicioPedido)
    if (!existe) return
    setServicioId(servicioPedido)
    setPaso(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senalSeleccion])

  const slots = useMemo(() => {
    if (!fecha || !servicio) return []
    return generarSlots(fecha, servicio.duracionMin, NEGOCIO.horarioSemana, NEGOCIO.diasBloqueados)
  }, [fecha, servicio, NEGOCIO.horarioSemana, NEGOCIO.diasBloqueados])

  function elegirServicio(s: Servicio) {
    setServicioId(s.id)
    setPaso(1)
  }

  function elegirProfesional(id: string | 'cualquiera') {
    setProfesionalId(id)
    setPaso(2)
  }

  function elegirFecha(d: Date) {
    setFecha(d)
    setHora(null)
  }

  function validarDatos(): boolean {
    const nuevosErrores: typeof errores = {}
    if (nombre.trim().length < 2) {
      nuevosErrores.nombre = 'Ingresá tu nombre completo.'
    }
    const soloDigitos = telefono.replace(/[^0-9]/g, '')
    if (soloDigitos.length < 8 || soloDigitos.length > 11) {
      nuevosErrores.telefono = 'Ingresá un teléfono válido (8 a 11 dígitos).'
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function confirmar() {
    if (!servicio || !fecha || !hora || !validarDatos()) return

    const reserva: ReservaTipo = {
      id: crearId(),
      fecha: dateKey(fecha),
      hora,
      servicioId: servicio.id,
      servicioNombre: servicio.nombre,
      duracionMin: servicio.duracionMin,
      precio: servicio.precio,
      profesionalId: profesionalId ?? 'cualquiera',
      profesionalNombre: profesional?.nombre ?? 'Cualquiera disponible',
      nombreCliente: nombre.trim(),
      telefonoCliente: telefono.trim(),
      creadoEn: new Date().toISOString(),
      estado: 'pendiente',
    }

    guardarReserva(reserva)
    setConfirmado(reserva)
    onReservaConfirmada()
  }

  function reiniciar() {
    setPaso(0)
    setCategoriaActiva(CATEGORIAS[0])
    setServicioId(null)
    setProfesionalId(null)
    setFecha(null)
    setHora(null)
    setNombre('')
    setTelefono('')
    setErrores({})
    setConfirmado(null)
  }

  const mensajeWhatsapp = confirmado
    ? encodeURIComponent(
        `Hola! Quiero confirmar mi turno en ${NEGOCIO.nombre}:\n` +
          `Servicio: ${confirmado.servicioNombre} (${confirmado.duracionMin} min, ${formatearPrecio(confirmado.precio)})\n` +
          `Profesional: ${confirmado.profesionalNombre}\n` +
          `Fecha: ${confirmado.fecha} a las ${confirmado.hora}\n` +
          `Nombre: ${confirmado.nombreCliente}\n` +
          `Teléfono: ${confirmado.telefonoCliente}`,
      )
    : ''

  if (confirmado) {
    return (
      <div className="border border-wine/30 bg-paper p-6 sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine text-cream">
          <IconCheck className="h-6 w-6" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">
          ¡Turno reservado!
        </h3>
        <p className="mt-2 text-ink/70">
          Guardamos tu turno en este dispositivo. Confirmalo por WhatsApp para
          que quede coordinado con el salón.
        </p>

        <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-ink/15 pt-6 text-sm sm:grid-cols-2">
          <Resumen etiqueta="Servicio" valor={`${confirmado.servicioNombre} · ${formatearPrecio(confirmado.precio)}`} />
          <Resumen etiqueta="Profesional" valor={confirmado.profesionalNombre} />
          <Resumen etiqueta="Fecha" valor={formatearFechaLarga(confirmado.fecha)} />
          <Resumen etiqueta="Hora" valor={confirmado.hora} />
          <Resumen etiqueta="Nombre" valor={confirmado.nombreCliente} />
          <Resumen etiqueta="Teléfono" valor={confirmado.telefonoCliente} />
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={`https://wa.me/${NEGOCIO.whatsapp}?text=${mensajeWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25943c] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1f7d33]"
          >
            <IconWhatsapp className="h-5 w-5" />
            Confirmar por WhatsApp
          </a>
          <button
            type="button"
            onClick={reiniciar}
            className="inline-flex items-center justify-center border border-ink/25 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Reservar otro turno
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-ink/15 bg-paper">
      <ol className="grid grid-cols-4 border-b border-ink/15 text-[11px] font-semibold tracking-wide text-ink/40 uppercase sm:text-xs">
        {PASOS.map((etiqueta, i) => (
          <li
            key={etiqueta}
            className={`flex flex-col items-center gap-1.5 py-4 ${
              i === paso ? 'text-wine' : i < paso ? 'text-ink/70' : ''
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
                i <= paso ? 'border-wine text-wine' : 'border-ink/30'
              }`}
            >
              {i < paso ? <IconCheck className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className="hidden text-center leading-tight sm:block">{etiqueta}</span>
          </li>
        ))}
      </ol>

      <div className="p-5 sm:p-8">
        {paso === 0 && (
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink">
              ¿Qué servicio querés reservar?
            </h3>

            <div className="mt-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {CATEGORIAS.map((categoria) => (
                <button
                  key={categoria}
                  type="button"
                  onClick={() => setCategoriaActiva(categoria)}
                  className={`shrink-0 whitespace-nowrap border px-4 py-2 text-sm font-medium transition-colors ${
                    categoriaActiva === categoria
                      ? 'border-wine bg-wine text-cream'
                      : 'border-ink/20 text-ink/70 hover:border-ink'
                  }`}
                >
                  {categoria}
                </button>
              ))}
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SERVICIOS.filter((s) => s.categoria === categoriaActiva).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => elegirServicio(s)}
                    className="tarjeta-viva flex h-full w-full min-h-[44px] flex-col items-start gap-1 border border-ink/15 px-4 py-3 text-left hover:border-wine hover:bg-wine/5"
                  >
                    <span className="flex w-full items-baseline justify-between gap-2">
                      <span className="font-medium text-ink">{s.nombre}</span>
                      <span className="font-display text-lg font-semibold whitespace-nowrap text-wine">
                        {formatearPrecio(s.precio)}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-ink/50">
                      <IconReloj className="h-3.5 w-3.5" /> {s.duracionMin} min
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {paso === 1 && servicio && (
          <div>
            <BotonAtras onClick={() => setPaso(0)} />
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
              ¿Con quién preferís tu turno?
            </h3>
            <p className="mt-1 text-sm text-ink/50">{servicio.nombre}</p>
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <li>
                <button
                  type="button"
                  onClick={() => elegirProfesional('cualquiera')}
                  className="flex min-h-[44px] w-full items-center gap-3 border border-ink/15 px-4 py-3 text-left transition-colors hover:border-wine hover:bg-wine/5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/25 font-display text-sm">
                    ?
                  </span>
                  <span>
                    <span className="block font-medium text-ink">Cualquiera disponible</span>
                    <span className="text-xs text-ink/50">El primer profesional libre</span>
                  </span>
                </button>
              </li>
              {EQUIPO.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => elegirProfesional(p.id)}
                    className="flex min-h-[44px] w-full items-center gap-3 border border-ink/15 px-4 py-3 text-left transition-colors hover:border-wine hover:bg-wine/5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/25 font-display text-sm text-wine">
                      {p.iniciales}
                    </span>
                    <span>
                      <span className="block font-medium text-ink">{p.nombre}</span>
                      <span className="text-xs text-ink/50">{p.especialidad}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {paso === 2 && servicio && (
          <div>
            <BotonAtras onClick={() => setPaso(1)} />
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
              Elegí día y horario
            </h3>
            <p className="mt-1 text-sm text-ink/50">
              {servicio.nombre} · {servicio.duracionMin} min
            </p>

            <div className="mt-6 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
              {dias.map((d) => {
                const cerradoSalon = estaCerrado(d, NEGOCIO.horarioSemana, NEGOCIO.diasBloqueados)
                const profesionalLibre = !profesional || profesional.diasTrabaja.includes(d.getDay() as DiaSemana)
                const cerrado = cerradoSalon || !profesionalLibre
                const seleccionado = fecha && dateKey(fecha) === dateKey(d)
                return (
                  <button
                    key={dateKey(d)}
                    type="button"
                    disabled={cerrado}
                    onClick={() => elegirFecha(d)}
                    className={`flex min-h-[64px] w-16 shrink-0 flex-col items-center justify-center border text-sm transition-colors ${
                      cerrado
                        ? 'cursor-not-allowed border-ink/10 text-ink/25'
                        : seleccionado
                          ? 'border-wine bg-wine text-cream'
                          : 'border-ink/20 text-ink hover:border-wine'
                    }`}
                  >
                    <span className="text-[10px] tracking-wide uppercase">
                      {NOMBRE_DIA[d.getDay()]}
                    </span>
                    <span className="font-display text-lg font-semibold">{d.getDate()}</span>
                    <span className="text-[10px]">{MES[d.getMonth()]}</span>
                  </button>
                )
              })}
            </div>

            {fecha && estaCerrado(fecha, NEGOCIO.horarioSemana, NEGOCIO.diasBloqueados) && (
              <p className="mt-4 text-sm text-ink/50">Ese día no abrimos. Elegí otra fecha.</p>
            )}

            {fecha && profesional && !profesional.diasTrabaja.includes(fecha.getDay() as DiaSemana) && (
              <p className="mt-4 text-sm text-ink/50">
                {profesional.nombre.split(' ')[0]} no atiende ese día. Elegí otra fecha o "Cualquiera disponible".
              </p>
            )}

            {fecha &&
              !estaCerrado(fecha, NEGOCIO.horarioSemana, NEGOCIO.diasBloqueados) &&
              (!profesional || profesional.diasTrabaja.includes(fecha.getDay() as DiaSemana)) && (
              <div className="mt-6">
                {slots.length === 0 ? (
                  <p className="text-sm text-ink/50">
                    No quedan horarios disponibles ese día para este servicio.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slots.map((s) => (
                      <button
                        key={s.hora}
                        type="button"
                        disabled={s.ocupado}
                        onClick={() => setHora(s.hora)}
                        className={`min-h-[44px] border text-sm font-medium transition-colors ${
                          s.ocupado
                            ? 'cursor-not-allowed border-ink/10 text-ink/25 line-through'
                            : hora === s.hora
                              ? 'border-wine bg-wine text-cream'
                              : 'border-ink/20 text-ink hover:border-wine'
                        }`}
                      >
                        {s.hora}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {fecha && hora && !estaCerrado(fecha, NEGOCIO.horarioSemana, NEGOCIO.diasBloqueados) && (
              <button
                type="button"
                onClick={() => setPaso(3)}
                className="mt-8 inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-wine"
              >
                Continuar <IconFlecha className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {paso === 3 && servicio && fecha && hora && (
          <div>
            <BotonAtras onClick={() => setPaso(2)} />
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
              Últimos datos
            </h3>
            <p className="mt-1 text-sm text-ink/50">
              {servicio.nombre} · {formatearFechaLarga(dateKey(fecha))} a las {hora}
            </p>

            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
                confirmar()
              }}
              noValidate
            >
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-ink">
                  Nombre y apellido
                </label>
                <input
                  id="nombre"
                  type="text"
                  autoComplete="name"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="mt-2 block w-full min-h-[44px] border border-ink/25 bg-cream px-4 py-2.5 text-ink outline-none focus:border-wine focus:ring-2 focus:ring-wine/20"
                  aria-invalid={Boolean(errores.nombre)}
                  aria-describedby={errores.nombre ? 'error-nombre' : undefined}
                />
                {errores.nombre && (
                  <p id="error-nombre" className="mt-1.5 text-sm text-wine">
                    {errores.nombre}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-ink">
                  Teléfono (WhatsApp)
                </label>
                <input
                  id="telefono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="099 000 000"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="mt-2 block w-full min-h-[44px] border border-ink/25 bg-cream px-4 py-2.5 text-ink outline-none focus:border-wine focus:ring-2 focus:ring-wine/20"
                  aria-invalid={Boolean(errores.telefono)}
                  aria-describedby={errores.telefono ? 'error-telefono' : undefined}
                />
                {errores.telefono && (
                  <p id="error-telefono" className="mt-1.5 text-sm text-wine">
                    {errores.telefono}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-wine"
              >
                Confirmar turno <IconFlecha className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

function BotonAtras({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-sm font-medium text-ink/50 transition-colors hover:text-wine"
    >
      <IconFlecha className="h-3.5 w-3.5 rotate-180" /> Volver
    </button>
  )
}

function Resumen({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div>
      <dt className="text-xs tracking-wide text-ink/45 uppercase">{etiqueta}</dt>
      <dd className="mt-0.5 font-medium text-ink">{valor}</dd>
    </div>
  )
}
