import { diaDeSemanaISO } from './disponibilidad'
import type { Reserva } from '../types'

/**
 * Franjas horarias de atención del salón, en turnos de 30 minutos, según el
 * día de la semana. Usa los mismos horarios ilustrativos que se muestran en
 * la sección "Horarios & ubicación" de la landing: lunes a viernes
 * 9:00–19:00, sábados 9:00–13:00, domingos cerrado.
 *
 * El panel interno (NewBookingModal) sigue permitiendo cargar cualquier
 * horario a mano con un <input type="time">, sin depender de esta lista —
 * esto solo se usa para generar las opciones del wizard de reserva pública,
 * donde el cliente elige entre horarios ya armados.
 */
export function franjasHorariasDelDia(diaSemana: number): string[] {
  if (diaSemana === 0) return [] // domingo: cerrado
  const inicioMin = 9 * 60
  const finMin = diaSemana === 6 ? 13 * 60 : 19 * 60
  const paso = 30
  const horas: string[] = []
  for (let m = inicioMin; m < finMin; m += paso) {
    const h = String(Math.floor(m / 60)).padStart(2, '0')
    const mm = String(m % 60).padStart(2, '0')
    horas.push(`${h}:${mm}`)
  }
  return horas
}

export function franjasHorariasParaFecha(fechaISO: string): string[] {
  return franjasHorariasDelDia(diaDeSemanaISO(fechaISO))
}

/** Horas ya ocupadas para un estilista en una fecha, según las reservas
 * existentes (cualquier estado salvo 'cancelada' bloquea el horario). */
export function horasOcupadas(
  reservas: Reserva[],
  estilistaId: string,
  fechaISO: string,
): string[] {
  return reservas
    .filter(
      (r) =>
        r.estilistaId === estilistaId &&
        r.fecha === fechaISO &&
        r.estado !== 'cancelada',
    )
    .map((r) => r.hora)
}

/** Horas de la franja horaria del día que todavía están libres para ese
 * estilista en esa fecha (no chocan con una reserva ya guardada). */
export function horasLibresParaEstilista(
  reservas: Reserva[],
  estilistaId: string,
  fechaISO: string,
): string[] {
  const franjas = franjasHorariasParaFecha(fechaISO)
  const ocupadas = new Set(horasOcupadas(reservas, estilistaId, fechaISO))
  return franjas.filter((h) => !ocupadas.has(h))
}
