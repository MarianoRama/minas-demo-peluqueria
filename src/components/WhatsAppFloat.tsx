import { NEGOCIO } from '../data'
import { IconWhatsapp } from './icons'

const MENSAJE = encodeURIComponent(
  `Hola! Quiero consultar disponibilidad en ${NEGOCIO.nombre} (demo).`,
)

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${NEGOCIO.whatsapp}?text=${MENSAJE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25943c] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <IconWhatsapp className="h-7 w-7" />
    </a>
  )
}
