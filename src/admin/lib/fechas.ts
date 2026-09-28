export function hoyISO(): string {
  return toISO(new Date())
}

export function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function sumarDias(iso: string, dias: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + dias)
  return toISO(date)
}

export function formatoCorto(iso: string): { label: string; sublabel: string } {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const hoy = hoyISO()
  const manana = sumarDias(hoy, 1)
  let label: string
  if (iso === hoy) label = 'Hoy'
  else if (iso === manana) label = 'Mañana'
  else label = date.toLocaleDateString('es-UY', { weekday: 'short' })
  const sublabel = date.toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit' })
  return { label, sublabel }
}

export function formatoLargo(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('es-UY', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })
}
