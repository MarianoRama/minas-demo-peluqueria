/**
 * Reglas de disponibilidad por estilista.
 *
 * Una fecha queda bloqueada para un estilista si se cumple alguna de estas
 * tres condiciones (independientes entre sí):
 *  1. Cierre global del salón (`diasCerrados`, afecta a las 3 estilistas).
 *  2. Día de la semana libre recurrente de ESE estilista (`diasLibresSemana`).
 *  3. Día puntual libre personal de ESE estilista (`diasLibresPersonales`).
 */

export function diaDeSemanaISO(fechaISO: string): number {
  const [y, m, d] = fechaISO.split('-').map(Number)
  return new Date(y, m - 1, d).getDay() // 0 = domingo ... 6 = sábado
}

export function fechaBloqueadaParaEstilista(
  fechaISO: string,
  diasCerrados: string[],
  diasLibresSemana: number[],
  diasLibresPersonales: string[],
): boolean {
  if (diasCerrados.includes(fechaISO)) return true
  if (diasLibresSemana.includes(diaDeSemanaISO(fechaISO))) return true
  if (diasLibresPersonales.includes(fechaISO)) return true
  return false
}
