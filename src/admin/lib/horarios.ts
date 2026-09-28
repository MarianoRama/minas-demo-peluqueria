import { estimatedTotalDuration } from '../../data/appointments'
import { hoyISO } from './fechas'
import { diaDeSemanaISO } from './disponibilidad'
import type { Reserva } from '../types'

export function franjasHorariasDelDia(diaSemana: number): string[] {
  if (diaSemana === 0) return []
  const inicioMin = 9 * 60
  const finMin = diaSemana === 6 ? 13 * 60 : 19 * 60
  const horas: string[] = []
  for (let minuto = inicioMin; minuto < finMin; minuto += 30) {
    const hora = String(Math.floor(minuto / 60)).padStart(2, '0')
    const min = String(minuto % 60).padStart(2, '0')
    horas.push(`${hora}:${min}`)
  }
  return horas
}

export function franjasHorariasParaFecha(fechaISO: string): string[] {
  return franjasHorariasDelDia(diaDeSemanaISO(fechaISO))
}

function minutos(hora: string) {
  const [h = 0, min = 0] = hora.split(':').map(Number)
  return h * 60 + min
}

function duracionReserva(reserva: Reserva) {
  if (reserva.duracionMinutos) return reserva.duracionMinutos
  const ids = reserva.servicios?.length ? reserva.servicios : [reserva.servicio]
  return estimatedTotalDuration(ids)
}

export function horasOcupadas(
  reservas: Reserva[],
  estilistaId: string,
  fechaISO: string,
): string[] {
  return reservas
    .filter((reserva) => reserva.estilistaId === estilistaId && reserva.fecha === fechaISO && reserva.estado !== 'cancelada')
    .map((reserva) => reserva.hora)
}

/** Horas de inicio que caben antes del cierre y no se solapan con otras reservas. */
export function horasLibresParaEstilista(
  reservas: Reserva[],
  estilistaId: string,
  fechaISO: string,
  duracionMinutos = 45,
): string[] {
  if (!fechaISO || fechaISO < hoyISO()) return []
  const ahora = fechaISO === hoyISO() ? new Date().getHours() * 60 + new Date().getMinutes() : -1
  const dia = diaDeSemanaISO(fechaISO)
  const cierre = dia === 6 ? 13 * 60 : dia === 0 ? 0 : 19 * 60
  const existentes = reservas.filter(
    (reserva) => reserva.estilistaId === estilistaId && reserva.fecha === fechaISO && reserva.estado !== 'cancelada',
  )
  return franjasHorariasParaFecha(fechaISO).filter((hora) => {
    const inicio = minutos(hora)
    const fin = inicio + duracionMinutos
    if (fin > cierre || inicio <= ahora) return false
    return existentes.every((reserva) => {
      const inicioExistente = minutos(reserva.hora)
      const finExistente = inicioExistente + duracionReserva(reserva)
      return fin <= inicioExistente || inicio >= finExistente
    })
  })
}

