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

/**
 * Ilustración editorial para el hero: retrato de perfil trazado en líneas
 * gruesas + un plano de color a sangre, al estilo de una tapa de revista.
 * Usa variables CSS de tema en vez de currentColor para mantener sus
 * propios colores sin importar dónde se use.
 */
const BULBOS_ESPEJO = [
  [158, 90], [146.9, 124.1], [117.9, 145.2], [82.1, 145.2], [53.1, 124.1],
  [42, 90], [53.1, 55.9], [82.1, 34.8], [117.9, 34.8], [146.9, 55.9],
] as const

export function IconRetratoEditorial(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 280" fill="none" {...props}>
      {/* plano de color a sangre, tras el espejo */}
      <rect x="140" y="0" width="80" height="280" fill="var(--color-wine-light)" />

      {/* espejo de camarín, con lamparitas alrededor */}
      <circle cx="100" cy="90" r="58" stroke="var(--color-cream)" strokeWidth="4" />
      {BULBOS_ESPEJO.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="var(--color-cream)" />
      ))}

      {/* silla de barbero */}
      <rect x="85" y="148" width="30" height="22" rx="7" stroke="var(--color-cream)" strokeWidth="3.5" />
      <rect x="58" y="163" width="84" height="58" rx="12" stroke="var(--color-cream)" strokeWidth="3.5" />
      <rect x="44" y="208" width="14" height="34" rx="5" stroke="var(--color-cream)" strokeWidth="3.5" />
      <rect x="142" y="208" width="14" height="34" rx="5" stroke="var(--color-cream)" strokeWidth="3.5" />
      <rect x="53" y="216" width="94" height="18" rx="5" stroke="var(--color-cream)" strokeWidth="3.5" />
      <rect x="92" y="233" width="16" height="26" fill="var(--color-cream)" />
      <ellipse cx="100" cy="264" rx="36" ry="9" stroke="var(--color-cream)" strokeWidth="3.5" />
    </svg>
  )
}

/**
 * Bustos de línea para el equipo, cuatro peinados distintos a modo de
 * ilustración (no fotos). Comparten hombros/cuello/cabeza y varían el
 * cabello.
 */
function BustoBase({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <circle cx="32" cy="24" r="12" />
      <path d="M12 62c0-14.4 9-24.8 20-24.8s20 10.4 20 24.8" strokeLinecap="round" />
      {children}
    </svg>
  )
}

export function IconBustoCorto(props: SVGProps<SVGSVGElement>) {
  return (
    <BustoBase {...props}>
      <path d="M19 20a13.2 13.2 0 0 1 26 0" />
      <path d="M19 20v6M45 20v6" strokeLinecap="round" />
    </BustoBase>
  )
}

export function IconBustoOndulado(props: SVGProps<SVGSVGElement>) {
  return (
    <BustoBase {...props}>
      <path d="M20 18c-6 5-7 15-3 25" strokeLinecap="round" />
      <path d="M44 18c6 5 7 15 3 25" strokeLinecap="round" />
    </BustoBase>
  )
}

export function IconBustoRizado(props: SVGProps<SVGSVGElement>) {
  return (
    <BustoBase {...props}>
      <circle cx="22" cy="14" r="2.6" />
      <circle cx="28" cy="10.5" r="3" />
      <circle cx="35" cy="11" r="3" />
      <circle cx="41" cy="15" r="2.6" />
      <circle cx="17" cy="19" r="2.4" />
      <circle cx="46" cy="19" r="2.4" />
    </BustoBase>
  )
}

export function IconBustoLargo(props: SVGProps<SVGSVGElement>) {
  return (
    <BustoBase {...props}>
      <path d="M19 17c-8 10-10 28-6 42" strokeLinecap="round" />
      <path d="M45 17c8 10 10 28 6 42" strokeLinecap="round" />
    </BustoBase>
  )
}

export function IconFirma(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 84 16" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
      <path
        d="M2 9c5-8 10 8 15 0s10-8 15 0 10 8 15 0 10-8 15 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

export function IconCamara(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.4" />
    </svg>
  )
}

export function IconMas(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

export function IconBasura(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v6M14 11v6" strokeLinecap="round" />
    </svg>
  )
}

export function IconLapiz(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <path d="M4 20l1-4.2L15.8 5a1.6 1.6 0 0 1 2.3 0l.9.9a1.6 1.6 0 0 1 0 2.3L8.2 19l-4.2 1Z" strokeLinejoin="round" />
      <path d="M13.5 6.5l3.9 3.9" />
    </svg>
  )
}

export function IconCopiar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <rect x="8" y="8" width="12" height="12" rx="1.5" />
      <path d="M16 8V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v10A1.5 1.5 0 0 0 5 16.5h3" />
    </svg>
  )
}

export function IconCandado(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.3" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconBuscar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.6-4.6" strokeLinecap="round" />
    </svg>
  )
}

export function IconDescargar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <path d="M12 4v11m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" strokeLinecap="round" />
    </svg>
  )
}

export function IconSubir(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <path d="M12 20V9m0 0 4 4m-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" strokeLinecap="round" />
    </svg>
  )
}

export function IconAlerta(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...props}>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" strokeLinejoin="round" />
      <path d="M12 10v4" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconImagen(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.2" />
      <circle cx="9" cy="10" r="1.7" />
      <path d="m4.5 17 5-5 3 3 3-4 4 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Sello circular tipo tampón, para la carta de precios ("de fábrica"). */
export function IconSello(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <g transform="rotate(-9 50 50)">
        <circle cx="50" cy="50" r="34" strokeDasharray="2.2 3.4" />
        <circle cx="50" cy="50" r="26" />
        <path id="curva-sello" d="M26 58a26 26 0 0 1 48 0" fill="none" />
        <text fontSize="9.5" letterSpacing="2" fill="currentColor" stroke="none">
          <textPath href="#curva-sello" startOffset="50%" textAnchor="middle">
            DESDE 2009
          </textPath>
        </text>
        <path d="M36 46c3-4 7 4 10 0s7-4 10 0 7 4 8 0" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function IconEstrella(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.4 9.9l6-.9 2.6-5.5Z" strokeLinejoin="round" />
    </svg>
  )
}
