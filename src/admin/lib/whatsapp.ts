import { formatoLargo } from './fechas'

const SALON_NOMBRE = 'Estilo Minas'

/**
 * Normaliza un teléfono uruguayo a formato internacional (sin '+', sin
 * espacios) para armar el link de WhatsApp. Es una heurística simple para
 * la demo: no valida el número, solo intenta anteponer el código de país
 * (598) si hace falta.
 */
export function normalizarTelefonoUY(telefono: string): string {
  const digitos = telefono.replace(/\D/g, '')
  if (digitos.startsWith('598')) return digitos
  if (digitos.startsWith('0')) return `598${digitos.slice(1)}`
  return `598${digitos}`
}

/**
 * Arma el link de "click to chat" de WhatsApp (wa.me) con el mensaje de
 * confirmación del turno ya precargado.
 *
 * --- Punto de integración futura: WhatsApp Business API ---
 * Hoy este link abre WhatsApp (web o app) con el mensaje listo, pero el
 * estilista tiene que tocar "Enviar" a mano. El día que el salón contrate
 * la API oficial de WhatsApp Business, ESTE es el lugar exacto del código
 * donde se reemplazaría `buildWhatsAppConfirmUrl` (o se agregaría una
 * llamada adicional) por un POST al endpoint de mensajes de la API, para
 * mandar la confirmación automáticamente sin intervención humana.
 * ------------------------------------------------------------
 */
export function buildWhatsAppConfirmUrl(params: {
  telefono: string
  cliente: string
  servicioNombre: string
  fechaISO: string
  hora: string
  estilistaNombre: string
}): string {
  const numero = normalizarTelefonoUY(params.telefono)
  const mensaje = encodeURIComponent(
    `Hola ${params.cliente}! Te confirmamos tu turno en ${SALON_NOMBRE} ✂️\n` +
      `Servicio: ${params.servicioNombre}\n` +
      `Con: ${params.estilistaNombre}\n` +
      `Día: ${formatoLargo(params.fechaISO)} a las ${params.hora}\n` +
      `¡Te esperamos!`,
  )
  return `https://wa.me/${numero}?text=${mensaje}`
}
