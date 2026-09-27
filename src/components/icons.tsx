/**
 * Ilustraciones e iconos SVG de línea, propios y deliberados.
 * Trazo consistente (strokeWidth 1.5–2, currentColor) en vez de fotos o emojis.
 */
import type { SVGProps } from 'react'

export function IconTijera(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <circle cx="14" cy="16" r="6" />
      <circle cx="14" cy="48" r="6" />
      <path d="M19 20 52 46M19 44 52 18" strokeLinecap="round" />
      <path d="M52 18c3-1 6 0 7 2M52 46c3 1 6 0 7-2" strokeLinecap="round" />
    </svg>
  )
}

export function IconPeine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M8 20h48v8H8z" strokeLinejoin="round" />
      <path d="M12 28v22M20 28v16M28 28v22M36 28v16M44 28v22M52 28v16" strokeLinecap="round" />
    </svg>
  )
}

export function IconPerfil(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path
        d="M20 50c0-6 1-10 1-14 0-2-3-3-3-9 0-9 6-15 14-15 7 0 10 4 11 7 4 1 6 5 5 9-1 5-4 6-4 10 0 5 3 7 3 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M31 30c1-1 3-1 4 0" strokeLinecap="round" />
    </svg>
  )
}

export function IconSecador(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path
        d="M14 22c0-6 6-10 14-10s16 5 16 12-6 8-12 8h-4v12a4 4 0 0 1-8 0V32c-3-1-6-4-6-10Z"
        strokeLinejoin="round"
      />
      <path d="M44 20l10-4M46 26l9 1M44 32l8 5" strokeLinecap="round" />
    </svg>
  )
}

export function IconNavaja(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M10 40 40 14c3-3 8-2 9 2s-1 7-4 9L14 46" strokeLinejoin="round" />
      <path d="M14 46l-4 8 8-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconGota(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path
        d="M32 8c8 12 16 22 16 32a16 16 0 1 1-32 0c0-10 8-20 16-32Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconMano(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path
        d="M20 30V14a3 3 0 0 1 6 0v14M26 28V10a3 3 0 0 1 6 0v18M32 28V14a3 3 0 0 1 6 0v18M38 32V20a3 3 0 0 1 6 0v18c0 8-5 16-14 16-6 0-9-3-13-9l-6-10c-1-2 1-5 4-4l5 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconReloj(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconWhatsapp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16.02 4C9.4 4 4 9.36 4 15.94c0 2.34.67 4.5 1.83 6.35L4 28l5.9-1.78a11.9 11.9 0 0 0 6.12 1.68h.01c6.62 0 12-5.36 12-11.94C28.03 9.36 22.65 4 16.02 4Zm0 21.6c-1.93 0-3.78-.52-5.38-1.5l-.38-.23-3.8 1.15 1.14-3.68-.25-.38a9.86 9.86 0 0 1-1.55-5.3c0-5.44 4.48-9.87 9.96-9.87 5.48 0 9.96 4.43 9.96 9.87s-4.48 9.94-9.7 9.94Zm5.47-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  )
}

export function IconCerrar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

export function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconFlecha(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconMenu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  )
}
