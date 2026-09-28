import type { BloqueHorario, DiaBloqueado, DiaSemana } from '../data'

const STORAGE_KEY = 'tijera-tinta:turnos'

export type EstadoTurno = 'pendiente' | 'atendido' | 'cancelado'

export type Reserva = {
  id: string
  fecha: string // clave absoluta YYYY-MM-DD
  hora: string // HH:MM
  servicioId: string
  servicioNombre: string
  duracionMin: number
  precio: number
  profesionalId: string | 'cualquiera'
  profesionalNombre: string
  nombreCliente: string
  telefonoCliente: string
  creadoEn: string
  estado: EstadoTurno
}

/** YYYY-MM-DD en horario local, sin desfasajes de zona horaria. */
export function dateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function proximosDias(cantidad = 10): Date[] {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const dias: Date[] = []
  for (let i = 0; i < cantidad; i++) {
    const d = new Date(hoy)
    d.setDate(hoy.getDate() + i)
    dias.push(d)
  }
  return dias
}

function franjaDelDia(horarioSemana: BloqueHorario[], dia: DiaSemana) {
  return horarioSemana.find((b) => b.dia === dia) ?? null
}

export function estaBloqueadoManual(d: Date, diasBloqueados: DiaBloqueado[]): DiaBloqueado | null {
  const key = dateKey(d)
  return diasBloqueados.find((b) => b.fecha === key) ?? null
}

export function estaCerrado(
  d: Date,
  horarioSemana: BloqueHorario[],
  diasBloqueados: DiaBloqueado[] = [],
): boolean {
  const franja = franjaDelDia(horarioSemana, d.getDay() as DiaSemana)
  if (!franja || franja.apertura === null || franja.cierre === null) return true
  return estaBloqueadoManual(d, diasBloqueados) !== null
}

/** Hash simple y determinístico de un string a entero positivo. */
function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

/**
 * Genera los horarios posibles del día según duración del servicio, marca
 * cuáles están "ocupados" de forma determinística (según fecha + hora, a
 * modo de ejemplo — no hay backend real) y descarta horarios pasados si la
 * fecha es hoy.
 */
export function generarSlots(
  fecha: Date,
  duracionMin: number,
  horarioSemana: BloqueHorario[],
  diasBloqueados: DiaBloqueado[] = [],
): { hora: string; ocupado: boolean }[] {
  if (estaCerrado(fecha, horarioSemana, diasBloqueados)) return []
  const franja = franjaDelDia(horarioSemana, fecha.getDay() as DiaSemana)
  if (!franja || franja.apertura === null || franja.cierre === null) return []

  const PASO_MIN = 30
  const slots: { hora: string; ocupado: boolean }[] = []
  const key = dateKey(fecha)

  const ahora = new Date()
  const esHoy = dateKey(ahora) === key

  for (
    let minutos = franja.apertura * 60;
    minutos + duracionMin <= franja.cierre * 60;
    minutos += PASO_MIN
  ) {
    const h = Math.floor(minutos / 60)
    const m = minutos % 60
    const hora = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`

    if (esHoy) {
      const slotDate = new Date(fecha)
      slotDate.setHours(h, m, 0, 0)
      if (slotDate.getTime() <= ahora.getTime()) continue
    }

    // ocupación de ejemplo, determinística por fecha + hora
    const ocupado = hashString(`${key}-${hora}`) % 5 === 0
    slots.push({ hora, ocupado })
  }

  return slots
}

function leerTodas(): Record<string, Reserva[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') return parsed
    return {}
  } catch {
    return {}
  }
}

function guardarTodas(datos: Record<string, Reserva[]>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datos))
  } catch {
    // localStorage no disponible (modo privado, cuota, etc.): no rompemos la app.
  }
}

export function obtenerReservas(): Reserva[] {
  const todas = leerTodas()
  return Object.values(todas)
    .flat()
    .map((r) => ({ ...r, estado: r.estado ?? ('pendiente' as EstadoTurno) }))
    .sort((a, b) => `${a.fecha}${a.hora}`.localeCompare(`${b.fecha}${b.hora}`))
}

export function reservasDe(fecha: string): Reserva[] {
  const todas = leerTodas()
  return (todas[fecha] ?? []).map((r) => ({ ...r, estado: r.estado ?? ('pendiente' as EstadoTurno) }))
}

export function guardarReserva(reserva: Reserva) {
  const todas = leerTodas()
  const dia = todas[reserva.fecha] ?? []
  todas[reserva.fecha] = [...dia, reserva]
  guardarTodas(todas)
}

const NOMBRE_DIA = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
const MES = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
]

export function formatearFechaLarga(fechaKey: string) {
  const [y, m, d] = fechaKey.split('-').map(Number)
  const fecha = new Date(y, m - 1, d)
  return `${NOMBRE_DIA[fecha.getDay()]} ${d} de ${MES[m - 1]}`
}

export function cancelarReserva(id: string) {
  const todas = leerTodas()
  for (const fecha of Object.keys(todas)) {
    todas[fecha] = todas[fecha].filter((r) => r.id !== id)
    if (todas[fecha].length === 0) delete todas[fecha]
  }
  guardarTodas(todas)
}

export function cambiarEstadoReserva(id: string, estado: EstadoTurno) {
  const todas = leerTodas()
  for (const fecha of Object.keys(todas)) {
    todas[fecha] = todas[fecha].map((r) => (r.id === id ? { ...r, estado } : r))
  }
  guardarTodas(todas)
}
